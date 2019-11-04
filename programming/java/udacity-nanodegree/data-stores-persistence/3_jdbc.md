# JDBC

## Overview

- Java Database Connectivity (JDBC) is a database-agnostic API used to interact with relational databases.
  - Database-agnostic means that the same commands you use to connect, through JDBC, to MySQL can be used to access PostgreSQL, MongoDB, etc.
  - Makes it easy to change databases on an application, as needed.
- Implementations of the JDBC API are called JDBC drivers.
  - The developer doesn't have to worry about creating the drivers. Database vendors, such as MySQL, create drivers for JDBC to connect to their databases.
- Main functions of JDBC:
  - Connecting to a database.
  - Sending statements to the database to be executed.
  - Allows processing of the return data.

## Interfaces

- `DriverManager` selects the appropriate driver and connecting to the database.
  - Returns a `Connection` object.
- `Connection` represents the connection between the application and the database.
  - Allows the application to send statements to the database.
- `Statement` object is used to execute a SQL statement and return the results.
- `ResultSet` represents a set of results from the database, usually acquired by executing a `Statement` through the `Connection`. BOOM!

## Simple Example of Using JDBC

- Create a `Connection` using the `DriverManager`.
  - Use the `getConnection()` method of the `DriverManager`, passing in the database URL.
    - The URL must contain all relevant information needed to establish the connection.
      - First, it specifies the type of database `mysql` in the example below.
      - Then, it specifies the root address of the server. You'd specify the port if it was other than default.
      - Then, the database you want to connect to, `course3` here.
      - Then, the username and password.
  - Store the result as a `Connection` object.

```java
public JDBCPrimer {

  public static void main(String[] args) {
    try(Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/course3?user=root&password=password")) {
      System.out.println("Connected to: " + conn.getMetaData().getDatabaseProductName());
    } catch(SQLException ex) {
      System.out.println("SQL Exception:" + ex.getMessage());
      System.out.println("SQL State:" + ex.getSQLState());
      System.out.println("Vendor Error:" + ex.getErrorCode());
    }
  }

}
```

- You'll notice that all connection processes, above, are wrapped in a try block.
  - Connections must be closed after use.
  - The try block auto-closes the connection once it's completed its function.

## Executing Statements

- JDBC has three methods for executing SQL statements.
- `Statement` is used to execute normal SQL queries.
  - `Statement` is used to send non parameterized SQL statements to the database.
  - `Statement` interface is preferred for executing DDL statements, since they are typically executed only once.
  - If the statement is executed only once or very sparingly during the lifetime of an application, `Statement` is a good choice.
  - Use of `Statement` is typically frowned upon, with most users choosing `PreparedStatement` instead.

```java
Statement stmt = conn.createStatement();
stmt.executeUpdate("CREATE TABLE EMPLOYEE (EMP_ID  NUMBER NOT NULL, EMP_NAME VARCHAR)");
```

- `PreparedStatement` is used to execute parameterized SQL queries.
  - `PreparedStatement` can be used to send parameterized SQL statements to the database, although parameters are not mandatory.
  - Since a `PreparedStatement` is a pre-compiled by the database, it saves the database from regenerating the query plan for each execution of the `PreparedStatement`.
    - `PreparedStatement` is the most common and preferred way of executing SQL statements in JDBC.
    - It is recommended to use PreparedStatement if you are executing a particular SQL query multiple times.
  - `PreparedStatement` extends Statement interface.
    - You can pass the parameters to SQL query at run time using this interface.
  - You can use placeholders (?) or named parameters in `PreparedStatement`.

```java
// using generic placeholders
PreparedStatement pstmt = conn.prepareStatement("update EMPLOYEE set EMP_NAME = ? where EMP_ID = ?");
pstmt.setString(1, "Jane Doe"); // sets the first parameter, EMP_NAME
pstmt.setString(2, 111); // sets the second parameter, EMP_ID.
pstmt.executeUpdate();

// using named parameters
PreparedStatement pstmt = conn.prepareStatement("update EMPLOYEE set EMP_NAME = :name where EMP_ID = :id");
pstmt.setString("name", "Jane Doe"); // sets the first parameter, EMP_NAME
pstmt.setString("id", 111); // sets the second parameter, EMP_ID.
pstmt.executeUpdate();
```

- `CallableStatement` is used to execute stored procedures.
  - CallableStatement is used to execute stored procedures.
  - A stored procedure is a group of one or more SQL statements stored in the database as a procedure or function.
  - In SQL, stored procedures are invoked using the `CALL` statement, hence the name CallableStatement.

## Processing Result Sets

- `ResultSet` returns with a cursor located just before the first result.
- You can use a `while` loop to iterate through the results, one at a time.

```java
try(ResultSet result = stmt.executeQuery("select * from animals order by name")) {
  System.out.println("Executed SQL query.");
  while(result.next()) {
    int id = result.getInt("id");
    String name = result.getString("name");
    String type = result.getString("type");
    System.out.println(name + " is a " + type + " and has the ID of " + id + ".");
  }
}
```

### Putting it All Together

```java
public class JDBCPrimer {
  public static String buildUri(String baseUri, String user, String pass) {
    return baseUri + "?user=" + user + "&password=" + pass;
  }

  public static void main(String[] args) {
    String uri = "jdbc:mysql://localhost/jdndc3";
    String user = "root";
    String pass = "u8nIs42UCfGWqk9p2IA4";
    try(Connection conn = DriverManager.getConnection(buildUri(uri, user, pass))) {
      System.out.println("Connected to the database.");
      System.out.println(conn.getMetaData().getDatabaseProductName());
      try(Statement stmt = conn.createStatement()) {
        try(ResultSet result = stmt.executeQuery("select * from members order by join_date desc")) {
          System.out.println("Executing select query...");
          while(result.next()) {
            String username = result.getString("username");
            Date joinDate = result.getDate("join_date");
            System.out.println("Username " + username + " joined on " + joinDate + ".");
          }
        }
      }
    } catch (SQLException e) {
      System.out.println("SQL error: " + e.getMessage());
      System.out.println("SQL state: " + e.getSQLState());
      System.out.println("Vendor error: " + e.getErrorCode());
      e.printStackTrace();
    }
  }
}
```

## Transactions

- JDBC allows you to specify when data is committed to the database using Transactions.

### Without Transactions

- This is the default behavior.
- Without transactions specified, updates are committed immediately upon `executeUpdate()`.
- In the example below, the insert process executes successfully and immediately writes to the database. However, because the update process hits an error, it does not commit to the database.
  - So, statement 1 works and statement 2 does not.

```java
String insertTableSQL = "INSERT INTO DBUSER"
            + "(USER_ID, USERNAME, CREATED_BY, CREATED_DATE) VALUES"
            + "(?,?,?,?)";

String updateTableSQL = "UPDATE DBUSER SET USERNAME =? "
            + "WHERE USER_ID = ?";

ps = getConnection().prepareStatement(insertTableSQL);
ps.setInt(1, 100);
ps.setString(2, "jdoe");
ps.setString(3, "app");
ps.setTimestamp(4, getCurrentTimeStamp());
ps.executeUpdate(); // data is committed once this method returns.

psu = getConnection().prepareStatement(updateTableSQL);
psu.setString(1, "A very very long string that will cause an error");
psu.setInt(2, 999);

psu.executeUpdate(); //Error, value too big
```

### With Transactions

- With transactions, you can control when the data is committed.
  - So, with the above example, you could prevent anything from committing unless everything was successful.
- You specify the start of a transaction using the `setAutoCommit(false)` method.
- Within the transaction, you can use `.commit()` to commit the changes, or `.rollback()` to cancel them.
  - These also end the transaction block.

```java
dbConnection.setAutoCommit(false); //transaction block start

String insertTableSQL = "INSERT INTO DBUSER"
            + "(USER_ID, USERNAME, CREATED_BY, CREATED_DATE) VALUES"
            + "(?,?,?,?)";

String updateTableSQL = "UPDATE DBUSER SET USERNAME =? "
            + "WHERE USER_ID = ?";

ps = getConnection().prepareStatement(insertTableSQL);
ps.setInt(1, 100);
ps.setString(2, "jdoe");
ps.setString(3, "app");
ps.setTimestamp(4, getCurrentTimeStamp());
ps.executeUpdate(); // this UPDATE is not committed

psu = dbConnection.prepareStatement(updateTableSQL);
psu.setString(1, "A very very long string that will cause an error");
psu.setInt(2, 999);
psu.executeUpdate(); //Error, rollback, including the first insert statement.

dbConnection.commit(); //transaction block end
```
