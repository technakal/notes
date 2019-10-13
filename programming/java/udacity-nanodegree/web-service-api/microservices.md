# Spring Microservices

<!-- TOC -->

- [Spring Microservices](#spring-microservices)
  - [Overview](#overview)
  - [Eureka](#eureka)
    - [Eureka Architecture](#eureka-architecture)
  - [Developing Microservices Using Spring Boot](#developing-microservices-using-spring-boot)
    - [Eureka POM.xml](#eureka-pomxml)
    - [Eureka Properties File](#eureka-properties-file)
    - [The Eureka Application File](#the-eureka-application-file)

<!-- /TOC -->

## Overview

- Historically, the defacto standard for applications was N-Tier and monolithic.
  - These were single, layered applications that contained all of the code of an application.
  - This architecture decomposed code into more functional components within itself:
    - Presentation Layer
    - Business Process Layer/Service Layer
    - Data Access Layer
  - Disadvantages of N-Tier and monolithic architecture:
    - Tight coupling of code which makes changes hard.
    - A single deployment with multiple layers that causes long testing, building, and deployment cycles.
    - A big monolithic application that makes code reuse and sharing of components difficult.
- Now, monolithic architecture is being replaced by MSA--Microservices Architecture.
  - MSA decomposes systems into discrete, individual, standalone components that can communicate amongst themselves, working together or with external systems.
  - Key benefits of MSA:
    - MSA is very flexible because it supports any language that can communicate via a RESTful endpoint and leverages REST over HTTP.
    - MSA offers agility and systems that are easier to write, test, deploy, and share.
    - MSA provides systems that can better scale to load and demand.
    - MSA provides systems that are resilient because failures are isolated and don’t cascade through the infrastructure.
  - Characteristics of MSA:
    - Micro refers to the scope of the interface, not lines of code.
    - Single purpose.
    - Simple with a well-defined interface.
    - Modular and independent.
    - Isolated persistence--it runs without the other parts of the application.

## Eureka

- An important part of microservice architecture is a component registry.
- Eureka is an open source microservice discovery management server, built by Netflix.
  - Essentially, what Eureka does is remember the IP addresses for all of your microservices.
  - Then, in this way, you can just call the service by name, and Eureka translates that to the actual service IP.
  - Eureka has been incorporated into Spring Cloud.

### Eureka Architecture

- Eureka consists of a server and a client-side component.
- The server component will be the registry in which all the microservices register their availability.
  - The microservices use the Eureka client to register; once the registration is complete, it notifies the server of its existence.
  - The Eureka client performs the actual registration of a microservice.
  - The Eureka server remembers the microservices--it remembers the registration.

## Developing Microservices Using Spring Boot

### Eureka POM.xml

- Eureka requires several dependencies to run:
  - `spring-cloud-starter-config`
    - Initializes and sets up Spring Cloud.
  - `spring-cloud-netflix-eureka-server`
    - Configures Eureka server.

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-netflix-eureka-server</artifactId>
</dependency>
```

### Eureka Properties File

- Set up application.properties on your Eureka server:
  - Name the application.
  - Register port.
    - Standard is 8761.
  - Configure Eureka client
    - Tell it not to register itself as a client, because we want it to be the server.
    - Turn on additional logging.

```text
spring.application.name=eureka-server
server.port=8761

#don't register itself as a client
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
logging.level.com.netflix.eureka=ON
logging.level.com.netflix.discovery=ON
```

### The Eureka Application File

- The .java file is a normal Spring Boot application file.
- The only difference is the `@EnableEurekaServer` annotation.

```java
@SpringBootApplication
@EnableEurekaServer
public class EurekaApplication {

  public static void main(String[] args) {
    SpringApplication.run(EurekaApplication.class, args);
  }

}

```
