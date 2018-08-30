# Pong Game

A basic pong game using SVGs.

## Setup

**Install dependencies:**

`> npm i`

**Run locally with Webpack Dev Server:**

`> npm start`

**Build for production:**

`> npm run build`

## Keys

**Player 1:**
* a: up
* z: down

**Player 2(currently replaced by AI):**


## AI Player 
AI is based on a frame counter and a random delay that randomizes the reaction time and speed of the paddle to intercept the ball. The lower the counter the faster the intercept time for the paddle to get to the ball. The higher the counter the longer it will take for the paddle to intercept the ball. 

## Future directions 
I will be adding options to switch between a single player game to multiplayer game. I am also thinking about adding options for difficulty or a scaleable difficulty that is based on the player's scores. 
