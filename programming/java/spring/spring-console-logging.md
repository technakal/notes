# Spring Console Logging

- [Spring Console Logging](#spring-console-logging)
  - [Overview](#overview)
  - [Setting Up Logging](#setting-up-logging)
    - [Development Process](#development-process)
      - [Create logger.properties File](#create-loggerproperties-file)
      - [Create Logger Class](#create-logger-class)
      - [Link the Class to the Properties File](#link-the-class-to-the-properties-file)

## Overview

- By default, Spring doesn't log much to the console.
- You can set up console logging pretty easily through the creation of a logger.

## Setting Up Logging

### Development Process

- Create `logger.properties` file.
- Create logger class.
- Link the class to the properties file.

#### Create logger.properties File

- This file sets the logging levels that the system will output.
  - You can use FINEST if you want more detail in your logs.

```
root.logger.level=FINE
printed.logger.level=FINE
```

- Add this to the src folder.

#### Create Logger Class

- The logger class is a configuration class that makes use of your properties file.
- It basically intercepts each level of logging and prints it to the screen.

```java
@Configuration
@PropertySource("classpath:logger.properties")
public class LoggerConfig {

  @Value("${root.logger.level}")
  private String rootLoggerLevel;

  @Value("${printed.logger.level}")
  private String printedLoggerLevel;

  @PostConstruct
  public void initLogger() {

      // parse levels
      Level rootLevel = Level.parse(rootLoggerLevel);
      Level printedLevel = Level.parse(printedLoggerLevel);

      // get logger for app context
      Logger applicationContextLogger = Logger.getLogger(AnnotationConfigApplicationContext.class.getName());

      // get parent logger
      Logger loggerParent = applicationContextLogger.getParent();

      // set root logging level
      loggerParent.setLevel(rootLevel);

      // set up console handler
      ConsoleHandler consoleHandler = new ConsoleHandler();
      consoleHandler.setLevel(printedLevel);
      consoleHandler.setFormatter(new SimpleFormatter());

      // add handler to the logger
      loggerParent.addHandler(consoleHandler);

  }

}
```

#### Link the Class to the Properties File

- Use the `@PropertySource` annotation.

```java
@PropertySource("classpath:logger.properties")
```
