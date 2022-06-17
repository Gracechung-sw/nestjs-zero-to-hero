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

---

## Start Nestjs application

### Installation

```bash
yarn global add @nestjs/cli
```

### Start Nestjs application

```bash
nest new [project name]

# I used `nest new .`
```

### Generate

```bash
nest g <schematic>
# Or you can used `nest g --help` for help what's available schematics
```

### Defining a module

A module is defined by annotating a class with the `@Module` decorator.  
This decorator provides metadata taht Nest uses to organize the application structure.  
The properties what we can provide to the `@Module` decorator.

- providers
- controllers
- exports
- imports

### Defining a controller

Responsible for handling incoming requests and returing responses to the client.
Bound to a specific path. Ex,. /tasks for the task resource.

Controllers are defined by decorating a class with the `@Controller` decorator.  
The decorator accepts the path string, which is to be handled by the controller.

Containe handlers, whick handle endpoints and request methods.  
Handlers are simply methods within the controller class, decorated with `@Get`, `@Post`, `@Delete`.. etc.

```Typescript
@Controller('/task')
export class TasksController {
  @Get()
  getAllTasks(){
    //...
  }

  @Post()
  createTask(){
    //...
  }

}
```

### Defining a Service

#### providers

Can be injected into constructor if decorated as an `@Injectable`, via dependency injection.  
It can be exported from a module, and then be available to other modules that import it.

#### Service

service is the main source of business logic. and it defined as providers. But not all providers are services.  
Services can be implemented as `singletons` which is a design pattern when wrapped with the `@Injectable` and then provided to a module.  
So the same instance will be shared across the application.

#### Dependency Injection

```Typescript
@Controller('/task')
export class TasksController {
  constructor(private tasksService: TaskService) {

  }

  @Get()
  async getAllTasks(){
    return await this.tasksService.getAllTasks();
  }

  @Post()
  createTask(){
    //...
  }

}
```

---

## Lifecycle of request

1. HTTP request incoming
2. Request routes to Controller, NestJS will parse the relevant request data and handler is called with arguments. The parsed request data will be available in the handler.
3. Handler handles the request. Perform operatons such as communication with a service. For example, retrieving an item from the database.
4. Handler returns response value to client. Response can be of any type and even an exception.

---

## Running the app

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ yarn start:dev

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Request test using Insomnia

#### Insomnia

see https://medium.com/thefork/get-the-most-out-of-insomnia-to-effectively-test-your-api-8a81f1349ef6
