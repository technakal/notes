# Spring Configuration via Java Code with No XML

- [Spring Configuration via Java Code with No XML](#spring-configuration-via-java-code-with-no-xml)
  - [Overview](#overview)
  - [Development Process](#development-process)
    - [Create Config Class](#create-config-class)
    - [Set Up Component Scanning (Optional)](#set-up-component-scanning-optional)
    - [Read Configuration Class](#read-configuration-class)
    - [Example Code](#example-code)
  - [Defining Beans](#defining-beans)
    - [Development Process](#development-process-1)
      - [Define Method to Expose Bean](#define-method-to-expose-bean)
      - [Inject Dependencies](#inject-dependencies)
      - [Inject Properties from a File](#inject-properties-from-a-file)
        - [Development Process](#development-process-2)
      - [Note About Earlier Versions of Spring](#note-about-earlier-versions-of-spring)

## Overview

- You can also configure Spring applications using Java source code, without annotations or XML configuration.
  - This is done using annotations. It's just, in this case, there is no backing XML that's telling Spring to scan for annotations.

## Development Process

- Create config class
- Set up component scanning (optional)
- Read configuration class as context
- Retrieve beans

### Create Config Class

- The first step is to create a configuration class.
  - This is different from a normal class, as it's used for configuring your Spring beans, rather than performing some application function.

```java
@Configuration
public class SportConfig {
  // code
}
```

### Set Up Component Scanning (Optional)

- We can manually add beans to our Spring container, or we can use the Component Scanning option.
- In this case, we use `@Component` on our classes to make them discoverable.
- On our configuration file, we then turn on `@ComponentScanning` and pass in the package to scan.

```java
@Configuration
@ComponentScan("com.technakal.scandemo")
public class SportConfig {
  // do stuff
}
```

- In this case, `SportConfig` will now scan the com.technakal.scandemo package for anything flagged as a `@Component`.
  - So, below, example 1 would be discoverable, but 2 would not.

```java
// example 1
@Component
public class TennisCoach {}

// example 2
public class InvisibleCoach {}
```

### Read Configuration Class

- Finally, we create a context out of our configuration class so that we can use its beans.
  - This is similar to how we read a configuration file.
- We make use of the `AnnotationConfigApplicationContext` class.
  - Reference the `Config.class` you're looking for.

```java
// create context
AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SportConfig.class);
```

### Example Code

- Config class

```java
@Configuration
@ComponentScan("com.technakal.springdemo")
public class SportConfig {}
```

- Application class

```java
public class JavaConfigDemoApp {

  public static void main(String[] args) {

    // initiate context
    // this is the only difference between other config styles and Java code-based style
    AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SportConfig.class);

    // retrieve your beans
    Coach eSportCoach = context.getBean("gameCoach", Coach.class);

    // use bean methods
    System.out.println("eSport Coach says: " + eSportCoach.getDailyWorkout());
    System.out.println("eSport Coach says: " + eSportCoach.getDailyFortune());

    // close context
    context.close();

  }

}
```

## Defining Beans

- You can also define beans with no annotations, and add them to your app, manually.

### Development Process

- Define method to expose beans.
- Inject dependencies.
- Create config context.
- Retrieve the beans from the context.

#### Define Method to Expose Bean

- Within our Config class, we create a method to return the bean.
- We annotate it using `@Bean`.
- The method name is the bean ID.

```java
@Configuration
public class SportConfig {

  @Bean
  public Coach swimCoach() {
    SwimCoach swimCoach = new SwimCoach();
    return swimCoach;
  }

}
```

- Repeat the process for each bean.

#### Inject Dependencies

- Dependency injection is a bit different here.
- Instead of using annotations, we just declare our dependencies as `@Bean` methods within our Config class.
- Then, we add them as paramters to our other beans--whichever ones depend on them.

```java
@Configuration
public class SportConfig {

  @Bean
  public FortuneService happyFortuneService() {
    return new HappyFortuneService();
  }

  @Bean
  public Coach swimCoach() {
    return new SwimCoach( happyFortuneService() );
  }
}
```

#### Inject Properties from a File

- You can inject properties from a file as well.
- We just use the `@PropertySource` annotation and reference the properties file.
- Then, to use the properties, we use the `@Value` annotation.

##### Development Process

- Create `.properties` file.
- Load properties file into Spring config.
- Reference properties from the file.

- `.properties` file

```txt
foo.email=emailaddress@gmail.com
foo.team=Team Name
```

- Configuration class

```java
@Configuration
@PropertySource("classpath:fileName.properties")
public class SportConfig {
  /// etc
}
```

- Using values example

```java
public class SwimCoach implements Coach {

  @Value("${foo.email}")
  private String email;

  @Value("${foo.team}")
  private String team;

  // etc.
}
```

#### Note About Earlier Versions of Spring

- In earlier versions of Spring (prior to 4.3), the value injection method requires one additional configuration to work.
- In your config file, you have to create a property source configurer bean.

```java
@Bean
public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceHolderConfigurer() {
  return new PropertySourcesPlaceholderConfigurer();
}
```
