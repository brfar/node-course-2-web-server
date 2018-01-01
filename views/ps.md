## The 'views' folder

'Views' is the default directory that 'express' uses for your templates. 

Templates on handlebars end in .hbs (use 'pug' tho. it's nicer looking)

## The 'partials' folder

A 'partial' is a partial piece of your website, something you can reuse throughout your template. 
To get started the first thing we need to do is set up the server.js file to let 'handlebars' know
that we wanna add support to partials. 

///
Express middleware allows you to add on to the existing functionality that express has so if express doesn't
do something you'd like it to do, you can add some middleware and teach it how to do that thing