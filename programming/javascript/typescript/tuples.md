# TypeScript Tuples

- [TypeScript Tuples](#typescript-tuples)
  - [Overview](#overview)
  - [Usage](#usage)
  - [Weird Behavior](#weird-behavior)

## Overview

- Tuples are fixed-length arrays where each item in the array has its own type.

## Usage

- You can declare tuples directly, using [].
- You can also declare a custom type that defines the shape of your tuple, then use that as your type declaration.

```typescript
// direct tuple declaration
const myListArr: [string, number, boolean] = ['blue', 2, false];

// custom type
type MyTuple = [number, string, boolean];
const myListArr: MyTuple = [1, 'red', true];
```

## Weird Behavior

- Though they're supposed to be fixed-length, TypeScript tuples technically aren't fixed-length.
- Once you satisfy the initial pattern of the tuple, you can add whatever you want afterward.
  - TypeScript will throw an error if you try to reassign the tuple to a shape that doesn't match, in either structure or length.

```typescript
type MyTuple = [number, string, boolean];
let myListArr: MyTuple = [1, 'red', true]; // valid
myListArr.push(true); // valid
myListArr.push(5); // valid
myListArr = [1, 'red', true, 4, 'blue', 5, false]; // not valid because it doesn't match the length of the MyTuple shape.
myListArr = ['one', 'red', true]; // not valid because it doesn't match the structure of the MyTuple shape.
```
