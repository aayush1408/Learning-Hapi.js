const Hapi = require('hapi');
const vision = require('vision');
const User = require('./models/user.js');
// create a server with a host and port
var server = new Hapi.Server();

// add server’s connection information
server.connection({  
  host: 'localhost',
  port: 3000
})

//Set route
server.route({
    method:'GET',
    path:'/',
    handler:(request,reply)=>{
        reply('Hello World');
    }
});
//Dyanmic Routing
server.route({
    method:'GET',
    path:'/user/{name}',
    handler:(request,reply)=>{
          reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});


//Static page
server.register(require('inert'),(err)=>{
    if(err) throw err;
    server.route({
        method:'GET',
        path:'/about',
        handler:(request,reply)=>{
            reply.file('./public/about.html');
        }
    });
});

//Templates
server.register(vision,(err)=>{
    if(err) throw err;
    server.views({
        engines:{
            html:require('ejs')
        },
        path:__dirname +'/views'
    });
});


//Form page
server.route({
    method:'GET',
    path:'/add',
    handler:(request,reply)=>{
        reply.view('add');
    }
});

//Add data into mongodb
server.route({
    method:'POST',
    path:'/add/user',
    handler:(request,reply)=>{
        let name = request.payload.name;
        let email = request.payload.email;
        var newUser = new User({
            name:name,
            email:email
        });
        newUser.save((err)=>{
            if (err) throw err;
            console.log('saved');
         reply.redirect();
        });
    }
});

//GET the user
server.route({
    method:'GET',
    path:'/list',
    handler:(request,reply)=>{
        User.find({}).exec((err,data)=>{
            if (err) throw err;
            reply.view('index',{data:data})
        });
    }
});


// start your server
server.start(function(err) {  
  if (err) {
    throw err;
  }
  console.log('Server running at: ',server.info.uri);
});


