// Haunted House - p5.js port of Java/HauntedHouse
//   Left click  : lightning
//   Right click : spotlight (hold; 'a' / 's' grow / shrink it)
//   Arrow keys  : move / bounce / stop the first pumpkin
//   'g'         : toggle grayscale

const MAX_RAIN_DROPS = 1000;

let pumpkin1, pumpkin2, pumpkin3;
let ghost1, ghost2, ghost3;
let rainfall;
let lightning;
let spotlight;

let grayscaleEnabled = false;
let scaryHouse;
let ghostImg;
let thunder;
let heldButton = null; // 'left' | 'right' | null
const heldKeys = new Set(); // event.key values currently held (lowercased)

async function setup() {
  createCanvas(1200, 800);
  pixelDensity(1);

  scaryHouse = await loadImage("assets/scaryHouse1.jpg");
  scaryHouse.resize(width, height);

  ghostImg = await loadImage("assets/ghost.png");
  ghostImg.resize(150, 250);

  thunder = new Audio("assets/thunder.wav");

  pumpkin1 = new Pumpkin(350, "#E26238");
  pumpkin2 = new Pumpkin(550, "#BE1DF0");
  pumpkin3 = new Pumpkin(850, "#1DF029");

  ghost1 = new Ghost(50, 5, "right");
  ghost2 = new Ghost(10, 3, "right");
  ghost3 = new Ghost(150, 8, "left");

  rainfall = new Rain("#ADD8E6");
  lightning = new Lightning();
  spotlight = new Spotlight();

  // Right click is used for the spotlight
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  // Track held keys ourselves so this works regardless of p5 version
  window.addEventListener("keydown", (e) => heldKeys.add(e.key.toLowerCase()));
  window.addEventListener("keyup", (e) => heldKeys.delete(e.key.toLowerCase()));
  window.addEventListener("blur", () => heldKeys.clear());
}

function draw() {
  // setup() is async, so wait until everything has loaded
  if (!spotlight) return;

  drawBackground(scaryHouse);

  pumpkin1.draw();
  pumpkin2.draw();
  pumpkin3.draw();

  ghost1.draw();
  ghost2.draw();
  ghost3.draw();

  rainfall.draw();

  push();
  noStroke(); // p5 outlines text with the stroke, Processing does not
  textSize(100);
  fill("#08FF3F");
  text("HAPPY HALLOWEEN!", 100, 300);
  pop();

  if (heldButton === "left") {
    lightning.draw();
  }
  if (heldButton === "right") {
    spotlight.draw();
  }

  if (heldKeys.has("arrowleft")) {
    pumpkin1.moveLeft(5);
  } else if (heldKeys.has("arrowright")) {
    pumpkin1.moveRight(5);
  } else if (heldKeys.has("arrowup")) {
    pumpkin1.bounce();
  } else if (heldKeys.has("arrowdown")) {
    pumpkin1.stop();
  }

  if (heldKeys.has("a")) {
    spotlight.setSpotlightSize(spotlight.getSize() + 3);
  } else if (heldKeys.has("s")) {
    spotlight.setSpotlightSize(spotlight.getSize() - 3);
  }

  if (grayscaleEnabled) {
    drawGrayscale(true);
  }
}

function keyPressed() {
  if (key === "g") {
    grayscaleEnabled = !grayscaleEnabled;
  }
  if (keyCode >= 37 && keyCode <= 40) {
    return false; // keep arrow keys from scrolling the page
  }
}

function mousePressed(event) {
  if (event && event.button === 2) {
    heldButton = "right";
  } else {
    heldButton = "left";
    if (thunder) {
      thunder.currentTime = 0;
      thunder.play().catch(() => {});
    }
  }
}

function mouseReleased() {
  heldButton = null;
}

function drawBackground(bgImage) {
  background(bgImage);
  drawFloor();
}

function drawFloor() {
  const floorHeight = 30;

  push();
  fill(10, 10, 30);
  rect(0, height - floorHeight, width, floorHeight);
  pop();
}

// Call this at the very bottom of draw()
function drawGrayscale(enabled) {
  if (enabled) {
    filter(GRAY);
  }
}

class Pumpkin {
  constructor(x, pumpkinColor) {
    this.x = x;
    this.y = height - 300;
    this.pumpkinColor = pumpkinColor;
    this.xSpeed = 0;
    this.bouncing = false;
    this.bounceHeight = 30;
    this.bounceSpeed = 0;
    this.gravity = 1;
    this.pumpkinSizePixels = 150;
    this.glowingEyesColor = [240 + random(15), 240 + random(15), random(255)];
    this.greenStemColor = "#2EA22C";
  }

  setPumpkinColor(newColor) {
    this.pumpkinColor = newColor;
  }

  setBounceHeight(newHeightInPixels) {
    this.bounceHeight = newHeightInPixels;
  }

  bounce() {
    this.bouncing = true;
  }

  stop() {
    this.bouncing = false;
    this.xSpeed = 0;
  }

  moveRight(speed) {
    this.xSpeed = speed;
  }

  moveLeft(speed) {
    this.xSpeed = -speed;
  }

  draw() {
    push();

    if (this.bounceSpeed < this.bounceHeight) {
      this.bounceSpeed += this.gravity;
    }

    this.y += this.bounceSpeed;

    if (this.y > height - 100) {
      this.y = height - 100;

      if (this.bouncing) {
        this.bounceSpeed = -this.bounceSpeed;
      }
    }

    this.x += this.xSpeed;

    if (this.x > width + this.pumpkinSizePixels) {
      this.x = 0 - this.pumpkinSizePixels;
    }
    if (this.x < 0 - this.pumpkinSizePixels) {
      this.x = width;
    }

    const x = this.x;
    const y = this.y;
    const size = this.pumpkinSizePixels;

    ellipseMode(CENTER);

    // Black outline
    stroke(0);
    strokeWeight(2);

    // Draw top stem
    fill(this.greenStemColor);
    rect(x - 10, y - size / 2 - 20, 15, 20);

    // Draw body
    fill(this.pumpkinColor);
    ellipse(x, y, size, size);

    // Set glowing eyes
    const [r, g, b] = this.glowingEyesColor;
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
    fill(this.pumpkinColor);
    rect(x + 5, y + 30, 15, 15);
    rect(x - 20, y + 30, 15, 15);

    // Clear the top outline of the tooth
    strokeWeight(3);
    stroke(this.pumpkinColor);
    fill(this.pumpkinColor);
    line(x + 7, y + 30, x + 18, y + 30);
    line(x - 18, y + 30, x - 8, y + 30);

    pop();
  }
}

class Ghost {
  constructor(y, speed, direction) {
    this.direction = direction;
    this.speed = speed;
    this.x = -ghostImg.width;
    this.y = y;
    this.transparency = 125;
  }

  // 0 = most transparent; 100 = most opaque
  setGhostTransparency(transparency) {
    // Normalize value from 0-255
    this.transparency = 255 - (transparency * 255) / 100;
  }

  draw() {
    push();

    // Makes ghost transparent
    tint(255, this.transparency);

    if (this.direction.toLowerCase() === "left") {
      // Ghost goes right to left; flip on X axis
      scale(-1, 1);
      image(ghostImg, -this.x, this.y, ghostImg.width, ghostImg.height);

      this.x -= this.speed;

      if (this.x < -ghostImg.width) {
        this.x = width + ghostImg.width;
      }
    } else {
      // Ghost goes left to right
      image(ghostImg, this.x, this.y, ghostImg.width, ghostImg.height);

      this.x += this.speed;

      if (this.x > width) {
        this.x = -ghostImg.width;
      }
    }

    pop();
  }
}

class Raindrop {
  constructor() {
    this.g = 0.14;
    this.x = random(-300, width + 300);
    this.y = random(-1400, -200);
    this.l = 30 + random(-10, 10);
    this.speed = 0;
    this.angle = 0;
  }

  draw(rainColor) {
    stroke(rainColor);
    line(
      this.x,
      this.y,
      this.x + this.l * sin(this.angle),
      this.y + this.l * cos(this.angle)
    );
  }

  fall() {
    this.angle = map(mouseX - 300, -300, 300, -PI / 12, PI / 12);
    this.y += this.speed * cos(this.angle);
    this.x += this.speed * sin(this.angle);
    this.speed += this.g;
  }

  reset() {
    this.x = random(-300, width + 300);
    this.y = random(-800, -200);
    this.speed = 11;
  }
}

class Splash {
  constructor(x) {
    this.x = x;
    this.a = 0;
    this.b = 0;
    this.l = 5 + random(13);
    this.offset = random(5);
  }

  draw(rainColor) {
    stroke(rainColor);
    line(this.x - this.a, height - this.offset - this.a, this.x - this.b, height - this.offset - this.b);
    line(this.x + this.a, height - this.offset - this.a, this.x + this.b, height - this.offset - this.b);
  }

  fade() {
    if (this.b < this.l) {
      this.b += 4;
    } else if (this.a < this.l) {
      this.a += 4;
    }
  }

  over() {
    return this.a >= this.l && this.b >= this.l;
  }
}

class Rain {
  constructor(rainColor) {
    this.rainColor = rainColor;
    this.amountOfRain = 350;
    this.drops = [];
    this.splashes = [];
    for (let i = 0; i < MAX_RAIN_DROPS; i++) {
      this.drops.push(new Raindrop());
    }
  }

  setAmountOfRain(rain) {
    if (rain > 0 && rain < MAX_RAIN_DROPS) {
      this.amountOfRain = rain;
    }
  }

  draw() {
    push();

    strokeWeight(1.8);

    for (let i = 0; i < this.amountOfRain; i++) {
      const drop = this.drops[i];
      drop.draw(this.rainColor);
      drop.fall();
      if (drop.y >= height) {
        this.splashes.push(new Splash(drop.x));
        drop.reset();
      }
    }

    for (let i = 0; i < this.splashes.length; i++) {
      this.splashes[i].fade();
      this.splashes[i].draw(this.rainColor);

      if (this.splashes[i].over()) {
        this.splashes.splice(i, 1);
        i--;
      }
    }

    pop();
  }
}

class Lightning {
  constructor() {
    this.chaos = 0.25;
    this.points = [];
    this.lightningFlash = false;
  }

  setLightningFlash(flash) {
    this.lightningFlash = flash;
  }

  // Draw lightning immediately when called
  draw() {
    this.drawLightning();

    if (this.lightningFlash) {
      filter(INVERT);
    }
  }

  drawLightning() {
    push();
    noStroke();

    const p1 = createVector(random(width), 0);
    const p2 = createVector(random(width), height);

    this.points = this.chaoticPoints(p1.x, p1.y, p2.x, p2.y, this.chaos);
    this.points.push(p2);

    stroke(64, 46, 255, 32);
    strokeWeight(32);
    this.drawChaoticLine(this.points);

    stroke(64, 64, 255, 32);
    strokeWeight(16);
    this.drawChaoticLine(this.points);

    stroke(128, 128, 255, 32);
    strokeWeight(8);
    this.drawChaoticLine(this.points);

    stroke(255, 255, 255, 255);
    strokeWeight(4);
    this.drawChaoticLine(this.points);

    pop();
  }

  chaoticPoints(x1, y1, x2, y2, chaos) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const mag = Math.sqrt(dx * dx + dy * dy);

    if (mag > 10) {
      const ch = (randomGaussian() * chaos) / 2.0;

      // Random point on the line perpendicular to the segment through its midpoint
      const xc = (x1 + x2) / 2 - dy * ch;
      const yc = (y1 + y2) / 2 + dx * ch;
      return [
        ...this.chaoticPoints(x1, y1, xc, yc, chaos),
        ...this.chaoticPoints(xc, yc, x2, y2, chaos),
      ];
    }
    return [createVector(x1, y1)];
  }

  drawChaoticLine(points) {
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      line(p1.x, p1.y, p2.x, p2.y);
    }
  }
}

class Spotlight {
  constructor() {
    this.pixelSize = 1;
    this.spotlightSizePixels = 150;
    // Offscreen canvas used to cut the lit area out of the current frame
    this.layer = document.createElement("canvas");
    this.layer.width = width;
    this.layer.height = height;
  }

  // Sets how pixelated the spotlight view is; 1 to 9
  // 1 = no pixelization, 9 = high pixelization (large pixels)
  setPixelSize(sizePixels) {
    this.pixelSize = sizePixels;
  }

  // Sets the spotlight ellipse size
  setSpotlightSize(sizePixels) {
    this.spotlightSizePixels = max(sizePixels, 25);
  }

  getSize() {
    return this.spotlightSizePixels;
  }

  draw() {
    if (this.pixelSize > 1) {
      this.drawPixelated();
    } else {
      this.drawMasked();
    }
  }

  drawPixelated() {
    const ps = this.pixelSize;
    const radiusSq = this.spotlightSizePixels * this.spotlightSizePixels;

    loadPixels();
    const samples = [];
    for (let i = 0; i < width; i += ps) {
      for (let j = 0; j < height; j += ps) {
        if ((i - mouseX) ** 2 + (j - mouseY) ** 2 <= radiusSq) {
          const idx = 4 * (j * width + i);
          samples.push([i, j, pixels[idx], pixels[idx + 1], pixels[idx + 2], pixels[idx + 3]]);
        }
      }
    }

    push();
    background(0);
    noStroke();
    for (const [x, y, r, g, b, a] of samples) {
      let xm = x + random(-1, 1);
      let ym = y + random(-1, 1);
      if (xm > width || xm < 0) xm = -xm;
      if (ym > height || ym < 0) ym = -ym;

      fill(r, g, b, a);
      rect(xm, ym, ps, ps);
    }
    pop();
  }

  drawMasked() {
    const main = drawingContext;
    const ctx = this.layer.getContext("2d");
    const R = this.spotlightSizePixels;

    // Current frame, cut to a soft-edged circle around the mouse
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(main.canvas, 0, 0);

    const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, R);
    const inner = Math.max(0, (R - 24) / R);
    grad.addColorStop(0, "rgba(0,0,0,0.94)");
    grad.addColorStop(inner, "rgba(0,0,0,0.94)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalCompositeOperation = "destination-in";
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Darkness over everything, then the lit area back on top
    main.save();
    main.setTransform(1, 0, 0, 1, 0, 0);
    main.fillStyle = "#000";
    main.fillRect(0, 0, width, height);
    main.drawImage(this.layer, 0, 0);
    main.restore();
  }
}
