# TypeScript Interfaces

- [TypeScript Interfaces](#typescript-interfaces)
  - [Overview](#overview)
  - [Usage](#usage)
    - [The Problem](#the-problem)
    - [Interfaces -- The Solution](#interfaces----the-solution)

## Overview

- Interfaces allow you to define custom types.
- It's all about composition, baby! Defining the shape of things to come.

## Usage

### The Problem

- Without interfaces, your code might look something like this:
  - Within the parameters, we're defining a todo type, which has a `string` title and `string` text.

```typescript
const showTodo = (todo: { title: string; text: string }): void => {
  console.log(`${todo.title}: ${todo.text}`);
};
```

### Interfaces -- The Solution

- Interfaces allow us to clean up this mess by defining the shape of that todo elsewhere.
- We create an interface in a similar way to creating a custom type.
  - We define the composition of the interface--what it must include to exist.

```typescript
interface Todo {
  title: string;
  text: string;
}

function showTodo(todo: Todo): void {
  console.log(`${todo.title}: ${todo.text}`);
}

const myTodo: Todo = {
  title: 'Code some stuff',
  text: 'Make the next best thing.',
};
```
