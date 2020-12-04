const config = {
  'ball': {
    'radius': 10
  },
  'paddle': {
    'paddleHeight': 10,
    'paddleWidth': 150,
  },
  'brick': {
    'brickRowCount': 5,
    'brickColumnCount': 5,
    'brickWidth': 75,
    'brickHeight': 20,
    'brickPadding': 10,
    'brickTopPadding': 30,
    'brickLeftPadding': 30,
  },
  'messages': {
    'gameOver': 'Game Over. Play Again?',
  },
  'colors': {
    'ball': '#FE9200',
    'paddle': '#0095DD',
    'brick': '#0095DD',
  }
};

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const bricks = [];

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let paddleX = (canvas.width - config.paddle.paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let gameActive = false;

function init() {
  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);

  for (let column = 0; column < config.brick.brickColumnCount; column++) {
    bricks[column] = [];
    for (let row = 0; row < config.brick.brickRowCount; row++) {
      bricks[column][row] = { x: 0, y: 0 };
    }
  }
}

function startGame() {
  gameActive = true;
  init();
  draw();
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, config.ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = config.colors.ball;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - config.paddle.paddleHeight, config.paddle.paddleWidth, config.paddle.paddleHeight);
  ctx.fillStyle = config.colors.paddle;
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < config.brick.brickColumnCount; c++) {
    for (let r = 0; r < config.brick.brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = (r * (config.brick.brickWidth + config.brick.brickPadding)) + config.brick.brickLeftPadding;
        const brickY = (c * (config.brick.brickHeight + config.brick.brickPadding)) + config.brick.brickTopPadding;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, config.brick.brickWidth, config.brick.brickHeight);
        ctx.fillStyle = config.colors.brick;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function displayMessage(message) {
  document.getElementsByClassName('messageBar').item(0).innerHTML = message;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();

  if (x + dx > canvas.width - config.ball.radius || x + dx < config.ball.radius) {
    dx = -dx;
  }
  if (y + dy < config.ball.radius) {
    dy = -dy;
  } else if (y + dy > canvas.height - config.ball.radius) {
    if (x > paddleX && x < paddleX + config.paddle.paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        gameActive = false;
        displayMessage(config.messages.gameOver);
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - config.paddle.paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - config.paddle.paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  if(gameActive) {
    requestAnimationFrame(draw);
  }
}

init();
draw();
