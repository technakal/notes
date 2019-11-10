# Unit and Integration Testing

## Overview

- Testing gives you confidence that your application continues to work after you make changes.
- To keep up with testing, you'll want to introduce automated testing.
- In Spring Boot, it's pretty easy to add basic tests.

## Base Dependency

- In Spring Boot, the following dependency allows for automated testing.
  - This imports, alongside it, `JUnit`, `Assert`, `Hamcrest`, and other useful testing libraries.

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-test</artifactId>
  <scope>test</scope>
</dependency>
```

## Testing APIs

- In Spring, a good suite for testing APIs are `JUnit`, `Mockito`, and `Spring Test` (also called `MockMVC`).
  - JUnit is a popular unit testing framework that allows you to test individual units of source code.
  - Mockito is a great mocking framework which provices data for JUnit tests.
  - Spring Test adds some annotations that make this work pretty well together.
    - @MockBean works well with the Mockito library.
    - @WebMvcTest is used for controller layer unit testing.

### `@WebMvcTest`

- `@WebMvcTest` is used for testing the controller layer.
- `@WebMvcTest` only loads `@Controller` and `@RestController` classes.
- If your controller has dependency on other beans, you'll either have to load those yourself, or create mocks for them.
  - The `@MockBean` annotation is used for just this purpose.

## Unit Test

### Building a Unit Test

- Create a class to hold each controller test.
  - So, if you have a LocationController, create a LocationControllerUnitTest class. If you also have an UberController, add an UberControllerUnitTest class.
- In your UnitTest class, add `@RunWith(SpringRunner.class)`.
  - This defines the runner class to be used for test cases.
- Add `@WebMvcTest(ControllerName.class)`, and pass in the name of the Controller the unit tests apply to.
- Add the MockMvc with the `@Autowired` annotation.
  - This handles all the configuration of your class--mocking it up--so that testing is really easy.
- If your Controller has any dependencies, use the `@MockBean` annotation to auto-configure those dependencies.
  - This creates a Mockito mock of the dependency classes.
- Then, define each of your test cases, as methods, using the `@Test` annotation.
  - Within the test, you use your autowired MockMvc object to perform various actions.
    - `.perform()` simulates an HTTP request to the controller. You can pass in the HTTP method and URL.
    - Tell the test what to expect in the response using the `.andExpect()` method.
      - These are called "Expectations."
      - Chain it until you test what you wanted.
      - [ResultActions docs](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/test/web/servlet/ResultActions.html).
    - [MockMvc docs](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/test/web/servlet/MockMvc.html).
  - You can also use `verify` method to verify that a test method was called the number of times you expected.

```java
@RunWith(SpringRunner.class)
@WebMvcTest(LocationController.class)
public class LocationControllerUnitTest {

  @Autowired
  public MockMvc mockMvc;

  @MockBean
  LocationService locationService;

  @Test
  public void getAllLocations() throws Exception {
    mockMvc.perform(get("/location"))
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
      .andExpect(content().json("[]"));
    verify(locationService, times(1)).retrieveLocations();
  }

  @Test
  public void getLocationById() throws Exception {
    mockMvc.perform(get("/location/1"))
      .andExpect(status().isOk())
    verify(locationService, times(1)).retrieveLocation(1);
  }
}
```

## Integration Test

- Integration testing tests the entire applications and all of its layers.
- With Spring Boot, you can do this without actually deploying the application.
  - Use `@SpringBootTest` on the test configuration class.
    - `@SpringBootTest` starts up a test server, runs all the code, etc.
    - Tests everything except the UI.

### Building an Integrated Test

- Create a test class for each of your controllers.
- Add `@RunWith(SpringRunner.class)`.
- Add `@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)`.
  - You can pass in the web environment, which tells the tester how and where to start the server.
  - Passing in the RANDOM_PORT web environment is very useful to avoid conflicts in a test environment.
- Add `@AutoConfigureMockMvc`.
  - This handles the simulated client HTTP requests.
- Add and autowire the `TestRestTemplate` object.
  - This allows us to consume REST APIs in a test scenario, programmatically.
  - It's included in Spring Test.
- Create your test case methods, and annotate them with `@Test`.
  - In the method, create a ResponseEntity<> to collect the result.
  - Set it equal to the response from your call to the API, using the restTemplate as the initiator of the request.
  - Once you have the response, you can run tests on it using `Assert`.
    - [Assert docs](https://junit.org/junit4/javadoc/latest/org/junit/Assert.html)

```java
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoconfigureMockMvc
public class LocationControllerIntegrationTest {
  @LocalServerPort
  private int port;

  @Autowired
  private TestRestTemplate restTemplate;

  @Test
  public void getAllLocations() {
    ResponseEntity<List> response = this.restTemplate.getForEntity("http://localhost:" + port + "/location", List.class);
    assertThat(response.statusCode(), equalTo(HttpStatus.OK));
  }

  @Test
  public void getLocation() {
    ResponseEntity<Location> response = this.restTemplate.getForEntity("http://localhost:" + port + "/location/1", Location.class);
    assertThat(response.statusCode(), equalTo(HttpStatus.OK));

  }
}
```
