# Spring Form Validation

<!-- TOC -->

- [Spring Form Validation](#spring-form-validation)
  - [Overview](#overview)
  - [Getting Started](#getting-started)
  - [Basic Validation Options](#basic-validation-options)
  - [Basic Validation Trick](#basic-validation-trick)
  - [Regex Validation](#regex-validation)
  - [Custom Validation](#custom-validation)
  - [Development Process](#development-process)

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

## Basic Validation Trick

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

## Regex Validation

## Custom Validation

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
