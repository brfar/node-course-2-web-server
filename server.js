const express = require('express');
const hbs = require('hbs');
/* 'hbs' is module that's a wrapper around handlebars. It's gonna let us use it as an express view engine.  
Handlebars is a templating engine that's gonna let you render html, but in a dynamic way, where you can 
inject values, kinda like you would on ruby or php. using a templating engine, you're also gonna be able 
to create reusable markup for things like header/footer which is gonna be the same in a lot of your pages. */
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

/* 'registerPartials' takes the directory you wanna use for all your partials. Check reason for __dirname below */
hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs'); // lets express know which view engine we wanna use

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', `${log}\n`, (err) => {
    if (err) console.log('unable to append to server.log');
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

/* A middleware lets you configure how your express application works. You can think of it kind of like
a third party add-on. You're saying "hey, express usually work like this. I'd like you to tweak a lil bit
and work like this." In order to add some middleware, we're gonna call app.use().
app.use ~> takes the middleware function you wanna use, in our case we're gonna use a built-in piece
of middleware called 'express.static()'. This method takes the absolute path to the folder you wanna serve up.
__dirname is used because we need to pass the path from the root of our hard drive, which can change, since
projects can move around. __dirname stores the path to your project's directory, in this case it stores
the path to 'node-web-server' */
app.use(express.static(`${__dirname}/public`));

/* Handlebar helpers are gonna be ways for you to register functions to run, to dynamically create 
some output. The year is something that initially was injected in all pages.
A partial is nothing more than a function you can run inside of your handlebars templates. All we need
to do is register it with the method below, which takes 2 arguments: the name of the helper and the 
function to run. Anything returned from this function is gonna be rendered in place of the 'getCurrentYear' */
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

/* Another example of a helper, this time one that takes an argument in the callback function */
hbs.registerHelper('screamIt', text => text.toUpperCase());

/* app.get() ~> Register a handler. This is gonna let us set up a handler for an HTTP GET request.
There is 2 arguments we have to pass in to GET: the first is the URL, in the case below it's the root
so we just use '/', and the second argument is the function to run it; the function that tells express
what to send back to the person who made the request. This function is gonna get called with 2 arguments
and they are really important! 'req' stores a bunch of information about the request coming in. 'res' has
a bunch of methods available to you, so you can respond to the HTTP request in whatever way u like. */
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'home page',
    welcomeMessage: 'welcome to mi website',
  });
});

/* The second argument used on res.render is what is gonna be injected on about.hbs */
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'unable to fulfill request',
  });
});

/* app.listen ~> is gonna bind the application to a port on your machine */
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
