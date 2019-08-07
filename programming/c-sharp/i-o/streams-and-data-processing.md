# C# Input/Output

## Useful Namespaces and Classes

* System.IO
* Directory
* DirectoryInfo
* FileInfo
* StreamReader

## Directory

* The Directory static class gives us useful tools for traversing directories and file structures in C#.
  * The methods here apply to the directory your application is running from.
* The DirectoryInfo class is an instantiated class that provides a number of useful directory tools for working with and understanding the directory.
  * You can instantiate this and pass it a directory to work in.
  * The following code snippet instantiates the directory info on the current directory, then prints the name of each .txt file in the directory.

```cs
string currentDirectory = Directory.GetCurrentDirectory();
DirectoryInfo directory = new DirectoryInfo(currentDirectory);

var files = directory.GetFiles("*.txt");
foreach(var file in files)
{
  Console.WriteLine(file); 
}
// data.txt
```

## Streams

- Streams are essentially ways to take information in a file or data flow and allow interaction with the information.
- StreamReader is the main .NET class for this.
  - Always use the `Close` method on your StreamReader to free up memory. It doesn't close without your help.

> Help me Dodie Wan Kanobi. You're my only closer.

- To ensure Close is always called, wrap it in a `try...finally` block. This ensures it is always called--even when an exception is thrown mid-stream.
- Another method to ensure a StreamReader is always closed is to wrap its creation and functionality in a `using` block.
  - Using does your garbage collection for you.

```cs
using(var stream = new StreamReader(file.fullName))
{
  // do stuff with the stream.
}
```

### ReadToEnd

* Returns everything in a text file in the stream.

```cs
using (var stream = new StreamReader(file.fullName)) 
{
  return stream.ReadToEnd();
}
```

## Dealing with Files

- Use `Path.Combine` when creating strings of file locations. This adds all of the backslashes for you.
- The `FileInfo` class is kind of like the DirectoryInfo class. It gives you access to a bunch of information and methods to use on a file.
  - One useful method is `Exists`. This checks if the file exists and returns a boolean.

```cs
if(file.Exists) {
  // do something.
}
```

## Encoding

* C# uses encoding to store characters. 
* Not sure I'll ever need to worry about this, but you can store encoded values, unencode them, whatever.

```cs
char degreeSymbol = '\u00B0';
Console.WriteLine($"It is 65{degreeSymbol}F outside."); // It is 65°F outside.
```

* You can find the unicode bytes of a character using the UnicodeEncoding class:

```cs
byte[] unicodeBytes = UnicodeEncoding.Unicode.GetBytes(new char[] { 'h' }); // byte[2] { 102, 0 }
```

* You can also get a string from the unicodeBytes, like this:

```cs
string unicodeString = UnicodeEncoding.Unicode.GetString(unicodeBytes); // 'h'
```

* You can also do some fancy shit, like hiding messages in Unicode:

```cs
byte[] mysteryMessage = new byte[] { 89, 0, 97, 0, 121, 0, 33, 0 };
var mysteryContents = UnicodeEncoding.Unicode.GetString(mysteryMessage);
Console.WriteLine(mysteryContents); // Yay!
```