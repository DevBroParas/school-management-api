# School Management API

This is a RESTful API for managing schools, including adding schools and listing schools based on proximity to a given location. The API is built using Node.js, Express, and MySQL.

## Features

- **Add School**: Add a new school with its name, address, latitude, and longitude.
- **List Schools**: Retrieve a list of schools sorted by their distance from a given location.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for building RESTful APIs.
- **MySQL**: Relational database for storing school data.
- **dotenv**: For managing environment variables.
- **haversine**: For calculating distances between geographical points.

## Prerequisites

- **Node.js** (v16 or higher)
- **MySQL** (v8 or higher)
- **RDS** (for database)
- **RENDER** (for Node Application)

## Installation

Clone the repository, install dependencies, create a `.env` file, and set up the database. Follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-username>/school-management-api.git
   cd school-management-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following variables:

   ```properties
   PORT="your_port"
   DB_HOST="your_host_name"
   DB_USER="your_username"
   DB_PASSWORD="your_mysql_password"
   DB_NAME="school_management"
   ```

4. Set up the database by executing the `schema.sql` file:

   ```bash
   mysql -u root -p < schema.sql
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:<Your_Port>`.

## API Endpoints

### Add a School

- **Endpoint**: `POST /addSchool`
- **Request Body**:
  ```json
  {
    "name": "Sunshine High School",
    "address": "123 Learning Lane",
    "latitude": 40.7128,
    "longitude": -74.006
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "School added successfully",
    "data": {
      "id": 1,
      "name": "Sunshine High School",
      "address": "123 Learning Lane",
      "latitude": 40.7128,
      "longitude": -74.006
    }
  }
  ```

### List Schools

- **Endpoint**: `GET /listSchools?latitude=<latitude>&longitude=<longitude>`
- **Query Parameters**:
  - `latitude`: Latitude of the user's location.
  - `longitude`: Longitude of the user's location.
- **Response**:
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "id": 1,
        "name": "Sunshine High School",
        "address": "123 Learning Lane",
        "latitude": 40.7128,
        "longitude": -74.006,
        "distance": 5.67
      }
    ]
  }
  ```

## Deployment

I Deployed the database to AWS-RDS and the node application to Render

## Project Structure

```
school-management-api/
├── db.js            # Database connection and pool setup
├── server.js        # Main server file with API routes
├── schema.sql       # SQL script to create database and table
├── .env             # Environment variables
├── .gitignore       # Ignored files for Git
├── package.json     # Project metadata and dependencies
└── readme.md        # Project documentation
```

## Author

- **DevBroParas**: [Your GitHub Profile](https://github.com/DevBroParas/school-management-api/>)
