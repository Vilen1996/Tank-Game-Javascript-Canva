import { ctx, canvas } from "./util.js";
export class Road {
  x = innerWidth / 3.5;
  y = 0;
  w = 600;
  h = innerHeight;
  lines = new Array(Math.ceil(innerHeight / 90))
    .fill(null)
    .map((elm, i) => ({ x: 790, y: 90 * i, w: 10, h: 70 }));
  draw() {
    ctx.fillStyle = "#2b2a29";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    this.lines.forEach((ln) => {
      ctx.fillStyle = "white";
    });
  }
  move() {
    this.draw();
    this.lines.forEach((ln) => {
      ln.y += 5;
      if (ln.y >= innerHeight) {
        ln.y = -90;
      }
    });
  }
}
