let posX = 0;
let posY = 0;
let colors = ['white', 'lightblue', 'lightpink', 'purple', 'rgb(219,196,255)', 'rgb(230,255,207)'];

function setup() {
  createCanvas(windowWidth, windowHeight);
    background(220);
}

function draw() {
  posX = random(0, windowWidth);
  posY = random(0, windowHeight);
  color = random(colors);
  drawFlower(posX, posY, color);
  
}

function drawFlower(posX, posY, color){
  // Set colors
  fill(color);
  stroke(127, 63, 120);
  translate(posX, posY);
  noStroke();
  
  for (let i = 0; i < 10; i ++) {
    ellipse(0, 30, 20, 50);
    rotate(PI/5);
  }
  fill('#FFF6A2')
  ellipse(0, 0, 40, 40)
  
}

function windowResized() {
  // Resize the canvas whenever the window is resized
  resizeCanvas(windowWidth, windowHeight);
  background(220);
}