# 🛡️ JWT Auth API (Node.js + MongoDB + Docker + Jest + Swagger)

[![CodeQL Advanced](https://github.com/wallaceb-dev/rest-api-jwt-auth/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/wallaceb-dev/rest-api-jwt-auth/actions/workflows/codeql.yml)

A secure and containerized RESTful API using Node.js, Express, MongoDB, JWT authentication, Jest for testing, Swagger for documentation, and Docker for smooth local development.

![Demo Catalog](demo.gif)

---

## 🚀 Features

- ✅ User registration with encrypted password
- ✅ Login returning a signed JWT
- ✅ Protected route (`/profile`) using Bearer Token
- ✅ MongoDB database integration
- ✅ Bcrypt password hashing
- ✅ Swagger UI for API documentation
- ✅ Jest + Supertest test suite
- ✅ Docker & Docker Compose support
- ✅ GitHub Actions for CI

---

## 📁 Project Structure

```
rest-api-jwt-auth/
├── models/               # Mongoose schemas
│   └── User.js
├── tests/                # Jest + Supertest test files
│   └── auth.test.js
├── .github/workflows/    # GitHub Actions config
│   └── ci.yml
├── .env                  # Environment variables
├── swagger.js            # Swagger config
├── entrypoint.sh         # Runs dev or prod mode
├── server.js             # Express app entry
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Getting Started

### 🔧 Local Development with Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rest-api-jwt-auth
   cd rest-api-jwt-auth
   ```

2. Create a `.env` file:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://mongo:27017/jwt_auth
   JWT_SECRET=your-secret-key
   ```

3. Build and run with Docker:
   ```bash
   docker-compose up --build
   ```

4. Access the API at: [http://localhost:3000](http://localhost:3000)  
   Access the Swagger docs at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🔐 API Documentation (Swagger)

Available at: `/api-docs`

### Auth Endpoints

#### `POST /register`
Registers a user and returns a JWT token.

#### `POST /login`
Authenticates user and returns a JWT token.

#### `GET /profile`
Protected route. Requires Bearer token in the `Authorization` header.

---

## 🧪 Running Tests

Make sure MongoDB is running (Docker or local):


```bash
docker compose exec app bash 
```

Then, from inside the app container run:

```bash
npm test
```

---

## ✅ GitHub Actions CI

- Every push and pull request to `main` triggers tests on GitHub Actions.
- MongoDB is spun up as a service automatically in the workflow.
- Workflow file: `.github/workflows/ci.yml`

---

## 🐳 Docker Tips

- Stop containers: `docker-compose down`
- Rebuild from scratch: `docker-compose up --build`
- Check logs: `docker-compose logs -f app`

---

## 🔄 Environment Switching

Your container behavior is controlled via `.env`:

- `NODE_ENV=development` → runs `npm run dev` (nodemon)
- `NODE_ENV=production` → runs `npm start`

Managed via `entrypoint.sh`

---

## 📄 License

MIT License. Use it, fork it, build on it.

---

## 👨‍💻 Author

**Wallace Belem Teixeira**  
Full-stack developer | Node.js, PHP, Laravel, MongoDB, Docker, CI/CD

> "Built with passion, documented with care."
