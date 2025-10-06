# Bus Schedules App

A full-stack web application for browsing and managing intercity bus lines.  
The app provides passengers with an intuitive way to search, filter, and view available bus routes and companies, while allowing bus companies to efficiently manage their own schedules.

---

## Features

- Search and filter bus lines by route, date and company
- View details about bus companies
- Add, edit, and manage bus schedules (for authorized users)
- Secure authentication and authorization with JWT
- Responsive UI built with React and Bootstrap

---

## Tech Stack

### Frontend
- **React** (with TypeScript)
- **Bootstrap** for responsive styling
- **Axios** for API communication
- **Vite** for fast builds and development

### Backend
- **Java Spring Boot** 
- **PostgreSQL** as the database
- **Docker** for running the database locally

---

## Prerequisites

Before running the app, make sure you have installed:

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Java JDK 21+](https://adoptium.net/)
- [Maven](https://maven.apache.org/)
- [Docker](https://www.docker.com/) (for local database)
- Git (for cloning the repository)   

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/nikolovaradica/bus-schedules-app.git
cd bus-schedules-app
```

### 2.Start the PostgreSQL database with Docker
```bash
cd backend
docker-compose up -d
```

### 3. Run the backend
```bash
cd backend
mvn spring-boot:run
```

### 4. Run the frontend
```
cd frontend
npm install
npm run dev
```
