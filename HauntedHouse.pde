// Add your variables below!
Pumpkin pumpkin1, pumpkin2, pumpkin3;
Ghost ghost1, ghost2, ghost3;
Rain rainfall;
Lightning lightning;
Spotlight spotlight;

boolean grayscale = false;

// START HERE!
//
// Make a PImage variable for the scary house background
//  example: PImage scaryHouse
PImage scaryHouse;

void setup() {
  // Set the size of your sketch to at least 600, 400 using
  // the size() method.
  size(1200, 800);
  
  // Pick a scary house and initialize it using loadImage,
  //  example: scaryHouse = loadImage("scaryHouse1.jpg");
  scaryHouse = loadImage("scaryHouse1.jpg");
  
  // Resize your scary house to the window size using
  //  scaryHouse.resize(width, height);
  scaryHouse.resize(width, height);
  
  // DRAWING THE SCARY HOUSE
  //
  // In the draw function below, call drawBackground() with your
  // scary house as an input parameter
  // Do you see your scary house??
  
  // DRAWING THE PUMPKINS
  //
  // Create a new variable for a pumpkin at the top of this sketch
  // then initialize it to a new Pumpkin(x, pumpkinColor)
  //   example: myPumpkin = Pumpkin(350, #E26238);
  pumpkin1 = new Pumpkin(350, #E26238);
  pumpkin2 = new Pumpkin(550, #BE1DF0);
  pumpkin3 = new Pumpkin(850, #1DF029);
  
  // In the draw function below, call the pumpkin's draw() method
  // Do you see your pumpkin?
  
  // DRAWING THE GHOSTS
  //
  // Create a new variable for a ghost at the top of this sketch
  // then initialize it to a new Ghost(y, speed, flyingDirection)
  //   example: myGhost = Ghost(50, 5, "right");
  ghost1 = new Ghost(50, 5, "right");
  ghost2 = new Ghost(10, 3, "right");
  ghost3 = new Ghost(150, 8, "left");
  
  // In the draw function below, call the ghost's draw() method
  // Do you see your ghost?
  
  // DRAWING THE RAIN
  //
  // Create a new variable for the rain at the top of this sketch
  // then initialize it to new Rain(color)
  //   example: rainfall = new Rain();
  rainfall = new Rain(#ADD8E6);
  
  // In the draw function below, call the rain's draw() method
  // Do you see rain falling?
  
  // DRAWING THE LIGHTNING
  //
  // Create a new variable for the lightning at the top of this
  // sketch then initialize it to new Lightning()
  //   example: lightning = new Lightning();
  lightning = new Lightning();
  
  // In the draw function below, call the lightnings's draw()
  // method ONLY when the mouse is pressed
  // Do you see the lightning?
  
  // DRAWING THE SPOTLIGHT
  //
  // Create a new variable for the spotlight at the top of this
  // sketch then initialize it to new Spotlight()
  //   example: spotlight = new Spotlight();
  spotlight = new Spotlight();
}

void draw() {
  drawBackground(scaryHouse);
  
  pumpkin1.draw();
  pumpkin2.draw();
  pumpkin3.draw();
  
  ghost1.draw();
  ghost2.draw();
  ghost3.draw();
  
  rainfall.draw();
  
  if( mousePressed ){
    if( mouseButton == LEFT ){
      lightning.draw();
    } else if( mouseButton == RIGHT ){
      spotlight.draw();
    }
  }
  
  if( keyPressed ){
    if( keyCode == LEFT ){
      pumpkin1.moveLeft(5);
    } else if( keyCode == RIGHT ){
      pumpkin1.moveRight(5);
    } else if( keyCode == UP ){
      pumpkin1.bounce();
    } else if(keyCode == DOWN ){
      pumpkin1.stop();
    }
    
    if( key == 'g' ){
      grayscale = !grayscale;
    } else if( key == 'a' ){
      spotlight.setSpotlightSize(spotlight.getSize() + 3);
    } else if( key == 's' ){
      spotlight.setSpotlightSize(spotlight.getSize() - 3);
    } 
  }
  
  if( grayscale ) {
    drawGrayscale(true);
  }
  
  // DRAWING THE HAPPY HALLOWEEN MESSAGE!
  // Display "Happy Halloween" somewhere on your display.
  // *hint* you can use text(), textSize(), and fill()

  
  // Try out the other scary house backgrounds and customize
  // your scary house!
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // There are hidden spotlight and grayscale features in this
  // recipe. See if you can figure out how to use them...
  
  // ---------------------------------------------------------
  // Here are some other methods you can try:
  //  pumpkin.setPumpkinColor();
  //  pumpkin.bounce();
  //  pumpkin.stop();
  //  pumpkin.setBounceHeight();
  //  pumpkin.moveRight();
  //  pumpkin.moveLeft();
  //  ghost.setGhostTransparency();
  //  lightning.setLightningFlash();
  //  rainfall.setAmountOfRain();
  //  spotlight.setPixelSize();
  //  spotlight.setSpotlightSize();
  // ---------------------------------------------------------
}

void drawBackground(PImage bgImage){
  background(bgImage);
  drawFloor();
}

void drawFloor(){
  int floorHeight = 30;
  
  push();
  
  fill( 10, 10, 30 );
  rect(0, height - floorHeight, width, floorHeight);
  
  pop();
} //<>//

// Call this method at the very bottom of the draw() method!
void drawGrayscale( boolean grayscaleEnabled ){
  if( grayscaleEnabled ){
    filter( GRAY  );    
  }
}
