# Using Mongo in Java

## Mongo-Related Classes

- Mongo in Java is suppored by four primary classes:
  - `MongoClient`
    - Controls the connection to the database.
  - `MongoDatabase`
    - The class representing the Mongo database.
  - `MongoCollection`
    - Allows interaction with a particular collection on the database.
  - `Document`
    - Represents the actual Mongo document you're working with.
- With these classes, you can perform all of the normal actions you'd expect when working with Mongo.
- Here's an example of using these classes to create a collection, use that collection, and create, retrieve, update, and delete documents within that collection.

```java
public class MongoTest {

  public static void main(String[] args) {

    // get our uri
    String uri = "mongodb://dev_user:password@localhost:27017/admin";

    // create our client
    MongoClient client = MongoClients.create(uri);

    // get our database
    MongoDatabase database = client.getDatabase("jdnd-c3");

    // create our collection
    database.createCollection("authors");

    // get our new collection
    MongoCollection<Document> authors = database.getCollection("authors");

    // create author documents
    Document author1 = new Document()
            .append("first_name", "Marcus")
            .append("last_name", "Borg");
    Document author2 = new Document()
            .append("first_name", "Nathan")
            .append("last_name", "Ballingrud")
            .append("birth_year", 1970)
            .append("sex", "male");
    Document author3 = new Document()
            .append("first_name", "Stephen")
            .append("last_name", "King")
            .append("birth_year", 1947)
            .append("sex", "male");

    // add authors to the collection
    authors.insertOne(author1);
    authors.insertMany(new ArrayList<Document>() {
      {
        add(author2);
        add(author3);
      }
    });

    // get an author's id
    ObjectId _id = author1.getObjectId("_id");

    // replace an author with one that has more detail
    authors.replaceOne(
            new Document("_id", _id),
            new Document()
                .append("first_name", "Marcus")
                .append("last_name", "Borg")
                .append("gender", "male")
                .append("birth_year", 1935)
    );

    // update the field "gender" to "sex"
    authors.updateOne(
            new Document("_id", _id),
            new Document()
                .append("$rename", new Document("gender", "sex"))
    );

    // do an upsert on an author
    authors.replaceOne(
            new Document("first_name", "Ao"),
            new Document()
                .append("first_name", "Ao")
                .append("last_name", "Jyumonji")
                .append("sex", "male"),
            new ReplaceOptions().upsert(true)
    );

    // delete an author
    // authors.deleteOne(new Document("first_name", "Ao"));

    client.close();
  }
}
```

- And here's an example on various methods to retrieve documents:

```java
public class MongoMemberTest {

  public static void main(String[] args) {

    String uri = "mongodb://dev_user:password@localhost:27017/jdnd-c3";

    // create client
    MongoClient client = MongoClients.create(uri);

    MongoDatabase db = client.getDatabase("jdnd-c3");

    MongoCollection<Document> members = db.getCollection("members");

    // find the first person with last name Khan
    Document khan = members.find(new Document("last_name", "Khan")).first();
    System.err.println(khan);

    // find the first female with last name Doe
    Document femDoe = members.find(
        new Document()
            .append("last_name", "Doe")
            .append("gender", "female")
    ).first();
    System.err.println(femDoe);

    // find all who are golfers
    FindIterable<Document> golfers = members.find(new Document("interests", "golf"));
    for(Document golfer : golfers) {
      System.err.println(golfer);
    }

    // find all who live in MN
    FindIterable<Document> fargoers = members.find(new Document("address.state", "MN"));
    for(Document ohsure : fargoers) {
      System.err.println(ohsure);
    }

    // count males
    long malesCount = members.countDocuments(new Document("gender", "male"));
    System.err.println("There are " + malesCount + " males.");

    // find first female, sorted by first name
    Document firstFemale = members.find(new Document("gender", "female")).sort(new Document("first_name", 1)).first();
    System.err.println(firstFemale);

    // close client
    client.close();
  }

}
```

## Mongo and Spring Boot

### Mongo and Objects

- There is no unified interface for non-relational databases in Java.
  - Mongo Driver doesn't have an implementation of JDBC.
  - However, the Driver can perform normal CRUD activities, including casting to objects.
  - Spring also provides the Spring Data MongoDB package, which works with MongoDB to simplify your life.
- [Getting started guide](https://spring.io/guides/gs/accessing-data-mongodb/).

### Using in Spring

- Add the [Spring Data MongoDB](https://docs.spring.io/spring-data/mongodb/docs/2.1.9.RELEASE/reference/html/#introduction) to your pom.

```xml
<dependency>
  <groupId>org.springframework.data</groupId>
  <artifactId>spring-data-mongodb</artifactId>
  <version>2.1.10.RELEASE</version>
</dependency>
```

- Configure the MongoDB connection in `application.properties`.
  - `spring.data.mongodb.uri=mongodb://dev_user:password@localhost:27017/jdnd-c3`
- Create your classes, which correspond with your retrieved `Documents`.
- Create your repository, extending the `MongoRepository`.
  - Configure your custom queries here.
- On your spring application, add the `@EnableMongoRepositories` annotation.

### Creating Document Classes

- Just like with SQL, a class can be annotated to talk to Mongo easily.
- Add the `@Document` annotation, and pass in the `name` of the collection.
- Add the `@Id` annotation.
- Add the fields corresponding with your Document's data.
  - No annotations necessary.
  - Unlike with SQL, Mongo won't translate your fields. Whatever the fields are called, with the exception of ID, in the class is what they'll be called in the database.
    - `firstName != first_name`, `firstName == firstName`.
- Note: Mongo will insert a \_class field in your MongoDB. This contains the fully qualified classname so that Mongo and Spring can create the right class.

### Example

- Member Class

```java
package com.udacity.course3.exercise10.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Document("members")
public class Member {

  @Id
  private String id;

  private String firstName;

  private String lastName;

  private int age;

  private String gender;

  private List<String> interests;

  private double balance;

  private Map<String, String> address;

  public Member() {  }

  public Member(String firstName, String lastName, int age, String gender, List<String> interests, double balance, Map<String, String> address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.interests = interests;
    this.balance = balance;
    this.address = address;
  }

  public Member(String firstName, String lastName, int age, String gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public int getAge() {
    return age;
  }

  public void setAge(int age) {
    this.age = age;
  }

  public String getGender() {
    return gender;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }

  public List<String> getInterests() {
    return interests;
  }

  public void setInterests(List<String> interests) {
    this.interests = interests;
  }

  public void addInterest(String interest) {
    if(this.interests == null) {
      this.interests = new ArrayList<>();
    }
    this.interests.add(interest);
  }

  public double getBalance() {
    return balance;
  }

  public void setBalance(double balance) {
    this.balance = balance;
  }

  public Map<String, String> getAddress() {
    return address;
  }

  public void setAddress(Map<String, String> address) {
    this.address = address;
  }

  @Override
  public String toString() {
    return "Member{" +
        "id='" + id + '\'' +
        ", firstName='" + firstName + '\'' +
        ", lastName='" + lastName + '\'' +
        ", age=" + age +
        ", gender='" + gender + '\'' +
        ", interests=" + interests +
        ", balance=" + balance +
        ", address=" + address +
        '}';
  }
}

```

- MemberRepository

```java
@Repository
public interface MemberRepository extends MongoRepository<Member, String> {

  Optional<Member> findByFirstName(String firstName);

}

```

- Spring Application

```java
@SpringBootApplication
@EnableMongoRepositories
public class Application {

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

  @Bean
  public CommandLineRunner commandLineRunner(MemberRepository memberRepository) {
    return args -> {
      // create a Member record
      Member member = new Member();
      member.setFirstName("Noel");
      member.setLastName("Keener");
      member.setAge(34);
      member.setGender("male");
      System.err.println(member);

      // save the Member record
      memberRepository.save(member);

      // read the Member using memeber last name
      Optional<Member> noel = memberRepository.findByFirstName("Noel");

      if(noel.isPresent()) {
        System.err.println(noel.get());
      } else {
        System.err.println("Failed to retrieve Noel.");
      }
    };
  }
}
```
