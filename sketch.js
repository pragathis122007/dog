var dog,sadDog,happyDog;
var feed,addFood;
var foodObj;
var fedTime,lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  
  foodObj = new Food();

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

}

function draw() {
  background(46,139,87);
  
  fill (255,255,254);
  textSize(15);
  if (lastFed>+12){
    text("Last Feed : "+ lastFed%12 + "PM", 200,350);
  }else if (lastFed==0){
    text("Last Feed :12 AM",200,30);
  }else{
    text("Last Feed :"+ lastFed + "AM",200,30);
  }
  fedTime = database.ref(`FeedTime`);
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  foodObj.display();

  drawSprites();
}

//function to read food Stock


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  //if(foodObj.getFoodStock()<= 0){
    //foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  //}else{
    //foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  //}

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref(`/`).update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour ()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref(`/`).update({
    Food:foodS
  })
}