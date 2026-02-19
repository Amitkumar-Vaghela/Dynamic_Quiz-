# Dynamic Quiz Application – Docker Deployment on AWS EC2

## Project Overview

This project demonstrates how to deploy a frontend-based Dynamic Quiz application on an AWS EC2 instance using Docker and Makefile automation.
The application is served using Nginx inside a Docker container.

The purpose of this project is to practice DevOps concepts such as containerization, cloud deployment, and automation.

---

## Technologies Used

- HTML
- CSS
- JavaScript
- Docker
- Nginx
- Makefile
- AWS EC2 (Amazon Linux)

---

## Project Structure

Dynamic_Quiz-/

├── frontend/        # Frontend quiz application files
├── Dockerfile       # Docker image configuration
├── Makefile         # Automation commands
├── REPORT.md
└── README.md

---

## Prerequisites

- AWS Account
- EC2 Instance (Amazon Linux)
- Security Group with:
  - SSH (Port 22)
  - HTTP (Port 80)
- Docker installed
- Make installed
- Git installed

---

## EC2 Setup

### Connect to EC2

ssh -i your-key.pem ec2-user@your-ec2-public-ip

---

### Install Docker (Amazon Linux)

sudo yum update -y
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

Logout and login again after adding user to docker group.

---

### Install Make

sudo yum install make -y

---

### Clone Repository

git clone https://github.com/Amitkumar-Vaghela/Dynamic_Quiz-.git
cd Dynamic_Quiz-

---

## Dockerfile

FROM nginx:alpine

COPY frontend/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"



This configuration serves the frontend application using Nginx.

---
]
