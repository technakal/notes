# [System.Object](https://docs.microsoft.com/en-us/dotnet/api/system.object?redirectedfrom=MSDN&view=netframework-4.8)

- The common base class from which all C# classes inherit, even custom-made classes.

## Methods

- Equals(Object)
- Equals(Object, Object)
- Finalize()
- GetHashCode()
- GetType()
- MemberwiseClone()
- ReferenceEquals(Object, Object)
- ToString()

### ToString()

- Converts an object to a string.
- By default, returns the name of the object.

```c#
class Shoe {}

Shoe s = new Shoe();

s.ToString() // "Shoe"
```

- The concatenation operation in C# calls the ToString() method by default. 
  - You can actually use a ToString() override effectively due to this behavior.
  - Below, we've set it so now, any time ToString() is called on this class, it returns the coordinates formatted as "X, Y".

```c#
// setting the override
public override string ToString()
{
  return $"{X}, {Y}";
}

// using the override
public MapLocation(int x, int y, Map map) : base(x, y)
{
  if (!map.OnMap(this))
  {
    throw new OutOfBoundsException(this + " is outside the boundaries of the map.");
  }
}
```

### Object Equality

- The equality operator (`==`) calls `Equals()`.
- By default, `Equals()` calls `ReferenceEquals()`.
- `ReferenceEquals()` checks if the two items point at the same object. Not whether they're equal in terms of value.
- So, when using the equality operator, without overriding the `Equals()` method, you're checking whether the two objects are the same object. Not whether they contain the same values.
- You can use an override to change how `Equals()` works.
  - This won't change how `==` works. Just let's you use `x.Equals(y)` to get around the `==` stuff.
- None of the above matters for `int`, `string`, `double`, etc. Those are comparing values by default. The above is just for objects.

```c#

// overriding Equals
public override bool Equals(object obj)
{
  if(!(obj is Point))
  {
    return false; 
  }
  Point that = obj as Point;
  
  return this.X == that.X && this.Y == that.Y;
}

// using equals
public bool IsOnPath(MapLocation location)
{
  foreach(var pathLocation in _path)
  {
    if(pathLocation.Equals(location))
    {
      return true; 
    }
  }
  return false;
}
```

- Overriding `Equals()` without overriding `GetHashCode()` throws a compiler warning. Find out why below.

### GetHashCode()

- The hash code is a integer that references an object.
- It provides a handy way to access an object.
- When overriding `Equals()`, it's important to override the `GetHashCode()` method as well. This allows the program to understand how it should treat the hash codes of the two items you're comparing.
- `GetHashCode()` returns one integer.
  - Best practice is to make it return the `GetHashCode()` of whatever properties of the object you're using to generate the object's `GetHashCode()`.

```c#
public override int GetHashCode()
{
  return X.GetHashCode() * 31 + Y.GetHashCode();
}
```

- Above, we multiply the `GetHashCode()` of X by a prime number to help minimize the chances of it sharing a `GetHashCode()` with a similar object. We add the result to the `GetHashCode()` of Y to create a new `GetHashCode()` fro the object.
  - Now, any object that has a hash code that matches `X.GetHashCode() * 31 + Y.GetHashCode()` is probably the same as the object we have defined.

### Finalize()

- The compiler runs through our code and cleans up items that take up memory once they're no longer used.
- The purpose of `Finalize()` is to run some last minute code on the object before it is removed from memory. It's like a wrap up function before the object vanishes forever.
- You can override it to make it wrap up in *whatever* way you need. Pretty cool.