# Relational Databases

## Overview

- A relational database is a collection of data items with pre-defined relationships between them.
- Organized as a set of tables with columns and rows.
  - The structure of a table is called a schema.
- Each row in a table can have a unique identifier called a primary key, and rows among multiple tables can be made related using foreign keys.
  - Foreign keys are also known as referential integrity keys.

## SQL

- The primary language for communicating with relational databases is SQL.
- SQL is a declarative, domain-specific language that is specifically designed for managing data held in a relational database management system.
  - SQL is declarative since it only describes the desired results without explicitly listing commands or steps that must be performed.
  - SQL is not general-purpose. It's designed for database interaction.
- SQL statements can be broadly classified into DDL and DML.
  - Data Description Language (DDL) is used for defining database schemas.
    - DDL statements create, modify, and remove database objects such as tables, indexes, and users. Common DDL statements are `CREATE`, `ALTER` and `DROP`.
  - Data Manipulation Language (DML) is used for adding (inserting), deleting, and modifying (updating) data in a relational database. Common DML statements are `INSERT`, `UPDATE` and `DELETE`.

### Characteristics

- In SQL, interactions with the database are called "transactions."
- Transactions are execeuted sequentially, and are executed with independence from other operations.
- Transactions are backed by an "all-or-nothing" approach, called atomicity.
  - With atomicity, an entire transaction must be successful, or SQL will not execute any of it.
  - If one of the statements in the transaction fails, the database is restored to a pre-transaction state.
- Consistency means that all data written to the database must adhere to the rules of the database and maintain referential integrity.
- Another principal of SQL is isolation.
  - Isolation ensures that concurrent execution of transactions leaves the database in the same state that would have been obtained if the transactions were executed sequentially.
  - Isolation is the main goal of concurrency control, the effects of an incomplete transaction might not even be visible to other transactions.
- Durability requires that all of the changes made to the database be permanent once a transaction is successfully completed.
