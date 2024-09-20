# Car-API

## Table of Contents
- [Features](#features)
- [Technology Used](#technology-used)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Database Design](#database-design)
- [Architecture Design](#architecture-design)

## Features
- Register
- Login
- Logout
- Get Profile
- Update Profile
- Get List Of Cars (Paging & Wildcard Search)

## Technology Used
- Authentication: JWT
- Backend: Node.js, Express.js
- Database: MongoDB
- Password Encryption: bcryptjs
- Deployment: Docker
- Three Layer Architecture

## Installation
Add `.env` file
- Change the filename `.env.example` to `.env`
- Open `.env` to add mongo db connection string to connect your database
- Open `.env` and add JWT Secret

Install Required Package
```
npm install
```

Seed Database
```
npm run seed
```

Run API Server
```
npm start
```

Run API Server In Development Mode
```
npm run dev
```

API URL: `https://localhost:7046/api`
 
### Register
Description: To sign up.

API End Point: `POST /signup`

Request Header:
```
Content-Type:application/json
```

Request Body:
```
{
  "password": string,
  "username": string,
  "displayusername": string,
  "timestamp": string // UTC time of the operation in ISO 8601 format
}
```

Success Response Body:
```
{
  "token": string, // JWT token
  "displayusername": string,
  "userid": string,
}
```

Failed Response: 

Status Code `403 Forbidden`
```
{
    "errors": "Failed"
}
```

### Login
Description: To login.

API End Point: `POST /session/login`

Request Header:
```
Content-Type:application/json
```

Request Body:
```
{
  "password": string,
  "username": string,
  "timestamp": string // UTC time of the operation in ISO 8601 format
}
```

Success Response Body:
```
{
  "token": string, // JWT token
  "displayusername": string,
  "userid": string,
}
```

Failed Response:

Status Code `403 Forbidden`
```
{
    "errors": "Failed"
}
```

### Logout
Description: Check Bearer token and logout.

API End Point: `POST /session/logout`

Request Header:
```
Content-Type:application/json
Authorization: Bearer ##token##
```

Request Body:
```
{
  "timestamp": string // UTC time of the operation in ISO 8601 format
}
```
Success Response: `200 No Content`

Failed Response: 

Status Code `403 Forbidden`
```
{
    "errors": "Failed"
}
```

### Get Profile
Description: To get user profile by token.

API End Point: `POST /getprofile`

Request Header:
```
Content-Type:application/json
Authorization: Bearer ##token##
```

Request Body:
```
{
  "timestamp": string // UTC time of the operation in ISO 8601 format
}
```

Success Response Body:
```
{
  "username": string,
  "displayusername": string,
  "userid": string,
}
```

Failed Response: 

Status Code `403 Forbidden`
```
{
    "errors": "Failed"
}
```

### Update Profile
Description: To update user profile by token.

API End Point: `POST /updatemyprofile`

Request Header:
```
Content-Type:application/json
Authorization: Bearer ##token##
```

Request Body:
```
{
  "displayusername": string,
  "timestamp": string // UTC time of the operation in ISO 8601 format
}
```

Success Response Body: 
```
{
  "username": string,
  "displayusername": string,
  "userid": string,
}
```

Failed Response: 

Status Code `403 Forbidden`
```
{
    "errors": "Failed"
}
```

### Get List of Cars
Description: Validate brearer and get car lists with pagination and wildcard search

API End Point: `POST /getcarlist`

Request Header:
```
Content-Type:application/json
Authorization: Bearer ##token##
```

Request Body:
```
{
  "carname": string, // wildcard search
  "pageindex": number, // page number
  "pagesize": number, // item per page
  "timestamp": string // UTC time of the operation in ISO 8601 format
}
```

Success Response Body:
```
{
  "list": 
  [
    {
      "id": string,
      "carname": string,
      "brand": string,
      "description": string,
      "variance": 
      [
        {
          "id": string,
          "name": string,
          "price": number
        }
      ]
    }
  ],
  "totalcount": number
}
```

Failed Response:

Status Code `403 Forbidden`
```
{
    "errors": "Failed"
}
```

## Database Design
user
- id: char(36) (PK) // uuid
- username: varchar(100) (not null, unique)
- displayUsername: varchar(500) (not null)
- password: varchar(50) (not null)
- createdAt: DateTime // UTC format
- updatedAt: DateTime // UTC format

car
- id: char(36) (PK)
- name: varchar(150) (not null, unique)
- brand: varchar(150) (not null)
- description: varchar(100000) (not null)

car_variance
- id: char(36) (PK)
- name: varchar(150) (not null, unique)
- price: decimal(6,0) (not null)
- carId: char(36) (FK) (not null)

## Architecture Design - Three Layer Architecture
- app.js (program start from here)
- Routes
    - AuthenticationRoutes
    - UserRoutes
    - CarRoutes
- Middlewares
    - AuthenticationMiddleware
    - ErrorHandleMiddleware
    - RouteNotFoundMiddleware
- Controllers
    - AuthenticationController
    - UserController
    - CarController
- Services
    - AuthenticationService
    - CarService
    - UserService
- CustomErrors
    - index.js (access all errors from this file)
    - CustomError
    - BadRequestError
    - NotFoundError
    - UnauthenticatedError
- Models (validation)
    - User
    - Car
- Seeder
    - Seeder (run all seeder at once)
    - CarSeeder