# Request Params and Controller Mapping

## Overview

- Like with anything else Java, you can also work with request parameters and Controller-level request mapping using annotations.
- The request param shortcut allows you to skip the HttpServletRequest method of pulling param data.
- The controller-level request mapping allows you to, sorta, set a base for all method mappings.
  - So, defining "/api/" as your controller-level mapping will cause all underlying methods to prepend this to their own mapping.

## Request Param

- The `@RequestParam` annotation allows you to bind the value of a request parameter to a variable.
  - So, rather than pulling in `HttpServletRequest` and manually loading the variable, the annotation does it.
- The annotation is added to the parameters list in the controller method.

```java
public class HomeController {

  @RequestMapping("/processForm")
  public String processForm(
    @RequestParam("studentName") String name,
    Model model
  )

  // do stuff

}
```

## Controller-Level Request Mapping

- Controller-level request mapping sets the parent path for the requests.
  - All methods are relative to this mapping.
  - So, a controller-level mapping of `/api'/ will result in all underlying method mapping having this value prepended to their own mapping.
- Use the same `@RequestMapping` annotation, this time just after the `@Controller` annotation.

```java
@Controller
@RequestMapping("/api")
public class HelloWorldController {

  @RequestMapping("/showForm") // mapping becomes /api/showForm
  public String showForm() {
    return "greeting-form";
  }

  @RequestMapping("/greet") // mapping becomes /api/greet
  public String showGreeting(
    @RequestParam("studentName") String name,
    Model model
  ) {
    if(name == "") {
      name = "Stranger";
    }
    model.addAttribute("name", name);

    return "greeting";
  }
}
```

## Conflicts in the Request Paths

- Sometimes, you'll end up with a request path conflict.
  - This occurs when two methods implement the same @RequestMapping value--so two methods both pointing to "/form" or whatever.
  - This throws an IllegalStateException: Ambiguous mapping.
- Here's how to resolve them:
  - You could change the path value of one of them.
  - If that won't do, for whatever reason, you can add Controller-level mapping so that the two paths become distinct because of their root path values.
    - So, one might become "/home/form" and the other "/contact/form".
