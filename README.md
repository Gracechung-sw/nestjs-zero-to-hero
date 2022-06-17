# nestjs-zero-to-hero

---

## Objectives

- NestJS
  - NestJS Modules
  - NestJS Controllers
  - NestJS Services and Providers
  - Controller to Service communication
  - Validaton using NestJS Pipes
- Database
  - Connecting the application to a database
  - Working with relational databases using TypeORM
  - Writing simple and complex queries using QueryBuilder
  - Performance when working with da database
- Authorization/Authentication
  - Signing up, signing in
  - Authentication and Authorization
  - Protected resources
  - Ownership of tasks by users
  - Using JWT tokens
  - Password hashing, salts and properly stroing passwords
- Backend Architecture
  - Develop production-ready REST APIs
  - CRUD operations
  - Error handling
  - Data Transfer Objects (DTO)
  - System modularity
  - Back-end development best practices
  - Configuration Management
  - Logging
  - Security best practices
- Deployment
  - Polishing the application for production use
  - Deploying NestJS apps to AWS
  - Deploying frontend applications to AWS S3
  - Wiring up the frontend and backend

## Application Structure

- AppModule
  - TaskModule
    - TaskController
    - TaskService
    - Status ValidationPipe
    - TaskEntity
    - TaskRepository
    - ...
  - AuthModule
    - AuthController
    - AuthService
    - UserEntity
    - UserRepository
    - JwtStrategy
    - ...

## Installation

```bash
yarn global add @nestjs/cli
```
