const config = {
  'ball': {
    'radius': 10
  },
  'colors': {
    'ball': '#FE9200'
  }
};

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, config.ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = config.colors.ball;
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();

  if(x + dx > canvas.width || x + dx < 0) {
    dx = -dx;
  }

  if(y + dy > canvas.height || y + dy < 0) {
    dy = -dy;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
