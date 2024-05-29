import { ctx, canvas } from "./util.js";
import { Road } from "./Road.js";
import { Tank } from "./Tank.js";

export class Game {
  road = new Road();
  tank = new Tank();
  bg = new Image();
  another = new Tank(false);
  count = 0;
  lifeCount = 5;
  constructor() {
    window.onkeydown = (e) => {
      if (e.key == "ArrowRight") {
        this.tank.moveRight();
      } else if (e.key == "ArrowLeft") {
        this.tank.moveLeft();
      } else if (e.key == " ") {
        this.tank.shoot();
      }
    };

    this.bg.src = "./images/Field.jpg";
    this.bg.onload = () =>
      ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);

    this.id = requestAnimationFrame(() => this.run());
  }

  run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.bg.onload();
    this.id = requestAnimationFrame(() => this.run());
    this.road.move();
    this.tank.draw();
    this.another.move();
    this.another.randomShoot();
    if (Math.abs(this.tank.x - this.another.x) < 50) {
      if (Math.abs(this.tank.y - this.another.y) < 50) {
        this.lifeCount--;
      }
    } else if (this.another.y == 800) {
      this.lifeCount--;
    }
    if (this.lifeCount == 0) {
      ctx.font = "50px Arial";
      ctx.fillText(String("GAME OVER"), 630, 500);
      cancelAnimationFrame(this.id);
    }
    ctx.font = "20px Arial";
    ctx.fillText(String(`Your score: ${this.count}`), 955, 20);
    ctx.font = "20px Arial";
    ctx.fillText(String(`Your Lifes: ${this.lifeCount}`), 500, 20);
    if (this.tank.fire) {
      if (
        Math.abs(this.another.y - this.tank.fire.y) < 50 &&
        Math.abs(this.another.x - this.tank.fire.x) < 50
      ) {
        this.count++;
        this.another.destroyed();
      }
      if (this.count == 100) {
        ctx.font = "50px Arial";
        ctx.fillText(String("YOU WIN"), 630, 500);
        cancelAnimationFrame(this.id);
      }
    }
    if (this.another.fire) {
      if (
        Math.abs(this.another.fire.y - this.tank.y) < 20 &&
        Math.abs(this.another.fire.x - this.tank.x) < 20
      ) {
        ctx.font = "50px Arial";
        ctx.fillText(String("GAME OVER"), 630, 500);
        cancelAnimationFrame(this.id);
      }
    }
  }
}
