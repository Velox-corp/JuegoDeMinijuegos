const app = new PIXI.Application({
    backgroundColor: 0x1099bb,
    height: 500,
    width: 500
});


let text = new PIXI.Text('Any');
text.x = app.screen.width / 2;
text.y = app.screen.height - app.screen.height * 0.02;
text.anchor.set(0.5);
text.scale.set(0.5);
app.stage.addChild(text);

document.body.appendChild(app.view);

function ondown() {
    this.destroy();
    createDado();
}

function createDado() {
    // Set the initial position
    var numero = Math.floor(Math.random() * 6) + 1;
    text.text = "El numero es " + numero;
    var sprite = PIXI.Sprite.from('img/dado_' + numero + '.png');
    sprite.anchor.set(0.5);
    sprite.scale.set(0.5);
    sprite.x = app.screen.width / 2;
    sprite.y = app.screen.height - app.screen.height * 0.1;

    // Opt-in to interactivity
    sprite.interactive = true;

    // Shows hand cursor
    sprite.buttonMode = true;

    //Interactivad
    sprite.on('pointerdown', ondown);

    //Add to scene
    app.stage.addChild(sprite);
}

createDado();