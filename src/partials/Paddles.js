import { SVG_NS } from '../settings';

export default class Paddle {

  constructor(boardHeight, width, height, x, y, up, down, player, ai, ball) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;
    this.player = player;
    this.keyState = {};
    this.ai = ai; // true or false
    this.ball = ball; // to track ball position
    this.counter = 0 //counter for when AI takes effect

    if(this.ai) {
      this.speed = 50;// how much ai moves on each keypress
    }
 
    // document.addEventListener('keydown', event => {
    //   switch (event.key) {
    //     case up:
    //       this.up();
    //       break;
    //     case down:
    //       this.down();
    //       break;
    //   }

    if(!this.ai){
      document.addEventListener('keydown', event => {
        this.keyState[event.key || event.which] = true;
      }, true);
      document.addEventListener('keyup', event => {
        this.keyState[event.key || event.which] = false;
      }, true);
    } else {
      this.speed = 10; 
    }
    
   

  }// constructor

  up() {
    // get the max number...
    // either 0 or the y position minus speed
    this.y = Math.max( 0, this.y - this.speed );
  }

  down() {
    // get the min number...
    // either the height of the board minus the height of the paddle
    // or the y position plus the speed
    this.y = Math.min( this.boardHeight - this.height, this.y + this.speed );
  }

  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }
  
  render(svg) {

    //player movement 
    if (this.keyState ['a'] && this.player === 'player1') {
      this.up();
    }
    if (this.keyState ['z'] && this.player === 'player1') {
      this.down();
    }
    if (this.keyState ["'"] && this.player === 'player2') {
      this.up();
    }
    if (this.keyState ['/'] && this.player === 'player2') {
      this.down();
    }
// ai ball tracking (needs offset)
    if(this.ai){
      if(this.counter == 4) { //how often the ai can move up or down
        //if the difference of center of the paddle and ball are greater than half the height of the paddle
        if (Math.abs((this.ball.y + this.ball.radius) - (this.y + this.height/2)) > this.height/3) { //how sensitive to whether it needs to go up or down
          if((this.ball.y + this.ball.radius) < (this.y + this.height/2)) {
            this.up();
          } else {
            this.down();
          } 
        }
   
        this.counter = 0; 
      }
      this.counter++
    }

    let rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttributeNS(null, 'fill', 'white');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'x', this.x); // x of the top left corner
    rect.setAttributeNS(null, 'y', this.y); // y of the top left corner
    svg.appendChild(rect);
  }

}