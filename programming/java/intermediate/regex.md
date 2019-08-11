# Regex in Java

## Overview

- [abc] - This is called a character class.
  - Characters within a square bracket that you want to match on.
- Regular expressions in Java work like Regular Expressions pretty much everywhere else.
  - They have their own idiosyncrasies, but they're conceptually the same.

```java
import java.util.Pattern;
import java.util.Matcher;

public class Reggie {
  public static void main(String[] args) {
    // validate zip code
    String zipCode = "90210";
    if(zipCode.matches("^\\d{5}(-\\d{4})$")) {
      System.out.println("%s looks like a valid zip code. %n", zipCode);
    } else {
      System.out.println("%s doesn't look like a valid zip code. %n", zipCode);
    }

    // using regex to split strings
    String skills = "JavaScript, HTML, CSS, and Java";
    String[] skillsArr = skills.split("\\W+(and\\W+)?");

    for (String skill : skillsArr) {
      System.out.println(skill);
    }

    // using groups in regex
    String speech = "Surely capturing shushes shall show how beneficial Regular Expressions actually are."
    Patterh pattern = Pattern.compile("(\w*(ci|si|sh|su|ti|tu)\w*)", Pattern.CASE_INSENSITIVE);
    Matcher matcher = pattern.matcher(speech);

    while(matcher.find()) {
      System.out.println("%s is a shush sound because of %s.  %n", matcher.group(1), matcher.group(2));
    }
  }
}
```

## The Pattern Class

- [Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html)
- The Pattern class has a bunch of helper methods for working with Regex.
  - `compile` is an important one that allows you to create a reusable Regex, essentially.
- The Pattern class works well in conjunction with the Matcher class.

## The Matcher Class

- The Matcher class also has a bunch of helpers for working with Regex.
  - `pattern.matcher(string)` attaches the matcher to the pattern you defined in `compile`.
  - Using `find` alongside `while` creates a self-terminating while loop. The matcher rolls through the string, using the `compile`d pattern.
- The Matcher class has a `group` method that allows you to access a particular regex group.
  - `group(0)` is the entire string matched by the pattern.
  - `group(n)` would be the nth capture group in the regex pattern.

```java
String speech = "Surely capturing shushes shall show how beneficial Regular Expressions actually are."
Patterh pattern = Pattern.compile("(\w*(ci|si|sh|su|ti|tu)\w*)", Pattern.CASE_INSENSITIVE);
Matcher matcher = pattern.matcher(speech);

while(matcher.find()) {
  System.out.println("%s is a shush sound because of %s.  %n", matcher.group(1), matcher.group(2));
}
```

## Resources

- [Java Pattern Class reference guide](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html)
- [Java 8 Regex Tutorial](https://docs.oracle.com/javase/tutorial/essential/regex/)
- [Regex Tester](https://regex-testdrive.com/en/)
