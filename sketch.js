//Variables
var database;
var dog, foodObject;
var dogHappy, dogNeutral, dogDead, milkBottleImg, BedRoomImg, LivingRoomImg, WashRoomImg, GardenImg;
var gameStateRef, gameState = 0, foodStockRef, foodS, feedTimeRef, lastSnack, currentTime;

//Load Images
function preload()
{
  dogNeutral = loadImage("Images/dogNeutral.png");
  milkBottleImg = loadImage("Images/milkBottle.png");
  BedRoomImg = loadImage("Images/BedRoom.png");
  LivingRoomImg = loadImage("Images/LivingRoom.png");
  WashRoomImg = loadImage("Images/WashRoom.png");
  GardenImg = loadImage("Images/Garden.png");
}

//Initialize Variables and Create Sprites
function setup()
{
  createCanvas(500, 600);
  database = firebase.database();

  dog = createSprite(250, 425, 50, 50);
  dog.addImage(dogNeutral);
  dog.scale = 0.20;

  foodObject = new Food();
}

//Call Functions
function draw()
{
  background(46, 139, 87);

  foodObject.executeFunctions();

  drawSprites();
}
  



