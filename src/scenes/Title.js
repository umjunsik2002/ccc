class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    create() {
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
        this.add.text(225, 300, 'Press Enter for Start', menuConfig);
    

        //keybinds
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        //moving to other scenes
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('playScene');    
        }
      }
}