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
  - Within the parameters, we're defining a TODO type, which has a `string` title and `string` text.

```typescript
const showTODO = (TODO: { title: string; text: string }): void => {
  console.log(`${TODO.title}: ${TODO.text}`);
};
```

### Interfaces -- The Solution

- Interfaces allow us to clean up this mess by defining the shape of that TODO elsewhere.
- We create an interface in a similar way to creating a custom type.
  - We define the composition of the interface--what it must include to exist.

```typescript
interface TODO {
  title: string;
  text: string;
}

function showTODO(TODO: TODO): void {
  console.log(`${TODO.title}: ${TODO.text}`);
}

const myTODO: TODO = {
  title: 'Code some stuff',
  text: 'Make the next best thing.',
};
```
