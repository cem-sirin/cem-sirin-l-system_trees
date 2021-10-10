// TURTLE STUFF:
let x, y; // the current position of the turtle
let angle = 0; // which way the turtle is pointing
let step = 3; // how much the turtle moves with each 'F'
let delta = -20; // how much the turtle turns with a '-' or '+'

// initialising stacks
let stackX = [];
let stackY = [];
let stackAngle = [];


// LINDENMAYER STUFF (L-SYSTEMS)
let thestring = 'X'; // "axiom" or start of the string
let numloops = 7; // how many iterations to pre-compute
let therules = []; // array for rules
//therules[0] = ['F', 'F[+F]F[-F]F']
therules[0] = ['F', 'FF'];
therules[1] = ['X', 'F[+X]F[-X]+X'];

function setup() {
  createCanvas(windowWidth*0.7, windowHeight);
  background(0,0,0,0);

  // start the x and y position at lower-left corner
  x = windowWidth*0.35;
  y = windowHeight*0.95;
  angle = 270;

  stackX.push(x); 
  stackY.push(y); 
  stackAngle.push(angle);

  // COMPUTE THE L-SYSTEM
  for (let i = 0; i < numloops; i++) {
    thestring = lindenmayer(thestring);
  }
  
  for (let i = 0; i < thestring.length; i++) {
    drawIt(thestring[i], (i/thestring.length));
  }
  
}

// interpret an L-system
function lindenmayer(s) {
  let outputstring = ''; // start a blank output string
  print(s)
  // iterate through 'therules' looking for symbol matches:
  for (let i = 0; i < s.length; i++) {
    let ismatch = 0; // by default, no match
    for (let j = 0; j < therules.length; j++) {
      if (s[i] == therules[j][0])  {
        outputstring += therules[j][1]; // write substitution
        ismatch = 1; // we have a match, so don't copy over symbol
        break; // get outta this for() loop
      }
    }
    // if nothing matches, just copy the symbol over.
    if (ismatch == 0) outputstring+= s[i];
  }
  print(outputstring)
  return outputstring; // send out the modified string
}

// this is a custom function that draws turtle commands
function drawIt(k, m) {
  if (k =='F') { // draw forward
    // polar to cartesian based on step and current angle:
    let x1 = x + step*cos(radians(angle));
    let y1 = y + step*sin(radians(angle));

    stroke(255, 189-Math.random()*90, 105-Math.random()*6); // yellow
    line(x, y, x1, y1); // connect the old and the new

    // update the turtle's position:
    x = x1;
    y = y1;
  } else if (k == '+') {
    angle += delta; // turn left
  } else if (k == '-') {
    angle -= delta; // turn right
  } else if (k == '[') {
    stackX.push(x); 
    stackY.push(y); 
    stackAngle.push(angle);
  } else if (k == ']') {
    x = stackX[stackX.length-1]; 
    stackX.pop();

    y = stackY[stackY.length-1]; 
    stackY.pop();

    angle = stackAngle[stackAngle.length-1]; 
    stackAngle.pop();
  }
}

function getInitialisation() {
  thestring = document.getElementById("initialisation").value;
  console.log(thestring);
}
function getRuleF() {
  therules[0] = ['F', document.getElementById("ruleF").value]
  console.log(therules[0]);
}
function getRuleX() {
  therules[1] = ['X', document.getElementById("ruleX").value]
  console.log(therules[1]);
}
function getNumIterations() {
  numloops = document.getElementById("iterations").value;
}
function getAngle() {
  angle = document.getElementById("angle").value;
}
function updateMe() {
  print("clicked");
  getInitialisation();
  getRuleF();
  getRuleX();
  getNumIterations();
  getAngle();
  setup();
}
