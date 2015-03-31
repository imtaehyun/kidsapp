var Path = require('path'),
  Hapi = require('hapi'),
  Parse = require('node-parse-api').Parse,
  db = new Parse({
    app_id: 'PzSMYhHZ11Gxr1F3irdVQbOqQvN5KAsziGAZhrJh',
    api_key: '0aNy1nywxm5TaeTwfqN6q8zKgm7EwxrZ5iBuQgdQ'
  });

var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 3000;
var server = new Hapi.Server();
server.connection({
  host: host,
  port: port
});

// API
server.route({
  method: 'GET',
  path: '/api/series',
  handler: function(request, reply) {
    db.findMany('series', '', function(err, response) {
      if (err) {
        reply({});
      } else {
        reply(response);
      }
    });
  }
});

server.route({
  method: 'POST',
  path: '/api/series',
  handler: function(request, reply) {
    var params = request.payload;
    if (params.title !== '') {
      db.insert('series', params, function(err, response) {
        if (err) {
          reply(err);
        } else {
          reply(response);
        }
      });
    }
  }
});

// Static Resources
server.route({
  method: 'GET',
  path: '/admin',
  handler: function(request, reply) {
    reply.file('./public/admin.html');
  }
});

server.route({
  method: 'GET',
  path: '/js/{path*}',
  handler: { directory: { path: './public/js' }}
});

server.start(function() {
  console.log('Server running at: ', server.info.uri);
});
