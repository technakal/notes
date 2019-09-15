# Spring Boot Validation

- [Spring Boot Validation](#spring-boot-validation)
  - [Setting Requirements on Underlying Classes](#setting-requirements-on-underlying-classes)
  - [Configuring Controllers](#configuring-controllers)
  - [Setting Up Our Templates](#setting-up-our-templates)
  - [Common Validation Annotations](#common-validation-annotations)

## Setting Requirements on Underlying Classes

- To create validation on a class, you add a validation annotation to that class' fields.
- For example, if we're creating a user entry form, we might have a User class.
  - The class requires a name and password by using the `@NotBlank` annotation.
  - The class requires the password be between 8 and 20 characters by using the `@Length` annotation.
  - The class requires a valid email via the `@Email` annotation.
  - And, the class requires the grade be a positive number between 0 and 100, via the `@Min` and `@Max` annotations.

```java
public class User {
  @NotBlank(message = "username can\'t be blank.")
  private String name;
  @NotBlank(message = "password can\'t be blank.")
  @Length(min = 8, max = 20, message = "Password must be 8 to 20 characters.")
  private String password;
  @Min(value = 0)
  @Max(value = 100)
  private Double grade;
  @Email
  private String email;

  public User(String name, String password, Double grade, String email) {
    this.name = name;
    this.password = password;
    this.grade = grade;
    this.email = email;
  }
```

## Configuring Controllers

- Next, we add validation options to our UserController, which provides the backing to the User class and acts as the Controller for the template rendering.
- In the `addUser` method, we implement our validation.
  - Here, we use the `@Valid` annotation in association with the user parameter.
  - We also pass the result object, which is the result of the validation attempt.
  - If the validation has errors, we refresh the `add` template and display the error messages.
  - If the validation passes, we log something to the console and display the `success` template.

```java
@Controller
public class UserController {
  @RequestMapping("add")
  public String toAdd(User user) {
    return "add";
  }

  @RequestMapping("addUser")
  public String add(@Valid User user, BindingResult result) {
    if(result.hasErrors()) {
      System.out.println(result.hasErrors());
      return "add";
    }
    System.out.println("Save user: " + user);
    return "success";
  }
}
```

## Setting Up Our Templates

- In our Thymeleaf template, we display the validation errors, if present, using the `th:error` attribute.

```html
<body>
  <h1>Add User</h1>
  <form action="addUser" method="post">
    <label for="name">Username:</label>
    <input type="text" id="name" name="name" />
    <span th:errors="${user.name}" style="color:red"></span>
    <label for="name">Password:</label>
    <input type="password" id="password" name="password" />
    <span th:errors="${user.password}" style="color:red"></span>
    <label for="email">Email:</label>
    <input type="text" id="email" name="email" />
    <span th:errors="${user.email}" style="color:red"></span>
    <label for="grade">Grade:</label>
    <input type="number" id="grade" name="grade" />
    <span th:errors="${user.grade}" style="color:red"></span>
    <input type="submit" value="Add" />
  </form>
</body>
```

## Common Validation Annotations

- @NotBlank: check if string is null or empty after trimmed the front and end spaces.
- @NotEmpty: check if string is null or empty without trim the front and end spaces.
- @Length: check string length, include max and min.
- @Min: check min, cannot be less. for instance if @Min(0), then input should not less than 0.
- @Max: check max, cannot be over.
- @Emai: check email format, should be XX@XX.XX
