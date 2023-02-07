// The midi notes of a scale
let notes = [60, 62, 64, 65, 67, 69, 71, 72];
let oscs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CORNER);
  colorMode(HSL);

  // Create an array of oscillators, one for each note
  for (const note of notes) {
    osc = new p5.Oscillator();
    osc.start();
    osc.amp(0);
    oscs.push(osc);
  }
}

function draw() {
  background('lightgray');
  let w = width / notes.length;

  // Iterate through the notes list and draw each key
  for (let i = 0; i < notes.length; i++) {
    let x = i * w;
    let noteHue = map(x, 0, width, 0, 360);
    
    noStroke();
    // If the mouse is over the key
    if (mouseX > x && mouseX < x + w && mouseY > windowHeight/2 && mouseY < windowHeight/2 + 40) {
      if (mouseIsPressed) {
        // If the mouse is pressed make the fill more saturated
        fill(noteHue, 100, 70);
      } else {
        // If we are just hovering, it is not as saturated
        fill(noteHue, 70, 80);
      }
    } else {
      // Otherwise it is white
      fill(230);
    }
    for (let i = 0; i < 10; i++) {
    push();
    translate(x + w/4 + 20, windowHeight/2 + 20);
    rotate(i*TAU/10);
    ellipse(0, 0, 20, 50)
    // Exit the drawing state with pop(). 
    pop();
    }

    // Draw the key

    fill('#FFF174');
    circle(x + w/4, windowHeight/2, 40);
  }
}

// A function to play a note
function playNote(osc, note) {
  osc.freq(midiToFreq(note), 0.1);

  // increase amplitude over 0.2 seconds, then decrease over 0.5 seconds
  osc.amp(0.3, 0.2);
  osc.amp(0, 0.5);
}

function mousePressed() {
  // Map mouse x position to the appropriate key
  let key = floor(map(mouseX, 0, width, 0, notes.length));
  playNote(oscs[key], notes[key]);
}
