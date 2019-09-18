# Spring Boot Exceptions, WebSockets, and Packaging

- [Spring Boot Exceptions, WebSockets, and Packaging](#spring-boot-exceptions-websockets-and-packaging)
  - [Exception Handling](#exception-handling)
    - [Custom Error Page](#custom-error-page)
    - [ExceptionHandler](#exceptionhandler)
    - [Global Exception Handling](#global-exception-handling)
      - [ControllerAdvice](#controlleradvice)
      - [SimpleMappingExceptionResolver](#simplemappingexceptionresolver)
      - [Custom HandlerExceptionResolver](#custom-handlerexceptionresolver)
  - [WebSocket and STOMP](#websocket-and-stomp)
    - [WebSocket](#websocket)
      - [WebSocket Components](#websocket-components)
    - [STOMP](#stomp)
      - [Common STOMP Commands](#common-stomp-commands)
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

### Global Exception Handling

- The method of defining exception handlers in a controller only works well if you have a single controller.
- In a multiple-controller application, you can instead define global exception handlers that work for all underlying controllers.

#### ControllerAdvice

- @ControllerAdvice is an annotation that allows you to handle exceptions throughout the whole application, rather than on a single @Controller. That's what it's for.
  - [More information](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/bind/annotation/ControllerAdvice.html)
- To define global exception handlers, create an exception directory.
- Inside, create a `GlobalExceptionHandler` class.
- Annotate the class with `@ControllerAdvice`.
- Define your exceptions normally within the class.
- That's it! That's how you define globally-available exceptions.

```java
@ControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(value = {java.lang.ArithmeticException.class})
  public ModelAndView handlerArithmeticException(Exception e) {
    ModelAndView mv = new ModelAndView();
    mv.addObject("exception", e.toString());
    mv.setViewName("mathError");
    return mv;
  }

  @ExceptionHandler(value = {java.lang.NullPointerException.class})
  public ModelAndView handlerNullPointerException(Exception e) {
    ModelAndView mv = new ModelAndView();
    mv.addObject("exception", e.toString());
    mv.setViewName("nullError");
    return mv;
  }
}
```

#### SimpleMappingExceptionResolver

- The SimpleMappingExceptionResolver is an even cleaner way to create global handlers.
- In this case, you define your custom SimpleMappingExceptionResolver as a `@Configuration`.
- You create a `@Bean` method.
- In the bean method, you create a SimpleMappingExceptionResolver and its Properties.
- You add the exceptions that might be thrown to the Properties and dictate which error template to load.
- You attach the Properties to the resolver.
- You return the resolver.

```java
@Configuration
public class MySimpleMappingExceptionResolver {
  @Bean
  public SimpleMappingExceptionResolver getSimpleMappingExceptionResolver() {
    SimpleMappingExceptionResolver resolver = new SimpleMappingExceptionResolver();
    Properties mapping = new Properties();
    mapping.put("java.lang.ArithmeticException", "mathError"); // exception name, view name
    mapping.put("java.lang.NullPointerException", "nullError"); // exception name, view name
    resolver.setExceptionMappings(mapping);
    return resolver;
  }
}
```

#### Custom HandlerExceptionResolver

- This option looks even more customizable.
  - Unfortunately, I couldn't get it to work. Probably because of how terrible this teacher is.
- This is similar to the SimpleMappingExceptionResolver, except you can assign more values.
  - It's like a combination of @ControllerAdvice and SimpleMappingExceptionResolver.

```java
public class MyHandlerExceptionResolver implements HandlerExceptionResolver {
  @Override
  public ModelAndView resolveException(HttpServletRequest req,
                                       HttpServletResponse res,
                                       @Nullable Object o,
                                       Exception e) {
    ModelAndView mv = new ModelAndView();
    if(e instanceof ArithmeticException) {
      mv.setViewName("mathError");
    }
    if(e instanceof NullPointerException) {
      mv.setViewName("nullError");
    }
    mv.addObject("exception", e.toString());
    return mv;
  }
}
```

## WebSocket and STOMP

### WebSocket

- WebSocket is a transfer protocol used for transfering messages, in real-time, between a client and a server.
  - Requires configuration on both client- and server-side.
- WebSocket contains no routing information, so it requires help from something else to properly route messages.
  - In Spring Boot, this "something else" is STOMP.

#### WebSocket Components

- A WebSocket implementation is made up of the following components.
  - WebSocketConfig
    - Used to create and configure the WebSocket, and to add message broker information.
  - Message
    - The data passed from the UI.
  - MessageWrapper
    - Adds some context to the Message before pushing the Message back to the UI.
  - MessageController
    - Receives the Message from the UI, processes it, and adds it to the Message Broker.
  - BrowserClient
    - The UI, where inputs exist for creating Messages, reading Messages, etc.

### STOMP

- Simple Text Oriented Message Protocol
- STOMP handles message routing between users.
- It defines a number of frames that WebSockets can use to complete its actions.

#### Common STOMP Commands

- ABORT
- ACK
- BEGIN
- COMMIT
- CONNECT
- DISCONNECT
- NACK
- SEND
- SUBSCRIBE
- UNSUBSCRIBE

## Packaging a Spring Boot Application
