public class Lightning {
  private float chaos = 0.25;
  private ArrayList<PVector> points;
  private boolean lightningFlash = false;

  void setLightningFlash(boolean flash) {
    this.lightningFlash = flash;
  }

  // Draw lightning immediately when called
  void draw() {
    drawLightning();

    if ( this.lightningFlash ) {
      filter(INVERT);
    }
  }

  // Draw lightning at random times.
  //   smaller input = more frequent lightning
  //   larger input  = less frequent lightning
  void draw( int randDelay ) {
    if ( random( randDelay ) < 5 ) {
      drawLightning();

      if ( this.lightningFlash ) {
        filter(INVERT);
      }
    }
  }

  void drawLightning() {
    push();
    
    PVector p1 = new PVector(random(width), 0);
    PVector p2 = new PVector(random(width), height);

    points = chaoticPoints(p1.x, p1.y, p2.x, p2.y, chaos);
    points.add(p2);

    noStroke();
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

  ArrayList<PVector> chaoticPoints(float x1, float y1, float x2, float y2, float chaos) {
    ArrayList<PVector> ptlist = new ArrayList<PVector>();  
    float d_x = x2-x1;
    float d_y = y2-y1;
    float mag = sqrt(d_x*d_x + d_y*d_y);
    if (mag > 10) {
      float ch = randomGaussian()*chaos/2.0;  // randomGaussian seems to give a better result but is a bit slower
      //float ch = random(-chaos, chaos);

      // Take a random point on the line perpendicular to the given segment and 
      // passing through the midpoint of the segment
      float xc = ((x1+x2)/2) - d_y*ch;
      float yc = ((y1+y2)/2) + d_x*ch;
      ptlist.addAll(chaoticPoints(x1, y1, xc, yc, chaos));
      ptlist.addAll(chaoticPoints(xc, yc, x2, y2, chaos));
      return ptlist;
    } else {
      line(x1, y1, x2, y2);
      ptlist.add(new PVector(x1, y1));
      return ptlist;
    }
  }

  void drawChaoticLine(ArrayList<PVector> points) {
    for (int i=0; i<points.size()-1; i++) {
      PVector p1 = points.get(i);
      PVector p2 = points.get(i+1);
      line(p1.x, p1.y, p2.x, p2.y);
    }
  }
}
