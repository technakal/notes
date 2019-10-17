# Spring Microservices

<!-- TOC -->

- [Spring Microservices](#spring-microservices)
  - [Overview](#overview)
  - [Eureka](#eureka)
    - [Eureka Architecture](#eureka-architecture)
  - [Spring Data REST](#spring-data-rest)
    - [How It Works](#how-it-works)
      - [An Example](#an-example)
    - [Adding to Project](#adding-to-project)
  - [Developing Microservices Using Spring Boot](#developing-microservices-using-spring-boot)
    - [Structure](#structure)
    - [Eureka POM.xml](#eureka-pomxml)
    - [Eureka Properties File](#eureka-properties-file)
    - [The Eureka Application File](#the-eureka-application-file)
    - [Install Process](#install-process)
      - [Spring Initializr](#spring-initializr)
  - [Registering Microservices in Eureka](#registering-microservices-in-eureka)
    - [Dependencies](#dependencies)
    - [Configuring Application Properties](#configuring-application-properties)
    - [Setting Applicatin Module to Eureka Client](#setting-applicatin-module-to-eureka-client)
    - [Troubleshooting Discoverability](#troubleshooting-discoverability)

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

## Spring Data REST

- Spring Data REST makes it super easy to expose microservices.
- There is no boilerplate code, and reduced annotation requirements.
- Doesn't require a controller or a service.
- It's real slick.

### How It Works

- At application startup, Spring Data Rest finds all of the spring data repositories
- Then, Spring Data Rest creates an endpoint that matches the entity name
- Next, Spring Data Rest appends an S to the entity name in the endpoint
- Lastly, Spring Data Rest exposes CRUD (Create, Read, Update, and Delete) operations as RESTful APIs over HTTP

#### An Example

- Imagine we have an ItemRepository.

```java
public interface ItemRepository extends JpaRepository<Item, Integer> { ... }
```

- Spring Data REST automatically creates an endpoint for this repository, derived from the plural version of the class name--Item.

```text
http://localhost:8080/items
```

- Spring Data REST also automatically creates an endpoint for retrieving a specific item:

```text
http://localhost:8080/items/{id}
```

### Adding to Project

- Add the dependency for Spring Data REST to the pom file.

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-rest</artifactId>
</dependency>
```

## Developing Microservices Using Spring Boot

### Structure

- Eureka projects are multiple-module projects.
  - There's a module for the Eureka server, and another for each microservice.
- If you open them all at once in IntelliJ, it's a little tricky getting anything running.
- Here's the folder structure in my multi-module project;

```txt
master
    |-eureka
           |-src
               |-main
                    |-java
                          |-com.technakal.eureka
    |-items
          |-src
               |-main
                    |-java
                          |-com.technakal.microservices

```

- So, basically, you duplicate the folder structure for a single project into _each_ module.

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
  <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```

- You may also need to add the following dependency:

```xml
<dependency>
  <groupId>javax.xml.bind</groupId>
  <artifactId>jaxb-api</artifactId>
  <version>2.4.0-b180725.0427</version>
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

### Install Process

- Download starter code.
- Open in IntelliJ.
  - You'll get an error about loading Facets. This is because you're not using IntelliJ Ultimate.
- Add your Java XML Bind dependency to your pom.xml.
  - I just added it to the Eureka file.
- Set the `eureka/src/main/java` as a Sources Root.
  - Right click on the folder and select Mark Directory As > Sources Root.
- Open File > Project Structure.
- Make sure you have a valid JDK applied.
- Import all Maven dependencies.
  - If IntelliJ won't register your app to Maven by default, you can right click on your
- Run the package process on your eureka folder.
- Now you should be able to run `EurekaApplication.main()` as normal.

#### Spring Initializr

- You can use Spring Initializr to bootstrap your Eureka Server.
  - Just use the dependencies for `Config Client` and `Eureka Server`.
  - You still may need the `jaxb-api` dependency.
- You'll still need to set up your `application.properties` and add your `@EnableEurekaServer` annotation.

## Registering Microservices in Eureka

- Registration of the microservice takes full advantage of the Eureka architecture.
  - Without registration, the microservice can't be discovered, and clients must use the full host-name and IP to call the service.
- To register a microservice with the discovery server (Eureka), we need to add the Spring Discovery Client dependency.
- Then, we flag the main application class with the `@EnableEurekaClient` annotation.
  - This is optional if you add the dependency `spring-cloud-starter-netflix-eureka-client` to the classpath.

### Dependencies

- Here are the dependencies needed to register the microservice with Eureka.
- `spring-cloud-starter-netflix-eureka-client`
  - This allows the client to auto-register.

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
  <version>2.1.3.RELEASE</version>
</dependency>
```

- `spring-cloud-starter-config`

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-config</artifactId>
  <version>2.1.3.RELEASE</version>
</dependency>
```

- Additionally, in the `<dependencyManagement>` tag, you'll need to add the `spring-cloud-starter-parent` dependency.
- I've included the full tag here, since it's new to me.

```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-parent</artifactId>
      <version>Greenwich.RELEASE</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```

### Configuring Application Properties

- In `application.properties` add the following configuration details:
  - application.name uniquely identifies the client in the list of registered applications.
  - server.port sets up the server port.
  - eureka.client.serviceUrl adds where to access the service.

```text
spring.application.name=item-service
server.port=8762
eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka/
eureka.client.service-url.default-zone=http://localhost:8761/eureka/
instance.preferIpAddress=true
```

### Setting Applicatin Module to Eureka Client

```java
package com.technakal.dog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class DogApplication {

public static void main(String[] args) {
  SpringApplication.run(DogApplication.class, args);
}

}

```

### Troubleshooting Discoverability

- It seems like getting the POM just right is crucial for discoverability.
  - I believe the Eureka POM was causing me the most problems. Copy from an earlier version.
- If you see repeated console errors for your microservice like the item below, add the value below to the `application.properties` of the microservice.
  - Error: `com.netflix.discovery.shared.transport.TransportException: Cannot execute request on any known server`

```text
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
```
