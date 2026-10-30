let scaryHouseImg;
let ghostImg;

/*
 * 1. Create variables for:
 *     pumpkin
 *     ghost
 *     rainfall
 *     lightning
 *     spotlight
 *     grayscale
 */


async function setup() {
  createCanvas(1000, 600);

  scaryHouseImg = await loadImage("assets/scaryHouse1.jpg");
  ghostImg = await loadImage("assets/ghost.png");

  /* 2. Initialize your variables using:
   *    createGhost(ghostImg);
   *    createPumpkin();
   *    createRain();
   *    createLightning();
   *    createSpotlight();
   *    createGrayscale();
   */

}

function draw() {
  background(scaryHouseImg, width, height);
  drawFloor();

  /* 3. Display your objects using:
   *    pumpkin.display();
   *    myGhost.display();
   *    rainfall.display();
   *    grayscale.display();
   */


  /* 4. Display lightning on left mouse click,
   *      lightning.display();
   *    Display spotlight on right mouse click,
   *      spotlight.display();
   */

  // Check mouse buttons pressed
  if (mouseIsPressed) {
    if(mouseButton.left){

    }
    if(mouseButton.right) {

    }
  }

  /* 5. Inrease spotlight size when "a" pressed,
   *      spotlight.increaseSpotlightSize(3);
   *    Decrease spotlight size when "s" pressed,
   *      spotlight.decreaseSpotlightSize(3);
   */

  // Check for keys held down
  if(keyIsDown("a")){

  }
  if(keyIsDown("s")){

  }
}

/* 5. Move the pumpkin left,    pumpkin.moveLeft()
 *    Move the pumpkin right,   pumpkin.moveRight()
 *    Make the pumpkin bounce,  pumpkin.bounce()
 *    Make the pumpkin stop,    pumpkin.stop()
 *    Toggle grayscale,         grayscale.toggleGrayscale();
 *    Toggle lightning flash,   lightning.toggleLightningFlash();
 */

// Check for keys pressed once
function keyPressed(){
  if(key === 'ArrowLeft'){

  }
  if(key === 'ArrowRight'){

  }
  if(key === 'ArrowUp'){

  }
  if(key === 'ArrowDown'){

  }
  if(key === 'g'){

  }
  if(key === 'w'){

  }
}

// ---------------------------------------------------------
// 6. Here are some other methods you can try:
//    function createPumpkin(startX=350, startColor="#E26238")
//    pumpkin.setPumpkinColor("#E26238");
//    pumpkin.bounce();
//    pumpkin.stop();
//    pumpkin.setBounceHeight(numPixels);
//    pumpkin.moveRight(speed);
//    pumpkin.moveLeft(speed);
//
//    function createGhost(ghostImg, y=50, speed=5, direction="right")
//    ghost.setGhostTransparency(0 - 100);
//
//    function createRain(rainColor="#95CDEA") {
//    rainfall.setAmountOfRain(0 - 1000);
// ---------------------------------------------------------



































// ================= NOTHING TO SEE HERE =================

function drawFloor() {
  const floorHeight = 30;

  push();

  fill(10, 10, 30);
  rect(0, height - floorHeight, width, floorHeight);

  pop();
}

// Call this method at the very bottom of the draw() method!
function createGrayscale() {
  let grayscaleEnabled = false;

  return {
    toggleGrayscale: function(){
      grayscaleEnabled = !grayscaleEnabled;
    },
    display: function(){
      if(grayscaleEnabled){
        filter(GRAY);
      }
    }
  }
}

function createGhost(ghostImg, y=50, speed=5, direction="right") {
  ghostImg.resize(150, 250);
  let x = -ghostImg.width;
  let transparency = 125;

  return {

    // 0 = most transparent; 100 = most opaque
    setGhostTransparency(newTransparency=25) {
      // Normalize value from 0-255
      transparency = 255 - Math.floor((newTransparency * 255) / 100);
    },

    display() {
      push();

      // Makes ghost transparent
      tint(255, transparency);

      if (direction.toLowerCase() === "left") {
        // Ghost goes right to left

        // Flip on X axis
        scale(-1, 1);
        image(ghostImg, -x, y);

        x -= speed;

        if (x < -ghostImg.width) {
          x = width + ghostImg.width;
        }
      } else {
        // Ghost goes left to right

        image(ghostImg, x, y);

        x += speed;

        if (x > width) {
          x = -ghostImg.width;
        }
      }

      pop();
    },
  };
}

function createPumpkin(startX=350, startColor="#E26238") {
  let x = startX;
  let y = height - 300;
  let xSpeed = 0;
  let shouldBounce = false;
  let bounceHeight = 30;
  let bounceSpeed = 0;
  let pumpkinColor = startColor;
  const gravity = 1;
  const pumpkinSizePixels = 150;
  const glowingEyesColor = [240 + random(15), 240 + random(15), random(255)];
  const greenStemColor = "#2EA22C";

  return {
    setPumpkinColor(newColor="#726238") {
      pumpkinColor = newColor;
    },

    // ---------------------------------------------------------
    // Call this method from the setup() method,
    // NOT the draw() method
    // ---------------------------------------------------------
    setBounceHeight(newHeightInPixels=40) {
      bounceHeight = newHeightInPixels;
    },

    bounce() {
      shouldBounce = true;
    },

    stop() {
      shouldBounce = false;
      xSpeed = 0;
    },

    moveRight(speed=3) {
      xSpeed = speed;
    },

    moveLeft(speed=3) {
      xSpeed = -speed;
    },

    display() {
      push();

      if (bounceSpeed < bounceHeight) {
        bounceSpeed += gravity;
      }

      y += bounceSpeed;

      if (y > height - 100) {
        y = height - 100;

        if (shouldBounce) {
          bounceSpeed = -bounceSpeed;
        }
      }

      x += xSpeed;

      if (x > width + pumpkinSizePixels) {
        x = 0 - pumpkinSizePixels;
      }
      if (x < 0 - pumpkinSizePixels) {
        x = width;
      }

      ellipseMode(CENTER);

      // Black outline
      stroke(0);
      strokeWeight(2);

      // Draw top stem
      fill(greenStemColor);
      rect(x - 10, y - pumpkinSizePixels / 2 - 20, 15, 20);

      // Draw body
      fill(pumpkinColor);
      ellipse(x, y, pumpkinSizePixels, pumpkinSizePixels);

      // Set glowing eyes
      const [r, g, b] = glowingEyesColor;
      fill(r, g, b, random(200) + 50);

      // Draw eyes
      triangle(x - 30, y - 20, x - 20, y, x - 40, y);
      triangle(x + 30, y - 20, x + 20, y, x + 40, y);
      triangle(x, y, x + 10, y + 20, x - 10, y + 20);

      // Draw shadow
      ellipse(x, height - 15, (150 * y) / height, (10 * y) / height);

      // Draw mouth
      arc(x, y + 30, 80, 80, 0, PI, OPEN);
      line(x - 40, y + 30, x + 40, y + 30);

      // Draw tooth
      fill(pumpkinColor);
      rect(x + 5, y + 30, 15, 15);
      rect(x - 20, y + 30, 15, 15);

      // Clear the top outline of the tooth
      strokeWeight(3);
      stroke(pumpkinColor);
      fill(pumpkinColor);
      line(x + 7, y + 30, x + 18, y + 30);
      line(x - 18, y + 30, x - 7, y + 30);

      pop();
    },
  };
}

function createRain(rainColor="#95CDEA") {
  const MAX_RAIN_DROPS = 1000;
  const drop = [];
  let splash = [];
  let amountOfRain = 350;
  let initialized = false;

  function init() {
    for (let i = 0; i < MAX_RAIN_DROPS; i++) {
      drop.push(createRaindrop());
    }
    initialized = true;
  }

  return {
    setAmountOfRain(rain=400) {
      if (rain > 0 && rain < MAX_RAIN_DROPS) {
        amountOfRain = rain;
      }
    },

    display() {
      push();

      if (!initialized) {
        init();
      }

      stroke(255, 200);
      strokeWeight(1.8);

      for (let i = 0; i < amountOfRain; i++) {
        drop[i].display(rainColor);
        drop[i].fall();
        if (drop[i].getY() >= height) {
          splash.push(createSplash(drop[i].getX()));
          drop[i].reset();
        }
      }

      for (const s of splash) {
        s.fade();
        s.display(rainColor);
      }
      splash = splash.filter((s) => !s.over());

      pop();
    },
  };
}

function createRaindrop() {
  const l = 30 + random(-10, 10);
  const g = 0.14;
  let x = random(-300, width + 300);
  let y = random(-1400, -200);
  let speed = 0;
  let angle = 0;

  return {
    getX: () => x,
    getY: () => y,

    display(rainColor) {
      stroke(rainColor);
      line(x, y, x + l * sin(angle), y + l * cos(angle));
    },

    fall() {
      angle = map(mouseX - 300, -300, 300, -PI / 12, PI / 12);
      y += speed * cos(angle);
      x += speed * sin(angle);
      speed += g;
    },

    reset() {
      x = random(-300, width + 300);
      y = random(-800, -200);
      speed = 11;
    },
  };
}

function createSplash(x) {
  const l = 5 + random(13);
  const offset = random(5);
  let a = 0;
  let b = 0;

  return {
    display(rainColor) {
      stroke(rainColor);
      line(x - a, height - offset - a, x - b, height - offset - b);
      line(x + a, height - offset - a, x + b, height - offset - b);
    },

    fade() {
      if (b < l) {
        b += 4;
      } else if (a < l) {
        a += 4;
      }
    },

    over() {
      return a >= l && b >= l;
    },
  };
}

function createLightning() {
  const chaos = 0.25;
  let lightningFlash = false;

  function chaoticPoints(x1, y1, x2, y2) {
    const dX = x2 - x1;
    const dY = y2 - y1;
    const mag = sqrt(dX * dX + dY * dY);

    if (mag > 10) {
      const ch = (randomGaussian() * chaos) / 2.0;

      // Take a random point on the line perpendicular to the given segment and
      // passing through the midpoint of the segment
      const xc = (x1 + x2) / 2 - dY * ch;
      const yc = (y1 + y2) / 2 + dX * ch;

      return [...chaoticPoints(x1, y1, xc, yc), ...chaoticPoints(xc, yc, x2, y2)];
    }

    return [createVector(x1, y1)];
  }

  function drawChaoticLine(points) {
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      line(p1.x, p1.y, p2.x, p2.y);
    }
  }

  function drawLightning() {
    push();
    noStroke();

    const p1 = createVector(random(width), 0);
    const p2 = createVector(random(width), height);

    const points = chaoticPoints(p1.x, p1.y, p2.x, p2.y);
    points.push(p2);

    stroke(64, 46, 255, 32);
    strokeWeight(32);
    drawChaoticLine(points);

    stroke(64, 64, 255, 32);
    strokeWeight(16);
    drawChaoticLine(points);

    stroke(128, 128, 255, 32);
    strokeWeight(8);
    drawChaoticLine(points);

    stroke(255, 255, 255, 255);
    strokeWeight(4);
    drawChaoticLine(points);

    pop();
  }

  return {
    toggleLightningFlash() {
      lightningFlash = !lightningFlash;
    },

    // With no input, draw lightning immediately when called.
    //
    // With randDelay, draw lightning at random times.
    //   smaller input = more frequent lightning
    //   larger input  = less frequent lightning
    display(randDelay) {
      if (randDelay === undefined || random(randDelay) < 5) {
        drawLightning();

        if (lightningFlash) {
          filter(INVERT);
        }
      }
    },
  };
}

function createSpotlight() {
  // Array for pixelization
  let pixelList = [];
  let pixelSize = 1;
  let spotlightSizePixels = 150;

  // Ellipse mask for spotlight through darkness with no pixel distortion
  const spotlightMask = createGraphics(width, height);
  spotlightMask.pixelDensity(1);

  function initializePixels() {
    loadPixels();

    for (let i = 0; i < width; i += pixelSize) {
      for (let j = 0; j < height; j += pixelSize) {
        const index = 4 * (j * width + i);
        const c = [pixels[index], pixels[index + 1], pixels[index + 2], pixels[index + 3]];
        pixelList.push(createPixel(i, j, pixelSize, c, spotlight));
      }
    }
  }

  const spotlight = {
    // Sets how pixelated the spotlight view is; 1 to 9
    // 1 = no pixelization
    // 9 = high pixelization (large pixels)
    // setPixelSize(sizePixels) {
    //   if(sizePixels >= 1 && sizePixels <= 9){
    //     pixelSize = sizePixels;
    //   }
    // },

    increaseSpotlightSize(increaseAmount=3) {
      spotlightSizePixels += increaseAmount;
    },
    decreaseSpotlightSize(decreaseAmount=3) {
      spotlightSizePixels -= decreaseAmount;
    },

    getSize() {
      return spotlightSizePixels;
    },

    display() {
      push();

      if (pixelList.length === 0) {
        initializePixels();
      }

      if (pixelSize > 1) {
        // If pixelating

        background(0);
        noStroke();

        for (const p of pixelList) {
          p.display();
        }

        pixelList = [];
      } else {
        // Not pixelating, use a normal spotlight with no pixel distortion

        // Get current frame before drawing darkness
        const currentFrame = get();

        noStroke();
        fill(0);
        rect(0, 0, width, height);

        // Erase previously drawn graphics
        spotlightMask.clear();
        spotlightMask.noStroke();

        // Replace pixels instead of blending so each ring overwrites the last.
        // p5 masks use alpha, where Processing masks use brightness.
        spotlightMask.blendMode(REPLACE);

        // Ellipse mask with fuzzy edges
        for (let i = 0; i < 25; i++) {
          spotlightMask.fill(255, i * 10);
          spotlightMask.ellipse(mouseX, mouseY, 2 * spotlightSizePixels - i * 2, 2 * spotlightSizePixels - i * 2);
        }

        currentFrame.mask(spotlightMask.get());
        image(currentFrame, 0, 0);
      }

      pop();
    },
  };

  return spotlight;
}

function createPixel(x, y, pixelSize, pixelColor, spotlight) {
  return {
    display() {
      const sizePixels = spotlight.getSize() * spotlight.getSize();

      if ((x - mouseX) * (x - mouseX) + (y - mouseY) * (y - mouseY) <= sizePixels) {
        let xm = x + random(-1, 1);
        let ym = y + random(-1, 1);

        if (xm > width || xm < 0) {
          xm = -xm;
        }
        if (ym > height || ym < 0) {
          ym = -ym;
        }

        fill(pixelColor);
        rect(xm, ym, pixelSize, pixelSize);
      }
    },
  };
}
