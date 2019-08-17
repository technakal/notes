# Java Arrays

- [Java Arrays](#java-arrays)
  - [Overview](#overview)
  - [Using Arrays](#using-arrays)
    - [Setting Array Elements](#setting-array-elements)
    - [Array Iteration](#array-iteration)
    - [Multi-Dimensional Arrays](#multi-dimensional-arrays)
  - [Array Challenges](#array-challenges)
    - [Arrays are Fixed Length](#arrays-are-fixed-length)
    - [Arrays Don't Have a Built-In Sort Method](#arrays-dont-have-a-built-in-sort-method)

## Overview

- All elements of an array must be the same data type.
- You can pass arrays like any other variable.

- When declaring an array, but not initializing it, you must declare the array length.

```java
String[] arr = new String[4]; // { null, null, null, null }
int[] arr2 = new int[6]; // { 0, 0, 0, 0, 0, 0 }
```

- When declaring and initializing an array, you can use an array literal:

```java
String[] arr = { "John", "Ben", "Micah" };
int[] arr2 = { 1, 2, 3, 4, 5, 6 };
```

- When just declaring an array, you have to combine the two methods above when you want to initialize it:
  - This is also a good shortcut for passing a new array into a method. Instead of declaring a variable, just pass in the array literal with the new keyword.

```java
String[] arr;
arr = new String[] { "John", "Ben", "Micah" };
```

## Using Arrays

### Setting Array Elements

- Use bracket notation to set and retrieve values from an array.

```java
String[] arr = { "John", "Ben", "Micah" };
System.out.println(arr[2]); // Micah
arr[1] = "Kara"; // { "John", "Kara", "Micah" }
```

### Array Iteration

- Enhanced for-loop
  - This is the recommended method for iterating through an array when you need to process each item in the array.
  - Java's version of `foreach`, `forEach`, `for x in y`.

```java
String[] friends = { "John", "Ben", "Micah" };
for (String friend : friends) {
  // do something with each friend
}
```

- Standard for-loop
  - Good for pre-Java 5 codebases (where enhanced for-loops aren't available).
  - Good if you also need to keep track of the current iteration count (or index).

```java
String[] arr = { "John", "Ben", "Micah" };
for (int i = 0; i < arr.length; arr++) {
  // do something with each friend
}
```

### Multi-Dimensional Arrays

- You can declare multi-dimensional arrays by nesting arrays inside of arrays.
- Only difference from a normal array is the declaration:

```java
// regular array
int[] arr1 = { 1, 2, 3 };
// multi-dimensional array
int [][] arr2 = {
  { 1, 2, 3 },
  { 4, 5, 6 },
  { 7, 8, 9 }
};
```

- Both of these arrays are length 3.
- Accessing nested arrays is pretty obvious:

```java
int [][] arr2 = {
  { 1, 2, 3 },
  { 4, 5, 6 },
  { 7, 8, 9 }
};

System.out.println(arr2[0][1]); // 2
System.out.println(arr2[2][0]); // 7
System.out.println(arr2[1][0]); // 4
System.out.println(arr2[2][2]); // 9
```

## Array Challenges

### Arrays are Fixed Length

- Arrays are fixed length.
  - The length at declaration is the length.
  - You can't change it.
  - To get around this, you copy the array to a new array with the length you need.
  - Here's an old standby to do just that:

```java
String[] friends = { "Brant", "Mackenzie", "Timmy" };
String[] friendsAndMe = new String[4];
// use .arraycopy
// takes input array, starting index, output array, starting index, and number of items to insert
System.arraycopy(friends, 0, friendsAndMe, 0, friends.length);
friendsAndMe[3] = "Noel";
System.out.println(friendsAndMe); // { "Brant", "Mackenzie", "Timmy", "Noel" }
```

- If you're not interested in using outdated methods, here's a better approach:

```java
import java.util.Arrays;

String[] friends = { "Brant", "Mackenzie", "Timmy" };
// use .copyOf method
// takes original array and the length of the new array
String[] friendsAndMe = Arrays.copyOf(friends, friends.length + 1); // { "Brant", "Mackenzie", "Timmy", null }
```

- Or, just use a `<List>`. Duh.

### Arrays Don't Have a Built-In Sort Method

- But you can use the `java.util.Arrays` package for it.
- Use the `.sort()` method.
  - Note that `.sort()` modifies the array in place.

```java
import java.util.Arrays;

String[] friends = { "Noel", "Mackenzie", "Brant", "Timmy" };
Array.sort(friends); // { "Brant", "Mackenzie", "Noel", "Timmy" };
```

- `Arrays.sort()` works by using the `.compareTo()` method on each item.
- By default, it sorts smallest to largest (or alphabetically for strings);
  - You can use a custom sort method through the `Comparator` class.
    - This is a little obtuse, below, but the Comparator.comparing part is returning a new way to compare. In this case, it's comparing each String to the next and sorting based on the length of the string.

```java
import java.util.Arrays;
import java.util.Comparator;

String[] friends = { "Noel", "Mackenzie", "Brant", "Timmy" };
Array.sort(friends, Comparator.comparing(String::length));
```
