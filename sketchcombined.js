const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
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
//  boyImg = loadImage("boy.png");
}

function setup(){
  createCanvas(600,600);
  engine = Engine.create();
  world = engine.world;

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1.5;
  //image(towerImg, 0,-displayHeight*3, displayWidth, displayHeight*4);
  
  /*
  boy = createSprite(200,200,50,50);
  boy.scale = 0.05;
  boy.addImage(boyImg);
  boy.setCollider("rectangle",0,0,boy.width, boy.height)
  boy.debug = true;
*/
  ledgestart = new Ledge(300,200,70,30);
  ledgestart.debug = true;
  boy = new PlayingChar(200,500);
  Matter.Body.setStatic(boy.body, true);
  ledgesGroup = [];
  
  ghost1 = new Ghost(100, 50);
  ghost2 = new Ghost(width-200,50);
  stone1 = new Stone(300,100,50,50);
  stone2 = new Stone(width-300,300,30,30);
  stone1Sprite = createSprite();
  stone2Sprite = createSprite();
  link1 = new Link(ghost1.body, stone1.body);
  link2 = new Link(ghost2.body, stone2.body);
  score = 0;

  bullet1 = new Bullet(225,525);
  Matter.Body.setStatic(bullet1.body, true);

  topEdge = Bodies.rectangle(0,0,600,20, {isStatic:true});
  leftEdge = Bodies.rectangle(0,0,20,600, {isStatic:true});
  rightEdge = Bodies.rectangle(580,0,600,20, {isStatic:true});
  bottomEdge = Bodies.rectangle(0,580,600,20, {isStatic:true});

  World.add(world, [topEdge, leftEdge, rightEdge, bottomEdge, boy]);

  Matter.Events.on(engine, 'collisionStart', onCollision);


}

function draw(){
  background("yellow");
  Engine.update(engine);
 

  if (gameState === PLAY) {
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("left_arrow")){
     // boy.x = boy.x - 3;
    // Matter.Body.setStatic(boy.body, false);
     Matter.Body.translate(boy.body, {x:-3, y:0})
    }
    
    if(keyDown("right_arrow")){
     // boy.x = boy.x + 3;
     //Matter.Body.setStatic(boy.body, false);
     Matter.Body.translate(boy.body, {x:3, y:0})
    }
    
    if(keyDown("up_arrow") && boy.body.position.y >= 180){
      Matter.Body.setStatic(boy.body, false);
      Matter.Body.applyForce(boy.body, boy.body.position, {x:0, y:-100})
    }
    //boy.velocityY = boy.velocityY + 0.8
    if (keyDown("s")) { // letter 's' for shoot
      console.log("shoottttttttttt")
      Matter.Body.setStatic(bullet1.body, false);
      Matter.Body.applyForce(bullet1.body, bullet1.body.position, {x:0, y:-100});
    }
    /*
    if (keyIsDown("s")) {
      bullet.visible = true;
      bullet.velocityY = -10;
      bulletOff = true;
    }
    if (bulletOff) {
      if (bullet.isTouching(stone1Sprite)) {
        stone1Sprite.visible = false;
        score++;
        bullet.visible = false;
        bullet.x = 225;
        bullet.y = 225;
      }
      if (bullet.isTouching(stone2Sprite)) {
        stone2Sprite.visible = false;
        score++;
        bullet.visible = false;
        bullet.x = 225;
        bullet.y = 225;
      }
    }
    if (bullet.y < 0) bulletOff = false;
    */
    /*
    if (bullet.isTouching(ghost1)) {
      World.remove(world, ghost1)
      score++;
      bullet.visible = false;
      bullet.x = 225;
      bullet.y = 225;
    }
*/
    if (boy.body.position.y<=150) {
      link1.shoot();
      link2.shoot();
    }
    if (stone1.body.position.y > 600) {
      Matter.Body.setPosition(stone1.body, {x:300,y:100});
      link1.attach(stone1.body);
    }
    if (stone2.body.position.y > 600) {
      Matter.Body.setPosition(stone2.body, {x:width-300,y:300});
      link2.attach(stone2.body);
    }
    
    
    spawnLedges();
    //spawnGhosts();
   // if(ledgesGroup.isTouching(boy)){
     // boy.velocityY = 0;
    //}
    //if (stone1Sprite.isTouching(boy) || stone2Sprite.isTouching(boy)) {
      //score--;
   // }
    if(boy.body.position.y > 700 && boy.body.speed !== 0){
     // console.log(boy.y + "out out"+ boy.velocityY)
      gameState = END;
    }
    drawSprites();
  }
  else if (gameState === END){
   // ledgesGroup.setLifetimeEach(-1);
   // ledgesGroup.setVelocityYEach(0);
    drawSprites();
    stroke("yellow");
    fill("yellow");
    textSize(30);
   // boy.velocityY = 0;
    tower.velocityY = 0;
    text("Game Over", 230,250)
  }
  ledgestart.display();
  boy.display();
 ghost1.display();
 ghost2.display();
 stone1.display();
 stone2.display();
 link1.display();
 link2.display();

 bullet1.display();
 for (var i = 0; i < ledgesGroup.length; i++) {
   ledgesGroup[i].display();
 }

 push();
 fill("yellow");
 stroke("black")
 text("Score = "+ score, 500,50);
 pop();
}
function spawnLedges() {
  if (frameCount % 150 === 0) {
    var ledge = new Ledge(0,0,70,20);
    ledge.body.position.x = Math.round(random(50,550));
    ledge.body.position.y = Math.round(random(10,550));
    //Matter.Body.setVelocity(ledge.body, {x:0, y:-1})
    ledgesGroup.push(ledge)
  }
}
function spawnLedgesold() {
  if (frameCount % 240 === 0) {
    var ledge = createSprite(200, -50,30,20);
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
 // if (frameCount%100 === 0) {
    ghost1 = new Ghost(100, 100);
    ghost2 = new Ghost(width-100,300);
    stone1 = new Stone(100,100)
    stone2 = new Stone(width-100,300)
    link1 = new Link(ghost1.body, stone1.body);
    link2 = new Link(ghost2.body, stone2.body);
    
 // }
}

function onCollision(event) {
    var pairs = event.pairs;
    for (var i= 0; i < pairs.length; i++) {
      var labelA = pairs[i].bodyA.label;
      var labelB = pairs[i].bodyB.label;
      if ((labelA === 'PC' && labelB === 'stone') ||
      (labelA === 'stone' && labelB === 'PC') ) {
        console.log("collision between PC and stone")
      }
      if ((labelA === 'PC' && labelB === 'ghost') ||
      (labelA === 'ghost' && labelB === 'PC') ) {
        console.log("collision between PC and ghost")
      }
      if ((labelA === 'bullet' && labelB === 'stone') ||
      (labelA === 'stone' && labelB === 'bullet') ) {
        console.log("collision between bullet and stone")
      }
      if ((labelA === 'bullet' && labelB === 'ghost') ||
      (labelA === 'ghost' && labelB === 'bullet') ) {
        console.log("collision between bullet and ghost")
      }

    }
 }