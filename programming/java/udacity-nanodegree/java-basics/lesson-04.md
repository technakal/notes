# Spring Boot Exceptions, WebSockets, and Packaging

- [Spring Boot Exceptions, WebSockets, and Packaging](#spring-boot-exceptions-websockets-and-packaging)
  - [Exception Handling](#exception-handling)
    - [Custom Error Page](#custom-error-page)
    - [ExceptionHandler](#exceptionhandler)
  - [WebSockets](#websockets)
  - [Packaging a Spring Boot Application](#packaging-a-spring-boot-application)

## Exception Handling

- In Spring Boot, we have five options for handling exceptions:
  - Custom error page
  - Use `@ExceptionHandler` annotation
  - Use `@ControllerAdvice` + `@ExceptionHandler`
  - Configure the `SimpleMappingExceptionResolver` class.
  - Create a custom `HandlerExceptionResolver` class.

### Custom Error Page

- The easiest way to handle some errors is to create an error.html page in the templates folder.
  - This replaces the default Spring Boot page.
  - This isn't a one-stop fix, though. Typically, we'll need to use other options because we want different pages for different errors.

### ExceptionHandler

- You can specify different error handling pages for different exceptions using the @ExceptionHandler annotation.
  - With this annotation, you specify the type of exception to handle.
  - Then, you create a method that returns a `ModelAndView` object.
  - Within the handler, you give the instantiate a `ModelAndView` object, give it an exception value (if you want access to the exception to print to the screen).
  - You specify the template page the exception should load using the `.setViewName()` method.
  - Finally, you return the `ModelAndView` object.

```java
@ExceptionHandler(value = {java.lang.ArithmeticException.class})
public ModelAndView handlerArithmeticException(Exception e) {
  ModelAndView mv = new ModelAndView();
  mv.addObject("exception", e.toString());
  mv.setViewName("mathError");
  return mv;
}
```

- Then, you just create an html page in the templates folder that corresponds to the exception view name you specified.
  - In this case, it'd be `mathError.html`.

## WebSockets

## Packaging a Spring Boot Application
