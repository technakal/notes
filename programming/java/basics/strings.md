# Java Strings

- [Java Strings](#java-strings)
  - [Overview](#overview)
  - [Useful String Methods](#useful-string-methods)

## Overview

- Strings are used often, so Java has an entire class, with plenty of methods, to make working with strings easier.

## Useful String Methods

- length()
  - In Java, the length() string method returns the length ⁠— total number of characters ⁠— of a String.
  - In theory, the length of a String is the same as the Unicode units of the String. For example, escape sequences such as \n count as only one character.
- concat()
  - The concat() method concatenates one string to the end of another string.
- equals()
  - With objects, such as Strings, we can’t use the primitive equality operator == to check for equality between two strings. To test equality with strings, we use a built-in method called equals().
  - There’s also a equalsIgnoreCase() method that compares two strings without considering upper/lower cases.
- indexOf()
  - If we want to know the index of the first occurence of a character in a string, we can use the indexOf() method on a string.
- charAt()
  - The charAt() method returns the character located at a String‘s specified index.
  - This is a pain in the ass to use.
- substring()
  - Extracts a portion of the string, beginning at the passed-in index.
  - If no second argument is given, it returns the substring starting at the first argument and going until the end of the string.
  - If a second argument is provided, it returns the substring starting at the first and ending at the second.
- toUpperCase() / toLowerCase()
  - toUpperCase(): returns the string value converted to uppercase
  - toLowerCase(): returns the string value converted to lowercase
