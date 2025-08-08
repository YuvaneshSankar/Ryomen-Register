# Sorcerer Registry

A full-stack web application inspired by anime themes that allows users to register sorcerers and view registered sorcerers in a dynamic, animated interface.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Getting Started](#getting-started)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [What I Learned](#what-i-learned)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Overview

This project is a **modern React frontend** with smooth animations and an interactive form paired with a **FastAPI backend** powered by **Prisma ORM** for database management. It demonstrates asynchronous communication through Axios from frontend to backend for creating and fetching user data.

---

## Features

- Responsive React UI with animated particles and fade effects  
- Form to register sorcerers with name, age, and bloodline holder  
- List view with animated and styled cards of all registered sorcerers  
- Backend API with FastAPI for POST and GET user operations  
- Prisma ORM integrates management of user records with a database  
- Cross-origin requests handled via FastAPI CORS middleware  
- Clean separation of frontend and backend codebases with Axios integration  

---

## Technologies Used

- **Frontend:** React, Axios, Tailwind CSS (for styling)  
- **Backend:** FastAPI, Prisma ORM, Python 3.9+  
- **Database:** (As per your Prisma configuration, e.g., PostgreSQL, SQLite)  
- **Other:** CORS middleware, async/await for asynchronous operations  

---
<img width="1327" height="912" alt="image" src="https://github.com/user-attachments/assets/6c0fc5c5-c24c-4905-aab9-0ee4d4cb15db" />
<img width="1517" height="931" alt="image" src="https://github.com/user-attachments/assets/efa24226-3b2f-44d1-a6f9-21fa3e269be4" />


## Getting Started

### Prerequisites

- Node.js and npm/yarn installed  
- Python 3.9+ installed  
- Database setup as required by Prisma  

### Installation

**Backend**

cd backend
pip install -r requirements.txt

Set up your database and Prisma
prisma generate
uvicorn main:app --reload



**Frontend**

cd frontend
npm install
npm start



---

## Usage

1. Navigate to the frontend app in your browser (usually `http://localhost:3000`).  
2. Use the form to register new sorcerers with a name, age, and bloodline holder.  
3. Submit and navigate to the "Registered Sorcerers" page to view existing sorcerers.  
4. The list fetches live data from your FastAPI backend and updates dynamically.  

---

## Project Structure

/backend

main.py

prisma/

requirements.txt
/frontend

src/

App.js

components/

styles.css

package.json
README.md



---

## What I Learned

- How to build a full-stack app with React and FastAPI  
- Using Prisma ORM effectively in Python backend  
- Handling asynchronous API calls with Axios in React  
- Managing React state and side effects with hooks (`useState`, `useEffect`)  
- Enabling and configuring CORS for frontend-backend communication  
- Designing smooth UI animations with CSS and React  

---

## Contributing

Contributions are welcome!  
Please fork the repo and create a pull request with your improvements or bug fixes.

---

## License

This project is licensed under the MIT License — see the LICENSE file for details.

---

*Created by [Yuvanesh.s]*
