# Java Local Environment

- [Java Local Environment](#java-local-environment)
  - [Overview](#overview)
    - [Java Environment](#java-environment)
  - [JVM Properties](#jvm-properties)
    - [ClassPath](#classpath)
    - [.jar Files](#jar-files)
  - [Installing the JDK](#installing-the-jdk)
  - [Glossary](#glossary)

## Overview

This document is about setting up the local environment for development in Java.

### Java Environment

- Here's a map of the Java development environment. Java is made up of the JDK and JRE.
  - The JDK contains the JRE.
    - There are [multiple JDKs](https://en.wikipedia.org/wiki/Java_Development_Kit#Other_JDKs) available. Oracle JDK is the "official" one.
  - The JRE contains the Java SE API or Java Class Library.
  - The Java Class Library contains all of the baked in Java Classes, like List, Map, etc.

```
- Java -|
        |- JDK -|
                |- JRE -|
                        |- Java SE API/JCL -|
                                            | - Collections, Packages
```

- In addition to the above, there is also the Java Virtual Machine (JVM), which allows Java to run on any platform.
  - In compilation, Java code is converted to Java Bytecode.
  - Java Bytecode can be executed anywhere that has the JVM installed.
  - The same bytecode that runs on Windows can run on Mac, Android, Linux, etc., as long as that platform has JVM support.

## JVM Properties

- You can access properties of the JVM dynamically using the `System.getProperty()` and `System.getProperties()` methods.
- Here's an example of each method:

```java
package com.teamtreehouse;

import java.util.Set;
import java.util.TreeSet;

public class Systemizer {

  public static void main(String[] args) {
    // getProperty()
    System.out.printf("This is the classpath: %s %n", System.getProperty("java.class.path"));

    // getProperties()
    Set<String> propNames = new TreeSet<>(System.getProperties().stringPropertyNames());
    for(String propName : propNames) {
      System.out.printf("%s is %s. %n", propName, System.getProperty(propName)); // getProperty() again
    }
  }
}
```

### ClassPath

- Java has a property called the class path that contains the directory information for the current class.
- You can access it in a program using the following:

```java
System.getProperty("java.class.path");
```

- You can also access it during execute using the -cp property:

```shell
java -cp ~/workspace/ com.teamtreehouse.Systemizer
```

### .jar Files

- Finally, you can access a bunch of them in a `.jar` file.

## Installing the JDK

- Here's a [guide](http://treehouse.github.io/installation-guides/windows/jdk-windows.html) for installing the JDK.
- If you need to update your JDK, use the Java Console application.

## Glossary

- SDK - Software Development Kit - A grouping of tools that allow you to create software locally. Also some times referred to as devkits.
- JDK - Java SE Development Kit - A set of tools specifically for developing Java SE Applications.
- Java SE - Standard Edition.
- JRE - Java Runtime Environment - A minimum set of tools that allow local Java programs to execute.
- Java SE API - Application Programming Interface - A set of libraries provided to build applications.
- JCL - Java Class Library - A synonym for the Java SE API. More info here.
- JVM - Java Virtual Machine - an abstract computing machine.
- WORA - Write Once Run Anywhere - Java can be compiled into bytecode and run on any device that has a JVM.
- JIT - Just In Time compilation - A final compilation step that converts bytecode to native machine code during runtime startup.
