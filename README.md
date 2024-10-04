# FriendyFy

**FriendyFy** is a social networking platform that allows users to create posts, interact with others through comments and likes, and manage their profiles. The platform is built using the MERN stack and supports JWT authentication for secure user sessions.

## Features

- User registration and authentication using JWT.
- Create, like, and comment on posts.
- Real-time updates for user interactions.
- Scalable architecture with backend hosted on Render and frontend on Vercel.

## Technologies Used

### Frontend:
- **React.js**
- **Redux** (State Management)
- **Tailwind CSS** (Styling)

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB** (Database)
- **JWT** (Authentication)

### Additional Tools:
- **Render** (Backend Hosting)
- **Vercel** (Frontend Hosting)

## Installation

### Prerequisites:
- Node.js
- MongoDB

### Steps to run the project:

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/friendyfy.git
    ```

2. Navigate to the **frontend** and **backend** directories and install the dependencies:

    ```bash
    cd frontend
    npm install

    cd ../backend
    npm install
    ```

3. Create a `.env` file in the **backend** directory with the necessary environment variables. Example:

    **Backend .env**:
    ```env
    DATABASE_URL=<Your MongoDB URL>
    JWT_SECRET=<Your JWT Secret>
    ```

4. Start both the backend and frontend servers:

    **Backend**:
    ```bash
    npm start
    ```

    **Frontend**:
    ```bash
    npm start
    ```

5. Open the application in your browser at `http://localhost:3000`.

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## License

This project is licensed under the MIT License.
