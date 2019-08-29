# Java Inheritance and Polymorphism

- [Java Inheritance and Polymorphism](#java-inheritance-and-polymorphism)
  - [Overview](#overview)
  - [Usage](#usage)
    - [Inheritance and Access Modifiers](#inheritance-and-access-modifiers)

## Overview

- Inheritance in Java means that one class can inherit methods and properties from another class.
- It's like Triangle being a subclass of Shape. Square can also be a subclass of Shape. Both Square and Triangle inherit from Shape.
  - Parent class, superclass, and base class refer to the class that another class inherits from (like Shape).
  - Child class, subclass, and derived class refer to a class that inherits from another class (like Triangle).

## Usage

- We define a subclass using the `extends` keyword.

```java
public class ChildClass extends ParentClass {
  // code stuffs
}
```

- Subclasses can access a base class' constructor using the `super()` method.
  - Think of method as the base class constructor. You'll pass in any of the same parameters the base class expects.

```java
class Son extends Father {
  Son() {
    super(height, weight, eyeColor);
    // son-specific stuff.
  }
}
```

### Inheritance and Access Modifiers

- Children can only access parent properties and methods that use the `public` or `protected` modifiers.

```java
class Shape {
  protected int numSides; // accessbile by children
  private int shapeSecret; // not accessible by children
}
```

- Additionally, if we want to guarantee that the subclass can't modify a method of its base class, we can use the `final` access modifier on that method.
  - This is helpful in limiting bugs that might occur from modifying a particular method.

```java
class Shape {
  // can't be changed by children
  final public void isCool() {
    return true; // because shapes are pretty cool
  }
}
```
