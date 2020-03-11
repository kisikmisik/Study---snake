// Обьявление канваса,
// Отрисовка границ поля для игры,
// Отрисовка очков,
// Разделение канваса на клетки по 10 пикселей, 
// Отрисовка яблока в рандомном месте канваса, Math.floor(Math.random() * (xCells - 3) + 2)
// Отрисовка змейки, анимирование, управление,

// Цикл( 
//     Добавление очка при сьедании яблока,
//     увеличение змейки на клетку,
//     движение змейки,
//     Проверка на коллизию с границами поля и собой, отрисовка Game over;
// )

// Опционально: добавление в начале возможности выбрать сложность.

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;
var cellSize = 10;
var score = 0;
var xCells = width / cellSize;
var yCells = height / cellSize;

var drawBorders = function () {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, width, cellSize);
    ctx.fillRect(0, height - cellSize, width, cellSize);
    ctx.fillStyle = "darkGray";
    ctx.fillRect(0, cellSize, cellSize, height);
    ctx.fillRect(width - cellSize, cellSize, cellSize, height);
};

var drawScore = function () {
    ctx.font = "20px Courier";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + score, cellSize * 2, cellSize * 2)
}

var circle = function (x, y, radius, isFilled) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, isFilled)
    if (isFilled === true) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
}

var Apple = function () {
    this.x = 30;
    this.y = 15;
    this.color = "green";
}

Apple.prototype.draw = function () {
    ctx.fillStyle = this.color;
    circle(this.x * cellSize, this.y * cellSize, cellSize / 2, true);
}

var Snake = function () {
    this.x = xCells / 2;
    this.y = yCells / 2;
    this.xSpeed = 1;
    this.ySpeed = 0;
}

Snake.prototype.draw = function () {
    ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
}

Snake.prototype.move = function () {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
}

var snake = new Snake();
var apple = new Apple();

var gameProcess = setInterval(function () {
    ctx.clearRect(cellSize, cellSize, width - cellSize * 2, height - cellSize * 2);
    drawBorders();
    drawScore();
    
    snake.draw();
    snake.move();
    apple.draw();
    
}, 100)



