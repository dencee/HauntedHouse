/***********  SOUND ***************
 * Some computers are unable to play sounds. 
 * If you cannot play sound on this computer, set canPlaySounds to false.
 * To install ddf.minim:
 * 1. go to 'Tools' -> Add Tool -> select the 'Libraries' tab
 * 2. In the search box type 'minim'.
 * 3. Install 'Minin | An audio library...'
 * *****************/
boolean canPlaySound = true;
// Uncomment the lines below if you can play sound
/*
import ddf.minim.*;
Minim minim = new Minim(this);
AudioPlayer rainSounds;

void playRainSounds() {
  if ( canPlaySound ) {
    if( rainSounds == null ){
      rainSounds = minim.loadFile("thunder.wav");
    }
    if ( ! this.rainSounds.isPlaying() ) {
      this.rainSounds.loop();
    }
  }
}
*/

Rain rainfall;
Lightning lightning;
Spotlight spotlight;

// When you get to step 7 you can add new Pumpkins and ghosts below!
Pumpkin pumpkin1;
Ghost ghost1;

// ---------------------------------------------------------
// 1. Make a PImage variable for the scary house background
//    example: PImage scaryHouse
// ---------------------------------------------------------


void setup() {
  // 2. Set the size of your sketch to at least 600, 400 using
  //    the size() method.
  
  // 3. Pick a scary house and initialize it using loadImage,
  //    example: scaryHouse = loadImage("scaryHouse1.jpg");
  
  // 4. Resize your scary house to the window size using
  //    scaryHouse.resize(width, height);
  
  
  // Pumpkin( x, pumpkinColor )
  pumpkin1 = new Pumpkin(350, #E26238);
  
  // Ghost( y, speed, flyingDirection )
  ghost1 = new Ghost(50, 5, "right");
  
  rainfall = new Rain();
  lightning = new Lightning();
  spotlight = new Spotlight();
}

void draw() {
  // 5. Call background() with your scary house as an input parameter
  
  // 6. Call the drawFloor() method
  
  // 7. Call pumpkin1.draw(false) to draw a pumpkin.
  //    Can you figure out how to make the pumpkin bounce by changing
  //    the input parameter when calling draw()?
  //
  //    Make at least 2 more new pumpkins. To do this, create new pumpkin 
  //    variables above the setup() method and then initialize them
  //    in setup(). Remember to call their draw() methods here so they appear!

  // 8. Call ghost1.draw() to draw a ghost.
  //    Make at least 2 more new ghosts to fly across the screen.
  //    To do this, create new ghost variables above the setup() method 
  //    and then initialize them in setup(). Remember to call their draw()
  //    methods here so they appear!
  
  // 9. Call rainfall.draw( <rainColor> ) to add rain.
  //    Call playRainSounds() to add the sound of rain!
  
  // 10. Display "Happy Halloween" somewhere on your display.
  //     *hint* you can use text(), textSize(), and fill()
  
  // 11. Call lightning.draw() to draw some lightning;
  //     Can you make lightning crash only when the mouse is pressed?
  
  // Try out the other scary house backgrounds and customize
  // your scary house!
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // There are hidden spotlight and grayscale features in this
  // recipe. See if you can figure out how to use them...
  
  // ---------------------------------------------------------
  // Here are some other methods you can try:
  //  pumpkin1.setPumpkinColor();
  //  pumpkin1.setPumpkinStartHeight();
  //  pumpkin1.moveRight();
  //  pumpkin1.moveLeft();
  //  ghost1.setGhostTransparency();
  //  lightning.setLightningFlash();
  //  rainfall.setAmountOfRain();
  //  spotlight.setPixelSize();
  //  spotlight.setSpotlightSize();
  // ---------------------------------------------------------
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
