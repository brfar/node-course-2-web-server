## The 'public' folder! 

Everything inside of this directory is gonna be accessible via the web server, so it's important not to put anything in here
that you don't want prying eyes to see. Everything in here should be intended to be viewable by anybody. 

The goal is to serve the 'help.html' page up is our express app without having to manually configure it. 
We're gonna do that using a middleware (go check the server.js file)

Ok. In our server.js we used to middleware to serve this 'public' folder, so now we can access all its files
directly, without having to call them on app.get(). With the middleware set we can now simply go to
localhost:3000/help.html and access that file! 

This is perfect for projects that don't need a back-end; you can just throw a bunch of shit in the public
directly and use a middleware to serve it up.
 