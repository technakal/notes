# Java Basics

- [Java Basics](#java-basics)
  - [Compilation and Execution](#compilation-and-execution)
  - [Classes and Basic Rules](#classes-and-basic-rules)
    - [The `main()` Method](#the-main-method)
    - [Uninitialized Values for Each Type](#uninitialized-values-for-each-type)
  - [Styleguides](#styleguides)

## Compilation and Execution

- Using the command-line, you can compile a Java program using the following command:

```shell
javac Filename.java
```

- If there are no errors with the Java code, the compiler will create a `.class` file.
- To execute a `.class` file, you can use the following command:

```shell
java Filename
```

## Classes and Basic Rules

- Java is very similar to C# in its class structure.
  - Everything is class-based.
  - Unlike C#, there is no namespace here. And, every class has to have a `main()` method to compile.
  - Files contain one main class, and the class is named the same as the file.

```java
public class HelloWorld {
  // class stuff
}
```

- Java is case-sensitive.
- Whitespace doesn't matter to the compiler.
- Java uses the same comments as everyone else (except SQL, stupid idiot SQL).

```java
// single line comment

/*
Multi-line java comment.
It can go across multiple lines, see?
*/
```

- Semicolons are required, except after curly brackets.
- A line of code that performs a single task is called a statement. Statements end with semicolons.

### The `main()` Method

- Each class has a `main()` method, which executes the tasks of that class.

### Uninitialized Values for Each Type

byte: 0
short: 0
int: 0
long: 0L
float: 0.0f
double: 0.0d
char: '\u0000'
String (or any object): null
boolean: false

## Styleguides

- [Twitter](https://github.com/twitter/commons/blob/master/src/java/com/twitter/common/styleguide.md)
- [Google](https://google.github.io/styleguide/javaguide.html)
