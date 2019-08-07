# Background of C#

- Released in 2000.
- Dedicated R&D group at Microsoft.
- Top 4 most popular languages.
    - Can write web apps, mobile apps, Windows or Mac programs.
- Designed to be less error-prone.

# Structure of a C# Program

```c#
class Program 
{
  static void Main() 
  {

  }
}
```

- This is the shortest valid program you can write in C#. It doesn't do anything.
- All code in C# is contained within a `class`.
    - Programs can contain any number of classes.
    - Each class is typically contained in its own file.
    - Each class has a name. The file name is typically the same as the class name, so long as it only contains one class.

## Method Basics

- Inside the class, you find the `method`s. In the above example, `Main()` is the method.
    - A class can have multiple methods.
    - Methods have four main parts:
        - Name
        - Body (everything between the curly braces).
            - Instructions go here.
        - Parameter
            - Everything the method needs to run goes between the parenthesis, in the parameter.
        - Return type
            - This is what the method will return.
            - In the above, `void` is the return type. It means it doesn't return anything.
- C# knows which method to run first in a program because it has a special name. You guessed it... `Main()`.
    - C# always runs `Main()` first, and every program requires a `Main()`.

## Namespace

- In C#, the language uses something called namespaces to organize code.
- Namespaces allow multiple classes to share the same name.
- Here's how you declare a namespace, yo:

```c#
namespace Treehouse 
{
  class Program 
  {
    static void Main() 
    {

    }
  }
}
```

- In the following, the first word, `Treehouse` is the namespace. `Program` is the class. `Main` is the method.

```c#
Treehouse.Program.Main();
```

- Instead of writing the full address of the method every time, you can use shorthand to include one namespace in another. See:

```c#
using System;

namespace Treehouse 
{
  class Program 
  {
    static void Main() 
    {

    }
  }
}
```

- Now, if we want to call a method on the `System` namespace, we can just say:

```c#
Console.Write();
```

## Compile

- C# is a compiled language. You can't run your C# program until you've successfully compiled it.

## Variables

- Variables are declared by stating the type of value they hold, then giving them a name.
    - Here's a list of the built in [C# types](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/built-in-types-table).
- Then, you assign it a value. You can initialize it with a value, as below, or declare it and then assign it later.

```c#
string firstName = "Noel";
```

- C# tries to do implicit conversions of types, but it's not very good at it.
    - It'll convert an integer to a string if you try to add the two together, but it won't go the other way, man.
    - C# will also truncate doubles to integers in mathematical operations.
        - You can avoid this by adding a .0 to any integers in your operation, or by casting at least one of the operands as a double.
- To explicitly convert between variable types, you can use a number of methods for that purpose.
    - For example, to convert from a string to an integer, you can use `int.Parse(string)`;
- C# is restrictive in its variable scope.
    - By default, a variable declared within a set of curly brackets can only be used within that block.

## const

- C# allows the use of constants with the const keyword.
- Convention states that these should be prefixed by underscore (_).

## Compile-Time Inference

- When initializing a variable at the same time you declare it, you can skip the type.
- Use `var` and let the compiler infer the data type from the value.

```c#
var greet = "Hello!";
var age = 18;
```

- This is how most C# developers declare their variables. Explicit typing is so last generation.

## Looping

- There are a bunch of loop types.
- `while()` is one of them. It works just like in JavaScript.
- In C#, you can start the next iteration of a loop at any time with the `continue` keyword.

```c#
if (skipRound) 
{
  Console.WriteLine("Skipping to next round...");
  continue;
}
else 
{
  // do this round...
}
```

## try and catch

- C# supports the `try... catch` methodology for error handling.

## Exceptions

- All exceptions must inherit from the `System.Exception` namespace.
- Once you inherit from this, you can create whatever exceptions you want.

# .NET

- .NET is a framework.
    - .NET is crucial for using C#. Nobody really writes C# outside of .NET.
    - .NET contains hundreds of helper classes that make things like communicating with the user, getting input, etc. simple.

# REPL

- Stands for Read Evaluate Print Loop.
- A tool that allows you to write C# code in the console on the fly.
