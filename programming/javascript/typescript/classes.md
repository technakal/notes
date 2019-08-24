# TypeScript Classes

- [TypeScript Classes](#typescript-classes)
  - [Overview](#overview)
  - [Usage](#usage)
    - [Inheritance](#inheritance)

## Overview

- TypeScript brings object-oriented class syntax to JavaScript!
- Classes have a very similar syntax here to Java, C#, etc.

## Usage

- The syntax looks similar to JavaScript's native classes.
  - It has a constructor method.
  - It also has properties and methods.
  - Properties and methods can have types and access modifiers.

```typescript
class User {
  public name: string;
  private email: string;
  private _age: number;

  constructor(name: string, email: string, age: number) {
    this.name = name;
    this.email = email;
    this._age = age;
  }

  public register(): void {
    console.log(`New user created: ${this.name}, ${this.email}, ${this._age}`);
  }
}
```

### Inheritance

- Classes can inherit from other classes using the `extends` keyword.
- In the constructor, the subclass must take in all of the required parameters of the base class.
  - It must pass these to the `super()` method.
- Once declared, the subclass can access any `public` or `protected` properties or methods of the base class.

```typescript
class Member extends User {
  private _id: number;
  private _startDate: Date;
  private _discountLevel: number;

  constructor(
    id: number,
    startDate: Date,
    name: string,
    email: string,
    age: number
  ) {
    super(name, email, age);
    this._id = id;
    this._startDate = new Date();
  }
}
```

- You can, kind of, override methods from a baseclass using the `super.methodName()` technique.

```typescript
// base class
class User {
  // properties and constructor...

  public register(): void {
    console.log(`New user created: ${this.name}, ${this.email}, ${this._age}`);
  }
}

// subclass
class Member extends User {
  // properties and constructor...

  public register(): void {
    super.register();
    console.log(`New user is a member!`);
  }
}
```
