http = require('http');
fs = require('fs');

port = 3000;
host = '127.0.0.1';

// serial port initialization:
var SerialPort = require('serialport'); // include the serialport library
var portName = process.argv[2]; // get the port name from the command line
var myPort = new SerialPort(portName, 9600); // open the port

// these are the definitions for the serial events:
myPort.on('open', openPort); // called when the serial port opens

function openPort() {
  var brightness = 1; // the brightness to send for the LED
  console.log('port open');
  console.log('baud rate: ' + myPort);

  // since you only send data when the port is open, this function
  // is local to the openPort() function:
}

function sendData(roundKills) {
  // convert the value to an ASCII string before sending it:
  myPort.write(roundKills.toString());
  console.log('Sending ' + roundKills + ' out the serial port');
}

server = http.createServer(function(req, res) {
  if (req.method == 'POST') {
    console.log('Handling POST request...');
    res.writeHead(200, { 'Content-Type': 'text/html' });

    var body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    req.on('end', function() {
      // player/state/round_kills
      // console.log(body.player.state.round_kills);
      console.log(JSON.parse(body));
      console.log(JSON.parse(body).player.state.round_kills);
      sendData(JSON.parse(body).player.state.round_kills);

      res.end('');
    });
  } else {
    console.log('Not expecting other request types...');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var html =
      '<html><body>HTTP Server at http://' +
      host +
      ':' +
      port +
      '</body></html>';
    res.end(html);
  }
});

server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
