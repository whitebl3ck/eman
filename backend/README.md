# EventMan Backend

Backend server for the EventMan platform - an event management system connecting customers, event planners, and venue owners.

## Features

- User authentication (signup/login)
- Multi-role user system (Customer, Event Planner, Venue Owner)
- Role switching capability
- Profile management for each role
- JWT-based authentication
- MongoDB database

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eventman
JWT_SECRET=your-secret-key
NODE_ENV=development
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register a new user
- POST `/api/auth/login` - Login user

### User Management
- GET `/api/users/types` - Get user's roles
- POST `/api/users/types` - Add a new role
- PUT `/api/users/types/primary` - Set primary role
- PUT `/api/users/profiles/:type` - Update profile for specific role

## Database Schema

### User Model
```javascript
{
  email: String,
  password: String,
  userTypes: [{
    type: String,
    isPrimary: Boolean,
    createdAt: Date
  }],
  profiles: {
    customer: Object,
    planner: Object,
    venue_owner: Object
  }
}
```

## Development

- Built with Node.js and Express
- MongoDB with Mongoose ODM
- JWT for authentication
- Express Validator for input validation 