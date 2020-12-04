const config = {
  'ball': {
    'radius': 10
  },
  'colors': {
    'ball': 'orange'
  }
};


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, config.ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = config.colors.ball;
  ctx.fill();
  ctx.closePath();
}

drawBall();