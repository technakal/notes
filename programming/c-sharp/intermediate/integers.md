# Integers

* Integers hold values based on their bit-value. 
  * 8-bit integers can hold 2 ^ 8 values, or 256.
  * 32-bit integers can hold 2 ^ 32 values, or 4294967295.
* Integers have a signed and an unsigned version.
  * Signed versions split the possible values between positive and negative. 
    * So, an 8-bit signed integer can be any whole number between -128 and 128.
    * An 8-bit unsigned integer can be 0 to 256.
  * Signed integers have no prefix.
  * Unsigned integers start with a `u`.
* All integer types have a `MinValue` and a `MaxValue` property on them, to remind you what they can hold.

## [Integer Types](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types)

| Type   | MinValue             | MaxValue             | Alias  |
| ------ | -------------------- | -------------------- | ------ |
| sbyte  | -128                 | 127                  |        |
| byte   | 0                    | 256                  |
| Int16  | -32768               | 32767                | short  |
| UInt16 | 0                    | 65535                | ushort |
| Int32  | -2147483648          | 2147483647           | int    |
| UInt32 | 0                    | 4294967295           | uint   |
| Int64  | -9223372036854775808 | 9223372036854775807  | long   |
| UInt64 | 0                    | 18446744073709551615 | ulong  |