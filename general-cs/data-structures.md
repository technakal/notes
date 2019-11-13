# Introduction to Data Structures

## Definitions

- Data Structure - A data structure is a collection of values and the format they are stored. Data structures model the relationships between the values in the collection as well as the operations applied on the data stored in the structure.
- Contiguous Memory - Blocks of memory situated right beside each other with no gaps
- [Linked Lists](https://en.wikipedia.org/wiki/Linked_list) -

## Custom Linked List

- Below is code to implement a custom data structure--a singly linked list--in JavaScript.

```js
/**
 * Creates a custom class for an element of the linked list.
 * @param {string} data - An integer or string or whatever you want to store, I guess.
 */
class Node {
  constructor(data) {
    // each node contains data and a reference to the next element in the linked list.
    this._data = data;
    this._nextNode = null;
  }

  /**
   * Returns the data stored in the node.
   * @returns data
   */
  get data() {
    return this._data;
  }

  /**
   * Returns the next node in the linked list series.
   * @returns {object} nextNode
   */
  get nextNode() {
    return this._nextNode;
  }

  /**
   * Sets the next node in the linked list series.
   * @param {object} node - A node object.
   */
  set nextNode(node) {
    this._nextNode = node;
  }
}

/**
 * Creates the linked list data structure.
 * @param {object} node - A node object. null by default.
 */
class LinkedList {
  constructor(node = null) {
    this._head = node;
  }

  /**
   * Returns the length of the linked list.
   * @returns {integer} count - The length of the linked list.
   */
  get size() {
    let current = this._head;
    let count = 0;

    while (current !== null) {
      count += 1;
      current = current._nextNode;
    }

    return count;
  }

  /**
   * Returns the first node in the linked list.
   * @returns {object} node - A node object.
   */
  get head() {
    return this._head.node;
  }

  /**
   * Sets the first node in the series.
   * @param {object} data - A node object.
   */
  set head(data) {
    return (this._head = data);
  }

  /**
   * Returns the complete linked list.
   * @returns {string} nodes - The linked list, in string format.
   */
  get list() {
    const nodes = [];
    let current = this._head;

    while (current !== null) {
      if (current === this._head) {
        nodes.push(`[Head: ${current.data}]`);
      } else if (current.nextNode === null) {
        nodes.push(`[Tail: ${current.data}]`);
      } else {
        nodes.push(`[${current.data}]`);
      }
      current = current.nextNode;
    }
    return nodes.join("->");
  }

  /**
   * Checks if the linked list is empty.
   * @returns {bool} boolean - Whether the list is empty.
   */
  isEmpty() {
    return this._head === null;
  }

  /**
   * Adds a new node to the head of the linked list.
   * @param {object} data - A node object.
   */
  add(data) {
    const newNode = new Node(data);
    newNode.nextNode = this._head;
    this._head = newNode;
  }

  /**
   * Removes the node with _data matching the specified key.
   * @param {string} key - A value.
   * @returns {object} current - The removed node.
   */
  remove(key) {
    let current = this._head;
    let previous;
    let found = false;

    while (current !== null && !found) {
      if (current.data === key && current === this._head) {
        found = true;
        this.head = current.nextNode;
      } else if (current.data === key) {
        found = true;
        previous.nextNode = current.nextNode;
      } else {
        previous = current;
        current = current.nextNode;
      }
    }
    return current;
  }

  /**
   * Searches for a node with _data matching the specified key.
   * @param {string} key - A value.
   * @returns {object} current - The found node or 'Not found'.
   */
  search(key) {
    let current = this._head;
    while (current !== null) {
      if (current.data === key) {
        return current.data;
      } else {
        current = current.nextNode;
      }
    }
    return "Not found.";
  }

  /**
   * Inserts a node at the specified index.
   * @param {object} data - A node.
   * @param {integer} index - An index value.
   * @returns {object} current - The removed node.
   */
  insert(data, index) {
    if (index === 0) {
      return this.add(new Node(data));
    }

    if (index > 0) {
      const newNode = new Node(data);
      let position = index;
      let current = this._head;

      if (position > this.size - 1) {
        position = this.size;
      }

      while (position > 1) {
        current = current.nextNode;
        position--;
      }

      const prevNode = current;
      const nextNode = current.nextNode;

      prevNode.nextNode = newNode;
      newNode.nextNode = nextNode;
    }
  }
}
```

## Custom Merge Sort on JavaScript Array

- Below is a custom function for performing a merge sort on an unsorted list.

```js
/**
 * Sorts a list in ascending order.
 * Runs in O(kn log n) time.
 * @param {array} arr - An unsorted array.
 * @returns {array} sortedArr - A new sorted array.
 */
const mergeSort = arr => {
  // find midpoint of list and divide.
  // recursively sort sub-lists in previous step.
  // merge sub-lists.

  if (arr.length <= 1) {
    return arr;
  }

  const newArr = arr.map(elem => elem);

  const { leftHalf, rightHalf } = split(arr);

  const left = mergeSort(leftHalf);
  const right = mergeSort(rightHalf);

  return merge(left, right);
};

/**
 * Divides an unsorted list at midpoint.
 * Runs in O(log n) time.
 * @returns {array} leftHalf - The left half of the array.
 * @returns {array} rightHalf - The right half of the array.
 */
const split = arr => {
  const mid = arr.length / 2;
  const leftHalf = arr.slice(0, mid);
  const rightHalf = arr.slice(mid);
  return { leftHalf, rightHalf };
};

/**
 * Merges two arrays together.
 * Runs in O(k) time.
 * @param {array} left - The array that should be prepended.
 * @param {array} right - The array that should be appended.
 * @returns {array} list - The joined array.
 */
const merge = (left, right) => {
  const list = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      list.push(left[i]);
      i++;
    } else {
      list.push(right[j]);
      j++;
    }
  }

  while (i < left.length) {
    list.push(left[i]);
    i++;
  }

  while (j < right.length) {
    list.push(right[j]);
    j++;
  }

  return list;
};

/**
 * Verifies that the passed array is sorted in ascending order.
 * @param {array} arr - The array to check.
 * @returns {boolean} sorted - Whether the list is sorted.
 */
const verifySorted = arr => {
  const length = arr.length;

  if (length === 0 || length === 1) {
    return true;
  }

  return arr[0] <= arr[1] && verifySorted(arr.slice(1));
};
```
