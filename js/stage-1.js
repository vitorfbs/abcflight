var canvas = document.getElementById('game-screen');
var ctx = canvas.getContext('2d');

soundtrack_playing = false;

var score = 0;
var goal = 100;

var frame_to_second_count = 0;
var timer = 120;

var current_letter_objective = "A";

var next_spawn_letter = "A";

var x_player = 360;
var y_player = 300;

var height_letter = 30;
var width_letter = 30;

var x_letter_a = 150;
var y_letter_a = 180;

var x_letter_b = 380;
var y_letter_b = 180;

var x_letter_c = 600;
var y_letter_c = 180;

var height_player = 60;
var width_player = 60;
var speed_player = 1;

var sprite_player = new Image();
sprite_player.src = './assets/plane.png';

var sprite_letter_a = new Image();
sprite_letter_a.src = './assets/a.png';

var sprite_letter_b = new Image();
sprite_letter_b.src = './assets/b.png';

var sprite_letter_c = new Image();
sprite_letter_c.src = './assets/c.png';

soundtrack = new sound("./assets/stage-1.mp3");


requestAnimationFrame(gameloop);

function gameloop() {
    
    window.onkeydown = movePlayer;
    window.onkeyup = stopPlayer;

    spawnPlayer(x_player,y_player);


    spawnLetterA(x_letter_a, y_letter_a);
    spawnLetterB(x_letter_b, y_letter_b);
    spawnLetterC(x_letter_c, y_letter_c);

    collisionCheck();

    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.font='bold 12px Arial';
    ctx.fillText("Score: " + score, 10, 380); 
    ctx.fillText("Goal: " + goal, 80, 380); 
    ctx.fillText("Time left: " + Math. floor(timer / 60) + ":" + timer%60, 150, 380); 
    ctx.fillText("Current Letter: " + current_letter_objective, 250, 380);

    y_player += 0.15;
    if(frame_to_second_count >= 59) {
        timer--;
        frame_to_second_count = 0;
    } else {
        frame_to_second_count++;
    }

    if(x_player > 800){
        x_player = 1;
    }
    if(x_player < 0){
        x_player = 760;
    }
    if(y_player < 0){
        y_player = 1;
    }

    if(y_player > 380){
        soundtrack.stop();
        outOfBounds();
    } else if(timer <= 0){
        soundtrack.stop();
        timeUp();
    } else {
        requestAnimationFrame(gameloop);
    }
}

function spawnPlayer(x,y) {
    ctx.clearRect(0, 0, 800, 400);
    ctx.drawImage(sprite_player, x, y, height_player, width_player);
}

function spawnLetterA(x,y) {
    next_spawn_letter = "B"
    ctx.drawImage(sprite_letter_a, x, y, height_letter, width_letter);
}

function spawnLetterB(x,y) {
    next_spawn_letter = "C"
    ctx.drawImage(sprite_letter_b, x, y, height_letter, width_letter);
}

function spawnLetterC(x,y) {
    next_spawn_letter = "A"
    ctx.drawImage(sprite_letter_c, x, y, height_letter, width_letter);
}

function generateLetterY() {
    do {
        new_y = Math.random() * (300 - 40) + 40;
    }
        while (new_y == y_letter_a
            || new_y == y_letter_b
            || new_y == y_letter_c
            || new_y == y_player);
    return new_y;
}

function generateLetterX() {
    do {
        new_x = Math.random() * (600 - 40) + 40;
    }
    while (new_x == x_letter_a
        || new_x == x_letter_b
        || new_x == x_letter_c
        || new_x == x_player);
    return new_x;
}

function movePlayer(keyPress){
    if(soundtrack_playing == false){
        soundtrack.play();
        soundtrack_playing = true;
        console.log("sound node");
    }
    speed_player++;
    if(keyPress.keyCode == 87  ) {
        y_player = y_player - speed_player;
    }
    if(keyPress.keyCode == 83  ) {
        y_player = y_player + speed_player;
    }
    if(keyPress.keyCode == 68  ) {
        x_player = x_player + speed_player;
    }
    if(keyPress.keyCode == 65  ) {
        x_player = x_player - speed_player;
    }
    if(keyPress.keyCode == 81  ) {
        x_player = x_player - speed_player;
        y_player = y_player - speed_player;
    }
    if(keyPress.keyCode == 67  ) {
        x_player = x_player + speed_player;
        y_player = y_player + speed_player;
    }
    if(keyPress.keyCode == 69  ) {
        x_player = x_player + speed_player;
        y_player = y_player - speed_player;
    }
    if(keyPress.keyCode == 90  ) {
        x_player = x_player - speed_player;
        y_player = y_player + speed_player;
    }
}

function stopPlayer(keyPress){
    if(speed_player > 5) {
        speed_player = 5;
    }
    while(speed_player > 1){
        speed_player--;
        if(keyPress.keyCode == 87  ) {
            y_player = y_player - speed_player;
        }
        if(keyPress.keyCode == 83  ) {
            y_player = y_player + speed_player;
        }
        if(keyPress.keyCode == 68  ) {
            x_player = x_player + speed_player;
        }
        if(keyPress.keyCode == 65  ) {
            x_player = x_player - speed_player;
        }
        if(keyPress.keyCode == 81  ) {
            x_player = x_player - speed_player;
            y_player = y_player - speed_player;
        }
        if(keyPress.keyCode == 67  ) {
            x_player = x_player + speed_player;
            y_player = y_player + speed_player;
        }
        if(keyPress.keyCode == 69  ) {
            x_player = x_player + speed_player;
            y_player = y_player - speed_player;
        }
        if(keyPress.keyCode == 90  ) {
            x_player = x_player - speed_player;
            y_player = y_player + speed_player;
        }
    if(speed_player <= 1){
        speed_player = 1;
        }
    }
}

function collisionCheck() {
    if(((x_letter_a + width_letter - 10) > x_player
        && x_letter_a < (x_player + width_player))
        && ((y_letter_a + height_letter - 10) > y_player
        && y_letter_a < (y_player + height_player)))
      {
        check_validity("A");
      }
    if(((x_letter_b + width_letter - 10) > x_player
        && x_letter_b < (x_player + width_player))
        && ((y_letter_b + height_letter - 10) > y_player
        && y_letter_b < (y_player + height_player)))
      {
        check_validity("B");
      }
    if(((x_letter_c + width_letter - 10) > x_player 
        && x_letter_c < (x_player + width_player)) 
        && ((y_letter_c + height_letter - 10) > y_player 
        && y_letter_c < (y_player + height_player))) 
      {
        check_validity("C");
      }
}

function check_validity(collision){
    if( collision == current_letter_objective){
        score += 10;
        correct = new sound("./assets/correct.wav");
        correct.play();
        if(current_letter_objective == "A"){
            x_letter_a = generateLetterX();
            y_letter_a = generateLetterY();
            current_letter_objective = "B";
        }
        else if(current_letter_objective == "B"){
            x_letter_b = generateLetterX();
            y_letter_b = generateLetterY();
            current_letter_objective = "C";
        }
        else if(current_letter_objective == "C"){
            x_letter_c = generateLetterX();
            y_letter_c = generateLetterY();
            current_letter_objective = "A";
        }
    } else {
        score -= 10;
        wrong = new sound("./assets/wrong.wav");
        wrong.play();
        if(collision == "A"){
            x_letter_a = generateLetterX();
            y_letter_a = generateLetterY();
        }
        if(collision == "B"){
            x_letter_b = generateLetterX();
            y_letter_b = generateLetterY();
        }
        if(collision == "C"){
            x_letter_c = generateLetterX();
            y_letter_c = generateLetterY();
        }
    }
    console.log(score);
}

function timeUp(){
    ctx.textAlign = "left";
    
    if(score >= goal){
        victory = new sound("./assets/victory.wav");
        victory.play();
        ctx.fillText("You win! Go to next stage! Score: " + score, canvas.width/2, canvas.height/2);
        nextStageButton();
    } else {
        defeat = new sound("./assets/defeat.wav");
        defeat.play();
        ctx.fillText("Not enough Point! Try Again! Score: " + score, canvas.width/2, canvas.height/2);
    }
    
    clearTimeout();

}

function outOfBounds(){
    explosion = new sound("./assets/explosion.flac");
    explosion.play();
    defeat = new sound("./assets/defeat.wav");
    defeat.play();
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText("You blew up! Game Over! Score: " + score, canvas.width/2, canvas.height/2); 
    clearTimeout();
}

function nextStageButton(){
    document.getElementById("next-stage").style.display = "inline";
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";

    document.body.appendChild(this.sound);

    this.play = function(){
        this.sound.play();
    }

    this.stop = function(){
        this.sound.pause();
    }
}
