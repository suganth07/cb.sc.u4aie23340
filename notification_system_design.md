# Stage 1

## APIs

### Get Notifications

```http
GET /api/notifications
```

Query Params:
- page
- limit
- notification_type

Response:

```json
{
  "success": true,
  "data": []
}
```

---

### Get Priority Notifications

```http
GET /api/priorities
```

Response:

```json
{
  "success": true,
  "data": []
}
```

---

Headers:

```http
Authorization: Bearer token
Content-Type: application/json
```

---

# Stage 2

## DB Choice

I would use PostgreSQL because it supports:
- indexing
- scalability
- relational queries
- reliability

---

## Schema

### notifications

| column | type |
|---|---|
| id | UUID |
| studentID | BIGINT |
| notificationType | ENUM |
| message | TEXT |
| isRead | BOOLEAN |
| createdAt | TIMESTAMP |

---

## Example Query

```sql
SELECT *
FROM notifications
WHERE studentID = 1042
LIMIT 10;
```

---

# Stage 3

## Query Problem

```sql
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt ASC;
```

This becomes slow for large datasets because of full table scans.

---

## Solution

Use indexing:

```sql
CREATE INDEX idx_notifications
ON notifications(studentID, isRead, createdAt);
```

Adding indexes on every column is not good because it increases storage and slows writes.

---

## Placement Query

```sql
SELECT DISTINCT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 days';
```

---

# Stage 4

## Performance Improvements

- Redis caching
- Pagination
- Lazy loading
- Read replicas

These reduce DB load and improve response time.

---

# Stage 5

## Problems

Current implementation:
- slow
- sequential
- not scalable

If email sending fails midway, some students won't receive notifications.

---

## Better Solution

Use:
- queue system
- background workers
- retry mechanism

DB save and email sending should be separate for better reliability.

---

# Stage 6

## Priority Inbox

Priority order:
1. Placement
2. Result
3. Event

Then sort by latest timestamp.

Current complexity:

```txt
O(n log n)
```

Better optimization:
Use min heap for top 10 notifications.

```txt
O(n log k)
```