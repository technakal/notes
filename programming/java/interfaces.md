# Java Interfaces

[What is an interface?](https://docs.oracle.com/javase/tutorial/java/concepts/interface.html) In its most common form, an interface is a group of related methods with empty bodies.

## Why Use an Interface?

- Java restricts multiple inheritance.
  - So, you can't have a subclass that inherits from two or more base classes.
- Interfaces provide a means of a class inheriting constants and methods from multiple sources.
- You can inherit from as many interfaces as you need.

## What Can an Interface Do?

- Witin an interface, you can declare a constant and declare an empty method.

```java
interface Flyable {
  int CONSTANT = 1;
  void fly();
}
```

## Using an Interface

- You can apply an interface to a class using the `implements` keyword.
- You also have to override any interface methods using the `@Override` declaration.

```java
class Bird extends Animal implements Flyable {
  @Override
  public void fly() {
    // Bird fly action
  }
}

class Bee extends Animal implements Flyable {
  @Override
  public void fly() {
    // Bee fly action
  }
}
```

- To implement multiple interfaces, separate each interface by a comma:

```java
class Bird extends Animal implements Flyable, Singable {
  @Override
  public void fly() {
    // Bird fly action
  }

  @Override
  public void sing() {
    // Bird sing action
  }
}
```
