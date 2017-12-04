var Hapi = require('hapi');

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


// start your server
server.start(function(err) {  
  if (err) {
    throw err;
  }
  console.log('Server running at: ',server.info.uri);
});


