(function() {
    self.Mario = function(x, y, ctx, canvas, h, w) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.speed = 5;
        this.estado_actual = new Image();
        this.estado_actual.src = "img/mario/mario_prueba.png";
        this.text = null;
        this.ctx = ctx;
        this.canvas = canvas;
        this.direction = 1;
        this.over = false;
    }

    self.Mario.prototype = {
        dibujar: function() {
            this.ctx.drawImage(this.estado_actual, this.x, this.y, this.w, this.h);
        },
        move: function() {
            if (!this.over) {
                if (this.x + this.w > this.canvas.width) {
                    this.estado_actual.src = "img/mario/mario_prueba-l.png";
                    this.direction *= -1;
                } else if (this.x < 0) {
                    this.estado_actual.src = "img/mario/mario_prueba.png";
                    this.direction *= -1;
                }
                if (!this.isOnFloor()) {
                    this.y += 1.81;
                }
                this.x += this.speed * this.direction;
            }
        },
        update: function() {
            this.move();
            this.dibujar();
        },
        isOnFloor: function() {
            if (this.y >= 289) {
                return true;
            } else {
                return false;
            }
        }
    }
})();


//Script en general
var canvas = document.getElementById("canvas");
canvas.height = 400;
canvas.width = 600;
ctx = canvas.getContext("2d");
var rect = canvas.getBoundingClientRect();
background = new Image();
background.src = "img/mario/mario-background.png";
var mario = new Mario(0, 100, ctx, canvas, 50, 50);
var fps = 60;
var text = "has click sobre mario para ganar";

//Mouse
let mouse = {
    x: undefined,
    y: undefined
};

canvas.addEventListener("click", function(e) {
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    if (Math.abs(mouse.x - mario.x) < 50 && Math.abs(mouse.y - mario.y) < 50) {
        text = "¡Felicidades has ganado!";
        mario.over = true;
    } else {
        console.log(mouse);
    }
});

//Controller
window.onload = function() {
    setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.font = "30px Arial";
        ctx.fillText(text, 10, 50);
        mario.update();
    }, 1000 / fps);
}