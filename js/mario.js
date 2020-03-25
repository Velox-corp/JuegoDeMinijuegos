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
                    this.direction *= -1.5;
                } else if (this.x < 0) {
                    this.estado_actual.src = "img/mario/mario_prueba.png";
                    this.direction *= -1.1;
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
            if (this.y >= 370) {
                return true;
            } else {
                this.estado_actual.src = "img/mario/mario_jump.png";
                return false;
            }
        }
    }
})();


//Script en general
var canvas = document.getElementById("canvas");
canvas.height = 500;
canvas.width = 500;
ctx = canvas.getContext("2d");
var rect = canvas.getBoundingClientRect();
background = new Image();
background.src = "img/mario/mario-background.png";
var mario = new Mario(0, 100, ctx, canvas, 50, 50);
var fps = 60;
var text = '';
var posibilidad = true;
var ganado = false;

//Mouse
let mouse = {
    x: undefined,
    y: undefined
};

canvas.addEventListener("click", function(e) {
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    if (Math.abs(mouse.x - mario.x) < 50 && Math.abs(mouse.y - mario.y) < 50 && posibilidad) {
        mario.over = true;
        ganado = true;
        mario.estado_actual.src = "img/mario/mario_over.png";
        setTimeout(function() {
            return;
        }, 5000);
        alamacenar(1);
    } else {
        return;
    }
});

//LocalStorage --> Sirve para guardardar info en el navegador 

//Controller
function controller() {
    if (!mario.over) {
        animacion();
    }
    if (!ganado) {
        setTimeout(function() {
            posibilidad = false;
            mario.over = true;
            setTimeout(function() {
                var titulo = document.getElementsByTagName("h1")[0];
                titulo.innerHTML = "Lo siento has perdido :(";
            }, 5000);
            window.location.href = "index.html";
        }, 5000);
    }

    function animacion() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.font = "30px Arial";
        ctx.fillText(text, 10, 50);
        mario.update();
        requestAnimationFrame(controller);
    };
}
//Almacenar datos en el navegador
function alamacenar(puntuacion) {
    var score_global = parseInt(localStorage.getItem("score_global"));
    score_global += puntuacion;
    localStorage.setItem("score_global", score_global);
    window.location.href = "index.html";
}

/*
----------Mojoras para una servicio mas estable------------
function mandarScore() {
    alamacenar(1);
    var score_global = document.score.score_global.value;
    score_global = parseInt(score_global);
    score_global += 1;
    document.score.score_global.value = score_global;
}
*/
requestAnimationFrame(controller);