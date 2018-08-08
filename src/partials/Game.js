import Board from './Board';
import Paddle from './Paddles';
import Ball from './Ball'
import Score from './Score'; 
import Winner from './Winner';
import { SVG_NS, KEYS } from '../settings';

export default class Game {

    constructor(element, width, height) {
        this.element = element;
        this.width = width;
    this.height = height;
    
    this.gameElement = document.getElementById(this.element);
    
    this.board = new Board(this.width, this.height);
    this.ball = new Ball(8, this.width, this.height);

    this.paddleWidth = 8;
    this.paddleHeight = 60;
    this.boardGap = 10;

    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      ((this.height - this.paddleHeight) / 2),
            KEYS.a,
            KEYS.z,
            'player1',
            false,
            this.ball
    );

    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      (this.width - this.boardGap - this.paddleWidth),
      ((this.height - this.paddleHeight) / 2),
      KEYS.up,
      KEYS.down,
      'player2',
      true,
      this.ball
        );
    // this.player2ai = new Paddle(
    //     this.height,
    //     this.paddleWidth,
    //     this.paddleHeight,
    //     this.ai,
    //     (this.width - this.boardGap - this.paddleWidth),
    //   ((this.height - this.paddleHeight) / 2),
    //   'player2ai'
    // );
		
		this.score1 = new Score(this.width / 2 - 50, 30, 30);
		this.score2 = new Score(this.width / 2 + 25, 30, 30); 


    document.addEventListener('keydown', event => {
            switch (event.key) {
                case KEYS.spaceBar:
                    this.pause = !this.pause;
                    break;
            }
        });
        this.winner = new Winner(
            this.width,
            this.height
        );

    }// constructor
   
   reset(player) {
       this.pause = true;
       alert('you win');
       setTimeout(function(){
        location.reload();
       },2000);
   }


    render() {

    // pause the game
        // ...slightly broken because it still listens for the paddles' keydown
        if (this.pause) {
            return;
        }
    
    // be sure to empty out the last frame before re-rendering
    this.gameElement.innerHTML = '';
    
    let svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'width', this.width);
    svg.setAttributeNS(null, 'height', this.height);
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);

    this.board.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);

    this.ball.render(svg, this.player1, this.player2);
	this.score1.render(svg, this.player1.score); 
    this.score2.render(svg, this.player2.score);

    if (this.player1.score === 3) {
        this.winner.render(svg, this.player1.player);
        this.reset();
        
    } else if (this.player2.score === 3) {
        this.winner.render(svg, this.player2.player);
        
        this.reset();
        
    }
    
    }

}