import { ctx, canvas, grn } from "./util.js";
import { Fire } from "./Fire.js";

export class Tank {
  img = new Image();
  a = new Audio("./audio/shoot.mp3");
  constructor(isPlayer = true) {
    this.isPlayer = isPlayer;
    this.x = this.isPlayer ? 900 : 600;
    this.y = this.isPlayer ? innerHeight - 100 : 50;
    this.w = 50;
    this.h = 50;
    this.a.preload = "auto";

    if (this.isPlayer) {
      this.img.src = "./images/tank1.png";
    } else {
      this.img.src = "./images/tank2.png";
    }

    this.img.onload = () =>
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
  fire = null;
  shoot() {
    if (this.isPlayer) {
      this.fire = new Fire(this.x + 5, this.y - 40);
      this.a.play();
    } else {
      this.fire = new Fire(this.x, this.y + 30);
      this.fire.img.src = "../images/fire.PNG";
    }
  }
  randomShoot() {
    const randomNumber = Math.random();
    const shootProb = 0.01;

    if (randomNumber < shootProb) {
      this.shoot();
    }
  }

  draw() {
    this.img.onload();
    if (this.fire) {
      if (this.isPlayer) {
        this.fire.move();
      } else {
        this.fire.move2();
      }
    }
  }
  move() {
    this.draw();
    this.y += 2;
    if (this.y > innerHeight) {
      this.y = -90;
      this.x = grn(1000, innerWidth / 3);
    }
  }
  async destroyed() {
    this.img.src = "./images/boom.png";

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });

    this.img.src = "./images/tank2.png";
    this.y = -90;
    this.x = grn(1000, innerWidth / 3);
  }
  moveRight() {
    if (this.x <= 970) {
      this.x += 50;
    }
  }
  moveLeft() {
    if (this.x > 500) {
      this.x -= 50;
    }
  }
}
