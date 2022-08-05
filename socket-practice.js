const net = require('net');
const host = 'localhost';
const port = 3000;
const connections = {};
let client;

// Creating socket Server
const server = net.createServer((connection) => {
  const key = `${connection.remoteAddress}:${connection.remotePort}`;
  connections[key] = connection;
  connection.on('data', (data) => {
    console.log('SERVER_RECEIVED', data.toString());
  });
});

server.on('error', (err) => {
  console.error('SERVER_FAIL', err.code);
});

server.kill = (callback) => {
  console.log('SERVER_KILL');
  server.close(callback);
  for (const key in connections) {
    connections[key].destroy();
  }
};

server.listen(port, host, () => {
  console.log('SERVER_LISTENING');

  // Creating Client server
  client = net.createConnection(port, host);
  client.on('error', (err) => {
    console.error('CLIENT_FAIL', err.code);
  });
  console.log('CLIENT_WRITE1');
  client.write('Message 1', (err) => {
    if (err) {
      console.error('CLIENT_WRITE1_ERROR', err.code);
    }
    console.log('CLIENT_WRITE1_SUCCESS');
    // Wait 1 sec to kill the server !
    setTimeout(() => {
      server.kill(() => {
        setTimeout(() => {
        console.log('SERVER_KILLED');
        // Server is down let's try to send a 2nd message
        console.log('CLIENT_WRITE2');
        client.write('Message 2', (err) => {
          if (err) {
            // Expect to end up here
            return console.log('CLIENT_WRITE2_ERROR', err.code);
          }
          // Not expected at all
          console.log('CLIENT_WRITE2_SUCCESS');
        });
      }, 100);
      });
    }, 1000);
  });
});
