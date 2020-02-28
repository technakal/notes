# Functions and Callbacks

- In programming, we try to generalize where we can so that code can be reused for many purposes.

```js
// specific
function tenSquared() {
  return 10 * 10;
}
// specific again
function nineSquared() {
  return 9 * 9;
}
// generalized...!
function squareNum(num) {
  return num * num;
}
```

- Parameters allow us to write code, and decide on the data to use for that code later.

## Higher Order functions

- Higher-order function - A function that takes in or returns another function.
- Callback function - A function inserted into a higher-order function.
- Higher order functions follow this same principle. Instead of leaving just the data to be determined later, we can acually leave some of our code to be dterimned later. That is, we can use a placeholder parameter, and fill it in later with a function.

```js
const copyArrayAndDoSomething(arr, fn) => {
  const output = [];
  for(let i = 0; i < arr.length(); i++) {
    output.push(fn(arr[i]));
  }
  return output;
}
```

- This works because, in JavaScript, functions are first-class citizens.
  - They can be used just like values or objects or arrays.
