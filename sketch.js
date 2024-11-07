// Define the radius, number of rows, and number of columns for the cylinders in the Grass element
let cylinderRadius = 10;
let cylinderRows = 50;
let cylinderCols = 50;
// Create an empty array to store circles in the River element
let riverCircles = [];

//empty variable for the song
let song;

//added variable for the button
let playButton;

function preload() {
  song = loadSound('assets/RUDE - Eternal Youth.mp3');//License: Creative Common License
}

function setup() {
  createCanvas(windowWidth, windowHeight);//changed the canvas size to get a more dynamic feel
  angleMode(DEGREES);
  noLoop();// Prevent continuous looping

  //made the playmusic button 
  playButton = createButton('Play Music');
  playButton.position(10, 10);
  playButton.mousePressed(() => {
    if (song.isPlaying()) {
      song.pause();
      noLoop();
    } else {
      song.loop();
      loop();
    }
  });

  // Initialize circles for the river
  for (let j = 0; j < 60; j++) { // Loop through 6 rows of circles
    for (let i = 0; i < 120; i++) { // Loop through 40 circles in each row
      // Adjust x position to start from the right side, with a curve to the left
      let x = width - i * random(15, 30);// Randomize x increment to introduce more curve

      // Set a base y-position in the lower part of the canvas and add curving effects
      let baseY = height * 0.7;
      let yOffset = sin(map(i, 0, 40, 0, PI)) * 100;// Stronger sine wave for curvature
      let rowOffset = j * random(10, 30);// Add variation for each row
      let downwardSlope = i * random(4, 8); // Increase downward slope gradually

      let y = baseY + yOffset + rowOffset + downwardSlope; // Combine all for a flowing shape

      let circleSize = random(20, 70);
      let blueShade = color(random(0, 100), random(100, 200), random(200, 255));
      riverCircles.push(new Circle(x, y, circleSize, blueShade));
    }
  }
}

function draw() {
  // Draw the Sky element
  drawGradientSky();
  drawCelestialBodies();
  drawStars();
  // Draw the first Grass element
  push();
  translate(width / 5.5, height / 1.8);// Shift the origin from the default (0,0) to the specified position
  drawGrass();
  pop();
  // Draw the second Grass element
  push();
  translate(width / 1.1, height / 1.6); // Shift the origin from the default (0,0) to the specified position
  drawGrass();
  pop();

  // Move and draw the river circles
  for (let i = 0; i < riverCircles.length; i++) {/*have changed this from the original code in order to draw the river circles
    as the original code's logic could not be used here and was out of my understanding*/
    let circle = riverCircles[i];

    // Move the circles only when the song is playing
    //change the method of how I am using the switch staement to suit my design
    if (song.isPlaying()) {
      // Update the position
      circle.x += circle.vx;//this controls the circle's movement or velocity in x axis
      circle.y += circle.vy;//similarly this controls the movement in y axis
    }

    // Draw the circle
    fill(circle.color);
    stroke(255);
    ellipse(circle.x, circle.y, circle.size, circle.size);

    // Draw additional elements inside the circle
    if (random() < 0.5) {
      drawSpiral(circle);
    } else {
      drawInnerCircles(circle);
    }
  }

  // Draw the tree
  drawTree(width / 1.6, height * 0.7, -90, 9);
}

// Create a function to draw the Grass element using cylinders
function drawGrass() {
  for (let y = 0; y < cylinderRows; y++) {// Loop through the rows of cylinders
    for (let x = 0; x < cylinderCols; x++) {// Loop through the columns in each row
      // Calculate the position in isometric view
      let xPos = (x - y) * cylinderRadius * 1.2;
      let yPos = (x + y) * cylinderRadius * 0.6;
      // Randomize the height for the top of each cylinder
      let topHeight = random(20, 80);
      // Draw each cylinder with a random top height
      drawCylinder(xPos, yPos, topHeight);
    }
  }
}

// Create a function to draw a cylinder to be used in the Grass element
function drawCylinder(x, y, topHeight) {
  push();
  translate(x, y);// Place the cylinder at the specified origin (x,y)

  // Draw the side face of the cylinder
  fill(random(50, 255), 196, 82);
  strokeWeight(1);
  stroke(255);

  /* The usage of beginShape() and endShape() functions was modified from the examples on https://p5js.org/reference/p5/beginShape/.
  These two functions allow for creating a custom shape by adding vertices in the vertex() function.
  Here, the positions of the vertices are determined by the radius and the height of the cylinder. */
  beginShape();
  vertex(-cylinderRadius, 0);
  vertex(cylinderRadius, 0);
  vertex(cylinderRadius, -topHeight);
  vertex(-cylinderRadius, -topHeight);
  endShape(CLOSE);
  // Draw the top face of the cylinder as an ellipse at the new top height
  fill(random(32, 100), 152, 48);
  ellipse(0, -topHeight, cylinderRadius * 2, cylinderRadius * 0.8);
  pop();
}

// Create Circle class to be used in the River element
class Circle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;
    this.size = size;
    this.color = color;
    this.vx = random(-1, 1);//controlling the movement by assigning a value for horizontal movement
    this.vy = random(-1, 1);//controlling the movement by letting it move vertically or up and down
  }//got rid of the old code which had display and switch case as I couldn't make it work and failed to get the logic
}

// Draw a spiral inside the circle
function drawSpiral(circle) {
  angleMode(RADIANS);
  stroke(255, 200);
  noFill();

  let prevX = circle.x;
  let prevY = circle.y;

  for (let angle = 0; angle < TWO_PI * 4; angle += 0.05) {
    let r = map(angle, 0, TWO_PI * 4, 0, circle.size / 2 - 1);
    let x = circle.x + r * cos(angle);
    let y = circle.y + r * sin(angle);
    line(prevX, prevY, x, y);

    prevX = x;
    prevY = y;
  }
  angleMode(DEGREES);
}

function drawInnerCircles(circle) {
  let numInnerCircles = Math.round(random(3, 6));

  for (let i = 0; i < numInnerCircles; i++) {
    let innerSize = random(5, circle.size / 3);
    let innerX = circle.x + random(-circle.size / 3, circle.size / 3);
    let innerY = circle.y + random(-circle.size / 3, circle.size / 3);
    let innerColor = color(255, random(100, 200));

    fill(innerColor);
    ellipse(innerX, innerY, innerSize, innerSize);
  }
}

function drawTree(x, y, angle, number) {
  if (number > 0) {
    let length = map(number, 0, 10, 10, 100);

    let currentAngle = angle;
    if (song.isPlaying()) {
      currentAngle += cos(y);
    }

    let x2 = x + cos(currentAngle) * length;
    let y2 = y + sin(currentAngle) * length;

    stroke(101, 67, 33);
    line(x, y, x2, y2);

    drawTreeCircles(x2, y2, number);

    drawTree(x2, y2, currentAngle - random(15, 30), number - 1);
    drawTree(x2, y2, currentAngle + random(15, 30), number - 1);
  }
}

function drawTreeCircles(x, y, number) {
  noFill();
  for (let i = 0; i < number * 1; i++) {
    stroke(random(100, 255), random(100, 255), random(100, 255), 150);
    ellipse(x, y, i * 10, i * 10);
  }

  for (let i = 0; i < number * 2; i++) {
    let angle = random(360);
    let radius = random(number * 5, number * 10);
    let xOffset = cos(angle) * radius;
    let yOffset = sin(angle) * radius;

    fill(random(100, 255), random(100, 255), random(100, 255), 200);
    noStroke();
    circle(x + xOffset, y + yOffset, 5);
  }
}

function drawGradientSky() {
  for (let y = 0; y <= height; y++) {
    let gradient = map(y, 0, height, 0, 1);
    let skycolor = lerpColor(color(25, 10, 100), color(50, 50, 50), gradient);/* a funtion that helps
    interpolates between these two colours
    this lerp function and how to make gradient was adapted from by Patt Vira
    https://www.youtube.com/watch?v=lPgscmgxcH0
    */
    stroke(skycolor);
    line(0, y, width, y);
  }
}

function drawCelestialBodies() {
  noStroke();
  let numBodies = 12;

  for (let i = 0; i < numBodies; i++) {//loop to create the big yellow circles aka the celestial bodies
    let x = random(width);
    let y = random(height / 4);//this makes sure that they always remain in the upper half
    let maxRadius = random(40, 30);
    let innerCircles = 7;

    push();
    translate(x, y);

    for (let j = 0; j < innerCircles; j++) {//this loop draws the inner circles
      let radius = map(j, 0, innerCircles, maxRadius, 0);
      fill(255, 255, 50, map(j, 0, innerCircles, 100, 0));
      ellipse(0, 0, radius * 2, radius * 2);
    }

    pop();
  }
}

function drawStars() {
  noStroke();
  fill(255, 255, 200);
  let numStars = 150;
  for (let i = 0; i < numStars; i++) {
    let xPos = random(width);
    let yPos = random(height);
    let w = random(1, 5);
    let h = w + random(-1, 1);
    ellipse(xPos, yPos, w, h);
  }
}
