# Getting Started with JDBC

<!-- TOC -->

- [Getting Started with JDBC](#getting-started-with-jdbc)
  - [Overview](#overview)
  - [Installing Hibernate](#installing-hibernate)
  - [Using JDBC](#using-jdbc)
  - [Using Hibernate](#using-hibernate)
    - [Development Process](#development-process)
    - [Hibernate Configuration File](#hibernate-configuration-file)
      - [Logging Additional SQL Content](#logging-additional-sql-content)
  - [Hibernate Annotations](#hibernate-annotations)
    - [Mapping to a Database Table](#mapping-to-a-database-table)
    - [Mapping Fields to Columns](#mapping-fields-to-columns)
  - [Using Entities](#using-entities)
  - [Primary Keys](#primary-keys)
    - [Types of Generation Strategies](#types-of-generation-strategies)

<!-- /TOC -->

## Overview

- To use JDBC and Hibernate, you have to include the required Hibernate files.
- These are packaged on [hibernate.org](hibernate.org) as part of the ORM solution.
- We also have to have the necessary database drivers--such as JDBC MySQL driver.

## Installing Hibernate

- If you're not using Maven, you can add the necessary files directly to the `lib` of your project, then import them onto the classpath.
  - `lib/` goes in the root directory.
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
  - File goes in the `src/` directory.
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

#### Logging Additional SQL Content

- Hibernate logs some details if the `show_sql` option is set to true.
- However, for more logging, you'll need something like `log4j`.
- Here is a [tutorial](https://www.udemy.com/course/spring-hibernate-tutorial/learn/lecture/5835894#overview) to set up additional logging with `log4j`.

## Hibernate Annotations

- Hibernate allows class mapping via xml or annotations.
  - Annotations are the modern approach. Forget XML, brah.
- With annotations on a class, we're doing two things:
  - Mapping the class to a database table.
  - Mapping each field to a table column.
- Note: For these annotations below, you'll want to use the `javax.persistence` package, not the `org.hibernate` package.
  - This is the recommended best practice of the Hibernate team. Their packages implement the interfaces created by `javax.persistence`, and `javax.persistence` is the standard.

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

## Using Entities

- Two important objects in Hibernate implementations are the `SessionFactory` and `Session`.
- `SessionFactory`
  - Reads Hibernate config.
  - Creates `Session` objects.
  - Only create once per application.
    - Heavy-weight object.
- `Session`
  - Wraps a JDBC connection.
  - Main object for interacting with database.
  - Short-lived object.
    - Use, then throw away.
  - Created by the `SessionFactory`.

```java
public static void main(String[] args) {

  SessionFactory factory = new Configuration()
    .configure("hibernate.cfg.xml") // if your file is named "hibernate.cfg.xml", you can omit that argument and just call .configure()
    .addAnnotatedClass(Student.class)
    .buildSessionFactory();

  Session session = factory.getCurrentSession();

  try {

    // create the student object
    Student tempStudent = new Student("John", "Paul", "jp@email.com");

    // start the session
    session.beginTransaction();

    // save the student
    session.save(tempStudent);

    // commit the transaction
    session.getTransaction().commit();

  } catch(Exception e) {

    e.printStackTrace();

  } finally {

    // close session
    session.close();

    // close factory
    factory.close();

  }

}
```

## Primary Keys

- `@Id` marks an entity field as the primary key.
- You can let hibernate decide how to assign the key, or you can tell it explicitly how to generate it.
  - If you don't add a generation type, it'll use the appropriate method of your database implementation.
  - If you want to be explicit, you can use the `@GeneratedValue(strategy = GenerationType.X)` annotation.

```java
// implicit
@Id
@Column(name = "id")
private int id;

// explicit
@Id
@GenerationType(strategy = GenerationType.IDENTITY)
@Column(name = "id")
private int id;
```

### Types of Generation Strategies

- AUTO
  - Hibernate selects the appropriate strategy, based on the database.
- IDENTITY
  - Assigns the primary key using the IDENTITY column of the database.
- SEQUENCE
  - Assigns the primary key using a database sequence
- TABLE
  - Assigns the primary key using an underlying table to ensure uniqueness.
- Custom
  - You can also generate your own custom identity generator using Java code.
  - Create an implementation of the `org.hibernate.id.IdentifierGenerator`.
  - Within this, override the `Serializable generator` method.
