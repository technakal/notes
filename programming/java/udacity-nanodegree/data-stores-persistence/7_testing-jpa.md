# Testing JPA

<!-- TOC -->

- [Testing JPA](#testing-jpa)
  - [Spring Boot Testing](#spring-boot-testing)
    - [Adding H2](#adding-h2)
    - [Creating Tests](#creating-tests)
  - [More Resources](#more-resources)

<!-- /TOC -->

## Spring Boot Testing

- Spring Boot provides the `@DataJpaTest` annotation to aid in testing our database testing.
  - This annotation requires at least version 4.12 of JUnit.
- This uses the H2 temp database, so you don't have to worry about manipulating real data.
- By default, the application context containing all the test components, including the in-memory database, is shared between all test methods within all `@DataJpaTest`-annotated test classes.
  - This is why, by default, each test method runs in its own transaction, which is rolled back after the method has executed. This way, the database state stays pristine between tests and the tests stay independent of each other.

### Adding H2

- To add a temp datastore, add this to your pom file.

```xml
<dependency>
  <groupId>com.h2database</groupId>
  <artifactId>h2</artifactId>
  <version>1.4.199</version>
</dependency>
```

### Creating Tests

- Tests are pretty simple to create.
  - Create a test class to hold your tests.
  - Annotate the test class with `@RunWith(SpringRunner.class)` and `@DataJpaTest`
  - Within the class, use the `@Autowired` annotation to create a `DataSource`, `JdbcTemplate`, `EntityManager`, `TestEntityManager`, and whatever repositories you need for your tests.
  - Run your tests.
- Here are three example tests:

- Testing `AuthorRepository`
  - I left the imports on only this first example, so you can remember what they are.

```java
package com.technakal;

import com.technakal.entity.Author;
import com.technakal.repository.AuthorRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityManager;
import javax.sql.DataSource;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@DataJpaTest
public class AuthorRepositoryTest {

  @Autowired private DataSource dataSource;
  @Autowired private JdbcTemplate jdbcTemplate;
  @Autowired private EntityManager entityManager;
  @Autowired private TestEntityManager testEntityManager;
  @Autowired private AuthorRepository authorRepository;

  @Test
  public void injectedComponentsAreNotNull() {
      assertThat(dataSource).isNotNull();
      assertThat(jdbcTemplate).isNotNull();
      assertThat(entityManager).isNotNull();
      assertThat(testEntityManager).isNotNull();
      assertThat(authorRepository).isNotNull();
  }

  @Test
  public void testFindByLastName() {

      // create test entity
      Author author = new Author("Nathan", "Ballingrud");
      System.out.println("technakal | Author: " + author);

      // persist the entity
      System.out.println("technakal | Persisting author.");
      entityManager.persist(author);

      // retrieve the entity
      System.out.println("technakal | Retrieving author.");
      Optional<Author> actual = authorRepository.findByLastName("Ballingrud");

      // run tests
      System.out.println("technakal | Running tests...");
      assertThat(actual).isNotNull();
      assertEquals(author.getId(), actual.get().getId());

  }

}

```

- Testing `BookRepository`

```java
@RunWith(SpringRunner.class)
@DataJpaTest
public class BookRepositoryTest {

    @Autowired private DataSource dataSource;
    @Autowired private JdbcTemplate jdbcTemplate;
    @Autowired private EntityManager entityManager;
    @Autowired private TestEntityManager testEntityManager;
    @Autowired private BookRepository bookRepository;

    @Test
    public void injectedComponentsAreNotNull() {
        assertThat(dataSource).isNotNull();
        assertThat(jdbcTemplate).isNotNull();
        assertThat(entityManager).isNotNull();
        assertThat(testEntityManager).isNotNull();
        assertThat(bookRepository).isNotNull();
    }

    @Test
    public void testFindByPublicationYear() {

        // create test entity
        Author author = new Author("Nathan", "Ballingrud");
        Book book = new Book();
        book.setTitle("The Visibile Filth");
        book.setAuthor(author);
        book.setPublisher("This Is Horror");
        book.setPublicationYear(2015);
        System.out.println("technakal | Created book: " + book);

        // persist entity
        System.out.println("technakal | Persisting book...");
        entityManager.persist(book);

        // retrieve the entity from the datastore
        Optional<Book> actual = bookRepository.findByPublicationYear(book.getPublicationYear());

        // run tests
        System.out.println("technakal | Running tests...");
        assertThat(actual).isNotNull();
        assertEquals(book.getId(), actual.get().getId());
    }

}
```

- Testing Cascading

```java
@RunWith(SpringRunner.class)
@DataJpaTest
public class AppTest {

    @Autowired private DataSource dataSource;
    @Autowired private JdbcTemplate jdbcTemplate;
    @Autowired private EntityManager entityManager;
    @Autowired private TestEntityManager testEntityManager;
    @Autowired private AuthorRepository authorRepository;
    @Autowired private BookRepository bookRepository;

    @Test
    public void injectedComponentsAreNotNull() {

        assertThat(dataSource).isNotNull();
        assertThat(jdbcTemplate).isNotNull();
        assertThat(entityManager).isNotNull();
        assertThat(testEntityManager).isNotNull();
        assertThat(authorRepository).isNotNull();
        assertThat(bookRepository).isNotNull();

    }

    @Test
    public void testCascade() {

        // create the entities
        Author author = new Author("Nathan", "Ballingrud");
        System.out.println("technakal | Created author: " + author);
        Book book = new Book();
        book.setTitle("The Visibile Filth");
        book.setAuthor(author);
        book.setPublisher("This Is Horror");
        book.setPublicationYear(2015);
        System.out.println("technakal | Created book: " + book);

        // persist entity
        System.out.println("technakal | Persisting data...");
        entityManager.persist(book);

        // retrieve the entities
        Optional<Book> actualBook = bookRepository.findByPublicationYear(book.getPublicationYear());
        Author actualAuthor = actualBook.get().getAuthor();

        // run tests
        System.out.println();
        assertThat(actualBook).isNotNull();
        assertThat(actualAuthor).isNotNull();
        assertEquals(book.getAuthor(), actualAuthor);
        assertEquals(actualBook.get().getAuthor(), author);
    }

}
```

## More Resources

- [Spring Boot Testing](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-testing.html)
- [Spring Runner](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/test/context/junit4/SpringRunner.html)
- [Run With](http://junit.sourceforge.net/javadoc/org/junit/runner/RunWith.html)
