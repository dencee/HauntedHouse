 
public class Rain {
  private static final int MAX_RAIN_DROPS = 1000;
  private int amountOfRain = 350;
  private color rainColor = #ADD8E6; // light blue
  private ArrayList<Raindrop> drop = new ArrayList<Raindrop>(amountOfRain);
  private ArrayList<Splash> splash = new ArrayList<Splash>();
  private boolean initialized = false;

  public Rain(color rainColor){
    this.rainColor = rainColor;
  }

  void setAmountOfRain(int rain){
    if( rain > 0 && rain < MAX_RAIN_DROPS ){
      this.amountOfRain = rain;
    }
  }

  void setup() {
    for (int i = 0; i < MAX_RAIN_DROPS; i++) {
      drop.add( new Raindrop() );
    }
    initialized = true;
  }

  void draw() {
    push();

    if ( !initialized ) {
      this.setup();
    }

    stroke(255, 200);
    strokeWeight(1.8);

    for (int i = 0; i < this.amountOfRain; i++) {
      drop.get(i).draw(rainColor);
      drop.get(i).fall();
      if (drop.get(i).y >= height) {
        splash.add( new Splash( drop.get(i).x) );
        drop.get(i).reset();
      }
    }

    for (int i = 0; i < splash.size(); i++) {
      splash.get(i).fade();
      splash.get(i).draw(rainColor);

      if (splash.get(i).over()) {
        splash.remove(i);
        i--;
      }
    }

    pop();
  }

  class Raindrop {
    float x;
    float y;
    float l;
    float speed;
    float angle;
    float g = 0.14;

    public Raindrop() {
      this.x = random(-300, width+300);
      this.y = random(-1400, -200);
      this.l = 30 + random(-10, 10);
      this.speed = 0;
      this.angle = 0;
    }

    void draw(int rainColor) {
      stroke(rainColor);
      line(this.x, this.y, this.x+this.l*sin(this.angle), this.y+this.l*cos(this.angle));
    }

    void fall() {
      this.angle = map(mouseX - 300, -300, 300, -PI / 12, PI / 12);
      this.y += this.speed*cos(this.angle);
      this.x += this.speed*sin(this.angle);
      this.speed += g;
    }

    void reset() {
      this.x = random(-300, width+300);
      this.y = random(-800, -200);
      this.speed = 11;
    }
  }

  class Splash {
    float x;
    float a;
    float b;
    float l;
    float offset;

    public Splash(float x) {
      this.x = x;
      this.a = 0;
      this.b = 0;
      this.l = 5 + random(13);
      this.offset = random(5);
    }

    void draw(int rainColor) {
      stroke(rainColor);
      line(this.x - this.a, height - this.offset - this.a, this.x - this.b, height - this.offset - this.b);
      line(this.x + this.a, height - this.offset - this.a, this.x + this.b, height - this.offset - this.b);
    }

    void fade() {
      if (this.b < this.l) {
        this.b += 4;
      } else if (this.a < this.l) {
        this.a += 4;
      }
    }

    boolean over() {
      if (this.a >= this.l && this.b >= this.l) {
        return true;
      } else {
        return false;
      }
    }
  }
}
