# C# Enums

* Enums allow you to declare a kind of decoder value that is integer-based. So, an enum for a `CoffeOrTea` value could look like this:

```cs
public enum CoffeeOrTea 
{
  Coffee,
  Tea
}
```

* In this way, the values are technically 0 = coffee and 1 = tea, but the display will be the word value.

```cs
public enum Condition
{
  Rain,
  Cloudy,
  PartlyCloudy,
  PartlySunny,
  Sunny,
  Fog,
  Snow
}
```