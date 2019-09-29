# Spring Core

- [Spring Core](#spring-core)
  - [Configuration](#configuration)
  - [Spring Development Process](#spring-development-process)
    - [Example](#example)
  - [Spring Bean](#spring-bean)
    - [FAQ: What is a Spring Bean?](#faq-what-is-a-spring-bean)
  - [Spring Container](#spring-container)
    - [Specialized Implementations](#specialized-implementations)

## Configuration

- There are three methods of configuring a Spring container:
  - XML (legacy)
    - Most legacy applications still use this method.
  - Annotations (modern)
  - Java Source Code (modern)

## Spring Development Process

- The basic development process for a Spring app involves three steps:
  - Configuring Spring Beans.
  - Configuring Spring container.
  - Retrieving Spring Beans from the container.

### Example

- Configure Spring Beans (XML example)
- Created in a file named applicationContext.xml
  - File name can be anything you want, just make sure it's consistent throughout the application.
  - In this case, the bean we're creating has a name of `myCoach`, and corresponds to the `BaseballCoach` class.

```xml
<beans ...>
  <bean id="myCoach"
        class="com.technakal.springdemo.BaseballCoach"
  ></bean>
</beans>
```

- Configure Spring container (context).
  - Since we're using XML, we'll use the `ClassPathXmlApplicationContext`.

```java
ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml"); // name of config file
```

- Retrieve the beans from the container.
  - In this case, after we create our context, we reference it when we need to create a class.
  - We use the `getBean` option to retrieve the specified bean.
  - We'll specify the bean `id` to implement.

```java
// implement context from step 2
ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

// implement coach bean
Coach theCoach = context.getBean("myCoach", Coach.class);
```

## Spring Bean

### FAQ: What is a Spring Bean?

- A "Spring Bean" is simply a Java object.
- When Java objects are created by the Spring Container, then Spring refers to them as "Spring Beans".
- Spring Beans are created from normal Java classes .... just like Java objects.
- When you see the term "Spring Bean", you can just think "Java object."

## Spring Container

- This is officially known as an `ApplicationContext`.

### Specialized Implementations

- ClassPathXmlApplicationContext
- AnnotationConfigApplicationContext
- GenericWebApplicationContext
- Others...
