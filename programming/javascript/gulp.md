# Gulp Basics

- [Gulp Basics](#gulp-basics)
  - [Overview](#overview)
    - [Common Gulp Tasks](#common-gulp-tasks)
    - [How Gulp Works](#how-gulp-works)
    - [Benefits of Gulp](#benefits-of-gulp)
  - [Installing](#installing)
  - [Initializing in a Project](#initializing-in-a-project)

## Overview

Gulp is a toolkit for automating painful or time-consuming tasks in your development workflow.

- Toolkit and task runner for JavaScript.
- Front-end build system.
- Built on Node.js and npm.
- Useful for automating time-consuming and repetitive tasks.
- Hundreds of plug-ins for common tasks.

### Common Gulp Tasks

- Minification of scripts and styles.
- Concatenation of multiple files into one big file.
- Cache busing.
- Testing, linting, and optimization.
- Creating development servers.

### How Gulp Works

- Gulp is built on node streams.
  - Asynchronous.
  - Facilitate file operations through a pipeline.
  - Files aren't manipulated until all plugins process.

### Benefits of Gulp

- Focus on code rather than configuration.
- Easier to read than other task runners.
- Gulp is based on streams, rather than files.
- Gulp is best for automating build tasks, rather than just bundling or linting.
  - For compilation only, try Babel.
  - For bundling only, Webpack or Parcel are good options.

## Installing

- Make sure node.js is installed.
- Install gulp through npm.

```shell
npm i -g gulp
```

## Initializing in a Project
