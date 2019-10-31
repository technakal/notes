# Data Persistence Basics

<!-- TOC -->

- [Data Persistence Basics](#data-persistence-basics)
  - [Relational vs. Non-Relational](#relational-vs-non-relational)
  - [JDCB](#jdcb)
  - [Database Migrations](#database-migrations)

<!-- /TOC -->

- Data persistence is a key component in virtually every application.
- Data persistence and data store persistence play a vital role in application architecture.

## Relational Databases

- Relational databases best fit application where the structure of data is known beforehand, and doesn't change often.
- Non-relational databases are useful for applications that deal with unstructured data.

## JDCB

- In Java applications, a common library for interacting with databases is the Java Database Connectivity (JDBC) library.

## Database Migrations

- Another common task in working with databases is database migration.
- In this course, we'll use Flyway to handle migration.
