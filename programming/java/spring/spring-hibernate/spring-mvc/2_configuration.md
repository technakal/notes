# Spring MVC Configuration

<!-- TOC -->

- [Spring MVC Configuration](#spring-mvc-configuration)
  - [Overview](#overview)
  - [XML Setup Process](#xml-setup-process)
    - [WEB-INF/web.xml](#web-infwebxml)
    - [WEB-INF/spring-mvc-demo-servlet.xml](#web-infspring-mvc-demo-servletxml)
    - [Create Controller Class](#create-controller-class)
    - [Development Example](#development-example)
  - [Java Source Code Setup Process](#java-source-code-setup-process)

<!-- /TOC -->

## Overview

- Configuration is probably the most difficult part of Spring MVC development.
- This step-by-step guide walks through how to configure it properly.
  - The example below is XML-based configuration. Spring MVC also supports Java source code configuration, which you can review [here](#java-source-code-setup-process).
- Note: In Eclipse, working with Spring MVC is best supported with the Perspective of Java EE.
  - Window > Perspective > Open Perspective > Java EE.

## XML Setup Process

### WEB-INF/web.xml

- Configure the Spring MVC Dispatcher Servlet.

```xml
<servlet>
  <servlet-name>dispatcher</servlet-name>
  <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
  <init-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>/WEB-INF/spring-mvc-demo-servlet.xml</param-value>
  </init-param>
  <load-on-startup>1</load-on-startup>
</servlet>
```

- Set up URL mapping to the Dispatcher Servlet.
  - The `<servlet-name>` must match the one you set up in the step above.
    - `dispatcher == dispatcher`

```xml
<servlet-mapping>
  <servlet-name>dispatcher</servlet-name>
  <url-pattern>/</url-pattern>
</servlet-mapping>
```

### WEB-INF/spring-mvc-demo-servlet.xml

- Add support for Spring component scanning.
  - This is like turning component scanning on any of our earlier XML config files.

```xml
<context:component-scan base-package="com.technakal.springdemo" />
```

- Add support for conversion, formatting, and validation.
  - MVC can perform conversions of form data.
  - It can format form data for you.
  - It can also perform form validation.
  - In order for these to work, you need to "turn it on" in the config xml.

```xml
<mvc:annotation-driven/>
```

- Configure Spring MVC View Resolver.
  - This is a fancy name for telling Spring where the view pages are located.
  - The information below will tell Spring, "When building views, look for files matching this filepath: `/WEB-INF/view/*.jsp`.
    - If one of our views is called `home`, the bean below will say, "Render to page ``/WEB-INF/view/home.jsp`."

```xml
<bean
  class="org.springframework.web.servlet.view.InternalResourceViewResolver">
  <property name="prefix" value="/WEB-INF/view/" />
  <property name="suffix" value=".jsp" />
</bean>
```

### Create Controller Class

- Create a controller class, which MVC will use to control routes.
- Annotate it with `@Controller`.
  - `@Controller` inherits from `@Component`, so scanning will pick it up.
- Add the path name using the `@RequestMapping` annotation to whatever method you want it to execute when it's accessed.
- Put the view name as the return from within the method.
- Build the corresponding view, and place it in the `WEB-INF/view/main-menu.jsp`.

### Development Example

1. Create a new project using the Dynamic Web Project option.
2. Load Spring JAR files into `/WEB-INF/lib`.
   a. This automatically places them on our classpath, so we don't have to do the rest of the stuff we did earlier.
   b. Make sure you also add the following files if you need support for @PostConstruct/@PreDestroy, extra logging, and JSP/JSTL support.
   1. commons-logging-1.2.jar
   2. javax.annotation-api-1.2.jar
   3. javax.servlet.jsp.jstl-1.2.1.jar
   4. javax.servlet.jsp.jstl-api-1.2.1.jar
3. Load and configure Spring MVC config files.
4. Create your `/WEB-INF/view/` directory.
   a. This will store our view templates.
5. Create your controller class.
   b. Create a method uses the `@RequestMapping` annotation and that returns your view name.
6. Create a view in the `WEB-INF/view/` directory that matches the view name you returned in your method.

```java
@Controller
public class HomeController {

  @RequestMapping("/")
  public String showPage() {
    return "main-menu";
  }

}
```

- It's as easy as that! Except when it isn't! In those cases, try these resources:
  - [Spring Controller Isn't Working](https://www.udemy.com/course/spring-hibernate-tutorial/learn/lecture/5609866#questions)
  - [Tomcat won't start](https://www.udemy.com/course/spring-hibernate-tutorial/learn/lecture/5740608#questions)

## Java Source Code Setup Process
