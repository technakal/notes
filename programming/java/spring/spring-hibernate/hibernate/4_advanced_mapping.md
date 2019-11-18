# Hibernate Advanced Mapping

<!-- TOC -->

- [Hibernate Advanced Mapping](#hibernate-advanced-mapping)
  - [Overview](#overview)
  - [Entity Lifecycle](#entity-lifecycle)
  - [Relationships](#relationships)
    - [One to One Mapping](#one-to-one-mapping)
      - [Development Process](#development-process)
      - [One To One Unidirectional](#one-to-one-unidirectional)
      - [One to One Bidirectional](#one-to-one-bidirectional)
    - [One To Many Mapping](#one-to-many-mapping)
    - [Many to One Mapping](#many-to-one-mapping)
    - [Many to Many Mapping](#many-to-many-mapping)
  - [Database Setup](#database-setup)
    - [Primary and Foreign Keys](#primary-and-foreign-keys)
    - [Cascading](#cascading)
      - [Configuring Cascade Type](#configuring-cascade-type)
    - [Lazy Loading](#lazy-loading)
      - [Directionality](#directionality)

<!-- /TOC -->

## Overview

- Hibernate has more advanced features for managing data, beyond the basic CRUD operations.
- Advanced mapping includes things like defining relationships between entities, building co-retrieval processes for related entities, joining tables, etc.
- The advanced annotations are:
  - `@OneToOne`
  - `@OneToMany`
  - `@ManyToOne`
  - `@ManyToMany`
- To take advantage of these capabilities, the database needs to use primary and foreign keys.

## Entity Lifecycle

- Entities have a number of states they move through in the Hibernate workflow.

| Operation | Description                                                                         |
| --------- | ----------------------------------------------------------------------------------- |
| Detach    | Entity not associated with a hibernate session.                                     |
| Merge     | Attaches an entity to a hibernate session.                                          |
| Persist   | Transitions entity to a managed state. Next flush/commit will save to the database. |
| Remove    | Removes a managed entity from the database on the next flush/commit.                |
| Refresh   | Reloads the entity from the database to make sure state isn't stale.                |

![Entity Lifecycle](./entity-lifecycle.png)

## Relationships

### One to One Mapping

- One to one means the left-hand and right-hand entities are related exclusively to one another.
  - An Instructor has an Instructor Detail.
  - The Instructor does not have more than one Instructor Detail.
  - The Instructor Detail does not belong to any other Instructor.

![One to One Relationship](./one-to-one.png)

#### Development Process

1. Define database tables and setting up table relationships.
2. Create entity classes.
3. Add relational annotations for `@OneToOne` and `@JoinColumn`.
4. Use the entities.

#### One To One Unidirectional

- Add the `@OneToOne` annotation to the foreign key field in the primary entity.
- Add the `@JoinColumn` annotation to the foreign key field of the primary entity, and give it the `name` of the foreign key column.

```java
// note: the instructor detail entity looks no different from a normal hibernate entity. Since this is unidirectional, it has no new annotations--those are all handled in the instructor, below.

// instructor entity
@Entity
@Table(name = "instructor")
public class Instructor {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(name = "email")
  private String email;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "instructor_detail_id") // points to the column in the instructor table that is a foreign key, as defined in the database schema
  private InstructorDetail instructorDetail;

  public Instructor() {}

  /**
   * @param firstName
   * @param lastName
   * @param email
   */
  public Instructor( String firstName, String lastName, String email ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  // more code

}

```

- Since cascade is set to all, you only have to associate the entities in the Java code. Then, doing something to the instructor will do the same to the other.

```java
public class CreateDemo {

  public static void main(String[] args) {

    // create session factory
    SessionFactory factory = new Configuration()
      .configure("hibernate.cfg.xml")
      .addAnnotatedClass(Instructor.class)
      .addAnnotatedClass(InstructorDetail.class)
      .buildSessionFactory();

    // create session
    Session session = factory.getCurrentSession();

    // use session
    try {

      // create objects
      Instructor instructor = new Instructor("Chad", "Darby", "darby@luv2code.com");

      InstructorDetail instructorDetail = new InstructorDetail("https://luv2code.come/youtube", "writing code");

      // relate the objects

      instructor.setInstructorDetail( instructorDetail );

      System.out.println( "Instructor and details created:" + instructor );

      // start transaction

      session.beginTransaction();

      // save objects

      System.out.println( "Saving the instructor..." );
      System.out.println( "Cascade Type == ALL." );
      System.out.println( "Saving instructor details..." );
      session.save(instructor);

      // commit transaction

      session.getTransaction().commit();
      System.out.println( "Instructor and details saved..." );

    } finally {

      // close factory
      factory.close();
      System.out.println("Session closed...");

    }

  }

}

```

#### One to One Bidirectional

### One To Many Mapping

- One to many means the left-hand entity can be related to multiple of the right-hand entity.
  - An Instructor can have multiple Courses.
  - The Instructor is not limited to one Course.
  - Each Course can only have one Instructor, though.

![One to Many Relationship](./one-to-many.png)

### Many to One Mapping

- Many to one means the left-hand entity can be related to one right-hand entity, but the right-hand entity can be related to multiple left-hand entities.
  - It's the One to Many relationship, just coming from the other perspective.
  - A Course can have only one Instructor, but multiple Courses could have the same Instructor.

![Many to One Relationship](./many-to-one.png)

### Many to Many Mapping

- Many to many means both sides of the relationship can have multiple of their inverse.
  - A Student can have multiple Courses.
  - Each Course can have multiple Students.

![Many to Many Relationship](./many-to-many.png)

## Database Setup

### Primary and Foreign Keys

- Primary uniquely identify a row in a table.
- Foreign keys link one table to another.
  - A foreign key in Table A links to the primary key in Table B.

### Cascading

- Cascading means applying the same operation to related entities.
  - For example, if you save Instructor, it can cascade that operation and save the related Instructor Detail.
  - Similarly, deleting an Instructor deletes the related Instructor Detail.
    - This is called a CASCADE DELETE
- Hibernate allows us to configure cascade.
  - By default, no cascading is applied.

| Type    | Description                                                   |
| ------- | ------------------------------------------------------------- |
| Persist | Related entities are saved together.                          |
| Remove  | Related entities are deleted together.                        |
| Refresh | Related entities are refreshed from the database together     |
| Detach  | Related entities are removed from the managed state together. |
| Merge   | Related entities are added to the managed state together.     |
| All     | All cascade operations apply to the related entities.         |

#### Configuring Cascade Type

- Add the `(cascade = CascadeType.X)` to the mapping annotation.

```java
@OneToOne(cascade = CascadeType.ALL)
@JoinColumn(name = "instructor_detail_id")
private InstructorDetail instructorDetail;
```

- You can specify multiple cascade types by using a comma-dilimted list.

```java
@OneToOne(cascade = {
  CascadeType.MERGE,
  CascadeType.REMOVE,
  CascadeType.REFRESH
})
@JoinColumn(name = "instructor_detail_id")
private InstructorDetail instructorDetail;
```

### Lazy Loading

- Lazy loading is about retrieving data that has related entities.
- "If we retrieve an Instructor", lazy loading asks, "should we also retrieve the Instructor Detail?"
- `LAZY` retrieves only what's requested.
- `EAGER` retrieves everything related to the retrieved entity.

#### Directionality

- In loading, there's a concept called directionality.
- Unidirectional
  - In unidirectional, the relationship is defined one way.
  - Loading the owner entity loads the other.
- Bidirectional
  - In bidirectional, the relationship flows both ways.
  - Loading either entity loads the other.
