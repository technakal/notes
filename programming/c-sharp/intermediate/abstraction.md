# Abstraction

- Abstraction is thinking about an object in terms of its public interface.
- When designing a class, we don't need to think about the concrete implementation of the class. We can think in terms of the abstract implementation.
  - For example, in the Invader class, we don't need to think in terms of how much health it or its sub-classes have. We only need to know that the program can ask it how much health it has.
    - It has health, and the public interface exposes this health.

## Abstract Class

- You can create a base class that isn't actually a concrete member of its type. For example, you can implement an abstract Car base class that just acts as a template for concrete Car subclasses.
  - In the example below, we'd never actually implement a Car. We'd implement a type of car from the subclasses. Car just gives them a model to fashion themselves on.

> Car
>
> > Sports Car  
> > SUV  
> > Van

### Defining an Abstract Base Class

- You can use the `abstract` keyword to define an abstract base class.
- You can't instantiate any class with the modifier `abstract`. You can only use them as the base class of subclasses.
  - The compiler will throw an error, fool.
- Convention is also to append the word `Base` to the end of the name for any base classes.
  - This is personal preference. It makes it clear that its not a class to instantiate.

```c#
abstract class InvaderBase
{
  // invader properties and methods
}
```

### Abstract Members

- Abstract members of an abstract class don't have implementations. Subclasses can provide them though.
- You can use the keyword `abstract` on members, in place of `virtual`, to make an abstract member.
  - This requires subclasses to provide those implementation details so that nothing is falling back to the default.

```c#
abstract class InvaderBase
{
  public abstract int Health { get; private set; }
}

class BasicInvader : InvaderBase
{
  public override int Health { get; private set; } = 2;
}
```

- You can do the same thing with methods.
  - In the case of methods, the base class can't have an implementation of the abstract method.

```c#
abstract class InvaderBase
{
  public abstract void Move();
}

class BasicInvader : InvaderBase
{
  public override void Move() => _pathStep += StepSize;
}
```

- When deciding whether to use abstracts, just remember that implementation details for the abstract method or member must be provided by every subclass of that base class.

## [Interfaces](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/interfaces/)

- An interface is defined as a syntactical contract that all the classes inheriting the interface should follow.
  - The interface defines the 'what' part of the syntactical contract and the deriving classes define the 'how' part of the syntactical contract.
- An interface contains definitions for a group of related functionalities that a class or a struct can implement.
  - Defines what the properties and methods are, and what their parameters and return types are.
- By using interfaces, you can include behavior from multiple sources in a class.
  - That capability is important in C# because the language doesn't support multiple inheritance of classes.
- In addition, you must use an interface if you want to simulate inheritance for structs, because they can't actually inherit from another struct or class.

```c#
interface IInvader
{
  MapLocation Location { get; }

  bool HasScored { get; }

  int Health { get; }

  bool IsNeutralized { get; }

  bool IsActive { get; }

  void Move();

  void DecreaseHealth(int factor);
}
```

- Interfaces can only declare the public members of the classes that implement the interface.
- Any time a class inherits an interface, it must implement the members of that interface.

### Why Interface?

- Interfaces seem like less flexible versions of abstract base classes. So why would you ever use an interface?
- Abstract base classes contain the implementation for code that should be shared by the concrete subclasses of that base class.

#### Multiple Inheritance

- C# only allows any subclass to inherit from one base class.
  - Inheriting from multiple base classes is called "multiple inheritance". It's not allowed in C#.
- A class can inherit from as many interfaces as it needs to, though.
  - It doesn't matter if two interfaces share the same method signature.
  - Interfaces can also inherit from other interfaces.
- To inherit from multiple interfaces, you just list them after the inheritance colon.

```c#
// interface inheriting from other interfaces
interface IOne
{
  // do stuff
}

interface ITwo
{
  // do stuff
}

interface IMain : IOne, ITwo
{
  // do more stuff
}

// class inheriting
class Person : IMain
{
  // implementation details
}
```

- In the above, the class could have, instead, inherited from IMain, IOne, and ITwo independently, which would look like this:

```c#
class Person : IMain, IOne, ITwo
{
  // implementation details
}
```

## Composition

- Creating a new type by combining one or more types together.
- Most programmers prefer to use composition rather than base-class inheritance.

- In this lengthy example, we use `IInvader` as a reference interface. Then, we compose a class based on the composition of other classes--`BasicInvader` and `BullInvader`.
  - This creates a totally new class that is not dependent on the `InvaderBase`, but is instead the composition of other classes.

```c#
class LazarusInvader : IInvader
{
  private BasicInvader _firstIncarnation;
  private BullInvader _secondIncarnation;

  public bool HasScored => _firstIncarnation.HasScored || _secondIncarnation.HasScored;

  public int Health => _firstIncarnation.IsNeutralized
    ? _secondIncarnation.Health
    : _firstIncarnation.Health;

  public bool IsNeutralized => _firstIncarnation.IsNeutralized && _secondIncarnation.IsNeutralized;

  public bool IsActive => !(IsNeutralized || HasScored);

  public MapLocation Location => _firstIncarnation.IsNeutralized
    ? _secondIncarnation.Location
    : _firstIncarnation.Location;

  public LazarusInvader(Path path)
  {
    _firstIncarnation = new BasicInvader(path);
    _secondIncarnation = new BullInvader(path);
  }

  public void Move()
  {
    _firstIncarnation.Move();
    _secondIncarnation.Move();
  }

  public void DecreaseHealth(int factor)
  {
    if(!_firstIncarnation.IsNeutralized)
    {
      _firstIncarnation.DecreaseHealth(factor);
    }
    else
    {
      _secondIncarnation.DecreaseHealth(factor);
    }
  }
}
```

### References

- [C# Reference](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/interface)
- [Microsoft Programming Guide](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/interfaces/)
- [TutorialsPoint](https://www.tutorialspoint.com/csharp/csharp_interfaces.htm)
