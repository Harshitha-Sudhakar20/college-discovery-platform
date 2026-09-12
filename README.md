# College Discovery Platform

A full-stack college discovery platform built for the AI Software Engineer Internship demo assignment.

The application allows users to discover colleges, search and filter results, view detailed college information, and compare 2–3 colleges side by side.

## Live Demo

https://college-discovery-platform-virid-one.vercel.app

## GitHub Repository

https://github.com/Harshitha-Sudhakar20/college-discovery-platform

## Features

- College listing with database-backed data
- Search colleges by name
- Filter by city and state
- Filter by minimum rating
- Filter by maximum annual fees
- Pagination
- College detail pages
- Course information for each college
- Compare 2–3 colleges side by side
- Loading, empty, and error states
- API input validation
- REST-style JSON API responses
- PostgreSQL database
- Prisma ORM
- Responsive frontend built with Next.js and Tailwind CSS

## Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

### Backend
- Next.js App Router API routes
- TypeScript
- Prisma ORM

### Database
- PostgreSQL
- Prisma Postgres

### Deployment
- Vercel

## Architecture

The application follows a simple full-stack architecture:

```text
User
  |
  v
Next.js / React UI
  |
  v
Next.js API Routes
  |
  v
Prisma ORM
  |
  v
PostgreSQL
