import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import background from "./assets/background.jpg";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
  },
};

const back_logo = "background";

const game = new Phaser.Game(config);

function preload() {
  this.load.image("background", background);
}

function create() {
  const x = 400;
  const y = 300;

  const back = this.add.image(x,y,back_logo);
  this.cover = this.add.image(x,y,back_logo);
  this.cover.setTint(0x000000);

  const width = this.cover.width;
  const height = this.cover.height;

  const texture = this.make.renderTexture({
    width,
    height,
    add:false
  });

  const mask = this.make.image({
    x,y,key:texture.texture.key,add:false
  });

  this.cover.mask = new Phaser.Display.Masks.BitmapMask(this, mask);
  this.cover.mask.invertAlpha = true;

  back.mask = new Phaser.Display.Masks.BitmapMask(this, mask);

  this.light = this.add.circle(0,0,100,0x000000,1);
  this.light.visible = false;

  this.input.on(Phaser.Input.Events.POINTER_MOVE, handlePoint, this);

  this.renderTexture = texture;

}

function handlePoint(pointer){
  const x = pointer.x - this.cover.x + this.cover.width * 0.5;
  const y = pointer.y - this.cover.y + this.cover.height * 0.5;

  this.renderTexture.clear();
  this.renderTexture.draw(this.light, x, y);
}
