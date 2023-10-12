let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
        physics:{
            default: "arcade",
            arcade : {
                //debug: true
            }
        },
    },
    backgroundColor: '#555555',
    scene: [Play]
}

let game = new Phaser.Game(config);