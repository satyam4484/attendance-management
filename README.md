# Attendance Management System

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Attendance Management System is a MERN (MongoDB, Express.js, React.js, Node.js) web application that facilitates the process of taking attendance in educational institutions. It utilizes voice recognition technology to accept numeric inputs from teachers, which are then converted to text and used to mark the attendance of students.

## Features

- **_Voice input_**: Teachers can use their voice to provide numeric inputs for marking attendance.
- **_Attendance Marking_**: Attendance for students can be marked efficiently using the voice inputs.
- **_Secure Authentication_**: The application employs secure authentication methods to ensure data privacy.
- **_Dashboard_**: Users have access to a personalized dashboard with relevant information and options.
- **_Role-based Access Control_**: Different user roles with appropriate access levels (e.g., College, Teacher, Student).
- **_Admin Panel_**: An admin panel will be available for managing college accounts, teacher accounts and student information.
- **_Reports_**: The system generates attendance reports for colleges and teachers to monitor student attendance within a selected date range.
- **_Notifications_**: Automated reminders and notifications to users for marking attendance.
- **_Data Export_**: Export attendance reports in various formats (CSV, Excel, etc.).
- **_Responsive UI_**: The application is designed to be responsive and accessible from various devices.

## Technologies

The Attendance Management System is built using the following technologies:

- **Frontend**:

  - React: _JavaScript library for building user interfaces._
  - Context API: _State management library for managing global application state._
  - HTML/CSS: _Markup and styling of the application._
  - Axios: _HTTP client for making API requests._

- **Backend**:
  - Node.js: _JavaScript runtime for server-side development._
  - Express: _Web framework for building APIs._
  - MongoDB: _NoSQL database for storing application data._
  - Mongoose: _MongoDB object modeling for Node.js._
  - JSON Web Tokens (JWT): _For user authentication and authorization._

## Installation

Follow these steps to set up the Attendance Management System on your local machine:

1. Clone the repository from GitHub:

```bash
git clone https://github.com/satyam4484/attendance-management.git

cd attendance-management
```

2. Install frontend and backend dependencies:

```bash
cd frontend

npm install
```

```bash
cd ../backend

npm install
```

## Setup

To run the Attendance Management System on your local machine, follow these steps:

1. Set up environment variables:

Create a `.env` file in the `backend` directory and add the following:

```bash
DATABASE=your_mongodb_connection_string
SECRET_KEY=your_secret_key_for_jwt
EMAIL_USERNAME=your_email_address
EMAIL_PASSWORD=your_email_password
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string, and `your_secret_key_for_jwt` with a strong secret key for JWT (JSON Web Tokens) used in authentication. 

Also, replace `your_email_address` and `your_email_password` with your actual email address and password created by Google account of resp email address. 

The email address and password are used for sending automated emails to users.

2. Start the backend server:

```bash
cd backend

npm run dev
```

3. Start the frontend application:

```bash
cd frontend

npm start
```

## Usage

1. Open your web browser and go to `http://localhost:3000` to access the application.

2. Create an account based on your role: College, Teacher, or Student.

3. Log in to the application with your credentials.

4. College account: As a college administrator, you can manage teachers, students, and view attendance reports.

5. Teacher account: As a teacher, you can take attendance using voice input and view student attendance records.

6. Student account: As a student, you can view your attendance status.

## API Documentation

API documentation provides details about the endpoints used to interact with the application's server. This documentation assumes you have set up the application on your local machine or deployed it to a server.

Please refer to the [API Documentation](https://documenter.getpostman.com/view/17718134/2s946h7C6y) for a detailed view of the API endpoints, including request parameters, response formats, and example usage.

## Contributing

If you'd like to contribute to the Attendance Management System, please follow the guidelines in the [`CONTRIBUTING.md`](CONTRIBUTING.md) file.

## License

The Attendance Management System is open-source software licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as per the terms of the license.
