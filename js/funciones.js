 
            /* Variables */
            var ctx;
            var canvas;
            var palabra;
            var letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
            var colorTecla = "#6CD4FF";
            var colorMargen = "blue";
            var inicioX = 40;
            var inicioY = 300;
            var lon = 35;
            var margen = 10;
            var pistaText = "";

            /* Arreglos */
            var teclas_array = new Array();
            var letras_array = new Array();
            var palabras_array = new Array();

            /* Variables de control */
            var aciertos = 0;
            var errores = 0;
            //Variable extra para salir del mini-jeugo
            var game_over = false;
            /* Palabras */
            palabras_array.push("MARCUS");
            palabras_array.push("LOCUS");
            palabras_array.push("GNASHER");
            palabras_array.push("LANCER");
                    
            /* Objetos */
            function Tecla(x, y, ancho, alto, letra){
                this.x = x;
                this.y = y;
                this.ancho = ancho;
                this.alto = alto;
                this.letra = letra;
                this.dibuja = dibujaTecla;
            }
            
            function Letra(x, y, ancho, alto, letra){
                this.x = x;
                this.y = y;
                this.ancho = ancho;
                this.alto = alto;
                this.letra = letra;
                this.dibuja = dibujaCajaLetra;
                this.dibujaLetra = dibujaLetraLetra;
            }
           
            /* Funciones */

            /* Dibujar Teclas*/
            function dibujaTecla(){
                ctx.fillStyle = colorTecla;
                ctx.strokeStyle = colorMargen;
                ctx.fillRect(this.x, this.y, this.ancho, this.alto);
                ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
                
                ctx.fillStyle = "red";
                ctx.font = "bold 20px courier";
                ctx.fillText(this.letra, this.x+this.ancho/2-5, this.y+this.alto/2+5);
            }
            
            /* Dibua la letra y su caja */
            function dibujaLetraLetra(){
                var w = this.ancho;
                var h = this.alto;
                ctx.fillStyle = "blue";
                ctx.font = "bold 40px Courier";
                ctx.fillText(this.letra, this.x+w/2-12, this.y+h/2+14);
            }
            function dibujaCajaLetra(){
                ctx.fillStyle = "#E54B4B";
                ctx.strokeStyle = "red";
                ctx.fillRect(this.x, this.y, this.ancho, this.alto);
                ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
            }
            
            
            /// Funcion para dar una pista la usuario ////

            function pistaFunction(palabra){
                let pista = ""; // Se crea la variable local pista que contendra nuestra frase de pista
                
                switch(palabra){  // Se crea un switch para poder controlar las pistas segun la palabra 
                    case 'MARCUS':   // Se debera hacer un case por cada palabra 
                        pista = "Personaje principal de gears 1,2 y 3";
                        break;     // Es importante el break en cada case 
                    case 'LOCUS':
                        pista = "Enemigos mas comunes de gears";
                        break;
                    case 'GNASHER':
                        pista = "Escopeta mas comunmente usada";
                        break;
                    case 'LANCER':
                        pista = "Rifle mas popular del juego";

                        break;
                   /* default:  // El defaul se puede omitir // 
                        pista="No hay pista aun xP";*/
                }
                // Pintamos la palabra en el canvas , en este ejemplo se pinta arriba a la izquierda //
                ctx.fillStyle = "#B4C5E4";  // Aqui ponemos el color de la letra
                ctx.font = "bold 20px Courier";  // aqui ponemos el tipo y tamaño de la letra
                ctx.fillText(pista, 15, 20);  // aqui ponemos la frase en nuestro caso la variable pista , seguido de la posx y posy
            }
           
                    
             /* Distribuir nuestro teclado con sus letras respectivas al acomodo de nuestro array */
            function teclado(){
                var ren = 0;
                var col = 0;
                var letra = "";
                var miLetra;
                var x = inicioX;
                var y = inicioY;
                for(var i = 0; i < letras.length; i++){
                    letra = letras.substr(i,1);
                    miLetra = new Tecla(x, y, lon, lon, letra);
                    miLetra.dibuja();
                    teclas_array.push(miLetra);
                    x += lon + margen;
                    col++;
                    if(col==10){
                        col = 0;
                        ren++;
                        if(ren==2){
                            x = 120;
                        } else {
                            x = inicioX;
                        }
                    }
                    y = inicioY + ren * 50;
                }
            }
            
            
            /* aqui obtenemos nuestra palabra aleatoriamente y la dividimos en letras */
            function pintaPalabra(){
                //var p = Math.floor(Math.random()*palabras_array.length);
                //No va a ser aleatorio de momento
                var p = 0
                palabra = palabras_array[p];
      
                pistaFunction(palabra);
            
                var w = canvas.width;
                var len = palabra.length;
                var ren = 0;
                var col = 0;
                var y = 230;
                var lon = 50;
                var x = (w - (lon+margen) *len)/2;
                for(var i=0; i<palabra.length; i++){
                    letra = palabra.substr(i,1);
                    miLetra = new Letra(x, y, lon, lon, letra);
                    miLetra.dibuja();
                    miLetra.dibujaLetra()
                    letras_array.push(miLetra);
                    x += lon + margen;
                }
            }
            
            /* dibujar cadalzo y partes del pj segun sea el caso */
            function horca(errores){
                var imagen = new Image();
                imagen.src = "imagenes/ahorcado"+errores+".png";
                ctx.drawImage(imagen, canvas.width/3, 0, canvas.width/3, canvas.height/3);
                
                /*************************************************
                // Imagen 2 mas pequeña a un lado de la horca //       
                var imagen = new Image();
                imagen.src = "imagenes/ahorcado"+errores+".png";
                imagen.onload = function(){
                    ctx.drawImage(imagen, 620, 0, 100, 100);
                }
                *************************************************/
            }
            
            /* ajustar coordenadas */
            function ajusta(xx, yy){
                var posCanvas = canvas.getBoundingClientRect();
                var x = xx-posCanvas.left;
                var y = yy-posCanvas.top;
                return{x:x, y:y}
            }
            
            /* Detecta tecla clickeada y la compara con las de la palabra ya elegida al azar */
            function selecciona(e){
                var pos = ajusta(e.clientX, e.clientY);
                var x = pos.x;
                var y = pos.y;
                var tecla;
                var bandera = false;
                for (var i = 0; i < teclas_array.length; i++){
                    tecla = teclas_array[i];
                    if (tecla.x > 0){
                        if ((x > tecla.x) && (x < tecla.x + tecla.ancho) && (y > tecla.y) && (y < tecla.y + tecla.alto)){
                            break;
                        }
                    }
                }
                if (i < teclas_array.length){
                    for (var i = 0 ; i < palabra.length ; i++){ 
                        letra = palabra.substr(i, 1);
                        if (letra == tecla.letra){ /* comparamos y vemos si acerto la letra */
                            caja = letras_array[i];
                            caja.dibujaLetra();
                            aciertos++;
                            bandera = true;
                        }
                    }
                    if (bandera == false){ /* Si falla aumenta los errores y checa si perdio para mandar a la funcion gameover */
                        errores++;
                        horca(errores);
                        if (errores == 5) gameOver(errores);
                    }
                    /* Borra la tecla que se a presionado */
                    ctx.clearRect(tecla.x - 1, tecla.y - 1, tecla.ancho + 2, tecla.alto + 2);
                    tecla.x - 1;
                    /* checa si se gano y manda a la funcion gameover */
                    if (aciertos == palabra.length) gameOver(errores);
                }
            }
            
            /* Borramos las teclas y la palabra con sus cajas y mandamos msj segun el caso si se gano o se perdio */
            function gameOver(errores){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#00A7E1";

                ctx.font = "bold 20px Courier";
                if (errores < 5){
                    ctx.fillText("Muy bien, la palabra es: ", 30, 280);
                } else {
                    ctx.fillText("Lo sentimos, la palabra era: ", 30, 280);
                }
                
                ctx.font = "bold 80px Courier";
                lon = (canvas.width - (palabra.length*48))/2;
                ctx.fillText(palabra, lon, 380);
                horca(errores);

            }
            
            /* Detectar si se a cargado nuestro contexco en el canvas, iniciamos las funciones necesarias para jugar o se le manda msj de error segun sea el caso */
            init = function(){
                canvas = document.getElementById("canvas");
                canvas.width=500;
                canvas.height=500;
                console.log("Hola")
                function animar (){
                    window.requestAnimationFrame(animar)
                    teclado();
                    pintaPalabra();
                    horca(errores);
                }
                    if (canvas && canvas.getContext){
                        ctx = canvas.getContext("2d");
                        if(ctx){
                            canvas.addEventListener("click", selecciona, false);
                            animar()
                        } else {
                            alert ("Error al cargar el contexto!");
                        }
                    }
                
                
            }
            init()

            //funciones auxuliares
            //para que imprima en todo momento
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
            //cierra el canvas
            function terminar(canvas){
                var ctx = canvas.getContext("2d")
                ctx.clearRect(0,0, canvas.width, canvas.height);
            }
            function mandarScore(score){
                document.score.score_global.value +=score;
            }
