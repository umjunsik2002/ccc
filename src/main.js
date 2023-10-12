let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1024,
        height: 768,
        physics:{
            default: "arcade",
            arcade : {
                //debug: true
            }
        },
    },
  },
  backgroundColor: "#000000",
  scene: [Title, Play],
};

let game = new Phaser.Game(config);

//variable defentions
let keyENTER = null;
