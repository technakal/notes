# Spring Model

- [Spring Model](#spring-model)
  - [Overview](#overview)
  - [Using Models](#using-models)
    - [Example](#example)
    - [Using Model Data In Views](#using-model-data-in-views)

## Overview

- The Spring model allows you to interact with, process, and render data to the view.
- It is the container for your application data.
  - Can include strings, objects, data from a database, user-submitted form data, etc.
- The views can access data from the model for rendering.

## Using Models

- You can pass `Model`s into controller methods.
  - Model is initially empty, but you can add to it.
- You can also pass HTTP request information into controller methods.
  - This is via the `HttpServletRequest` param type.
- You can add data to your model via the `addAttribute` method.

### Example

- Controller
  - Here, we pass in the request and model as parameters.
  - We intercept the request and manipulate its paramater.
  - We add the updated parameter into our model.
  - We return a view that uses that model data.

```java
@Controller
public class HelloWorldController {

  // some stuff
  @RequestMapping("/shoutSubmitted")
  public String letsShoutDude(HttpServletRequest request, Model model) {

    // get name
    String name = request.getParameter("studentName");

    // capitalize name
    name = name.toUpperCase();

    // create message with name
    String message = "Yo, " + name;

    // add message to model
    model.addAttribute("message", message);

    // return view
    return "submitted";
  }
}
```

- View

```html
<body>
  <!-- here, we use the raw param data -->
  <h1>Thank you for telling me your name, ${param.studentName}.</h1>
  <!-- here, we use the model data -->
  <p>Here's a message for you: ${message}</p>
  <ul>
    <li><a href="form">Go back to Form.</a></li>
    <li><a href="./">Go back to Home.</a></li>
  </ul>
</body>
```

### Using Model Data In Views

- You can access Model data using the `${attributeName}` syntax.
- So, if your model has an attribute called "message", you can render it via:

```html
<p>I have a message for you: ${message}</p>
```
