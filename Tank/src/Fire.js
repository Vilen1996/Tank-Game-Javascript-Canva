import { ctx, canvas, grn } from "./util.js";
export class Fire {
  img = new Image();

  constructor(x, y) {
    this.img.src = "../images/fire2.PNG";
    this.x = x;
    this.y = y;
    this.img.onload = () => ctx.drawImage(this.img, this.x, this.y, 40, 40);
  }

  draw() {
    this.img.onload();
  }

  move() {
    this.draw();
    this.y -= 5;
  }
  move2() {
    this.draw();
    this.y += 5;
  }
}
