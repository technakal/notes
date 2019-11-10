# Spring MVC Controllers and Views

<!-- TOC -->

- [Spring MVC Controllers and Views](#spring-mvc-controllers-and-views)
  - [Development Process](#development-process)
    - [Defining the Controller Class](#defining-the-controller-class)
    - [Define Controller Method](#define-controller-method)
    - [Add Request Mapping](#add-request-mapping)
    - [Return View Name](#return-view-name)
    - [Create View Page](#create-view-page)
      - [[Using Static Resources in Views](https://www.udemy.com/course/spring-hibernate-tutorial/learn/lecture/5608584#overview)](#using-static-resources-in-viewshttpswwwudemycomcoursespring-hibernate-tutoriallearnlecture5608584overview)
  - [Request Mapping at the Controller Level](#request-mapping-at-the-controller-level)

<!-- /TOC -->

## Development Process

- Define Controller class.
- Define Controller method.
- Add request mappings to Controller method.
- Return the View name.
- Develop the View page.

### Defining the Controller Class

- Create a regular class.
- Annotate it with `@Controller`.
  - This tells Spring that the class is an MVC controller.
  - This annotation inherits from `@Component`, so it allows the class to be discoverable by component scanning!

```java
@Controller
public class HomeController {
  // stuff
}
```

### Define Controller Method

- Within your controller class, define the controller method.
- The method can have any name you want, so it's flexible.
- Return type is `String` for basic Controllers, which is the View name to return.
  - You can make this return different configurations, but we'll review that later.
- You can declare request parameters and inputs here, if you need to.

```java
@Controller
public class HomeController {

  public String renderPage() {
    // do stuff
  }

}
```

### Add Request Mapping

- Annotate the Controller method in the Controller class with the route name.
- Use the `@RequestMapping(path)`.
  - Handles all types of requests--GET, POST, etc.

```java
@Controller
public class HomeController {

  @RequestMapping("/")
  public String renderPage() {
    // do stuff
  }

}
```

### Return View Name

- Within the Controller method, return the view name.
  - Because we configured the view loader in our config files, this will now return the fully qualified path and file extension.
  - We just need to put in the file name!

```java
@Controller
public class HomeController {

  @RequestMapping("/")
  public String renderPage() {
    return "main-menu"; // returns /WEB-INF/views/main-menu.jsp
  }

}
```

### Create View Page

- Create the corresponding View page to go with our Controller method.
  - In this example, it's main-menu.jsp.

#### [Using Static Resources in Views](https://www.udemy.com/course/spring-hibernate-tutorial/learn/lecture/5608584#overview)

- Here are the steps on how to access static resources in a Spring MVC.
  - For example, you can use this to access images, css, JavaScript files, etc.
- Any static resource is processed as a URL Mapping in Spring MVC.
  - You can configure references to static resources in the spring-mvc-demo-servlet.xml.
- Step 1: Add the following entry to your Spring MVC configuration file: spring-mvc-demo-servlet.xml
  - You can place this entry anywhere in your Spring MVC config file.

```xml
<mvc:resources mapping="/resources/**" location="/resources/"></mvc:resources>
```

- Step 2: Now in your view pages, you can access the static files using this syntax:

```html
<img
  src="${pageContext.request.contextPath}/resources/images/spring-logo.png"
/>
```

- You need to use the JSP expression `${pageContext.request.contextPath}` to access the correct root directory for your web application.
  - Apply the same technique for reading CSS and JavaScript.

## Request Mapping at the Controller Level

- You can also create request mappings for the Controller level.
- These serve as parent mappings for the Controller itself.
- All of the request mappings on the underlying methods become, then, relative to the parent mapping.
  - In the example below, we set the controller's "root" level to "/api/".
  - Each subsequent mapping is in relation to this, so the other two become "/api/getStudent" and "/api/addStudent".

```java
@Controller
@RequestMapping("/api")
public class ApiController {

  @RequestMapping("/getStudent")
  public String getStudent() {
    // do something
  }

  @RequestMapping("/addStudent")
  public String addStudent() {
    // do something
  }
}
```
