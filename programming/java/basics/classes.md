# Java Classes

- [Java Classes](#java-classes)
  - [Overview](#overview)
  - [Fields](#fields)
  - [Main](#main)
  - [Constructor](#constructor)
  - [Importing Other Classes](#importing-other-classes)

## Overview

- Classes are defined with the `class` keyword.
- Classes include an access modifier.
- Every class has a `main()` method.

```java
public class Developer {
  // fields
  // constructor method
  // main method
  public static void main(String[] args) {
    // what the class does
  }
}
```

## Fields

- Classes track state using fields.
- Fields have access modifiers.
  - Public fields can be accessed by any class.
  - Private fields can only be accessed by an instance of this class.
- Fields require a data type.

```java
public class Cat {
  // fields
  public String name;
  public String breed;
  public int age;

  // constructor
  public Cat(String name, String breed, int age) {
    this.name = name;
    this.breed = breed;
    this.age = age;
  }
}
```

## Main

- The main method is where the class is instantiated, I think.

## Constructor

- Shares the name of the class.
- Constructor is invoked within the `main()` method of the class.
- Constructors are invoked using the `new` keyword.
  - Compilation error without `new`.

```java
public class Store {
  // constructor method
  public Store() {
    // constructor actions
  }
  // the rest of the class
}
```

## Importing Other Classes

- Pretty straightforward so far.
- Just use an import statement at the top of your class, like you would with a using statement in C#.

```java
import java.util.Arrays;
```
