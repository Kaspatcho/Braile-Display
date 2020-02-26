let displays = []
const input = document.querySelector("input")
const letters = [["a", 0x1], ["b", 0x3], ["c", 0x9], ["d", 0x19], ["e", 0x11],
                 ["f", 0xb], ["g", 0x1b], ["h", 0x13], ["i", 0xa], ["j", 0x1a],
                 ["k", 0x5], ["l", 0x7], ["m", 0xd], ["n", 0x1d], ["o", 0x15],
                 ["p", 0xf], ["q", 0x1f], ["r", 0x17], ["s", 0xe], ["t", 0x1e],
                 ["u", 0x25], ["v", 0x27], ["w", 0x3a], ["x", 0x2d], ["y", 0x3d],
                 ["z", 0x35]]
let index = 0
const maxLength = 20

function setup(){
 createCanvas(600, 200)
 for(let i=0; i < maxLength; i++){
   displays.push(new Display())
 }
 input.maxLength = maxLength
 
}

function draw(){
  background("#37323E")
  push()
  stroke(255, 150)
  line(0, height/2 - 10, width, height/2 - 10)
  pop()

  for(const i in displays){
    push()
    translate(displays[i].x * 3*i+20 < width ? displays[i].x * 3*i+20 : displays[i].x * 3*i - width + 20,
      displays[i].x * 3*i+20 < width ? 0 : displays[i].y + 80)
    displays[i].draw()
    pop()
  }
}

input.addEventListener("keyup", () => {
  let text = input.value.split('')
  for (var i in text) {
    let c = letters.findIndex(letter => letter[0] == text[i].toLowerCase())
    displays[i].setLetter(c)
  }
  while(i < displays.length){
    displays[++i].setLetter(-1)
  }
  if(input.value == "") displays[0].setLetter(-1)
})



function Display(){
  this.x = 20
  this.y = 20
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
        ellipse(this.x * col, this.y * row+this.y, 20)
        let index = row + col * this.states.length + 1
        noStroke()
        fill(255)
        if(!this.states[row][col]) text(index, this.x * col, this.y * row+this.y)
        pop()
      }
    }
  }

  this.setState = function(row, col, value){
    this.states[row][col] = value
  }

  this.setLetter = function(letter){
    let binLetter = (letter >= 0) ? letters[letter][1] : 0
    for(let row=0; row < 3; row++){
      for(let col=0; col < 2; col++){
        let i = row + col * this.states.length
        this.setState(row, col, setLight(binLetter, i))
      }
    }
  }
}

function setLight(val, shift){
  return (val >> shift) & 1
}
