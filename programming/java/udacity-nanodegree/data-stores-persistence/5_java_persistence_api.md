# Java Persistence API

- Java Persistence API (JPA) allows you to interact with a database in your Java code, without explicitly writing select/insert/update queries.
  - In a sense, it allows you to say, "I want to get this Java object from the database" or "I want to save this object to the database", and then it handles translating that to SQL.
  - It does this through Object Relational Mapping (ORM), which involves mapping Java objects to their corresponding relational tables (and vice versa).
- Spring also offers some shortcuts to integrating JPA, through the Spring Data library.

## Overview

- JPA is a Java package for accessing, persisting, and managing data between Java objects and a relational database.
- JPA allows for contract free objects, defined through annotations or XML.

## Features of JPA

- Can perform Create, Read, Update and Delete, without using SQL.
- Can manage relationships between objects.
- Can write queries using a specialized JPA query language.

## Entities

- One of the key concepts in JPA is the Entity.
  - An entity is a lightweight persistence domain object.
  - Typically, an entity represents a table in a relational database, and each entity instance corresponds to a row in that table.
  - Entities are typically represented in Java as entity classes, though they can be helper classes too.
- The persistent state of an entity is represented through either persistent fields or persistent properties.
  - These fields or properties use object/relational mapping annotations to map the entities and entity relationships to the relational data in the underlying data store.
