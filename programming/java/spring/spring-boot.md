# Java Spring Boot

- [Java Spring Boot](#java-spring-boot)
  - [Bootstrapping Spring Boot](#bootstrapping-spring-boot)
  - [Annotations](#annotations)
  - [Making a Simple Rest API](#making-a-simple-rest-api)
    - [RestController](#restcontroller)
    - [RequestMapping](#requestmapping)

## Bootstrapping Spring Boot

- You can automatically generate a Spring Boot project using [Spring Initializr](start.spring.io).
  - Here, you select JDK version, Spring Boot version, build tools and dependencies.
  - You set up your main package name, etc.
- Once you have your Spring Boot generated files, Import Project into IntelliJ.
  - Answer the questions in the wizard based on how you set up your initializer files.
- Once imported, it'll download dependencies and get everything ready for you.

## Annotations

- Annotations in Spring Boot wire things up in the background.
  - They speed up development by providing quick configuration shortcuts.

## Making a Simple Rest API

### RestController

- Create a class file and annotate the class with the @RestController annotation.
  - This sets up the class as a controller for your application.

```java
@RestController
class HelloWorld {
  // stuff
}

```

### RequestMapping

- To create a route, you annotate a method within your RestController with @RequestMapping.
- In this example, accessing the root directory ("/") triggers the index() method.
  - This returns the string "Hello World".

```java
@RestController
class HelloWorld {
  @RequestMapping("/") // sets up the root location as a route
  public String index() {
    return "Hello world!";
  }
}
```
