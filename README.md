# Practice Dashboard

A task management dashboard built with Express 5, TypeScript, and PostgreSQL.

## Tech Stack

- **Runtime:** Node.js + TypeScript (via `tsx`)
- **Framework:** Express 5
- **Database:** PostgreSQL with `pg` (node-postgres)
- **Validation:** Zod 4
- **Frontend:** Vanilla HTML/CSS/JS (served separately)

## Project Structure

```
├── database/
│   ├── pool.ts          DB connection pool
│   └── queries.ts       SQL query functions
├── routes/
│   └── tasksRouter.ts   Express route handlers for /api/tasks
├── src/
│   ├── schemas/
│   │   └── schema.ts    Zod validation schemas
│   └── server.ts        Express app entry point
├── test_routes.bat      API endpoint test script
├── tsconfig.json
└── package.json
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env` file in the project root:

```env
DB_USER=your_db_user
DB_HOST=localhost
DB_DATABASE=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432
PORT=3000
```

### 3. Start the server

```bash
npm start        # starts with tsx
npm run dev      # starts with file-watch mode (auto-restart on changes)
```

Server runs at `http://localhost:3000`.

## API Endpoints

### `GET /`
Health check. Returns `"server is running"`.

### `GET /api/tasks`
Fetch tasks with optional filters and pagination.

**Query parameters:**

| Param      | Type   | Default | Description          |
|-----------|--------|---------|----------------------|
| `name`    | string | `""`    | Filter by assignee (ILIKE) |
| `priority`| string | —       | Filter by priority   |
| `page`    | number | `1`     | Page number          |
| `limit`   | number | `3`     | Items per page (max 100) |

**Response:**
```json
{
  "tasks": [ ... ],
  "meta": {
    "currentPage": 1,
    "limit": 3,
    "totalTasks": 10,
    "totalPages": 4
  }
}
```

### `POST /api/tasks`
Create a new task.

**Body:**
```json
{
  "title": "Task title",
  "assigned_to": "Person name",
  "priority": "low",
  "status": "pending",
  "due_date": "2026-07-15"
}
```

### `PATCH /api/tasks/:id`
Update one or more fields of a task.

**Body:** Any subset of `title`, `assigned_to`, `priority`, `status`, `due_date`.

## Running Tests

```bat
test_routes.bat
```

The script:
- Auto-starts the server if not running
- Tests all 4 routes (GET, POST, PATCH, error cases)
- Reports pass/fail counts
- Exits with code 0 on success, 1 on failure

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start server with `tsx` |
| `npm run dev` | Start server with file watching |
| `.\test_routes.bat` | Run API endpoint tests |
