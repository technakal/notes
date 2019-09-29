# Spring MVC

- [Spring MVC](#spring-mvc)
  - [Overview](#overview)
  - [Benefits of Using Spring MVC](#benefits-of-using-spring-mvc)
  - [Behind the Scenes](#behind-the-scenes)
    - [Components of Spring MVC Application](#components-of-spring-mvc-application)
    - [How It Works](#how-it-works)

## Overview

- Spring MVC is a platform for building web apps.
- It's based on the Model-View-Controller design pattern.
- Leverages the main features of Spring Core.
  - IoC
  - Dependency injection
- [Official docs](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html)

## Benefits of Using Spring MVC

- It's the Spring way of doing web UIs.
  - If you like Spring, it's a good choice for you.
- Leverages a set of reusable web UI components.
- Helps manage state.
- Processes form data.
- Flexible configuration of the view layer.
  - Can use Thymeleaf, Groovy, Velocity, Freemarker, JSP, JSTL, etc.
  - [Official documentation](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-view) on supported template engines.
- Plenty of resources available for more information.

## Behind the Scenes

### Components of Spring MVC Application

- Collection of web pages to provide layout for UI components.
- Collection of Spring beans for controllers, servlets, etc.
- Spring configurations (XML, Annotation, Java source).
- Spring dev team creates the Front Controller.
- App developer (you) creates the Model(s), the Controller classes, and the View Templates.
  - Model objects are the data that is passed through your application.
  - The Controller runs processing (business) logic.
  - The View Template renders the Model data back to the user.

### How It Works

```
+---------+     +------------------+
|         | --> | Front Controller |
|         |     +------------------+
|         |              |    Model
|         |              V
|   Web   |     +------------------+
| Browser |     |    Controller    |
|         |     +------------------+
|         |               |    Model
|         |               V
|         |      +------------------+
|         |  <-- |  View Template   |
+---------+      +------------------+
```

- Request comes in from Web Browser to the Front Controller.
- Front Controller delegates the request to the Controller.
  - Part of the Spring framework.
  - Known as the `DispatchServlet`.
- The Controller processes the business logic:
  - Handles request.
  - Processes and stores data.
  - Places data into the model(s).
  - Returns data to the appropriate View Template.
- The Model contains data.
  - The Controller "loads" it.
- The View Template takes the Model data passed from the Controller and displays it.
