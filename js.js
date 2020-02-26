let display
const letters = [0x1, 0x3, 0x9, 0x19, 0x11, 0xb, 0x1b,
                 0x13, 0xa, 0x1a, 0x5, 0x7, 0xd, 0x1d,
                 0x15, 0xf, 0x1f, 0x17, 0xe, 0x1e, 0x25,
                 0x27, 0x3a, 0x2d, 0x3d, 0x35]

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h",
                  "i", "j", "k", "l", "m", "n", "o",
                  "p", "q", "r", "s", "t", "u", "v",
                  "w", "x", "y", "z"]
let index = 0

function setup(){
 createCanvas(600, 600)
 display = new Display()
}

function draw(){
  background("#37323E")
  scale(7)
  display.draw()
  push()
  textSize(20)
  fill(255)
  text(alphabet[index].toUpperCase(), 60, 50)
  pop()
  let binLetter = letters[index]
  for(let row=0; row < 3; row++){
    for(let col=0; col < 2; col++){
      let i = row + col * display.states.length
      display.setState(row, col, setLight(binLetter, i))
    }
  }
}

function mousePressed(){
  index = (index + 1) % letters.length
}

function Display(){
  let x = 20, y = 20
  this.states = [
    [0, 0],
    [0, 0],
    [0, 0]
  ]
  this.draw = function(){
    for(let row=0; row < 3; row++){
      for(let col=0; col < 2; col++){
        push()
        stroke(255)
        fill(89, 201, 165, this.states[row][col] * 255)
        ellipse(x * col+x, y * row+y, 20)
        let index = row + col * this.states.length + 1
        noStroke()
        fill(255)
        text(index, x * col+x, y * row+y)
        pop()
      }
    }
  }

  this.setState = function(row, col, value){
    this.states[row][col] = value
  }
}

function setLight(val, shift){
  return (val >> shift) & 1
}
