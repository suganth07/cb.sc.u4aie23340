export interface Notification {
  ID: string;
  Type: "Placement" | "Result" | "Event";
  Message: string;
  Timestamp: string;
}

const priorityWeights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function getTopNotifications(
  notifications: Notification[],
  topN: number = 10
): Notification[] {
  return notifications
    .sort((a, b) => {
      // Weight comparison
      const weightDiff =
        priorityWeights[b.Type] - priorityWeights[a.Type];

      if (weightDiff !== 0) {
        return weightDiff;
      }

      // Recency comparison
      return (
        new Date(b.Timestamp).getTime() -
        new Date(a.Timestamp).getTime()
      );
    })
    .slice(0, topN);
}