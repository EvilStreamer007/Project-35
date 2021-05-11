
//Create variables here
var Dog;
var Dog_img;
var HappyDog;
var Happydog_img;

var dog_Food;
var Foodstock;

var milk;
var milk_img;

var Database;

var score;

function preload(){
  //load images here
  Dog_img = loadImage("images/dogImg.png");
  Happydog_img = loadImage("images/dogImg1.png");
  milk_img = loadImage("images/Milk.png")
}

function setup() {
	createCanvas(500, 500);
  
  Dog = createSprite(250,200,5,5);
  Dog.addImage(Dog_img);
  Dog.scale = 0.2;

  Database = firebase.database();
  Foodstock = Database.ref('Food');
  Foodstock.on("value",readstock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
      writestock(dog_Food);
      Dog.addImage(Happydog_img);
  }

  drawSprites();
  //add styles here
  fill("cyan");
  //add font size
  text("Remaining Food: "+dog_Food,230,70);
  text("Press UP Arrow Key to feed the Dog",230,85)
}

function readstock(data){
    dog_Food = data.val();
    console.log(dog_Food);
}

function writestock(x){
  
    if(x <= 0){
       x = 0;
    }else{
       x = x-1;
    }

    Database.ref('/').update({
      Food:x
    })
}


