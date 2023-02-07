let xCoord = []; // list of x coordinates
let yCoord = []; // list of y coordinates

function setup() {
  createCanvas(windowWidth, windowHeight);
}

// Create coordinate placements for the daisies
function coords() {
  for (let j = 0; j < 1 + windowWidth/100; j++) {
      xCoord.push(100 * j);
    }
  for(let i = 0; i < 1 + windowHeight/100; i++){
    yCoord.push(100 * i);
  }
}


function draw() {
  background(220);
  coords();
  noLoop();
  let posX = 0;
  let posY = 0;
  let l = 0;
  // iterate through the list of coords and draw a daisy
  for(var each in yCoord){
    let k = 0;
    for (var every in xCoord) {
      posX = xCoord[k];
      drawFlower(posX, posY);
      k++;
    }
    posY = yCoord[l];
    l++;
  }
}

function drawFlower(posX, posY){
  // Set colors of petal
  fill('white');
  stroke(127, 63, 120);
  noStroke();
  
  // Create petals
  for (let i = 0; i < 10; i ++) {
    push();
    translate(posX, posY);
    rotate(i * TAU/10);
    translate(0, 30);
    ellipse(0, 0, 20, 50);
    pop();
  }
  // Create flower center
  fill('#FFF174');
  ellipse(posX, posY, 40, 40);
}

function windowResized() {
  // Resize the canvas whenever the window is resized
  resizeCanvas(windowWidth, windowHeight);
}