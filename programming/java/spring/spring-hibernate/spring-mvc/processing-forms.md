# Spring Form Processing

## Overview

- Form workflow basically functions like this:
  - User accesses form URI.
  - Spring MVC controller gets the request and returns the form view.
  - User fills out the form and submits.
  - Spring MVC controller gets the new request and returns the result view.

```
---------------------------------------SUBMISSION----------------------------------
+--------------------+                   +-------------------+     +-----------+
| User accesses site | --> /showForm --> | Spring Controller | --> | Form View |
+--------------------+                   +-------------------+     +-----------+
---------------------------------------SUBMISSION----------------------------------
+-------------------+                     +-------------------+     +-------------+
| User submits form | --> /submitForm --> | Spring Controller | --> | Result View |
+-------------------+                     +-------------------+     +-------------+
```

## Rendering Data

- You can access and render URI paramters in JSP using `${param.attributeName}`.
- So, if I have a URI param called "studentName", I can render it:

```html
<p>Student Name: ${param.studentName}</p>
```

- Note: this is slightly different from accessing data directly from your Spring models.
  - You can read about that [here](./spring-model.md/#using-model-data-in-views).
