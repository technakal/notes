# Consuming APIs

<!-- TOC -->

- [Consuming APIs](#consuming-apis)
  - [Overview](#overview)
  - [Rest APIs](#rest-apis)
    - [Jackson](#jackson)
    - [RestTemplate](#resttemplate)
  - [SOAP APIs](#soap-apis)
    - [Spring Web Service](#spring-web-service)
    - [Generating the Classes from WSDL](#generating-the-classes-from-wsdl)
    - [Other Dependencies](#other-dependencies)

<!-- /TOC -->

## Overview

- You can consume REST and SOAP APIs through the use of some helpful libraries and Spring features.
- `RestTemplate` allows you to programmatically consume REST APIs.
  - It's part of Spring!
  - [Official docs](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html)

## Rest APIs

### Jackson

- Jackson is a library that allows you to consume JSON and turn it into regular Java objects.
  - Would have been helpful in unit 1.
- With Jackson, fields in your class must match the corresponding JSON keys _exactly_.
- You can include Jackson in your Spring application by adding the following to your POM:

```xml
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
</dependency>
```

- Create an entity matching the expected output from the JSON.

### RestTemplate

- To use RestTemplate, just create a method in your application that returns the `RestTemplate` from the `RestTemplateBuilder`.
  - Use the `.build()` method.

```java
@Bean
public RestTemplate restTemplate(RestTemplateBuilder builder) {
  return builder.build();
}
```

- Then, in your API call method, just use the RestTemplate method you built, and execute the REST call.

```java
@Bean
public CommandLineRunner run(RestTemplate restTemplate) throws Exception {
  return args -> {
    Joke joke = restTemplate.getForObject(
        "https://official-joke-api.appspot.com/random_joke", Joke.class);
    log.info(joke.toString());
  };
}
```

## SOAP APIs

- You can also consume SOAP web services using Spring.
- Spring Web Service allows you to do this easily, by creating the classes you need to consume the SOAP service.
  - Spring Web Service uses the WSDL file for this consumption automation.

### Spring Web Service

- Using the Spring Initializr option for Spring Web Services.
- Directly in the POM:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web-services</artifactId>
  <version>1.4.0.RELEASE</version>
</dependency>
```

### Generating the Classes from WSDL

- To generate the classes from the WSDL, you'll need the following Maven plugin as well:

```xml
<plugin>
  <groupId>org.jvnet.jaxb2.maven2</groupId>
  <artifactId>maven-jaxb2-plugin</artifactId>
  <version>0.14.0</version>
  <executions>
    <execution>
      <goals>
        <goal>generate</goal>
      </goals>
    </execution>
  </executions>
  <configuration>
    <schemaDirectory>${project.basedir}/src/main/resources/wsdl</schemaDirectory>
    <schemaIncludes>
      <include>*.wsdl</include>
    </schemaIncludes>
  </configuration>
</plugin>
```

- To generate the classes, run the following Maven command: `mvn generate-sources`.
  - This option is also available in IntelliJ.
    - Run the plugins > JAXB2 > generate function.
  - This will drop new classes into the target directory.
- Next, create a web service client class that extends `WebServiceGatewaySupport`.
- Code the necessary operations you want to include.
  - These are generated classes from your WSDL, dude.

```java
public class NumberClient extends WebServiceGatewaySupport {

  public NumberToWordsResponse getWords(String numbers) {
    //publicly accessible SOAP service
    String uri = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso";

    //set the request
    NumberToWords numberRequest = new NumberToWords();
    numberRequest.setUbiNum(new BigInteger(numbers));

    //obtain and return the response
    NumberToWordsResponse response = (NumberToWordsResponse) getWebServiceTemplate().marshalSendAndReceive(uri,numberRequest);
    return response;
  }

}
```

### Other Dependencies

- The following list of dependencies are also helpful for mapping XML to Java.
  - Include them if you're consuming SOAP. You can sort out later which ones are unnecessary.
  - `javax.xml.bind:jaxb-api`
  - `com.sun.xml.bind:jaxb-core`
  - `com.sun.xml.bind:jaxb-impl`
  - `com.sun.xml.messaging.saaj:saaj-impl`
  - `javax.xml.ws:jaxws-api`

```xml
<dependency>
  <groupId>javax.xml.bind</groupId>
  <artifactId>jaxb-api</artifactId>
  <version>2.3.0</version>
</dependency>
<dependency>
  <groupId>com.sun.xml.bind</groupId>
  <artifactId>jaxb-core</artifactId>
  <version>2.3.0</version>
</dependency>
<dependency>
  <groupId>com.sun.xml.bind</groupId>
  <artifactId>jaxb-impl</artifactId>
  <version>2.3.0</version>
</dependency>
<dependency>
  <groupId>com.sun.xml.messaging.saaj</groupId>
  <artifactId>saaj-impl</artifactId>
  <version>1.5.0</version>
</dependency>
<dependency>
  <groupId>javax.xml.ws</groupId>
  <artifactId>jaxws-api</artifactId>
  <version>2.2.6</version>
</dependency>
```
