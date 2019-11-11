# Spring Form Validation

<!-- TOC -->

- [Spring Form Validation](#spring-form-validation)
  - [Overview](#overview)
  - [Getting Started](#getting-started)
  - [Basic Validation Options](#basic-validation-options)
  - [Basic "Required" Validation](#basic-required-validation)
    - [Robust "Not Null" Validation](#robust-not-null-validation)
  - [Numeric Validation](#numeric-validation)
  - [Regex Validation](#regex-validation)
  - [Custom Validation](#custom-validation)
    - [Development Process](#development-process)
  - [Loading Custom Error Messages](#loading-custom-error-messages)
    - [Process](#process)
  - [Development Process](#development-process-1)

<!-- /TOC -->

## Overview

- Java has a standardized bean validation API that you can use to validate form input.
  - [Website](http://beanvalidation.org)
- This is also the preferred method of validation in Spring, and is fully supported in version 4+.
- However, this is just a spec--not an implementation.
  - We need an implementation...
  - ... and the people behind Hibernate has a good option!

## Getting Started

- Install the Hibernate Validator.
  - Here's the [official website](https://hibernate.org/validator/).
  - You can add them directly to your lib directory, or go through Maven if you're using that method.
    - If you're doing a Dynamic Web App or whatever, put them in the `WEB-INF/lib` folder, where everything else is.

## Basic Validation Options

- Here are a few of the common validation annotations.
  - There are others, of course.

| Annotation        | Usage                                            |
| ----------------- | ------------------------------------------------ |
| `@NotNull`        | Can't be null                                    |
| `@Min`            | Must be >= value                                 |
| `@Max`            | Must be <= value                                 |
| `@Size`           | Must match given size                            |
| `@Pattern`        | Must match the regex pattern                     |
| `@Future`/`@Past` | Must be after or before given date, respectively |

## Basic "Required" Validation

- Requiring a field is fairly straightforward with the validator.
  - Just use the `@NotNull` and `@Size` annotations, beefed up with the [validation trick](#robust-"not-null"-validation).
- Here's the Customer class:

```java
@NotNull(message = "is required")
@Size(min = 1, message = "is required")
private String lastName;
```

- Then, to get any validation working, you need to add the following to your Controller class.
  - `@Valid` annotation to the `@ModelAttribute` holder.
  - `BindingResult` object, _always_ following directly after the `@ModelAttribute`
  - Test if the `BindingResult` has errors, and if so, return the form page. Otherwise, proceed to the confirmation page.

```java
@RequestMapping("/confirmation")
public String showConfirmation(
    @Valid @ModelAttribute("customer") Customer customer,
    BindingResult bindingResult
  ) {

  System.out.println("Last Name: |" + customer.getLastName() + "|");

  if(bindingResult.hasErrors()) {
    return "customer-registration";
  }
  return "customer-confirmation";

}
```

### Robust "Not Null" Validation

- A common problem with validators is whitespace.
- Whitespace passes the `@NotNull` and `@Size` validators.
- To overcome this, you can use `@InitBinder`, which allows pre-processing of input before the `BindingResult` gets it.
  - You can trim whitespace, etc.
  - Message signature for this is always `WebDataBinder`.

```java
@InitBinder
public void initBinder(WebDataBinder dataBinder) {

  StringTrimmerEditor trimmerEditor = new StringTrimmerEditor(true);
  dataBinder.registerCustomEditor(String.class, trimmerEditor);

}
```

## Numeric Validation

```java
@NotNull(message = "is required")
@Min(value = 0, message = "must be greater than or equal to 0")
@Max(value = 10, message = "must be less than or equal to 10")
private Integer freePasses;
```

- By using the `Integer` type instead of the `int` type, we can then have auto-conversion to allow for the `@NotNull` annotation to work.
  - Without this, submitting the form with a null value here will throw a type conversion exception.

## Regex Validation

```java
@NotNull(message = "is required")
@Pattern(regexp = "^[0-9]{5}", message = "must be a valid postal code, five digits")
private String postalCode;
```

## Custom Validation

- You can also create completely custom validation rules, including custom annotations.
- Custom annotations use a special type in their signature--`@interface`.
- Must have a `@Constraint`, which points to the class containing the business logic by which to validate the annotation.
- Must have `@Target`, to tell the compiler where it can be used.
- `@Retention` tells how long the annotation should be made available.

### Development Process

- Create custom annotation.

```java
package com.technakal.springdemo.mvc.validation;

@Constraint(validatedBy = CourseCodeConstraintValidator.class)
@Retention(RUNTIME)
@Target({ FIELD, METHOD })
public @interface CourseCode {

  // define default course code prefix
  public String[] value() default { "NAK" };

  // define default course code validation error
  public String message() default "must begin with valid course code";

  // define default group
  public Class<?>[] groups() default {};

  // define default payloads
  public Class<? extends Payload>[] payload() default {};

}
```

- Add custom constraint validator.

```java
package com.technakal.springdemo.mvc.validation;

public class CourseCodeConstraintValidator implements ConstraintValidator<CourseCode, String> {

  private String[] coursePrefixes;

  @Override
  public void initialize(CourseCode courseCode) {

    ConstraintValidator.super.initialize(courseCode);
    coursePrefixes = courseCode.value();

  }

  @Override
  public boolean isValid(String enteredCode, ConstraintValidatorContext constraintValidatorContext) {

    Boolean result = true;

    if(enteredCode != null) {
      for(String prefix : coursePrefixes) {
        result = enteredCode.startsWith(prefix);
        if(result) {
          break;
        }
      }
    }
    return result;

  }

}
```

- Add new rule to Customer class.

```java
@CourseCode(value = { "TEK", "LUV" }, message = "must start with valid code prefix")
public String courseCode;
```

- Add error to form.
  - Same as every other error.

## Loading Custom Error Messages

- Sometimes, Java throws exceptions.
- With the validator, you can customize these exceptions so that they aren't so... overwhelming to your users.

### Process

- Adding a messages.properties to your `src/resources/` directory.
- Configure custom messages in the messages.properties file.
  - The format is error code name, object name, field name, and then the message you want to return.
  - If you want to figure out the error code name(s) related to a given input, you can inspect the BindingResult value. It'll tell you all of the information above.
- Adding the custom messages to the resource bundler: `wEB-INF/spring-mvc-demo-servlet.xml`

- messages.properties

```text
typeMismatch.customer.freePasses=invalid number
```

- resource bundler

```xml
<!-- Load custom error messages -->
<bean id="messageSource"
  class="org.springframework.context.support.ResourceBundleMessageSource">
  <property name="basenames" value="resources/messages" />
</bean>
```

## Development Process

- Install the validator.
- Build the object class, `Customer`.
  - Add the validation annotations to the appropriate class fields.
- Build the controller--`CustomerController`.
- Build the confirmation route.
  - Include the parameters `@Valid`, `@ModelAttribute`, and `BindingResult`.
    - Note that the `BindingResult` must appear _directly after_ the `@ModelAttribute`, or it won't work.
      - [More info](https://www.udemy.com/course/spring-hibernate-tutorial/learn/lecture/7300598#overview)
  - Check if the `BindingResult` `hasErrors()`.
    - If so, return the registration page again.
    - Otherwise, return the confirmation page.
- Build the registration and confirmation views.

  - Remember to include the `<form:errors>` tag to display your validation errors.

- Customer
  - In this case, lastName must not be null, and must meet a minimum size requirement of 1.

```java
public class Customer {

  private String firstName;

  @NotNull(message = "is required")
  @Size(min = 1, message = "is required")
  private String lastName;

  public Customer() {}

  /**
   * @return the firstName
   */
  public String getFirstName() {
    return firstName;
  }

  /**
   * @param firstName the firstName to set
   */
  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  /**
   * @return the lastName
   */
  public String getLastName() {
    return lastName;
  }

  /**
   * @param lastName the lastName to set
   */
  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

}

```

- CustomerController

```java
@Controller
@RequestMapping("/customer")
public class CustomerController {

  @RequestMapping("/register")
  public String showForm(Model model) {
    Customer customer = new Customer();
    model.addAttribute("customer", customer);

    return "customer-registration";

  }

  @RequestMapping("/confirmation")
  public String showConfirmation(
      @Valid @ModelAttribute("customer") Customer customer,
      BindingResult bindingResult
      ) {
    if(bindingResult.hasErrors()) {
      return "customer-registration";
    }
    return "customer-confirmation";

  }
}

```

- Registeration Form

```html
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%> <%@ taglib
uri="http://www.springframework.org/tags/form" prefix="form" %>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="ISO-8859-1" />
    <title>Super Retailer | Register</title>
  </head>
  <body>
    <header>
      <h1>Super Retailer</h1>
      <nav>
        <a href="/spring-mvc-demo">Return to Home</a>
      </nav>
    </header>
    <h2>Customer Registration</h2>
    <p>Asterisk (*) means required, dummy!</p>
    <form:form action="confirmation" modelAttribute="customer">
      <label for="firstName">First Name: </label
      ><form:input id="firstName" path="firstName" /><br />
      <label for="lastName">Last Name: (*) </label
      ><form:input id="lastName" path="lastName" />
      <form:errors path="lastName" cssClass="error" /><br />
      <input type="submit" value="Register" />
    </form:form>
  </body>
</html>
```
