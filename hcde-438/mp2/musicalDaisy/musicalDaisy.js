// The midi notes of a scale
let notes = [60, 60, 67, 67, 69, 69, 67, 65, 65, 64, 64, 62, 62, 60];
// The index of the note we will play
let currentNote = 0;

// Initialize variables here so they can be reused
let osc, cSize, cX, cY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL);

  // Create our oscillator
  osc = new p5.Oscillator();
  osc.start();
  osc.amp(0);
  
  // Initial values for our circle
  cSize = 70;
  cX = windowWidth / 2;
  cY = windowHeight / 2;
}

function draw() {
  background('lightgray');
  
  noStroke();
  
  translate(windowWidth/2, windowHeight/2)
  
  fill('white');
  
  if (overCircle(cX, cY, cSize)) {
    // If mouse is over the circle, change the color
    if (mouseIsPressed) {
      // If the mouse is pressed make the fill more saturated
      fill('rgb(219,196,255)');
    } 
  } else {
    // When mouse is not over the circle it is white
    fill('#white');
  }
  
  for (let i = 0; i < 10; i++) {
    push();
    rotate(i*TAU/10);
    translate(0, 40);
    ellipse(0, 0, 30, 100);
    pop();
  }
  

  fill('#FFF174')
  // Draw the circle
  circle(0, 0, cSize);
}


function playNote(note) {
  // Choose the frequency of the oscillator based on the note
  osc.freq(midiToFreq(note), 0.1);

  // increase amplitude over 0.2 seconds, then decrease over 0.5 seconds
  osc.amp(0.3, 0.2);
  osc.amp(0, 0.5);
}

function overCircle(x, y, diameter) {
  const disX = x - mouseX;
  const disY = y - mouseY;
  if (sqrt(sq(disX) + sq(disY)) < diameter / 2) {
    return true;
  } else {
    return false;
  }
}

function mousePressed() {
  // Only play the note if we are clicking on the circle
  if (overCircle(cX, cY, cSize)) {
    // Play the note
    playNote(notes[currentNote]);
    // Increment it by one, modulo to wrap around when we reach the end
    currentNote = (currentNote+1) % notes.length;
  }
}
