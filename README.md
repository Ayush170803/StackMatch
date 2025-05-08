# 🔥 StackMatch

**StackMatch** is a smart, developer-focused matchmaking platform that helps programmers find and connect with like-minded coders, collaborators, or mentors based on their tech stack, interests, and coding habits. Whether you're looking to build a side project, get peer support, or just grow your network — StackMatch helps you find the perfect match!

---

## 🧠 Features

- 🔍 **Smart Matching Algorithm** based on languages, frameworks, experience, and goals
- 🧑‍🤝‍🧑 **Match Requests** – explore style
- 📚 **Tech Stack** to find exact or complementary skillsets
- 🌙 **Dark Mode** for code-friendly browsing
- 🔗 RESTful API Integration
- 🔐 Authentication with JWT

---
 ## 🛠️ Tech Stack

**Frontend**  
- React.js   
- Redux 
- Axios

**Backend**  
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

---

# 📁 Project Structure
```
StackMatch/
│
├── Backend/
│   └── src/
│       ├── config/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       └── App.js
│
├── Frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── utils/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── index.html
│
├── .gitattributes
└── README.md
```
## 💡 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/Ayush170803/StackMatch.git
```

### 2. Backend Setup

```bash
cd Backend
npm install
nodemon src/app.js
```

> Backend will run on `http://localhost:3000`

### 3. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

> Frontend will run on `http://localhost:5173`

## 🧪 Admin Test Credentials

Use the following credentials to log in as an admin:

```
EMAIL = "admin@gmail.com"
PASSWORD = "Admin@12"
```
## 📡 StackMatch API Endpoints

### 🔐 Auth Routes

| Method | Endpoint       | Description            |
|--------|----------------|------------------------|
| POST   | /signup        | Register a new user    |
| POST   | /login         | Log in existing user   |
| POST   | /logout        | Log out the session    |

---

### 👤 Profile Routes

| Method | Endpoint        | Description         |
|--------|-----------------|---------------------|
| GET    | /profile/view   | View user profile   |
| PATCH  | /profile/edit   | Edit user profile   |

---

### 🧑‍🤝‍🧑 User Routes

| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| GET    | /feed              | Get developer feed        |
| GET    | /user/requests     | Get connection requests   |
| GET    | /user/connections  | Get existing connections  |

---

### 🔗 Connection Routes

| Method | Endpoint                                 | Description                        |
|--------|------------------------------------------|------------------------------------|
| POST   | /request/send/interested/:toUserId       | Send "interested" request          |
| POST   | /request/send/ignored/:toUserId          | Send "ignored" request             |
| POST   | /request/review/accepted/:requestId      | Accept a connection request        |
| POST   | /request/review/rejected/:requestId      | Reject a connection request        |

---

## 📈 Future Improvements
- Enhanced Matchmaking Algorithm
- In-App Messaging
- GitHub & Portfolio Integration
- Project Collaboration Boards
- Dark/Light Theme Toggle

---

## 🤝 Contributing
- Contributions are welcome!

```
# Fork the repo
# Create your feature branch (git checkout -b feature/YourFeature)
# Commit your changes (git commit -m 'Add YourFeature')
# Push to the branch (git push origin feature/YourFeature)
# Open a Pull Request
```

## 🧑‍💻 Author
- [Ayush Kumar](https://github.com/Ayush170803)
