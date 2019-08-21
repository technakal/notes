# TypeScript Basics

- [TypeScript Basics](#typescript-basics)
  - [Overview](#overview)
  - [Installing TypeScript](#installing-typescript)
  - [Using TypeScript](#using-typescript)
    - [Writing TypeScript](#writing-typescript)
      - [Typing](#typing)
      - [Custom Types](#custom-types)
      - [Interfaces](#interfaces)
      - [Strong-Typing Arrays](#strong-typing-arrays)
      - [TypeScript Tuples](#typescript-tuples)
      - [Strong-Typing Functions](#strong-typing-functions)
      - [Generics](#generics)
    - [Compilation](#compilation)
    - [tsconfig](#tsconfig)
    - [Third-Party Libraries](#third-party-libraries)
  - [Resources](#resources)

## Overview

TypeScript is a super-script of JavaScript. It has virtually no learning curve for JavaScript developers.

## Installing TypeScript

- Installing TypeScript gives you access to the TypeScript compiler (TSC).

```shell
npm i -g typescript
```

## Using TypeScript

### Writing TypeScript

- TypeScript files use the .ts extension.
- TypeScript files are written just like JavaScript, with extra features.

#### Typing

- To type something, just add a colon and the type.
  - Below, lucky is a type of number now.

```typescript
let lucky: number = 23;
```

- The typing system is optional, kind of.
- By default, when you initialize a variable, you're assigning it a type, even if you're not doing it explicitly.

```typescript
let lucky = 23; // lucky is now a number type.

lucky = '23'; // this is an error!
```

- You can explicitly tell a variable to accept whatever type you want using the `any` keyword.
  - Kind of defeats the purpose, but gives you some flexibility when you need it.
  - Declaring a variable without assigning a type also makes it an `any`.

```typescript
let lucky: any = 23; // it's a number, but it could be anything.

lucky = '23'; // no problem.
```

#### Custom Types

- You can also declare custom types by using the `type` keyword.
  - Below, we create a Style type that is either 'bold' or 'italic'. Then, we can use it to type new variables as we create them.

```typescript
type Style = 'bold' | 'italic'; // we've created a style type. it must be either bold or italic.

let font: Style = 'bold'; // this works.
let font2: Style = 'big!'; // this is an error because it doesn't match the type we declare.
```

#### Interfaces

- More often than custom types, you'll use interfaces to enforce the shape of an object.

```typescript
interface Person {
  first: string;
  last: string;
}

const person1: Person = {
  first: 'Holden',
  last: 'Ford',
};

const person2: Person = {
  first: 'Bill',
  last: 'Tench',
  smoker: true, // error because it doesn't match our shape
};

const person3: Person = {
  first: 'Wendy',
  last: 'Carr',
};
```

- You can make interfaces more flexible, only enforcing keys you require but allowing for other keys to exist as well.

```typescript
interface Person {
  first: string;
  last: string;
  [key: string]: any;
}
```

#### Strong-Typing Arrays

- You can strong type arrays.
  - This is especially useful when using an array of objects because you can then get Intellisense on those objects as you iterate over them in the array. Wowza!
- To type an array, just add the type with square brackets.
  - Now, anything not of that type that tries to push into that array will return an error by the compiler.

```typescript
// primitive type
const numArr: number[] = [];
numArr.push(1);
numArr.push(2);
numArr.push(false); // error!

// custom type (object)
const personArr: Person[] = [];
```

#### TypeScript Tuples

- TypeScript introduces JavaScript to the world of tuples.
- Tuples are fixed-length arrays where each item in the array has its own type.

```typescript
type MyList = [number, string, boolean];

const myListArr: MyList = [1, 'red', true];'
```

#### Strong-Typing Functions

- Functions have types for the parameters and the return value.

```typescript
// structure
function funcName(param1: type, param2: type): returnType {
  return returnValue;
}

// function declaration
function sayName(person: Person): string {
  return `${person.first} ${person.last}`;
}

// arrow syntax
const sayName = (person: Person): string => ${person.first} ${person.last}`;
```

- You can designate optional parameters using the `?` suffix.
- You can also return nothing using the `void` type:

```typescript
const sideEffect = (num1: number, num2: number): void => {
  let num3 = num1 + num2;
};
```

#### Generics

- You can use generics to dynamically assign types within class declarations.
- I don't really get it, but I think, basically, this means you can pass whatever type you want into the Observable and it will make the resulting class of that type.

```typescript
class Observable<T> {
  constructor(public value: T) {}
}

let x: Observable<number>;
let y: Observable<number>;
let z = new Observable(23);
```

### Compilation

- TypeScript requires compilation.
- The tsc provides this compilation ability.
  - Compilation is super easy. just `tsc filename.ts`

```shell
tsc index.ts
tsc Buttons.ts
tsc spdemo.ts
```

- By default, the compiler compiles to ES3, which means it has to do a bunch of polyfill for things like `async...await`.
  - Anything modern, really.
- The compiler is sophisticated, though. It has a bunch of [options for compilation](https://www.typescriptlang.org/docs/handbook/compiler-options.html).
  - Even better than using these options on the command line is to create a tsconfig.json file.

### tsconfig

- `tsconfig.json` handles all kinds of configuration details for TypeScript's compiler.
- Here's a [guide to tsconfig](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).
- Most common configuration options:
  - target - tells which version of JavaScript to compile to.
  - watch - Sets up tsc as a watcher.
  - lib - Tells TS which libraries you want it to give Intellisense on.

### Third-Party Libraries

- Some libraries don't have native TypeScript documentation.
  - lodash is one example.
- You can install it for these libraries, many times, using the @types library.
  - This will give you autocomplete and TypeScript Intellisense on whatever library.

```shell
npm i -D @types/lodash
```

## Resources

- [TypeScript Deep Dive](https://basarat.gitbooks.io/typescript/content/) by Basarat Ali Syed
