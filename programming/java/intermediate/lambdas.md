# Java Lambdas

## Overview

Lambdas are anonymous functions. These are more concise and easy to read than traditional functions, and drive the language toward more functional programming concepts.

- Before lambdas, to implement an anonymous function, developers would have to build an interface with only that one needed function. This was called a SAM (Single Abstract Method).
  - This was messy and complex and a lot of code.
- Lambdas solved the problem of SAMs by allowing developers to create functions outside of classes.
- Lambdas are also known as functional interfaces.
- Lambdas are syntatic sugar.

## Lambda Structure

- Lambdas look a lot like arrow functions.
  - Skinny arrows! ->
- The come in long and short form.
  - Single-line methods don't need brackets, type declarations, or `return`. These are short form.

```java
// long form
(Book b1, Book b2) -> {
  return b1.getTitle().compareTo(b2.getTitle());
}

// short form
(b1, b2) -> b1.getTitle().compareTo(b2.getTitle());
```

- Because of Lambdas, we now have a `forEach()` method!

```java
books.forEach(book -> System.out.println(book));
```

## Method References

- Java 8 also introduces method references, which can be used in place of a lambda.
  - In the example below, the Comparator.comparing method takes a function.
  - In place of the function, we have a method reference, which basically says, "To sort this, compare the result of getTitle from one book to the next."
  - Then, in the print section, it says, "For each book, return the println method with that book as a parameter."

```java
public static void usingMethodReference() {
  List<Book> books = Books.all();
  Collections.sort(books, Comparator.comparing(Book::getTitle));
  books.forEach(System.out::println);
}
```

## Sample Code with All the Above Options

```java
package com.teamtreehouse.lambdas;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Main {
  public static void usingAnonymousInlineClass() {
    List<Book> books = Books.all();
    Collections.sort(books, new Comparator<Book>() {
        @Override
        public int compare(Book b1, Book b2) {
            return b1.getTitle().compareTo(b2.getTitle());
        }
    } );

    for(Book book : books) {
        System.out.println(book);
    }
  }

  public static void usingLambdasInLongForm() {
    List<Book> books = Books.all();
    Collections.sort(books, (Book b1, Book b2) -> {
        return b1.getTitle().compareTo(b2.getTitle());
    });
    books.forEach((book -> System.out.println(book)));
  }

  public static void usingLambdasInShortForm() {
    List<Book> books = Books.all();
    Collections.sort(books, (b1, b2) -> b1.getTitle().compareTo(b2.getTitle()));
    books.forEach((book -> System.out.println(book)));
  }

  public static void usingMethodReference() {
    List<Book> books = Books.all();
    Collections.sort(books, Comparator.comparing(Book::getTitle));
    books.forEach(System.out::println);
  }

  public static void printSeparator(String text) {
    System.out.printf("%s:%n", text);
    System.out.println();
  }

  public static void main(String[] args) {
      usingLambdasInShortForm();
  }
}
```
