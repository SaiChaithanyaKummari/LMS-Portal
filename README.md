# Learning Management System (LMS) Portal

A modern, responsive, full-stack Learning Management System platform built with the MERN stack (MongoDB, Express, React, Node.js). 

This application provides a comprehensive environment for both students to learn and administrators to seamlessly manage course content.

---

## 🚀 Features

### 🎓 For Students
- **Authentication:** Secure Sign Up and Log In functionality with password visibility toggles.
- **Course Catalog:** Browse all available courses with detailed descriptions, curriculum overviews, and instructor information.
- **Course Enrollment:** Enroll in desired courses directly from the course details page.
- **My Courses Dashboard:** A dedicated space to track enrolled courses and learning progress.
- **Video Player Integration:** An interactive video player interface designed for smooth playback of course modules, tracking current lessons against the entire syllabus.
- **Protected Routes:** Certain areas of the platform are strictly locked to authenticated users.

### 🛠️ For Administrators
- **Role-Based Access Control:** Separate login flow identifying admins (`role: "admin"`). Regular users cannot access backend systems.
- **Admin Dashboard:** A dedicated interface to manage the platform's course database.
- **Course Management (CRUD):**
  - **Create:** Add new courses with thumbnails, difficulty levels, duration, and instructor details.
  - **Read:** View an organized table of all existing courses.
  - **Update:** Edit active courses dynamically through pre-filled forms.
  - **Delete:** Remove outdated courses seamlessly from the database.
- **Video Module Management:** Map multiple dynamic video lessons onto a course by specifying individual video titles, YouTube URLs, thumbnail images, and durations.

---

## 💻 Tech Stack

- **Frontend:** React.js, React Router DOM, Bootstrap 5 (CSS framework), Vanilla CSS (Custom styling).
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (using Mongoose object modeling).
- **Deployment:** Render (Live static site deployment for Frontend, Live Web Service for Backend).

---

## ⚙️ Getting Started (Local Development)

### 1. Prerequisites
Ensure you have the following installed on your local machine:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- A cluster available on MongoDB Atlas (or a local MongoDB instance).

### 2. Clone the Repository
```bash
git clone <your-repository-url>
cd LMS-Portal
```

### 3. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root of the `Backend` directory and define your MongoDB connection string and Port:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?appName=Courses
   PORT=5000
   ```
4. Seed the Database (Optional):
   Populate your local database with initial courses and a default Admin (`admin@lms.com`):
   ```bash
   node seed.js
   ```
5. Start the backend server:
   ```bash
   node server.js
   ```

### 4. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the API connection:
   Ensure `Frontend/src/services/Api.js` points to your backend URL. For local development, it should be:
   ```javascript
   const API_BASE = "http://localhost:5000";
   ```
4. Start the frontend React app:
   ```bash
   npm start
   ```

### 5. Access the Platform
- **Frontend URL:** `http://localhost:3000` (or whichever port React defaults to).
- **Default Admin Login:** 
  - Email: `admin@lms.com` 
  - Password: `admin123`

---

## 🎨 Theme & UI/UX
The UI boasts a sophisticated, high-contrast, professional aesthetic. It relies on a pristine white background spanning the entire application footprint, accented by a solid black navigation bar, providing maximum readability and a premium feel.

---

## 🛡️ License
This project is proprietary.