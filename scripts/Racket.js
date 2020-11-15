class Racket {
    constructor(elem, width, coord) {
      this.elem = elem;
      this.halfWidth = width / 2;
      this.coord = coord;
      this.update();
    }
  
    update() {
      this.elem.setAttribute('style', `left: ${this.coord - this.halfWidth}px`);
    }
  
    correctCoord(fieldWidth) {
      if (this.coord < this.halfWidth) {
        this.coord = this.halfWidth;
      }
      else if (this.coord > fieldWidth - this.halfWidth) {
        this.coord = fieldWidth - this.halfWidth;
      }
    }
  
    move(coord, fieldWidth) {
      this.coord = coord;
    
      this.correctCoord(fieldWidth);
    
      this.update();  
    }
  }