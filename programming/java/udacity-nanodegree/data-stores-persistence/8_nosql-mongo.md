# NoSQL and Mongo

<!-- TOC -->

- [NoSQL and Mongo](#nosql-and-mongo)
  - [Overview](#overview)
  - [NoSQL Basics](#nosql-basics)
  - [MongoDB](#mongodb)
  - [Documents](#documents)
    - [Document Example](#document-example)
  - [Installing Mongo](#installing-mongo)
  - [Basic Mongo Stuff](#basic-mongo-stuff)
  - [Embedding Documents](#embedding-documents)

<!-- /TOC -->

## Overview

- Data is not organized by rows and columns.
- Relationships between data may not be possible.
- No organized schema.
- A NoSQL database is self-describing and has a dynamic schema for unstructured data. They're flexible.
- This flexibility means you can create documents without having to first define their structure.
  - Each document can have its own unique structure.
  - The syntax can vary from database to database.
  - You can add fields as you go.

## NoSQL Basics

- Data is stored in many ways: it can be column-oriented, document-oriented, graph-based or organized as a key-value store.
  - Some types of NoSQL store data in key-value pairs. Riak and Redis are two examples.
  - Some types are called Document Stores.
    - These pair each key with a document.
      MongoDB is an example.
  - Column-Based Stores store information in columns.
    - Optimized for queries over large datasets.
    - Cassandra and HBase are examples.
  - Graph-based databases use edges and nodes to represent and store data.
    - Network database.
    - Neo4j is an example.

## MongoDB

- Built to scale and store lots of data.
- Follows the Client-Server model.
- Data is organized in documents, which are a collection of key-value pairs.

- Documents are organized into collections.
- A set of collections are a database.
- To relate it to a relational database, here's how Mongo stacks up:

| Relational | MongoDB    |
| ---------- | ---------- |
| Database   | Database   |
| Table      | Collection |
| Row        | Document   |
| Column     | Field      |

## Documents

- Collections of key-value pairs.
  - Values can be scalar, arrays, or other documents.
- Stored in BSON, or Binary JSON.
  - Very similar to JSON format, but stored in binary.
  - [More info on BSON](https://docs.mongodb.com/manual/reference/glossary/#term-bson)
- The advantages of using documents are:
  - Documents (i.e. objects) correspond to native data types in many programming languages.
  - Embedded documents and arrays reduce need for expensive joins.

### Document Example

```mongo
{
  _id: ObjectId("4904803df364948bd2f45896"),
  name: {
    first: "Alan",
    last: "Turing"
  },
  birth: new Date('June 23, 1912'),
  death: new Date('June 07, 1954'),
  contribs: [
    "Turing machine",
    "WWII victory"
  ]
}
```

## Installing Mongo

- Follow the [Mongo directions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#run-mdb-edition-from-the-command-interpreter).
- Start an instance of the mongod.exe.

```shell
> "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath "C:\Program Files\MongoDB\Server\4.2\data"
```

- Start a mongo.exe shell.

```shell
> "C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"
```

- Create a new user.

```shell
> db.createUser({"user": "dev_user", "pwd": "password", "roles": ["readWrite", "dbAdmin"]});
```

## Basic Mongo Stuff

- Create a database:

```shell
> use [database_name];
```

- Insert a new document

```shell
db.members.insert( { message: "Hello!" } );
```

- Inserting many documents.
  - You can also use the `db.members.insertMany()` method.

```shell
db.members.insert([{
  first_name: "Jane",
  last_name: "Doe",
  age: 45,
  gender: "female",
  interests: ["pilates","swim","crossfit"],
  balance: 125.20,
  address: {
      street: "123 Main St",
      city: "Birmingham",
      state: "AL"
  }
},
{
  first_name: "Rahul",
  last_name: "Mani",
  age: 18,
  gender: "male",
  interests: ["swim"],
  balance: 250,
  address: {
      street: "41 Second Ave",
      city: "Indianapolis",
      state: "IN"
  }
}
]);
```

- Retrieving all

```shell
db.members.find();
```

- Querying

```shell
# normal value
db.members.find({ first_name: "Noel" });

# array value
db.members.find({ hobby: "swimming" });

# object value
db.members.find({ "address.state": "IA" });
```

- AND/OR

```shell
db.members.find({$and: [{ first_name: "Noel", last_name: "Keener" }]}).pretty();
db.members.find({$or: [{ first_name: "Noel", last_name: "Keener" }]}).pretty();
```

- Beautifying output using `.pretty()`

```shell
db.members.find({ "address.state": "IA" }).pretty();
```

- sorting

```shell
db.members.find().sort({ last_name: 1 }).pretty(); # 1 for ascending, -1 for descending
```

## Embedding Documents

- One of the main decisions to make when data modeling with Mongo is whether to embed or reference sub-documents.
  - Embedding means the parent document contains all of the information of the child document within itself.
  - Referencing means the child document exists outside of the parent, and the parent just references it.
- Here are some questions for determining how to structure child documents:

  - Does the parent document _contains_ the child document? Is it a one-to-one relationship?
    - Like an address on a customer file. It's the parent's address.
  - Is the relationship one-to-many, such that the many wouldn't make sense without the one?
    - Like a patient and their doctor visit records. The visits only make sense in relation to the patient.
  - Would embedding the data result in data duplication?
  - Is it a complex, many-to-many relationship?
    - Like a movie and its cast. The cast could appear in many movies, so it makes sense that they would be referenced by the movies, rather than duplicated throughout the movies.

- Embedded

```json
{
  "name": "Jane Doe",
  // address is contained within the parent document of customer
  "address": {
    "line1": "123 Main Street",
    "city": "Birmingham",
    "state": "AL"
  }
}
```

- Referenced Artist Collection

```json
{
  "_id": "abc123",
  "name": "Brad Pitt",
  "gender": "male",
  "age": 51
}

{
  "_id": "abc124",
  "name": "Morgan Freeman",
  "gender": "male",
  "age": 70
}

{
  "_id": "abc125",
  "name": "Gwyneth Paltrow",
  "gender": "female",
  "age": 46
}
```

- Referenced Movie Collection
  - References Artist Collection

```json
{
  "_id": "12345"
  "title": "Seven"
  "cast": ["abc123", "abc124", "abc125"]
}
{
  "_id": "12346"
  "title": "Fight Club"
  "cast": ["abc123"]
}
```
