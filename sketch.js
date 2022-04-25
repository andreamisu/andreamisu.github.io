const totalPts = 360;
const steps = totalPts + 1;
let diameter;
let roff = 0;
let xoff = 0;
let counter = 1000;
let radiusChange = 0.6
let counterDiameter = 0
let alternateColor = 30

let lock = 0;

const values = {
  DECK_D : 127,
  DECK_C : 127,
  DECK_B : 127,
  DECK_A :127,
}

const commands = {
    179 : "DECK_D",
    178: "DECK_C",
    177: "DECK_B",
    176: "DECK_A",
}

const notes = {
  69 : "FADER",
  68: "AUDIO_CUE",
  67: "FILTER",
  66: "LOW_EQ",
  65: "MID_EQ",
  64: "HI_EQ",
  9: "PLAY_CUE"
}
function setup() {
  
// Request MIDI access
if (navigator.requestMIDIAccess) {
    console.log('You should definitely try sending me some MIDI messages ehueh');
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
} else {
    console.log('WebMIDI is not supported in this browser.');
}

// Function to run when requestMIDIAccess is successful
function onMIDISuccess(midiAccess) {
    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;

    // Attach MIDI event "listeners" to each input
    for (var input of midiAccess.inputs.values()) {
        input.onmidimessage = getMIDIMessage;
    }
}

// Function to run when requestMIDIAccess fails
function onMIDIFailure() {
    console.log('Error: Could not access MIDI devices.');
}

function getMIDIMessage(message) {
    if(lock)
      return
    lock=1
    var command = message.data[0];
    var note = message.data[1];
    var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command
  switch(notes[note]){
    case "FADER":
      //velocityNormalized = map(velocity, 0, 127, 0, height-150);  
      //values[commands[command]] = velocityNormalized
      if(commands[command] != "DECK_D") {
          values[commands[command]] = velocity*2
      }
      else{
          radiusChange = map(velocity, 0, 127, 0, 1)
      }
      
      break;
      case "PLAY_CUE":
        counter = 40
    }
  lock=0
  }
  
  createCanvas(windowWidth, windowHeight);
 background(0);
  
  
}

function mouseClicked() {
  if(alternateColor==30)
      alternateColor = 1
  else
      alternateColor=30
}

function draw() {
  counterDiameter++;
  const sinVariability = sin(counterDiameter/alternateColor)
  const cosVariability = cos(counterDiameter/30)
  const tanVariability = tan(counterDiameter/30)
  diameter = Math.min(width, height) * (radiusChange * abs(sin(counterDiameter/30)));

  if(counter<10000)
    counter++;
  
   noStroke();
   //fill(0,map(counter,0,1000,0,100));
   fill(0,7);
   rect(0,0,width,height);
   
   translate(width/2, height/2);
   stroke(255-(values["DECK_A"] * sinVariability*2),255-(values["DECK_B"]* cosVariability*2),255-(values["DECK_C"]* tanVariability*2))
   strokeWeight(diameter/13);  
   noFill();
   
   roff -= 0.1;
   xoff += 0.005;

   beginShape();
   for (let i = 1; i < steps; i++) {
      const theta = i / totalPts * TWO_PI;
      const variation = noise(
        (cos(theta + roff) * 0.3)+xoff,
        sin(theta + roff) * 0.3
      );
      vertex(
          cos(theta) * diameter * variation,
          sin(theta) * diameter * variation
      );
   }
   endShape();
  
}

