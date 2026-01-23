# Photo Caption API

A RESTful API that allows users to upload and retrieve images, as well as add captions. Includes user authentication using sessions and caching for improved performance.

## Features

- User registration and login with bcrypt password hashing
- Create and retrieve images using image URLs
- Add captions to images
- Cached image endpoints to reduce database queries
- Images and captions linked to user accounts
- Swagger UI for testing and exploring API routes

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- bcrypt (password hashing)
- express-session
- node-cache
- Swagger (OpenAPI)
- Render (deployment)

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd photo-caption-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory. Only SESSION_SECRET is required:

```
SESSION_SECRET=your_session_secret_key
```

4. Set up the database:

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

5. Start the server:

```bash
npm start
```

The API will be available at `http://localhost:3000` and API documentation at `http://localhost:3000/api-docs`

## API Endpoints

### User Management

- **POST** `/users` - Create a new user account
  - Body: `{ username, email, password }`
  - Returns: User ID, username, and email

- **POST** `/users/signin` - Sign in with email and password
  - Body: `{ email, password }`
  - Returns: User session information

### Images

- **GET** `/images` - Retrieve all images with their captions (cached)
  - Returns: Array of images with associated captions

- **POST** `/images` - Upload a new image (requires authentication)
  - Body: Image upload data
  - Returns: Created image details

### Captions

- **GET** `/images/:id/captions` - Get captions for a specific image
  - Returns: Array of captions for the image

- **POST** `/images/:id/captions` - Add a caption to an image (requires authentication)
  - Body: `{ text, userId }`
  - Returns: Created caption details
