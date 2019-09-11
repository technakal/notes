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
    - [Creating a Controller](#creating-a-controller)
    - [Creating a RestController](#creating-a-restcontroller)
    - [Servlets, Filters, and Listeners](#servlets-filters-and-listeners)
      - [Servlets](#servlets)
        - [ServletComponentScan](#servletcomponentscan)
        - [Bean](#bean)
      - [Filters](#filters)
      - [Listener](#listener)
      - [Result of our Messing About](#result-of-our-messing-about)
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

### Creating a Controller

- I don't know if it's standard, but in this example, we created a Controller package within the com.technakal.FileUpload package.
  - So, our Controllers fit into our project structure like this.
  - I assume other Controllers would also go in this package.

```
src
  |-main
       |-java
           |-com.technakal.FileUpload
              |-FileUpload.java
              |-Controller
                      |-HelloController.java
```

- To create a Controller, use the `@Controller` annotation.
- Here's a simple example of a Controller, servicing the "/hello" route.
  - It has a `@Controller` annotation at the head of the class.
  - It has a `@RequestMapping` annotation, which declares the route.
  - It has a `@ResponseBody` annotation, which handles the response.

```java
package com.technakal.FileUpload.Controller;

// controller-related imports
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

// regular java imports
import java.util.HashMap;
import java.util.Map;

@Controller
public class HelloController {
  private Map<String, Object> result = new HashMap<String, Object>(); // the response json
  @RequestMapping("/hello") // route declaration
  `@ResponseBody` // the response activity
  public Map<String, Object> hello() {
    result.put("name", "Noel");
    result.put("city", "West Bend");
    return result;
  }
}
```

- Now, navigating to /hello will return a JSON object like this:

```json
{
  "city": "West Bend",
  "name": "Noel"
}
```

### Creating a RestController

- A RestController is a specialized version of a Controller.
- The RestController combines the `@Controller` and `@ResponseBody` in a single annotation.
- Here's what our HelloController looks like, once it's transformed into a RestController.
  - It has a `@RestController` annotation at the head of the class.
  - It has a `@RequestMapping` annotation, which declares the route.
  - It no longer needs a @ResponseBody, as that's contained in the @RestController.

```java
package com.technakal.FileUpload.Controller;

// controller-related imports
import org.springframework.stereotype.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

// regular java imports
import java.util.HashMap;
import java.util.Map;

@RestController
public class HelloController {
  private Map<String, Object> result = new HashMap<String, Object>(); // the response json
  @RequestMapping("/hello") // route declaration
  public Map<String, Object> hello() {
    result.put("name", "Noel");
    result.put("city", "West Bend");
    return result;
  }
}
```

### Servlets, Filters, and Listeners

#### Servlets

- Servlet is a class used to handle requests in web applications.
- It's server-side code.
- Spring Boot uses Servlet to receive requests from the client-side.
- There are two ways, in Spring Boot, to use Servlets:
  - @ServletComponentScan
  - @Bean

##### ServletComponentScan

- To set up the ServletComponentScan, you need to add a `@ServletComponentScan` annotation right after your @SpringBootApplication.
  - `@ServletComponentScan` enables scanning for servlets, filters, and listeners.
  - Only works on embedded servers.
  - Typically, you want to specify the Typically, `value`, `basePackages`, or `basePackageClasses` that you want to scan (with?).
    - `value` is an alias for `basePackages`
    - `basePackageClasses is a type-safe alternative to`basePackages`, which tells the system to scan for the packages of each specified class.
    - In the absence of these settings, scanning will be performed from the package of the class with the annotation.

```java
// using value
// value is just shorthand for basePackage
@ServletComponentScan(value="org.pkg.name")
// using basePackages
@ServletComponentScan(basePackages="org.pkg.name")
// using basePackageClasses
// this one is type-safe
@ServletComponentScan(basePackageClasses="org.pkg.name")
```

- The `@ServletComponentScan` is making SpringBoot scan for `@WebServlet` annotation and it’s only performed when using an embedded web server such as Spring Boot.
  - Here's some additional information about [WebServlet](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/web/servlet/ServletComponentScan.html).
- This is in the FileUpload.java file:

```java
package com.technakal.FileUpload;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan // here she is. isn't she beautiful.
public class FileUploadApplication {
	public static void main(String[] args) {
		SpringApplication.run(FileUploadApplication.class, args);
	}
}
```

- Now, your app is watching for servlets.
- To create the actual servlet, add a Servlet package.
  - Now our project structure looks like this:

```
src
  |-main
       |-java
           |-com.technakal.FileUpload
              |-FileUpload.java
              |-Controller
              |       |-HelloController.java
              |-Servlet
                      |-HelloServlet.java
```

- Within the HelloServlet.java file, we'll add a Servlet to the "/helloservlet" route.
- The Servlet looks like this.
  - The `@WebServlet` annotation declare the name of the servlet and its route (urlPatterns).
  - The Servlet extends the HttpServlet.
  - The Servlet overrides the doGet method of the HttpServlet and makes it print out something.

```java
package com.technakal.FileUpload.Servlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name="HelloServlet", urlPatterns = "/helloservlet")
public class HelloServlet extends HttpServlet {
  @Override
  protected String doGet(HttpServletRequest req, HttpServletResponse res) {
    System.out.println("Running HelloServlet doGet() method.");
  }
}
```

##### Bean

- You can also declare servlets using @Bean.
- Bean is an object that is used by the Spring IoC Controller.
  - More info on [Spring IoC Controllers](https://howtodoinjava.com/spring-core/different-spring-ioc-containers/).
- `@ComponentScan` finds `@Bean`s.
- `@Autowired` injects beans?
- More info on [`@Beans`](https://www.youtube.com/watch?v=K5bkniAjkZA&t=21s)
- `@Bean`s have to do with dependency injection.
  - Dependency injection helps to decouple dependent code.
    - In Spring, dependency injection creates Beans and wires up your program's dependencies automatically so you don't have to.
  - To use this, you declare certain classes as components, using the `@Component` annotation.
  - Then, you add in `@Autowired` annotation where those components are used.
  - This allows you to just use and pass the instantiated classes, without having to write things like `new ClassName()`.
    - You can just pass in the `ClassName` and Spring instantiated for you, etc.
  - This improves ease of testing.
  - You can use `@Qualifier`s to differentiate `@Component`s that share the same signature or interface.

#### Filters

- Filters are used for pre- and postprocesing of web requests.
- It can be used to validate, encrypt/decrypt, log results, etc.
  - For instance, it can filter out request if it contains some invalid content, or ignore requests that do not contain required request parameter.
- Creating a filter is a lot like everything else in Spring Boot. You just use an annotation, dude.
- Here's a filter implemented on our /helloservlet route.
  - This will run when helloServlet is accessed, and kind of surrounds the HelloServlet action.
  - The `@WebFilter` annotation declare the filter, names it, and says which route it'll be on.
  - The filter implements the Filter interface.
  - The `@Override` creates a custom version of doFilter(), which prints a statement, runs the code in HelloServlet, then prints another statement.
    - Basically, I think what we've done is created a doFilter() method that says, "Started', then runs the servlet associated with the route, then continues on its way, as long as that servlet doesn't throw an exception.

```java
package com.technakal.FileUpload.Servlet;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter(filterName = "HelloFilter", urlPatterns = "/helloservlet")
public class HelloFilter implements Filter {
  @Override
  public void doFilter(ServletRequest servletRequest,
                       ServletResponse servletResponse,
                       FilterChain filterChain) throws IOException, ServletException {
    System.out.println("Performing HelloFilter process.");
    filterChain.doFilter(servletRequest, servletResponse);
    System.out.println("Done executing filter process.");
  }
}
```

#### Listener

- The Listener is used to listen for events in the event container.
- Events include things like:
  - Creating a session.
  - Creating a session attribute.
- Here's an example Listener.
  - `@WebListener` initiates th elistener.
  - The Listener implements the ServletContextListener.
  - When the servlet is created, the contextInitialized runs.
  - When the servlet is terminated, the contextDestroyed runs.

```java
package com.technakal.FileUpload.Servlet;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class HelloListener implements ServletContextListener {
  @Override
  public void contextDestroyed(ServletContextEvent servletContextEvent) {
    System.out.println("Servlet context destroyed. (THIS IS FROM HELLOLISTENER).");
  }
  @Override
  public void contextInitialized(ServletContextEvent servletContextEvent) {
    System.out.println("Servlet context initialized. (THIS IS FROM HELLOLISTENER).");
  }
}
```

#### Result of our Messing About

- In the console of the server, here's what the items we've set up are doing:
  - You'll notice the following lines are from our listener, filter, and servlet.
    - Servlet context initialied.
    - Performing HelloFilter process.
    - Running HelloServlet doGet() method.
    - Done executing filter process.
    - Servlet context destroyed.

```shell
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.1.8.RELEASE)

2019-09-10 18:45:49.977  INFO 13016 --- [           main] c.t.FileUpload.FileUploadApplication     : Starting FileUploadApplication on psciskjmi with PID 13016 (started by paperspace in C:\Users\paperspace\Desktop\Udacity Nanodegree\FileUpload)
2019-09-10 18:45:49.980  INFO 13016 --- [           main] c.t.FileUpload.FileUploadApplication     : No active profile set, falling back to default profiles: default
2019-09-10 18:45:51.484  INFO 13016 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
2019-09-10 18:45:51.521  INFO 13016 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2019-09-10 18:45:51.521  INFO 13016 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.24]
2019-09-10 18:45:51.641  INFO 13016 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2019-09-10 18:45:51.642  INFO 13016 --- [           main] o.s.web.context.ContextLoader            : Root WebApplicationContext: initialization completed in 1595 ms
Servlet context initialized. (THIS IS FROM HELLOLISTENER).
2019-09-10 18:45:51.941  INFO 13016 --- [           main] o.s.s.concurrent.ThreadPoolTaskExecutor  : Initializing ExecutorService 'applicationTaskExecutor'
2019-09-10 18:45:52.172  INFO 13016 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2019-09-10 18:45:52.178  INFO 13016 --- [           main] c.t.FileUpload.FileUploadApplication     : Started FileUploadApplication in 2.712 seconds (JVM running for 3.284)
Performing HelloFilter process. (THIS IS FROM HELLOFILTER).
Running HelloServlet doGet() method. (THIS IS FROM HELLOSERVLET).
Done executing filter process. (THIS IS FROM HELLOFILTER).
Servlet context destroyed. (THIS IS FROM HELLOLISTENER).

Process finished with exit code -1

```

## Spring Boot File Upload
