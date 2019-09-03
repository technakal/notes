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
  - [Exceptions](#exceptions)
    - [Throwable](#throwable)
  - [Java IO](#java-io)
    - [Stream](#stream)
      - [Stream Pipeline](#stream-pipeline)
    - [File](#file)
      - [FileInputStream](#fileinputstream)
      - [FileReader](#filereader)
      - [FileOutputStream](#fileoutputstream)
      - [FileWriter](#filewriter)
      - [[Buffer]()](#buffer)
      - [BufferedReader](#bufferedreader)
  - [Maven](#maven)
    - [Installation](#installation)
    - [Creating a Project](#creating-a-project)
    - [Goals](#goals)
    - [Phases](#phases)
      - [Most Common Lifecycle Phases](#most-common-lifecycle-phases)
    - [Installing the IntelliJ Maven Plug-in](#installing-the-intellij-maven-plug-in)

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

## Exceptions

- Exceptions are problems that are not caught in compilation, but are encountered during runtime.
  - An example is an invalid input from a user. Compiler can't catch this, so it hits when the user inputs bad data.
  - Unhandled exceptions will crash your program.
- Always wrap your code in exception handlers, dude.
- Java uses the `try/catch` method of error handling.
  - You can chain `try/catch/catch/catch/etc`.
- Keywords for `try/catch` methodology:

| Keyword | Function                                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------------------- |
| try     | The try block is the code you want to execute. It must be followed by a `catch` or `finally` block.                       |
| catch   | This block handles the thrown exception. You can specify the type of exception you're looking for.                        |
| finally | This block executes regardless of what else happens. It's useful for cleaning up code and running finalization processes. |
| throw   | Throws an exception for another handler to grab.                                                                          |
| throws  | Used in the method signature, this declares that the method may throw an exception.                                       |

### Throwable

- The `Throwable` base class is the superclass upon which all Java Exceptions and Errors are built.

## Java IO

- `java.IO` is an API for reading and writing data.

### [Stream](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html)

- `java.util.stream`
- `IO Stream` is like an endless flow of data.
  - You can write to or read from a stream.
  - Streams are connected to a data source or data destination.
  - Streams can be byte- or character-based.
- Allows functional-style operations on data.
  - Here, the stream performs a filter-map-reduce operation to get the sum of weights for all RED widgets.

```java
int sum = widgets
            .stream()
            .filter(b -> b.getColor() == RED)
            .mapToInt(b -> b.getWeight())
            .sum();
```

- Streams are different from normal abstractions:
  - No storage. A stream is not a data structure that stores elements; instead, it conveys elements from a source such as a data structure, an array, a generator function, or an I/O channel, through a pipeline of computational operations.
  - Functional in nature. An operation on a stream produces a result, but does not modify its source. For example, filtering a Stream obtained from a collection produces a new Stream without the filtered elements, rather than removing elements from the source collection.
  - Laziness-seeking. Many stream operations, such as filtering, mapping, or duplicate removal, can be implemented lazily, exposing opportunities for optimization. For example, "find the first String with three consecutive vowels" need not examine all the input strings. Stream operations are divided into intermediate (Stream-producing) operations and terminal (value- or side-effect-producing) operations. Intermediate operations are always lazy.
  - Possibly unbounded. While collections have a finite size, streams need not. Short-circuiting operations such as limit(n) or findFirst() can allow computations on infinite streams to complete in finite time.
  - Consumable. The elements of a stream are only visited once during the life of a stream. Like an Iterator, a new stream must be generated to revisit the same elements of the source.
- Streams can be created from:
  - A Collection.
  - An Array.
  - A static factory method.
  - The lines of a File.
  - Filepaths.
  - Random numbers.
  - Many others defined by the Java SDK.
  - Third-party stream libraries.
- A program that needs to read data from some source needs an InputStream or a Reader.
- A program that need to write data to some destination needs an OutputStream or a Writer.
- FileInputStream and FileOutputStream are common input and output stream classes.
- FileReader and FileWriter are common reader and writer classes.

> [source] -> [reader/input stream] -> [program] -> [writer/output stream] -> [destination]

#### Stream Pipeline

- Stream operations are divided into intermediate and terminal operations, and are combined to form stream pipelines
- Streams facilitate parallel execution by reframing the computation as a pipeline of aggregate operations.

```java
// using parallel stream
int sumOfWeights = widgets
                      .parallelStream()
                      .filter(b -> b.getColor() == RED)
                      .mapToInt(b -> b.getWeight())
                      .sum();
```

- A stream pipeline consists of a source (such as a Collection, an array, a generator function, or an I/O channel); followed by zero or more intermediate operations such as Stream.filter or Stream.map; and a terminal operation such as Stream.forEach or Stream.reduce.
- Intermediate operations:
  - Return a new stream.
  - Are always lazy.
  - Further divided into stateless and stateful operations.
- Streams don't finalize anything until they reach the terminal operation.
- Streams must be non-interferant.
  - The data in a string can't change unless it's being properly handled with concurrent modification.
- Streams should aim for no side-effects, bro.

```java
// has side effects
ArrayList<String> results = new ArrayList<>();
stream.filter(s -> pattern.matcher(s).matches())
      .forEach(s -> results.add(s));  // Unnecessary use of side-effects!

// no side effects
ArraList<String> result = stream
                            .filter(s -> pattern.matcher(s).matches())
                            .collect(Collectors.toList());
```

### [File](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html)

- `java.nio.file.Files`
- The `File` class gives you access to the underlying file system.
- The `File class allows you to:
  - Check if a file or directory exists.
  - Create a directory if it does not exist.
  - Read the length of a file.
  - Rename or move a file.
  - Delete a file.
  - Check if path is file or directory.
  - Read list of files in a directory.
- This class consists exclusively of static methods that operate on files, directories, or other types of files.

#### [FileInputStream](https://docs.oracle.com/javase/8/docs/api/java/io/FileInputStream.html)

- `java.io.FileInputStream`
- FileInputStream obtains input bytes from a file.
  - Can read byte- or character-stream data.
  - Recommended for byte-oriented data.

#### [FileReader](https://docs.oracle.com/javase/9/docs/api/?java/io/FileReader.html)

- `java.io.FileReader`
- Same as FileInputStream, except geared toward character-stream data.
- The constructors of this class assume that the default character encoding and the default byte-buffer size are appropriate.
  - To specify these values yourself, construct an InputStreamReader on a FileInputStream.

#### [FileOutputStream](https://docs.oracle.com/javase/8/docs/api/?java/io/FileOutputStream.html)

- `java.io.FileOutputStream`
- FileOutputStream is an output stream used for writing data to a file.
  - Writes data to a `File` or `FileDescriptor`.
  - If you have to write primitive values into a file, use FileOutputStream class.
  - Can write byte-oriented as well as character-oriented data.
  - Recommended for byte-oriented data.

#### [FileWriter](https://docs.oracle.com/javase/9/docs/api/?java/io/FileWriter.html)

- `java.io.FileWriter`
- Same as FileOutputStream, except geared toward character-stream data.
- The constructors of this class assume that the default character encoding and the default byte-buffer size are acceptable.
  - To specify these values yourself, construct an OutputStreamWriter on a FileOutputStream.
- Whether or not a file is available or may be created depends upon the underlying platform. Some platforms, in particular, allow a file to be opened for writing by only one FileWriter (or other file-writing object) at a time. In such situations the constructors in this class will fail if the file involved is already open.

#### [BufferedReader](https://docs.oracle.com/javase/8/docs/api/java/io/BufferedReader.html)

- `java.io.BufferedReader`
- Buffer is a region of a physical memory storage used to temporarily store data while it’s being moved from one place to another.
- BufferedReader class is used to read the text from a character-based input stream.
  - It can be used to read data line by line by readLine() method, it can also be used to read data character by character by read() method.
- It's important to close() BufferedReaders when they're finished.
- The buffer size may be specified, or the default size may be used. The default is large enough for most purposes. 

## Maven

- Maven is a build automation tool for Java.
- Here's a helpful five minute guide to [Maven](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)

### Installation

- Follow [these instructions](https://maven.apache.org/install.html).
- Extract Maven somewhere and add the Maven bin directory to the PATH.

### Creating a Project

- Run this command to create a project:

```shell
mvn archetype:generate -DgroupId=com.mycompany.app -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
```

### Goals

- This command above is specifying a _goal_, which is to generate a simple project using the maven-archetype-quickstart.
- The prefix archetype is the plugin that provides the goal.
  - Basically, the above commands are configuring your POM file.
    - The POM is the core of Maven's configuration. It's like a gulp.json or similar idea.

### Phases

- To package the app, you use the following command from the root directory of your app:

```shell
mvn package
```

- Unlike the [first command](#creating-a-project), this isn't expressing a goal. It's initiating a phase of Maven's lifecycle--the build phase.
- Some phases:
  - validate
  - generate-sources
  - process-sources
  - generate-resources
  - process-resources
  - compile
- Using a phase phrase, like package, Maven will perform every task up to and including the specified phase.
  - So, for example, if you use `mvn generate-sources`, Maven will perform both `validate` and `generate-sources`.
- To test that your app packaged, use the following command:

```shell
java -cp target/my-app-1.0-SNAPSHOT.jar com.mycompany.app.App
```

- Phases are actually mapped to underlying goals.
  - The specific goals executed per phase is dependant upon the packaging type of the project.
  - For example, package executes jar:jar if the project type is a JAR, and war:war if the project type is a WAR.
- Phases and goals can be executed sequentially.

```shell
mvn clean dependency:copy-dependencies package
```

#### Most Common Lifecycle Phases

- There are a ton of phases that Maven recognizes. These are commonly used ones, bb:
  - validate: validate the project is correct and all necessary information is available
  - compile: compile the source code of the project
  - test: test the compiled source code using a suitable unit testing framework. These tests should not require the code \* packaged or deployed
  - package: take the compiled code and package it in its distributable format, such as a JAR.
  - integration-test: process and deploy the package if necessary into an environment where integration tests can be run
  - verify: run any checks to verify the package is valid and meets quality criteria
  - install: install the package into the local repository, for use as a dependency in other projects locally
  - deploy: done in an integration or release environment, copies the final package to the remote repository for \* with other developers and projects.
  - clean: cleans up artifacts created by prior builds
  - site: generates site documentation for this project

### Installing the IntelliJ Maven Plug-in

- IntelliJ has support for Maven.
- Just make sure you have the Maven plugin installed.
  - IntelliJ > Configuration Settings > Plugins > Search for Maven.
  - The right-side window should have a Maven option with the phases, dependencies, etc.
  - If it doesn't, you can click Search > Maven.
