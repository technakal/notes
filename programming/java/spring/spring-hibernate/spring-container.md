# Spring Container

- [Spring Container](#spring-container)
  - [Spring's Primary Functions](#springs-primary-functions)
    - [Inversion of Control](#inversion-of-control)
      - [What is Inversion of Control?](#what-is-inversion-of-control)
      - [An Example](#an-example)
  - [Dependency Injection](#dependency-injection)
    - [What is Dependency Injection](#what-is-dependency-injection)
      - [Car Example](#car-example)
    - [Most Common Types of Injections](#most-common-types-of-injections)
    - [Basic Process](#basic-process)
    - [Dependency Injection Example](#dependency-injection-example)
    - [Setter Injection](#setter-injection)
      - [Setter Injection Example](#setter-injection-example)
    - [Injecting Literal Values](#injecting-literal-values)
      - [Literal Value Injection Example](#literal-value-injection-example)
    - [Injecting Values from a Property File](#injecting-values-from-a-property-file)
      - [Injecting from a File Process](#injecting-from-a-file-process)
      - [Injecting from File Example](#injecting-from-file-example)
  - [More About Beans](#more-about-beans)
    - [Bean Scope](#bean-scope)
    - [Types of Bean Scopes](#types-of-bean-scopes)
    - [Declaring Scope](#declaring-scope)
      - [Testing Scope Type](#testing-scope-type)
    - [Bean Lifecycle](#bean-lifecycle)
      - [Custom Methods](#custom-methods)
        - [Additional Info on Init Methods and Destroy Methods](#additional-info-on-init-methods-and-destroy-methods)

## Spring's Primary Functions

- The primary functions of a Spring Container are:
  - Create and manage objects (IoC).
  - Inject object dependencies (Dependency Injection).

### Inversion of Control

#### What is Inversion of Control?

- The buzz phrase in relation to Spring is "inversion of control" (IoC).
- IoC is the outsourcing or externalizing of the construction and management of objects.
  - It basically means your application is outsourcing the creation and management of its objects to an Object Factory, provided by Spring.
  - So, rather than create each object manually, you just use them and Spring creates them in the background.

#### An Example

- In the standard way of writing code, we create and manage our own objects, which results in hardcoded, unconfigurable values.
  - Here, we have a coach giving us a daily workout.
  - But, this coach will always be a TrackCoach because we insantiated it as a TrackCoach.
  - Even though we have a BaseballCoach class as well, we can't use that here without instantiating a new coach object, or changing the existing instantiation.

```java
class MyApp {
  public static void main(String[] args) {
    // create the object
    Coach coach = new TrackCoach();
    // use the object
    System.out.println(coach.getDailyWorkout());
  }
}
```

- If we refactor this to use the Spring IoC method, it gets pretty interesting.
  - First, we create our application context in an XML file.
    - We named it "applicationContext.xml" because we're creative.
    - We define our beans and link them to their classes.
    - There are other methods, but this example uses XML.
  - Then, in our program, we initialize our context.
  - We retrieve our beans.
  - We use those beans.
  - We close our context.
- With this new implementation option, we can now configure `theCoach` via the configuration XML, rather than hard-coding its values in the app.

```xml
<beans>
  <bean id="myCoach"
          class="com.technakal.springdemo.TrackCoach"
  ></bean>
</beans>
```

```java
class MyApp {
  public static void main(String[] args) {
    // initialize our context
    ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

    // retrieve our beans
    Coach theCoach = context.getBean("myCoach", Coach.class);

    // use the methods of the bean
    System.out.println(theCoach.getDailyWorkout());

    // close the context when we're done
    context.close();
  }
}
```

- You'll notice when we use `context.getBean`, we specify the interface name (Coach), rather than just the id of our bean.
  - We can do either way, but by explicitly identifying the interface, we introduce some type safety into our Spring application.
  - With the interface name specified, Spring can then throw a `BeanNotOfRequiredTypeException` if the bean doesn't match the type we specify.

## Dependency Injection

### What is Dependency Injection

- Dependency injection is Spring's way of managing objects for you.
- The Spring Object Factory handles all of the dependencies related to the objects you use, so you just have to use the objects.

#### Car Example

- Think of a car.
- A car has a lot of dependencies.
- Engine, wheels, lights, etc.
- You want the car, but you don't want to manage "installing" these dependencies.
- The factory that builds the car handles these dependencies for you.
- So, all you have to do is get and use the car. Someone else manages installing the engine.

### Most Common Types of Injections

- Constructor injection
- Setter injection

### Basic Process

- Define the dependency interface and classes.
- Create a constructor in the classes for injection.
- Configure the dependency injection in the Spring configuration.
  - This is just another bean configuration, like we did with the IoC example.
  - We also need to add configuration details for whichever other beans rely on the injection helper class.

### Dependency Injection Example

- Coaches now also give fortune advice.
- We create a `FortuneService` interface.
- We implement it in `HappyFortuneService`.
- We add a method to our `Coach` interface for returning this fortune.
- In each implementation of `Coach`, we add a field for the `FortuneService`, create a constructor that accepts the `FortuneService` as an argument, and implement the `getFortune()` method.
  - For good backwards compatibility, we also implement a no-arg constructor on each Coach so that the FortuneService becomes optional to the class.
- `FortuneService` is a dependency of each Coach, now, so we can configure our `applicationContext` to inject this in the constructor!

- `FortuneService`

```java
public interface FortuneService {
  public String getFortune();
}
```

- `HappyFortuneService`

```java
public class HappyFortuneService implements FortuneService {

  @Override
  public String getFortune() {
    return "Today is your lucky day!";
  }

}

```

- `Coach`

```java
public interface Coach {

  public String getDailyWorkout();

  public String getDailyFortune(); // new method from FortuneService

}
```

- `BaseballCoach` example
  - This is repeated in each implementation of `Coach`.

```java
public class BaseballCoach implements Coach {

  private FortuneService fortuneService; // new field for FortuneService

  // no-arg constructor
  public BaseballCoach() {}

  // constructor implements fortuneService in BaseballCoach
  public BaseballCoach(FortuneService fortuneService) {
    this.fortuneService = fortuneService;
  }

  @Override
  public String getDailyWorkout() {
	return "Spend 30 minutes on batting practice.";
  }

  // and here's our new method override
  @Override
  public String getDailyFortune() {
    return this.fortuneService.getFortune();
  }

}
```

### Setter Injection

- Another use for injection is setter injection.
- In this case, we create a configuration tag in our bean for `<property>`.
- Spring uses this tag and looks for any setter that references the `name` attribute.
- Then, it injects the corresponding `bean`.

#### Setter Injection Example

- Here, we're injecting a `FortuneService` into the setter for `CricketCoach`.
- We define the `CricketCoach` as a no-arg constructor with a `fortuneService` field.
- The `CricketCoach` also has the `setFortuneService()` method, which is our setter.
- In the XML config, we add and configure the <property> on `CricketCoach` to point to the FortuneService.
- Let's take a look.

- `CricketCoach`

```java
public class CricketCoach implements Coach {

  private FortuneService fortuneService;

  public CricketCoach() {
    System.out.println("CricketCoach: inside no-arg constructor.");
  }

  // setter name = "set" + property name
  public void setFortuneService(FortuneService fortuneService) {
    System.out.println("Setting FortuneService");
    this.fortuneService = fortuneService;
  }

  @Override
  public String getDailyWorkout() {
    return "Practice fast bowling for 15 minutes.";
  }

  @Override
  public String getDailyFortune() {
    return this.fortuneService.getFortune();
  }

}
```

- `applicationContext.xml`

```xml
<bean id="myCricketCoach"
      class="com.technakal.springdemo.CricketCoach">
  <!-- name attribute equals setter minus "set"
      this will call setFortuneService -->
  <property name="fortuneService" ref="myFortune"/>
</bean>
```

### Injecting Literal Values

- Spring can also inject literal values, rather than just other class references/dependencies.
- This is done just like other setter or constructor injections, but instead of using a `ref` attribute, we use a `value` attribute.

#### Literal Value Injection Example

- Here, we're injecting an `emailAddress` and `teamName` into our `CricketCoach`.

  - Create the fields.
  - Create the setters.
  - Configure the xml.

- `CricketCoach`

```java
public class CricketCoach implements Coach {

  // ...

  private String emailAddress;
  private String teamName;

  public String getEmailAddress() {
    return emailAddress;
  }

  public void setEmailAddress(String emailAddress) {
    System.out.println("CricketCoach: setting emailAddress.");
    this.emailAddress = emailAddress;
  }

  public String getTeamName() {
    return teamName;
  }

  public void setTeamName(String teamName) {
    System.out.println("CricketCoach: setting teamName.");
    this.teamName = teamName;
  }

  // ...
}
```

- `applicationContext`

```xml
<bean>
  <!-- injection via reference uses `ref` attribute -->
  <property name="fortuneService" ref="myFortuneService" />
  <!-- injection of literal values uses `value` attribute -->
  <property name="emailAddress" value="thebestcoach@technakal.com" />
  <property name="teamName" value="Sunrisers Hyderabad" />
</bean>
```

### Injecting Values from a Property File

- Injecting literal values becomes much more useful if those values aren't hard-coded into our config file.
- Good news! We can inject from a property file.

#### Injecting from a File Process

- Create the file and load it with values.
- Load those values from the file into the config file.
- Retrieve the values from the config file.

#### Injecting from File Example

- So, if we're replacing our earlier examples for email and team with file values, we do three things:

  - Create a .properties file to hold our properties we want to inject.
    - This is a regular text file with key-value pairs. We reference them later by the key.
  - Add a <context:property-placeholder/> tag near the top of our config file.
    - This includes the classpath to get to the file.
    - I'll include the full file so it's easy to see where it is.
  - Update the `bean` referencing email and team to instead reference the key in the properties file.
    - This uses `${}` syntax.

- `sport.properties`

```
foo.email=mybestcoach@technakal.com
foo.team=Royal Challengers Bangalore
```

- `applicationContext`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd">

    <!-- load the properties file -->
    <!-- here's the property file loader -->
    <context:property-placeholder location="classpath:sport.properties" />

    <!-- Define your beans here -->
    <bean id="myLoggerConfig" class="com.technakal.springdemo.LoggerConfig" init-method="initLogger">
      <property name="rootLoggerLevel" value="FINE" />
      <property name="printedLoggerLevel" value="FINE"/>
    </bean>
    <bean id="myFortune"
          class="com.technakal.springdemo.HappyFortuneService"
    ></bean>
    <bean id="myCoach"
          class="com.technakal.springdemo.TrackCoach">
      <constructor-arg ref="myFortune" />
    </bean>
    <bean id="myCricketCoach"
          class="com.technakal.springdemo.CricketCoach">
          <property name="fortuneService" ref="myFortune"/>
          <!-- here, we've updated to reference the property key -->
          <property name="emailAddress" value="${foo.email}" />
          <property name="teamName" value="${foo.team}" />
    </bean>
</beans>
```

## More About Beans

### Bean Scope

- Scopes refer to the lifecycle of a bean.
  - How long does it live?
  - How many instances of it are there?
  - How is it shared?
- Default scope for a bean is "singleton".
  - All of the examples in [spring-container.md](./spring-container.md) are singleton because we don't explicitly identify their scope.

### Types of Bean Scopes

| Scope          | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| singleton      | Create a single shared instance of the bean. Default scope.  |
| prototype      | Creates a new bean instance for each container request.      |
| request        | Scoped to an HTTP web request. Only used for web apps.       |
| session        | Scoped to an HTTP web session. Only used for web apps.       |
| global-session | Scoped to a global HTTP web session. Only used for web apps. |

- A singleton is any bean where the Spring container creates only one instance of that bean.
  - A singleton is cached in memory.
  - All requests to that bean share the same instance.
  - Best use case for singletons are for stateless beans.
- A prototype scope creates a new instance for each reference to a bean.

### Declaring Scope

- You can explicitly express bean scope using the `scope` attribute on your `<bean>` declaration.

```xml
<bean id="myCoach"
      class="com.technakal.springdemo.TrackCoach"
      scope="prototype"
>
<!-- bean content... -->
</bean>
```

#### Testing Scope Type

- You can see the difference between singleton and prototype with a simple sysout statement.

```java
// if scope is singleton
Coach theCoach = context.getBean("myCoach", Coach.class);
Coach alphaCoach = context.getBean("myCoach", Coach.class);

boolean result = theCoach == alphaCoach;
System.out.println("Point to the same location: " + result); // true
System.out.println(theCoach); // com.technakal.springdemo.TrackCoach@647e447
System.out.println(alphaCoach); // com.technakal.springdemo.TrackCoach@647e447

// if scope is prototype
Coach theCoach = context.getBean("myCoach", Coach.class);
Coach alphaCoach = context.getBean("myCoach", Coach.class);

boolean result = theCoach == alphaCoach;
System.out.println("Point to the same location: " + result); // false
System.out.println(theCoach); // com.technakal.springdemo.TrackCoach@3c407114
System.out.println(alphaCoach); // com.technakal.springdemo.TrackCoach@35ef1869
```

### Bean Lifecycle

- Here's what the bean lifecycle looks like:
  - Container started.
  - Bean instantiated.
  - Dependencies injected.
  - Internal Spring processing.
  - Custom init method.
  - Bean is ready for use.
  - Container shuts down.
  - Custom destroy method.
  - Done.

#### Custom Methods

- Spring allows you to use "hooks".
- Hooks are custom code that can run during bean initialization or bean destruction.
  - Think of it like React's own lifecycle hooks, such as `componentDidMount()`.
- To use custom methods, you add the method as an attribute to the bean.
  - `init-method` runs at bean initialization.
  - `destroy-method` runs at bean destruction.
- In the following example:
  - `doStartupStuff()` will run when the bean is initialized.
  - `doCleanupStuff()` will run when the bean is destroyed.

```xml
<bean id="myCoach"
      class="com.technakal.springdemo.TrackCoach"
      init-method="doStartupStuff"
      destroy-method="doCleanupStuff"
>
<!-- bean content... -->
</bean>
```

##### Additional Info on Init Methods and Destroy Methods

- The method can have any access modifier (public, protected, private).
- The method can have any return type.
  - If you give a return type just note that you will not be able to capture the return value.
  - `void` is most commonly used.
- The method can have any method name.
- The method can not accept any arguments.
  - The method should be no-arg.
- Spring does not manage the destruction of `prototype` scoped beans.
  - It is up to the client to manage these resources.
  - As a result, only the `init-method` code executes on `prototype` scoped beans.
