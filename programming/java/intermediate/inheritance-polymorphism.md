# Java Inheritance and Polymorphism

- [Java Inheritance and Polymorphism](#java-inheritance-and-polymorphism)
<<<<<<< HEAD
  - [Overview](#overview)
  - [Usage](#usage)

## Overview

## Usage
=======
  - [Inheritance](#inheritance)
    - [Overview](#overview)
    - [Usage](#usage)
      - [Inheritance and Access Modifiers](#inheritance-and-access-modifiers)
  - [Polymorphism](#polymorphism)
    - [Overview](#overview-1)
    - [Usage](#usage-1)
      - [Method Overriding](#method-overriding)
      - [Arrays](#arrays)

## Inheritance

### Overview

- Inheritance in Java means that one class can inherit methods and properties from another class.
- It's like Triangle being a subclass of Shape. Square can also be a subclass of Shape. Both Square and Triangle inherit from Shape.
  - Parent class, superclass, and base class refer to the class that another class inherits from (like Shape).
  - Child class, subclass, and derived class refer to a class that inherits from another class (like Triangle).

### Usage

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

#### Inheritance and Access Modifiers

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

## Polymorphism

### Overview

Polymorphism allows a child class to share the information and behavior of its parent class while also incorporating its own functionality.

- The reverse situation is not true; you cannot use a generic parent class instance where a child class instance is required.
  - So an Orange can be used as a Fruit, but a Fruit cannot be used as an Orange.
- The benefits of polymorphism
  - Simplifying syntax
  - Reducing cognitive overload for developers

### Usage

#### Method Overriding

- We can give a single method slightly different meanings for different classes.
- This is called method overriding.
- In order for this to work, the method in the subclass must have the following in common with the base class method it's overriding:
  - Method name
  - Return type
  - Number and type of parameters

```java
class Orange extends Fruit {
  constructor() {
    super();
    // ...
  }

  @Override
  public static void makeJuice() {
    System.out.println("Squeezing the orange.");
    System.out.println("You now have orange juice.");
  }
}
```

- You can use a subclass anywhere its base class is expected.
- You can even instantiate a subclass as the base class.
  - The compiler just considers orange to be a Fruit. But because method overriding is handled at runtime, when running the program will correctly pull the methods of `Orange`.
  - However, declaring a subclass as its parent type will result in compiler errors if your code uses a subclass-only method. If `Orange` has a `fightScurvy()` method that `Fruit` does not and you declare `Orange` as a `Fruit`, the compiler will error because `Fruit` doesn't know how to `fightScurvy()`.

```java
// base class is Fruit
// Subclass is Orange

Fruit orange = new Orange();
```

#### Arrays

- With polymorphism, an array can contain any mix of instantiated class objects, so long as they all share the same base class.
  - You can loop and do whatever else you'd do with an array.

```java
Fruit orange, apple, pear;
orange = new Orange();
apple = new Apple();
pear = new Pear();

Fruit[] fruits = { orange, apple, pear }; // totes valid
```
>>>>>>> 2824b65a18e2fe47941fa5280fb7de2d792e1ef3
