# Spring Annotations

- [Spring Annotations](#spring-annotations)
  - [Java Annotations](#java-annotations)
    - [A Familiar Example](#a-familiar-example)
  - [Spring Annotations](#spring-annotations-1)
    - [Why Use Annotatios in Spring?](#why-use-annotatios-in-spring)
    - [Bean Configuration Annotations](#bean-configuration-annotations)
      - [How Does it Work?](#how-does-it-work)
      - [Development Process](#development-process)
      - [Annotation Example](#annotation-example)
      - [Using Default Bean ID](#using-default-bean-id)
    - [Dependency Injection Annotations](#dependency-injection-annotations)
      - [Autowiring](#autowiring)
      - [Constructor Injection](#constructor-injection)
        - [Development Process](#development-process-1)
      - [Setter Injection](#setter-injection)
        - [Development Process](#development-process-2)
      - [Method Injection](#method-injection)
      - [Field Injection](#field-injection)
    - [Qualifiers](#qualifiers)
    - [Injecting Values from File](#injecting-values-from-file)

## Java Annotations

- Java annotations are special labels/markers that are added to Java classes.
- They provide meta-data about the class.
- Annotations trigger special processing rules.
  - Some annotations are processed at compile time.
  - Others are processed at run-time.

### A Familiar Example

- A common example of Java annotations is the `@Override` annotation.
- `@Override` tells the compiler that you're implementing an interface and overriding the method from that interface, as you should.
- This annotation triggers the compiler to check and verify that you are overriding the method correctly.

## Spring Annotations

### Why Use Annotatios in Spring?

- XML configuration is verbose and lengthy.
  - Annotations minimize the XMl configurations needed.
- Annotations allow you to configure your Spring beans directly.

### Bean Configuration Annotations

#### How Does it Work?

- Spring scans your Java classes for annotations.
- When found, Spring automatically registers the beans in the Spring container, based on the annotations.

#### Development Process

- Enable component scanning in Spring config.
  - This involves replacing the `<bean>` data in your XML with the `<context:component-scan>` tag.
- Add the `@Component` annotation to your Java classes.
  - You can specify the bean ID like this: `@Component("beanId")`
- Retrieve beans from the Spring container.
  - This is the same coding as how you'd do it with the XML configuration.

#### Annotation Example

- Enable component scanning in `applicationContext.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd">

  <!-- entry to enable component scanning -->
  <context:component-scan base-package="com.technakal.springdemo" />

</beans>
```

- We create a Coach interface like we did before.
- We implement that Coach through a class.
- `TennisCoach.java`

```java
@Component("thatSillyCoach") // bean id
public class TennisCoach implements Coach {

  @Override
  public String getDailyWorkout() {
    return "Practice your backhand volley.";
  }

}
```

- The rest is just like usual. We register our context, retrieve our bean(s), use our beans, and close our context.

```java
public static void main(String[] args) {

// initiate context
ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

// retrieve your beans
Coach theCoach = context.getBean("thatSillyCoach", Coach.class); // there we go, using the bean id.

// use bean methods
System.out.println(theCoach.getDailyWorkout());

// close context
context.close();

  }
```

#### Using Default Bean ID

- What if we don't want to use a unique bean ID?
- Spring can handle that.
- All you need to do is remove the `("beanId")` part of your `@Component` annotation.
  - In this case, Spring will generate a default bean ID, which is just the name of your class with the first letter lowercase.
    - TennisCoach becomes tennisCoach.
    - CoolClass becomes coolClass.
- Otherwise, everything works exactly the same. You just don't have to name your bean explicitly.

### Dependency Injection Annotations

#### Autowiring

- Spring can automatically auto-wire dependency injection for you, via annotations.
- Spring looks for a class that matches the specified property required.
  - It matches on type: class or interface.
- Once it finds a class that matches, Spring will automatically inject it.
- So, for example, let's say FortuneService is a dependency of TennisCoach.
  - Spring will scan all components for anyone who implements FortuneService.
  - If it finds someone, it will inject that class into the one that depends on it.
  - Note: If more than one candidate for injection exist (so, more than one implementation of FortuneService), Spring has a different way of autowiring that.
    - It's the `@Qualifier` annotation!
- Three types of injections;
  - Constructor
  - Setter
  - Field
  - Any of these options is fine. Just pick one and be consistent throughout the project.
- As of Spring 4.3, the `@Autowired` annotation is now optional in certain cases (where Spring can easily predict what class the dependency is).
  - Still, it's good practice (for readability) to make the wiring explicit with the annotation.
  - [More info](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-autowired-annotation)

#### Constructor Injection

##### Development Process

- Define dependency interface and class.
  - Make sure your classes are identified as `@Component`s so that Spring's component scanning picks them up.
- Create a constructor in another class that needs an injection.
  - On the constructor that needs to be wired up, just add the `@Autowired` annotation.
  - With this annotation, Spring will now scan for a `@Component` that meets the injection requirement.
    - Good thing we made our dependency class a `@Component`, right?
- Configure the dependency injection via the `@Autowired` annotation.

- `HappyFortuneService` (implements FortuneService)

```java
@Component // This sets up HappyFortuneService to be a wire-able dependency.
public class HappyFortuneService implements FortuneService {

  @Override
  public String getFortune() {
    return "That's one lucky duck!";
  }

}
```

- `TennisCoach` (depends on `FortuneService`)

```java
@Component
public class TennisCoach implements Coach {

  FortuneService fortuneService;

  @Autowired // tells Spring to scan for the dependency.
  // In this case, it's scanning for anything that implements FortuneService.
  public TennisCoach(FortuneService fortuneService) {
    this.fortuneService = fortuneService;
  }

  @Override
  public String getDailyWorkout() {
    return "Practice your backhand volley.";
  }

  @Override
  public String getDailyFortune() {
    return fortuneService.getFortune();
  }

}
```

#### Setter Injection

- Setter injection can also make use of annotations.

##### Development Process

- Create setter methods in class(es).
- Configure dependency injection via the `@Autowired` annotation.

```java
@Component
public class TennisCoach implements Coach {

  FortuneService fortuneService;

  public TennisCoach() {}

  @Autowired // this injects into your setter.
  public void setFortuneService(FortuneService fortuneService) {
    this.fortuneService = fortuneService;
  }

  @Override
  public String getDailyWorkout() {
    return "Practice your backhand volley.";
  }

  @Override
  public String getDailyFortune() {
    return fortuneService.getFortune();
  }

}
```

#### Method Injection

- You can use dependency injection on any method, as well.
- Just add `@Autowired`.

#### Field Injection

- Yes, fields too!
- With field injection, you can skip setter methods and place the annotation directly on the field you want to inject.
  - When Spring creates the object, it will set the field directly using Java Reflection.

```java
@Component
public class TennisCoach implements Coach {

  @Autowired
  private FortuneService fortuneService;

  public TennisCoach() {}

  @Override
  public String getDailyWorkout() {
    return "Practice your backhand volley.";
  }

  @Override
  public String getDailyFortune() {
    return fortuneService.getFortune();
  }

}
```

### Qualifiers

- When you have more than one option for injection, you can tell Spring which one to use with qualifiers.
  - If you don't specify one, the compiler will throw an error related to the bean that needs the injection.
  - `NoUniqueBeanDefinitionException`. Ruh-roh!
- Luckily, it's pretty easy to do this.
- Just use the `@Qualifier("beanId")` annotation!
  - This works fine for Constructor, Setter, and Field injection.

```java
@Autowired
@Qualifier("happyFortuneService")
public void setFortuneService(FortuneService fortuneService) {
  this.fortuneService = fortuneService;
}
```

- When using qualifiers on Constructors, you have to use a different format.
  - Instead of the `@Qualifier` being prior to the Constructor, like `@Autowired` is, it goes inside the parameter parentheses.

```java
@Autowired
public void TennisCoach(@Qualifier("happyFortuneService") FortuneService fortuneService) {
  this.fortuneService = fortuneService;
}
```

### Injecting Values from File

- You can also inject values from a properties file, just like we did with the XML.
- In this case, setup is all the same,
  - Add the properties file.
  - Link to it in your configuration XML.
  - Use the `@Value` annotation to call the property you want.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd">

  <!-- entry to enable component scanning -->
  <context:component-scan base-package="com.technakal.springdemo" />

  <!-- this part links to the config file -->
  <context:property-placeholder location="sports.properties" />

</beans>
```

```java
@Value("${foo.email}")
private String email;

@Value("${foo.age}")
private Integer age;
```
