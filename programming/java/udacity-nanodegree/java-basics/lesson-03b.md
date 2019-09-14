# Java Spring Boot Testing, Hot Swap, and Logging

- [Java Spring Boot Testing, Hot Swap, and Logging](#java-spring-boot-testing-hot-swap-and-logging)
  - [Overview](#overview)
  - [Unit Testing](#unit-testing)
    - [Using JUnit with Spring Boot](#using-junit-with-spring-boot)
  - [Hot Swap](#hot-swap)
  - [Logging](#logging)
    - [Setting Up Logging](#setting-up-logging)
      - [Using application.properties](#using-applicationproperties)
      - [Using logback.xml](#using-logbackxml)
    - [Setting Logger](#setting-logger)

## Overview

- This section focuses on performing unit tests in Spring Boot, setting up hot swapping in IntelliJ/Spring Boot, and logging application activity.

## Unit Testing

- Unit testing makes applications more reliable by testing their individual pieces and making sure they work at that level.

### Using JUnit with Spring Boot

- You can connect Spring Boot and JUnit using RunWith from JUNIT, and the SpringJUnit4ClassRunner.class from Spring.
- Using @SpringBootTest, you declare that the test requires Spring Boot to run.
  - This provides a shortcut to starting the Spring Boot application, so that the context exists for the test to run in.
  - If you forget this, the builder will report that there are "No runnable methods".
- Then, it's just a normal JUnit test.
  - In the below test, UserService has a getUser method, which returns "Tom". We're instructing Spring Boot to test that, when this method is called, "Tom" is indeed returned.

```java
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {SpringBootUnitTestApplication})
public class UserServiceTest {
  private UserService userService;
  @Test
  public void TestGetUser() {
    Assert.assertEquals(userService.getUser(), "Tom");
  }
}
```

## Hot Swap

- Hot swap, or hot reload, allows your changes to be available in the server without having to restart after each change.
- Hot swap can reload:
  - Static files.
  - Templates.
  - Java classes.
- Hot swap can also provide for fast application restarts, as the DevTools module contains a module for application restarts.
- The `DevTools` dependency contains hot swap capabilities.
  - You can add this when you create your Spring Boot template.
  - You can also add it later by updating the pom.xml with the following information:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
</dependency>
```

- If you have troubles, here's a resource for troubleshooting [hot reload](https://www.mkyong.com/spring-boot/intellij-idea-spring-boot-template-reload-is-not-working/).
- If you run into an issue with the port already being used, you can find out what's using it and, if necessary, force kill it.

```shell
> netstat -a -o -n
# find the record for port 8080.
# take note of its pid
> taskkill /f /pid {pid}
# enter the corresponding pid from step 1
```

## Logging

- Spring Boot supports Java Util Logging, Log4j2, and Logback.
  - By default, it uses Logback.
- These components allow you to configure console and file logging to detect and track problems and statistics.
- Default Spring Boot logging provides the following information:
  - Date and time.
  - Log level - INFO, ERROR, TRACE, WARN. how many logs do you want to see? Based on the level you set, Spring Boot will print the messages fit for that level. 3 For complete logging level, you can see here: https://logging.apache.org/log4j/2.0/manual/architecture.html
  - Process ID
  - Thread name.
  - Logger name - the source of the class.
  - Log message
- By default, all logs go to the console.

### Setting Up Logging

#### Using application.properties

- You can configure logging in the application.properties file.
  - `logging.level.root` tells the logger at what level you want to log information.
    - INFO, ERROR, TRACE, WARN, DEBUG.
  - `logging.file` tells the logger which file to log information into.
  - Setting `debug=true` turns on debug logging.

```
debug=true
logging.level.root= DEBUG
logging.file = /var/tmp/serverlog.log
```

#### Using logback.xml

- If you're using Logback, you can also create a logback.xml file to configure logging.
- [More info](https://logback.qos.ch/manual/configuration.html)

### Setting Logger

- You can change the logger application by updating the pom.xml dependencies.
- Here', I'm setting the logger to use log4j2, specifically, the Spring Boot version of log4js2.

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-log4j2</artifactId>
</dependency>
```
