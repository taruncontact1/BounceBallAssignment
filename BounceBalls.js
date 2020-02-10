
class BouncingBalls{
  // initialize the canvas and adds an event listener on mouse click
  constructor(canvasId)
  {
    this.balls = [];
    this.canvas = document.getElementById(canvasId);
    this.canvasContext = this.canvas.getContext('2d');
    this.canvas.addEventListener("click", this.addBall.bind(this), false);
    this.startAnimation();
  }
  //clears the canvas and renders the balls at new updated location
  startAnimation()
  {
    //clears the canvas
    this.canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    //draw ball and update ball's location
    for(var i = 0; i < this.balls.length; i++)
    {
      this.balls[i].draw();
      this.balls[i].move();
    }
    requestAnimationFrame(this.startAnimation.bind(this));
  }
  //creates and renders ball on click
  addBall(event)
  {
    var x = event.clientX;
    var y = event.clientY;
    var ball = new Ball(this.canvas, x, y,'black', 20, 5, 5);
    this.balls.push(ball);
  }
}

class Ball
{
  constructor(canvas, x, y, color, radius, velocityX, velocityY)
  {
    this.velocityX = velocityX;
    this.velocityY = velocityY;
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
  // updates ball coordinate based on velocity
  move()
  {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
}

function init()
{
  var bouncingBalls = new BouncingBalls('canvas');
}
