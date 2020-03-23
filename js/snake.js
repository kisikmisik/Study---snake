let canvas = document.getElementById("snake");
let ctx = canvas.getContext("2d");

// Assign height and width of the canvas to a variables
let width = canvas.width;
let height = canvas.height;

// Size of one block and the whole count of blocks by x and y
let blockSize = 20;
let widthInBlocks = width / blockSize;
let heightInBlocks = height / blockSize;

// Game score to 0
let score = 0;

// Draw the game field and the borders
let drawCanvas = function () {
    ctx.fillStyle = "Black";
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = "Red";
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
};

// Draw the score
let drawScore = function () {
    ctx.font = "20px Courier";
    ctx.fillStyle = "White";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + score, blockSize, blockSize);
};

// Function, that delete setInterval and prints game over
let gameOver = function () {
    playing = false;
    ctx.font = "60px Courier";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", width / 2, height / 2);
};

// Draw a circle 
let circle = function (x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};

// Block constructor
let Block = function (col, row) {
    this.col = col;
    this.row = row;
};

// Draw a block at the block's location
Block.prototype.drawSquare = function (color) {
    let x = this.col * blockSize;
    let y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
};
    
// Draw a circle at the block's location
Block.prototype.drawCircle = function (color) {
    let centerX = this.col * blockSize + blockSize / 2;
    let centerY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(centerX, centerY, blockSize / 2, true);
};
// Check if the one block is in the same location as the another 
Block.prototype.equal = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
};

// The Snake constructor
let Snake = function () {
    this.segments = [
        new Block(7, 5),
        new Block(6, 5),
        new Block(5, 5)
    ];
    this.direction = "right";
    this.nextDirection = "right";
};

// Draw a a block at the location of each element in snake segments array
Snake.prototype.draw = function () {
    for (let i = 0; i < this.segments.length; i++) {
        if (i === 0) {
            this.segments[i].drawSquare("green");
        } else if (i % 2 === 0){
            this.segments[i].drawSquare("blue");
        } else {
            this.segments[i].drawSquare("yellow");
        }
    }
};

// Create a new head and add it to the beginning of the snake to move the snake,
Snake.prototype.move = function () {
    let head = this.segments[0];
    let newHead;
    this.direction = this.nextDirection;
    if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
    }
    if (this.checkCollision(newHead)) {
        gameOver();
        return;
    }
    this.segments.unshift(newHead);
    if (newHead.equal(apple.position)) {
        score++;
        apple.move();
        animationTime -= 5;
    } else {
        this.segments.pop();
    }
};

// Check if the snake's new head has collided with the wall or itself
Snake.prototype.checkCollision = function (head) {
    let leftCollision = (head.col === 0);
    let topCollision = (head.row === 0);
    let rightCollision = (head.col === widthInBlocks - 1);
    let bottomCollision = (head.row === heightInBlocks - 1);
    let wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;
    let selfCollision = false;
    for (let i = 0; i < this.segments.length; i++) {
        if (head.equal(this.segments[i])) {
            selfCollision = true;
        }
    }
    return wallCollision || selfCollision;
};

// Set the next direction of the snake according to the keyword presses
Snake.prototype.setDirection = function (newDirection) {
    if (this.direction === "up" && newDirection === "down") {
        return;
    } else if (this.direction === "right" && newDirection === "left") {
        return;
    } else if (this.direction === "down" && newDirection === "up") {
        return;
    } else if (this.direction === "left" && newDirection === "right") {
        return;
    }
    this.nextDirection = newDirection;
};

// Apple constructor
let Apple = function () {
    this.position = new Block(10, 10);
};

// Draw a circle at the apple's location
Apple.prototype.draw = function () {
    this.position.drawCircle("LimeGreen");
};

// create an apple in a new random location
Apple.prototype.move = function () {
    let randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
    let randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1
    this.position = new Block(randomCol, randomRow);
};

// Create the snake and the apple objects
let snake = new Snake();
let apple = new Apple();



// run the game using setTimeout
var playing = true;
let animationTime = 100;

let gameLoop = function () {
    ctx.clearRect(0, 0, width, height);
    drawCanvas();
    drawScore();
    snake.move();
    snake.draw();
    apple.draw();
    if (playing === true) {
        setTimeout(gameLoop, animationTime);
    }
};
gameLoop();

// keycods to directions
let directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};
// keydown listener, which determines the next direction of the snake
$("body").keydown(function (event) {
    let newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
});