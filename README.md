# Mini-Project-Tracker
Mini Project Tracker

A full-stack web application to manage mini-projects and their associated tasks. Built with Angular, Node.js, Express, and MySQL.

---

## Features

- JWT-based Authentication
- Create, Read, Update, Delete Projects
- Manage Tasks under Projects
- Toggle Task Completion
- Paginated Project Listing
- Angular Material UI for responsive design

---

## Tech Stack

- **Frontend**: Angular 17, Angular Material
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Database Access**: MySQL2 package (raw SQL queries)
- **Authentication**: JWT

---

## Setup Instructions

### Backend (Node.js + Express)

1. Navigate to the backend folder:

   ```bash
   cd backend
2. Install dependencies
   ```bash
   npm install

3. Configure database connection in db.js or using .env file.
4. Start backend server
   ```bash
   npm start

### Frontend (Angular)

1. Navigate to the backend folder:

   ```bash
   cd frontend
2. Install dependencies
   ```bash
   npm install

3. Start backend server
   ```bash
   ng serve

## API Endpoints

### Project APIs
| Method | Endpoint            | Description                    |
| ------ | ------------------- | ------------------------------ |
| GET    | `/api/projects`     | Get paginated list of projects |
| GET    | `/api/projects/:id` | Get a single project by ID     |
| POST   | `/api/projects`     | Create a new project           |
| PUT    | `/api/projects/:id` | Update a project               |
| DELETE | `/api/projects/:id` | Delete a project               |

### Pask APIs
| Method | Endpoint                        | Description                          |
| ------ | ------------------------------- | ------------------------------------ |
| POST   | `/api/tasks`                    | Create a new task                    |
| GET    | `/api/tasks/project/:projectId` | Get all tasks for a specific project |
| PUT    | `/api/tasks/:id`                | Update task                          |
| PATCH  | `/api/tasks/:id/toggle`         | Toggle task completion (0/1)         |
| DELETE | `/api/tasks/:id`                | Delete a task                        |


### Author
Ayushi Patel 
