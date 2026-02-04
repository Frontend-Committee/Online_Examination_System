# Online Examination System

An online examination platform that allows users to register, browse subjects, take exams, and track their exam history.  
The system is designed with a clean UI/UX and a scalable architecture to support both users and administrators.

---

## Features
- User authentication (Login / Register / Logout)
- JWT-based protected routes
- Subject management and organization
- Online exams with multiple questions
- User exam history and results tracking
- Responsive and modern UI design

---

## User Roles

### User
- Register and log in
- View available subjects and exams
- Take exams and submit answers
- View personal exam history

### Admin
- Manage subjects
- Create and manage exams
- Add and manage questions

---

## Technologies Used
- React.js
- Tailwind CSS
- JavaScript
- Axios
- React Router

---

## Project Structure

```txt
src/
├── api/                 # Backend connection & API configuration
│   ├── axiosInstance.js
│   └── endPoints.js
│
├── assets/              # Static assets (images, icons)
│   ├── icons/
│   └── images/
│
├── components/          # Reusable UI components
│   ├── Layout/          # Navbar, Sidebar, Footer
│   ├── ProtectedRoutes/ # Auth & role-based guards
│   └── UI/
│
├── context/             # Global state management
│   └── AuthContext.js
│
├── pages/               # Application pages
│   ├── Auth/            # Login, Register, Profile
│   ├── Subjects/        # Subjects list & management
│   ├── Exams/           # Exams and exam dashboard
│   └── History/         # User exam history
│
├── routes/
│   └── AppRoutes.jsx    # Main routing configuration
│
├── services/            # API service logic
│   ├── authService.js
│   ├── subjectService.js
│   ├── examService.js
│   └── historyService.js
│
├── App.jsx
└── main.jsx
```
## How to Run the Project
 - Clone the repositor
 - Navigate to the project folder
 - npm install (in CMD)
 - npm run dev
 - The application will run on : (ex: http://localhost:5173)