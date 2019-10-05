# REST APIs in Spring

- [REST APIs in Spring](#rest-apis-in-spring)
  - [REST Architecture Style](#rest-architecture-style)
  - [Building in Spring](#building-in-spring)
    - [Configuring H2](#configuring-h2)
    - [Typical API Structure in Spring](#typical-api-structure-in-spring)
      - [Entity](#entity)
      - [REST Controller](#rest-controller)
      - [Service](#service)
      - [Repository](#repository)
    - [Exception Handling](#exception-handling)

## REST Architecture Style

- REST stands for REpresentational State Transfer. It’s a set of guidelines application developers use to design APIs.
- There are four principles that APIs follow:
  - Data and functionality in the API are considered “resources” and identified through something called the URI, or Uniform Resource Identifier.
    - These are accessed by web links.
  - Resources are manipulated using a fixed set of operations.
    - GET retrieves a resource.
    - POST creates one.
    - PUT updates the resource.
    - DELETE removes the resource.
  - Resources can be represented in multiple formats
    - HTML
    - XML
    - Plain text
    - Other formats defined by a media type.
  - Communication between the client and server (i.e. endpoint) is stateless.
    - This means the server will not remember or store any state about the client that made the call.
- Easier to create, easier to consume.

## Building in Spring

- Bootstrap an application for REST using Spring Initializr.
  - Access [Initializr](https://start.spring.io).
  - Add the dependencies below:
    - Spring Web
    - H2 Database (if using a local, in-memory database)
    - Spring Data JPA (to communicate with databases)

### Configuring H2

- Note: H2 is a non-persistent memory database.
  - It's great for development, proof of concept, etc.
  - Not used in production environment.
- To use it in Spring, set the following properties in the `application.properties` file.
  - The console is a useful feature of h2. So we enable that.
  - Then, we give the mapping to the console.
  - Then, we map the datasource URL.
    - Our datasource is called `woofwoofs`.

```
spring.h2.console.enabled=true
spring.h2.console.path=/h2

spring.datasource.url=jdbc:h2:mem:woofwoofs
```

- The default username for the H2 console is "sa", and there is no default password.

### Typical API Structure in Spring

- In Spring, a typical structure for your Java code includes the following packages:
  - entity
  - repository
  - service
  - web

```
src
  |- main
        |- java
              |- com.technakal.woofwoofs
                                      |- entity
                                              |- WoofWoof
                                      |- repository
                                              |- WoofWoofRepository
                                      |- service
                                              |- WoofWoofService
                                      |- web
                                              |- WoofWoofController
```

#### Entity

- Entitites are objects that live in the database table and have the ability to map to normal Java objects.
- Entities are declared using the `@Entity` annotation.
- Classes flagged as `@Entity` persist to the database.
  - Typically, an entity maps to a database table and the table contains rows that represent that given entity.

#### REST Controller

- Controllers receive and handle API requests.
- It's flagged by the `@RestController` annotation.
  - `@RestController` combines the `@Controller` and `@RequestBody` annotations. Convenient!
- It also contains mapping annotation(s), which are the API routes to which the REST API will respond.
  - `@GetMapping` is a shorthand for `@RequestMapping` via a GET protocol.
  - There are also shorthands for other HTTP request protocols, like `@PostMapping`.
- The Controller in a REST scenario can return a `ResponseEntity`, which is the complete response--headers, body, etc.
  - This is fully configurable.

#### Service

- Services are used to perform business functions in your app.
- They're denoted with the `@Service` annotation.

#### Repository

- A repository is a Java shortcut class that simplifies the connection between Java and the database.
- They reduce the need for a lot of boilerplate database code.
- In Spring, these may be implemented as an `interface`.
  - In such a case, Spring will automatically create an implementation of the interface when needed.

### Exception Handling
