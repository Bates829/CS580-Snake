// game.js

import Snake from './snake';

/** @class Game
  * Represents a snake game
  */
export default class Game {
  constructor() {
    this.snake = new Snake(50, 50, 3);
    this.food = [];
    this.over = false;
    this.input = {
      direction: 'right'
    }
    // Create the back buffer canvas
    this.backBufferCanvas = document.createElement('canvas');
    this.backBufferCanvas.width = 100;
    this.backBufferCanvas.height = 100;
    document.body.appendChild(this.backBufferCanvas);
    this.backBufferContext = this.backBufferCanvas.getContext('2d');
    // Create screen buffer canvas
    this.screenBufferCanvas = document.createElement('canvas');
    this.screenBufferCanvas.width = 100;
    this.screenBufferCanvas.height = 100;
    document.body.appendChild(this.screenBufferCanvas);
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');
    //Create HTML UI Elements
    var message = document.createElement('div');
    div.id = 'message';
    message.textContent = '';
    document.body.appendChild(message);
    // Bind methods
    this.render = this.render.bind(this);
    this.update = this.update.bind(this);
    this.loop = this.loop.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.gameOver = this.gameOver.bind(this);
    //Set up event handlers
    window.onkeydown = this.handleKeyDown;
    // Set an interval for loop
    this.interval = setInterval(this.loop, 500);
  }

  gameOver(){
    var message = document.getElementById("message");
    message.textContent = "Game Over";
    this.over = true;
  }

  handleKeyDown(event){
    event.preventDefault();
    switch(event.key){
      case 'w':
      case 'ArrowUp':
        this.input.direction = 'up';
        break;
      case 'a':
      case 'ArrowLeft':
        this.input.direction = 'left';
        break;
      case 's':
      case 'ArrowDown':
        this.input.direction = 'down';
        break;
      case 'd':
      case 'ArrowRight':
        this.input.direction = 'right';
        break;
    }
  }

  update() {
    if(!this.over){
      var position = this.snake.getPosition();
      if(position.x < 0 && position.x >= 100
      || position.y < 0 && position.y >= 100){
        return this.gameOver();
      }

      this.food.push(new Food((Math.floor(Math.random() * 100)), (Math.floor(Math.random() * 100)))

      this.food.forEach((food) => {
        food.update();
      });
      this.over = this.snake.update(this.input);
    }
  }
  render() {
    this.backBufferContext.fillStyle = "#ccc";
    this.backBufferContext.fillRect(0, 0, 100, 100);
    this.food.forEach((food) => {
      this.food.render(this.backBufferContext);
    });
    this.snake.render(this.backBufferContext);
    this.screenBufferContext.drawImage(this.backBufferCanvas, 0, 0);
    if(this.over){
      this.fillStyle = '#fff';
      this.screenBufferContext.font = "5px sans-serif";
      this.screenBufferContext.filltext("Game Over", 20, 50);
    }
}

  loop(){
    this.update();
    this.render();
  }
