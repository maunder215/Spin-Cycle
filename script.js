//preparing canvas
var miss = false;
var canvas = document.getElementById('game');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.requestFullscreen();

//event listeners
window.addEventListener("keypress", flip);

var ctx = canvas.getContext('2d');
ctx2 = canvas.getContext('2d');
ctx3 = canvas.getContext('2d');


tick = 0;

//variables for later
var theta = 0;
var boxVals = new Array();
var isRed = false;
var going = false;
var count = 0;
var speed = 80;
// Store position values of active squares
var pVal = new Array();

function hide(){
  document.getElementById("hideMe").style.display = 'none';
  document.getElementById("btn1").style.display = 'none'; 
  document.getElementById("btn2").style.display = 'none'; 
  document.getElementById("btn3").style.display = 'none'; 
  // canvas.requestFullscreen();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight-100;

  go();
}
//getting random integer to generate path
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//box object (path sections)
function Box(xval = 0, yval = 0, side = 2){ 
  this.xval = xval;
  this.yval = yval;
  this.side = side;
}


function easy(){
  speed = 60;
  //go();
}

function medium(){
  speed = 100;
  //go();
}

function expert(){
  speed = 120;
  //go();
}

function check(){
  var x1 = boxVals[0].xval+20;
  var y1 = boxVals[0].yval+20;
  if(isRed){
    if(Math.abs(rBallX - x1) <= 11.5 || Math.abs(rBallY - y1) <= 11.5 ){
    }else{
      miss = true;
      window.location = "gameOver.html";
    }
  }else{
    if(Math.abs(bBallY - y1) <= 11.5 || Math.abs(bBallX - x1) <= 11.5){
    }else{
      miss = true;
      window.location = "gameOver.html";
    }
  }
}
//generating each box for the path
function boxGen(){
  var rand = getRandomInt(0,3);
  var skip = [];
    // if(boxVals[boxVals.length -1].side == 0){
      if(boxVals[boxVals.length -1].xval - 200 < canvas.width){
        skip.push(0);
      }
    // }
    // if(boxVals[boxVals.length -1].side == 1){
      if(boxVals[boxVals.length -1].yval - 200 > canvas.height){
        skip.push(1);
      }
    // }
    // if(boxVals[boxVals.length -1].side == 2){
      if(boxVals[boxVals.length -1].xval + 200 < canvas.height){
        skip.push(2);
      }
    // }
    // if(boxVals[boxVals.length -1].side == 3){
      if(boxVals[boxVals.length -1].yval + 200 > canvas.width){
        skip.push(3);
      }
    // }
   
  while(Math.abs(boxVals[boxVals.length -1].side - rand) == 2 || skip.includes(rand) ){
    rand = getRandomInt(0,3);
  }
  var temp = new Box();
  if(rand == 0){
    temp.xval = boxVals[boxVals.length-1].xval - 40;
    temp.yval = boxVals[boxVals.length-1].yval;
    temp.side = rand;
  }else if(rand == 1){
    temp.xval = boxVals[boxVals.length-1].xval;
    temp.yval = boxVals[boxVals.length-1].yval - 40;
    temp.side = rand;
  }else if(rand == 2){
    temp.xval = boxVals[boxVals.length-1].xval + 40;
    temp.yval = boxVals[boxVals.length-1].yval;
    temp.side = rand;
  }else{
    temp.xval = boxVals[boxVals.length-1].xval;
    temp.yval = boxVals[boxVals.length-1].yval + 40;
    temp.side = rand;
  }
  boxVals[boxVals.length] = temp;
  
  drawBox(boxVals[boxVals.length-1].xval,boxVals[boxVals.length-1].yval);
}

function centerBall(){
  if(isRed){
    var xi = rBallX;
    var yi = rBallY
    rBallX = boxVals[0].xval + 20;
    rBallY = boxVals[0].yval + 20;
    var dx = rBallX - xi;
    var dy = rBallY - yi;
    bBallX = bBallX + dx;
    bBallY = bBallY + dy;
  } else {
    xi = bBallX;
    yi = bBallY
    bBallX = boxVals[0].xval +20;
    bBallY = boxVals[0].yval+20;
    dx = bBallX - xi;
    dy = bBallY - yi;
    rBallX = rBallX + dx;
    rBallY = rBallY + dy;
  }
}

//this is done when the game is started (click me button is pressed)
function go(){
    x=window.innerWidth / 2;
    y=window.innerHeight / 2;
    drawBox(x - 20, y - 20);
    var startBox = new Box();
    startBox.xval = x + 20;
    startBox.yval = y - 20;
    boxVals[0] = startBox;
    drawBox(startBox.xval, startBox.yval);
    for(var i = 0; i < 40; i++){
      boxGen();
    }
    setInterval(update,1000/speed);
  }

//draws the circles together
function draw(x=window.innerWidth / 2,      y=window.innerHeight / 2){
  drawCircle(x, y, x - 40, y);
  }

//draws the circles individually
function drawCircle(rBallX, rBallY, bBallX, bBallY){
  this.rBallX = rBallX;
  this.rBallY = rBallY;
  this.bBallX = bBallX;
  this.bBallY = bBallY;
  var r = 10;
  ctx.fillStyle = 'red';
  this.ctx.beginPath();
  this.ctx.arc(rBallX, rBallY, r, 0, 2 * Math.PI, false);
  this.ctx.lineWidth = 2;
  this.ctx.fill();

  this.ctx2.fillStyle = 'blue';
  this.ctx2.beginPath();
  this.ctx2.arc(bBallX, bBallY, r, 0, 2 * Math.PI, false);
  this.ctx2.lineWidth = 2;
  this.ctx2.fill();
  //requestAnimationFrame(drawCircle);
}

//draws the boxes
function drawBox(x, y){
  this.ctx.fillStyle = 'pink';
  this.ctx.beginPath();
  this.ctx.fillRect(x,y,40,40)
  this.ctx.stroke();
  this.ctx.rect(x,y,40,40);
  this.ctx.stroke();
  //requestAnimationFrame(drawBox);
}
  

//actions when clicked
function flip(){
  if(tick > 0){
    check(); 
  }
  tick++;
  centerBall();
  
  if(isRed){
    isRed = false;
  }else{
    isRed = true;
  }
  count = count + 1;
  boxVals.shift();
  boxGen();
  theta = theta + Math.PI;
}

//rotate red around blue circle
function rotateRed(){
  //requestAnimationFrame(rotateRed);
  if(!miss){
    r = 10; 
    if(theta>=0 && theta<Math.PI/2){
      rBallX = bBallX - r*4*Math.cos(theta);
      rBallY = bBallY + r*4*Math.sin(theta);
    }else if (theta>=Math.PI/2 && theta<Math.PI){
      rBallX = bBallX - 4*r*Math.cos(theta);
      rBallY = bBallY + r*4*Math.sin(theta);
    } else if (theta>=Math.PI && theta<Math.PI*3/2){
      rBallX = bBallX - r*4*Math.cos(theta);
      rBallY = bBallY + r*4*Math.sin(theta);
    } else {
      rBallX = bBallX - r*4*Math.cos(theta);
      rBallY = bBallY + r*4*Math.sin(theta);
    }
    drawCircle( rBallX, rBallY, bBallX, bBallY);
    }else{
      
    }
}

//rotate blue circle around red
function rotateBlue(){
  //requestAnimationFrame(rotateBlue);
  if(!miss){
    r = 10;
    if(theta>=0 && theta<Math.PI/2){
      bBallX = rBallX - r*4*Math.cos(theta);
      bBallY = rBallY + r*4*Math.sin(theta);
    }else if (theta>=Math.PI/2 && theta<Math.PI){
      bBallX = rBallX - 4*r*Math.cos(theta);
      bBallY = rBallY + r*4*Math.sin(theta);
    } else if (theta>=Math.PI && theta<Math.PI*3/2){
      bBallX = rBallX - r*4*Math.cos(theta);
      bBallY = rBallY + r*4*Math.sin(theta);
    } else {
      bBallX = rBallX - r*4*Math.cos(theta);
      bBallY = rBallY + r*4*Math.sin(theta);
    }
    drawCircle(rBallX,rBallY, bBallX, bBallY);
  }else{
    
  }
}

//redraws boxes after each update
function redrawBoxes(){
  for(var i = boxVals.length-1; i>=0; i--){
    if(i == 0){
    this.ctx.fillStyle = 'yellow';
    this.ctx.beginPath();
    this.ctx.fillRect(boxVals[i].xval, boxVals[i].yval,40,40)
    this.ctx.stroke();
    this.ctx.rect(boxVals[i].xval, boxVals[i].yval,40,40);
    this.ctx.stroke();
    //requestAnimationFrame(redrawBoxes);
    }else{
    drawBox(boxVals[i].xval, boxVals[i].yval);
    }
  }
}

//update... moves boxes circle etc
function update(){
  var r = 10;
    theta = theta + 0.1
  
    ctx.fillStyle= "rgb(35,35,35)";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    redrawBoxes();
    //drawCircle(boxVals[0].xval, boxVals[0].yval, boxVals[0.xval, boxVals[0].yval);

  var r = 5;
  this.ctx.fillStyle = 'red';
  this.ctx.beginPath();
  //this.ctx.arc(boxVals[0].xval, boxVals[0].yval, r, 0, 2 * Math.PI, false);
  this.ctx.lineWidth = 2;
  this.ctx.fill()  
  // document.getElementById("count").innerHTML = count;

  ctx3.fillStyle = "black";
  ctx3.font = "50px Arial";
  ctx3.lineWidth = 2;
  ctx3.strokeStyle="#FF0000";
  ctx3.strokeRect(0, 0, canvas.width, canvas.height);

    if(this.isRed){
      rotateRed();
    }
    else{
      rotateBlue();
    }
    //requestAnimationFrame(update);
  }