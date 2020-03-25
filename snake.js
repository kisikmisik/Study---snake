//finding the canvas and assigning some variables to its height and width
let canvas = document.getElementById("snake");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let unit = 20;
let widthInUnits = width / unit;
let heightInUnits = height / unit;

//creating score
let score = 0;

//draw the canvas
let drawBorders = function () {
    
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, width, unit);
    ctx.fillRect(0, 0, unit, height);
    ctx.fillRect(width - unit, 0, unit, height);
    ctx.fillRect(0, height - unit, width, unit);
};

let drawBackground = function () {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
};

// draw the score of the game top left
let drawScore = function () {
    ctx.font = "25px Courier";
    ctx.baseLine = "top";
    ctx.textAligh = "left";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, unit, unit * 2);
};

// constructor, that can create a point that locates at some of the block in canvas
let Block = function (col, row) {
    this.col = col,
    this.row = row
};

// draw square at the location of block's constructor
Block.prototype.drawSquare = function (color) {
    ctx.fillStyle = color;
    ctx.fillRect(this.col * unit, this.row * unit, unit, unit);
};

// draw circle at the location of block's constructor
let circle = function (x, y, radius, isFilled) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    if (isFilled) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};
Block.prototype.drawCircle = function (color) {
    ctx.fillStyle = color;
    circle(this.col * unit + unit / 2, this.row * unit + unit / 2, unit / 2, true);
};

// apple constructor - position randomizer
let Apple = function () {
    this.x = 15;
    this.y = 20;
};

Apple.prototype.draw = function () {
    let block = new Block(this.x, this.y);
    block.drawCircle("green");
}

// set new apple point and draw a circle at the place
Apple.prototype.move = function () {
    this.x = Math.floor(Math.random() * (width / 20 - 4) + 2);
    this.y = Math.floor(Math.random() * (height / 20 - 4) + 2);
    for (let i = 0; i < snake.segments.length; i++) {
        if (snake.segments[i].col === this.x && snake.segments[i].row === this.y) {
            this.x = Math.floor(Math.random() * (width / 20 - 4) + 2);
            this.y = Math.floor(Math.random() * (height / 20 - 4) + 2);
        }
    }
};

// the snake constructor, includes snake segments and direction of moving
let Snake = function () {
    this.segments = [
        new Block(10, 10),
        new Block(9, 10),
        new Block(8, 10)
    ];
    this.direction = "right";
};
 
// create the new segment at the array's start (according to the current direction and delete the last
// segment if snake doesn't eat the apple, checking collision with wall, apple, and snake itself)
Snake.prototype.move = function () {
    let head = this.segments[0];

//add one block before snake segments array, according to the direction
    if (this.direction === "right") {
        this.segments.unshift(new Block(head.col + 1, head.row));
    };
    if (this.direction === "left") {
        this.segments.unshift(new Block(head.col - 1, head.row));
    };
    if (this.direction === "up") {
        this.segments.unshift(new Block(head.col, head.row - 1));
    };
    if (this.direction === "down") {
        this.segments.unshift(new Block(head.col, head.row + 1));
    };

// case when snake eats apple
    if (head.col === apple.x && head.row === apple.y) {
        apple.move();
        score++;
        animationTime -= animationShift;
    } else {
        this.segments.pop();
    }

// wall collision check
    let leftCollision = head.col < 1;
    let rightCollision = head.col > width / 20 - 2;
    let topCollision = head.row < 1;
    let bottomCollision = head.row > height / 20 - 2;
    if (leftCollision || rightCollision || topCollision || bottomCollision) {
        gameOver();
    }

// checks self-collision
    for(let i = 2; i < this.segments.length; i++) {
        if (head.col === this.segments[i].col && head.row === this.segments[i].row) {
            gameOver();
        }
    } 
};

// function gets the direction from the event listener and checks, if it's not opposite to current
Snake.prototype.checkDirection = function (newDirection) {
    if (this.direction === "right" && newDirection === "left") {
        return;
    } else if (this.direction === "left" && newDirection === "right") {
        return;
    } else if (this.direction === "up" && newDirection === "down") {
        return;
    } else if (this.direction === "down" && newDirection === "up") {
        return;
    } else {
        this.direction = newDirection;
    }
};

// set game over text and stop the animation
let gameOver = function () {
    playing = false;
    ctx.font = "50px Arial";
    ctx.baseLine = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("Game Over", width / 2, height / 2);
}

// keydown events handler, that changes the direction of snake
let directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};
document.addEventListener("keydown", function (evt) {
    let newDirection = directions[evt.keyCode];
    if (newDirection !== undefined) {
        snake.checkDirection(newDirection);
    }
});

// draw snake segments
Snake.prototype.draw = function () {
    this.segments[0].drawSquare("green");
    for (let i = 1; i < this.segments.length; i++) {
         this.segments[i].drawSquare("yellow");
    }
}

// checks if speed is not out of limit
let easyButton = false;
let mediumButton = true;
let hardButton = false;

let speedCheck = function () {
    if (easyButton) {
        animationShift = 2;
        animationTime = 120;
        if (animationTime <= 60) {
            animationTime = 60;
        }
    } else if (mediumButton) {
        animationShift = 4;
        animationTime = 100;
        if (animationTime <= 40) {
            animationTime = 40;
        }
    } else if (hardButton) {
        animationShift = 7;
        animationTime = 70;
        if (animationTime <= 30) {
            animationTime = 30;
        }
    }
};

// final game animation, included all main functions, using setTimeout
let apple = new Apple();
let snake = new Snake(); 
let animationTime = 100;
let animationShift = 4;

let playing = true;

let gameProcess = function () {
    ctx.clearRect(0, 0, width, height);
    drawBackground();
    drawScore();
    snake.move();
    apple.draw();
    snake.draw();
    drawBorders();
    if (playing) {
        setTimeout(gameProcess, animationTime);
    } else {
        return;
    }  
};





