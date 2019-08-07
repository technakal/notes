# Loops

- Loops in C# are pretty much identical to loops in JavaScript. 

## While

- Runs as long as the condition is not true.
```c#
int index = 0;

while(index < array.Length)
{
  // do stuff
  index++;
}
```

## For

- For loops implement the incrementer by default.
```c#
for(int i = 0; i < invaders.Length; i++)
{
  Invader invader = invaders[i];
  // do stuff
}
```

## foreach

- foreach loops are syntactical sugar for for loops.
```c#
foreach(Invader invader in invaders)
{
  // do stuff 
}
```

## Controlling Loop Flow

- C# supports loop flow controllers like `continue` and `break`.
