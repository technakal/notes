# Polymorphism

- Polymorphism is about objects behaving differently based on their type.

## Virtual Methods

- Virtual methods allow subclasses to use their own implementation of a given method.
- For example, if the base class has a Move() method, but you want your subclasses to be able to Move() differently, you'd turn Move(), in the base class, into a Virtual Method.
- To set up a virtual method, you add the `virtual` keyword to the base method.

```c#
public virtual void Move()
{
  // do some move action
}
```

- In the subclass, add the method you want to override, but use the `override` keyword in place of the virtual keyword here.

```c#
public override void Move(int distance)
{
  // move differently
}
```

- To use the base method, rather than the override method, you can specify the `base` keyword when calling the method. Like this:

```c#
public override void Move(int distance)
{
  if(this._type == "human")
  {
    base.Move(distance);
  }
}
```

## Virtual Properties

- NOTE: Fields are not properties. Fields cannot be overridden.
- Just like virtual methods, properties can also be overridden by subclasses.
- Again, you use the `virtual` and `override` keywords.
- It can also be tricky to figure out what to set the access modifier to. 
  - `private` prevents even subclasses from accessing the property.
    - `private` properties and methods can't be overridden.
  - `public` gives too much acces. 
  - `protected` access modifier allows property access to a class and any of its subclasses.
  - Note that the access properties of the `override` must match the access properties of the `virtual`. 
    - One can't be `private` while the other is `protected`, for instance.
    - In other words, sublcasses can't change the access modifiers of their base classes.

- Below, we create a virtual property, `StepSize`, and allow the subclass of Invader to override it.
  - `StepSize` is a readonly method, so we can initialize it with the shorthand you see below.
```c#
// base class
class Invader
{
  protected virtual int StepSize { get; } = 1;
  // other junk
}

// sub class
class FastInvader : Invader
{
  protected override int StepSize { get; } = 2;
  // other junk
}
```

- Here's another example, with a setter as well.
```c#
// base class
class Invader
{
  public virtual int Health { get; protected set; } = 2;
  // other junk
}

// sub class
class BullInvader : Invader
{
  public override int Health { get; protected set; } = 4;
  // other junk
}
```

### Override vs. New

- What's the difference between override and new?

```c#
// base class
class Base
{
  protected virtual string Name { get } = "Base";
  // other junk
}

// new keyword class
class Sub : Base
{
  protected new string Name { get } = "Sub 1";
  // other junk
}

// override keyword class
class Sub2 : Base
{
  protected override string Name { get } = "Sub 2";
  // other junk 
}
```

- Here's [an article](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/knowing-when-to-use-override-and-new-keywords) on the topic.
- Most of the time, just use `override`.

## Accessor Access Methods

## Override vs. New
