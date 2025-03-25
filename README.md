# Web Client Project - XSS

## Overview

This project was done as part of my **second year of preparatory class** (**Bac +2**) in the **Prépa ISIMA** program, during the **2022-2023** academic year, in collaboration with my teammate **Éric Josien**. The primary goal of this project was to understand the fundamental concepts of web development from the client-side perspective and how it interacts with a backend.

The project topic was entirely **open-ended**. We chose to demonstrate various types of Cross-Site Scripting (XSS) vulnerabilities in the form of a basic web application, as a way to explore the concept. The focus of the project was not on the subject of the website itself, but rather on understanding client-side web technologies (HTML, CSS, JavaScript) and their interactions with a backend system.

To achieve this, I recreated the backend using **Flask**, as I lost the original code provided by the professor. The backend includes the following endpoints: `chatget`, `chatsend`, `login`, and `register`.

## Features

- **Chat System**: A simple chat system where messages are sent anonymously.
- **User Authentication**: Basic login and registration functionality.
- **Responsive Design**: The website is fully responsive, ensuring compatibility across different screen sizes.
- **XSS Demonstrations**: The site includes sections that introduce and demonstrate different types of XSS vulnerabilities (reflected, stored, and DOM-based).

## Technical Details

### Backend (Flask)

The backend is built using **Flask** and provides the following endpoints:

- **`/chatget`**: Retrieves chat messages.
- **`/chatsend`**: Sends a new chat message.
- **`/login`**: Handles user login.
- **`/register`**: Handles user registration.

### Data Storage

Data is stored in **Python lists** for simplicity. There is no persistent storage in this project, as the focus was on client-side development and interaction with a backend, rather than backend data management.

### Security

Security was **not a focus** for this project, as it was intended to introduce us to basic web client concepts. As a result:
- Chat messages are sent by an **anonymous** user (no session management or user authentication for the chat system).
- There is **no session management**, **cookies**, or **authentication tokens** implemented.

### Frontend

- **HTML/CSS**: The site was designed to be fully responsive across different devices.
- **JavaScript**: 
  - **jQuery** was used for chat functions (`chatget` and `chatsend`) to simplify DOM manipulation.
  - **XHR (XMLHttpRequest)** was used for the `login` and `register` endpoints as the professor requested that we avoid using jQuery for backend interactions at the beginning of the project.

## Demo

To run the project locally:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Ellipsis-GF/XSS-Web-Client-Project
    ```

2. **Install Python and dependencies**:
    You need to have Python installed on your machine. If you don't have it yet, you can download it from [python.org](https://www.python.org/).

    Next, install the required dependencies for Flask:

    ```bash
    pip install Flask
    ```

    You might also want to install the `flask-cors` package for handling Cross-Origin Resource Sharing (CORS) if you want to deal with cross-origin requests:

    ```bash
    pip install flask-cors
    ```

3. **Run the Flask server**:
    To run the Flask server, execute the following command:

    ```bash
    python ./backend/server.py
    ```

    This will start the Flask server on `http://127.0.0.1:5000`.

4. **Open the site**:
    - The frontend is made of HTML and CSS, and it does **not** require a server to be viewed. To see the site, simply open the `index.html` file in your browser.

## Screenshots

- **Login page**
- **Registration page**
- **Chat interface**

## Conclusion

This project gave me a strong understanding of how client-side web technologies work and how they interact with backend systems. This project helped me gain insights into web development, and it was an excellent introduction to client-side and backend communication.

## Authors

- **Greg Fortias**
- **Éric Josien**