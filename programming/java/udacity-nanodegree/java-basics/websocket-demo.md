# Spring Boot WebSocket Demo

## Overview

- This demo project creates a simple message system using WebSocket and STOMP.
- The message system just sends a simple message containing the username of the sender.
- This document details the steps to create the message system.

## Getting Set Up

- Download the Spring Boot starter kit, with the following dependencies:
  - DevTools
  - Thymeleaf
  - Web
  - WebSocket
- Import and initialize project.

### Creating Models

- This program has two models.
  - User model
    - Only property is the user's name.
    - This model corresponds to the WebSocket Message.
  - UserResponse
    - Only property is the content of the message to send--the wrapper around the User name in this case.
    - This model corresponds to the WebSocket Message Wrapper.

#### Steps

- Create the model directory.
- Add the `User` class.
- Add the `UserResponse` class.

```java
// User class
package com.technakal.springbootwebsocketdemo.model;

public class User {
  private String name;

  public User() {}

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}

// UserResponse class
public class UserResponse {
  private String content;

  public UserResponse(String content) {
    this.content = content;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
```

### Creating Controllers

- We'll also need a controller for handling the Message distribution.
- In the controller directory, we create a Controller class.
  - The controller uses the @MessageMapping to define the message endpoint.
  - The controller uses the @SendTo annotation to define the message broker.
  - The controller has a return method that sends the Message Wrapper and Message (UserResponse and User) to the broker.

```java
import com.technakal.springbootwebsocketdemo.model.User;
import com.technakal.springbootwebsocketdemo.model.UserResponse;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class UserController {
  @MessageMapping("/user") // message endpoint
  @SendTo("/topic/user") // broker
  public UserResponse getUser(User user) {
    return new UserResponse("Hello," + user.getName());
  }
}
```

## Configuring WebSocket

- Add a config directory and build everything in this section there.

### Configuring Message Broker

- To enable messaging in WebSocket and STOMP, we also need to create messaging configuration.
  - Implement a class called `WebSocketConfig`.
  - Make the class extend `AbstractWebSocketMessageBrokerConfigurer`, which is deprecated, or implement `WebSocketMessageBrokerConfigurer`.
  - Within this class, we override `configureMessageBroker` and `registerStompEndpoints`

```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config.enableSimpleBroker("/topic");
    config.setApplicationDestinationPrefixes("/app");
  }
  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/websocket-demo").withSockJS();
  }
}
```

### Configuring Scheduler

- The scheduler allows for adhoc messages sent on a schedule.
- It's created with the `@Configuration` and `@EnableScheduler` annotations.
- Within the class, `@Autowired` our `SimpMessagingTemplate`.
- We also define our messaging method, which pushes the messages to the user on the schedule defined in the `@Scheduled` annotation.
  - In this case, we have a delay of 5000, and we send our message to /topic/user, from the user "Sheduler".

```java
@EnableScheduling
@Configuration
public class SchedulerConfig {
  @Autowired
  SimpMessagingTemplate template;

  @Scheduled(fixedDelay = 5000)
  public void sendAdhocMessage() {
    template.convertAndSend("/topic/user",
        new UserResponse("Scheduler"));
  }
}
```

## Creating our UI
