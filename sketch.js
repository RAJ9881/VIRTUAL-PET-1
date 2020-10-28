

var dog_Img,happyDog_Img,milk_Img;
var database;
var foodS,foodStock;

function preload(){
  dog_Img=loadImage("../images/dogImg.png");
  happyDog_Img=loadImage("../images/dogImg1.png");
  }


function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dog_Img );
  dog.scale=0.20;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}


function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog_Img);
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
 

textSize(20);
fill("yellow");
text("Press the up arrow to feed the dog!",130,10,300,20);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}