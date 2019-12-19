# Unit Testing with xUnit

## Development Process

- Run the `dotnet new xunit` command in your console.
  - Alternatively, you can ad the xUnit manually, via PackageReference.
- In your testing class, add `using xUnit`.
- Create your test methods.
- Give your test methods the `[Fact]` attribute.
  - Attributes are basically like annotations in Java.
  - `[Fact]` is essentially `@Test`.
- To run your tests, you can use `dotnet test` in the test folder containing your tests.
  - Alternatively, VSCode offers .NET Core Test Explorer.

```bash
dotnet test ./tests/GradeBook.Tests
```

## Conventions

- Testing conventions in C# are to structure your test methods as follows.
  - Create an "arrange" section, where you set up all your values and variables you need to complete your tests.
  - Create the "act" section, which produces some result.
  - Create the "assert" section, which tests that your "act" leads to the expected output.

```cs
[Fact]
public void Test1()
{

  // arrange
  var x = 3;
  var y = 2;
  var expected = 5;

  // act
  var actual = x + y;

  // assert
  Assert.Equal(expected, actual);

}
```

## Asserting

- Use the Assert library.

## Adding References to Your Code in VSCode

- In Visual Studio, you can right click on your test project and add a reference to the code it should be testing. However, VSCode doesn't have this option.
- Instead, you can use the dotnet cli.
  - Open the shell.
  - In the test package, type `dotnet add reference <PROJECT-PATH>`.
    - The path should reference the `.csproj` file

```shell
dotnet add reference ..\..\src\GradeBook\GradeBook.csproj
```

- This adds the following to your test project's `csproj` file.
  - I reckon you could also just add this reference to .csproj manually, too.

```xml
<ItemGroup>
  <ProjectReference Include="..\..\src\GradeBook\GradeBook.csproj" />
</ItemGroup>
```
