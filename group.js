// Define dynamic values for cylinders and circles
let cylinderRadius;
let cylinderRows;
let cylinderCols;
let riverCircles = [];
let ifDrawTree = true;

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    noLoop();

    // Calculate cylinder dimensions based on canvas size
    cylinderRadius = width / 50; // Adjust the radius based on the canvas width
    cylinderRows = Math.floor(height / (cylinderRadius * 0.6));
    cylinderCols = Math.floor(width / (cylinderRadius * 1.2));

    // Initialize circles for the river
    let numRiverRows = Math.floor(height / 30); // Rows based on height
    let numRiverCircles = Math.floor(width / 10); // Circles in each row based on width

    riverCircles = [];
    for (let j = 0; j < numRiverRows; j++) {
        for (let i = 0; i < numRiverCircles; i++) {
            let x = width - i * random(5, 10);
            let baseY = height * 0.7;
            let yOffset = sin(map(i, 0, 40, 0, PI)) * 100;
            let rowOffset = j * random(5, 15);
            let downwardSlope = i * random(2, 4);
            let y = baseY + yOffset + rowOffset + downwardSlope;

            let circleSize = random(width / 100, width / 15);// Scale circle size based on width
            let blueShade = color(random(0, 100), random(100, 200), random(200, 255));
            riverCircles.push(new Circle(x, y, circleSize, blueShade));
        }
    }
}

function draw() {
    drawGradientSky();
    drawCelestialBodies();
    drawStars();

    // Draw the Grass elements
    push();
    translate(width / 5.5, height / 1.8);
    drawGrass();
    pop();

    push();
    translate(width / 1.1, height / 1.6);
    drawGrass();
    pop();

    // Draw the River element
    for (let circle of riverCircles) {
        circle.display();
    }

    // Draw the Tree element
    if (ifDrawTree) {
        drawTree(width / 1.6, height * 0.7, -90, 9);
        ifDrawTree = false;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    setup(); // Reinitialize values after resizing
    ifDrawTree = true;
    redraw(); // ensures all elements resize and reposition after resizing the window.
}

function drawGrass() {
    for (let y = 0; y < cylinderRows; y++) {
        for (let x = 0; x < cylinderCols; x++) {
            let xPos = (x - y) * cylinderRadius * 1.2;
            let yPos = (x + y) * cylinderRadius * 0.6;
            let topHeight = random(30, 80);
            drawCylinder(xPos, yPos, topHeight);
        }
    }
}

function drawCylinder(x, y, topHeight) {
    push();
    translate(x, y);
    fill(random(0, 100), 130, 70);
    strokeWeight(1);
    stroke(255);
    beginShape();
    vertex(-cylinderRadius, 0);
    vertex(cylinderRadius, 0);
    vertex(cylinderRadius, -topHeight);
    vertex(-cylinderRadius, -topHeight);
    endShape(CLOSE);

    fill(random(32, 100), 152, 48);
    ellipse(0, -topHeight, cylinderRadius * 2, cylinderRadius * 0.8);
    pop();
}

class Circle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    display() {
        fill(this.color);
        stroke(255);
        ellipse(this.x, this.y, this.size, this.size);

        if (random() < 0.5) {
            this.drawSpiral();
        } else {
            this.drawInnerCircles();
        }
    }

    drawSpiral() {
        angleMode(RADIANS);
        stroke(255, random(100, 200));
        noFill();

        let prevX = this.x;
        let prevY = this.y;

        for (let angle = 0; angle < TWO_PI * 4; angle += 0.1) {
            let r = map(angle, 0, TWO_PI * 4, 0, this.size / 2);
            let x = this.x + r * cos(angle);
            let y = this.y + r * sin(angle);
            line(prevX, prevY, x, y);

            prevX = x;
            prevY = y;
        }
        angleMode(DEGREES);
    }

    drawInnerCircles() {
        let numInnerCircles = Math.round(random(3, 6));

        for (let i = 0; i < numInnerCircles; i++) {
            let innerSize = random(5, this.size / 3);
            let innerX = this.x + random(-this.size / 3, this.size / 3);
            let innerY = this.y + random(-this.size / 3, this.size / 3);
            let innerColor = color(255, random(100, 200));

            fill(innerColor);
            ellipse(innerX, innerY, innerSize, innerSize);
        }
    }
}

function drawTree(x, y, angle, number) {
    if (number > 0) {
        strokeWeight(map(number, 0, 10, 1, 8));
        let length = map(number, 0, 10, height / 50, height / 10); //mapped to a proportion of height
        let x2 = x + cos(angle) * length;
        let y2 = y + sin(angle) * length;

        stroke(101, 67, 33);
        line(x, y, x2, y2);

        drawTreeCircles(x2, y2, number);

        drawTree(x2, y2, angle - random(15, 30), number - 1);
        drawTree(x2, y2, angle + random(15, 30), number - 1);
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
        let skycolor = lerpColor(color(25, 10, 100), color(50, 50, 50), gradient);
        stroke(skycolor);
        line(0, y, width, y);
    }
}

function drawCelestialBodies() {
    noStroke();
    let numBodies = 12;

    for (let i = 0; i < numBodies; i++) {
        let x = random(width);
        let y = random(height / 4);
        let maxRadius = random(40, 30);
        let innerCircles = 7;

        for (let j = 0; j < innerCircles; j++) {
            let radius = map(j, 0, innerCircles, maxRadius, 0);
            fill(255, 255, 50, map(j, 0, innerCircles, 100, 0));
            ellipse(x, y, radius * 2, radius * 2);
        }
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