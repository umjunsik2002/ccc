class Play extends Phaser.Scene{
    constructor(){
        super('playScene');
    }
    preload(){}
    create(){
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