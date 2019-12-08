# Unit Testing with JUnit

## Basics

- Annotate tests with `@Test`.
- Assertion methods test your outcomes.
  - Here's a [full list](http://junit.sourceforge.net/javadoc/org/junit/Assert.html) of assertion methods.

```java
package com.udacity.examples.Testing;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.IntSummaryStatistics;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class HelperTest {

  @Test
  public void verify_testLoads(){
  }

  @Test
  public void verify_getCount() {
    List<String> names = Arrays.asList("Noel", "Kenzie", "", "Brant");
    long actualCount = Helper.getCount(names);
    long expectedCount = 1;
    assertEquals(expectedCount, actualCount);
  }

  @Test
  public void verify_getStats() {
    List<Integer> ints = Arrays.asList(98, 75, 99, 87, 100);
    IntSummaryStatistics stats = Helper.getStats(ints);
    assertEquals(100, stats.getMax());
  }

  @Test
  public void verify_getMergedList() {
    List<String> names = Arrays.asList("Noel", "Mackenzie");
    String expected = "Noel, Mackenzie";
    String actual = Helper.getMergedList(names);
    assertEquals(expected, actual);
  }
}
```

## More Advanced Features

- These features are all JUnit 4. I'm sure there are comparable ones in JUnit 5, but I'm not sure what they are.

### Before and After Tests

- `@Before` runs before each test.
  - Useful for repeated setup activities.
  - This can be used to prep the environment, print startup messages, etc.
- `@BeforeClass` runs once before the entire test class.
  - Must be `static` and `void`.
- `@After` runs after each test.
  - Useful for repeated teardown activities.
- `@AfterClass` runs once after the entire test class.
  - Must be `static` and `void`.
- `@Ignore` skips a test case.
  - Can be useful for resource-intensive tests.

### Parameterized Tests

- Parameterized tests allow you to run the same tests with different inputs.
  - Requires the `@RunWith(Parameterized.class)` annotation.
  - Requires you to set up your parameters with a `@Parameters` method.

```java
package com.udacity.examples.Testing;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.*;

import java.util.Arrays;
import java.util.Collection;

import static org.junit.Assert.assertNotEquals;

@RunWith(Parameterized.class)
public class HelperParameterizedTest {

  private String input;
  private String output;

  public HelperParameterizedTest(String input, String output) {
    super();
    this.input = input;
    this.output = output;
  }

  @Parameters
  public static Collection initData() {
    String empName[][] = {{"Noel", "Noel"}, {"Noel", "Jeff"}};
    return Arrays.asList(empName);
  }

  @Test
  public void verify_input_names_not_equal_to_output_names() {
    assertNotEquals(input, output);
  }

}
```
