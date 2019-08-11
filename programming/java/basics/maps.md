# Java Maps

## Overview

- Maps are data types that allow us to store key-value pairs.

## Using Maps

### Declaring Maps

- To declare a map, you use the Map data type.
- In this declaration, you must specify both the key data type and the value data type.
- Just like Lists, Maps are interfaces. So, you can't instantiate them directly.
  - Instead, you'll use a class that implements Map, such as `HashMap`.

```java
import java.ulil.Map;
import java.util.HashMap;

public class Main {
  public static void main(String[] args) {
    Map<String, String> meals = new HashMap<>();
  }
}
```

### Adding Items to Maps

- You can add new pairs to the Map using the `put` function.
  - There are also cool functions like `putIfAbsent` and `putAll`.
  - Also, the convention for Maps is to use constants for your keys, rather than strings themselves.
    - Looks a lot cleaner, too.

````java
// do this
public static final String BREAKFAST = "breakfast";
public static final String LUNCH = "lunch";
public static final String DINNER = "dinner";
public static final String SNACK = "snack";

public static void main(String[] args) {
  Map<String, String> meals = new HashMap<>();
  meals.put(BREAKFAST, "Burrito");
  meals.put(LUNCH, "Pizza");
  meals.put(DINNER, "Tacos");
  meals.put(SNACK, "Chocolate");
}

// rather than this
public static void main(String[] args) {
  Map<String, String> meals = new HashMap<>();
  meals.put("breakfast", "Burrito");
  meals.put("lunch", "Pizza");
  meals.put("dinner", "Tacos");
}

```java
// put
meals.put(BREAKFAST, "Burrito");
meals.put(LUNCH, "Pizza");
meals.put(DINNER, "Tacos");

// put if absent
meals.putIfAbsent(BREAKFAST, "Banana"); // breakfast=Burrito
meals.putIfAbsent(SNACK, "Chips and Salsa") // snack=Chips and Salsa

// put all
// ???
````

- If you add a key that already exists, it'll just replace the original. So, no duplicates.

### Removing Items from Maps

- Use the `remove` function, dude.
  - Note that the remove function does return the removed value, if you want to catch it on its way out.

```java
String lunch = meals.remove(LUNCH);
System.out.println(lunch); // Pizza
```

### Retrieving Items from Maps

- Retrieving from a Map is pretty similar to retrieving from a List, except instead of passing the index, you pass the key.
  - Use the `get` method.

```java
meals.get(BREAKFAST); // Burrito
meals.get(LUNCH); // Pizza
meals.get(DINNER); // Tacos
```

### The Fancy Stuff

- `containsKey` returns a boolean for whether the Map contains the supplied key.
- `containsValue` returns a boolean for whether the Map contains the supplied value.
- `size` returns the length of the map.

```java
meals.containsKey(SNACK); // true
meals.containsValue("Kimchi"); // false
meals.size(); // 4;
```
