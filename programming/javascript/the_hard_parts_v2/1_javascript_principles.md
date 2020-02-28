# JavaScript Principles

- Thread of Execution - JavaScript goes through our code, line-by-line, and executes each line. It's called the thread of execution.
  - Take the code, do it. Take the code, do it, etc.
- Memory - JavaScript remembers the things it enconters in its thread and saves it. This includes values, arrays, and even functions.

```js
const num = 3;
function multiplyBy2(inputNumber) {
  // indentifier = multiplyBy2, parameter = inputNumber
  const result = inputNumber * 2;
  return result;
}

const output = multiplyBy2(num);
const newOutput = multiplyBy2(10);
```

- Functions - every function in your code creates, when run, its own execution context. Every execution context is like a mini JavaScript program--with its own thread of executiona and memory.

```js
function multiplyBy2(inputNumber) {
  // new execution context, when run
  const result = inputNumber * 2;
  return result;
}
```

- Call stack - JavaScript keeps track of what is currently running using the call stack. JavaScript only engages with whatever's on the top of the call stack.
  - The base of the call stack is always `global`.
  - When something completes running, it is removed off the top of the call stack. Then, JavaScript works on the next item--the new top.
  - Keeps track of where the thread of execution is.
