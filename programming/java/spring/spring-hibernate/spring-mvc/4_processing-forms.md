# Spring Form Processing

## Overview

- Form workflow basically functions like this:
  - User accesses form URI.
  - Spring MVC controller gets the request and returns the form view.
  - User fills out the form and submits.
    - The `action` parameter of the `<form>` tag corresponds to the `@RequestMapping` value of the processing method.
  - Spring MVC controller gets the new request and returns the result view.

```
---------------------------------------SUBMISSION----------------------------------
+--------------------+                   +-------------------+     +-----------+
| User accesses site | --> /showForm --> | Spring Controller | --> | Form View |
+--------------------+                   +-------------------+     +-----------+
---------------------------------------SUBMISSION----------------------------------
+-------------------+                     +-------------------+     +-------------+
| User submits form | --> /submitForm --> | Spring Controller | --> | Result View |
+-------------------+                     +-------------------+     +-------------+
```

## Rendering Data

- You can access and render URI paramters in JSP using `${param.attributeName}`.
- So, if I have a URI param called "studentName", I can render it:

```html
<p>Student Name: ${param.studentName}</p>
```

- Note: this is slightly different from accessing data directly from your Spring models.
  - You can read about that [here](./spring-model.md/#using-model-data-in-views).

## Reading Form Data

- You can use the `@RequestParam` annotation to interact with form data submitted to your Controllers.
  - This bypasses the need for the HttpServletRequest, at least in regards to data interaction.
  - This annotation binds the specified data to a parameter, so you can use it as normal.
  - In the example below, the method is finding the form data with studentName as the name and binding it to the name variable.

```java
@RequestMapping("/shoutSubmitted")
  public String letsShoutDude(
    @RequestParam("studentName") String name,
    Model model) {
    // do stuff
  }
```
