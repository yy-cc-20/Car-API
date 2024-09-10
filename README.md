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
- Logging

## Technology Used
- Authentication: JWT
- Backend: Node.js, Express.js
- Database: MySQL
- Database first approach
- Documentation: Swagger
- Password Encryption: bcryptjs
- Deployment: Docker
- Three Layer Architecture

## Installation
Create Database
- Find the database migration files at `./Database_Migration` directory
- Run the sql script to create database 'car' in mysql database
- Run the sql script to insert sample data into the database
- Open `.env.example` to change mysql connection string to connect your mysql database
- Change the filename `.env.example` to `.env`

Install Required Package
```
npm install
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

API End Point: `POST /api/signup`

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

API End Point: `POST /api/session/login`

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

API End Point: `POST /api/session/logout`

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

API End Point: `POST /api/getprofile`

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

API End Point: `POST /api/updatemyprofile`

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

API End Point: `POST /api/getcarlist`

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
- display_username: varchar(500) (not null)
- password: varchar(50) (not null)
- created_at: DateTime // UTC format
- updated_at: DateTime // UTC format

car
- id: char(36) (PK)
- name: varchar(150) (not null, unique)
- brand: varchar(150) (not null)
- description: varchar(100000) (not null)

car_variance
- id: char(36) (PK)
- name: varchar(150) (not null, unique)
- price: decimal(6,0) (not null)
- car_id: char(36) (FK) (not null)

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
- Controllers (Handling request, error handling, logging)
    - AuthenticationController
    - UserController
    - CarController
- Business Logic Layer (data procession)
    - AuthenticationLogic (create JWT token, isValidToken)
    - CarLogic
    - UserLogic
- Data Access Layer (database connection)
- CustomErrors
    - index.js (you can import all errors from this file)
    - CustomError
    - BadRequestError
    - NotFoundError
    - UnauthenticatedError
    - InternalServerError
- Models (perform validation)
    - User
    - Car
    - CarVariance