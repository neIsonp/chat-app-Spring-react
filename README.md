# Chat Web Application

This Chat Web application built using Spring Boot and React.

## Table of Contents

- [Description](#description)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)
- [Building and Running the Application](#building-and-running-the-application)
- [Contributing](#contributing)

## Description

The Chat Web application is a demo project built using Spring Boot on the backend and React on the frontend. It allows users to engage in real-time chat conversations without utilizing websockets. The application provides a user-friendly interface for sending and receiving messages.

## Technologies

The application is built using the following technologies:

**Backend:**

- Java
- Spring Boot
- Spring Data JPA
- Spring Security
- Spring Validation
- MySQL
- JSON Web Tokens (JWT)

**Frontend:**

- React
- React Router
- Material-UI (MUI)
- Emotion
- Redux
- Redux Thunk
- Tailwind CSS

## Getting Started

To get started with the Chat Web application, follow the instructions below.

### Prerequisites

- Java Development Kit (JDK) 17 or later
- Node.js and npm (Node Package Manager)
- MySQL database

### Installation

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/neIsonp/chat-app-Spring-react

2. Install the frontend dependencies by navigating to the frontend directory and executing the following command:

   ```shell
   cd frontend
   npm install

### Dependencies

**Backend Dependencies:**

- Spring Boot Starter Data JPA
- Spring Boot Starter Security
- Spring Boot Starter Validation
- Spring Boot Starter Web
- Spring Boot DevTools
- MySQL Connector/J
- Spring Boot Starter Test
- Jackson Databind
- Spring Security Test
- jjwt-api
- jjwt-impl
- jjwt-jackson

**Frontend Dependencies:**

- @emotion/react
- @emotion/styled
- @lottiefiles/react-lottie-player
- @mui/material
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- react
- react-dom
- react-icons
- react-redux
- react-router-dom
- react-scripts
- redux
- redux-thunk
- web-vitals

### Building and Running the Application

**Backend:**

To build and run the Chat Web application backend, follow the steps below:

1. Navigate to the project's root directory:

   ```shell
   cd chat-web

2. Build the application using Maven:

   ```shell
   mvn clean package

3. Run the application:

   ```shell
   java -jar target/chat-web-0.0.1-SNAPSHOT.jar

The backend server will start running on http://localhost:5454

**Frontend:**

To build and run the Chat Web application frontend, follow the steps below:

1. Navigate to the frontend directory:

   ```shell
   cd chat-web/frontend

2. Run the frontend development server:

   ```shell
   npm start
   
The frontend server will start running on http://localhost:3000.

### Contributing

Contributions to the Chat Web application are welcome. If you find any issues or want to enhance the application, feel free to open a pull request.


