// get access to the canvas, specfically the "context"
let canvas = document.getElementById('myCanvas');
// Context is what is going on on the Canvus.
let ctx = canvas.getContext("2d");
// setting our x & y direction
let dx = 1;
let dy = 1;
// setting our starting x & y coordinates of the sprite
let x = canvas.width/8;
let y = canvas.height/8;
let spriteWidth = 40;
let spriteHeight = 40;
// define a char
let charHeight = 10;
let charWidth = 10;
let charX = canvas.width/2;
let charY = canvas.height/2;
// declare that buttons ARENT being pressed yet
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

// add event listeners which look for key presses
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// define functions to handle key up & down
function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    } else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    } else if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = true;
    } else if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = true;
    }
}

function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    } else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    } else if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = false;
    } else if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = false;
    }
}

// create our character
function drawChar(){
    ctx.beginPath();
    ctx.rect(charX, charY, charHeight, charWidth);
    ctx.fillStyle = '#88D7FF';
    ctx.fill();
    ctx.closePath();
}

// create a draw sprite function
function drawSprite(){
    // draw the square 
    ctx.beginPath();
    // give the square its dimensions, starting x & y, starting width & height
    ctx.rect(x, y, spriteWidth, spriteHeight);
    // fill the square with color
    ctx.fillStyle = `#${Math.ceil((Math.random()*1000000))}`;
    ctx.fill();
    // finish giving square its attributes
    ctx.closePath();

    // logic for hitting the walls
        // if the next coordinate of the square is the same as the side wall
        // change x direction
    if(x + dx > canvas.width - spriteWidth || x + dx < 0){
        dx = -dx;
        // if the next coordinate of the square is the same as the side wall
        // change x direction
    } else if(y + dy > canvas.height - spriteHeight || y + dy < 0){
        // if the next coordinate of the square is the same as the side wall
        // change y direction
        dy = -dy;
    } 
    
    // change the sprite's location by dy and dx (could be positive or negative)
    x += dx;
    y += dy;

}
// create a function which will run every frame of the game, this is where we will call other functions 
function drawAll(){
    // Since stuff on the cavas is changing, we need to clear the canvus and re-draw the canvas every frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // re-draw our character & sprites
    drawChar();
    drawSprite();
    // check for impact
    impact();
    // if we press an arrow key and the char is within the canvas dimensions, move apropriately
    if(rightPressed && (charX < canvas.width - charWidth)){
        charX += 10;
    } else if (leftPressed && (charX > 0)){
        charX -= 10;
    } else if (upPressed && (charY > 0)){
        charY -= 10;
    } else if (downPressed && (charY < canvas.height - charHeight)){
        charY += 10;
    }    
}

// check if our char has the same location as the sprite
function impact(){
    // if our character shares coordinates with the sprite (not a perfect solution, needs to be fine-tuned)
    if((charX + charWidth) >= x && (charX <= x + spriteWidth) && (charY + charHeight) >= y && (charY + charHeight <= y + spriteHeight)){
        // change the background color to show impact
        canvas.style.backgroundColor = `#${Math.ceil((Math.random()*1000000))}`
    }
}

// calling a JavaScript library function which recalls another function every number of ms
setInterval(drawAll, 100);