var serial; // variable to hold an instance of the serialport library
var portName = '/dev/tty.usbmodem141201' // name of your port
var dataarray = []; //some data coming in over serial!


function setup() {
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  createCanvas(720, 720);             // create canvas for html page
  noStroke();                         // remove outline from shape
  ellipseMode(CENTER);                // set parameters for ellipse to be center coordinates
}
 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
   print(i + " " + portList[i]);
 }
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}

function serialEvent() {
  if (serial.available()) {             // if there is serial input
    var datastring = serial.readLine(); // readin some serial
    var newarray; 
    try {
      newarray = JSON.parse(datastring); // can we parse the serial
      } catch(err) {
          //console.log(err);
    }
    if (typeof(newarray) == 'object') {  // create array with coordinates from joystick
      dataarray = newarray;
    }
    console.log("got back " + datastring);  // log to console
  } 
}

// send information from p5 to arduino
function keyPressed() {
    if (keyCode === LEFT_ARROW) {   // if left arrow key is pressed
        serial.write('r');          // send to arduino --> red LED turns on/off
    } else if (keyCode === RIGHT_ARROW) {   // if right arrow key is pressed
        serial.write('g');                  // send to arduino --> green LED turns on/off
    }   
}

// images to appear on html page
function draw() {
    background(color(204, 255, 204))    // set background color
    fill(229, 204, 255);                // set shape color
    var xPos = map(dataarray[0], 0, 1023, 0, height);   // map joystick x value to coordinates on the webpage canvas
    var yPos = map(dataarray[1], 0, 1023, 0, height);   // map joystick y value to coordinates on the webpage canvas
    ellipse(xPos, yPos, 100, 100);      // create ellipse (circle) on the screen
    
}

