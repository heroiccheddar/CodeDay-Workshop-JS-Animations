const config = {
  'ball': {
    'radius': 10
  },
  'paddle': {
    'paddleHeight': 10,
    'paddleWidth': 150,
    'rightSpeed': 7,
    'leftSpeed': 7
  },
  'messages': {
    'gameOver': 'Game Over. Play Again?'
  },
  'colors': {
    'ball': '#FE9200',
    'paddle': '#0095DD'
  }
};

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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

  x = canvas.width / 2;
  y = canvas.height - 30;
  dx = 2;
  dy = -2;
  paddleX = (canvas.width - config.paddle.paddleWidth) / 2;
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

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      gameActive = false;
      displayMessage(config.messages.gameOver);
    }
  }

  if (rightPressed && paddleX < canvas.width - config.paddle.paddleWidth) {
    paddleX += config.paddle.rightSpeed;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= config.paddle.leftSpeed;
  }

  x += dx;
  y += dy;
  if(gameActive) {
    requestAnimationFrame(draw);
  }
}

function startGame() {
  gameActive = true;
  displayMessage(null);
  init();
  draw();
}

function displayMessage(message) {
  document.getElementsByClassName('messageBar').item(0).innerHTML = message;
}

init();
draw();
