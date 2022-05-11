let aspectFlag = true
let cnv

let params = {
  pixelSize:10,
  colour: [0, 0, 0],
  background: [255, 255, 255],
  characters: ' .:-=+*#%@',
  textSize: 13,
  textStyle: 'NORMAL'
}

let string_foot = "who am I?  who ARE you"
let old_string_foot

let capture
let capturing = false
let canvasWidth
let canvasHeight

function getRightCaputreSize(width){
  return width * aspectRatio
}

function setup() {
  
  old_string_foot = string_foot
  canvasWidth = windowWidth 
  canvasHeight = windowHeight 
  cnv = createCanvas(canvasWidth, canvasHeight)

  var constraints = {
    video: {
      optional: [{ maxFrameRate: 60 }]
    },
    audio: false
  };

  capture = createCapture(constraints,function(){
      capturing = true
    var x = (windowWidth - this.width) / 2;
    var y = (windowHeight - this.height) / 2;
    cnv.position(x, y);
  })
 
  capture.hide()
 
}

function draw() {
  
  
  scale(windowHeight / capture.height)
  push()
  
  background(0)

  textSize(params.textSize)
  fill(0,255,0)
  // image(capture,0,0)

  textStyle(NORMAL)

  const characters = params.characters.split('')

  if (capturing) {
    capture.loadPixels()


    // let actualWidth = capture.height + (windowWidth-capture.width)
    // if (capture.pixels) {     
    //     for (y = 0; y < capture.height; y+=params.pixelSize) {
    //        for (x = 0; x < capture.width; x+=params.pixelSize) {
    //       // *4 is for each rgba value
    //       const index = (x + y * capture.width) * 4
    //       const r = capture.pixels[index] 
    //       const g = capture.pixels[index + 1] 
    //       const b = capture.pixels[index + 2] 
    //       const a = capture.pixels[index + 3] 
    //       const bright = Math.round((r + g + b) / 3)                  
    //       const letter = characters[Math.round(map(bright, 0, 255, characters.length - 1, 0))]
    //       text(letter, x, y )
    //     }
    //   }
    // }

    let widthPresence = windowWidth - capture.width
    if (capture.pixels) {     
      for (y = 0; y < capture.height; y+=params.pixelSize) {
         for (x = 0; x < windowWidth; x+=params.pixelSize) {
          if(x < widthPresence / 2 || x > capture.width + widthPresence / 2){
            //black
            const letter = characters[Math.round(map(255, 0, 255, characters.length - 1, 0))]
            text(" ", x, y )
            continue
          }
          // *4 is for each rgba value 
          const index = ((x - (widthPresence/2)) + y * capture.width) * 4
          const r = capture.pixels[index] 
          const g = capture.pixels[index + 1] 
          const b = capture.pixels[index + 2] 
          const a = capture.pixels[index + 3] 
          const bright = Math.round((r + g + b) / 3)                  
          const letter = characters[Math.round(map(bright, 0, 255, characters.length - 1, 0))]
          text(letter, x, y )
        }
      }
    }
  } 
  
}