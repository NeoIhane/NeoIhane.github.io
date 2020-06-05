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
    if(e.keyCode==97)
    {
        if(!jump)
        {
            forceJump=32;
            jump=true;
        }
    }
}
