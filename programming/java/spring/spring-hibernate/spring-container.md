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
