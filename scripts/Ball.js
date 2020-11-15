class Ball {
    constructor(elem, radius, coordX, coordY) {
      this.elem = elem;
      this.radius = radius;
      this.coordX = coordX;
      this.coordY = coordY;
      this.stepX = 0;
      this.stepY = 0;
    }
  
    update() {
      this.elem.setAttribute('style', `left: ${this.coordX - this.radius}px; top: ${this.coordY - this.radius}px`);
    }
  
    move() {
      this.coordX += this.stepX;
      this.coordY += this.stepY;
    }
  }