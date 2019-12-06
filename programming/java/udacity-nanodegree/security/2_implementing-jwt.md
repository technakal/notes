# JWT in Spring Boot

## Overview

- [Information on JWT](https://auth0.com/docs/jwt)
- Composed of a header, payload, and signature.
  - JWT format is `{header}.{payload}.{signature}`
  - The header contains thetToken type and the algorithm to be used in the signature.
  - The payload contains the claims.
    - This just means things like username and role information, or whatever is actually used to authenticate/authorize.
  - The signature contains an encoded version of the header, an encoded version of the payload, a secret, and the algorithm of the header.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}

{
  "sub": "1234",
  "name": "Sareeta Panda",
  "admin": true
}

HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

- JWT replaces SAML and SWT in most applications today.

## Adding JWT Support to Spring Boot

- [Implementing JWT Authentication](https://auth0.com/blog/implementing-jwt-authentication-on-spring-boot/)

1. Add the dependencies to your POM:
   a. Spring Boot Starter Security
   b. Java JWT
   c. In addition, you may want to add Spring Security Test.
2. Implement the necessary fields on your classes to allow for password authentication.
3. In the main application, configure security.
   a. Disable the default security authentication class.
   b. Add `bcrypt`.
4. Configure your controllers.
5. Implement an authentication filter to issue JWTS to users sending credentials.
6. Implement an authorization filter to validate requests containing JWTS.
7. Create a custom implementation of `UserDetailsService` to help Spring Security loading user-specific data in the framework.
8. Extend the `WebSecurityConfigurerAdapter` class to customize the security framework to our needs.

### Add Dependencies

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
  <groupId>com.auth0</groupId>
  <artifactId>java-jwt</artifactId>
  <version>3.8.2</version>
</dependency>
<dependency>
  <groupId>org.springframework.security</groupId>
  <artifactId>spring-security-test</artifactId>
  <scope>test</scope>
</dependency>
```

### Implement Fields

- In this case, we're just adding the password to our User class.
  - We're also updating the CreateUserRequest class to accept a password and a confirmation of the password.

```java
// user
@Entity
@Table(name = "user")
public class User {

  @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty
	private long id;

	@Column(nullable = false, unique = true)
	@JsonProperty
	private String username;

  // this is what we added
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Column(nullable = false)
	private String password;

  // also add the neceesary getters and setters

  // more code...
}

// CreateUserRequest
public class CreateUserRequest {

	@JsonProperty
	private String username;

  // we added the below two fields to accept the password
	@JsonProperty
	private String password;

	@JsonProperty
	private String confirmPassword;

  // also add the neceesary getters and setters

  // more code...
}
```

### Configure Security in Main Application

- In the main application class, disable the default Spring security authorization.
  - In the @springBootApplication annotation, add the exclude configuration setting.
- Then, add bcrypt.

```java
@EnableJpaRepositories("com.example.demo.model.persistence.repositories")
@EntityScan("com.example.demo.model.persistence")
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class}) // here we exclude default security
public class SareetaApplication {

  @Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	};

	public static void main(String[] args) {
		SpringApplication.run(SareetaApplication.class, args);
	}

}
```

### Implement JWTAuthenticationFilter

- Create a class for the JWT authentication filter.
  - This class extends the `UsernamePasswordAuthenticationFilter`, which essentially just tells Spring where in the security chain the filter should be added.
  - This class overrides two methods:
    - `attemptAuthentication` - parses the users credentials and passes them to our `AuthenticationManager`.
    - `successfulAuthentication` - builds a JWT from the user's credentials and returns them to the user as a repsonse header.

```java
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest request,
            HttpServletResponse response) throws AuthenticationException {

        try {
            ApplicationUser creds = new ObjectMapper()
                    .readValue(request.getInputStream(), ApplicationUser.class);
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getUsername(),
                            creds.getPassword(),
                            new ArrayList<>()
                    )
            );
        } catch(IOException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authResult) throws IOException, ServletException {

        String token = JWT.create()
                .withSubject(((ApplicationUser) authResult.getPrincipal()).getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SECRET.getBytes()));
        response.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
        super.successfulAuthentication(request, response, chain, authResult);
    }
}
```

## Resources

- [JWT Security Files](https://auth0.com/blog/implementing-jwt-authentication-on-spring-boot/)
- [JWT Docs](https://auth0.com/docs/jwt)
- [JWT Validation](https://auth0.com/docs/api-auth/tutorials/verify-access-token)
