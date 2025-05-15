# 🛠️ Crafty – Job Posting & Request Platform

<div align="center">
  <img src="https://res.cloudinary.com/danlxus36/image/upload/v1747322930/Screenshot_1_f0v9k7.png" width="700" />
  <img src="https://res.cloudinary.com/danlxus36/image/upload/v1747322931/Screenshot_2_ayhroh.png" width="700" />
  <img src="https://res.cloudinary.com/danlxus36/image/upload/v1747322931/Screenshot_3_ic9pta.png" width="700" />
  <img src="https://res.cloudinary.com/danlxus36/image/upload/v1747322930/Screenshot_4_kazgg4.png" width="700" />
  <img src="https://res.cloudinary.com/danlxus36/image/upload/v1747322931/Screenshot_5_vinuju.png" width="700" />
</div>

---

**Servicer** is a full-stack CRUD web application that allows users to post job listings or request jobs from others. It supports payment integration through PayPal and provides status tracking for job requests.

---

## ✨ Features

- 📝 **Post Jobs** – Create, view, edit, and delete job listings  
- 🙋 **Request Jobs** – Users can apply to job listings posted by others  
- 🔄 **Status Tracking** – Requests go through various statuses like `pending`, `waiting for payment`, `active`, and `completed`  
- 💰 **PayPal Integration** – Users can pay for jobs securely using PayPal  
- ☁️ **Image Uploads** – Integrated with Cloudinary for image hosting  
- 🔐 **Auth & State** – Frontend state managed with Zustand; backend authentication and route protection built-in

---

## 🧱 Tech Stack

- **Frontend:** React, Zustand, SCSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB with Mongoose  
- **File Uploads:** Cloudinary  
- **Payments:** PayPal REST API

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/servicer.git
cd servicer


📦 Folder Structure
bash
Copy
Edit
/client         → React frontend  
/server         → Express backend  
.env            → Environment config (not committed)


2. Install Dependencies
Backend
bash
Copy
Edit
cd server
npm install
Frontend
bash
Copy
Edit
cd ../client
npm install
3. Setup Environment Variables
Create a .env file in the /server directory with the following:

ini
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
PORT=5001

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
⚠️ Do NOT commit or share your real credentials publicly.

4. Run the App
Backend
bash
Copy
Edit
cd server
npm run dev
Frontend
bash
Copy
Edit
cd ../client
npm start
📦 Folder Structure
bash
Copy
Edit
/client         → React frontend  
/server         → Express backend  
.env            → Environment config (not committed)  
