class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }
  preload() {
    this.load.image("circle", "assets/Sprite-0002.png");
  }
  create() {
    let menuConfig = {
      fontFamily: "Courier",
      fontSize: "100px",
      color: "#FFFFFF",
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 0,
    };

    //keybinds
    keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    //adding text
    //this.add.text(225, 300, "you are in play", menuConfig);

    //this.r1 = this.add.circle(1920 / 2, 1080 / 2, 325, 0x6666ff);
    this.r1 = this.add.image(1920 / 2, 1080 / 2, "circle");
  }
  update() {
    //console.log("test")
    //if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
    if (keyENTER.isDown) {
      console.log("down");
      this.r1.rotation += 0.01;
      //also make the cat walk here
    }
  }
}
