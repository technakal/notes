# Database Migration

- Updates to a data schema are controlled through a release process, called a database migration.
- In the modern world, applications are updated continuously.
  - Strict schema controls limits the ability of the application to update.
- Database migrations are a great way to regain control of this mess. They allow you to:
  - Recreate a database from scratch
  - Make it clear at all times what state a database is in
  - Migrate in a deterministic way from your current version of the database to a newer one
- Flyway is a tool for handling database migrations on behalf of the application.
  - It's basically version control for database migrations.

## How Flyway Works

- Flyway uses an algorithm to assign versions to each migration.
- The migrations are incrementally versioned, then applied in sequence as the application is updated.
- Every time the need to evolve the database arises, whether structure (DDL) or reference data (DML), simply create a new migration with a version number higher than the current one.
  - The next time Flyway starts, it will find it and upgrade the database accordingly.

## Using Flyway

- To use Flyway, add its dependency to the pom file.

```xml
<dependency>
  <groupId>org.flywaydb</groupId>
  <artifactId>flyway-core</artifactId>
  <version>6.0.3</version>
</dependency>
```

- Then, configure an instance of it in your class.
  - Call the `configure()`, `datasource()`, and `load()` methods on your instantiation.
  - Call the `migrate()` method on your instantiation.

```java
Flyway flyway = Flyway.configure().datasource(uri, user, pass).load();
flyway.migrate();
```

- To get Flyway to create tables and execute SQL directly, place the sql scripts in the following folder location of your project: `src/main/resources/db/migration`.
  - Files must use the format `version_name.sql`. Like this:
    - V01\_\_CreateMembersTable.sql
    - V02\_\_PopulateMembers.sql
    - V03\_\_DoOtherStuff.sql
  - The naming convention of the file matters. It must have the version number, preceded by capital V, then double underscore, then a camelcase name.
- If you've never run Flyway before, you may need to baseline before it'll work. You can do this by adding the `flyway.baseline()` to your class.
  - This happens when Flyway is applied to databases with existing history. You can tell it to baseline as of the current version, and ignore previous versions.
- Putting it together with an actual query:

```java
public class Application {

  private static String buildUri(String baseUri, String user, String pass) {
    return baseUri + "?user=" + user + "&password=" + pass;
  }

  public static void main(String[] args) {
    // STEP 1: Create the JDBC URL for JDND-C3 database
    String uri = "jdbc:mysql://localhost/jdndc3";
    String user = "root";
    String pass = "u8nIs42UCfGWqk9p2IA4";

    // STEP 2: Setup and Run Flyway migration that creates the member table using its Java API
    // https://flywaydb.org/getstarted/firststeps/api#integrating-flyway
    // Note the above link talks about connecting to H2 database, for this exercise, MySQL is used. Adapt the code accordingly.
    Flyway flyway = Flyway.configure().dataSource(uri, user, pass).load();
    flyway.migrate();

    // STEP 3: Obtain a connection to the JDND-C3 database
    try(Connection conn = DriverManager.getConnection(buildUri(uri, user, pass))) {
      // STEP 4: Use Statement to INSERT 2 records into the member table
      // NOTE: The member table is created using Flyway by placing the migration file in src/main/resources/db/migration
      String insertStatement = "insert into members (username, password) values (?, ?)";
      PreparedStatement stmt = conn.prepareStatement(insertStatement);
      stmt.setString(1, "coolguy84");
      stmt.setString(2, "password1234");
      stmt.executeUpdate();
      stmt.setString(1, "nextinline");
      stmt.setString(2, "4321drowssap");
      stmt.executeUpdate();

      // STEP 5: Read ALL the rows from the member table and print them here
      try(Statement select = conn.createStatement()) {
        try(ResultSet result = select.executeQuery("select * from members")) {
          while(result.next()) {
            String username = result.getString("username");
            Date joinDate = result.getDate("join_date");
            System.out.println("User " + username + " joined on " + joinDate + ".");
          }
        }
      }

      // STEP 6: verify that all inserted rows have been printed
    } catch(SQLException e) {
      System.out.println("Error message: " + e.getMessage());
      System.out.println("Error code: " + e.getErrorCode());
      System.out.println("SQL state: " + e.getSQLState());
      System.out.println("Stack Trace:");
      e.printStackTrace();
    }

  }
```
