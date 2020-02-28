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
// this is not a closure, but it's on the road to closures.
function funcFactory() {
  function multiplyBy2(num) {
    return num * 2;
  }
  return multiplyBy2;
}

const generatedFunc = funcFactory();
const result = generatedFunc(2);
```

## Retaining Function Memory

- When you return a function from within a function, it brings with it all of the surrounding data from where it was saved, like a little backpack.
  - Function definitions that are returned from other functions get a hidden property called `[scope]`, which links to the place in memory where the surrounding data is stored.
  - This "backpack" of memory has a few names:
    - The advanced name is the Persistent Lexical Scope Referenced Data (PLSRD).
    - Others call it the Closed Over Variable Environment (COVE).
    - The official name is the Closure, which is unfortunate because this is also the name of the thing that produces the backpack. It's the name for both the backpack and the thing that creates the backpack. Ucky.
    - I'm just gonna call it the Backpack.
  - Backpacks are independent for each unique instantiation of the closure. However, shared closures... uh... share backpacks.

```js
function outer() {
  let counter = 0;
  function incrementCounter() {
    counter++;
  }
  return incrementCounter();
}

const myNewFunction = outer(); // incrementCounter { counter++ }
myNewFunction(); // counter++
myNewFunction(); // counter++
```

- You can also chain inner scopes. So, if a function returns a function that returns a function, each further nested function has access to its papa's context.
- Also, you can pass functions into functions, and the function you pass into will have the parameter function's context.
  - This enables partial application, currying, and function decorations.

## Practical Applications

- Helper functions like once and memoize become possible.

```js
function once() {
  const run = false;
  const counter = 0;
  return incrementCounter() {
    if(run === false ) {
      counter++;
      return counter;
    } else {
      return 'This can only be run once.';
    }
  }
}

function nthPrime(arg) {
  const memoization = {}
  if(memoization.hasOwnProperty(arg)) {
    return memoization[arg];
  }
  return () => {...}
}
```

- Iterators and generators - modern JavaScript data handling patterns become possible.
- Module pattern - preserve application state without pollution global context.
- Asynchronous JavaScript - Callbacks and promises require closures to persist state.
