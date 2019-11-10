# Documenting Code with Swagger

## Overview

- Documentation is a good way to communicate to others how they can use your APIs.
- Documentation communicates the operations available, the format for requesting data and the format data will be returned in.
- Typically, the initial creation of documentation is easy, but the on-going maintenance of keeping that documentation up to date is hard.

## Swagger

- Swagger is a package that automatically creates documentation from your Java code.
- Swagger is one of the most popular implementations of OpenApi.
  - OpenApi allows you to document your API code using JSON or YAML.
  - More info on [OpenApi](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md).
- Swagger helps you design, build, document and consume REST APIs.
- SpringFox is a Swagger integration for the Spring Framework.
- There are three components to Swagger:
  - Swagger Editor – A browser-based editor where you can write OpenAPI specs.
  - Swagger UI – A web application that renders OpenAPI specs as interactive API documentation.
  - Swagger Codegen – A tool that generates server stubs and client libraries from an OpenAPI spec.

## Swagger UI

- Dynamically generated documentation from a Swagger-compliant API is displayed in the Swagger UI, which consists of HTML, JavaScript, and CSS files.
- The documentation files are bundled by Swagger UI to display the API in a web browser.
- Swagger UI also allows other API developers or consumers to interact with the API’s resources without having any of their implementation logic in place.

### Swagger UI Dependencies

- To include Swagger UI, add these dependencies:

```xml
<dependency>
  <groupId>io.springfox</groupId>
  <artifactId>springfox-swagger-ui</artifactId>
  <version>2.9.2</version>
</dependency>

<dependency>
  <groupId>io.springfox</groupId>
  <artifactId>springfox-swagger2</artifactId>
  <version>2.9.2</version>
  <scope>compile</scope>
</dependency>
```

### Using Swagger UI

- Most of Swagger UI's configuration occurs in the `Docket` bean.
- Set it up as a `@Configuration`.
- Mark it with `@EnableSwagger2`.
- Instantiate the `Docket` bean.
  - The type of document is SWAGGER_2.
  - We call the `select()` method.
    - This returns the selector API builder, which exposes the endpoints to Swagger.
  - We're allowing documentation available for all parts of the API with `.apis(RequestHandlerSelectors.any())` and `.paths(PathSelectors.any())`
    - Its not always desirable to expose everything. These methods are how you would restrict this.
  - If you're using customized ApiInfo, add the `.apiInfo` tag to the end.

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
   @Bean
   public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2)
              .select()
              .apis(RequestHandlerSelectors.any())
              .paths(PathSelectors.any())
              .build()
              .apiInfo(apiInfo());
  }
}
```

- Swagger UI also includes some default values in its response that you can customize.
  - Title (“Api Documentation”)
  - Creator (“Created by Contact Email”)
  - Server?(“Apache 2.0”).
  - To change these values, you can use the apiInfo(ApiInfo apiInfo) method.

```java
private ApiInfo apiInfo() {
  return new ApiInfo(
    "Location API",
    "This API returns a list of airport locations.",
    "1.0",
    "http://www.udacity.com/tos",
    new Contact("Kesha Williams", "www.udacity.com", "myeaddress@udacity.com"),
    "License of API", "http://www.udacity.com/license", Collections.emptyList());
}
```

- Once deployed, you can access your Swagger documentation at `http://localhost:8080/swagger-ui.html`.
  - The raw API docs generated as JSON can be found at `http://localhost:8080/v2/api-docs`.

### Customizing Error Messages

- You can override default error messages in Swagger UI using `@ApiResponses`.
- First, in your SwaggerConfig file, use the `.useDefaultResponseMessages(false)` method to disable the defaults.

```java
 @Bean
  public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2)
        .select()
        .apis(RequestHandlerSelectors.any())
        .paths(PathSelectors.any())
        .build()
        .useDefaultResponseMessages(false); // right here
  }
```

- Then, in your controller class, use the `@ApiResponses` annotation to add your own custom responses.

```java
@RestController
// here we go
@ApiResponses(value = {
          @ApiResponse(code=400, message = "This is a bad request, please follow the API documentation for the proper request format."),
          @ApiResponse(code=401, message = "Due to security constraints, your access request cannot be authorized. "),
          @ApiResponse(code=500, message = "The server is down. Please make sure that the Location microservice is running.")
})
public class LocationController {
  private LocationService locationService;

  @Autowired
  public void setLocationService(LocationService locationService) {
    this.locationService = locationService;
  }

  @GetMapping("/location")
  public ResponseEntity<List<Location>> getAllLocations() {
    List<Location> list = locationService.retrieveLocations();
    return new ResponseEntity<List<Location>>(list, HttpStatus.OK);
  }

  @GetMapping("/location/{id}")
  public ResponseEntity<Location> getLocation(@PathVariable("id") long id) {
    return new ResponseEntity<Location>(locationService.retrieveLocation(id), HttpStatus.OK);
  }

}

```
