# 📜 Multi-Level Category Management API

A Node.js-based **Category Management API** with JWT authentication, built using **Express.js, TypeScript, MongoDB (Mongoose ORM)**. This API supports **nested categories** (tree structure), CRUD operations, and optimized performance.  

---

## 🚀 Features
✅ **User Authentication** (Register, Login, JWT-protected routes)  
✅ **Category Management** (CRUD operations, hierarchical structure)  
✅ **Performance Optimizations** (MongoDB indexes, optimized queries, bulk updates)  
✅ **Jest Test Cases**  

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/ParthTank21/category-management-apis.git
cd category-management-apis
```

### 2️⃣ Install Dependencies
```sh
npm install
```
or  
```sh
yarn install
```

### 3️⃣ Create a `.env` File
Inside the project root, create a **`.env`** file with the following:  
```env
MONGO_URI=mongodb+srv://your-mongodb-uri
JWT_SECRET=your-secret-key
```

### 4️⃣ Start the Server
```sh
npm run dev
```
or  
```sh
yarn dev
```
The server will start on **http://localhost:5000** 🚀  

---

## 🔑 Authentication API
All **API routes** are **protected** except `/register` and `/login`.  
**Include the `Authorization` header** with `Bearer <token>` in requests.

### 📌 Register a New User
#### `POST /api/auth/register`
**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "message": "User registered successfully"
}
```

### 📌 Login
#### `POST /api/auth/login`
**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "token": "your-jwt-token"
}
```

---

## 📂 Category Management API
### 📌 Create a Category
#### `POST /api/category`
**Headers:**
```json
{ "Authorization": "Bearer your-jwt-token" }
```
**Request:**
```json
{
  "name": "Electronics",
  "parent": null
}
```
**Response:**
```json
{
  "message": "Category created successfully",
  "category": {
    "_id": "65f2bc...e4a",
    "name": "Electronics",
    "parent": null,
    "status": "active"
  }
}
```

### 📌 Get All Categories (Tree Format)
#### `GET /api/category`
**Response:**
```json
[
  {
    "_id": "65f2bc...e4a",
    "name": "Electronics",
    "parent": null,
    "status": "active",
    "subcategories": [
      {
        "_id": "65f2bd...a1b",
        "name": "Laptops",
        "parent": "65f2bc...e4a",
        "status": "active"
      }
    ]
  }
]
```

### 📌 Update Category
#### `PUT /api/category/:id`
**Request:**
```json
{
  "name": "Updated Name",
  "status": "inactive"
}
```
**Response:**
```json
{
  "message": "Category updated successfully"
}
```

### 📌 Delete Category (Reassign Children)
#### `DELETE /api/category/:id`
**Response:**
```json
{
  "message": "Category deleted and subcategories reassigned"
}
```

---

## 🛠️ Running Tests
To run **Jest test cases**, execute:
```sh
npm test
```
or  
```sh
yarn test
```

---

## 🎯 Best Practices & Optimizations
- **MongoDB Indexing** for efficient lookups.  
- **Bulk updates** for status changes to avoid performance bottlenecks.  
- **Tree structure** implemented using **parent-child references** in MongoDB.  

---

## 📜 License
This project is licensed under the **MIT License**.  

---
🚀 **Happy Coding!** 🎉
