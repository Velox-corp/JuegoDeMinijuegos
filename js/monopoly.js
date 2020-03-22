
//A crear los "objetos"
(function () {
    self.Monopoly=function(width, height, bg, personaje) {
        this.width = width;
        this.height = height;
        this.bg = bg;
        this.personaje = personaje
        this.scoreGlobal = 0
        this.casilla=1
    }
    self.Monopoly.prototype = {
        personajeSeleccionado: function () {
            var indexps = document.selectPer.personajes.selectedIndex;
            var personajeSeleccionado = document.selectPer.personajes.options[indexps].value;
            switch (personajeSeleccionado) {
                case "felyne":
                    this.personaje.src="img/felyne_per.png";
                    break;
                case "reaper":
                    this.personaje.src="img/reaper.png";
                    break;
                case "kitana":
                    this.personaje.src="img/kitana.gif";
                    break;
            }
        }
    }
})();
(function () {
    self.Dado = function (monpoly) {
        this.cara = new Image()
        this.valorCara = 0
        this.monopoly = monopoly
        this.fueLanzado = false;
    }
    self.Dado.prototype = {
        tirarDado: function () {
            this.fueLanzado=true;
            this.valorCara= parseInt(Math.random()*3 +1)
            this.monopoly.casilla += this.valorCara;
            if(this.monopoly.casilla>7){
                this.monopoly.casilla=7;
            }
            switch (this.valorCara) {
                case 1:
                    this.cara.src='img/dado_1.png';
                    break;
                case 2:
                    this.cara.src="img/dado_2.png";
                    break;
                case 3:
                    this.cara.src="img/dado_3.png";
                    break;
 
                default:
                    break;
            }
        }
    }
})();


(function () {
    self.CargarMonopoly= function (canvas,monopoly,dado) {
        this.canvas = canvas;
        this.canvas.width = monopoly.width;
        this.canvas.height =monopoly.height;
        this.monopoly = monopoly;
        this.ctx = canvas.getContext("2d");
        this.dado = dado;
    }
    self.CargarMonopoly.prototype = {

        draw: function () {
            drawBg(this.ctx,this.monopoly.bg,this.canvas)
            drawPersonaje(this.ctx,this.monopoly.personaje,this.canvas,this.monopoly.casilla)
            drawDado(this.ctx,this.dado.cara,this.canvas)
        },
        verPosPer: function () {
            if(!this.dado.fueLanzado){
                return;
            }
            switch (this.monopoly.casilla) {
                case 2:
                    window.location.href="kirby.html";
                    break;
                case 3:
                    window.location.href="JuegoAhorcado.html";
                    break;
                case 4:
                    window.location.href="juegoMH.html";
                    break;
                case 5:
                    window.location.href="index.html";
                    break;
                case 6:
                    window.location.href="Videojuego_MK11.html";
                    break;
                case 7:
                    window.location.href="snake.html";
                    break;
                default:
                    break;
            }
        }
    }
})();

//Metodos de ayuda
function drawBg(ctx,bg,canvas){
    ctx.drawImage(bg,0,0,canvas.width, canvas.height)
}
function drawPersonaje(ctx,personaje, canvas, casilla) {
    switch (casilla) {
        case 1:
            ctx.drawImage(personaje, (canvas.width/12), (9*canvas.height/12), (canvas.width/6), canvas.height/6)
            break;
        case 2:
            ctx.drawImage(personaje, (5*canvas.width/12), (9*canvas.height/12), (canvas.width/6), canvas.height/6)
            break;
        case 3:
            ctx.drawImage(personaje, (9*canvas.width/12), (9*canvas.height/12), (canvas.width/6), canvas.height/6)
            break;
        case 4:
            ctx.drawImage(personaje, (9*canvas.width/12), (5*canvas.height/12), (canvas.width/6), canvas.height/6)
            break;
        case 5:
            ctx.drawImage(personaje, (9*canvas.width/12), (canvas.height/12), (canvas.width/6), canvas.height/6)
            break;
        case 6:
            ctx.drawImage(personaje, (5*canvas.width/12), (canvas.height/12), (canvas.width/6), canvas.height/6)
            break;
        case 7:
            ctx.drawImage(personaje, (canvas.width/12), (canvas.height/12), (canvas.width/6), canvas.height/6)
            break;
    }
    }
function drawDado(ctx, cara, canvas){
    ctx.drawImage(cara, canvas.width/3, canvas.height/3, canvas.width/3, canvas.height/3)
}
window.requestAnimFrame = (function () {
    return  window.requestAnimationFrame        ||
        window.webkitRequestAnimationFrame  ||
        window.mozRequestAnimationFrame     ||
        window.oRequestAnimationFrame       ||
        window.msRequestAnimationFrame      ||
        function ( /* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

//Ejecutor
function init() {
    var canvas = document.getElementById('canvas');
    var tablero = new Image();
    tablero.src="img/Tablero.jpg";
    var personaje = new Image();
    personaje.src='img/felyne_per.png';
    monopoly = new Monopoly(500,500,tablero,personaje);
    cara = new Image()
    cara.src='img/dado_1.png'
    dado = new Dado(monopoly)
    cargarMonopoly = new CargarMonopoly(canvas,monopoly,dado);
    cargarMonopoly.draw();
    document.addEventListener("keypress", function (ev) {
        if(ev.keyCode==32){
            dado.tirarDado()
        }
    });
    function animar(){
        window.requestAnimationFrame(animar);
        monopoly.personajeSeleccionado()
        cargarMonopoly.draw()
        cargarMonopoly.verPosPer()
    }
    animar()
}