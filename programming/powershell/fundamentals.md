# Powershell Fundamentals

- [Powershell Fundamentals](#powershell-fundamentals)
  - [Overview](#overview)
  - [Structure of Powershell Cmdlets and Modules](#structure-of-powershell-cmdlets-and-modules)
    - [Comments](#comments)
    - [Variables](#variables)
  - [Comparisons](#comparisons)
  - [Control Flow](#control-flow)

## Overview

- Prior to PowerShell, everything was done in cmd.
- PowerShell created an environment that supports both live commands and execution of powerful scripts.
- Build on .Net Core, which allows interaction with objects and executing complex tasks.
- Uses a consistent naming convention of a noun-verb pair for cmdlets, which makes it predictable.

```powershell
Get-Profile
New-Object -TypeName System.Application.Whatever...
Set-Alias
```

- Simple core cmdlets make it pretty easy to use.
- The future of PowerShell is PowerShell Core.
- Use tab! You can cycle folders, parameters, auto-complete, wow!
- Don't use aliases in scripts. Use the full command name.

## Structure of Powershell Cmdlets and Modules

### Comments

- PowerShell comments are preceded by #.

```powershell
# This is a comment.
```

### Variables

- Variables are preceded by \$.
- You declare a variable by just typing \$, the name of the variable, equals, and the value of the variable.

```powershell
$name = "Noel"
$age = 34
```

## Comparisons

- Equals is `-eq`

```powershell
if ($null -eq $name) {
  Write-Output "Hello stranger."
} else {
  Write-Output "Hello $name."
}
```

## Control Flow

- PowerShell supports `if-else`

```powershell
if (condition) {
  # do something
} else {
  # do something else
}
```
