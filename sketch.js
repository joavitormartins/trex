  var trex,trexC,chao,chaoIM,SC,nuvens,IMGN,CT,tempo;
 var IMGCT1,IMGCT2,IMGCT3,IMGCT4,IMGCT5,IMGCT6,escolherCatos;
 var TXCLD,fimejogo,reiniciar,imgfim,imgreiniciar;

var somP,somM,somC;

const JOGAR=0;
const ENCERRAR=1;
var estadojogo = JOGAR ;


function preload(){
  
  
  TXCLD = loadAnimation("trex_collided.png");
  trexC = loadAnimation("trex1.png","trex2.png","trex3.png");
  
  chaoIM = loadImage("ground2.png");
  IMGN = loadImage("cloud.png");
  
  IMGCT1 = loadImage("obstacle1.png");
  IMGCT2 = loadImage("obstacle2.png");
  IMGCT3 = loadImage("obstacle3.png");
  IMGCT4 = loadImage("obstacle4.png");
  IMGCT5 = loadImage("obstacle5.png");
  IMGCT6 = loadImage("obstacle6.png");
  
  imgfim = loadImage("gameOver.png");
  imgreiniciar = loadImage("restart.png");
  
  somP = loadSound("jump.mp3");
  somM = loadSound("die.mp3");
  somC = loadSound("checkPoint.mp3");
  
  
}

function setup() {
  
createCanvas(600,200); 

 trex= createSprite (50,100,20,40);
 trex.addAnimation("correndo",trexC);
 trex.addAnimation("colidiu",TXCLD); 
 trex.scale = 0.5;
  
 chao = createSprite(200,180,500,10)
 chao.addAnimation("chao",chaoIM);
  SC = createSprite(200,190,500,10);
  SC.visible = false;
  
  tempo = 0;
  grupoCT = new Group();
  grupoNV = new Group();
  
  
  fimdejogo=createSprite(300,80,30,30);
  fimdejogo.addAnimation("fimdejogo",imgfim);
  fimdejogo.scale = 0.5;
  reiniciar=createSprite(300,120,30,30);
  reiniciar.addAnimation("reiniciar",imgreiniciar);
  reiniciar.scale = 0.5;
  
  
  
  
}



function draw() {
  
background(255); 
  text("tempo: "+tempo,500,30);
  
  if(estadojogo ==JOGAR) { 
    tempo = tempo +1
    
  
    if(tempo> 0 && tempo % 100 ==0){
      somC.play();
    }
    
    
    fimdejogo.visible = false;
    reiniciar.visible = false;
    
    
     chao.velocityX = -(7 + tempo / 100)
    
    
   
if(chao.x <0){
  chao.x = chao.width/2;
}  
  
if(keyDown("space") && trex.y> 161){
  trex.velocityY = -10;  
  somP.play();
}  
  
 trex.velocityY = trex.velocityY + 0.8; 
 trex.collide(SC);
    
    if(grupoCT.isTouching(trex)){
      estadojogo = ENCERRAR;
      somM.play();
      
    }
gerarNuvens();
gerarCT(); 
    
  }else if(estadojogo == ENCERRAR){ 
       chao.velocityX = 0;
    
    fimdejogo.visible = true;
    reiniciar.visible = true;
    
    grupoCT.setVelocityXEach(0);
    grupoNV.setVelocityXEach(0);
    
    grupoCT.setLifetimeEach(-1);
    grupoNV.setLifetimeEach(-1);
    trex.changeAnimation("colidiu",TXCLD)
    trex.velocityY = 0;
  
    if(mousePressedOver(reiniciar)){
     restart();
    }
  }
drawSprites();
}

function gerarNuvens(){
  if(frameCount % 100 == 0){
  nuvens=createSprite(600,50,50,10); 
  nuvens.addAnimation("nuvem",IMGN);  
  nuvens.y = Math.round(random(40,80)); 
    
    nuvens.depth = trex.depth
    trex.depth = trex.depth +1  
    
  nuvens.scale = 0.5 
  nuvens.velocityX=-3;
  nuvens.lifetime = 300 
  grupoNV.add(nuvens)  
 }
}

function gerarCT(){
if(frameCount % 60 == 0){
CT = createSprite(600,165,5,20)
CT.velocityX = -(7 + tempo / 100)
  
  escolherCatos = Math.round(random(1,6))
  
  switch(escolherCatos){
  case 1: CT.addImage(IMGCT1);
  CT.scale = 0.5;
  break;
  case 2: CT.addImage(IMGCT2);
  CT.scale = 0.5;    
  break;
  case 3: CT.addImage(IMGCT3);
  CT.scale = 0.5;    
  break;
  case 4: CT.addImage(IMGCT4);
  CT.scale = 0.5;    
  break;
  case 5: CT.addImage(IMGCT5);
  CT.scale = 0.4;
  break;
  case 6: CT.addImage(IMGCT6);
  CT.scale = 0.3;
  break;
  }
  CT.lifetime = 300
  grupoCT.add(CT)
}
  
}

function restart(){
 

  estadojogo = JOGAR;
  fimdejogo.visible = false;
  reiniciar.visible = false;
  
  grupoCT.destroyEach()
  grupoNV.destroyEach()
  trex.changeAnimation("correndo",trexC); 
  tempo = 0;
}

 