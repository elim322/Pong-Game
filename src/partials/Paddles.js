import { SVG_NS } from '../settings';

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;

    document.addEventListener("keydown", event => {
      switch (event.key) {
        case up:
          this.up();
          break;
        case down:
          this.down();
          break;
      }
    });
  } //end of constructor

  up(){
    this.y = this.y - this.speed;
    Math.max = this.y - this.height;
    Math.min = this.y - this.height; 
  }

  down(){
    this.y = this.y + this.speed;
    Math.max = this.y + this.height;
    Math.min = this.y + this.height; 
  }

  render(svg) {
    let rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttributeNS(null, "width", this.width);
    rect.setAttributeNS(null, "height", this.height);
    rect.setAttributeNS(null, 'fill', 'white');
    rect.setAttributeNS(null, "x", this.x); // x of the top left corner
    rect.setAttributeNS(null, "y", this.y);// y of the top left corner

    svg.appendChild(rect); 
  }
}