# Getting Started with JDBC

## Overview

- To use JDBC and Hibernate, you have to include the required Hibernate files.
- These are packaged on [hibernate.org](hibernate.org) as part of the ORM solution.
- We also have to have the necessary database drivers--such as JDBC MySQL driver.

## Installing Hibernate

- If you're not using Maven, you can add the necessary files directly to the `lib` of your project, then import them onto the classpath.
  - To do this in eclipse, right click the solution name and select Properties > Java Build Path > Libraries > Add JARs.
- Once you have Hibernate and your JDBC connector on the class path, you can use them.

## Using JDBC

- No configuration necessary. Just create a `Connection` via the `DriveManager` and get started.

```java
package com.technakal.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;

public class TestJDBC {

  public static void main(String[] args) {

    String jdbcUri = "jdbc:mysql://localhost:3306/hb_student_tracker?useSSL=false&serverTimezone=UTC";
    String user = "hbstudent";
    String pass = "hbstudent";

    try {
      System.out.println("Connecting to hb_student_tracker..." + jdbcUri);
      Connection conn = DriverManager.getConnection(jdbcUri, user, pass);
      System.out.println("Connection successful.");
      System.out.println(conn.getMetaData().getDatabaseProductName());
    } catch(Exception e) {
      e.printStackTrace();
    }

  }

}
```

## Using Hibernate

- Hibernate takes a bit more work.

### Development Process

- Add Hibernate and JDBC connectors to classpath or pom file.
- Add a Hibernate configuration file.
- Add Java class annotations.
- Develop Java code to perform database actions.

### Hibernate Configuration File

- The configuration file defines connection values and details to allow Hibernate to talk to the database.
- It can be written as an XML file or as a .properties file.
- Most of these configuration details are pretty self-explanatory, so I only have notes on the weird ones:
  - `connection.pool_size`
  - `dialect` - Tells Hibernate how to write its SQL queries to talk to the particular brand of SQL database you're working with--PostgreSQL, SQL Server, MySQL, etc.
  - `show_sql` - Logs the SQL Hibernate executes.
  - `current_session_context_class` - Sets the application to use the threaded model.

```xml
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>
  <session-factory>
    <!-- JDBC Database connection settings -->
    <property name="connection.driver_class">com.mysql.cj.jdbc.Driver</property>
    <property name="connection.url">jdbc:mysql://localhost:3306/hb_student_tracker?useSSL=false&amp;serverTimezone=UTC</property>
    <property name="connection.username">hbstudent</property>
    <property name="connection.password">hbstudent</property>
    <!-- JDBC connection pool settings ... using built-in test pool -->
    <property name="connection.pool_size">1</property>
    <!-- Select our SQL dialect -->
    <property name="dialect">org.hibernate.dialect.MySQLDialect</property>
    <!-- Echo the SQL to stdout -->
    <property name="show_sql">true</property>
    <!-- Set the current session context -->
    <property name="current_session_context_class">thread</property>
  </session-factory>
</hibernate-configuration>
```

- There are other configuration details, but these are the basics for getting started.

## Hibernate Annotations

- Hibernate allows class mapping via xml or annotations.
  - Annotations are the modern approach. Forget XML, brah.
- With annotations on a class, we're doing two things:
  - Mapping the class to a database table.
  - Mapping each field to a table column.

### Mapping to a Database Table

- The first step in creating an Entity is to identify it as an entity, and tell Hibernate where it lives in the database.
  - The @Table annotation is only strictly necessary if the class name doesn't match the table name. But, including it makes your intention explicit.

```java
@Entity
@Table(name = "student") // hb_student_tracker.table
public class Student {
  // stuff
}
```

### Mapping Fields to Columns

- Then, you need to tell Hibernate how each field relates to a column in your table.
- You do this with the `@Column` annotation.
  - Remember that every entity also needs an `@Id` annotation, to identify its primary key.
  - Again, `@Column` is only strictly necessary if the field name doesn't match the column name.

```java
@Entity
@Table(name = "student") // hb_student_tracker.table
public class Student {

  @Id // primary key
  @Column(name = "id")
  private int id;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(name = "email")
  private String email;

}
```
