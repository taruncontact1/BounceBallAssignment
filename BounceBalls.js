
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
      this.balls[i].moveAndDraw();
      //this.balls[i].move();
    }
    requestAnimationFrame(this.startAnimation.bind(this));
  }
  //creates and renders ball on click
  addBall(event)
  {
    var x = event.clientX;
    var y = event.clientY;
    var ball = new Ball(this.canvas, x, y,'black', 20, 5, 5);
    ball.randomize();
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
  //ball with random parameters
  randomize(){
    this.velocityX = this.getRandomVelocity();
    this.velocityY = this.getRandomVelocity();
    this.radius = this.getRandomRadius();
    this.color = this.getRandomColor();
  }
  getRandomVelocity(){
    return this.getRandomInteger(-20, 20);
  }
  getRandomRadius(){
    return this.getRandomInteger(5, 20);
  }
  getRandomColor(){
    var colors = ['gold', 'black','red','blue','green']
    var colorIndex = this.getRandomInteger(0,4);
    return colors[colorIndex];
  }
  getRandomInteger(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
  moveAndDraw()
  {
    if(this.isCollidedHorizontally())
      this.updateHorizontalVelocity();
    if(this.isCollidedVertically())
      this.updateVerticalVelocity();

    //update velocity due to friction and gravity
    this.applyFrictionAndGravity();

    this.stopBallIfSlowedEnough();

    this.moveX();
    this.moveY();
    this.draw();
  }
  applyFrictionAndGravity(){
    this.velocityY += 0.2;
    if(this.velocityX > 0) this.velocityX -= 0.01;
    else this.velocityX += 0.01;
  }
  stopBallIfSlowedEnough(){
    if (this.velocityX < .03 && this.velocityX > -0.03) {
      this.velocityX = 0
    }
    if (this.velocityY < 0.03 && this.velocityY > -0.03) {
      this.velocityY = 0
    }
  }
  moveX(){
    this.x += this.velocityX;
    if((this.x + this.radius) > this.canvas.width)
      this.x = this.canvas.width - this.radius;
    if((this.x - this.radius) < 0)
      this.x = this.radius;
  }
  moveY()
  {
    this.y += this.velocityY;
    if((this.y + this.radius) > this.canvas.height)
      this.y = this.canvas.height-this.radius;
    if((this.y - this.radius) <= 0)
      this.y = this.radius;
  }
  isCollidedHorizontally(){
    return ((this.x + this.radius) >= this.canvas.width) || ((this.x - this.radius) <= 0);
  }
  isCollidedVertically(){
    return ((this.y + this.radius) >= this.canvas.height) || ((this.y - this.radius) <= 0);
  }
  updateHorizontalVelocity(){
    //slows due to collision and direction reverses
    this.velocityX = -(0.8) * (this.velocityX);
  }
  updateVerticalVelocity(){
    //slows due to collision and reverses direction
    this.velocityY = -(0.75) * (this.velocityY);
  }
}

function init()
{
  var bouncingBalls = new BouncingBalls('canvas');
}
