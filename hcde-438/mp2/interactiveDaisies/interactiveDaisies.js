let colors = ['white', 'lightblue', 'lightpink', 'purple', 'rgb(219,196,255)', 'rgb(230,255,207)'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

// Draw a flower where the user clicks
function draw() {
  if (mouseIsPressed) {
    translate(mouseX, mouseY)
    drawFlower()
  } 
}

function drawFlower(){
  // Set colors
  fill(random(colors));
  stroke(127, 63, 120);
  noStroke();
  
  for (let i = 0; i < 10; i ++) {
    ellipse(0, 30, 20, 50);
    rotate(PI/5);
  }
  fill('#FFF174')
  ellipse(0, 0, 40, 40)
  // rotate(PI/5);
  
}