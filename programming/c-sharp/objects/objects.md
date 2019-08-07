# Objects

- Classes have four privary properties, called members:
  - Fields
  - Properties
  - Methods
  - Constructors
- There are other members than these.

## Designing a Set of Objects in a Program

- To design a set of objects, it helps to consider the nouns that describe your project.
- For example, if you're designing a tower defense game, your description might be:

> On the map, the player places towers that attack invaders walking along a path towards the base.

- This could mean the objects you need to design are:
  - Map
  - Player
  - Tower
  - Invader
  - Path
  - Base

## Designing an Object

- To design an object, it's helpful to consider the minimum attributes that each instance of that object will have.
- For example, in a map object, the map has:
  - Height
  - Width

### Field [Accessibility Levels](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/accessibility-levels)

- Everything within an object is assigned an accessibility level.
- This level determines whether external classes can view or manipulate the fields.
- Two are `private` and `public`.

  - `private` means only the object can access the value.
    - By default, everything is `private`.
  - `public` access is the most permissive access level. There are no restrictions on accessing `public` members.

- Here's a full list:
  - `public` - The type or member can be accessed by any other code in the same assembly or another assembly that references it.
  - `private` - The type or member can be accessed only by code in the same class or struct.
  - `protected` - The type or member can be accessed only by code in the same class, or in a class that is derived from that class.
  - `internal` - The type or member can be accessed by any code in the same assembly, but not from another assembly.
  - `protected internal` - The type or member can be accessed by any code in the assembly in which it is declared, or from within a derived class in another assembly.
  - `private protected` - The type or member can be accessed only within its declaring assembly, by code in the same class or in a type that is derived from that class.
- A common convention for `private` fields is to name them with an underscore. `_path`, `_username`, etc.

### Field Editability

- You can make an attribute in an object unchangeable by using the `readonly` value.

```c#
public readonly int Height;
```

## Constructor Methods

- You can define how an object is created, what fields are defaulted, through the use of a constructor method.
- Constructors construct new instances of a class.
- They are named using the same name as the class they're in.
- Whatever parameters you specify in the method call are required entry when creating the instance.
- You must make the constructor public if you want it to work. Otherwise no one outside of the class can access it. Doy!

```c#
namespace TreehouseDefense
{
  class Map
  {
    public readonly int Width;
    public readonly int Height;

    public Map(int width, int height)
    {
      Width = width;
      Height = height;
    }
  }
}
```

## Interface

- An object's interface are those properties and methods that allows the object to interact with the world around it.

## Initializing an Object

- To instantiate an object from a class, you tell the compiler the type of class it is, give it a name, and then use the new `Class()` syntax. Like this:

```c#
namespace TreehouseDefense
{
  class Game
  {
    public void Game()
    {
      // here, you're instantiating a Tower object with the name tower.
      Tower tower = new Tower();
    }
  }
}
```

### [Initialization Lists](

- You can initialize the properties in an object immediately after initializing it, using object initializers.
- Object initializers let you assign values to any accessible fields or properties of an object at creation time without having to invoke a constructor followed by lines of assignment statements.
- Below, we're initializing the Level object and immediately setting its Towers property.

```c#
Level level = new Level(invaders)
{
  Towers = towers;
};
```

## Methods

### Declaring Methods

- Methods define behavior within a class.
- They look very similar to fields, except they include return types and parameters.

```c#
public bool OnMap(Point point)
{
  return point.X >= 0 && point.X < Width && point.Y >= 0 && point.Y < Height;
}
```

### Return Values

- To return something,you have to make sure you give it a return type that isn't `void`.
- Then, use the `return` keyword.

### Static vs. Instance Methods

- Methods that are called directly on a class are **static methods**.
  - The `Main()` method must always be static.
- Methods that are called on instances of a class are **instance methods**.

### Overloaded Methods

- C# allows you to declare multiple methods on the same class using the same name.
- The methods must be differentiated by their parameters.
  - So, you can differ them based on the types of parameters they take, or the number of parameters, etc.
  - Then, you can customize what they do based on what is passed to them.
- Below, there are four overloads of the method OverLoad. Each one takes a different input, and result in a different operation.

```c#
public int OverLoad(int x, int y)
{
    return x + y;
}

public int OverLoad(int x)
{
    return Math.Pow(x, 2);
}

public void OverLoad()
{
    Nothing = true;
}

public string OverLoad(string name)
{
    return $"My name is {name}."
}
```

## [Inheritance](https://docs.microsoft.com/en-us/dotnet/csharp/tutorials/inheritance)

- C# is an object-oriented programming language.
- The four principles of OOP are:
  - Encapsulation
  - Inheritance
  - Polymorphism
  - Abstraction
- Inheritance allows you to define a child class that reuses (inherits), extends, or modifies the behavior of a parent class.
  - The parent class is also called the _base_ class.
  - The child class is also called the _derived_ class.
- When constructing derived classes, note that the base class constructor is called before the derived class constructor. So, by the time you get to the derived class constructor, the base class has already completed its initialization.

- To set a class to inherit from a parent, you have to set up a couple of things in the class declaration and constructor.
  - First, declare the base class in your class declaration. You do this by adding a : after the declaration, then the name of the base class. Like this:

```c#

class MapLocation : Point
{

}

```

- If the base class takes parameters, the derived class also has to take those same parameters. It then has to pass them to the base class using the `base()` function in its constructor. Like this:

```c#
class MapLocation : Point
  {
    public MapLocation(int x, int y) : base(x, y)
    {

    }
  }
```

- Derived classes are still considered members of their base classes. And members of their own derived classes as well. Like this:

```c#
using System;

namespace TreehouseDefense
{
    class Game
    {
        public static void Main()
        {
          Map map = new Map(8, 5);

          MapLocation point = new MapLocation(4, 2);

          Console.WriteLine(point is MapLocation); // True
          Console.WriteLine(point is Point); // True

          Point point2 = new Point(0, 1);
          Console.WriteLine(point2 is MapLocation); // False
        }
    }
}
```

- So, anything expecting an input of the base class will still work if you pass it the derived class.
- Here, have another example:
  - Polygon is a two-dimensional objeect with a number of sides.
  - Square is a type of Polygon, with 4 sides and a side length.

```c#
namespace Shapes
{
    class Polygon
    {
        public readonly int NumSides;

        public Polygon(int numSides)
        {
            NumSides = numSides;
        }
    }

    class Square : Polygon
    {
        public readonly int SideLength;

        public Square(int sideLength) : base(4)
        {
            SideLength = sideLength;
        }
    }
}
```

- C# uses something called the inheritance chain. So, if class B inherits from class A, and class C inherits from class B, then class C also inherits from class A. It's a chain, man.
  - A => B => C
- You can also set a subclass to type of its base class, and the compiler will still understand that it's a subclass.

```c#
class Bird
{
  public virtual void Move()
  {
    System.Console.WriteLine("Birds fly.");
  }
}
class Penguin : Bird
{
  public override void Move()
  {
    System.Console.WriteLine("Penguins waddle.");
  }
}

Bird bird = new Bird();
Penguin penguin = new Penguin();
Bird penguinBird = new Penguin();
bird.Move(); // Birds fly.
penguin.Move(); // Penguins waddle.
penguinBird.Move(); // Penguins waddle.
```

- Even though penguinBird is stored as a Bird type above, it still knows that its a Penguin because we called new Penguin. Since they're in the same inheritance chain, this works.

## Throwing Exceptions

- You can throw exceptions from within a constructor.
- Use the `throw` keyword, calling a new instance of the `Exception()` class.
- When you throw an error, someone has to `catch` it. Deciding where to catch the error is one of the design choices.
- Here's where we throw the error.

```c#
using System;

namespace TreehouseDefense
{
  class MapLocation : Point
  {
    public MapLocation(int x, int y, Map map) : base(x, y)
    {
      if(!map.OnMap(this))
      {
         throw new Exception();
      }
    }
  }
}
```

- And here's where we catch the error. I decided to catch it in the main class.

```c#
using System;

namespace TreehouseDefense
{
    class Game
    {
        public static void Main()
        {
          Map map = new Map(8, 5);

          try
          {
            MapLocation point = new MapLocation(9, 2, map);
          }
          catch(Exception)
          {
            Console.WriteLine("That location is not on the map.");
          }
        }
    }
}
```

- You can add custom messages to most exceptions types.
- You can also add multiple `catch` blocks, to catch different types of exceptions.
  - Place more specific `catch` blocks before more generalized ones.

```c#
catch(OutOfBoundsException ex)
{
    Console.WriteLine(ex.Message);
}

catch(TreehouseDefenseException)
{
    Console.WriteLine("Unhandled TreehouseDefenseException");
}

catch(Exception)
{
    Console.WriteLine("Unhandled exception");
}
```

- **General rule**: avoid exceptions when you can. They're computationally expensive.

### Custom Exception Types

- You can create your own exception types.
  - It's just like creating a class.
- By convention, all exception names in C# end with the word "Exception."

```c#
using System;

namespace TreehouseDefense
{
  class TreehouseDefenseException : Exception
  {
    public TreehouseDefenseException()
    {
    }

    public TreehouseDefenseException(string message) : base(message)
    {
    }
  }

  class OutOfBoundsException : TreehouseDefenseException
  {
    public OutOfBoundsException()
    {
    }

    public OutOfBoundsException(string message) : base(message)
    {
    }

  }
}
```

## [Arrays](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/)

- To declare an array in C#, you have to specify the type of data it will hold.

  - That's right. Arrays can only hold one type of data in C#.
  - Then, you put square brackets after the type declaration.
  - Then, you name your array.
  - Instantiate the array with the `new` keyword.
    - Without instantiating the array, you just get a null value.
    - You have to tell C# how long the array is.

- The following declares an array called `myArray`. `myArray` holds three strings.

```c#
string[] myArray = new string[3];
```

- From here, you can fill in the values using the bracket notation.

```c#
myArray[0] = "One!";
```

- Alternatively, if you want to input the values at declaration, you can use the `{}` notation.

```c#
string[] myArray = new string[3]{"One", "Two", "Three"};
```

### Shorthand

- If you're inputing your values at declaration, you can omit the count from the declaration.

```c#
string[] myArray = new string[]{"One", "Two", "Three"};
```

- Additionally, since you can take advantage of implicit typing when you declare in this way and omit the `string` keyword.

```c#
string[] myArray = new []{"One", "Two", "Three"};
```

- And, my god, there's an even shorter shorthand way of shortening this short syntax. Just remove the `new` and `[]`.

```c#
string[] myArray = {"One", "Two", "Three"};
```

- Incredible. Why didn't the class just lead with that?

### IndexOutOfRangeException

- Exception thrown when getting or setting an item at an index that doesn't exist in the current array.

## Encapsulation

- Encapsulation is used to hide implementation details and restrict what users and objects are allowed to do.
  - It also makes objects easier to use.

### Accessor Methods

- One way of enforcing encapsulation is through the use of accessor methods--getters and setters.

```c#
private MapLocation _location;

// getter
public MapLocation GetLocation()
{
  return _location;
}

// setter
public void SetLocation(MapLocation value)
{
  _location = value;
}
```

- Here's how you use these getter setter methods when calling them:

```c#
Invader invader = new Invader();
MapLocation location = new MapLocation(0,0,map);

invader.SetLocation(location); // setter method
MapLocation currentLocation = invader.GetLocation(); // getter method
```

#### Properties

- A more efficient way of using accessor methods is to use them in conjunction with properties (rather than fields).
  - This is just syntactic sugar for what we did above. But it's a lot cleaner.
  - In the setter for properties, the input value is implied.

```c#
private MapLocation _location;

// getter
public MapLocation Location
{
  get
  {
    return _location;
  }

  set
  {
    _location = value;
  }
}
```

- And here's how you use the property method:

```c#
Invader invader = new Invader();
MapLocation location = new MapLocation(0,0,map);

invader.Location = location; // properties setter
MapLocation currentLocation = invader.Location; // properties getter
```

- Getters and setters can be set to private, restricting access from outside the class.
  - For example, below, this property can't be set from outside of the class because the `set` is private. But it can be retrieved from outside the class.

```c#
get
{
  // return property
}

private set
{
  // set property
}
```

##### Auto-Properties

- In C#, if you have a field with a simple getter and setter, you can shorthand the hell out of it.
  - You can remove its backing field declaration.
  - You can remove the getter and setter blocks.
  - You can still control access for both the getter and setter.
- The single line below replaces the block of code at the start of this section.

```c#
public MapLocation Location { get; set; }
```

- You can also initilize the backing fields when setting auto-properties:

```c#
public int Health { get; set; } = 2;
```

##### Computed Properties

- A property that doesn't wrap an actual field. That is, one that doesn't have a backing field, but whose value is computed on the fly.
  - In the following code, the Location "property" is computed each time it's called, making it more like a method.

```c#
public MapLocation Location
{
  get
  {
    return _path.GetLocationAt(_pathStep);
  }
}
```

##### When to Use Properties vs. Methods

- Computed properties look and act a lot like methods. So it's confusing for new developers to decide when to use a computed property vs. a method.
- Typically, a properties should behave like fields, doing simple things like getting and setting data.
- Also, computed properties should only be used on computationally inexpensive activities.
- If a member of a class is going to be public, it also makes sense for it to be a property.

## Gimme the Sugar (Syntactic Sugar)

- C# contains a ton of syntactic sugar.
- One simplifying feature is the ability to remove curly braces from simple methods and properties, making those muthas one-liners.
  - these look similar to JS Arrow Functions.

```c#
// old way
public MapLocation Location
{
  get
  {
    return _path.GetLocationAt(_pathStep);
  }
}
// sugary way
public MapLocation Location => _path.GetLocationAt(_pathStep);
```

- It works for simple methods too:

```c#
// old way
public void Move()
{
  _pathStep += 1;
}
// sugary way
public void Move() => _pathStep += 1;
```

## [Static Members](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/static-classes-and-static-class-members#static-members)

- All instances of a class can share static members.
- A non-static class can contain static methods, fields, properties, or events.
- The static member is callable on a class even when no instance of the class has been created. The static member is always accessed by the class name, not the instance name.

```c#
private static readonly Random _random = new Random();

public bool IsSuccessfulShot()
{
  return _random.NextDouble() <= _accuracy;
}
```

- If this was used outside of the class, it would look like this:

```c#
public bool IsSuccessfulShot()
{
  return Tower._random.NextDouble() <= _accuracy; // Tower is the class name
}
```
