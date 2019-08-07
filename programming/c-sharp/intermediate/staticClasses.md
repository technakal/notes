# Static Classes

- Static classes are collections of methods that can be accessed without instantiating an object based on that class.
  - You actually can't instantiate static classes at all.
  - Think of the `Math` class. You can use it wherever, without saying `Math math = new Math()`. It's static.
  - `Console` is another static class.
- Static classes can't inherit, nor can they be inherited from.
- Instead of working with instances of the class, you work directly with the class itself.

```c#
static class Random
{
  private static System.Random _random = new System.Random();

  public static double NextDouble()
  {
    return _random.NextDouble();
  }
}
```

## Best Practices

- Static classes are global, so you have to use the same caution you normally use with globals.
- The members of a static class should be immutable.
  - Unless the side effects from mutable data are acceptable in your application.
