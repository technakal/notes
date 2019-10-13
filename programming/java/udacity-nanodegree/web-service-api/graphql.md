# GraphQL

<!-- TOC -->

- [GraphQL](#graphql)
  - [Overview](#overview)
    - [Simple GraphQL Example](#simple-graphql-example)
  - [GraphQL Basics](#graphql-basics)
    - [Schema](#schema)
      - [Data Types](#data-types)
      - [Operations](#operations)
        - [Queries](#queries)
        - [Mutations](#mutations)
      - [Example Schema](#example-schema)
    - [Resolver](#resolver)
    - [Mutator](#mutator)
    - [Exception Handling](#exception-handling)
  - [GraphQL in Spring](#graphql-in-spring)
    - [Development Process](#development-process)
    - [Dependencies](#dependencies)
    - [Configure GraphQL](#configure-graphql)
  - [Testing GraphQL](#testing-graphql)
    - [Postman](#postman)
    - [GraphiQL](#graphiql)
    - [Configure GraphiQL](#configure-graphiql)

<!-- /TOC -->

## Overview

- [GraphQL](https://graphql.org/) is a query language for APIs that describes how to ask for data.
- It's generally used to load data from a server to a client.
- It's much more efficient and flexible than a traditional REST API because it allows the calling client to specify exactly what data they want.
  - Also allows data aggregation on the backend from multiple data stores.
  - Traditional REST APIs return all data as specified by the developer.

### Simple GraphQL Example

- Here's a simple GraphQL query.
  - We're calling the `findAllLocations`, and requesting the ID.

```graphql
{
  findAllLocations {
    id
  }
}
```

- And the response data looks like this:

```json
{
  "data": {
    "findAllLocations": [
      {
        "id": 1
      },
      {
        "id": 2
      },
      {
        "id": 3
      }
    ]
  }
}
```

## GraphQL Basics

### Schema

- The GraphQL schema defines the data points and operations offered via the API.
- Defines the:
  - Data types
  - Relationships between data types
  - Operations available, such as queries for retrieving data, and mutations for creating, updating, and deleting data.
- Here's an example schema:
  - This defines a `Location` data type, creates a `findAllLocations` query, and specifies create, update, and delete mutations on Location.

```graphql
type Location {
  id: ID!
  name: String!
  address: String!
}

type Query {
  findAllLocations: [Location]!
}

type Mutation {
  newLocation(name: String!, address: String): Location!
  deleteLocation(id: ID!): Boolean
  updateLocationName(newName: String!, id: ID!): Location!
}
```

- In a single schema, there can be only one root Query and one root Mutation blocks.
- The schema extension is `.graphqls`.
- [Official Schema Docs](https://graphql.org/learn/schema/)

#### Data Types

- Each data type must be typed.
  - You can use any scalar types for this.
  - If you use a complex data type, like a class, it has to correspond exactly to the class you define.
- You can identify required data points using the `!`.
- Fields can be arrays, as well.
  - In GraphQL, you represent an array by wrapping the field in brackets.

```graphql
type Location {
  id: ID!
  name: String!
  address: String
}

type Query {
  findAllLocations: [Location]!
}
```

#### Operations

- GraphQL has two types of Operations: Queries and Mutations.
- [Official Queries Docs](https://graphql.org/learn/queries/)

##### Queries

- Queries retrieve data.
- They return a special object.
- You can do further filtering on that object to only return the data you need, based on the request.
- Keep in mind, when building your queries, that GraphQL allows the client to specity which fields they want.
  - So, with GraphQL, you don't need to create a query for every data-filtering scenario you have.
  - For example, if one use case is to return all Dog names and another to return all Dog breeds, you can accomplish both in your schema by just returning all Dogs. Then, in your client request, you can specify for the first that you only want names, and the second, only breeds.

##### Mutations

- Mutations allow the client to manipulate data.
- Create, update, delete.

#### Example Schema

```graphql
type WoofWoof {
  id: ID!
  name: String!
  breed: String!
  origin: String!
}

type Query {
  findAllWoofWoofs: [WoofWoof]!
  findWoofWoofById(id: ID!): WoofWoof
}

type Mutation {
  deleteWoofWoofById(id: ID!): Boolean
  updateWoofWoofName(newName: String!, id: ID!): WoofWoof!
}
```

### Resolver

- The resolver handles your queries.
- The resolver implements the `GraphQLQueryResolver` class.
- The resolver is flagged as a `@Component` for discoverability.
- Within the resolver, you wire up your repository to the resolver.
- You define, within the resolver, the methods in your GraphQL schema `Query` block.
  - The method names in the resolver must match the method names in your schema.

```java
@Component
public class Query implements GraphQLQueryResolver {

  private WoofWoofRepository woofWoofRepository;

  public Query(WoofWoofRepository woofWoofRepository) {
    this.woofWoofRepository = woofWoofRepository;
  }

  public Iterable<WoofWoof> findAllWoofWoofs() {
    return woofWoofRepository.findAll();
  }

  public Optional<WoofWoof> findWoofWoofById(Long id) {
    return woofWoofRepository.findById(id);
  }

}
```

### Mutator

- The mutator is like the resolver, except it connects your schema mutations with your repository.
- It implements the `GraphQLMutatorResolver`.
- It's a component.
- You define each mutation, making sure the names match the corresponding methods in your schema.

```java
@Component
public class Mutation implements GraphQLMutationResolver {

  private WoofWoofRepository woofWoofRepository;

  public Mutation(WoofWoofRepository woofWoofRepository) {
    this.woofWoofRepository = woofWoofRepository;
  }

  public WoofWoof createNewWoofWoof(String name, String breed) {
    WoofWoof woofWoof = new WoofWoof(name, breed);
    woofWoofRepository.save(woofWoof);
    return woofWoof;
  }

  public Boolean deleteWoofWoofById(Long id) {
    woofWoofRepository.deleteById(id);
    return true;
  }

  public WoofWoof updateWoofWoofName(String newName, Long id) {
    Optional<WoofWoof> optionalWoofWoof = woofWoofRepository.findById(id);

    if(optionalWoofWoof.isPresent()) {
      WoofWoof woofWoof = optionalWoofWoof.get();
      woofWoof.setName(newName);
      woofWoofRepository.save(woofWoof);
      return woofWoof;
    } else {
      throw new WoofWoofNotFoundException("Woof woof not found.", id);
    }
  }
}
```

### Exception Handling

- GraphQL allows for special handling of GraphQL exceptions.
- Creating these custom exceptions is like creating normal custom exceptions, with a couple of differences.
- A custom exception extends the `RuntimeException` class.
- Then, it implements the `GraphQLError` interface.
- The `extensions` field, below, is a `GraphQLError` object that allows you to add additional information to your exception before it is sent back to the client.
  - Here, we're adding the invalid ID.

```java
public class WoofWoofNotFoundException extends RuntimeException implements GraphQLError {

  private Map<String, Object> extensions = new HashMap<>();

  public WoofWoofNotFoundException(String message, Long invalidId) {
    super(message);
    extensions.put("invalidId", invalidId);
  }

  @Override
  public List<SourceLocation> getLocations() {
    return null;
  }

  @Override
  public ErrorType getErrorType() {
    return null;
  }
}
```

## GraphQL in Spring

### Development Process

- Spring Initializr doesn't have a dependency to auto-import, so you have to import it manually.
- Create your application.
- Add the dependencies for GraphQL and GraphQL Tools.
- Add the dependency for GraphiQL.
- Configure GraphQL and GraphiQL in `application.properties`.
- Create your schemas.
- Create your resolver.
- Create your mutator.
- Create your exception handlers.
- Launch and test!

### Dependencies

- Dependencies to add to project:
  - graphql-spring-boot-starter
    - Does a lot of configuration for you.
    - Automatically parses schema files in the classpath.
    - Sets up a POST endpoint.
  - graphql-java-tools
    - Helps with schema parsing.
    - Auto-wires beans for any schema files found on the classpath.

```xml
<dependency>
  <groupId>com.graphql-java</groupId>
  <artifactId>graphql-spring-boot-starter</artifactId>
  <version>5.0.2</version>
</dependency>
<dependency>
  <groupId>com.graphql-java</groupId>
  <artifactId>graphql-java-tools</artifactId>
  <version>5.2.4</version>
</dependency>
```

### Configure GraphQL

- In the application.properties file, add the following tags to configure GraphQL.
- This maps the GraphQl servlet, enables the servlet, and allows CORS.

```text
graphql.servlet.mapping=/graphql
graphql.servlet.enabled=true
graphql.servlet.corsEnabled=true
```

- Note: `graphql.servlet.mapping` must match `graphiql.endpoint`. This is how the two communicate.

## Testing GraphQL

### Postman

- You can test GraphQL through Postman.
- Here are the pertinent details:
  - Create a POST request to the /graphql endpoint.
    - So, if you're on localhost, `http://localhost:8080/graphql`
  - Set `content-type` of the request to `application/json`.
  - Set the body to GraphQL.
    - You can also use JSON, if you prefer, but GraphQL syntax is cleaner to read.
  - Add your query to the body.
  - Hit Send!

### GraphiQL

- Another popular method for testing GraphQL is GraphiQL.
  - You bake this right into your application.
- A simple tool for testing GraphQL applications and APIs.
- Add as a dependency in the `pom.xml`.
  - Version here should match your GraphQL version, I think.

```xml
<dependency>
  <groupId>com.graphql-java</groupId>
  <artifactId>graphiql-spring-boot-starter</artifactId>
  <version>5.0.2</version>
</dependency>
```

- [Github Page](https://github.com/graphql/graphiql)

### Configure GraphiQL

- In the `application.properties` file, configure GraphiQL.
- This enables GraphiQL, adds its endpoint, and maps it.

```text
graphiql.enabled=true
graphiql.endpoint=/graphql
graphiql.mapping=graphiql
```

- Note: `graphiql.endpoint` must match `graphql.servlet.mapping`. This is how the two communicate.
