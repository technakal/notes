# Security

## Contents

<!-- TOC -->

- [Security](#security)
  - [Contents](#contents)
  - [Overview](#overview)
    - [Basic Auth](#basic-auth)
      - [Basic Auth Process](#basic-auth-process)
    - [API Key Authentication](#api-key-authentication)
  - [Spring Security](#spring-security)
    - [Spring Security Dependencies](#spring-security-dependencies)
    - [Adding Security](#adding-security)
  - [Securing REST APIs Overview](#securing-rest-apis-overview)

<!-- /TOC -->

## Overview

- Authentication
  - Authentication is about validating the identity of a client attempting to call a web service.
  - Typically, identity is validated with user credentials, such as a user name and password.
- Authorization
  - Authorization is what a user can do once authenticated.
  - Authorization is the next step after authentication.
  - Once a client is authenticated (they have proven who they are), what do they have access to?
    - For example, what data can they view, are they allowed to change that data, etc.

### Basic Auth

- Basic Authentication (also referred to as Basic Auth) is the simplest protocol available for performing web service authentication over HTTP protocol.
- Basic Auth requires a username and password.

#### Basic Auth Process

- User provides username and password.
- Client application converts these credentials into a Base 64-encoded value and passes it in the Authentication HTTP header.
  - `Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l`
- The server compares the credentials passed to those stored.
- If it matches, the server fulfills the request and provides access to the data.
- If the Authentication HTTP header is missing or the password doesn’t match the user name, the server denies access and returns a 401 status code, which means the request is Unauthorized.

### API Key Authentication

- Another method of securing APIs.
- Access requires client to provide API key, a unique passcode that identifies who the user is.

## Spring Security

- Spring Security is a part of the Spring Framework and provides authentication, authorization and other security features for Spring-based applications.

### Spring Security Dependencies

- Add as a dependency in the following ways:
  - Through Spring Initializr:
    - Spring Security
  - Through POM file:
    - `spring-boot-starter-security`

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

- If you want to include testing features, you can add the `spring-security-test` dependency.

```xml
<dependency>
  <groupId>org.springframework.security</groupId>
  <artifactId>spring-security-test</artifactId>
  <scope>test</scope>
</dependency>
```

### Adding Security

- Create a `SecurityConfig` class.
- Annotate it as a `@Configuration`.
- Annotate it with `@EnableWebSecurity`.
- Make the class extend `WebSecurityConfigurerAdapter`.
- Override the `configure` method.
  - Disable the [cross-site request forgery](https://en.m.wikipedia.org/wiki/Cross-site_request_forgery) feature (`csrf().disable()`)
  - `authorizeRequests()`, `anyRequests()`, and `authenticated()` simply tell the API that any request that comes in must be authenticated in order to respond.
  - `and().httpBasic()` tells Security to allow Basic Auth.
- Override the `configureGlobal` method.
  - This method is creating an in-memory user, which allows us to test this pretty easily.
- Create a `@Bean` for encoding credentials, using `BCryptPasswordEncoder()`.

```java
@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf()
        .disable()
        .authorizeRequests()
        .anyRequest()
        .authenticated()
        .and()
        .httpBasic();
  }

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    auth.inMemoryAuthentication()
        .withUser("admin")
        .password(encoder().encode("password"))
        .roles("USER");
  }

  @Bean
  public PasswordEncoder encoder() {
    return new BCryptPasswordEncoder();
  }
}
```

## Securing REST APIs Overview

- Add your Spring Security dependencies to the POM file.
- Add a config directory, with your `SpringSecurityConfig` class inside.
- Add the `@Configuration` and `@EnableWebSecurity` annotations to your security class.
- Make sure the class extends `WebSecurityConfigurerAdapter`.
- Override the `configure` method of the `WebSecurityConfigurerAdapter`.
- If you're testing in-memory, create the `configureGlobal` method to generate an in-memory user.
- If you're using Basic Auth, make the `encoder()` method for use with your `configureGlobal` user.
- Launch it! You can test by making a request to the endpoint using either Postman or your browser.
  - In Postman, you'll get a 401 if you don't add Basic Auth.
  - In the browser, you'll get a 401 if you fail to enter the correct credentials.
