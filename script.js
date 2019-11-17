// global vaiables here
let num_lives = 10; // number of lives
let level = 1; // current player level
let level_up = true; // check if we can level up
let score = 0; // current score
let circleArr = []; // array of circles

let background = new Image();
background.src = "img/candies.jpg";

let game_window = document.getElementById("window");
let window_context = game_window.getContext("2d");

// player starting coordinates
let px = 50;
let py = 300;

// game circle coordinates
let x = game_window.width;
let y = Math.round(Math.random() * 500);

// other misc information about circle creation
let radius = 15;
let bspeed;

class Circle {
  constructor(x, y, r, type) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.type = type;
    this.speed = Math.floor(Math.random() * 10) + 1;
  }

  // function create the circle
  create_circle() {
    // draw the circle
    window_context.beginPath();
    window_context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    if (this.type === 1) { // harm type circle
      window_context.fillStyle = "black";
    }
    else { // score type circle
      window_context.fillStyle = "#ed0c8f";
    }

    window_context.closePath();
    window_context.fill();
  }

  // function to move the cirlces in the x-axis
  move() {
    this.x = this.x - this.speed; // subtract position using speed
    // check condition for edge handling
    if (this.x < radius) {
      this.x = game_window.width
      this.y = Math.round(Math.random() * 500); // place on random y-axis pos
      speed_diff();
      this.speed = bspeed;
    }

    let x1 = this.x - px;
    let y1 = this.y - py;
    let d1 = Math.sqrt((x1 * x1) + (y1 * y1));
    if (d1 < radius * 2) {
      this.x = game_window.width;
      this.y = Math.round(Math.random() * 500); // place on random y-axis pos
      speed_diff();
      this.speed = bspeed;

      if (this.type === 1) { // subtract player life
        num_lives -= 1;
      }
      else if (this.type === 2) { // add to player score
        level_up = true;
        score += 1;
      }
    }
  }

  // function to vary the speed of the circle
  vary_speed() {
    this.speed = Math.round(Math.random() * 50);
  }
}


for (var i=0; i < 5; i++) {
    let harm = new Circle(x,Math.round(Math.random() * 500),radius, 1);
    circleArr.push(harm);
}
// now 2 benefit objects
for (var i=0; i <2; i++) {
    let bene = new Circle(x,Math.round(Math.random() * 500),radius, 2);
    circleArr.push(bene);
}

// function to draw the player circle
function player_circle() {
  window_context.beginPath();
  window_context.arc(px, py, radius, 0, Math.PI * 2);
  window_context.fillStyle = "#0eede9";
  window_context.closePath();
  window_context.fill();
}

// function to draw number of player lives
function player_lives() {
  window_context.font = "20px Arial";
  window_context.fillStyle = "#de09da";
  window_context.fillText("Lives: " + num_lives, 100, 600);
}

// function to draw current player score
function player_score() {
  window_context.font = "20px Arial";
  window_context.fillStyle = "#de09da";
  window_context.fillText("Score: " + score, 800, 600);
}

// function to draw current player level
function player_level() {
  window_context.font = "20px Arial";
  window_context.fillStyle = "#de09da";
  increase_player_level();
  window_context.fillText("Level: " + level, 800, 50);
}

// function to draw game over message
function game_over() {
  window_context.font = "100px Arial";
  window_context.fillStyle = "#f0072a";
  window_context.fillText("Game Over", 500, 250);
}

function draw() {
  window_context.clearRect(0, 0, game_window.width, game_window.height);
  window_context.drawImage(background, 0, 0);

  for (var i = 0; i < circleArr.length; i++) {
      circleArr[i].create_circle();
      circleArr[i].move();
  }

  player_circle(); // move the player circle
  player_level();
  player_score();
  player_lives();

  if (num_lives === 0) {
    game_over();
    return;
  }

  window.requestAnimationFrame(draw);
}

// event listener for player circle movement using the arrow keys
window.addEventListener("keydown", key_move, false);

// function to move the player cirlce using the arrow keys
function key_move(e) {
  switch(e.keyCode) {
    case 38: // arrow up button
      py -= 30;
      if (py < radius) {
          py = radius
      }
      break;
    case 40: // arrow up button
      py += 30;
      if (py > game_window.height - radius) {
          py = game_window.height - radius
      }
      break;
  }
  e.preventDefault();
}

// function to increase the level based on player score
function increase_player_level() {
  if (score != 0 && score % 5 === 0 && level_up === true) {
    level += 1;
    level_up = false;
  }
}

// function to increase circle speed
function speed_diff() {
  if (level === 1) {
    bspeed = Math.floor(Math.random() * 10) + 1;
  }
  else if (level === 2) {
    bspeed = Math.floor(Math.random() * 25) + 1;
  }
  else {
    bspeed = 50;
  }
}

window.requestAnimationFrame(draw);
