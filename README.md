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

### Defining a Data Transfer Objects (DTO)

#### before

```Typescript
  @Post()
  createTask(
    @Body('title') title: string, // NEED TO FIX HERE
    @Body('description') description: string, // NEED TO FIX HERE
  ): Task {
    return this.tasksService.createTask(title, description); // NEED TO FIX HERE
  }
```

If we need to make changes to the shape of data,  
for example, change the types of parameters or requirements change and need to add additional information to tasks ... etc.  
To apply such change, we will have to change the implementation in multiple places.

The better way is that we manage the shape of data in the main place,  
and it flows through the different components of our application.  
This is called DTO.

DTO can be useful for data validation.  
A DTO is NOT a model definition. It defines the shape of data for a specific case  
It can be defined using an interface or a class. (class is recommended)

#### after

```Typescript
export class createTaskDto {
  title: string;
  description: string;
}

```

```Typescript
@Post()
createTask(@Body() createTaskDto: createTaskDto): Task {
  return this.tasksService.createTask(createTaskDto);
}

```

## Validation and Error handling with Nestjs Pipes

Pipes operate on the arguments to be processed by the route handler, just before the handler is called.  
Pipes can perform data transformation or data validation.
Pipes can throw exceptions. Exceptions thrown will be handled by NestJS and parsed into an error response.
ex. ValidationPipe, ParseIntPipe, and Custom pipe Implementation.

### Custom pipe Implementation

- Pipes are classes annotated with the `@Injectable()` decorator.
-

###

- Install [class-validator](https://github.com/typestack/class-validator) with `yarn add class-validator class-transformer`

## Lifecycle of request

1. HTTP request incoming
2. Request routes to Controller, NestJS will parse the relevant request data and handler is called with arguments. The parsed request data will be available in the handler.
3. Handler handles the request. Perform operatons such as communication with a service. For example, retrieving an item from the database.
4. Handler returns response value to client. Response can be of any type and even an exception.

## Data Persistence - PostgreSQL and TypeORM

### Start with Docker and Postgres, pgAdmin

1. pgadmin installation

see https://www.pgadmin.org/download/

2. Start postgres in docker container

```bash
docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=<your password> -d postgres
```

3. Setting pgadmin
   Servers -> Register -> Server -> Set Name in General tab, and in Connection tab,
   - Host: localhost
   - POrt: 5432
   - Maintenance database: postgres
   - Username: postgres
   - Password: <your password> (== POSTGRES_PASSWORD)

### TypeORM

- Install [typeorm](https://typeorm.io) with `yarn add typeorm @nestjs/typeorm pg`

### Active Repord vs Data Mapper pattern

see https://github.com/typeorm/typeorm/blob/master/docs/active-record-data-mapper.md

- Active record: define all of the query methods inside the method itself.
- Data mapper: nothing more than properties.

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

see https://medium.com/thefork/get-the-most-out-of-insomnia-to-effectively-test-your-api-8a81f1349ef6, https://apis.support.brightcove.com/general/use-insomnia-api-requests.html

## Logging

see https://docs.nestjs.com/techniques/logger

- `Log`: General purpose logging of important information.
- `Warninig`: Unhandled issue that is NOT fatal or destructive.
- `Error`: Unhandled issue that is fatal or destructive for our system.
- `Debug`: Useful information that can help us debug the logic in case of an error/warning. Intended for developers.

Nest's built-in logger is used for monitoring Nest system behavior, and can also be useful for basic formatted text logging in your feature modules while in **development**

but **production** applications often take advantage of dedicated logging modules like Winston. As with any standard Node.js application, you can take full advantage of such modules in Nest.

### winston logger

- Install [winston](https://github.com/gremo/nest-winston) with `yarn add nest-winston winston`

## Auth

```bash
nest g module auth
nest g service auth
nest g controller auth
```
