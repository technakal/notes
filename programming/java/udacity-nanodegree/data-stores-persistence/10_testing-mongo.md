# Testing Mongo DB in Spring Boot

## Overview

- We can easily test Mongo in Spring Boot using an embedded MongoDB instance.
- Instead of H2, in this case, we'll use Flapdoodle Embed.

## Using Flapdoodle

- Add flapdoodle to your pom file.

```xml
<dependency>
  <groupId>de.flapdoodle.embed</groupId>
  <artifactId>de.flapdoodle.embed.mongo</artifactId>
  <scope>test</scope>
</dependency>
```

- Add JUnit 5 Jupitor to the pom.

```xml
<dependency>
  <groupId>org.junit.jupiter</groupId>
  <artifactId>junit-jupiter-api</artifactId>
  <version>5.4.2</version>
  <scope>test</scope>
</dependency>
<dependency>
  <groupId>org.junit.jupiter</groupId>
  <artifactId>junit-jupiter-engine</artifactId>
  <version>5.4.2</version>
  <scope>test</scope>
</dependency>
```

- On your test class, add the `@DataMongoTest`.
- Add the `@ExtendWith(SpringExtension.class)` from JUnit.
