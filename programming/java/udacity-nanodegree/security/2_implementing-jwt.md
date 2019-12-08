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
5. Create a `SecurityConstants` class, for use with your filters.
6. Implement an authentication filter to issue JWTS to users sending credentials.
7. Implement an authorization filter to validate requests containing JWTS.
8. Create a custom implementation of `UserDetailsService` to help Spring Security loading user-specific data in the framework.
9. Extend the `WebSecurityConfigurerAdapter` class to customize the security framework to our needs.

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
package com.auth0.samples.authapi.springbootauthupdated.security;

import com.auth0.jwt.JWT;
import com.auth0.samples.authapi.springbootauthupdated.user.ApplicationUser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static com.auth0.samples.authapi.springbootauthupdated.security.SecurityConstants.EXPIRATION_TIME;
import static com.auth0.samples.authapi.springbootauthupdated.security.SecurityConstants.HEADER_STRING;
import static com.auth0.samples.authapi.springbootauthupdated.security.SecurityConstants.SECRET;
import static com.auth0.samples.authapi.springbootauthupdated.security.SecurityConstants.TOKEN_PREFIX;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            ApplicationUser creds = new ObjectMapper()
                    .readValue(req.getInputStream(), ApplicationUser.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getUsername(),
                            creds.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {

        String token = JWT.create()
                .withSubject(((User) auth.getPrincipal()).getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(SECRET.getBytes()));
        res.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
    }
}
```

### Create Security Constants

- Create a file for storing your security constants, used by your filters.
  - SECRET is used for salting.
  - EXPIRATION_TIME sets the expiration time of the JWT.
  - HEADER_STRING is what attribute in the header we'll look for.
  - TOKEN_PREFIX and SIGN_IN_URL should be pretty obvious.

```java
public class SecurityConstants {
  public static final String SECRET = "SecretKeyToGenJWTs";
  public static final long EXPIRATION_TIME = 864_000_000; // 10 days
  public static final String TOKEN_PREFIX = "Bearer ";
  public static final String HEADER_STRING = "Authorization";
  public static final String SIGN_UP_URL = "/users/sign-up";
}
```

### Create Authorization Filter

- This handles the authorization of the user.
- It extends the `BasicAuthenticationFilter`, and overrides its `doFilterInternal` method.
- Basically, it parses the header to make sure it's properly formatted and includes the HEADER_STRING we set in `SecurityConstants`.
- If it's valid, it checks the user's JWT.
- If the JWT is valid, it sets the user's `SecurityContext`.

```java
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

import static com.auth0.samples.authapi.springbootauthupdated.security.SecurityConstants.HEADER_STRING;
import static com.auth0.samples.authapi.springbootauthupdated.security.SecurityConstants.SECRET;
import static com.auth0.samples.authapi.springbootauthupdated.security.SecurityConstants.TOKEN_PREFIX;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    public JWTAuthorizationFilter(AuthenticationManager authManager) {
        super(authManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(HEADER_STRING);

        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }

        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);
        if (token != null) {
            // parse the token.
            String user = JWT.require(Algorithm.HMAC512(SECRET.getBytes()))
                    .build()
                    .verify(token.replace(TOKEN_PREFIX, ""))
                    .getSubject();

            if (user != null) {
                return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
            }
            return null;
        }
        return null;
    }
}
```

### Wire Up the Filters

- The next step is to wire the filters up to work with Spring Security's filter chain.
- We create a class called `WebSecurity`.
- First, we take advantage of base Spring Security configurations by annotating with `@EnableWebSecurity` and extending `WebSecurityConfigurerAdapter`.
- From the extended class, we override its `configure` method and its overload. We use these to fine-tune our security settings.
  - `configure(HttpSecurity http)` defines which resources are public and which are secured. In our case, we set the SIGN_UP_URL endpoint as being public and everything else as being secured. We also configure CORS (Cross-Origin Resource Sharing) support through http.cors() and we add a custom security filter in the Spring Security filter chain.
  - `configure(AuthenticationManagerBuilder auth)` defines a custom implementation of UserDetailsService to load user-specific data in the security framework. We have also used this method to set the encrypt method used by our application (BCryptPasswordEncoder).
- We also create a new method, `corsConfigurationSource`.
  - In this method, we can allow/restrict our CORS support. In our case we left it wide open by permitting requests from any source (/\*\*).

```java
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import com.auth0.samples.authapi.springbootauthupdated.user.UserDetailsServiceImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.context.annotation.Bean;

import static com.auth0.samples.authapi.springbootauthupdated.security.SecurityConstants.SIGN_UP_URL;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
    private UserDetailsServiceImpl userDetailsService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public WebSecurity(UserDetailsServiceImpl userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userDetailsService = userDetailsService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests()
                .antMatchers(HttpMethod.POST, SIGN_UP_URL).permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(new JWTAuthenticationFilter(authenticationManager()))
                .addFilter(new JWTAuthorizationFilter(authenticationManager()))
                // this disables session creation on Spring Security
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }
}
```

### Create UserDetailsServiceImpl

- Because Spring Security has no concrete implementation of the `UserDetailsService`, we have to create one.
  - We throw this in our user folder.
- In this step, we override the `loadUserByUsername` method.
  - This method checks if the username matches a user in the database.
  - If it doesn't, it throws an error.
  - If it does, it returns that user (which is then used in our other files for authentication/authorization).

```java
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static java.util.Collections.emptyList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private ApplicationUserRepository applicationUserRepository;

    public UserDetailsServiceImpl(ApplicationUserRepository applicationUserRepository) {
        this.applicationUserRepository = applicationUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ApplicationUser applicationUser = applicationUserRepository.findByUsername(username);
        if (applicationUser == null) {
            throw new UsernameNotFoundException(username);
        }
        return new User(applicationUser.getUsername(), applicationUser.getPassword(), emptyList());
    }
}
```

## Resources

- [JWT Security Files](https://auth0.com/blog/implementing-jwt-authentication-on-spring-boot/)
- [JWT Docs](https://auth0.com/docs/jwt)
- [JWT Validation](https://auth0.com/docs/api-auth/tutorials/verify-access-token)
