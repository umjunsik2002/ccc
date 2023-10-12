class Play extends Phaser.Scene{
    constructor(){
        super('playScene');
    }
    preload(){
        this.load.image('cat', './assets/Sprite-0001.png')
    }
    create(){
        this.cat = new Cat(this, 500, 500, "cat").setOrigin(0.5, 0.5);
    }
    update(){
        console.log("test")
    }
}