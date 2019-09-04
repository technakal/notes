# Java Spring Boot (Introduction)

- [Java Spring Boot (Introduction)](#java-spring-boot-introduction)
  - [Microservice and MVC Frameworks](#microservice-and-mvc-frameworks)
    - [Microservices](#microservices)
      - [Resources](#resources)
    - [MVC Framework](#mvc-framework)
      - [Model](#model)
      - [View](#view)
      - [Controller](#controller)
  - [Spring Boot Framework](#spring-boot-framework)
    - [What is Spring Boot](#what-is-spring-boot)
    - [Advantages of Spring Boot](#advantages-of-spring-boot)
    - [Getting Started With Spring Boot](#getting-started-with-spring-boot)
      - [Files](#files)
  - [Spring Boot MVC Development](#spring-boot-mvc-development)
  - [Spring Boot File Upload](#spring-boot-file-upload)

## Microservice and MVC Frameworks

### Microservices

- Microservice is an approach to software development.
  - A variant of service-oriented development.
  - Sees an application as a collection of loosely coupled services.
  - More manageable and scaleable.

```
Monolithic
Everything contained in one big box.
------------------
|       X        |
|                |
| B            Y |
|                |
|                |
|  A          Z  |
------------------

Microservice
Every piece is its own little box, connected together.
      ---|X|---
     /         \
    /           \
   |B|         |Y|
    \           /
     \         /
     |A|-----|Z|
```

- Microservices are intended to be:
  - Highly maintainable and testable
  - Loosely coupled
  - Independently deployable
  - Organized around business capabilities
  - Owned by a small team
- Not appropriate for all applications.
  - This approach has proven to be superior for large enterprise applications which are developed by teams of geographically and culturally diverse developers.
- Useful for CI/CD pipeliines.
- Part of a larger shift toward DevOps.
- Often paired with containers, though this is not a requirement for microservices.
  - It just makes sense to keep each service in its own self-contained ecosystem so it's free to be!
  - Kubernetes is a good way to maintain all your microservices.

#### Resources

Here are some resources for more information on microservices.

- [microservice.io](https://microservices.io/)
- [An Introduction to Microservices](https://opensource.com/resources/what-are-microservices)
- [Containers and Microservices](https://opensource.com/business/14/12/containers-microservices-and-orchestrating-whole-symphony)

### MVC Framework

- MVC stands for Model-View-Controller.
- It's a architectural pattern that divides an application into the three parts in the name.
  - Model layer
  - View layer
  - Controller layer
- Each layer handles a specific concern of the application, such as data vs. rendering vs. activity.

#### Model

- The data component of the application.
- For example, in a university application, where teachers can create a class, students can register for a class, and students can receive a grade in the class, the Model layer might include:
  - Teacher
  - TeacherCourse
  - Course
  - Student
  - StudentCourse
  - Grade

#### View

- Handles UI logic of the application.
  - Like React, yo.

#### Controller

- The controller handles most of the work for the application.
- It acts as an interface between the Model and the View.
  - Accepts requests.
  - Manipulates data.
  - Passes data to View to render output.

## Spring Boot Framework

### What is Spring Boot

- Most used framework for Java-based microservices.
- A great platform for creating standalone, production-grade applications.
- Requires minimal configuration.

### Advantages of Spring Boot

- Simplified Spring dependencies.
  - No more version collisions, which is, I guess, a problem with Spring.
- Can be run without a container, straight from the comannd line.
- Build more with less code.
  - No need for XML in Spring Boot, not even web.xml.
  - (I'm sure the above would make sense if I wasn't a Java noob).
  - Auto-configuration is available.
- Comes with great tools for running in production, initializing databases, using environment-specific config files, metrics.
- Spring can do everything that Spring Boot does, but Spring Boot can get an application up and running really quickly.
  - [Differences between Spring and Spring Boot](https://www.educba.com/spring-vs-spring-boot/).

### Getting Started With Spring Boot

- We can use [Spring Initializr](https://start.spring.io/) to build our first Spring Boot project.
- Import the project into IntelliJ through the "Import Project" wizard.
  - An easier way, with a Maven project, is to open the pom.xml from IntelliJ, then select the option to Open as Project.
- Once imported, you can find the file structure in the IntelliJ UI.

![File Structure](./media/spring-boot-structure.png)

- `src` contains your project files.
- `resources` contains your application.properties, as well as static files (such as HTML or images) and templates (for templating language stuff).
  - application.properties are used to configure junk.
    - You can configure it through IntelliJ, command line, or YAML.
- `test` contains your unit tests.
- `pom.xml` are your Maven configuration settings.
  - It's similar to a package.json, in a lot of ways.
  - IntelliJ will automatically add dependencies to this file as you use them in your code.

#### Files

- SpringBootHelloWorldApplication.java is the entry point for the application.
- `@SpringBootApplication` is a convenience annotation that adds:
  - `@Configuration` tags.
  - `@EnableAutoConfiguration` tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings.
  - Normally you would add `@EnableWebMvc` for a Spring MVC app, but Spring Boot adds it automatically when it sees spring-webmvc on the classpath. This flags the application as a web application and activates key behaviors such as setting up a DispatcherServlet.
  - `@ComponentScan` tells Spring to look for other components, configurations, and services in the hello package, allowing it to find the controllers.
- The `main()` method uses `SpringApplication.run()` to run the program.

```java
package com.example.springboothelloworld;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootHelloworldApplication {
	public static void main(String[] args) {
		SpringApplication.run(SpringBootHelloworldApplication.class, args);
	}
}
```

## Spring Boot MVC Development

## Spring Boot File Upload
