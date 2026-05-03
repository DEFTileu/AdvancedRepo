# Travel Platform MVP

## Students

- Azamat Bakhytzhan - `240103167`
- Tileuzhan Sairanbek - `240103112`
- Alpamys Naukan - `240103111`
- Adilkhan Kerimshe - `240103108`

## Project

Travel Platform MVP is a student project for booking apartments and renting cars in one app.

## Problem

Travelers often need housing and transport at the same time. Most services solve only one of these tasks. This project combines both in one system.

## What It Does

- shows cars and apartments on a map;
- has list and detail pages;
- supports login and registration;
- lets users create bookings;
- lets admins manage listings;
- supports English, Russian, and Kazakh.

## How It Works

- `frontend` is a React SPA;
- `backend` is a Spring Boot REST API;
- `postgres` stores app data.

## Tech Specs

- Frontend: React 19, TypeScript, Vite, React Router, TanStack Query, Tailwind CSS, Leaflet
- Backend: Java 17, Spring Boot, Spring Security, Spring Data JPA, Gradle
- Database: PostgreSQL 16
- Deployment: Docker, Docker Compose, Nginx

## Run

```bash
docker compose up --build
```

Ports:

- frontend: `http://localhost:8081`
- backend: `http://localhost:8080`
- postgres: `localhost:15432`

## Demo Admin

- username: `admin`
- password: `admin1234`
