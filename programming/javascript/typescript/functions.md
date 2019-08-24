# TypeScript Functions

- [TypeScript Functions](#typescript-functions)
  - [Overview](#overview)
  - [Usage](#usage)
    - [Basics](#basics)
    - [Optional Parameters](#optional-parameters)

## Overview

- Typing of functions is available for both the parameters and return value.
- Passing an incompatible type to the parameters returns an error.
- Returning an incompatible type, or having no return when one is defined also returns an error.
- Function typing works with standard functions, anonymous functions, and arrow-syntax functions.

## Usage

### Basics

- Here's a simple function with both a parameter type and return type.

```typescript
// standard
function getSum(n1: number, n2: number): number {
  return n1 + n2;
}
// anonymous
let mySum = function(n1: number, n2: number): number {
  return n1 + n2;
};
// arrow-syntax
const getSum = (n1: number, n2: number): number => n1 + n2;
```

- You can mix and match the typing for functions. None of it is required.

```typescript
// no return type declaration
const getSum = (n1: number, n2: number) => n1 + n2;

// no parameter type
const getSum = (n1, n2): number => n1 + n2;

// no typing
const getSum = (n1, n2) => n1 + n2;
```

- Not declaring a type on either the parameter or return essentially declares an `any` type.
- If you aren't returning anything, use the `void` type.

```typescript
const getSum = (n1: number, n2: number): void => console.log(n1 + n2);
```

### Optional Parameters

- You can declare optional parameters in TypeScript using a `?`.

```typescript
const getFullName = (firstName: string, lastName?: string): string => {
  if (lastName) {
    return `${firstName} ${lastName}`;
  }
  return firstName;
};
```

- Optional parameters must be declared last in your function signature.

```typescript
// ok
const getFullName = (
  firstName: string,
  middleInitial: string,
  lastName?: string
): string => {
  // do stuff
};

// still ok
const getFullName = (
  firstName: string,
  middleInitial?: string,
  lastName?: string
): string => {
  // do stuff
};

// not ok
const getFullName = (
  firstName: string,
  middleInitial?: string,
  lastName: string
): string => {
  // do stuff
};
```
