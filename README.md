# Everything India E-commerce Platform

A full-stack e-commerce platform built with React and Node.js, allowing users to buy and sell products.

## Features

- User Authentication (Login/Signup)
- Product Management (Add, View, Edit, Delete)
- User Profiles
- Product Categories
- Image Upload Support
- Secure API with JWT Authentication

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS Modules

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- Multer for file uploads

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd everything-india
```

2. Install Backend Dependencies
```bash
cd backend
npm install
```

3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

4. Set up Environment Variables
Create a `.env` file in the backend directory with the following variables:
```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

5. Start the Backend Server
```bash
cd backend
npm start
```

6. Start the Frontend Development Server
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details 