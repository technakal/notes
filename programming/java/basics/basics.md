# Java Basics

- [Java Basics](#java-basics)
  - [Java Keywords](#java-keywords)
  - [Compilation and Execution](#compilation-and-execution)
  - [Classes and Basic Rules](#classes-and-basic-rules)
    - [The `main()` Method](#the-main-method)
    - [Uninitialized Values for Each Type](#uninitialized-values-for-each-type)
    - [Access Modifiers](#access-modifiers)
  - [Packages and Import Statements](#packages-and-import-statements)
  - [Styleguides](#styleguides)

## Java Keywords

- @ - symbol is used to annotate code.
  - `@Test` is one example.
- class - an individual component of the Java program.
  - By convention, the name of the class is typically a noun.
    - Car
    - Person
    - BullyString
  - Using a book analogy, the class is like a paragraph in a book.
- constructor - a method called on a class that returns an object of that class.
- import - tells the program which package(s) you want to include/use in your program.
  - `import org.junit.Assert`
  - The \* allows you to import all files in a given package.
  - `import java.util.*`
- method - the action or activity of a class.
  - By convention, this should be a verb that best describes the purpose of the method.
  - Using a book analogy, the class is like a sentence in a paragraph.
- object - the instantiation of a class.
- package - the file structure of a Java program.
  - `com.technakal.helloworld.hi`
  - Gets more specific from left to right.
  - Use package names related to your business topic.
  - Using a book analogy, the package is like a chapter in a book.
- public - an access modifier that allows the class or method to be used by anything else in the program.
- void - indicates that a method does not return anything.

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

### Access Modifiers

## Packages and Import Statements

- Packages describe the filepath of a class or method.
- Import pulls in a package that you or someone else has defined.

```java
package com.technakal.lesson2;
import org.junit.Assert;
```

- In the above code sample, the file we're currently working on is declaring itself as part of the package `com.technakal.lesson2`.
  - This means it's file structure looks like this:

```
src-|
    |-com-|
          |-technakal-|
                      |-lesson2
```

- In the example, as well, we're importing another package that uses this file structure:

```
org-|
    |-junit-|
            |-Assert
```

## Styleguides

- [Twitter](https://github.com/twitter/commons/blob/master/src/java/com/twitter/common/styleguide.md)
- [Google](https://google.github.io/styleguide/javaguide.html)
