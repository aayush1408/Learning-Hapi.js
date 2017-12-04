const Hapi = require('hapi');
const vision = require('vision');
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
//Home page
server.route({
    method:'GET',
    path:'/home',
    handler:(request,reply)=>{
        reply.view('index',{name:'John Doe'});
    }
});



// start your server
server.start(function(err) {  
  if (err) {
    throw err;
  }
  console.log('Server running at: ',server.info.uri);
});


