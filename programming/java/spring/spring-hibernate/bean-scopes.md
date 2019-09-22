# Spring Bean Scopes

- [Spring Bean Scopes](#spring-bean-scopes)
  - [What are Scopes?](#what-are-scopes)
    - [Types of Bean Scopes](#types-of-bean-scopes)
      - [Testing Scope Type](#testing-scope-type)
    - [Declaring Scope](#declaring-scope)

## What are Scopes?

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
