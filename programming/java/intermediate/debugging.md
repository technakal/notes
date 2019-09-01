# Debugging Java

- [Debugging Java](#debugging-java)
  - [Overview](#overview)
  - [Syntax Errors](#syntax-errors)
  - [Runtime Errors](#runtime-errors)
    - [Methods for Handling Exceptions](#methods-for-handling-exceptions)
  - [Logic Errors](#logic-errors)
  - [Debugging Techniques](#debugging-techniques)
  - [Resources](#resources)

## Overview

- There are three categories of Java errors:
  - Syntax errors: Errors found by the compiler.
  - Run-time errors: Errors that occur when the program is running.
  - Logic errors: Errors found by the programmer looking for the causes of erroneous results.

## Syntax Errors

- Syntax errors represent grammar errors in the use of the programming language.
- They are the easiest to find and correct.
- The compiler will tell you where it got into trouble, and its best guess as to what you did wrong.
  - Usually the error is on the exact line indicated by the compiler, or the line just before it; however, if the problem is incorrectly nested braces, the actual error may be at the beginning of the nested block.
- Common syntax errors are:
  - Misspelled variable and method names
  - Omitting semicolons ;
  - Omitting closing parenthesis ), square bracket ], or curly brace }

## Runtime Errors

- Run-time errors occur when a program with no compile-time errors asks the computer to do something that the computer is unable to reliably do.
- Common run-time errors:
  - Division by zero also known as division error
  - Trying to open a file that doesn’t exist
- These types of errors throw an exception.
  - The exception tells you what type of error occurred and where the error occurred.
  - It doesn't tell you what caused it, specifically.
  - Exceptions also provide a stack trace, so that you can follow the code execution back to its (possible) cause.
  - The stack trace includes:
    - The method that was running
    - The method that invoked it
    - The method that invoked that one
    - etc...
  - Handling exceptions well is a big part of good coding.

### Methods for Handling Exceptions

- `try/catch`

```java
try {
  // something
} catch(NullPointerException e) { // exception type
  // do something
  System.err.println("Ran into an error: " + e.getMessage()); // maybe print something
}
```

## Logic Errors

- Logic errors occur when there is a design flaw in your program.
- There are no error messages because the problem isn't the code--it's your design of what the code should do.
  - For example, if you want to print a statement if x is `true`, but the preceding code ensures x will never be true.
- Some common logic errors:
  - Program logic is flawed
  - Some “silly” mistake in an if statement or a for/while loop
- One popular method for avoiding logic errors is [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development).

## Debugging Techniques

- Divide and conquer: Comment out or temporarily delete half the code to isolate an issue.
  - If the program compiles now, you know the error is in the code you deleted. Bring back about half of what you removed and repeat.
  - If the program still doesn’t compile, the error must be in the code that remains. Delete about half of the remaining code and repeat.
- Print statements for the rescue: Use System.out.println() to check variable/return values at various points throughout the program.
- Modern IDEs have great debugging tools. Learn them!
  - [IntelliJ](https://www.jetbrains.com/help/idea/debugging-code.html)

## Resources

- [Thinking About Errors in Your Code Differently](https://news.codecademy.com/errors-in-code-think-differently/)
