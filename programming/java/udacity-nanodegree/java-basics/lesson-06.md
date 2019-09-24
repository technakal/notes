# Spring Boot Packaging

- [Spring Boot Packaging](#spring-boot-packaging)
  - [Packaging a Spring Boot Application](#packaging-a-spring-boot-application)
    - [Snapshot Builds](#snapshot-builds)
    - [Using Maven to Package](#using-maven-to-package)
      - [Running the SNAPHOT](#running-the-snaphot)
        - [Useful Command Line Flags](#useful-command-line-flags)

## Packaging a Spring Boot Application

- The ultimate goal of an application is to deploy it so that others can use it.
- In Spring Boot, there are two strategies for packaging an application:
  - JAR files
    - Contains libraries, resources, and property files.
  - WAR files
    - Contains the application, which can be deployed on any servlet/jsp container.
    - The WAR file contains JPS, HTML, JavaScript, and all other files necessary for the development of web applications.
- By default, Spring will package as a JAR file.
  - To force WAR file packaging, we need to add the following to the `pom.xml`.

```xml
<packaging>war</packaging>
<name>packing</name>
```

### Snapshot Builds

- A SNAPSHOT build is a special version that indiciates it's a development copy.
- Unlike normal versions, Maven checks for a new SNAPSHOT version in the repository at every build.

### Using Maven to Package

- We can use Maven (command line or IntelliJ) to package our application.
- The package command will generate the package, but it also runs unit tests first.
  - If any unit tests fail, the SNAPSHOT is not generated and the process stops.
- Once all unit tests are successful, the package command will successfully run and drop the SNAPSHOT into your project.
  - Look for the magical `target` directory.
  - If it's successful, your console will also say "BUILD SUCCESS".

#### Running the SNAPHOT

- You can run it as normal thorugh IntelliJ, by right clicking the jar file and saying "Run...".
- You can also run the JAR file from the command line using the following command from the containing folder (or with the path in the command):
  - The benefit of command line is that it allows you to set flags in the execute process.

```ps1
java -jar programName.jar
```

##### Useful Command Line Flags

- Change the server port at runtime with `--server.port`

```ps1
java -jar programName.jar --server.port=8090
```

- Run a trace with --trace

```ps1
java -jar programName.jar --server.port=9910 --trace
```
