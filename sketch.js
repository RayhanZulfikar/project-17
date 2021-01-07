var PLAY = 1;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  background("white");
monkey = createSprite(50,180,20,50);
  monkey.addAnimation("monkey_running",monkey_running);
  
  monkey.scale = 0.1;
  
  ground = createSprite(200,180,400,20);
   ground.x = ground.width /2;
  
   invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
   obstacleGroup = createGroup();
FoodGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  score = 0;
}


function draw() {
 
  background(180);
  
  text("Score: "+ score, 500,50);
  if(gameState === PLAY){
    
    ground.velocityX = -(4 + 3* score/100)
   
    score = score + Math.round(frameCount/60);
 if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
}
  monkey.velocityY = monkey.velocityY + 0.8
    
    spawnbanana();
    spawnObstacle();
}
   else if (gameState === END) {
    
       

     
      ground.velocityX = 0;
    monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
   bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
bananaGroup.setVelocityXEach(0);  
     
     
     
     }
  monkey.collide(invisibleGround);
  
  drawSprites();  
}

function spawnObstacle(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -(6 + score/100);
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
 }
}

function spawnbanana() {
  //write code here to spawn the clouds
 if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
   banana.y = Math.round(random(80,120));
   banana.addImage(bananaImage);
  banana.scale = 0.5;
 banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
  banana.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;
 }
}