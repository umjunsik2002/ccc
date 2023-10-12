class Play extends Phaser.Scene{
    constructor(){
        super('playScene');
    }
    preload(){
        this.load.image('cat', './assets/Sprite-0001.png')
    }
    create(){
        this.cat = new Cat(this, 500, 500, "cat").setOrigin(0.5, 0.5);
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '100px',
            color: '#FFFFFF',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //adding text
        this.add.text(225, 300, 'you are in play', menuConfig);
    }
    update(){
        //console.log("test")
    }
}