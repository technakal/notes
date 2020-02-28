# Closures

- The most esoteric concept in JavaScript.
  - Empowers you to do powerful things like write pro-level functions such as `once` or `memoize`.

## Functions With Memory

- When we invoke functions, the compiler creates a little live store of memory for that function.
- When the function finishes executing, this memory is deleted (with the exception of whatever it `return`s);
- Closures change this behavior by allowing the local memory to not vanish.
  - Closures all start with higher-order functions--specifically, the returning of a function from a function creates a closure.
- When you return a function from a function, and store that returned function, the returned function has _zero_ relationship to the original function.
  - Below, `generatedFunc` stores the result of `funcFactory`--that is, it stores the returned function, formerly known as `multiplyBy2`. However, `generatedFunc`, after the resolution of `funcFactory` doesn't know anything about `funcFactory`. It has no relationship with the function that returned its present value.

```js
<<<<<<< HEAD
// this is not a closure, but it's on the road to closures.
=======
>>>>>>> 32e6ce97ca7c4d0dc406ebf638b143daf4b83b1a
function funcFactory() {
  function multiplyBy2(num) {
    return num * 2;
  }
  return multiplyBy2;
}

const generatedFunc = funcFactory();
const result = generatedFunc(2);
```
<<<<<<< HEAD

## Nested Function Scope

-

```js
function outer() {
  let counter = 0;
  function incrementCounter() {
    counter++;
  }
  return incrementCounter();
}

outer();
```
=======
>>>>>>> 32e6ce97ca7c4d0dc406ebf638b143daf4b83b1a
