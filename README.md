# 🍔 Food Delivery App

A modern and scalable **Food Delivery Application** built using **Node.js** and **Express.js**.  
It allows users to browse restaurants, view menus, add items to their cart, and place food orders seamlessly.  
The system includes authentication, order tracking, and modular APIs for easy expansion.

---

## 🚀 Features

- 🔐 **User Authentication:** Secure login, signup, and JWT-based token authentication.  
- 🍴 **Restaurant Management:** Add, update, and manage restaurant data.  
- 📋 **Menu Management:** CRUD operations for menu items.  
- 🛒 **Cart System:** Add, remove, or view items in the user’s cart.  
- 📦 **Order Management:** Place, view, and track orders.  
- ⚙️ **Modular Structure:** Organized code for scalability and maintenance.  
- 💬 **Error Handling:** Centralized and consistent response structure.  
- 🌍 **Environment Config:** Easily managed via `.env` file.  

---

## 🧩 Folder Structure

modules/v1/
│
├── auth/ # Authentication (register, login, JWT)
├── users/ # User profile management
├── restaurant/ # Restaurant CRUD operations
├── menu/ # Menu management
├── cart/ # Cart operations
├── order/ # Order creation and tracking


---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Backend** | Node.js, Express.js |
| **Database** | Mysql |
| **Authentication** | JWT, bcrypt |
| **Config** | dotenv |
| **Optional Tools** | Nodemailer,  Validator |

---

## 🎨 UI/UX Design

Designed in **Figma** with a modern and user-friendly interface for both users and restaurants.  
Consistent layout, easy navigation, and smooth user experience were the main focus.

**Figma Screenshot:**  
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/a635304a-9305-4116-b0cb-dda317ed6276" />

---


📡 API Modules
Endpoint	Description
/auth	User registration, login, logout
/users	Manage user data and profile
/restaurant	Manage restaurant details
/menu	CRUD operations for menu items
/cart	Manage cart items
/order	Place and track orders
## ⚙️ Setup Instructions

Follow these simple steps to run the project locally 👇

```bash
# 1️⃣ Clone the repository
git clone https://github.com/Harsh-kumar04/Food-Delivery-App.git

# 2️⃣ Move into the project folder
cd Food-Delivery-App

# 3️⃣ Install dependencies
npm install

# 4️⃣ Create a .env file and add:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# 5️⃣ Start the server
npm start










