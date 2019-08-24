# SharePoint FX Basics

- [SharePoint FX Basics](#sharepoint-fx-basics)
  - [Overview](#overview)
  - [Project Setup](#project-setup)
    - [Previewing the Web Part](#previewing-the-web-part)
  - [The Web Part](#the-web-part)
    - [Context](#context)

## Overview

- Custom web parts can be defined using TypeScript.
- Rendering accepts any JavaScript framework:
  - React
  - Angular
  - Vue?

## Project Setup

[Getting Started](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part)

- Use Yeoman for easy project setup.

```shell
yo @microsoft/sharepoint
```

- Follow the configuration guide.

### Previewing the Web Part

- Use gulp to serve your web app to the testing framework (workbench).
- At work, you have to configure gulp to use http, rather than https.
  - Failing to do this results in a failure to load the workbench because of cert issues.
  - just configure the serve.json file in the config folder.
    - Update `https` to `false`.
    - Update `initialPage` to use `http` instead of `https`.

```json
{
  "https": false,
  "initialPage": "http://localhost:5432/workbench"
}
```

- To serve the web part:

```shell
gulp serve
```

## The Web Part

- The web part must have a main class as the entry point.
  - The nain class must extend the `BaseClientSideWebPart` in order to be a valid web part.
- The main class' render() method accepts the DOM representation, and can be built using any valid JS framework.
  - So, it allows handlebar syntax, etc.
- You can define the customizeable property pane using the getPropertyPaneConfiguration property on your main class.
  - Anything defined in this pane can be accessed using `this.properties.<propert-value>`.
  - More on [property pane configuration](./property-pane.md).
- The color of the web part, by default, matches the site color theme.

### Context

- You can access the Web Part's context using `this.context`.
