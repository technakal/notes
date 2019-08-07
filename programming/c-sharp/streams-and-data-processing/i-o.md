# C# Input and Output

## Working with Files

* Useful namespaces for working with files:
  * System.IO

### Useful Classes and Methods

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