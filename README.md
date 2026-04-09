
# 🚀 Slooze – Full Stack RBAC + ReBAC Order Management System

> A modern full-stack web application demonstrating **Role-Based Access Control (RBAC)** and **Relationship-Based Access Control (ReBAC)** using **NestJS, GraphQL, Prisma (MongoDB), and Next.js**.

---

## 🌐 Live Demo

| Service | Link |
|--------|------|
| 🖥️ Frontend (Vercel) | [slooze-eight.vercel.app](https://slooze-eight.vercel.app/) |
| ⚙️ Backend (Render) | [slooze-backend-z2iq.onrender.com](https://slooze-backend-z2iq.onrender.com/) |
| 🧩 GraphQL Playground | [/graphql](https://slooze-backend-z2iq.onrender.com/graphql) |

---

## 🧠 Project Overview

This project simulates a **multi-role order management system** where:

- Users have roles: `ADMIN`, `MANAGER`, `MEMBER`
- Orders are tied to users and countries
- Access is controlled using **RBAC + ReBAC policies**

---

## 🔐 Access Control

### ✅ RBAC (Role-Based Access Control)

| Role | Permissions |
|------|-------------|
| `ADMIN` | Full access — create, place, cancel, update payment |
| `MANAGER` | Can create, place, and cancel orders |
| `MEMBER` | Read-only — can only view orders |

### 🔗 ReBAC (Relationship-Based Access Control)

- Users can **only access orders from their own country**
- `ADMIN` can access **all orders globally**
- Ensures **data isolation across regions**

---

## 🛠️ Tech Stack

### Backend
- **NestJS** – Scalable Node.js framework
- **GraphQL** (Apollo Server) – API layer
- **Prisma ORM** – Database access
- **MongoDB** – NoSQL database

### Frontend
- **Next.js** (App Router) – React framework
- **Apollo Client** – GraphQL state management
- **Tailwind CSS** – Utility-first styling
- **React Hot Toast** – Notifications

---

## 🎨 UI Features

- 🎨 Gradient backgrounds
- 🧊 Frosted glass cards
- 🔔 Toast notifications (success & error)
- 📊 Dashboard layout
- 📱 Fully responsive

---

## 🔑 Key Features

### 🧑‍💼 Login Simulation
User selection dropdown simulates login and dynamically updates permissions based on role.

### 📦 Order Management
- Create Order
- Place Order
- Cancel Order
- View Orders

### 🎯 Dynamic UI (RBAC Applied)
Buttons are shown or hidden based on the logged-in user's role — Members cannot see restricted actions.

### 🌍 Multi-Region Logic (ReBAC)
Orders are filtered by country to enforce secure, region-based data visibility.

### 🔔 Real-time Feedback
Toast notifications for all actions:
- ✅ Order created
- 🚀 Order placed
- ❌ Order cancelled

---

## 📁 Project Structure

```
slooze/
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── user/
│   │   │   └── order/
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
└── frontend/
    ├── app/
    ├── components/
    ├── lib/
    │   └── apolloClient.ts
    └── package.json
```

---

## ⚙️ Setup Instructions

### 🔹 Backend

```bash
cd backend
npm install
npx prisma generate
npm run start:dev
```

### 🔹 Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Sample GraphQL Queries

### Create Order
```graphql
mutation {
  createOrder(userId: "USER_ID")
}
```

### Get Orders
```graphql
query {
  getOrders(userId: "USER_ID")
}
```

### Place Order
```graphql
mutation {
  placeOrder(userId: "USER_ID", orderId: "ORDER_ID")
}
```

### Cancel Order
```graphql
mutation {
  cancelOrder(userId: "USER_ID", orderId: "ORDER_ID")
}
```

---

## 💡 Key Learnings

- Implemented RBAC & ReBAC in a real-world scenario
- Integrated GraphQL with NestJS using Apollo Server
- Built a scalable Prisma schema on MongoDB
- Created a modern UI with Tailwind CSS
- Managed async state with Apollo Client
- Improved UX with toast notifications

---

## 🧑‍💻 Author

**Abdullah Ansari**  
Final Year Computer Engineering Student

---

## ⭐ Conclusion

This project demonstrates a production-ready architecture combining:

- 🔒 Secure backend design with layered access control
- 🎨 Clean, modern frontend UI
- 🌍 Real-world RBAC + ReBAC access models

If you found this project helpful, consider giving it a ⭐ on GitHub!
