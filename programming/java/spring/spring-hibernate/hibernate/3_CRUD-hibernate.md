# CRUD in Hibernate

<!-- TOC -->

- [CRUD in Hibernate](#crud-in-hibernate)
  - [Saving (Creating) Objects with Hibernate](#saving-creating-objects-with-hibernate)
  - [Retrieving Data with Hibernate](#retrieving-data-with-hibernate)
    - [Querying](#querying)
  - [Updating Data with Hibernate](#updating-data-with-hibernate)
  - [Deleting Objects with Hibernate](#deleting-objects-with-hibernate)

<!-- /TOC -->

## Saving (Creating) Objects with Hibernate

- You create your objects with Java code, then use Hibernate to save them.
- To do this, you'll use the `Session`'s `save()` method.

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

## Retrieving Data with Hibernate

- To retrieve an object from the database, you use `session.get()`.
  - This retrieves an object via its primary key.
  - If an object matching the primary key is not found, Hibernate will return `null`.

```java
// open transaction
session.beginTransaction();

// create student
System.out.println("Retrieving student object...");
Student student = session.get(Student.class, id);

if(student == null) {
  System.out.println( "No student found with id " + id );
} else {
  System.out.println("Student retrieved.");
  System.out.println(student.toString());
}

// commit the transaction
session.getTransaction().commit();
```

### Querying

- You can also use Hibernate for more advanced querying.
- Uses Hibernate Querying Language (HQL).
- Very similar to SQL, with `where`, `like`, `order by`, `join`, etc.

- Retrieve \* From Table:

```java
List<Student> students = session
                          .createQuery("from Student") // use Java class name
                          .getResultList();
```

- Adding the `where`

```java
List<Student> students = session
                          .createQuery("from Student s where s.lastName = 'Fist'") // use object property name, not table column name.
                          .getResultList();
```

- More complicated `where`

```java
List<Student> students = session
                          .createQuery("from Student s where s.lastName = 'Fist'"
                                       + " OR s.firstName = 'Noel'")
                          .getResultList();
```

- Using `like` and wildcard find

```java
List<Student> students = session
                          .createQuery("from Student s where s.email like '%email.com'")
                          .getResultList();
```

- In earlier versions of HQL, the `.getResultList()` was just `.list()`.
  - This was deprecated in version 5.2, but you might see it in the wild.

## Updating Data with Hibernate

- To update data with Hibernate, you simply retrieve the object from the database, use the object's own setter methods, and then commit the revised object to the database.
  - No need to call `save()` or `update()`.

```java
// get the student
Student myStudent = session.get(Student.class, studentId);

// update the student using setter
myStudent.setEmail("newU@email.com");

// commit the revised student
session.getTransaction().commit();
```

- If you want to bulk update, you can do so with a Hibernate query.
  - Use the `createQuery()` and `executeUpdate()` methods on the session object.
  - `commit` the transaction.

```java
session.createQuery("update Student set email = 'fakeemail@email.com' where id = 5")
      .executeUpdate(); // actually performs the query.

session.getTransaction().commit();
```

## Deleting Objects with Hibernate

- There are two ways to delete an object in Hibernate.
  - You can delete it by passing the object into the `session.delete()` method.
    = You can delete it directly from the database by writing and executing a delete query.
- Deleting objects via the `delete()` method.
  - Select the object.
  - Call `delete(object)` on the `session`.
  - `getTransaction` and `commit`.

```java
int studentId = 1;

// retrieve the student
Student student = session.get(Student.class, studentId);

// delete the student
session.delete(student); // will delete the student with id == 1

// apply to the database
session.getTransaction().commit();
```

- Deleting objects directly in the database
  - Use `createQuery` on the session.
  - In the query, use the `delete` syntax.
  - `executeUpdate` to apply it to the database.
  - `commit` the transaction.

```java
session.createQuery("delete from Student where id = 1")
      .executeUpdate();

session.getTransaction().commit();
```

- When deleting related entities, if your cascade type doesn't include REMOVE, you'll have to manually break the relationship between the two entities before running the `delete()` method.
  - Note that, below, the CascadeType does not include REMOVE.

```java
instructorDetail.getInstructor().setInstructorDetail( null ); // removes the link
session.delete(instructorDetail);
```
