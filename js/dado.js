(function() {
    self.Dado = function(x, y, ctx, canvas, h, w) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.value = 1;
        this.src = ["img/dado_1.png", "img/dado_2.png", "img/dado_3.png"];
        this.dado_actual = new Image();
        this.dado_actual.src = this.src[0];
        this.text = null;
        this.ctx = ctx;
        this.canvas = canvas;
    }

    self.Dado.prototype = {
        cambiar: function() {
            let num = Math.floor(Math.random() * 3);
            this.dado_actual.src = this.src[num];
            this.value = num + 1;
        },
        dibujar: function() {
            const ch = this.y - (this.h / 2);
            const cw = this.x - (this.w / 2);
            this.ctx.rect(cw - 3, ch - 3, this.w + 5, this.h + 5);
            this.ctx.fill();
            this.ctx.drawImage(this.dado_actual, cw, ch, this.w, this.h);
        },
        update: function() {
            this.cambiar();
            this.dibujar();
        },
        get value() {
            return this.value;
        }
    }
})();

var canvas = document.getElementById("canvas");
canvas.height = 400;
canvas.width = 600;
ctx = canvas.getContext("2d");
var dado = new Dado(canvas.width / 2, canvas.height / 2, ctx, canvas, 100, 100);
var fps = 60;

//Mouse
let mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove', function(e) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function onThat(a) {
    if (mouse.x > canvas.x && mouse.y > canvas.y) {
        if (mouse.x > a.x && mouse.y > a.y &&
            mouse.x < a.x + a.width && mouse.y < a.y + a.height) {
            return true;
        }
    }
    return false;
}

//Controller
window.onload = function() {
    setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dado.dibujar();
    }, 1000 / fps);
}