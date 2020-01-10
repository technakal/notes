# Checklist for Development

## Layer the Application

- [ ] User Interface
- [ ] Business Logic
- [ ] Data Access
- [ ] Common Library

## Building Classes

- [ ] Each class defines a type
- [ ] Give the class a good name
- [ ] Set the appropriate access modifier
- [ ] Define properties

### Creating Methods

- [ ] Give the method a good name
- [ ] Set the appropriate access modifier
- [ ] Set the return type

## Unit Testing

- [ ] Separate project created for tests
- [ ] Reference the business logic project in your unit test project
- [ ] Test properties and methods
- [ ] Define tests for valid and invalid scenarios
- [ ] Organize tests using Arrange... Act... Assert.
  - Arrange sets up the test
  - Act accesses the member being tested
  - Assert determines the result

## Separation of Concern

### Coupling

- [ ] Evaluate coupling
  - Coupling is how dependent the class is upon other classes and libraries
- [ ] Extract dependencies into their own classes

### Cohesion

- [ ] Evaluate cohesion
  - Cohesion is how related each member is to the purpose of the class
- [ ] Extract unrelated members to their own classes

## Class Relationships

- [ ] Determine type of relationship
  - Collaboration ("uses a")
    - A class uses another class that is otherwise unrelated
  - Composition ("has a")
    - A class is made up of parts from other classes
  - Inheritance ("is a")
    - A class is a more specialized version of another class

### Composition

- [ ] Implement using a property reference if you want the related class to load when the primary class loads
- [ ] Implement using an id if you want to maintain the relationship, but not load the related class data every time

### Inheritance

- [ ] Implement as a simple property if the subclass doesn't add any unique code to the base class
- [ ] Implement as an inheriting class if the subclass does add unique code to the base class

## Reuse Through Inheritance

- [ ] Define base classes with common functionality
- [ ] Inherit from base classes to reuse functionality

## Building Reusable Components

- [ ] Create a separate project for each reusable component
- [ ] Build a library of general-purpose methods in the component, grouped into classes

### Static Classes

- [ ] Define static classes with the `static` keyword
- [ ] Make sure the methods in the static class are `static`
- [ ] Access the static method using the static class name

#### Extension Methods

- [ ] If you want to make the static method an extension method, add the `this` keyword prior to the first parameter name
  - Extension methods become part of the type of the parameter
  - They are discoverable by IntelliSense.
- [ ] Access the extension method using the extended class instance

## Interfaces
