# Java Lists

- [Java Lists](#java-lists)
  - [Overview](#overview)
  - [Using Lists](#using-lists)
    - [Declaring and Instantiating Lists](#declaring-and-instantiating-lists)
    - [Adding Items to Lists](#adding-items-to-lists)
    - [Removing Items from Lists](#removing-items-from-lists)
    - [Accessing Items in Lists](#accessing-items-in-lists)
    - [The Fancy Stuff](#the-fancy-stuff)
  - [A Note About Sets](#a-note-about-sets)

## Overview

- To solve the very obvious problem that fixed-length collections only work in some circumstances (like storing the months of the year), Java introduced the Java collections framework in 1998.
  - The Java collections framework is a set of classes and interfaces that implement commonly reusable collection data structures.
  - For the most part, only the Lists and Maps objects from the collections framework are used frequently.
- Lists are a more flexible version of arrays that also provides a number of helpful methods for dealing with collections of data.
  - List size is mutable.
  - `contains()` returns whether the list contains a value.
  - `indexOf()` returns... well, you get it.
  - In most cases, skip arrays and use a list.

## Using Lists

### Declaring and Instantiating Lists

- Lists are part of the `java.ulil.Lists` package.
- Lists are an interface, so you can't directly instantiate them.
  - Instead, you have to instantiate a class that implements the List interface.
  - `ArrayList` is a common choice, which is part of the `java.util.ArrayList` package.

```java
import java.util.List;
import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    List<String> groceryLine = new ArrayList<>();
  }
}
```

### Adding Items to Lists

- You can use the built in list methods to add items to lists.
  - You can add to the end of the list with `.add(item)`.
  - You can add at a specific index with `.add(index, item)`.
  - You can add a collection of items to the end fo the list with `.add(collection)`.
  - You can add a collection of items at a specific index with `.add(index, collection)`.

```java
// [ "Coffee", "Tortillas" ]
String[] beautyProducts = { "Shampoo", "Deoderant", "Conditioner" };
String[] junkFood = { "Chips", "Salsa", "Twinkies" };
groceryList.add("Banana"); // to end of list
groceryList.add(3, "Apple"); // to list starting at index 3
groceryList.add(Arrays.asList(beautyProdducts)); // collection to end of list
groceryList.add(0, Arrays.asList(junkFood)); // collection to start of list (index 0)
System.out.println(groceryList); // [ "Chips", "Salsa", "Twinkies", "Coffee", "Tortillas", "Banana", "Apple", "Shampoo", "Deoderant", "Conditioner" ]
```

### Removing Items from Lists

- You can use the `remove()` method to remove something from a list.
  - You can remove by index.
  - You can remove by object.

```java
// [ "Chips", "Salsa", "Twinkies", "Coffee", "Tortillas", "Banana", "Apple", "Shampoo", "Deoderant", "Conditioner" ]
groceryList.remove(2); // removes Twinkies
groceryList.remove("Conditioner"); // removes Conditioner
```

### Accessing Items in Lists

- To access an item in the list, you use the `get` method.
  - It looks like you can only `get` by index.

```java
// [ "Chips", "Salsa", "Coffee", "Tortillas", "Banana", "Apple", "Shampoo", "Deoderant", "Conditioner" ]
groceryList.get(2); // Coffee
```

### The Fancy Stuff

- In addition to the basic functions above, Lists have a lot more power.
- Lists can:
  - Find the index of an item in the List.
    - `indexOf(object)`
  - Find the last index of an item in the List, if it appears multiple times.
    - `lastIndexOf(object)`
  - Return the length of the list.
    - `size()`
  - Lists are iterable, so you can use the for-each technique.
    - `for (String item : groceryList)`
  - Replace an item at a specified index with a different item.
    - `set(index, object)`
  - Convert a list to an array.
    - `toArray()`

## A Note About Sets

- Sets are very similar to Lists.
- Sets can only contain unique values, however.
- So, if you need a list that enforces unique values, use a Set.
