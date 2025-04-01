# 🗒️ NoteKeeper API

NoteKeeper is a secure REST API built with **TypeScript**, **Express**, **Knex**, and **PostgreSQL**. It allows users to register, log in, and manage personal notes. Authentication is handled with JWT.

---

## 🚀 Features

- User registration & login (JWT auth)
- CRUD operations for notes
- Protected routes with middleware
- PostgreSQL + Knex migrations
- Input validation with Zod
- CORS configured for frontend integration

---

## 📦 Tech Stack

- TypeScript · Express · PostgreSQL · Knex
- JWT Auth · Zod Validation · dotenv · CORS

---

## 🔐 Authentication

After login, use the token:

```
Authorization: Bearer <token>
```

---

## 📮 API Routes

### Users

| Method | Endpoint              | Access  |
|--------|-----------------------|---------|
| POST   | `/api/users/signup`   | 🔓 Public |
| POST   | `/api/users/login`    | 🔓 Public |
| PUT    | `/api/users/update`   | 🔐 Token |
| DELETE | `/api/users/delete`   | 🔐 Token |

### Notes

| Method | Endpoint            | Access  |
|--------|---------------------|---------|
| GET    | `/api/notes`        | 🔐 Token |
| GET    | `/api/notes/:id`    | 🔐 Token |
| POST   | `/api/notes`        | 🔐 Token |
| PUT    | `/api/notes/:id`    | 🔐 Token |
| DELETE | `/api/notes/:id`    | 🔐 Token |

---

## 🛠️ Getting Started

### 1. Clone the project

```bash
git clone https://github.com/your-username/notekeeper.git
cd notekeeper
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```
PORT=4000
DATABASE_URL=postgres://user:password@localhost:5432/notekeeper
JWT_SECRET=your_secret_key
```

### 4. Run database migrations

```bash
npx knex migrate:latest
```

> This will create the `users` and `note` tables.

### 5. Start the development server

```bash
npm run dev
```

> Server will start on `http://localhost:4000`

---

### 🔐 Authentication Note

After logging in, use the token in your headers:

```
Authorization: Bearer <token>
```

---
