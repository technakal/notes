# Java Basic

- [Java Basic](#java-basic)
  - [Basic Java APIs](#basic-java-apis)
    - [Math](#math)
    - [Date](#date)
    - [String](#string)
    - [Character](#character)
    - [StringBuilder and StringBuffer](#stringbuilder-and-stringbuffer)
    - [Regex](#regex)
  - [Search Algorithms](#search-algorithms)
    - [Binary Search](#binary-search)
    - [Recursion](#recursion)
    - [Big O Notation](#big-o-notation)
  - [Collections](#collections)
    - [List](#list)
      - [ArrayList](#arraylist)
      - [LinkedList](#linkedlist)
    - [Stack](#stack)
    - [Queue](#queue)
    - [Map](#map)
    - [Set](#set)

## Basic Java APIs

- Basic APIs covered:
  - [Math](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html)
  - [Date](https://docs.oracle.com/javase/8/docs/api/java/util/Date.html)
  - [String](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html)
  - [Character](https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html)
  - [StringBuilder](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html)
  - [StringBuffer](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuffer.html)
  - [Regex](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html)

### Math

- Part of the `java.lang.Math` package.
- The Math class takes care of mathematical operations such as elementary exponential, logarithm, square root, and trigonometric functions.
- Useful for data analysis, big data, machine learning, and AI.
- Less strict and less accurate than `StrictMath`, but way more performant and typically good enough.

### Date

- Part of the `java.util.Date` package.
- Represents a specific instant in time, with millisecond precision.
  - `DateFormat` class should be used to format date strings, not `Date`.
  - `Calendar` class should be used to convert between dates and times.
- Uses the following representations:
  - A year y is represented by the integer y - 1900.
  - A month is represented by an integer from 0 to 11; 0 is January, 1 is February, and so forth; thus 11 is December.
  - A date (day of month) is represented by an integer from 1 to 31 in the usual manner.
  - An hour is represented by an integer from 0 to 23. Thus, the hour from midnight to 1 a.m. is hour 0, and the hour from noon to 1 p.m. is hour 12.
  - A minute is represented by an integer from 0 to 59 in the usual manner.
  - A second is represented by an integer from 0 to 61; the values 60 and 61 occur only for leap seconds and even then only in Java implementations that actually track leap seconds correctly. Because of the manner in which leap seconds are currently introduced, it is extremely unlikely that two leap seconds will occur in the same minute, but this specification follows the date and time conventions for ISO C.
- You can convert numbers into dates by passing the int or long into the `Date()` constructor.

```java
Date d1 = new Date(12543); // Thu Jan 01 00:00:12 UTC 1970
Date d2 = new Date(1561554154352); // Wed Jun 26 13:02:34 UTC 2019
```

### String

- Part of the `java.lang.String` package.
- `String` is a class in Java.
- A `String` represents a string in the UTF-16 format.
- `String` class is are immutable.
  - How does this work?

### Character

- Part of the `java.lang.Character` package.
- The `Character` class wraps a value of the primitive type char in an object.

### StringBuilder and StringBuffer

- Part of the `java.lang.StringBuilder` and `java.lang.StringBuffer` packages.
- The `StringBuilder` and `StringBuffer` class create a mutable sequence of characters.
- Mutable, unlike `String`.
- `StringBuilder` is compatible with `StringBuffer`.
  - This class is designed for use as a drop-in replacement for StringBuffer in places where the string buffer was being used by a single thread
  - Typically preferred over `StringBuffer`.
  - Principal use is to convert data to String and then insert it or append it wherever you want in the StringBuilder.
  - Every string builder has a capacity. As long as the length of the character sequence contained in the string builder does not exceed the capacity, it is not necessary to allocate a new internal buffer. If the internal buffer overflows, it is automatically made larger.
  - Not good for multiple threads.
- `StringBuffer` is a thread-safe, mutable sequence of characters. A string buffer is like a String, but can be modified.
  - Good for multithread.
  - The methods are synchronized where necessary so that all the operations on any particular instance behave as if they occur in some serial order that is consistent with the order of the method calls made by each of the individual threads involved.
  - Does the same thing as `StringBuilder`.
- Unless otherwise noted, passing a null argument to a constructor or method in this class will cause a NullPointerException to be thrown.

### Regex

- Part of the `java.util.regex.Pattern` package.
- A compiled representation of a regular expression.

## Search Algorithms

### Binary Search

- In binary search, we sort an array.
- Then, we take the middle number and determine whether it's equal to our number.
- If it isn't our number, we check whether it's larger than the number we're searching for.
- If it is, we ignore the second half of the array. If it's not, we ignore the first half of the array.
- Repeat until we find the number.

```java
// returns the index of the number, or -1 if the number isn't found.
public static int findTarget(int target, int[] numArr) {
  Arrays.sort(numArr); // array must be sorted for binary search to work.
  if(numArr.length == 0) return -1;
  int start = 0, end = numArr.length - 1;
  while(start + 1 < end) {
    int mid = start + (end - start) / 2;
    if(numArr[mid] == target) {
      return mid;
    }
    if(numArr[mid] < target) {
      start = mid;
    }
    if(numArr[mid] > target) {
      end = mid;
    }
  }
  if(numArr[start] == target) {
    return start;
  }
  if(numArr[end] == target) {
    return end;
  }

  return -1;
}
```

### Recursion

- Recursion is a process in which a method calls itself repeatedly until some condition is met.
- Pros:
  - Reduces length of program.
  - Very flexible.
  - Large, complex iterative problems are easy to solve with recursion.
  - Algorithms are much easier to visualize and prove.
- Cons:
  - Slow.
  - Logical, but difficult to trace and debug.
  - Requires extra storage space, as every recursive call requires new memory allocation.
  - When processing a large operation, often throws a `StackOverflowException`.

```java
public static void permute(int[] arr, int index) {
  int size = arr.length;
  /**
   * if we've reached the end of the array
   * print the permutations, one at a time.
   */
  if(index + 1 == size) {
    for(int i = 0; i < size; i++) {
      System.out.println(arr[i]);
    }
    System.out.println();
  } else {
    /**
    * from the index to the size of the array
    * swap the two characters and perform another
    * round of permutations.
    */
    for(int i = index; i < size; i++) {
      int temp = arr[i];
      arr[i] = arr[index];
      arr[index] = temp;
      permute(arr, index + 1);
    }
  }
```

- Here are some practice problems. You need to practice.
  - [CodingBat](https://codingbat.com/java/Recursion-1)
  - [GeeksForGeeks](https://www.geeksforgeeks.org/recursion-practice-problems-solutions/)
- It helps to think about each recursive call, not as a function, but as the return result of that function call.
  - The recursion builds on itself, and only the after all of the underlying calls have resolved does the initial call resolve:

```java
// each iteration will either return 1 or 0.
// the end result will be the sum of all of the recursion call's 1s or 0s, added together.
public static int array11(int[] nums, int index) {
  if(index > nums.length - 1) {
    return 0;
  }
  if(nums[index] == 11) {
    return 1 + array11(nums, index + 1); // this is not 1 + a function. This is 1 + the resolution of that function.
  }
  return array11(nums, index + 1);
}
```

### [Big O Notation](https://docs.google.com/presentation/d/1ktNwvUV4opYucCr7vu_G-dh96MZ7XuTo0aGB9M5uD-U/edit#slide=id.g5c78fc8d66_0_59)

- The mathematical language used to reflect how long an algorithm takes to run.
  - O = the order of the function.
  - N = number of the element.
- This shit is confusing.

## Collections

- Java collections include:
  - List
  - Stack
  - Queue
  - Set
  - Map
- Java Collections seek to solve many of the implicit problems of arrays.
  - Problems like fixed size.

### List

- List is basically an array with a flexible size.
- List is an interface, and `ArrayList` and `LinkedList` are two implementations of the List interface.
  - `ArrayList` uses a dynamic array.
  - `LinkedList` uses a doubly-linked list to store elements.

#### [ArrayList](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html)

- `java.util.ArrayList`
- Implements all of the features of the `List` interface.
- Accepts any element type, including `null`.
- Adding items to the `ArrayList` expands its capacity, but has an amortized time cost.
  - Using something like `ensureCapacity()` before adding a large number of items can reduce the time cost.
- Not synchronized across threads.

```java
// sorts an ArraList of items into sub-arrays based on the first letter of each.
import java.util.ArrayList;
import java.util.Collections;

class ListSort {
  public static ArrayList sortByFirstLetter(ArrayList<String> list) {
    Collections.sort(list);
    ArrayList<ArrayList<String>> superList = new ArrayList<>();
    ArrayList<String> firstLetters = new ArrayList<>();
    for (String i : list) {
      String firstLetter = String.valueOf(i.charAt(0));
      if (firstLetters.indexOf(firstLetter) < 0) {
        firstLetters.add(firstLetter);
      }
    }
    for(String firstLetter : firstLetters) {
      ArrayList<String> subList = new ArrayList<String>();
      for(String j : list) {
        String jFirstLetter = String.valueOf(j.charAt(0));
        if(jFirstLetter.equals(firstLetter)) {
          subList.add(j);
        }
      }
      superList.add(subList);
    }
    return superList;
  }
}
```

#### [LinkedList](https://docs.oracle.com/javase/8/docs/api/java/util/LinkedList.html)

- `java.util.LinkedList`
- Doubly-linked list implementation of the `List` and `Deque` interfaces.
- Implements all optional list operations, and permits all elements (including `null`).
- Not synchronized across threads.

### [Stack](https://docs.oracle.com/javase/8/docs/api/java/util/Stack.html)

- `java.util.Stack`
- Stack is like a list, but applies the LIFO (last-in-first-out) principle.
  - Adding something to a stack adds it to the top. (`push()`)
  - Remvoving something takes it off the top. (`pop()`)
- `Deque` interface and its implementations are preferrable to `Stack`.

```java
public static int calculate(String s) {
  int len;
  if (s == null || (len = s.length()) == 0) {
      return 0;
  }
  Stack<Integer> stack = new Stack<>();
  int num = 0;
  char sign = '+';
  for (int i = 0; i < len; i++) {
    if (Character.isDigit(s.charAt(i))) {
      num = Character.getNumericValue(s.charAt(i));
    }
    if (!Character.isDigit(s.charAt(i)) || i == len - 1) {
      if (sign == '-') {
        stack.push(-num);
      }
      if (sign == '+') {
        stack.push(num);
      }
      if (sign == '*') {
        stack.push(stack.pop() * num);
      }
      sign = s.charAt(i);
      num = 0;
    }
  }

  int ans = 0;
  for (int i : stack) {
    ans += i;
  }
  return ans;
}
```

### [Queue](https://docs.oracle.com/javase/8/docs/api/java/util/Queue.html)

- `java.util.Queue`
- `Queue` is an interface.
- `Queue` applies the FIFO (first-in-first-out) principle.
  - Adding something to a stack adds it to the back.
  - Removing something takes it off the front.

### [Map](https://docs.oracle.com/javase/8/docs/api/java/util/Map.html)

- Stores data in key-value pairs.
- Can't contain duplicate keys.
- Each key must have one value.
- Common implementations are `HashMap` and `TreeMap`.

### [Set](https://docs.oracle.com/javase/8/docs/api/java/util/Set.html)

- Stores elements using a hashing.
- Can't contain duplicate elements.
- Common implementations are `HashSet` and `TreeSet`.
