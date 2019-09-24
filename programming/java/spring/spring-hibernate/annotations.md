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
      - [Constructor Injection Development Process](#constructor-injection-development-process)

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

#### Constructor Injection Development Process

- Define dependency interface and class.
- Create a constructor in another class that needs an injection.
- Configure the dependency injection via the `@Autowired` annotation.
