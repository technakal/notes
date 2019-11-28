# Spring Data JPA

## Overview

- Spring Data JPA is an implementation of JDBC.
- It provides seemless integration of JDBC into the Spring stack.
  - Reduces a ton of boilerplate code.

## The Repository

- The basic abstraction that Spring Data provides is the Repository.
- The Repository contains methods to perform basic create, read, update, and delete operations on an entity.
  - You can also customize this with your own methods.
  - If you follow the standards, JPA can create a query based on the method name.
- There are three interfaces you should know when working with Spring Data JPA
  - [CrudRepository](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/CrudRepository.html)
    - Defines a repository that offers standard create, read, update and delete operations.
  - [PagingAndSortingRepository](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/PagingAndSortingRepository.html)
    - Extends the CrudRepository and adds findAll methods that enable you to sort the result and to retrieve it in a paginated way.
  - [JpaRepository](https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html)
    - Adds JPA-specific methods, like flush() to trigger a flush on the persistence context or findAll(Example example) to find entities by example, to the PagingAndSortingRepository.
