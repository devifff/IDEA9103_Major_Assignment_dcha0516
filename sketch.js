// Define the radius, number of rows, and number of columns for the cylinders in the Grass element
let cylinderRadius = 10;
let cylinderRows = 50;
let cylinderCols = 50;
// Create an empty array to store circles in the River element
let riverCircles = [];

//empty variable for the song
let song;

// ADD VARIABLES FOR CUSTOM PLAY AND PAUSE BUTTONS
let buttonRadius = 30; // Radius for both buttons
let playButtonX, playButtonY; // Position for play button
let pauseButtonX, pauseButtonY; // Position for pause button
let showPlayButton = true; // To toggle between play and pause buttons

// ADD COLOR VARIABLES FOR GRADUAL COLOR CHANGE
let hueValue = 0;

// ADD ARRAY FOR CHERRY BLOSSOM PETALS
let petals = [];

function preload() {
  song = loadSound('assets/RUDE - Eternal Youth.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);//changed the canvas size to get a more dynamic feel
  angleMode(DEGREES);
  noLoop();// Prevent continuous looping

  // SET COLOR MODE TO HSB FOR EASIER COLOR MANIPULATION
  colorMode(HSB, 360, 100, 100, 100);

  // INITIALIZE POSITIONS FOR PLAY AND PAUSE BUTTONS
  playButtonX = 50;
  playButtonY = 50;
  pauseButtonX = 50;
  pauseButtonY = 50;

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
      let blueShade = color(random(180, 240), 100, 100); // MODIFY COLOR TO USE HSB VALUES
      riverCircles.push(new Circle(x, y, circleSize, blueShade));
    }
  }

  // CREATE INITIAL PETALS FOR CHERRY BLOSSOM
  for (let i = 0; i < 200; i++) {
    petals.push(new Petal());
  }
}

function draw() {
  // UPDATE HUE VALUE WHEN THE SONG IS PLAYING
  if (song.isPlaying()) {
    hueValue = (hueValue + 0.5) % 360; // Gradually change hue value
  }

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
    fill((hueValue + hue(circle.color)) % 360, saturation(circle.color), brightness(circle.color)); // USE UPDATED HUE VALUE
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

  // UPDATE AND DRAW CHERRY BLOSSOM PETALS WITHOUT USING update() AND display() METHODS
  for (let i = 0; i < petals.length; i++) {
    let petal = petals[i];

    // UPDATE PETAL POSITION
    if (song.isPlaying()) {
      petal.y += petal.speed;
      petal.angle += petal.rotationSpeed;
      if (petal.y > height) {
        petal.y = random(-200, 0);
        petal.x = random(width);
      }
    }

    // DRAW PETAL
    push();
    translate(petal.x, petal.y);
    rotate(petal.angle);
    fill(330, 50, 100, 80); // PINK COLOR FOR CHERRY BLOSSOM PETALS
    noStroke();
    ellipse(0, 0, petal.size * 1.2, petal.size);
    pop();
  }

  // DRAW CUSTOM PLAY/PAUSE BUTTONS
  drawPlayPauseButton();
}

function mousePressed() {
  // CHECK IF MOUSE IS OVER THE PLAY/PAUSE BUTTON
  let a = dist(mouseX, mouseY, playButtonX, playButtonY);
  if (a < buttonRadius) {
    if (song.isPlaying()) {
      song.pause();
      noLoop();
      showPlayButton = true;
    } else {
      song.loop();
      loop();
      showPlayButton = false;
    }
  }
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
  fill((hueValue + 100) % 360, 80, 60); // MODIFY COLOR TO USE HSB AND CHANGE WITH HUE VALUE
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
  fill((hueValue + 120) % 360, 90, 70); // MODIFY COLOR TO USE HSB AND CHANGE WITH HUE VALUE
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

// MODIFY PETAL CLASS TO REMOVE update() AND display() METHODS
class Petal {
  constructor() {
    this.x = random(width);
    this.y = random(-200, 0);
    this.size = random(5, 15);
    this.speed = random(1, 3);
    this.angle = random(360);
    this.rotationSpeed = random(-2, 2);
  }
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
    let innerColor = color((hueValue + 300) % 360, 50, 100);

    fill(innerColor);
    noStroke();
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

    stroke(30, 100, 30); // DARK BROWN COLOR FOR TREE TRUNK IN HSB
    strokeWeight(map(number, 0, 10, 1, 4)); // THICKNESS DECREASES WITH RECURSION DEPTH
    line(x, y, x2, y2);

    // DRAW CHERRY BLOSSOMS ON THE TREE BRANCHES
    if (number < 5) {
      fill(330, 50, 100, 80); // PINK COLOR FOR CHERRY BLOSSOMS
      noStroke();
      ellipse(x2, y2, random(5, 15), random(5, 15));
    }

    drawTree(x2, y2, currentAngle - random(15, 30), number - 1);
    drawTree(x2, y2, currentAngle + random(15, 30), number - 1);
  }
}

function drawTreeCircles(x, y, number) {
  // REMOVE ORIGINAL TREE CIRCLES TO MAKE TREE LOOK MORE LIKE FEUDAL JAPAN
  // NO LONGER DRAWING CIRCLES AROUND THE TREE
}

function drawGradientSky() {
  for (let y = 0; y <= height; y++) {
    let gradient = map(y, 0, height, 0, 1);
    let skycolor = lerpColor(color((hueValue + 200) % 360, 100, 20), color((hueValue + 220) % 360, 100, 50), gradient);
    stroke(skycolor);
    line(0, y, width, y);
  }
}

function drawCelestialBodies() {
  noStroke();
  let numBodies = 3; // REDUCE NUMBER TO SIMPLIFY SCENE

  for (let i = 0; i < numBodies; i++) {//loop to create the big yellow circles aka the celestial bodies
    let x = random(width);
    let y = random(height / 4);//this makes sure that they always remain in the upper half
    let maxRadius = random(50, 80);
    let innerCircles = 5;

    push();
    translate(x, y);

    for (let j = 0; j < innerCircles; j++) {//this loop draws the inner circles
      let radius = map(j, 0, innerCircles, maxRadius, 0);
      fill((hueValue + 60) % 360, 80, 100, map(j, 0, innerCircles, 100, 0));
      ellipse(0, 0, radius * 2, radius * 2);
    }

    pop();
  }
}

function drawStars() {
  noStroke();
  fill(60, 100, 100);
  let numStars = 150;
  for (let i = 0; i < numStars; i++) {
    let xPos = random(width);
    let yPos = random(height);
    let w = random(1, 3);
    ellipse(xPos, yPos, w, w);
  }
}

// ADD FUNCTION TO DRAW CUSTOM PLAY/PAUSE BUTTON
function drawPlayPauseButton() {
  push();
  translate(playButtonX, playButtonY);
  if (showPlayButton) {
    fill(120, 100, 100); // GREEN COLOR FOR PLAY BUTTON
  } else {
    fill(0, 100, 100); // RED COLOR FOR PAUSE BUTTON
  }
  noStroke();
  ellipse(0, 0, buttonRadius * 2);

  // DRAW PLAY OR PAUSE SYMBOL
  fill(255);
  if (showPlayButton) {
    // DRAW PLAY SYMBOL
    triangle(-buttonRadius / 2, -buttonRadius / 2, -buttonRadius / 2, buttonRadius / 2, buttonRadius / 2, 0);
  } else {
    // DRAW PAUSE SYMBOL
    rectMode(CENTER);
    rect(-buttonRadius / 4, 0, buttonRadius / 4, buttonRadius);
    rect(buttonRadius / 4, 0, buttonRadius / 4, buttonRadius);
  }
  pop();
}
