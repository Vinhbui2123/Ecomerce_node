# 🛒 E-Commerce REST API

A full-featured RESTful API for an E-Commerce platform built with **Node.js**, **Express.js**, and **MongoDB**. This project provides a comprehensive backend solution covering user authentication, product management, order processing, blog system, and more.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Authentication Flow](#-authentication-flow)
- [Database Models](#-database-models)

---

## ✨ Features

### 🔐 Authentication & Authorization

- User registration with **email verification** (confirmation code via Nodemailer)
- Auto-cleanup of unverified accounts after 5 minutes
- Login with **JWT Access Token** (1-day expiry) & **Refresh Token** (5-day expiry, stored in HTTP-only cookie)
- Refresh token rotation for secure session management
- **Forgot/Reset password** flow via email link with hashed token (SHA-256)
- **Role-based access control** (User / Admin)
- Password hashing with **bcrypt** (salt rounds: 10)

### 📦 Product Management

- Full **CRUD** operations (Admin only for create/update/delete)
- **Advanced query features:**
  - Filtering with MongoDB operators (`$gte`, `$gt`, `$lte`, `$lt`)
  - Title search with regex (case-insensitive)
  - Field selection (projection)
  - Sorting by multiple fields
  - Pagination with configurable page size
- **Rating & Review system** — users can rate products (1-5 stars) with comments; auto-calculates average rating
- **Image upload** to Cloudinary (up to 10 images per product)
- SEO-friendly URL slugs via `slugify`

### 🛍️ Order System

- Create orders from user cart with automatic total calculation
- **Coupon/discount** support with percentage-based discount
- Order status management (`Processing` → `Success` / `Cancelled`)
- View personal order history (User) or all orders (Admin)

### 🛒 Shopping Cart

- Add products to cart with quantity and color variants
- Smart cart update: merge quantity if same product & color, or add as new entry
- Cart data stored within user document

### 📝 Blog System

- Full **CRUD** operations for blog posts
- **Like / Dislike** toggle system (mutually exclusive)
- **View count** tracking (auto-increment on read)
- Image upload to Cloudinary
- Pagination support

### 🏷️ Category & Brand Management

- **Product categories** with associated brands and images
- **Blog categories** for content organization
- **Brand** management with CRUD operations

### 🎟️ Coupon System

- Create discount coupons with name, discount percentage, and expiry date
- Full CRUD for coupon management (Admin only)

### 📊 Data Seeding

- Bulk product import from JSON dataset
- Bulk category import with brand associations

---

## 🛠️ Tech Stack

| Layer                | Technology                              |
| -------------------- | --------------------------------------- |
| **Runtime**          | Node.js                                 |
| **Framework**        | Express.js                              |
| **Database**         | MongoDB + Mongoose ODM                  |
| **Authentication**   | JSON Web Tokens (JWT)                   |
| **Password Hashing** | bcrypt                                  |
| **File Upload**      | Multer + Cloudinary                     |
| **Email Service**    | Nodemailer (Gmail SMTP)                 |
| **Security**         | CORS, HTTP-only Cookies, Token Rotation |
| **Utilities**        | slugify, uniqid, dotenv, cookie-parser  |
| **Dev Tools**        | Nodemon                                 |

---

## 📁 Project Structure

```
server/
├── config/
│   ├── cloudinary.config.js   # Cloudinary + Multer storage setup
│   └── dbconnect.js           # MongoDB connection handler
├── controllers/
│   ├── user.js                # Auth & user management logic
│   ├── product.js             # Product CRUD + rating + image upload
│   ├── order.js               # Order creation & status management
│   ├── blog.js                # Blog CRUD + like/dislike + views
│   ├── coupon.js              # Coupon CRUD
│   ├── brand.js               # Brand CRUD
│   ├── productCategory.js     # Product category CRUD
│   ├── blogCategory.js        # Blog category CRUD
│   └── insertData.js          # Data seeding utilities
├── middlewares/
│   ├── errHandler.js          # Global error & 404 handler
│   ├── jwt.js                 # Token generation (access + refresh)
│   └── verifytoken.js         # Token verification & admin check
├── models/
│   ├── user.js                # User schema (cart, wishlist, auth)
│   ├── product.js             # Product schema (ratings, images)
│   ├── order.js               # Order schema (status, coupon ref)
│   ├── blog.js                # Blog schema (likes, views)
│   ├── coupon.js              # Coupon schema (expiry date)
│   ├── brand.js               # Brand schema
│   ├── productCategory.js     # Product category schema
│   └── blogCategory.js        # Blog category schema
├── routes/
│   ├── index.js               # Route aggregator + error middleware
│   ├── user.js                # /api/user routes
│   ├── product.js             # /api/product routes
│   ├── order.js               # /api/order routes
│   ├── blog.js                # /api/blog routes
│   ├── coupon.js              # /api/coupon routes
│   ├── brand.js               # /api/brand routes
│   ├── productCategory.js     # /api/productcategory routes
│   ├── blogCategory.js        # /api/blogcategory routes
│   └── insert.js              # /api/insert data seeding routes
├── ultils/
│   └── sendmail.js            # Nodemailer email utility
├── server.js                  # App entry point
├── package.json
└── .env
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 16.x
- **MongoDB** (local or Atlas cloud)
- **Cloudinary** account (for image uploads)
- **Gmail** account with App Password (for email service)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/ecommerce-nodejs.git

# Navigate to project
cd ecommerce-nodejs/server

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev

# Or start production server
npm start
```

The server will start on `http://localhost:<PORT>` (default: 8888).

---

## 🧪 Test Accounts

| Role      | Email                 | Password |
| --------- | --------------------- | -------- |
| **Admin** | vinhbui2712@gmail.com | 123111   |
| **User**  | gptplus704@gmail.com  | 12345    |

> [!NOTE]
> These accounts are for **development/testing purposes only**. Do not use them in production.

---

## 🔑 Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=8888
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:3000
URL_SERVER=http://localhost:8888

# Cloudinary
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret

# Email (Gmail)
EMAIL_NAME=your_email@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password

# Pagination
LIMIT_PRODUCTS=10
```

---

## 📡 API Endpoints

### 👤 User — `/api/user`

| Method   | Endpoint                | Access | Description                                  |
| -------- | ----------------------- | ------ | -------------------------------------------- |
| `POST`   | `/register`             | Public | Register new user (sends verification email) |
| `PUT`    | `/finalregister/:token` | Public | Verify email with token                      |
| `POST`   | `/login`                | Public | Login & receive JWT tokens                   |
| `GET`    | `/current`              | User   | Get current user profile                     |
| `POST`   | `/refreshtoken`         | Public | Refresh access token                         |
| `GET`    | `/logout`               | Public | Logout & clear refresh token                 |
| `POST`   | `/forgotpassword`       | Public | Send password reset email                    |
| `PUT`    | `/resetpassword`        | Public | Reset password with token                    |
| `PUT`    | `/update`               | User   | Update own profile                           |
| `PUT`    | `/address`              | User   | Add new address                              |
| `PUT`    | `/cart`                 | User   | Add/update cart items                        |
| `GET`    | `/`                     | Admin  | Get all users                                |
| `DELETE` | `/`                     | Admin  | Delete user by ID                            |
| `PUT`    | `/:uid`                 | Admin  | Update user by admin                         |

### 📦 Product — `/api/product`

| Method   | Endpoint            | Access | Description                               |
| -------- | ------------------- | ------ | ----------------------------------------- |
| `POST`   | `/`                 | Admin  | Create product                            |
| `GET`    | `/`                 | Public | Get all products (filter, sort, paginate) |
| `GET`    | `/:pid`             | Public | Get product by ID                         |
| `PUT`    | `/:pid`             | Admin  | Update product                            |
| `DELETE` | `/:pid`             | Admin  | Delete product                            |
| `PUT`    | `/rating`           | User   | Rate & review product                     |
| `PUT`    | `/uploadimage/:pid` | Admin  | Upload product images (max 10)            |

### 🛍️ Order — `/api/order`

| Method | Endpoint       | Access | Description            |
| ------ | -------------- | ------ | ---------------------- |
| `POST` | `/`            | User   | Create order from cart |
| `GET`  | `/`            | User   | Get own orders         |
| `GET`  | `/admin`       | Admin  | Get all orders         |
| `PUT`  | `/status/:oid` | Admin  | Update order status    |

### 📝 Blog — `/api/blog`

| Method   | Endpoint        | Access | Description                           |
| -------- | --------------- | ------ | ------------------------------------- |
| `POST`   | `/`             | Admin  | Create blog post                      |
| `GET`    | `/`             | Public | Get all blog posts (paginate)         |
| `GET`    | `/one/:bid`     | Public | Get blog by ID (auto-increment views) |
| `PUT`    | `/like/:bid`    | User   | Toggle like on blog                   |
| `PUT`    | `/dislike/:bid` | User   | Toggle dislike on blog                |
| `PUT`    | `/image/:bid`   | Admin  | Upload blog image                     |
| `PUT`    | `/:bid`         | Admin  | Update blog                           |
| `DELETE` | `/:bid`         | Admin  | Delete blog                           |

### 🎟️ Coupon — `/api/coupon`

| Method   | Endpoint | Access | Description     |
| -------- | -------- | ------ | --------------- |
| `POST`   | `/`      | Admin  | Create coupon   |
| `GET`    | `/`      | Public | Get all coupons |
| `PUT`    | `/:cid`  | Admin  | Update coupon   |
| `DELETE` | `/:cid`  | Admin  | Delete coupon   |

### 🏷️ Product Category — `/api/productcategory`

| Method   | Endpoint | Access | Description        |
| -------- | -------- | ------ | ------------------ |
| `POST`   | `/`      | Admin  | Create category    |
| `GET`    | `/`      | Public | Get all categories |
| `PUT`    | `/:pcid` | Admin  | Update category    |
| `DELETE` | `/:pcid` | Admin  | Delete category    |

### 📂 Blog Category — `/api/blogcategory`

| Method   | Endpoint | Access | Description             |
| -------- | -------- | ------ | ----------------------- |
| `POST`   | `/`      | Admin  | Create blog category    |
| `GET`    | `/`      | Public | Get all blog categories |
| `PUT`    | `/:bcid` | Admin  | Update blog category    |
| `DELETE` | `/:bcid` | Admin  | Delete blog category    |

### 🏢 Brand — `/api/brand`

| Method   | Endpoint | Access | Description    |
| -------- | -------- | ------ | -------------- |
| `POST`   | `/`      | Admin  | Create brand   |
| `GET`    | `/`      | Public | Get all brands |
| `PUT`    | `/:bid`  | Admin  | Update brand   |
| `DELETE` | `/:bid`  | Admin  | Delete brand   |

---

## 🔐 Authentication Flow

```
┌──────────┐    Register      ┌──────────┐    Verify Email     ┌──────────┐
│  Client  │ ───────────────► │  Server  │ ──────────────────► │  Email   │
│          │                  │          │   (Send code)       │  Service │
└──────────┘                  └──────────┘                     └──────────┘
     │                             │                                │
     │    Submit Code              │                                │
     │ ───────────────────────►    │                                │
     │                             │  Activate Account              │
     │    ◄────────────────────    │                                │
     │                             │                                │
     │    Login                    │                                │
     │ ───────────────────────►    │                                │
     │                             │  Generate Access + Refresh     │
     │    ◄────────────────────    │  Token                        │
     │    (Access Token in body)   │                                │
     │    (Refresh Token in cookie)│                                │
     │                             │                                │
     │    API Request              │                                │
     │    + Bearer Token           │                                │
     │ ───────────────────────►    │  Verify Token → Process        │
     │    ◄────────────────────    │                                │
```

---

## 📊 Database Models

### User

| Field               | Type            | Description                    |
| ------------------- | --------------- | ------------------------------ |
| firstname, lastname | String          | User's name                    |
| email               | String (unique) | Email address                  |
| mobile              | String (unique) | Phone number                   |
| password            | String          | Hashed password (bcrypt)       |
| role                | String          | `user` / `admin`               |
| cart                | Array           | Products with quantity & color |
| whislist            | Array           | Product references             |
| address             | String          | Delivery address               |
| isBlocked           | Boolean         | Account block status           |
| refreshToken        | String          | Current refresh token          |

### Product

| Field           | Type           | Description                      |
| --------------- | -------------- | -------------------------------- |
| title           | String         | Product name                     |
| slug            | String         | SEO-friendly URL                 |
| description     | Array          | Product details                  |
| brand           | String         | Brand name                       |
| price           | Number         | Price                            |
| category        | String         | Product category                 |
| quantity / sold | Number         | Stock / sold count               |
| images / thumb  | Array / String | Cloudinary URLs                  |
| ratings         | Array          | Star rating + comment + user ref |
| totalRatings    | Number         | Average rating                   |

### Order

| Field    | Type     | Description                            |
| -------- | -------- | -------------------------------------- |
| products | Array    | Product refs with count & color        |
| status   | Enum     | `Processing` / `Success` / `Cancelled` |
| total    | Number   | Order total                            |
| coupon   | ObjectId | Coupon reference                       |
| orderBy  | ObjectId | User reference                         |

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👤 Author

Built with ❤️ as a full-stack learning project.
