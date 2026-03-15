# GraphQL Server (Node.js + TypeScript + Prisma)

A simple GraphQL backend built with Node.js, TypeScript, Express, and Prisma.
The project demonstrates a clean backend architecture using GraphQL with modular entities, repositories, and services.

---

## Features

- GraphQL API
- TypeScript support
- Prisma ORM for database access
- Modular entity-based structure
- Authentication with hashed passwords
- Clean separation of concerns (resolvers, repositories, services)

---

## Tech Stack

- Node.js
- TypeScript
- Express
- GraphQL
- Prisma
- PostgreSQL
- bcrypt (for password hashing)

---

## Project Structure

```
src
│
├─ entities
│   ├─ user
│   │   ├─ resolver.ts
│   │   ├─ type-defs.graphql
│   │   └─ index.ts
│   │
│   ├─ job
│   │   ├─ resolver.ts
│   │   ├─ type-defs.graphql
│   │   └─ index.ts
│
├─ graphql
│   ├─ schema.ts
│   └─ context.ts
│
├─ repositories
│   └─ user.repository.ts
│
├─ services
│
├─ middleware
│
├─ utils
│   ├─ password.ts
│   └─ jwt.ts
│
├─ lib
│   └─ prisma.ts
│
└─ server.ts
```

---

## Installation

Clone the repository:

```
git clone <repository-url>
cd server
```

Install dependencies:

```
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory.

Example:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
PORT=4000
```

---

## Prisma Setup

Generate Prisma client:

```
npx prisma generate
```

Run database migrations:

```
npx prisma migrate dev
```

---

## Running the Server

Start the development server:

```
npm run dev
```

GraphQL server will run at:

```
http://localhost:4000/graphql
```

---

## Example Query

```
query {
  users {
    id
    email
    name
  }
}
```

---

## Future Improvements

- Role-based authorization
- DataLoader to prevent N+1 queries
- GraphQL subscriptions
- Improved authentication and refresh tokens

---

## License

This project is for learning purposes.
