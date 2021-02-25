
var stone1Sprite, stone2Sprite;
var topEdge, bottomEdge, leftEdge, rightEdge;

const PLAY = 1;
const END = 0;
var score;
var bulletOff = false;
var engine, world, ghost1, ghost2, ghost3;


var towerImg, tower;
var ledgeImg, ledge, ledgesGroup;
var boy, boyImg, bulletImg;
var gameState = PLAY

function preload(){
  towerImg = loadImage("tower.png");
  ledgeImg = loadImage("ledge.png");
  boyImg = loadImage("boy.png");
  ghostImg = loadImage("ghost.png");
  stoneImg= loadImage("stone.png");
  bulletImg = loadImage("bullet.png");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1.5;
  
  boy = createSprite(200,500,50,50);
  
  boy.addImage(boyImg);
  boy.scale = 0.3;
  boy.setCollider("rectangle",0,-30,500,300)
  //boy.debug = true;

  ledgesGroup = createGroup();
  ghostsGroup = createGroup();
  stonesGroup = createGroup();
  movingStonesGroup = createGroup();
 
  score = 0;
/*
  bullet = createSprite(225,525);
  bullet.addImage(bulletImg);
  bullet.visible = false;
  bullet.scale = 0.5;
*/
}

function draw(){
  background("yellow");
 

  if (gameState === PLAY) {
    tower.velocityY = 1;
    
    spawnLedges();
    spawnGhosts();
    stonesGroup.setColliderEach("rectangle", 0,0,200,400);

    if(tower.y > 400) tower.y = 300
    
    if(keyDown("left_arrow"))  boy.x = boy.x - 3;
    
    if(keyDown("right_arrow")) boy.x = boy.x + 3;
    
    if(keyDown("space") && boy.y >= 180) boy.velocityY = -10;
    
    boy.velocityY = boy.velocityY + 0.8;
    
    if (keyDown("s") && !bulletOff) {
      bullet = createSprite(225,525);
      bullet.x = boy.x+20;
      bullet.y = boy.y;
      bullet.addImage(bulletImg);
      bullet.scale = 0.5;
      bullet.velocityY = -10;
      bulletOff = true;
    }

    if (bulletOff) {
      hitTarget = false;
      if (bullet.isTouching(stonesGroup)) {
        for (var i= 0; i < stonesGroup.length; i++) {
          if (stonesGroup[i].isTouching(bullet)){
            stonesGroup[i].destroy(); 
            hitTarget = true;
            score +=100;         
          }
        }
      }
      if (bullet.isTouching(ghostsGroup)) {
        for (var i= 0; i < ghostsGroup.length; i++) {
          if (ghostsGroup[i].isTouching(bullet)){
            ghostsGroup[i].destroy();  
            hitTarget = true;
            score +=500;         
          }
        }
        
      }
      if (hitTarget || bullet.y < 0) { bullet.destroy(); bulletOff = false;}
    }
    
    
  

    if(ledgesGroup.isTouching(boy)){
        boy.velocityY = 0;
    }
    if (stonesGroup.isTouching(boy)) {
      for (var i= 0; i < stonesGroup.length; i++) {
        if (stonesGroup[i].isTouching(boy)){
          stonesGroup[i].velocityY=5;
          stonesGroup[i].setCollider("rectangle",0,0,0,0);
         // ghostsGroup[i].visible = false;
          movingStonesGroup.add(stonesGroup[i]);
         
        }
      }  
    }
    if (movingStonesGroup.isTouching(boy))  score-=50;

    if(boy.y > 700){
     // console.log(boy.y + "out out"+ boy.velocityY)
      gameState = END;
    }
    drawSprites();
  }
  else if (gameState === END){
    ledgesGroup.setLifetimeEach(-1);
    ledgesGroup.setVelocityYEach(0);
    ghostsGroup.setLifetimeEach(-1);
    ghostsGroup.setVelocityYEach(0);
    stonesGroup.setLifetimeEach(-1);
    stonesGroup.setVelocityYEach(0);
    boy.velocityY = 0;
    tower.velocityY = 0;

    drawSprites();
    stroke("yellow");
    fill("yellow");
    push()
    textSize(30);
    text("Game Over", 230,250)
    pop();
  }

 push();
 fill("yellow");
 stroke("black")
 text("Score = "+ score, 500,50);

 pop();
}

function spawnLedges() {
  if (frameCount % 100 === 0) {
    var ledge = createSprite(200, -50,80,40);
    ledge.x = Math.round(random(120,400));
    ledge.addImage(ledgeImg);
    ledge.scale = 0.1;
   // ledge.debug = true;
    ledge.velocityY = 1;
    ledge.lifetime = 800;
    boy.depth = ledge.depth;
    boy.depth +=1;
    ledgesGroup.add(ledge);
  }
}
function spawnGhosts() {
  if (frameCount%200 === 0) {
    ghost = createSprite(random(100,500), -50);
    ghost.addImage(ghostImg);
    ghost.scale = 0.5;
    ghost.velocityY = 1;
    ghost.lifetime = 600;
    stone = createSprite(ghost.x, ghost.y+20);
    stone.addImage(stoneImg);
    stone.scale = 0.5;
    stone.velocityY = 1;
    stone.lifetime = 600;
   // stone.setCollider("rectangle", 0,0,stone.width, stone.height+200);
  //  stone.debug=true;
    
    ghostsGroup.add(ghost);
    stonesGroup.add(stone);
    
 }
}

