# TypeScript Void, Null, and Undefined

- [TypeScript Void, Null, and Undefined](#typescript-void-null-and-undefined)
  - [Overview](#overview)
  - [Usage](#usage)

## Overview

- TypeScript uses the type `void` to capture null and undefined values.
  - Void is typically used as the return type from a function that returns nothing.
- TypeScript also has a `null` type to capture null and undefined values.
- Finally, TypeScript has an `undefined` type to capture undefined values.
  - Dumb, but it can also capture null.
  - Why would anyone declare something they want to be undefined forever?
- All three seem to be interchangeable.

## Usage

- `void` type:

```typescript
let myVoid: void = null;
let myVoid2: void;

function allSideEffects(num: number): void {
  // do side effects stuff
}
```

- `null` type:

```typescript
let myNull: null = null;
let myNull2: null;
```

- `undefined` type:

```typescript
let myUndefined: undefined;
let myUndefined2: undefined = null;
```
