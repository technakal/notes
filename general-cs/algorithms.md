# Algorithms

## Definition of an Algorithm

- Has a clear problem statement. :anger:
- Is a set of steps that solves the problem. :ballot_box_with_check:
- Every step must be explicitly clear. No ambiguity. :thumbsup:
- Must produce a result. :blue_book:
- Must produce consistent results. :straight_ruler:
- Must complete, and not take an infinite amount of time. :watch:

## Good Algorithms
- Good algorithms are measured by correctness and efficiency.
  - An algorithm can't be good if it isn't correct. That is, if it doesn't produce a consistent result, or doesn't terminate.
- Efficency is measured by time and space:
  - _Time Complexity_ - A measure of the running time of an algorithm
  - _Space Complexity_ - A measure of how much working storage, or extra storage, is needed as a particular algorithm grows
    - [Tail call](https://stackoverflow.com/a/310980/1071846) - a call, inside a function, to the same function itself as the last operation. Also called tail recursion.

### Measuring Good
- Order of growth - a measure of how much the time taken to execute operations increases as the input size increases.
- Big O - a theoretical definition of the complexity of an algorithm as a function of the size.
- Average runtime efficiency.

## Types of Searches
- Linear Search
  - Progresses sequentially through a list until it finds the target value.
  - List doesn't need to be sorted.
  - Inefficient on large datastores.
- Binary Search
  - Splits the list, determining whether the target value is greater than or less than the guess. Discards whatever portion of the list the target can't be in, then continues splitting the list, eliminating half every time.
  - List must be sorted.
  - Efficient.

## Big O Notation
- Constant Time - O(1): The runtime of the algorithm is independent of the size of the data set. If n is 1 or 1 million it takes the same amount of time to execute the algorithm.
- Logarithmic Time - O(log n): The runtime of the algorithm increases logarithmically as the size of the data set increases.
- Linear Time - O(n): The runtime of the algorithm is directly proportional to the size of the data set.
- Quadratic Time - O(n^2): The runtime of the algorithm increases by a factor of n squared as the size of the data set increases.
- Quasilinear Time - O(n log n): Given a data set of size n, the algorithm executes an n number of operations where each operation runs in log n (logarithmic) time.
- Polynomial runtimes - O(n ^ k): An algorithm is considered to have a polynomial runtime if, for a given value of n, it's worst case runtime is in the form of n raise to the k power. Examples of this are O(n^2) and O(n^3). Algorithms with polynomial runtimes are considered efficient.
- Exponential runtime - O(k^n): A runtime where number of operations increases exponentially as the size of the data set increases. Exponential runtimes are considered inefficient.
- Combinatorial or factorial runtime - O(n!) - Runtimes where as the size of n increases the number of operations increases by n! where n! is the factorial of n.
