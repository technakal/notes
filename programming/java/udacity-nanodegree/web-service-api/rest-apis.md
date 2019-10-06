# REST APIs in Spring

- [REST APIs in Spring](#rest-apis-in-spring)
  - [REST Architecture Style](#rest-architecture-style)
  - [Building in Spring](#building-in-spring)
    - [Configuring H2](#configuring-h2)
    - [Typical API Structure in Spring](#typical-api-structure-in-spring)
      - [Entity](#entity)
      - [Repository](#repository)
      - [Service](#service)
      - [Exception Handling](#exception-handling)
      - [REST Controller](#rest-controller)

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
                                              |- WoofWoofServiceImpl
                                      |- web
                                              |- WoofWoofController
```

#### Entity

- Entitites are objects that live in the database table and have the ability to map to normal Java objects.
- Entities are declared using the `@Entity` annotation.
- Classes flagged as `@Entity` persist to the database.
  - Typically, an entity maps to a database table and the table contains rows that represent that given entity.
- I believe every entity requires an `@Id` tag, to uniquely identify it in the data.
  - In this case, it's supposed to auto-generate.
- Aside from the new annotations, this is just a normal class.

```java
@Entity
public class WoofWoof {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String name;

  private String breed;

  public WoofWoof() {}

  public WoofWoof(Long id, String name, String breed) {
    this.id = id;
    this.name = name;
    this.breed = breed;
  }

  public WoofWoof(String name, String breed) {
    this.name = name;
    this.breed = breed;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getBreed() {
    return breed;
  }

  public void setBreed(String breed) {
    this.breed = breed;
  }

}
```

#### Repository

- A repository is a Java shortcut class that simplifies the connection between Java and the database.
- They reduce the need for a lot of boilerplate database code.
- In Spring, these may be implemented as an `interface`.
  - In such a case, Spring will automatically create an implementation of the interface when needed.
- This is where you'll write your queries and associate them with callable methods.

```java
public interface WoofWoofRepository extends CrudRepository<WoofWoof, Long> {

  @Query("select A.id, A.breed from WoofWoof A where A.id = :id")
  String findBreedById(Long id);

  @Query("select distinct A.breed from WoofWoof A")
  List<String> findAllBreed();

  @Query("select A.name from WoofWoof A")
  List<String> findAllName();

}
```

#### Service

- Services are used to perform business functions in your app.
- They're denoted with the `@Service` annotation.
- You'll create an interface for your services, them implement them.

```java
// service interface
public interface WoofWoofService {
  List<WoofWoof> retrieveAllWoofWoofs();
  List<String> retrieveAllBreeds();
  List<String> retrieveAllNames();
  String retrieveBreedById(Long id);
}
```

- In the case of the implementation, you'll add the `@Service` annotation, then override the interface methods.
- You'll need to associate the service with its corresponding repository.
  - Here, I've `@Autowired` it to connect to the `WoofWoofRepository`
- This is also where you'll configure some error handling.
  - Here, I've used the `Optional` class to handle the situation where a user searches for a non-existent ID.
  - This Optional wraps your query method invocation and, if it finds no match, throws a pre-defined exception (`DogNotFoundException`).

```java
// service implementation
@Service
public class WoofWoofServiceImpl implements WoofWoofService {

  @Autowired
  WoofWoofRepository woofWoofRepository;

  @Override
  public List<WoofWoof> retrieveAllWoofWoofs() {
    return (List<WoofWoof>)woofWoofRepository.findAll();
  }

  @Override
  public List<String> retrieveAllBreeds() {
    return woofWoofRepository.findAllBreed();
  }

  @Override
  public List<String> retrieveAllNames() {
    return woofWoofRepository.findAllName();
  }

  @Override
  public String retrieveBreedById(Long id) {
    // handle invalid ID error
    Optional<String> optionalBreed = Optional.ofNullable(woofWoofRepository.findBreedById(id));
    return optionalBreed.orElseThrow(DogNotFoundException::new);
  }
}
```

#### Exception Handling

- The service directory is also where you'll define exception handlers.
- Here, we've created the `DogNotFoundException` handler, described above.
  - We use the `@ResponseStatus` annotation to tell the API what HTTP status and message to return with the exception.
    - In this case, status will be 404, and message is "Dog not found.".
  - Now, when a user searches for an ID that doesn't exist, they'll get a helpful message with their hot serving of 404.

```java
@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Dog not found.")
public class DogNotFoundException extends RuntimeException {

  public DogNotFoundException() {}

  public DogNotFoundException(String message) {
    super(message);
  }
}
```

#### REST Controller

- Controllers receive and handle API requests.
- It's flagged by the `@RestController` annotation.
  - `@RestController` combines the `@Controller` and `@RequestBody` annotations. Convenient!
- It also contains mapping annotation(s), which are the API routes to which the REST API will respond.
  - `@GetMapping` is a shorthand for `@RequestMapping` via a GET protocol.
  - There are also shorthands for other HTTP request protocols, like `@PostMapping`.
- The Controller in a REST scenario can return a `ResponseEntity`, which is the complete response--headers, body, etc.
  - This is fully configurable.
- Here, we've defined all our routes, which are all GET routes.
- You can also see that our last route accepts a parameter (ID).
  - This is denoted by the {} brackets in the URL path.
  - We can access this data using the `@PathVariable` annotation in our invoked path method.

```java
@RestController
public class WoofWoofController {
  private WoofWoofService woofWoofService;

  @Autowired
  public void setWoofWoofService(WoofWoofService service) {
    this.woofWoofService = service;
  }

  @GetMapping("/api/all")
  public ResponseEntity<List<WoofWoof>> getAllWoofWoofs() {
    List<WoofWoof> list = woofWoofService.retrieveAllWoofWoofs();
    return new ResponseEntity<>(list, HttpStatus.OK);
  }

  @GetMapping("/api/breed")
  public ResponseEntity<List<String>> getAllBreeds() {
    List<String> list = woofWoofService.retrieveAllBreeds();
    return new ResponseEntity<>(list, HttpStatus.OK);
  }

  @GetMapping("/api/name")
  public ResponseEntity<List<String>> getAllNames() {
    List<String> list = woofWoofService.retrieveAllNames();
    return new ResponseEntity<>(list, HttpStatus.OK);
  }

  @GetMapping("/api/{id}/breed")
  public ResponseEntity<String> getWoofWoofById(@PathVariable Long id) {
    String woofWoof = woofWoofService.retrieveBreedById(id);
    return new ResponseEntity<>(woofWoof, HttpStatus.OK);
  }
}
```
