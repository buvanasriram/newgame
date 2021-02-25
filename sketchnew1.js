const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
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
  createCanvas(displayWidth-20,displayHeight-30);
  engine = Engine.create();
  world = engine.world;
  ledgesGroup = [];
  ghostsGroup = [];
  stonesGroup = [];
  linksGroup = [];

  
  
  //create ledges
  for (var i = 0; i < 7; i++) {
    var x = Math.round(random(100,500));
    var y = Math.round(random(-height*4,height-300))
    var ledge = new Ledge(x,y,70,20);
    ledgesGroup.push(ledge)
  }
  
  // create ghost and stones and links between them
  for (var i = 0; i < 4; i++) {
    var y = Math.round(random(-height*4,height-300))
    
    if (i%2 === 0) x = 100;
    else x = width-300;

    ghost = new Ghost(x,y,100,150);
    ghostsGroup.push(ghost);
    
    stone = new Stone(x+200, y+50, 50,50 )
    stonesGroup.push(stone);
    
    link = new Link(ghost.body, stone.body);
    linksGroup.push(link);
  }

  
  boy = new PlayingChar(300,displayHeight);
  Matter.Body.setStatic(boy.body, true);
  
  score = 0;

  bullet1 = new Bullet(225,525);
  Matter.Body.setStatic(bullet1.body, true);

  topEdge = Bodies.rectangle(0,0,600,20, {isStatic:true});
  leftEdge = Bodies.rectangle(0,0,20,600, {isStatic:true});
  rightEdge = Bodies.rectangle(580,0,600,20, {isStatic:true});
  bottomEdge = Bodies.rectangle(0,580,600,20, {isStatic:true});

  World.add(world, [topEdge, leftEdge, rightEdge, bottomEdge]);

  Matter.Events.on(engine, 'collisionStart', onCollision);

}

function draw(){
  background("yellow");
  Engine.update(engine);
  image(towerImg, 0,-displayHeight*3, displayWidth, displayHeight*4);
  bullet1.display();
  boy.display();
 
  push();
  fill("yellow");
  stroke("black")
  text("Score = "+ score, 500,50);
  pop();
  //image(towerImg, 0,-displayHeight*3, displayWidth, displayHeight*4);
  for (var i = 0; i < ledgesGroup.length; i++) {
    ledgesGroup[i].display();
  }
  for (var i = 0; i < ghostsGroup.length; i++) {
    ghostsGroup[i].display();
    stonesGroup[i].display();
    linksGroup[i].display();
  }


  if (gameState === PLAY) {
    camera.position.x = displayWidth/2;
    //camera.position.y = boy.body.position.y;
    if(keyDown("left_arrow")){
    // Matter.Body.setStatic(boy.body, false);
     //Matter.Body.translate(boy.body, {x:-3, y:0})
     Matter.Body.applyForce(boy.body, boy.body.position, {x:-10, y:0})
    }
    
    if(keyDown("right_arrow")){
     //Matter.Body.setStatic(boy.body, false);
     //Matter.Body.translate(boy.body, {x:3, y:0})
     Matter.Body.applyForce(boy.body, boy.body.position, {x:10, y:0})
    }
    
    if(keyIsDown(38)){
     // Matter.Body.setStatic(boy.body, false);
      console.log("in up")
      Matter.Body.applyForce(boy.body, boy.body.position, {x:0, y:-100})
     // Matter.Body.translate(boy.body, {x:0, y:-3})
    }
    if (keyDown("s")) { // letter 's' for shoot
      console.log("shoottttttttttt")
      Matter.Body.setStatic(bullet1.body, false);
      Matter.Body.applyForce(bullet1.body, bullet1.body.position, {x:0, y:-100});
    }
    for (var i = 0; i < 4; i++) {
      if (stonesGroup[i].body.position.y-boy.body.position.y <100) {
        linksGroup[i].shoot();
      }
    }
    for (var i = 0; i < 4; i++) {
      if (stonesGroup[i].body.position.y > 600) {
        var gpos = ghostsGroup[i].body.position;
        Matter.Body.setPosition(stonesGroup[i].body, {x:gpos.x+200,y:gpos.y+50});
        linksGroup[i].attach(stonesGroup[i].body);
      }
    }
  
    if(boy.body.position.y > 700 && boy.body.speed !== 0){
      gameState = END;
    }
  }
  else if (gameState === END){

    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  

 
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