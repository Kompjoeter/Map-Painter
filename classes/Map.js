class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.map = this.create(this.width, this.height);
    this.grid = this.getSpriteMap(this.map, this.width, this.height);
    this.id = uuidv4();
    logMeta(`🖥️ created Map with id: ${this.id}`);
  }
  
  create(w, h) {
    let a = [];
    let sprite;
    let inc = .07;
    let yoff = 0;
    noiseSeed(this.id);
    for(var x = 0; x < w; x++) {
        a[x] = [];
        let xoff = 0;
        for(var y = 0; y < h; y++) {
          var r = (noise(xoff, yoff)*255)/2;
          xoff += inc;  
          if (r < 40) {
            sprite = 0;
          } else if (r >= 40 && r < 60) {
            sprite = 1;
          } else if (r >= 60 && r < 70) {
            sprite = 2;
          } else if (r >= 70 && r < 80) {
            sprite = 3;
          } else if (r >= 80 && r < 90) {
            sprite = 4;
          } else if (r >= 90 && r < 100) {
            sprite = 5;
          } else {
            sprite = 6;
          }
          if (x === (w-1) || x === 0 || y === 0 || y === (h-1)) {
            sprite = 0;
          }
          a[x][y] = {posX: x, posY: y, sprite: sprite, elevation: sprite}
        }
        yoff += inc;
    }
    return a;
  }

  getSpriteMap(m, w, h) {
    let a = [];
    for(var x = 0; x < w; x++) {
      a[x] = [];
      for(var y = 0; y < h; y++) {
        a[x][y] = m[x][y].sprite;
      }
    }
    return a;
  }
}