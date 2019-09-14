# Java Spring Boot Templating

- [Java Spring Boot Templating](#java-spring-boot-templating)
  - [Overview](#overview)
    - [What is a Template Engine?](#what-is-a-template-engine)
  - [Freemarker](#freemarker)
    - [Configure Spring Boot to Use Freemarker](#configure-spring-boot-to-use-freemarker)
    - [Resources](#resources)
  - [Thymeleaf](#thymeleaf)
    - [Adding Thymeleaf to Spring Boot](#adding-thymeleaf-to-spring-boot)
    - [Using Thymeleaf](#using-thymeleaf)
      - [Variables](#variables)
        - [Valid Thymeleaf Attributes](#valid-thymeleaf-attributes)
        - [Pre-defined Variables](#pre-defined-variables)
        - [Literals](#literals)
      - [Conditions](#conditions)
      - [Loops](#loops)
      - [Example](#example)
      - [Scope](#scope)
      - [URLs](#urls)
    - [Resources](#resources-1)

## Overview

- Spring Boot has three major templating engines:
  - Freemarker
  - JSP
  - Thymeleaf

### What is a Template Engine?

- It combines source templates with data to produce dynamically rendered documents.
- It provides rendering for server-side code processes.
  - It's just templating, dude. Same as pug or whatever.
- Templating includes the following components:
  - Data model
    - Any datasource (database, xml, csv, etc)
  - Source template
    - Any file types to be rendered and populated by the template engine.
    - HTML, XML, etc.
  - Template engine
    - The process that connects the data model to the source template.
    - Outputs the result document, or the populated HTML, in this case.

![Template Engine Overview](media/template-engine-overview.png)

## Freemarker

- FreeMarker works as a sequential text processor, which differs from how some template engines work.
  - Not sure how it works because the Udacity demo code is invalid. Super good job. Super good.

### Configure Spring Boot to Use Freemarker

- Just import the Freemarker dependency when using the Spring Initializr.

### Resources

- [Freemarker Website](https://freemarker.apache.org/)

## Thymeleaf

- Thymeleaf is a common templating engine.
- It's easier to use than Freemarker.
- It's very similar to pug, injecting data into the DOM using specialized tag attributes.

### Adding Thymeleaf to Spring Boot

- You can add Thymeleaf as a dependency using the Spring Initializr.

### Using Thymeleaf

- Add your templates to the resources/templates folder.
- In the template, you can use the specialized syntax to bind a data element, which renders when the app loads.
- In the Controller, you specify the route the information should be served on, as usual, using `RequestMapping`.
  - Then, you specify the template page that the controller cooresponds to in the `return` statement from your Controller method.

```java
@RequestMapping("demo") // route to serve on is demo
  public String demo(Model model) {
    model.addAttribute("message", "Hello Thymeleaf");
    double grade = 70.6;
    model.addAttribute("grade", grade);
    model.addAttribute("GPA", convertToGPA(grade));
    return "demo"; // return the template called "demo"
  }

  @RequestMapping("demo2") // route to serve on is demo2
  public String demo2(Model model) {
    List<User> users = new ArrayList<>();
    users.add(new User(1, "Holden", 32));
    users.add(new User(2, "Bill", 54));
    users.add(new User(3, "Wendy", 46));
    model.addAttribute("users", users);
    return "demo2"; // return the template called "demo2"
  }

  @RequestMapping("demo3") // route to serve on is demo3
  public String demo3(HttpServletRequest request, Model model) {
    // Request
    request.setAttribute("request", "request data");
    // Session
    request.getSession().setAttribute("session", "session data");
    // Application
    request.getSession().getServletContext().setAttribute("application", "application data");
    return "demo2"; // return the template called "demo2"
  }
```

#### Variables

- Variables in Thymeleaf are defined on the model layer using the Model class of the Spring Framework.
  - The Model is an implementation of Map, and as such accepts a key-value pair.
    - The variable name is the key, the value is the... value.

```java
Model.addAttribute("variableName", "variableValue" );
```

- To use the variable in the Thymeleaf template, you use template interpolatio syntax, just like JavaScript.
  - Thymeleaf uses attributes, identified by `th:` to identify content that it should resolve from the Model layer.
  - In the example below, Thymeleaf resolves the `th:text` attribute into its `${message}` value, then populates the <span> with the result of that resolution.

```html
<span th:text="${message}"></span>
```

##### Valid Thymeleaf Attributes

- `th:text`
  - This attribute is responsible for displaying text that is evaluated from the expression inside it, it will process the expression and then display the text html-encoded.
  - Example: `<p th:text="${home.welcome}">Welcome to our grocery store!</p>`
- `th:utext`
  - Similar to th:text, but used for displaying unescaped text.
- `th:attr`
  - Takes an HTML attribute and sets it's value dynamically.
  - Example: `<input type="submit" value="Subscribe me!" th:attr="value=${subscribe.submit}"/>`
  - The `value` attribute will be set to the value of `${subscribe.submit}` after processing, replacing the supplied value="Subscribe me!"
- `th:value`, `th:action`, `th:href`, `th:onclick`
  - Shorthand syntax for the `th:attr`.
  - Works with any of the attributes you'd fill in for `th:attr=x`
- `th:attrappend`
  - This will not replace the attribute value, but will only append the value to it.
  - Example: `th:attrappend="class=${' ' + cssStyle}"`.

##### Pre-defined Variables

- Thymeleaf offers various pre-defined variables, for different purposes:
  - `#ctx` - the context object.
  - `#vars` - the context variables.
  - `#locale` - the context locale.
    - `<span th:text="${#locale.country}">`
  - `#httpServletRequest` - (only in Web Contexts ) the HttpServletRequest object.
  - `#httpSession` - The session object of current session.
  - `#dates` - utility methods for java.util.Date objects : formatting , component extraction, etc.
  - `#calendars` - analogous to #dates , but for java.util.Calendar objects.
    - `<span th:text="${#calendars.format(today,'dd MMMM yyyy')}">13 May 2011</span>`
  - `#numbers` - utility methods for formatting numeric objects.
  - `#strings` - utility methods for String objects : contains , startsWith, prepending /appending , etc.
  - `#objects` - utility methods for objects in general.
  - `#bools` - utility methods for boolean evaluation.
  - `#arrays` - utility methods for arrays.
  - `#lists` - utility methods for lists.
  - `#sets` - utility methods for sets.
  - `@{/link/path}` - This will create a link to the path specified relative to the deployment context
    - Example: If the application is deployed at context my-app, then the generated path will be `/my-app/link/path`. To include parameters, use `@{/link/path(param=value)}`. This will generate `/link/path?param=value`
    - For Path variables use: `@{/link/{myPathVariable}/path(myPathVariable=${variable})}` which will replace the `{myPathVariable}` with the value from `${variable}`
  - `${@beanName.method()}`: Spring-specific bean method call expression.
    - This will call a method on a spring bean called beanName, it will look for the bean in the current spring context
  - `*{property}` - Allows direct access to the properties on the identified object.
    - Kind of like using object deconstruction in JavaScript.
    - This will access properties on `${session.user}` object directly using the `*{...}` syntax
    - `*{firstName}`, this is equal to using `${session.user.firstName}`.

```html
<div th:object="${session.user}">
  <p>Name: <span th:text="*{firstName}">Sebastian</span>.</p>
  <p>Surname: <span th:text="*{lastName}">Pepper</span>.</p>
  <p>Nationality: <span th:text="*{nationality}">Saturn</span>.</p>
</div>
```

##### Literals

- Thymeleaf interprets certain values literally.
- "'the literal string'"
  - You can write normal strings between two '' single quotes.
- "3 + 2"
  - Evanluate mathematical equations normally.
- "false","true" and "null"
  - Evaluated to normal false, true and null expressions.
- "singleWordToken": tokens with single words do not need single quotes and can be written as is.

#### Conditions

- Thymeleaf supports three formats of conditional statements.
  - `th:if`
    - Evaluates the conditions specified in the attribute and if they are true, the tag is displayed.
    - Basically v-show from Vue.
    - Example: `th:if="${user.admin}"`
  - `th:unless`
    - Opposite of `th:if`.
    - Displays the tag only when the value of the conditional is false.
    - Example: `th:unless="${user.admin}"` is equal to `th:if="${!(user.admin)}"`
  - `th:switch` and `th:case`
    - Attributes used to create a swtich statement.
    - `th:switch` will hold the variable to switch on, and `th:case` will evaluate the case statements for this variable.

```html
<div th:switch="${user.role}">
  <p th:case="'admin'">User is an administrator</p>
  <p th:case="${roles.manager}">User is a manager</p>
  <p th:case="*">User is some other thing</p>
</div>
```

#### Loops

- Thymeleaf loops are constructed like Java for-each loops.
  - `th:each`
    - The iteration attribute.
    - Analogous to Java's for-each loop: for(Object o : list), but its syntax is slightly different.
    - When iterating over a map, the components of each item can be accessed using .key and .value.
  - Loops only work on iterable Java data types:
    - Items capable of implementing java.util.Iterable
    - Maps
    - Arrays
- First, the controller:
  - This is where the data gets prepared for the Thymeleaf template.

```java
@RequestMapping("demo2")
public String demo2(Model model) {
  List<User> users = new ArrayList<>();
  users.add(new User(1, "Holden", 32));
  users.add(new User(2, "Bill", 54));
  users.add(new User(3, "Wendy", 46));
  model.addAttribute("users", users); // this sets up our model to be ready for rendering
  return "demo2";
}
```

- Next, the HTML, where Thymeleaf renders the data.

```html
<h1>BSU</h1>
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr th:each="user : ${users}">
      <td th:text="${user.id}"></td>
      <td th:text="${user.name}"></td>
      <td th:text="${user.age}"></td>
    </tr>
  </tbody>
</table>
```

#### Example

- Create a controller class to handle the data.
- This example creates a `UserController` that maps to the /demo route.
- This model has a single attribute--message.
  - We'll see this used in the template.

```java
package com.technakal.thymeleafpractice.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserController {
  @RequestMapping("demo")
  public String demo(Model model) {
    model.addAttribute("message", "Hello Thymeleaf");
    return "demo";
  }
}
```

- Create a template in the `resources/template`.
- This template renders the `message`. That's all it does.
  - You need to add the `xmlns:th="http://www.w3.org/1999/xhtml"` value to the <html> tag.
    - This tells the HTML that it should be rendered using Thymeleaf.
  - The <span> has a `th:text` attribute that points to the `${message}` value.
  - This tells Thymeleaf to render the demo model's message value when the page is accessed.

```html
<!DOCTYPE html>
<html>
  <head lang="en" xmlns:th="http://www.w3.org/1999/xhtml">
    >
    <meta charset="utf-8" />
    <title>Thymeleaf Demo</title>
  </head>
  <body>
    <span th:text="${message}"></span>
  </body>
</html>
```

#### Scope

- Scope is used by Thymeleaf to determine which variables are available to a given template. I think.
- Scope is used to pass data between pages.
- There are three types of scope:
  - Request - used alongside HTTP requests.
  - Session
  - Application

```java
@RequestMapping("demo3")
public String demo3(HttpServletRequest request, Model model) {
  request.setAttribute("request", "request data");
  request.getSession().setAttribute("session", "session data");
  request.getSession().getServletContext().setAttribute("application", "application data");
  return "demo2";
}
```

```html
<div>
  <h1>Thymeleaf Scope</h1>
  <p>Request: <span th:text="${request}"</p>
  <p>Session: <span th:text="${session}"</p>
  <p>Application: <span th:text="${application}"</p>
</div>
```

#### URLs

- Create dynamic URLs using `th:href`.

```html
<p><a th:href="@{~/demo}">Demo</a></p>
```

- If you want to pass URL parameters, use this additional information.

```html
<p><a th:href="@{~/demo(id=1, username='noel')}">Demo with Parameters</a></p>
```

### Resources

- [Thymeleaf](https://www.thymeleaf.org/)
- [Thymeleaf Cheatsheet](https://github.com/LaunchCodeEducation/cheatsheets/tree/master/thymeleaf)
- [Thymeleaf Docs](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html)
- [Thymeleaf and Spring MVC Integration](https://www.thymeleaf.org/doc/tutorials/3.0/thymeleafspring.html)
