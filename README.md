# Patient Booking and Dashboard Application

## 👨‍💻 Project Description

This is a full-stack web application for managing patient appointments. The backend, built with Node.js and Express.js, provides a secure API for user authentication and appointment management. The frontend is a responsive patient dashboard created with Next.js, allowing users to book and view their appointments.

## ✨ Features

### Frontend (Patient Dashboard)
- **User Authentication**: Unauthenticated users are automatically redirected to the login page
- **Date-Based Slot Filtering**: Provides a date selector to view available slots for the next seven days
- **Appointment Booking**: Patients can easily book an available time slot
- **My Bookings**: Displays a list of all current appointments for the logged-in user
- **Secure Logout**: A dedicated button allows users to securely end their session

### Backend (API)
- **RESTful API**: Endpoints for registration, login, fetching slots, and booking appointments
- **JWT Authentication**: Secures API routes with JSON Web Tokens
- **Password Hashing**: Passwords are securely hashed using bcryptjs
- **Database Seeding**: A script is included to populate the database with an admin user and initial time slots

## 🛠️ Tech Stack Choices

### Backend
**Node.js & Express.js**: The choice of Node.js with the Express framework allows for a highly scalable, non-blocking API. This stack is ideal for handling many concurrent requests, which is a common requirement for web services. A key trade-off is that it can be less suited for CPU-intensive tasks compared to languages like Java or Go.

**Mongoose & MongoDB**: We used Mongoose to interact with a MongoDB NoSQL database. MongoDB's flexible schema is a major advantage for rapidly developing applications, as it doesn't require a rigid data structure. The trade-off is that it can be less performant for complex joins compared to a traditional SQL database.

### Frontend
**Next.js**: Next.js was chosen for its robust framework features, including server-side rendering and static site generation, which improve performance and SEO. It provides a strong foundation for building scalable React applications. A potential trade-off is the added complexity compared to a simpler Create React App setup.

**Tailwind CSS & shadcn/ui**: This combination enables rapid and consistent UI development. Tailwind's utility-first approach allows for highly customizable designs directly in the JSX, while shadcn/ui provides pre-built, accessible components that integrate seamlessly with Tailwind, saving significant development time. The main trade-off is the initial learning curve of Tailwind's extensive utility class system.

## 🚀 How to Run Locally

**README steps verified ✅**

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Steps

1. **Install Backend Dependencies**: Navigate to your backend directory and run:
```bash
npm install
```

2. **Install Frontend Dependencies**: Navigate to your frontend directory and run:
```bash
npm install
```

3. **Seed the Database**: First, populate the database with initial data:
```bash
npm run seed
```

4. **Run Backend**: Start the backend server:
```bash
npm start
```

5. **Run Frontend**: Start the Next.js development server:
```bash
npm run dev
```

## ⚙️ Environment Variables

### Backend (.env)
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Password123
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🌐 API Endpoints (Postman/cURL)

### 1. Register a Patient
```bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
    "name": "Test Patient",
    "email": "patient@example.com",
    "password": "Passw0rd!"
}'
```

### 2. Login and Get a JWT
```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
    "email": "patient@example.com",
    "password": "Passw0rd!"
}'
```

### 3. Book an Appointment
```bash
# First, get the JWT from the login response above.
# Replace <YOUR_JWT_TOKEN> with the actual token.
# Replace <SLOT_ID> with a valid slot ID from the database.
curl -X POST http://localhost:3000/api/book \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
-d '{
    "slotId": "<SLOT_ID>"
}'
```

## ☁️ Deployment Steps

### Frontend (Next.js)

1. Build the Next.js application for production:
```bash
npm run build
```

2. Deploy the out directory to a hosting provider like Vercel or Netlify:
```bash
# Example for Vercel
vercel --prod
```

### Backend (Node.js/Express)

1. Containerize the application using a Dockerfile
2. Push the image to a container registry (e.g., Docker Hub)
3. Deploy the container to a cloud platform like Heroku, Render, or a Kubernetes cluster
4. Ensure all backend environment variables are configured on the deployment platform

## 📝 Known Limitations & Next Steps

### Notes on Trade-offs & Next Steps

- **Missing Delete API**: The frontend code includes a delete button, but the corresponding DELETE API endpoint on the backend is not yet implemented. This would be my first priority with more time.

- **No Admin Dashboard**: The application lacks an interface for an admin user to manage slots, user accounts, or view all bookings.

- **Basic Error Handling**: The current error handling is functional but could be more robust to provide detailed and user-friendly feedback for various API failures.

- **Improved UI**: I'd improve the styling of the "My Bookings" section, possibly adding a visual indicator for appointment status (e.g., Confirmed, Pending). I'd also integrate a more robust date picker component for a better user experience.

## ℹ️ Application Details

**Frontend URL**: https://frontend-rouge-kappa-75.vercel.app/

**Test Credentials:**
- **Patient**: Abhinav@gmail.com / 123456
- **Admin**: admin@example.com / Password123