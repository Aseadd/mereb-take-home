
# 🧪 Full Stack gRPC Application with Python and React

This project demonstrates a full stack application with:

A Python backend using gRPC

A React frontend that communicates with the backend

Docker containers for both services

The application allows users to send a string to the backend via a gRPC call and displays the returned string.
---

## Features:

Backend Service:

gRPC server implemented in Python

Ping method that echoes back the received string

Protocol buffers for service definition

Frontend Service:

React-based user interface

Input field for user text

Button to trigger gRPC call

Display area for server response

## 📸 Demo
![Demo video](https://github.com/user-attachments/assets/3d2f1a71-6712-444a-bb79-c161d1333570)


---

## 🧱 Architecture

The application follows a microservices-based architecture with the following components:

1. **Frontend**: Built with React and vitest for a responsive and interactive user interface.
2. **Backend**: Developed using Python, gRPC, pytest
3. **Containerization**: For communication between frontend and the backend
4  **Containerization**: Docker Compose for seamless deployment and local development.

---


## 🛠️ Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/Aseadd/mereb-take-home.git
    cd mereb-take-home
    ```

2. Start the application using Docker Compose:
    ```bash
    docker compose up --build
    ```

3. Access the application at `http://localhost:8080`.

---

## 👥 Author <a name="author"></a>

Addis Tsega

- GitHub: [Aseadd](https://github.com/Aseadd)
- Twitter: [@AdaTsega](https://twitter.com/AdaTsega)
- LinkedIn: [addis-tsega](https://www.linkedin.com/in/addis-tsega/)

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 📝 License <a name="license"></a>

This project is [MIT](./MIT.md) licensed.



<p align="right">(<a href="#readme-top">back to top</a>)</p>
