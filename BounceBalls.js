
class BouncingBalls{
  // initialize the canvas and adds an event listener on mouse click
  constructor(canvasId)
  {
    this.canvas = document.getElementById(canvasId);
    this.canvasContext = this.canvas.getContext('2d');
    this.canvas.addEventListener("click", this.addBall.bind(this), false);
  }

  //creates and renders ball on click
  addBall(event)
  {
    var x = event.clientX;
    var y = event.clientY;
    var ball = new Ball(this.canvas, x, y,'black', 20);
    ball.draw();
  }
}

class Ball
{
  constructor(canvas, x, y, color, radius)
  {
    this.canvas = canvas;
    this.color = color;
    this.radius = radius;
    this.x = x;
    this.y = y;
  }
  //renders ball on screen
  draw()
  {
    var context = this.canvas.getContext('2d');
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    context.fill();
  }
}

function init()
{
  var bouncingBalls = new BouncingBalls('canvas');
}
