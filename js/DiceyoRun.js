//Check sound;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var audio_context = null;
var oscillator = null;
const length = 2;
const eps = 0.01;
let isStarted = false;
var system = document.getElementById("system");
system.innerHTML="<b>System</b> Audio: "+context;
function playSound(note) 
{
  if(!audio_context)
  {
    audio_context = new AudioContext();
  }
  oscillator = audio_context.createOscillator();
  oscillator.type = 'sine';//'square';//'sine';
  //oscillator.frequency.exponentialRampToValueAtTime(440,context.currentTime+1);
  var time = audio_context.currentTime + eps;
  oscillator.frequency.setTargetAtTime(frequencyFromNoteNumber(note),time,0.001);

  oscillator.connect(audio_context.destination);
  oscillator.start(audio_context.currentTime);
  oscillator.stop(0.1);
  /*if (!isStarted) {
    oscillator.start(0);
    isStarted = true;
  } else {
    audio_context.resume();
  }*/
}
//Middle C = 60
function frequencyFromNoteNumber( note ) 
{
  return 440 * Math.pow(2,(note-69)/12);
}
function noteOff() {
  audio_context.suspend();
}
/*
const tetris = [
  [76, 4], [71, 8], [72, 8], [74, 4], [72, 8], [71, 8], [69, 4], [69, 8], [72, 8], [76, 4], [74, 8], [72, 8], [71, 4], [71, 8], [72, 8], [74, 4], [76, 4], [72, 4], [69, 4], [69, 4], [0,  4], [74, 3], [77, 8],[81, 4], [79, 8], [77, 8], [76, 3], [72, 8], [76, 4], [74, 8], [72, 8], [71, 4], [71, 8], [72, 8], [74, 4], [76, 4], [72, 4], [69, 4], [69, 4], [0, 4],
]

function playTetris() 
{
  audio_context = new AudioContext();
  oscillator = audio_context.createOscillator();
  oscillator.start(0);
  var time = audio_context.currentTime + eps;
  tetris.forEach(note => {
    const freq = Math.pow(2, (note[0]-69)/12)*440;
    console.log(time);
    oscillator.frequency.setTargetAtTime(0, time - eps, 0.001);
    oscillator.frequency.setTargetAtTime(freq, time, 0.001);
    time += length / note[1];
  });
}
*/
//-----------------------
let lands = new Image();
lands.src ='images/lands.png';

let img = new Image();
img.src = 'images/DiceYo_Jump2F.png';
img.onload=function()
{
    init();
    
}
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

var score = document.getElementById("score");

const scale = 0.3;
const width = 128;
const height = 256;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
var PosX=0;
var PosY=0;
var jump=false;
var forceJump=0;
const gravity = 0.8;
function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(img,
                frameX * width, frameY * height, width, height,
                canvasX, canvasY, scaledWidth, scaledHeight);
}

const cycleLoop = [0, 1];
let currentLoopIndex = 0;
let frameCount = 0;
let currentDirection = 0;
var jumpHeight=0;
function step() {
  frameCount++;
  if (frameCount < 12) {
    window.requestAnimationFrame(step);
    return;
  }
  frameCount = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawLands();
  move();
    if(jump)
    {
        forceJump-=8;
        jumpHeight=forceJump*gravity;
        if(forceJump<0)
        {
            forceJump=0;
            jump=false;
        }
        score.innerHTML="DiceYo is Jumping!";
    }else
    {
        score.innerHTML="Press 'A' Button";
    }
  if(forceJump>0)
  {
    currentLoopIndex = 1;
 
  }else
  {
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
        currentDirection++;
    }
    if (currentDirection >= 1) {
        currentDirection = 0;
    }
  }
  drawFrame(cycleLoop[currentLoopIndex], currentDirection, PosX, PosY+(-jumpHeight));
  window.requestAnimationFrame(step);
}
function move()
{
    var center = canvas.width/2-scaledWidth/2;
    PosX = center;
}

var map_pos=0;
var map_speed=16;
var map_direction=-1;
function drawLands()
{
    map_pos+=map_speed;
    if(map_pos > 384)map_pos=0;
    land(0,(map_pos%384)*map_direction);
    land(1,((-384+map_pos)%384)*map_direction);
}
function land(i,posx)
{
    //if(PosX<-384)PosX=384;
    ctx.drawImage(lands,0, i*128, 384, 128,posx, 0, 384, 128);
}
function init() 
{
  window.addEventListener( "keypress", InputKey, false )
  window.requestAnimationFrame(step);

}
function InputKey(e) 
{
  //alert(e.keyCode);
    if(e.keyCode==97)
    {
        if(!jump)
        {
            forceJump=32;
            jump=true;
            playSound(60); 
        }
    }/*else if(e.keyCode==115)
    {

      playSound(62); 
        
    }else if(e.keyCode==100)
    {

      playSound(64); 
        
    }*/
}
