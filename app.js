var Hapi = require('hapi');

// create a server with a host and port
var server = new Hapi.Server();

// add server’s connection information
server.connection({  
  host: '127.0.0.1',
  port: 2000
})




// start your server
server.start(function(err) {  
  if (err) {
    throw err;
  }
  console.log('Server running at: ',server.info.uri);
});

module.exports = server;
