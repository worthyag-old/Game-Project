var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var clouds;
var mountains;
var trees_x;

var canyons;
var collectables;
var lifeTokens;
var boost;

var game_score;
var flagpole;

var lives;
var level;
var platforms;
var enemies;

var jumpSound;
var backgroundMusic;
var levelCompleted;
var gameover;
var boostSound;
var collectableSound;
var fallSound;

function preload()
{
    backImg = loadImage("assets/sky.jpg");
    soilImg = loadImage("assets/brown-gradient.jpg");
    grassImg = loadImage("assets/green-gradient.jpg");
    
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(1);
    
    backgroundMusic = loadSound('assets/forestsounds.wav');
    backgroundMusic.setVolume(0.1);
    
    levelCompleted = loadSound('assets/level-completed.wav');
    levelCompleted.setVolume(0.1);
    
    gameover = loadSound('assets/gameover.wav');
    gameover.setVolume(0.1);
    
    boostSound = loadSound('assets/boost.wav');
    boostSound.setVolume(0.1);
    
    collectableSound = loadSound('assets/collectable.wav');
    collectableSound.setVolume(0.1);
    
    fallSound = loadSound('assets/fall.wav');
    fallSound.setVolume(0.1);


}


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    lives = 3;
    level = 1;
    backgroundMusic.loop();
    startGame();

}

function startGame()
{
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
	scrollPos = 0;// Variable to control the background scrolling.
	gameChar_world_x = gameChar_x - scrollPos; // Variable to store the real position of the gameChar in the game
                                               // world. Needed for collision detection.


	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	// Initialise arrays of scenery objects.
    clouds = [       
              {x_pos: 110, y_pos: 105, scale: 1.0},
              {x_pos: 460, y_pos: 75, scale: 1.0},
              {x_pos: -820, y_pos: 95, scale: 1.0},
              {x_pos: -1820, y_pos: 65, scale: 1.0},
              {x_pos: -2220, y_pos: 165, scale: 1.0},
              {x_pos: 820, y_pos: 95, scale: 1.0},
              {x_pos: 1320, y_pos: 95, scale: 1.0},
              {x_pos: 1820, y_pos: 95, scale: 1.0},
              {x_pos: 2220, y_pos: 115, scale: 1.0}
             ];
    mountains = [
                    {x_pos: -820, y_pos: 432},
                    {x_pos: -1520, y_pos: 432},
                    {x_pos: -150, y_pos: 432},
                    {x_pos: 560, y_pos: 432},
                    {x_pos: 1120, y_pos: 432}, 
                    {x_pos: 1820, y_pos: 432},
                    {x_pos: random(-5000, -4700), y_pos: 432},
                    {x_pos: random(-3900, -3700), y_pos: 432},
                    {x_pos: random(-2900, -2500), y_pos: 432},
                    {x_pos: random(-1950, -1600), y_pos: 432},
                    {x_pos: random(2200, 2500), y_pos: 432},
                    {x_pos: random(3100, 3300), y_pos: 432},
                    {x_pos: random(4100, 4200), y_pos: 432}
                ];
    trees_x =[-1900, -1100, -300, 300, 1000, 1500, 1800, 2500, 2800, 
              random(-4650, -4450), random(-4400, -4350), random(-3650, -3550), random(-3500, -3450),
              random(-2450, -2400), random(-2390, -2350), random(3400, 3500), random(4300, 4400)];
    canyons = [
                {x_pos: -1750, width: 432, y_pos: width},
                {x_pos: -1050, width: 432, y_pos: width},
                {x_pos: 150, width: 432, y_pos: width},
                {x_pos: 350, width: 432, y_pos: width},
                {x_pos: 850, width: 432, y_pos: width},
                {x_pos: 1550, width: 432, y_pos: width},
                {x_pos: 2240, width: 432, y_pos: width},
                {x_pos: random(-4300, -4000), width: 432, y_pos: width},
                {x_pos: random(-3400, -3000), width: 432, y_pos: width},
                {x_pos: random(-2300, -2000), width: 432, y_pos: width},
                {x_pos: random(2800, 2900), width: 432, y_pos: width},
                {x_pos: random(3600, 4000), width: 432, y_pos: width},
                {x_pos: random(4700, 5000), width: 432, y_pos: width}
              ];
    platforms =[];
    platforms.push(createPlatforms(300, floorPos_y - 90, 200))
    platforms.push(createPlatforms(random(-5000, -2500), floorPos_y - 90, 200));
    platforms.push(createPlatforms(random(-2400, 0), floorPos_y - 90, 200));
    platforms.push(createPlatforms(random(100, 2500), floorPos_y - 90, 200));
    platforms.push(createPlatforms(random(2600, 5000), floorPos_y - 110, 200));
    collectables = [
                        {x_pos: -840, y_pos: 380, size: 50, isFound: false},
                        {x_pos: -140, y_pos: 380, size: 50, isFound: false},
                        {x_pos: 210, y_pos: 380, size: 50, isFound: false},
                        {x_pos: 310, y_pos: 400, size: 50, isFound: false},
                        {x_pos: 710, y_pos: 360, size: 50, isFound: false},
                        {x_pos: 840, y_pos: 400, size: 50, isFound: false},
                        {x_pos: 1040, y_pos: 400, size: 50, isFound: false},
                        {x_pos: 1840, y_pos: 380, size: 50, isFound: false},
                        {x_pos: random(-5000, -4000), y_pos: 270,isFound: false},
                        {x_pos: random(-3900, -3000), y_pos: 270,isFound: false},
                        {x_pos: random(-2900, -2000), y_pos: 300, isFound: false},
                        {x_pos: random(-1900, -1000), y_pos: 300, isFound: false},
                        {x_pos: random(-200, 0), y_pos: 320, isFound: false},
                        {x_pos: random(1100, 2000), y_pos: 310,isFound: false},
                        {x_pos: random(2100, 3000), y_pos: 310,isFound: false},
                        {x_pos: random(3100, 4000), y_pos: 310,isFound: false},
                        {x_pos: random(4100, 5000), y_pos: 310,isFound: false}
                   ];
    lifeTokens = [
                    {x_pos: 820, y_pos: 20},
                    {x_pos: 860, y_pos: 20},
                    {x_pos: 900, y_pos: 20},
                    {x_pos: 940, y_pos: 20},
                    {x_pos: 980, y_pos: 20}
                 ];
     boost = [
                {x_pos: 400, y_pos: 270, isFound: false},
                {x_pos: 800, y_pos: 300, isFound: false},
                {x_pos: random(-5000, -3100), y_pos: 270,isFound: false},
                {x_pos: random(-3200, -1000), y_pos: 300, isFound: false},
                {x_pos: random(-900, 1000), y_pos: 320, isFound: false},
                {x_pos: random(1100, 2900), y_pos: 310,isFound: false},
                {x_pos: random(3000, 5000), y_pos: 310,isFound: false}
            ];
    enemies = [];
    enemies.push(new Enemy(200, floorPos_y - 10, 100));
    enemies.push(new Enemy(random(-5000, -4200), floorPos_y - 10, 100));
    enemies.push(new Enemy(random(-3200, -2800), floorPos_y - 10, 100));
    enemies.push(new Enemy(random(-1200, 900), floorPos_y - 10, 100));
    enemies.push(new Enemy(random(2000, 3200), floorPos_y - 10, 100));
    enemies.push(new Enemy(random(38000, 5000), floorPos_y - 10, 100));
    
    
    game_score = 0;
    
    flagpole = {isReached: false, x_pos: random(-4500, 4500), height: 300};
    
    
    console.log(flagpole.x_pos);
    

}

function draw()
{
    //Background- DeepSkyBlue
//    background(0, 191, 255); 
//    //Gradient for sky- Medium Blue Sky
//    noStroke(0);
//    fill(0, 0, 205, 25);
//    rect(0,0, height + 448, 100);
//    //Dodger Blue Sky
//    noStroke(0);
//    fill(30, 144, 255, 25);
//    rect(0,100, height + 448, 200);
//    
    image(backImg, 0, 0);
    
    //Forest Green Ground
	strokeWeight(2);
    stroke(0, 0, 0);
	fill(34,139,34);
    rect(0, floorPos_y, width, height/4); // draw some green ground
    image(grassImg, 0, floorPos_y + 1);
    
    //Saddle Brown Earth for the Underground
    strokeWeight(2);
    stroke(0, 0, 0);
	fill(139,69,19);
    rect(0, floorPos_y + 21, width, height/4); 
    image(soilImg, 0, floorPos_y + 22);

    push();
    translate(scrollPos, 0);

    drawClouds(); // Draw clouds.
    drawMountains(); // Draw mountains.
    drawTrees(); // Draw trees.
    
    //Draw platforms.
    for(var i = 0; i < platforms.length; i++)
        {
            platforms[i].draw();
        }
    
    // Draw collectable items.
    for (var i = 0; i < collectables.length; i++)
        {
            if(!collectables[i].isFound)
                {
                    drawCollectable(collectables[i]);
                    checkCollectable(collectables[i]);
                }
        }
    
    // Draw canyons.
    for (var i = 0; i < canyons.length; i++)
        {
            drawCanyon(canyons[i]);   
            checkCanyon(canyons[i]);
        }
    
    //Draw boost.
    for (var i = 0; i < boost.length; i++)
        {
            if(!boost[i].isFound)
                {
                    drawBoost(boost[i]);
                    checkBoost(boost[i]);
                }
        }
    
    //Draw Enemy.
    for (var i = 0; i < enemies.length; i++)
        {
            enemies[i].draw();
            var isContact = enemies[i].checkContact(gameChar_world_x, gameChar_y);
            // don't have to say if(isContact == true) because it is a boolean
            if(isContact)
                {
                    if(lives > 0)
                        {
                            startGame();
                            lives -= 1;
                            fallSound.play();
                            break;
                        }
                }
                
        }
    
    renderFlagpole();
    checkPlayerDie();
    pop();
    
//    //Draw enemy character
//    drawEnemyChar();
    
	// Draw game character.
	drawGameChar();
    
    fill(255);
    stroke(0);
    strokeWeight(3.5);
    textFont();
    textSize(20);
    text("Score: " + game_score, 120, 30);
    text("Lives: ", 755, 30);
    text("Level: " + level, 20, 30);
    
    

    if(flagpole.isReached)
        {
            text("Level Complete- Press space to continue", width/2 - 100, height/2);
            levelCompleted.play();
            return;
        }
    
    if (lives > 5)
        {
           lives = 5;
           text("Reached maximum number of lives- Press W to continue", width/2 - 100, height/2);
            
        }

    if(lives > 0)
        {
            if(lives == 5)
                {
                    for (var i=0; i < 5; i++)
                        {
                            push();
                            //Life token
                            strokeWeight(2);
                            fill(255, 0, 0);
                            ellipse(lifeTokens[i].x_pos, lifeTokens[i].y_pos, 12, 15);
                            ellipse(lifeTokens[i].x_pos + 10, lifeTokens[i].y_pos, 12, 15);
                            triangle(lifeTokens[i].x_pos - 6, lifeTokens[i].y_pos + 2, lifeTokens[i].x_pos + 16, lifeTokens[i].y_pos + 2, lifeTokens[i].x_pos + 5, lifeTokens[i].y_pos + 15);
                            noStroke();
                            ellipse(lifeTokens[i].x_pos + 5, lifeTokens[i].y_pos + 2, 18, 8);
                            strokeWeight(1.2);
                            stroke(255);
                            fill(255);
                            textSize(7.5);
                            text("W", lifeTokens[i].x_pos + 1, lifeTokens[i].y_pos + 5);
                            pop();
                        }  
                }
            if(lives == 4)
                {
                    for (var i=0; i < 4; i++)
                        {
                            push();
                            //Life token
                            strokeWeight(2);
                            fill(255, 0, 0);
                            ellipse(lifeTokens[i].x_pos, lifeTokens[i].y_pos, 12, 15);
                            ellipse(lifeTokens[i].x_pos + 10, lifeTokens[i].y_pos, 12, 15);
                            triangle(lifeTokens[i].x_pos - 6, lifeTokens[i].y_pos + 2, lifeTokens[i].x_pos + 16, lifeTokens[i].y_pos + 2, lifeTokens[i].x_pos + 5, lifeTokens[i].y_pos + 15);
                            noStroke();
                            ellipse(lifeTokens[i].x_pos + 5, lifeTokens[i].y_pos + 2, 18, 8);
                            strokeWeight(1.2);
                            stroke(255);
                            fill(255);
                            textSize(7.5);
                            text("W", lifeTokens[i].x_pos + 1, lifeTokens[i].y_pos + 5);
                            pop();
                        }  
                }
            if(lives == 3)
                {
                    for (var i=0; i < 3; i++)
                        {
                            push();
                            //Life token
                            strokeWeight(2);
                            fill(255, 0, 0);
                            ellipse(lifeTokens[i].x_pos, lifeTokens[i].y_pos, 12, 15);
                            ellipse(lifeTokens[i].x_pos + 10, lifeTokens[i].y_pos, 12, 15);
                            triangle(lifeTokens[i].x_pos - 6, lifeTokens[i].y_pos + 2, lifeTokens[i].x_pos + 16, lifeTokens[i].y_pos + 2, lifeTokens[i].x_pos + 5, lifeTokens[i].y_pos + 15);
                            noStroke();
                            ellipse(lifeTokens[i].x_pos + 5, lifeTokens[i].y_pos + 2, 18, 8);
                            strokeWeight(1.2);
                            stroke(255);
                            fill(255);
                            textSize(7.5);
                            text("W", lifeTokens[i].x_pos + 1, lifeTokens[i].y_pos + 5);
                            pop();
                        }  
                }
            if (lives == 2)
                {
                    for (var i=0; i < 2; i++)
                        {
                            push();
                            //Life token
                            strokeWeight(2);
                            fill(255, 0, 0);
                            ellipse(lifeTokens[i].x_pos, 20, 12, 15);
                            ellipse(lifeTokens[i].x_pos + 10, 20, 12, 15);
                            triangle(lifeTokens[i].x_pos - 6, 22, lifeTokens[i].x_pos + 16, 22, lifeTokens[i].x_pos + 5, 35);
                            noStroke();
                            ellipse(lifeTokens[i].x_pos + 5, 22, 18, 8);
                            strokeWeight(1.2);
                            stroke(255);
                            fill(255);
                            textSize(7.5);
                            text("W", lifeTokens[i].x_pos + 1, lifeTokens[i].y_pos + 5);
                            pop();
                        }  
                }
            if (lives == 1)
                {
                    for (var i=0; i < 1; i++)
                        {
                            push();
                            //Life token
                            strokeWeight(2);
                            fill(255, 0, 0);
                            ellipse(lifeTokens[i].x_pos, 20, 12, 15);
                            ellipse(lifeTokens[i].x_pos + 10, 20, 12, 15);
                            triangle(lifeTokens[i].x_pos - 6, 22, lifeTokens[i].x_pos + 16, 22, lifeTokens[i].x_pos + 5, 35);
                            noStroke();
                            ellipse(lifeTokens[i].x_pos + 5, 22, 18, 8);
                            strokeWeight(1.2);
                            stroke(255);
                            fill(255);
                            textSize(7.5);
                            text("W", lifeTokens[i].x_pos + 1, lifeTokens[i].y_pos + 5);
                            pop();
                        }  
                }
        }
    
    

	// Logic to make the game character move or the background scroll.
	if(isLeft)
        {
            if(gameChar_x > width * 0.2)
            {
                gameChar_x -= 5;
            }
            else
            {
                scrollPos += 5;
            }
        }

	if(isRight)
        {
            if(gameChar_x < width * 0.8)
                {
                    gameChar_x  += 5;
                }
            else
                {
                    scrollPos -= 5; // negative for moving against the background
                }
        }

	// Logic to make the game character rise and fall.
    if (gameChar_y < floorPos_y)
        {
            var isContact = false;
            for(var i = 0; i < platforms.length; i++)
                {
                    if(platforms[i].checkContact(gameChar_world_x, gameChar_y) == true)
                        {
                            isContact = true;
                            break;
                        }
                }
            if(isContact == false)
                {
                    gameChar_y += 2;
                    isFalling = true;
                }
        }
    else
        {
            isFalling = false;
        }
    
    if(isPlummeting)
        {
            gameChar_y += 5;
        }

	if(flagpole.isReached == false)
        {
            checkFlagpole();
        }
    
    // Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}

function checkPlayerDie()
    {
        
        fill(255);
        stroke(0);
        strokeWeight(3.5);
        textFont();
        textSize(20);
    
    
        if (gameChar_y > height + 100)
            {
                if(lives > 1)
                    {
                        lives -= 1;
                        startGame();
                    }
                else
                    {
                        text("Game Over- Press space to continue", width/2 - 100, height/2);
                        lives = 0;
                        gameover.play();
                        //Set isLeft + isRight to false to stop scrolling
                        isLeft = false;
                        isRight = false;
                        
                    }
                
            }
    }


function keyPressed()
{
    
    if (flagpole.isReached && key == ' ')
        {
            startGame();
            lives = 3;
            level += 1;
            levelCompleted.stop();
            return;

        }
    else if ((lives == 0) && key == ' ')
        {
            startGame();
            lives = 3;
//            returnToStart();
        }
    
    if(key == 'K' || keyCode == 75)
        {
            lives = 5;
        }
    
    
    if (key == 'A' || keyCode == 37)
        {
            isLeft = true;
        }
    if (key == 'D' || keyCode == 39)
        {
            isRight = true;
        }
     if (key == ' ' || key == 'W')
        {
            if (!isFalling)
            {
                gameChar_y -= 110;
                jumpSound.play();
            }
        }
}

function keyReleased()
{
    if (key == 'A' || keyCode == 37)
        {
            isLeft = false;
        }
    if (key == 'D' || keyCode == 39)
        {
            isRight = false;
        }
}

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	//the game character
	if(isLeft && isFalling)
        {
            //add your jumping-left code
            //Character's hair: Slate Gray
            stroke(0);
            strokeWeight(2);
            fill(112, 128, 144);
            rect(gameChar_x - 17, gameChar_y - 75, 38, 68, 25);

            //Character's head: Peru Brown
            stroke(0);
            strokeWeight(2);
            fill(205, 133, 63);
            ellipse(gameChar_x, gameChar_y - 58, 35);

            //Character's mouth: Pink
            stroke(0);
            strokeWeight(2);
            fill(255, 192, 203);
            ellipse(gameChar_x - 12, gameChar_y - 50, 8);

            //Character's eyes: Plum
            //The L white part
            stroke(0);
            strokeWeight(2);
            fill(255);
            ellipse(gameChar_x - 5, gameChar_y - 62, 15);

            //The L plum part
            stroke(0);
            strokeWeight(0.25);
            fill(221, 160, 221);
            ellipse(gameChar_x - 5, gameChar_y - 62, 9);

            //The L black part
            stroke(0);
            strokeWeight(0.25);
            fill(0);
            ellipse(gameChar_x - 5, gameChar_y - 62, 6);

            //The L tiny white part
            stroke(0);
            strokeWeight(0);
            fill(255);
            ellipse(gameChar_x - 5, gameChar_y - 62, 2);

            //Character's fringe: Slate Gray
            stroke(0);
            strokeWeight(2);
            fill(112, 128, 144);
            ellipse(gameChar_x, gameChar_y - 69, 33, 13);

            //Character's legs: White
            //Left leg
            stroke(0);
            strokeWeight(2);
            fill(255);
            rect(gameChar_x - 8, gameChar_y - 28, 8, 28, 10);
            //Right leg
            stroke(0);
            strokeWeight(2);
            fill(255);
            rect(gameChar_x + 3, gameChar_y - 28, 8, 23, 10);

            //Character's body: Plum
            stroke(0);
            strokeWeight(2);
            fill(221, 160, 221);
            quad(gameChar_x - 8, gameChar_y - 42, 
                 gameChar_x + 9, gameChar_y - 42, 
                 gameChar_x + 13, gameChar_y - 15,
                 gameChar_x - 5, gameChar_y - 15);

            //Character's arm: Peru Brown
            //Left arm
            stroke(0);
            strokeWeight(2);
            fill(205, 133, 63);
            ellipse(gameChar_x + 4, gameChar_y - 40, 5, 10);
        }
    
	else if(isRight && isFalling)
        {
            //add your jumping-right code
            //Character's hair: Slate Gray
            stroke(0);
            strokeWeight(2);
            fill(112, 128, 144);
            rect(gameChar_x - 21, gameChar_y - 75, 38, 68, 25);

            //Character's head: Peru Brown
            stroke(0);
            strokeWeight(2);
            fill(205, 133, 63);
            ellipse(gameChar_x, gameChar_y - 58, 35);

            //Character's mouth: Pink
            stroke(0);
            strokeWeight(2);
            fill(255, 192, 203);
            ellipse(gameChar_x + 12, gameChar_y - 50, 8);

            //Character's eyes: Plum
            //The L white part
            stroke(0);
            strokeWeight(2);
            fill(255);
            ellipse(gameChar_x + 5, gameChar_y - 62, 15);

            //The L plum part
            stroke(0);
            strokeWeight(0.25);
            fill(221, 160, 221);
            ellipse(gameChar_x + 5, gameChar_y - 62, 9);

            //The L black part
            stroke(0);
            strokeWeight(0.25);
            fill(0);
            ellipse(gameChar_x + 5, gameChar_y - 62, 6);

            //The L tiny white part
            stroke(0);
            strokeWeight(0);
            fill(255);
            ellipse(gameChar_x + 5, gameChar_y - 62, 2);

            //Character's fringe: Slate Gray
            stroke(0);
            strokeWeight(2);
            fill(112, 128, 144);
            ellipse(gameChar_x, gameChar_y - 69, 33, 13);

            //Character's legs: White
            //Left leg
            stroke(0);
            strokeWeight(2);
            fill(255);
            rect(gameChar_x, gameChar_y - 28, 8, 28, 10);
            //Right leg
            stroke(0);
            strokeWeight(2);
            fill(255);
            rect(gameChar_x - 11, gameChar_y - 28, 8, 23, 10);

            //Character's body: Plum
            stroke(0);
            strokeWeight(2);
            fill(221, 160, 221);
            quad(gameChar_x - 8, gameChar_y - 42, 
                 gameChar_x + 9, gameChar_y - 42, 
                 gameChar_x + 5, gameChar_y - 15,
                 gameChar_x - 13, gameChar_y - 15);

            //Character's arm: Peru Brown
            //Right arm
            stroke(0);
            strokeWeight(2);
            fill(205, 133, 63);
            ellipse(gameChar_x - 4, gameChar_y - 40, 5, 10);
        }
    
	else if(isLeft)
        {
            //add your walking left code
            //Character's hair: Slate Gray
            stroke(0);
            strokeWeight(2);
            fill(112, 128, 144);
            rect(gameChar_x - 17, gameChar_y - 75, 38, 68, 25);

            //Character's head: Peru Brown
            stroke(0);
            strokeWeight(2);
            fill(205, 133, 63);
            ellipse(gameChar_x, gameChar_y - 58, 35);

            //Character's mouth: Pink
            stroke(0);
            strokeWeight(2);
            fill(255, 192, 203);
            ellipse(gameChar_x - 12, gameChar_y - 50, 8, 6);

            //Character's eyes: Plum
            //The L white part
            stroke(0);
            strokeWeight(2);
            fill(255);
            ellipse(gameChar_x - 5, gameChar_y - 62, 15);

            //The L plum part
            stroke(0);
            strokeWeight(0.25);
            fill(221, 160, 221);
            ellipse(gameChar_x - 5, gameChar_y - 62, 9);

            //The L black part
            stroke(0);
            strokeWeight(0.25);
            fill(0);
            ellipse(gameChar_x - 5, gameChar_y - 62, 6);

            //The L tiny white part
            stroke(0);
            strokeWeight(0);
            fill(255);
            ellipse(gameChar_x - 5, gameChar_y - 62, 2);

            //Character's fringe: Slate Gray
            stroke(0);
            strokeWeight(2);
            fill(112, 128, 144);
            ellipse(gameChar_x, gameChar_y - 69, 33, 13);

            //Character's legs: White
            //Left leg
            stroke(0);
            strokeWeight(2);
            fill(255);
            rect(gameChar_x - 8, gameChar_y - 28, 8, 28, 10);
            //Right leg
            stroke(0);
            strokeWeight(2);
            fill(255);
            rect(gameChar_x - 3, gameChar_y - 28, 8, 28, 10);

            //Character's body: Plum
            stroke(0);
            strokeWeight(2);
            fill(221, 160, 221);
            quad(gameChar_x - 8, gameChar_y - 42, 
                 gameChar_x + 9, gameChar_y - 42, 
                 gameChar_x + 13, gameChar_y - 15,
                 gameChar_x - 13, gameChar_y - 15);

            //Character's arm: Peru Brown
            //Left arm
            stroke(0);
            strokeWeight(2);
            fill(205, 133, 63);
            ellipse(gameChar_x + 4, gameChar_y - 30, 5, 10);
        }
    
	else if(isRight)
        {
            //add your walking right code
            //Character's hair: Slate Gray
            stroke(0);
            strokeWeight(2);
            fill(112, 128, 144);
            rect(gameChar_x - 21, gameChar_y - 75, 38, 68, 25);

            //Character's head: Peru Brown
            stroke(0);
            strokeWeight(2);
            fill(205, 133, 63);
            ellipse(gameChar_x, gameChar_y - 58, 35);

            //Character's mouth: Pink
            stroke(0);
            strokeWeight(2);
            fill(255, 192, 203);
            ellipse(gameChar_x + 12, gameChar_y - 50, 8, 6);

            //Character's eyes: Plum
            //The L white part
            stroke(0);
            strokeWeight(2);
            fill(255);
            ellipse(gameChar_x + 5, gameChar_y - 62, 15);

            //The L plum part
            stroke(0);
            strokeWeight(0.25);
            fill(221, 160, 221);
            ellipse(gameChar_x + 5, gameChar_y - 62, 9);

            //The L black part
            stroke(0);
            strokeWeight(0.25);
            fill(0);
            ellipse(gameChar_x + 5, gameChar_y - 62, 6);

            //The L tiny white part
            stroke(0);
            strokeWeight(0);
            fill(255);
            ellipse(gameChar_x + 5, gameChar_y - 62, 2);

            //Character's fringe: Slate Gray
            stroke(0);
            strokeWeight(2);
            fill(112, 128, 144);
            ellipse(gameChar_x, gameChar_y - 69, 33, 13);

            //Character's legs: White
            //Left leg
            stroke(0);
            strokeWeight(2);
            fill(255);
            rect(gameChar_x - 5, gameChar_y - 28, 8, 28, 10);
            //Right leg
            stroke(0);
            strokeWeight(2);
            fill(255);
            rect(gameChar_x, gameChar_y - 28, 8, 28, 10);

            //Character's body: Plum
            stroke(0);
            strokeWeight(2);
            fill(221, 160, 221);
            quad(gameChar_x - 8, gameChar_y - 42, 
                 gameChar_x + 9, gameChar_y - 42, 
                 gameChar_x + 13, gameChar_y - 15,
                 gameChar_x - 13, gameChar_y - 15);

            //Character's arm: Peru Brown
            //Right arm
            stroke(0);
            strokeWeight(2);
            fill(205, 133, 63);
            ellipse(gameChar_x - 4, gameChar_y - 30, 5, 10);
        }

	else if(isFalling || isPlummeting)
        {
            //add your jumping facing forwards code
            //Character's hair: Slate Gray
            stroke(0);
            strokeWeight(2);
            fill(112, 128, 144);
            rect(gameChar_x - 17, gameChar_y - 68, 35, 60, 25);

            //Character's head: Peru Brown
            stroke(0);
            strokeWeight(2);
            fill(205, 133, 63);
            ellipse(gameChar_x, gameChar_y - 58, 35);

            //Character's mouth: Pink
            stroke(0);
            strokeWeight(2);
            fill(255, 192, 203);
            ellipse(gameChar_x, gameChar_y - 50, 8, 7);

            //Character's eyes: Plum
            //The L white part
            stroke(0);
            strokeWeight(2);
            fill(255);
            ellipse(gameChar_x - 10, gameChar_y - 60, 15);
            //The R white part
            stroke(0);
            strokeWeight(2);
            fill(255);
            ellipse(gameChar_x + 10, gameChar_y - 60, 15);

            //The L plum part
            stroke(0);
            strokeWeight(0.25);
            fill(221, 160, 221);
            ellipse(gameChar_x - 8, gameChar_y - 60, 11);
            //The R plum part
            stroke(0);
            strokeWeight(0.25);
            fill(221, 160, 221);
            ellipse(gameChar_x + 8, gameChar_y - 60, 11);

            //The L black part
            stroke(0);
            strokeWeight(0.25);
            fill(0);
            ellipse(gameChar_x - 8, gameChar_y - 60, 6);
            //The R black part
            stroke(0);
            strokeWeight(0.25);
            fill(0);
            ellipse(gameChar_x + 8, gameChar_y - 60, 6);

            //The L tiny white part
            stroke(0);
            strokeWeight(0);
            fill(255);
            ellipse(gameChar_x - 8, gameChar_y - 60, 2);
            //The R tiny white part
            stroke(0);
            strokeWeight(0);
            fill(255);
            ellipse(gameChar_x + 8, gameChar_y - 60, 2);

            //Character's fringe: Slate Gray
            stroke(0);
            strokeWeight(2);
            fill(112, 128, 144);
            ellipse(gameChar_x, gameChar_y - 69, 33, 15);

            //Character's legs: White
            //Left leg
            stroke(0);
            strokeWeight(2);
            fill(255);
            rect(gameChar_x - 10, gameChar_y - 28, 8, 23, 10);
            //Right leg
            stroke(0);
            strokeWeight(2);
            fill(255);
            rect(gameChar_x + 2, gameChar_y - 28, 8, 23, 10);

            //Character's body: Plum
            stroke(0);
            strokeWeight(2);
            fill(221, 160, 221);
            quad(gameChar_x - 8, gameChar_y - 42, 
                 gameChar_x + 9, gameChar_y - 42, 
                 gameChar_x + 13, gameChar_y - 15,
                 gameChar_x - 13, gameChar_y - 15);

            //Character's arm: Peru Brown
            //Left arm
            stroke(0);
            strokeWeight(2);
            fill(205, 133, 63);
            ellipse(gameChar_x - 8, gameChar_y - 44, 5, 10);
            //Right arm
            stroke(0);
            strokeWeight(2);
            fill(205, 133, 63);
            ellipse(gameChar_x + 8, gameChar_y - 44, 5, 10);
        }
    
	else
        {
            //add your standing front facing code
            //Character's hair: Slate Gray
            stroke(0);
            strokeWeight(2);
            fill(112, 128, 144);
            rect(gameChar_x - 17, gameChar_y - 68, 35, 60, 25);

            //Character's head: Peru Brown
            stroke(0);
            strokeWeight(2);
            fill(205, 133, 63);
            ellipse(gameChar_x, gameChar_y - 58, 35);

            //Character's mouth: Pink
            stroke(0);
            strokeWeight(2);
            fill(255, 192, 203);
            ellipse(gameChar_x, gameChar_y - 50, 8, 5);

            //Character's eyes: Plum
            //The L white part
            stroke(0);
            strokeWeight(2);
            fill(255);
            ellipse(gameChar_x - 10, gameChar_y - 60, 15);
            //The R white part
            stroke(0);
            strokeWeight(2);
            fill(255);
            ellipse(gameChar_x + 10, gameChar_y - 60, 15);

            //The L plum part
            stroke(0);
            strokeWeight(0.25);
            fill(221, 160, 221);
            ellipse(gameChar_x - 8, gameChar_y - 60, 11);
            //The R plum part
            stroke(0);
            strokeWeight(0.25);
            fill(221, 160, 221);
            ellipse(gameChar_x + 8, gameChar_y - 60, 11);

            //The L black part
            stroke(0);
            strokeWeight(0.25);
            fill(0);
            ellipse(gameChar_x - 8, gameChar_y - 60, 6);
            //The R black part
            stroke(0);
            strokeWeight(0.25);
            fill(0);
            ellipse(gameChar_x + 8, gameChar_y - 60, 6);

            //The L tiny white part
            stroke(0);
            strokeWeight(0);
            fill(255);
            ellipse(gameChar_x - 8, gameChar_y - 60, 2);
            //The R tiny white part
            stroke(0);
            strokeWeight(0);
            fill(255);
            ellipse(gameChar_x + 8, gameChar_y - 60, 2);

            //Character's fringe: Slate Gray
            stroke(0);
            strokeWeight(2);
            fill(112, 128, 144);
            ellipse(gameChar_x, gameChar_y - 69, 33, 15);

            //Character's legs: White
            //Left leg
            stroke(0);
            strokeWeight(2);
            fill(255);
            rect(gameChar_x - 10, gameChar_y - 28, 8, 28, 10);
            //Right leg
            stroke(0);
            strokeWeight(2);
            fill(255);
            rect(gameChar_x + 2, gameChar_y - 28, 8, 28, 10);

            //Character's body: Plum
            stroke(0);
            strokeWeight(2);
            fill(221, 160, 221);
            quad(gameChar_x - 8, gameChar_y - 42, 
                 gameChar_x + 9, gameChar_y - 42, 
                 gameChar_x + 13, gameChar_y - 15,
                 gameChar_x - 13, gameChar_y - 15);

            //Character's arm: Peru Brown
            //Left arm
            stroke(0);
            strokeWeight(2);
            fill(205, 133, 63);
            ellipse(gameChar_x - 8, gameChar_y - 24, 5, 10);
            //Right arm
            stroke(0);
            strokeWeight(2);
            fill(205, 133, 63);
            ellipse(gameChar_x + 8, gameChar_y - 24, 5, 10);
        }
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{
    for (var i = 0; i < clouds.length; i++)
        {
            //White Ellipses for Cloud
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(255, 255, 255);
            ellipse(clouds[i].x_pos, clouds[i].y_pos, 100 * clouds[i].scale, 60 * clouds[i].scale);
            ellipse(clouds[i].x_pos + 70, clouds[i].y_pos, 110 * clouds[i].scale, 90 * clouds[i].scale);
            ellipse(clouds[i].x_pos + 140, clouds[i].y_pos, 100 * clouds[i].scale, 60 * clouds[i].scale);  
            //White Rectangle to Complete Cloud
            noStroke(0);
            fill(255, 255, 255);
            rect(clouds[i].x_pos - 20, clouds[i].y_pos - 25, clouds[0].x_pos + 60, clouds[0].y_pos - 55, 150);
        }
}

// Function to draw mountains objects.
function drawMountains()
{
    for (var i = 0; i < mountains.length; i++)
        {
            //Large Dark Gray Triangle
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(169,169,169);
            triangle(mountains[i].x_pos, mountains[i].y_pos, mountains[i].x_pos + 142, mountains[i].y_pos - 232, mountains[i].x_pos + 284, mountains[i].y_pos);
            //Large Gray Right Angled Triangle
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(128,128,128);
            triangle(mountains[i].x_pos, mountains[i].y_pos, mountains[i].x_pos + 142, mountains[i].y_pos - 232, mountains[i].x_pos + 142, mountains[i].y_pos);
            //Small Dark Gray Triangle
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(169,169,169);
            triangle(mountains[i].x_pos - 122, mountains[i].y_pos, mountains[i].x_pos - 1, mountains[i].y_pos - 154, mountains[i].x_pos + 120, mountains[i].y_pos);
            //Small Gray Right Angled Triangle
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(128,128,128);
            triangle(mountains[i].x_pos -122, mountains[i].y_pos, mountains[i].x_pos -1, mountains[i].y_pos - 154, mountains[i].x_pos - 1, mountains[i].y_pos);
            //Line for Flag
            strokeWeight(2);
            stroke(0, 0, 0);
            line(mountains[i].x_pos + 142, mountains[i].y_pos - 332, mountains[i].x_pos + 142, mountains[i].y_pos - 232);
            //Triangle for Flag- Medium Orchid
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(186,85,211);
            triangle(mountains[i].x_pos + 142, mountains[i].y_pos - 332, mountains[i].x_pos + 232, mountains[i].y_pos - 307, mountains[i].x_pos + 142, mountains[i].y_pos - 282);
            //'W' for my Initial on the Flag- White
            strokeWeight(2);
            stroke(255);
            fill(255);
            text("W", mountains[i].x_pos + 160, mountains[i].y_pos - 300);
//            line(mountains[i].x_pos + 150, mountains[i].y_pos - 317, mountains[i].x_pos + 160, mountains[i].y_pos - 297);
//            line(mountains[i].x_pos + 160, mountains[i].y_pos - 297, mountains[i].x_pos + 165, mountains[i].y_pos - 310);
//            line(mountains[i].x_pos + 165, mountains[i].y_pos - 310, mountains[i].x_pos + 173, mountains[i].y_pos - 297);
//            line(mountains[i].x_pos + 173, mountains[i].y_pos - 297, mountains[i].x_pos + 180, mountains[i].y_pos - 317);
        }
}

// Function to draw trees objects.
function drawTrees()
{
     for (var i = 0; i < trees_x.length; i++)
        {
            //Sienna Rectangle for the Tree
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(160,82,45);
            rect(trees_x[i] - 40, floorPos_y - 130, 20, 130);
            //Large Lime Green Circle
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(50, 205, 50, 220);
            ellipse(trees_x[i] - 40, floorPos_y - 130, 143, 143);
            //Small Lime Green Circle
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(50, 205, 50, 200);
            ellipse(trees_x[i] - 10, floorPos_y - 120, 130, 130);
            //Medium Lime Green Circle
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(50, 205, 50, 200);
            ellipse(trees_x[i] - 30, floorPos_y - 160, 140, 140);
            //Berries for Tree in Crimson Ellipses
            strokeWeight(2);
            stroke(0, 0, 0);
            fill(220, 20, 60);
            ellipse(trees_x[i] - 30, floorPos_y - 160, 10, 10);
            ellipse(trees_x[i] - 20, floorPos_y - 200, 10, 10);
            ellipse(trees_x[i] - 80, floorPos_y - 120, 10, 10);
            ellipse(trees_x[i], floorPos_y - 110, 10, 10);
            ellipse(trees_x[i] - 70, floorPos_y - 80, 10, 10);
            ellipse(trees_x[i] + 25, floorPos_y - 86, 10, 10); 
        }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
        strokeWeight(2);
        stroke(0, 0, 0);
        fill(176,224,230);
        quad(t_canyon.x_pos, t_canyon.width, t_canyon.x_pos + 88, t_canyon.width, t_canyon.x_pos + 48, t_canyon.width + 144, t_canyon.x_pos + 40, t_canyon.width + 144);
        //Mini quad to lower the t_canyon and get rid of the black Line
        strokeWeight(2);
        stroke(10, 200, 225);
        fill(10, 200,225);
        quad(t_canyon.x_pos + 2, t_canyon.width, t_canyon.x_pos + 86, t_canyon.width, t_canyon.x_pos + 79, t_canyon.width + 22, t_canyon.x_pos + 9, t_canyon.width + 22);
        //Line to make it stand out on top
        strokeWeight(2);
        stroke(0, 0, 0);
        line(t_canyon.x_pos + 8, t_canyon.width + 22, t_canyon.x_pos + 82, t_canyon.width + 22);
        //fish for canyon
        fill(255, 69, 0);
        ellipse(t_canyon.x_pos + 30, t_canyon.width + 35, 20, 6);
        triangle(t_canyon.x_pos + 41, t_canyon.width + 35, t_canyon.x_pos + 48, t_canyon.width + 32, t_canyon.x_pos + 48, t_canyon.width + 38);
        ellipse(t_canyon.x_pos + 47, t_canyon.width + 95, 20, 6);
        triangle(t_canyon.x_pos + 38, t_canyon.width + 95, t_canyon.x_pos + 31, t_canyon.width + 92, t_canyon.x_pos + 31, t_canyon.width + 98);
        fill(173, 255, 47);
        ellipse(t_canyon.x_pos + 48, t_canyon.width + 55, 20, 6);
        triangle(t_canyon.x_pos + 59, t_canyon.width + 55, t_canyon.x_pos + 66, t_canyon.width + 52, t_canyon.x_pos + 66, t_canyon.width + 58);
       
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{    
    if (gameChar_y <= t_canyon.width && gameChar_world_x >= t_canyon.x_pos + 10 && gameChar_world_x <= t_canyon.x_pos + 65 && gameChar_y == floorPos_y)
    {
        isPlummeting = true;
        fallSound.play();
    }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.
function drawCollectable(t_collectable)
{
        strokeWeight(2);
        stroke(0, 0, 0);
        fill(139, 0, 139);
        quad(t_collectable.x_pos, t_collectable.y_pos, t_collectable.x_pos + 10, t_collectable.y_pos - 20, t_collectable.x_pos + 20, t_collectable.y_pos, t_collectable.x_pos + 10, t_collectable.y_pos + 30);
        //Verticle line for the shape of the gem
        strokeWeight(2);
        stroke(0, 0, 0);
        line(t_collectable.x_pos + 10, t_collectable.y_pos - 20, t_collectable.x_pos + 10, t_collectable.y_pos + 30);
        //Horizontal line for the shape of the gem
        strokeWeight(2);
        stroke(0, 0, 0);
        line(t_collectable.x_pos, t_collectable.y_pos, t_collectable.x_pos + 20, t_collectable.y_pos);
}

// Function to check character has collected an item.
function checkCollectable(t_collectable)
{
    if(dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 73)
        {
            t_collectable.isFound = true;
            collectableSound.play();
            game_score += 1;
        }
}

//Function to draw boost.
function drawBoost(t_boost)
{
    push();
    //Trying to draw boost
    fill(255);
    rect(t_boost.x_pos, t_boost.y_pos, 20, 50, 5);
    rect(t_boost.x_pos, t_boost.y_pos + 5, 20, 40);
    fill(255, 0, 255);
    rect(t_boost.x_pos, t_boost.y_pos + 12, 20, 25)
    fill(255);
    rect(t_boost.x_pos + 10, t_boost.y_pos - 6, 5, 6, 2.5);
    fill(0);
    textSize(10);
    text("W", t_boost.x_pos + 5, t_boost.y_pos + 28);
    
    pop();
     
}

// Function to check character has collected a boost.
function checkBoost(t_boost)
{
    if(dist(gameChar_world_x, gameChar_y, t_boost.x_pos, t_boost.y_pos) < 73)
        {
            t_boost.isFound = true;
            boostSound.play();
            lives += 1;
        
        }
}

function renderFlagpole()
{
    push();
    
    strokeWeight(4);
    stroke(0);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    fill(255, 0, 255);
    strokeWeight(2.15);
    stroke(0);
    
    if(flagpole.isReached)
        {
            rect(flagpole.x_pos, floorPos_y - 250, 100, 50);
            strokeWeight(2);
            stroke(255);
            fill(255);
            text("Winner!", flagpole.x_pos + 13, floorPos_y - 220);
        }
    else
        {
            rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
            strokeWeight(2);
            stroke(255);
            fill(255);
            text("W", flagpole.x_pos + 15, floorPos_y - 20);
        }
    
    pop();
}

function checkFlagpole()
{
    var d = abs(gameChar_world_x - flagpole.x_pos);
    
    if(d < 15)
    {
        flagpole.isReached = true;
    }
}

function createPlatforms(x, y, length)
{
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function(){
            fill(34,139,34);
            rect(this.x, this.y, this.length, 20, 15);
            
            //flower centers
            fill(240, 230, 140);
            ellipse(this.x + 15, this.y + 10, this.length/25);
            ellipse(this.x + 35, this.y + 12, this.length/20);
            ellipse(this.x + 85, this.y + 8, this.length/30);
            ellipse(this.x + 125, this.y + 10, this.length/25);
            ellipse(this.x + 175, this.y + 13, this.length/35);
            
            //flower petals hot pink
            fill(255, 105, 180);
            ellipse(this.x + 5, this.y + 10, this.length/15, 10);
            ellipse(this.x + 25, this.y + 10, this.length/15, 10);
            ellipse(this.x + 14, this.y + 2, this.length/15, 10);
            ellipse(this.x + 14, this.y + 18, this.length/15, 10);
            
            //flower petals dark turquoise
            fill(0, 206, 209);
            ellipse(this.x + 30, this.y + 11, this.length/22, 8);
            ellipse(this.x + 44, this.y + 11, this.length/22, 8);
            ellipse(this.x + 36, this.y + 5, this.length/22, 8);
            ellipse(this.x + 36, this.y + 17, this.length/22, 8);
            
            //flower petals dark orange
            fill(255, 140, 0);
            ellipse(this.x + 78, this.y + 8, this.length/23, 6);
            ellipse(this.x + 92, this.y + 8, this.length/23, 6);
            ellipse(this.x + 85, this.y + 3, this.length/23, 6);
            ellipse(this.x + 85, this.y + 13, this.length/23, 6);
            
            //flower petals bisque
            fill(176, 224, 230);
            ellipse(this.x + 115, this.y + 10, this.length/15, 10);
            ellipse(this.x + 134, this.y + 10, this.length/15, 10);
            ellipse(this.x + 124, this.y + 3, this.length/15, 10);
            ellipse(this.x + 124, this.y + 18, this.length/15, 10);
            
            //flower petals fire brick
            fill(178, 34, 34);
            ellipse(this.x + 168, this.y + 13, this.length/23, 6);
            ellipse(this.x + 182, this.y + 13, this.length/23, 6);
            ellipse(this.x + 175, this.y + 8, this.length/23, 6);
            ellipse(this.x + 175, this.y + 18, this.length/23, 6);
        },
        
        checkContact: function(gameChar_x, gameChar_y){
            if(gameChar_x > this.x && gameChar_x < this.x + this.length)
                {
                    var d = this.y - gameChar_y;
                    if(d >= 0 && d < 5)
                        {
                            return true;
                        }
                }
            return false;
        }
    }
    
    return p;
}

function Enemy(x, y, range)
{
    this.x = x;
    this.y = y;
    this.range = range;
    
    this.currentX = x;
    //Short for increment
    this.inc = 1;
    
    this.update = function()
        {
            this.currentX += this.inc;
        
            if(this.currentX >= this.x + this.range)
                {
                    this.inc = -1;
                }
            else if(this.currentX < this.x)
                {
                    this.inc = 1;
                }
        }
    this.draw = function()
    {
        this.update();
        //the enemy character
        if(isLeft == true && isFalling == true && gameChar_world_x < this.currentX)
            {
                //Enemy's wings: Dark Red
                stroke(0);
                strokeWeight(2);
                fill(139, 0, 0);
                triangle(this.currentX + 70, this.y - 50, this.currentX + 10, this.y - 50, this.currentX + 10, this.y - 20);
                triangle(this.currentX + 75, this.y - 50, this.currentX + 15, this.y - 50, this.currentX + 15, this.y - 20);
                
                //Enemy's hair: White
                stroke(0);
                strokeWeight(2);
                fill(255);
                rect(this.currentX - 17, this.y - 75, 38, 38, 15);

                //Enemy's head: Light Steel Blue
                stroke(0);
                strokeWeight(2);
                fill(176, 196, 222);
                ellipse(this.currentX, this.y - 58, 35);

                //Enemy's mouth: Pink
                stroke(0);
                strokeWeight(2);
                fill(255, 192, 203);
                ellipse(this.currentX - 12, this.y - 50, 8);

                //Enemy's eyes: Crimson
                //The L white part
                stroke(0);
                strokeWeight(2);
                fill(255);
                ellipse(this.currentX - 5, this.y - 62, 15);

                //The L crimson part
                stroke(0);
                strokeWeight(0.25);
                fill(220, 20, 60);
                ellipse(this.currentX - 5, this.y - 62, 9);

                //The L black part
                stroke(0);
                strokeWeight(0.25);
                fill(0);
                ellipse(this.currentX - 5, this.y - 62, 6);

                //The L tiny white part
                stroke(0);
                strokeWeight(0);
                fill(255);
                ellipse(this.currentX - 5, this.y - 62, 2);
                
                //Enemy's horns: Dark Red
                stroke(0);
                strokeWeight(2);
                fill(139, 0, 0);
                triangle(this.currentX - 2, this.y - 70, this.currentX - 7, this.y - 85, this.currentX - 12, this.y - 70);
                triangle(this.currentX, this.y - 70, this.currentX - 5, this.y - 85, this.currentX - 10, this.y - 70);

                //Enemy's fringe: White
                stroke(0);
                strokeWeight(2);
                fill(255);
                ellipse(this.currentX, this.y - 69, 33, 13);

                //Enemy's legs: White
                //Left leg
                stroke(0);
                strokeWeight(2);
                fill(255);
                rect(this.currentX - 8, this.y - 28, 8, 28, 10);
                //Right leg
                rect(this.currentX + 3, this.y - 28, 8, 23, 10);

                //Enemy's body: Crimson
                stroke(0);
                strokeWeight(2);
                fill(220, 20, 60);
                quad(this.currentX - 8, this.y - 42, 
                     this.currentX + 9, this.y - 42, 
                     this.currentX + 13, this.y - 15,
                     this.currentX - 5, this.y - 15);
                
                //Enemy's teeth: White
                stroke(0);
                strokeWeight(1);
                fill(255);
                triangle(this.currentX - 14, this.y - 50, this.currentX - 13, this.y - 35, this.currentX - 10, this.y - 50);

                //Enemys's arm: Light Steel Blue
                //Left arm
                stroke(0);
                strokeWeight(2);
                fill(176, 196, 222);
                ellipse(this.currentX + 4, this.y - 40, 5, 10);
            }
        else if(isRight == true && isFalling == true && gameChar_world_x > this.currentX)
            {
                //Enemy's wings: Dark Red
                stroke(0);
                strokeWeight(2);
                fill(139, 0, 0);
                triangle(this.currentX - 70, this.y - 50, this.currentX - 10, this.y - 50, this.currentX - 10, this.y - 20);
                triangle(this.currentX - 75, this.y - 50, this.currentX - 15, this.y - 50, this.currentX - 15, this.y -20);
                
                //Enemy's hair: White
                stroke(0);
                strokeWeight(2);
                fill(255);
                rect(this.currentX - 21, this.y - 75, 38, 38, 15);

                //Enemy's head: Light Steel Blue
                stroke(0);
                strokeWeight(2);
                fill(176, 196, 222);
                ellipse(this.currentX, this.y - 58, 35);

                //Enemy's mouth: Pink
                stroke(0);
                strokeWeight(2);
                fill(255, 192, 203);
                ellipse(this.currentX + 12, this.y - 50, 8);

                //Enemy's eyes: Crimson
                //The L white part
                stroke(0);
                strokeWeight(2);
                fill(255);
                ellipse(this.currentX + 8, this.y - 62, 15);

                //The L crimson part
                stroke(0);
                strokeWeight(0.25);
                fill(220, 20, 60);
                ellipse(this.currentX + 8, this.y - 62, 9);

                //The L black part
                stroke(0);
                strokeWeight(0.25);
                fill(0);
                ellipse(this.currentX + 8, this.y - 62, 6);

                //The L tiny white part
                stroke(0);
                strokeWeight(0);
                fill(255);
                ellipse(this.currentX + 8, this.y - 62, 2);
                
                //Enemy's horns: Dark Red
                stroke(0);
                strokeWeight(2);
                fill(139, 0, 0);
                triangle(this.currentX + 2, this.y - 70, this.currentX + 7, this.y - 85, this.currentX + 12, this.y - 70);
                triangle(this.currentX, this.y - 70, this.currentX + 5, this.y - 85, this.currentX + 10, this.y - 70);

                //Enemy's fringe: White
                stroke(0);
                strokeWeight(2);
                fill(255);
                ellipse(this.currentX, this.y - 69, 33, 13);

                //Enemy's legs: White
                //Left leg
                stroke(0);
                strokeWeight(2);
                fill(255);
                rect(this.currentX, this.y - 28, 8, 28, 10);
                //Right leg
                rect(this.currentX - 11, this.y - 28, 8, 23, 10);

                //Enemy's body: Crimson
                stroke(0);
                strokeWeight(2);
                fill(220, 20, 60);
                quad(this.currentX - 8, this.y - 42, 
                     this.currentX + 9, this.y - 42, 
                     this.currentX + 5, this.y - 15,
                     this.currentX - 13, this.y - 15);
                
                //Enemy's teeth: White
                stroke(0);
                strokeWeight(1);
                fill(255);
                triangle(this.currentX + 14, this.y - 50, this.currentX + 13, this.y - 35, this.currentX + 10, this.y - 50);

                //Enemy's arm: Light Steel Blue
                //Right arm
                stroke(0);
                strokeWeight(2);
                fill(176, 196, 222);
                ellipse(this.currentX - 4, this.y - 40, 5, 10);
            }
        else if(isLeft == true && gameChar_world_x < this.currentX)
            {
                //Enemy's wings: Dark Red
                stroke(0);
                strokeWeight(2);
                fill(139, 0, 0);
                triangle(this.currentX + 40, this.y - 50, this.currentX + 10, this.y - 50, this.currentX + 10, this.y + 10);
                triangle(this.currentX + 45, this.y - 50, this.currentX + 15, this.y - 50, this.currentX + 15, this.y + 10);
                
                //Enemy's hair: White
                stroke(0);
                strokeWeight(2);
                fill(255);
                rect(this.currentX - 17, this.y - 75, 38, 38, 15);

                //Enemy's head: Light Steel Blue
                stroke(0);
                strokeWeight(2);
                fill(176, 196, 222);
                ellipse(this.currentX, this.y - 58, 35);

                //Enemy's mouth: Pink
                stroke(0);
                strokeWeight(2);
                fill(255, 192, 203);
                ellipse(this.currentX - 12, this.y - 50, 8, 6);
                
                //Enemy's teeth: White
                stroke(0);
                strokeWeight(1);
                fill(255);
                triangle(this.currentX - 15, this.y - 50, this.currentX - 13, this.y - 40, this.currentX - 11, this.y - 50);

                //Enemy's eyes: Crimson
                //The L white part
                stroke(0);
                strokeWeight(2);
                fill(255);
                ellipse(this.currentX - 5, this.y - 62, 15);

                //The L crimson part
                stroke(0);
                strokeWeight(0.25);
                fill(220, 20, 60);
                ellipse(this.currentX - 5, this.y - 62, 9);

                //The L black part
                stroke(0);
                strokeWeight(0.25);
                fill(0);
                ellipse(this.currentX - 5, this.y - 62, 6);

                //The L tiny white part
                stroke(0);
                strokeWeight(0);
                fill(255);
                ellipse(this.currentX - 5, this.y - 62, 2);
                
                //Enemy's horns: Dark Red
                stroke(0);
                strokeWeight(2);
                fill(139, 0, 0);
                triangle(this.currentX - 2, this.y - 70, this.currentX - 7, this.y - 85, this.currentX - 12, this.y - 70);
                triangle(this.currentX, this.y - 70, this.currentX - 5, this.y - 85, this.currentX - 10, this.y - 70);

                //Enemy's fringe: White
                stroke(0);
                strokeWeight(2);
                fill(255);
                ellipse(this.currentX, this.y - 69, 33, 13);

                //Enemy's legs: White
                //Left leg
                stroke(0);
                strokeWeight(2);
                fill(255);
                rect(this.currentX - 8, this.y - 28, 8, 28, 10);
                //Right leg
                rect(this.currentX - 3, this.y - 28, 8, 28, 10);

                //Enemy's body: Crimson
                stroke(0);
                strokeWeight(2);
                fill(220, 20, 60);
                quad(this.currentX - 8, this.y - 42, 
                     this.currentX + 9, this.y - 42, 
                     this.currentX + 13, this.y - 15,
                     this.currentX - 13, this.y - 15);

                //Enemy's arm: Light Steel Blue
                //Left arm
                stroke(0);
                strokeWeight(2);
                fill(176, 196, 222);
                ellipse(this.currentX + 4, this.y - 30, 5, 10);
            }
        else if(isRight == true && gameChar_world_x > this.currentX)
            {
                //Enemy's wings: Dark Red
                stroke(0);
                strokeWeight(2);
                fill(139, 0, 0);
                triangle(this.currentX - 40, this.y - 50, this.currentX - 10, this.y - 50, this.currentX - 10, this.y + 10);
                triangle(this.currentX - 45, this.y - 50, this.currentX - 15, this.y - 50, this.currentX - 15, this.y + 10);
                
                //Enemy's hair: White
                stroke(0);
                strokeWeight(2);
                fill(255);
                rect(this.currentX - 21, this.y - 75, 38, 38, 15);

                //Enemy's head: Light Steel Blue
                stroke(0);
                strokeWeight(2);
                fill(176, 196, 222);
                ellipse(this.currentX, this.y - 58, 35);

                //Enemy's mouth: Pink
                stroke(0);
                strokeWeight(2);
                fill(255, 192, 203);
                ellipse(this.currentX + 12, this.y - 50, 8, 6);
                
                //Enemy's teeth: White
                stroke(0);
                strokeWeight(1);
                fill(255);
                triangle(this.currentX + 15, this.y - 50, this.currentX + 13, this.y - 40, this.currentX + 11, this.y - 50);

                //Enemy's eyes: Crimson
                //The R white part
                stroke(0);
                strokeWeight(2);
                fill(255);
                ellipse(this.currentX + 5, this.y - 62, 15);

                //The R crimson part
                noStroke(0);
                fill(220, 20, 60);
                ellipse(this.currentX + 5, this.y - 62, 9);

                //The R black part
                stroke(0);
                strokeWeight(0.25);
                fill(0);
                ellipse(this.currentX + 5, this.y - 62, 6);

                //The R tiny white part
                stroke(0);
                strokeWeight(0);
                fill(255);
                ellipse(this.currentX + 5, this.y - 62, 2);

                //Enemy's horns: Dark Red
                stroke(0);
                strokeWeight(2);
                fill(139, 0, 0);
                triangle(this.currentX + 2, this.y - 70, this.currentX + 7, this.y - 85, this.currentX + 12, this.y - 70);
                triangle(this.currentX, this.y - 70, this.currentX + 5, this.y - 85, this.currentX + 10, this.y - 70);
                
                //Enemy's fringe: White
                stroke(0);
                strokeWeight(2);
                fill(255);
                ellipse(this.currentX, this.y - 69, 33, 13);

                //Enemy's legs: White
                //Left leg
                stroke(0);
                strokeWeight(2);
                fill(255);
                rect(this.currentX - 5, this.y - 28, 8, 28, 10);
                //Right leg
                rect(this.currentX, this.y - 28, 8, 28, 10);

                //Enemy's body: Crimson
                stroke(0);
                strokeWeight(2);
                fill(220, 20, 60);
                quad(this.currentX - 8, this.y - 42, 
                     this.currentX + 9, this.y - 42, 
                     this.currentX + 13, this.y - 15,
                     this.currentX - 13, this.y - 15);

                //Enemy's arm: Light Steel Blue
                //Right arm
                stroke(0);
                strokeWeight(2);
                fill(176, 196, 222);
                ellipse(this.currentX - 4, this.y - 30, 5, 10);
            }
        else if(isFalling == true || isPlummeting == true)
            {
                //Enemy's wings: Dark Red
                stroke(0);
                strokeWeight(2);
                fill(139, 0, 0);
                triangle(this.currentX - 70, this.y - 50, this.currentX - 10, this.y - 50, this.currentX - 10, this.y - 20);
                triangle(this.currentX + 70, this.y - 50, this.currentX + 10, this.y - 50, this.currentX + 10, this.y - 20);
                
                //Enemy's hair: White
                stroke(0);
                strokeWeight(2);
                fill(255);
                rect(this.currentX - 17, this.y - 68, 35, 30, 5);

                //Enemy's head: Light Steel Blue
                stroke(0);
                strokeWeight(2);
                fill(176, 196, 222);
                ellipse(this.currentX, this.y - 58, 35);

                //Enemy's mouth: Pink
                stroke(0);
                strokeWeight(2);
                fill(255, 192, 203);
                ellipse(this.currentX, this.y - 50, 8, 7);
                
                //Enemy's eyes: Crimson
                //The L white part
                stroke(0);
                strokeWeight(2);
                fill(255);
                ellipse(this.currentX - 10, this.y - 60, 15);
                //The R white part
                ellipse(this.currentX + 10, this.y - 60, 15);

                //The L crimson part
                stroke(0);
                strokeWeight(0.25);
                fill(220, 20, 60);
                ellipse(this.currentX - 8, this.y - 60, 11);
                //The R crimson part
                ellipse(this.currentX + 8, this.y - 60, 11);

                //The L black part
                stroke(0);
                strokeWeight(0.25);
                fill(0);
                ellipse(this.currentX - 8, this.y - 60, 6);
                //The R black part
                ellipse(this.currentX + 8, this.y - 60, 6);

                //The L tiny white part
                stroke(0);
                strokeWeight(0);
                fill(255);
                ellipse(this.currentX - 8, this.y - 60, 2);
                //The R tiny white part
                ellipse(this.currentX + 8, this.y - 60, 2);
                
                //Enemy's horns: Dark Red
                stroke(0);
                strokeWeight(2);
                fill(139, 0, 0);
                triangle(this.currentX + 2, this.y - 70, this.currentX + 7, this.y - 85, this.currentX + 12, this.y - 70);
                triangle(this.currentX - 2, this.y - 70, this.currentX - 7, this.y - 85, this.currentX - 12, this.y - 70);

                //Enemy's fringe: White
                stroke(0);
                strokeWeight(2);
                fill(255);
                ellipse(this.currentX, this.y - 69, 33, 15);

                //Enemy's legs: White
                //Left leg
                stroke(0);
                strokeWeight(2);
                fill(255);
                rect(this.currentX - 10, this.y - 28, 8, 23, 10);
                //Right leg
                rect(this.currentX + 2, this.y - 28, 8, 23, 10);

                //Enemy's body: Crimson
                stroke(0);
                strokeWeight(2);
                fill(220, 20, 60);
                quad(this.currentX - 8, this.y - 42, 
                     this.currentX + 9, this.y - 42, 
                     this.currentX + 13, this.y - 15,
                     this.currentX - 13, this.y - 15);
                
                //Enemy's teeth: White
                stroke(0);
                strokeWeight(1);
                fill(255);
                triangle(this.currentX - 4, this.y - 50, this.currentX - 3, this.y - 35, this.currentX, this.y - 50);
                triangle(this.currentX + 4, this.y - 50, this.currentX + 3, this.y - 35, this.currentX, this.y - 50);

                //Enemy's arm: Light Steel Blue
                //Left arm
                stroke(0);
                strokeWeight(2);
                fill(176, 196, 222);
                ellipse(this.currentX - 8, this.y - 44, 5, 10);
                //Right arm
                ellipse(this.currentX + 8, this.y - 44, 5, 10);
            }
        else
            {
                //Enemy's wings: Dark Red
                stroke(0);
                strokeWeight(2);
                fill(139, 0, 0);
                triangle(this.currentX - 40, this.y - 50, this.currentX - 10, this.y - 50, this.currentX - 10, this.y + 10);
                triangle(this.currentX + 40, this.y - 50, this.currentX + 10, this.y - 50, this.currentX + 10, this.y + 10);
                
                //Enemy's hair: White
                stroke(0);
                strokeWeight(2);
                fill(255);
                rect(this.currentX - 17, this.y - 68, 35, 30, 5);

                //Enemy's head: Light Steel Blue
                stroke(0);
                strokeWeight(2);
                fill(176, 196, 222);
                ellipse(this.currentX, this.y - 58, 35);

                //Enemy's mouth: Pink
                stroke(0);
                strokeWeight(2);
                fill(255, 192, 203);
                ellipse(this.currentX, this.y - 50, 8, 5);
                
                //Enemy's teeth: White
                stroke(0);
                strokeWeight(1);
                fill(255);
                triangle(this.currentX - 5, this.y - 50, this.currentX - 3, this.y - 40, this.currentX - 1, this.y - 50);
                triangle(this.currentX + 5, this.y - 50, this.currentX + 3, this.y - 40, this.currentX + 1, this.y - 50);
                
                //Enemy's eyes: Crimson
                //The L white part
                stroke(0);
                strokeWeight(2);
                fill(255);
                ellipse(this.currentX - 10, this.y - 60, 15);
                //The R white part
                ellipse(this.currentX + 10, this.y - 60, 15);

                //The L crimson part
                stroke(0);
                strokeWeight(0.25);
                fill(220, 20, 60);
                ellipse(this.currentX - 8, this.y - 60, 11);
                //The R crimson part
                ellipse(this.currentX + 8, this.y - 60, 11);

                //The L black part
                stroke(0);
                strokeWeight(0.25);
                fill(0);
                ellipse(this.currentX - 8, this.y - 60, 6);
                //The R black part
                ellipse(this.currentX + 8, this.y - 60, 6);

                //The L tiny white part
                stroke(0);
                strokeWeight(0);
                fill(255);
                ellipse(this.currentX - 8, this.y - 60, 2);
                //The R tiny white part
                ellipse(this.currentX + 8, this.y - 60, 2);

                //Enemy's horns: Dark Red
                stroke(0);
                strokeWeight(2);
                fill(139, 0, 0);
                triangle(this.currentX + 2, this.y - 70, this.currentX + 7, this.y - 85, this.currentX + 12, this.y - 70);
                triangle(this.currentX - 2, this.y - 70, this.currentX - 7, this.y - 85, this.currentX - 12, this.y - 70);
                
                //Enemy's fringe: White
                stroke(0);
                strokeWeight(2);
                fill(255);
                ellipse(this.currentX, this.y - 69, 33, 15);
            
                //Enemy's legs: White
                //Left leg
                stroke(0);
                strokeWeight(2);
                fill(255);
                rect(this.currentX - 10, this.y - 28, 8, 28, 10);
                //Right leg
                rect(this.currentX + 2, this.y - 28, 8, 28, 10);
                
                //Enemy's body: Crimson
                stroke(0);
                strokeWeight(2);
                fill(220, 20, 60);
                quad(this.currentX - 8, this.y - 42, 
                     this.currentX + 9, this.y - 42, 
                     this.currentX + 13, this.y - 15,
                     this.currentX - 13, this.y - 15);

                //Enemy's arm: Light Steel Blue
                //Left arm
                stroke(0);
                strokeWeight(2);
                fill(176, 196, 222);
                ellipse(this.currentX - 8, this.y - 24, 5, 10);
                //Right arm
                ellipse(this.currentX + 8, this.y - 24, 5, 10);
            }
        }
        
    this.checkContact = function(gameChar_x, gameChar_y)
    {
        var d = dist(gameChar_x, gameChar_y, this.currentX, this.y)
        
        if(d < 45)
            {
                return true;
            }
        return false;
    }
    
    
    
}




// Copyright © 2022 Worthy Goldman
