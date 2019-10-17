# How To Eureka in Spring Boot

## Contents

<!-- TOC -->

- [How To Eureka in Spring Boot](#how-to-eureka-in-spring-boot)
  - [Contents](#contents)
  - [Creating Your Multiple-Module Project](#creating-your-multiple-module-project)
  - [Creating Eureka Server](#creating-eureka-server)
    - [Eureka Dependencies](#eureka-dependencies)
    - [Configure Eureka Properties](#configure-eureka-properties)
    - [Configure EurekaApplication Class](#configure-eurekaapplication-class)
  - [Creating Microservice](#creating-microservice)
    - [Microservice Dependencies](#microservice-dependencies)
    - [Configure Microservice Properties](#configure-microservice-properties)
    - [Configure Microservice Class](#configure-microservice-class)
    - [Configure Entity and Repository](#configure-entity-and-repository)

<!-- /TOC -->

## Creating Your Multiple-Module Project

- Download each initializr configuration.
  - That is, Eureka server and any microservice clients you want to include.
- Put all grouped projects in one directory.
- In IntelliJ, "Import Project" and select the directory you created above.
- Make sure the following boxes are checked in the import configuration.
  - Search for projects recursively
  - Import Maven projects automatically
  - Create module groups for multi-module Maven projects

## Creating Eureka Server

- Download your [dependencies](#eureka-dependencies) (through Initializr and editing the POM).
- Configure your [`application.properties`](#configure-eureka-properties).
- Configure your [application class](#configure-eurekaapplication-class).
- Done!

### Eureka Dependencies

- Config Client
  - Available on Spring Initializer.
- Eureka Server
  - Available on Spring Initializer.
- jaxb-api

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-netflix-eureka-server</artifactId>
</dependency>
<dependency>
  <groupId>javax.xml.bind</groupId>
  <artifactId>jaxb-api</artifactId>
</dependency>
```

- Spring Cloud Starter Parent (Dependency Managmenet)

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

### Configure Eureka Properties

- Name your server.
- Declare the server port.
  - Typically 8761.
- Prevent Eureka from registering itself as a service.
- Turn on logging, if you want it.

```text
#configure server
spring.application.name=eureka-server
server.port=8761

#don't register itself as a client
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false

#turn on logging
logging.level.com.netflix.eureka=ON
logging.level.com.netflix.discovery=ON
```

### Configure EurekaApplication Class

- Add the `@EnableEurekaServer` annotation.

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class EurekaApplication {

    public static void main(String[] args) {
        SpringApplication.run(EurekaApplication.class, args);
    }

}
```

## Creating Microservice

- For each microservice, repeat this process.
- Download your [dependencies](#microservice-dependencies) (through Initializr and editing the POM).
- Configure your [`application.properties`](#configure-microservice-properties).
- Configure your [application class](#configure-microservice-class).
- Configure your [entity and repository classes](#configure-entity-and-repository)
- Done!

### Microservice Dependencies

- This, of course, depends on the microservice setup.
  - But this is the way the class did it.
- Spring Web
  - Available through Initializr.
- Spring Data REST
  - Available through Initializr.
- Eureka Client
  - Available through Initializr.
- Config Client
  - Available through Initializr.
- H2
  - Available through Initializr.
- JPA
  - Available through Initializr.

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-test</artifactId>
  <scope>test</scope>
</dependency>
<dependency>
  <groupId>com.h2database</groupId>
  <artifactId>h2</artifactId>
  <scope>runtime</scope>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-rest</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
```

- Spring Cloud Starter Parent (Dependency Managmenet)

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

### Configure Microservice Properties

- Turn on Spring logging, if you want.
- Configure your h2 data source, if you're using that.
- Configure your microservice as a Eureka client.
  - Give it a name.
  - Declare its server port.
  - Declare it's service URL.
  - Turn on IP address preference.

```text
# set spring logging
logging.level.org.springframework:DEBUG

# configure h2
spring.h2.console.enabled=true
spring.h2.console.path=/h2
spring.datasource.url=jdbc:h2:mem:items


# configure as eureka client
spring.application.name=item-service
server.port=8762
eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka/
eureka.client.service-url.default-zone=http://localhost:8761/eureka/
instance.preferIpAddress=true
```

### Configure Microservice Class

- Add the `@EnableEurekaClient` annotation.

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class MicroservicesApplication {

    public static void main(String[] args) {
        SpringApplication.run(MicroservicesApplication.class, args);
    }

}
```

### Configure Entity and Repository

- If you're using Spring Data REST or H2, configure the entity and repository.
- There's nothing different here from a normal entity or repository class.
