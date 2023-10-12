class Play extends Phaser.Scene{
    constructor(){
        super('playScene');
    }
    preload(){}
    create(){

        this.cameras.main.setBackgroundColor('0xFFFFFF');
    }
    update(){
        console.log("test")
    }
}