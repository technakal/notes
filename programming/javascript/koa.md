# Koa.js

- [Koa.js](#koajs)
  - [Overview](#overview)
  - [Request and Response Cycle](#request-and-response-cycle)
  - [Common Koa Add-ons](#common-koa-add-ons)
  - [Setting Up Koa](#setting-up-koa)
    - [Basic Koa Server](#basic-koa-server)
    - [Routing](#routing)
    - [Rendering](#rendering)
    - [Working with Koa Context](#working-with-koa-context)
  - [A Full Example](#a-full-example)

## Overview

- Modern and micro framework for backend server code on top of Node.js.
- Koa supports `async/await` syntax.
- Thinner and better middleware.
- Extensible.
- Built on ES6+.

## Request and Response Cycle

- Uses req and res objects on top of vanilla JS standard request and response objects.
- Encapsulates req/res into the same object using context, which helps API developers work more efficiently.

## Common Koa Add-ons

- Koa Router
- Koa EJS Templating
- Koa Body Parser

## Setting Up Koa

- Koa setup is very similar to express. You need to create an entry page for your server, import the packages you want to use, start declaring your server functionality.

### Basic Koa Server

- A very basic example is as follows:
  - This example creates a Koa server, renders Hello World to the screen, and serves it up at port 3000.

```js
const Koa = require('koa');
const app = new Koa();

app.use(
  async ctx =>
    (ctx.body = {
      msg: 'Hello world.',
    })
);

app.listen(3000);
```

### Routing

- Getting into a more complicated example, you can use koa-router to create a simple API.
  - This example creates two routes that serve up a json object.

```js
const Koa = require('koa');
const KoaRouter = require('koa-router'); // koa router, obvs
const json = require('koa-json'); // json prettifier

const app = new Koa();
const router = new KoaRouter();

app.use(json());

router.get('/', async ctx => {
  ctx.body = { route: 'Index', msg: 'Hello!' };
});

router.get('/test', async ctx => {
  ctx.body = { route: 'Test', msg: 'This is just a test.' };
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => console.log(`Server started on port ${PORT}...`));
```

### Rendering

- You can use rendering templates with Koa, such as EJS, to render templates.
- Here's an example:
  - The render object controls the template rendering.
  - The first call to render is the configuration settings.
    - Below, it tells the server to render the app instance of koa using the templates contained in the subdirectory `views`.
    - It specifies the base view, `layout`, which is the shell wrapping the subviews--for things like consistent headers, html tags, etc.
    - It specifies the file format the templates will be in.
    - In the `get` methods, it tells the server, "If the user reaches the test route, render the `test` view.

```js
const Koa = require('koa');
const KoaRouter = require('koa-router');
const path = require('path'); // core node module for working with filepaths.
const render = require('koa-ejs'); // template engine

const app = new Koa();
const router = new KoaRouter();

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false,
});

router.get('/', async ctx => {
  await ctx.render('index');
});

router.get('/test', async ctx => {
  await ctx.render('test');
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => console.log(`Server started on port ${PORT}...`));
```

### Working with Koa Context

- You can pass koa's context as a parameter to routes, etc.
- You can add additional properties to the context.
  - This adds properties for user, birthday, and bestFriend to the Koa context.

```js
app.context.user = 'Noel';
app.context.birthday = 'December 1984';
app.context.bestFriend = 'Brant';
```

- You can use a body parser to get at the body of the context, like on a post request.
- You can access URI parameters using teh `params` property of the context.

```js
// uri is /api/Noel, for example
router.get('/api/:name', ctx => console.log(ctx.params.name)); // Noel
```

## A Full Example

- Here's a simple Koa server that has three routes and allows the user to view and add items to a list of things.

```js
const Koa = require('koa');
const KoaRouter = require('koa-router'); // koa router, obvs
const bodyParser = require('koa-bodyparser');
const json = require('koa-json'); // json prettifier
const path = require('path'); // core node module for working with filepaths.
const render = require('koa-ejs'); // template engine
const app = new Koa();
const router = new KoaRouter();

const things = ['Pizza', 'Video Games', 'Programming', 'LoFi']; // replace with db

/**
 * json prettify middleware
 * prettifies json output.
 */
app.use(json());
app.use(bodyParser());

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false,
});

/**
 * Routes
 */

router.get('/', index);
router.get('/add', showAdd);
router.post('/add', addThing);

/**
 * Router methods
 */

// show index
async function index(ctx) {
  await ctx.render('index', {
    title: 'Things',
    things,
  });
}

// show add page
async function showAdd(ctx) {
  await ctx.render('add', {
    title: 'Add Things',
  });
}

// add item
async function addThing(ctx) {
  const body = ctx.request.body;
  things.push(body.thing);
  ctx.redirect('/');
}

/**
 * router middleware
 */
app.use(router.routes()).use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT || 3000, () =>
  console.log(`Server started on port ${PORT}...`)
);
```
