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
var juegoMh = (function  () {
	// Variables de la aplicación
	var canvas,
	ctx,
	buffer,
	bufferctx,
	bg,
	columna1,
	columa2,
	columna3,
	orden,
	score = 0,
	primeraBien, //Saber si coincide el ingreso con el orden aleatorio
	segundaBien,
	terceraBien,
	activo1 = true, //Si ya la ulso, que no pueda hacerlo otra vez
	activo2 = true,
	activo3 = true,
	contador = 0,
	boton1,
	boton2,
	boton3,
	boton1Img,
	boton2Img,
	boton3Img,
	estabienImg,
	estaMalImg,
	img1= new Image(),
    img2= new Image(),
    img3= new Image(),
	longitudOrden = 3,
	puntosAcierto = 1,
	keyPressed= {},
	keyMap={
		1:49,
		2:50,
		3:51,
		salir:32		
	},
	gameOver=false


	//Primeor voy a ahcer todas las funciones que me permitan ver el canvas
	function loop () {
		update();
		draw();
	}

	function preloadImages () {
		boton1Img = new Image()
		boton1Img.src='img/1.png'
		boton2Img = new Image()
		boton2Img.src='img/2.png'
		boton3Img = new Image()
		boton3Img.src='img/3.png'
		bg = new Image()
		bg.src = 'img/fondo_final.jpg'
		estabienImg = new Image()
		estabienImg.src = 'img/bien.jpg'
		estaMalImg = new Image()
		estaMalImg.src = 'img/mal.jpg'
		columna1= new Image()
		columna1.src="img/apagado.png"
		columna2=new Image()
		columna2.src="img/apagado.png"
		columna3= new Image()
		columna3.src="img/apagado.png"

	}

	function init () {
		// Hacer que jale, por el momento con eso me conformo
		preloadImages();

		canvas = document.getElementById('canvas');
		ctx = canvas.getContext("2d")
		buffer = document.createElement('canvas')
		buffer.width = canvas.width;
		buffer.height = canvas.height;
		bufferctx = buffer.getContext('2d');

		//Elementos instanciados
		ordenF=orden() //El que me dira, si lo ando ahciendo bien o no
		boton1 = new Boton(1);
		boton2 = new Boton(2);
		boton3 = new Boton(3);
		addListener(document, 'keypress', teclas )

		function animar () {
			loop()
			if(!gameOver){
				requestAnimationFrame(animar)
			}else{
				actualizarScore();
				return
			}
			
		}
		animar();
	}

	function update () {
		drawBackground();
		bufferctx.drawImage(boton1, boton1.posX, boton1.posY,102,102);
		bufferctx.drawImage(boton2, boton2.posX, boton2.posY,102,102);
		bufferctx.drawImage(boton3, boton3.posX, boton3.posY,102,102);
		//detectar teclas en todo momento
		pulsacionesJugador();
		//Actualizar cambios en todoMomento
		verBienMal();
	}
	function draw(){
		ctx.drawImage(buffer,0,0,canvas.width,canvas.height)
	}
	function drawBackground () {
		var fondo;
		fondo = bg;
		bufferctx.drawImage(fondo,0,0,canvas.width,canvas.height)
		//Las columnas entran en el background
		var col1 = columna1
		var col2 = columna2
		var col3= columna3
		bufferctx.drawImage(col1, 1*canvas.width/6-76.5, canvas.height/2 -100, 153,105)
		bufferctx.drawImage(col2, 3*canvas.width/6-76.5, canvas.height/2 - 100, 153,105)
		bufferctx.drawImage(col3, 5*canvas.width/6-76.5, canvas.height/2 - 100, 153,105)
	}

	//Aquí empezamos a hacer la parte logica
	function generarNumerosAleatorios (rango) { //El rango debe ser de 1 a 3
		// body...
		return Math.floor(Math.random()*rango)
	}

	function Boton(id){
		var settings = {
			defaultHeight:102
		};
		boton = new Image();
		boton.src= 'img/'+ id + '.png';
		//Localizar mis 3 botones si que se encimen
		boton.posX = (2*id*canvas.width/6) -canvas.width/6 - 51
		boton.posY = (canvas.height/2)
		boton.puntos = 1;
		boton.estaBien = false;
		return boton
	}

	function orden () {
		// A crear un orden de manera aleatoria de las teclas
		orden.primerNum = 0;
		orden.primerNum = generarNumerosAleatorios(3)+1;
		orden.segundoNum = 0;
		//Evitar que se repitan los números
		do{
			orden.segundoNum= generarNumerosAleatorios(3)+1;
		}while(orden.segundoNum==orden.primerNum);
		orden.tercerNum=0;
		do{
			orden.tercerNum = generarNumerosAleatorios(3)+1;
		}
		while(orden.segundoNum==orden.tercerNum || orden.tercerNum==orden.primerNum);
		
		orden.leerTecla = function () {
			// Vamos a ver que tecla se presionó
			switch(keyPressed){
				case 1:
					if (!activo1){
						return
					};
					if(orden.primerNum==keyPressed && contador==1){
						primeraBien=true
						boton1.estaBien=true
						score+=1
					}else{
						primeraBien=false
					}

					if(orden.segundoNum==keyPressed && contador==2){
						segundaBien=true
						boton1.estaBien=true
						score+=1
					}else{
						segundaBien=false
					}

					if(orden.tercerNum==keyPressed && contador==3){
						terceraBien=true
						boton1.estaBien=true
						score+=1
					}else{
						tercerNum=false
					}
					activo1=false;
					break;
				case 2:
					if(!activo2){
						return
					}
					if(orden.primerNum==keyPressed && contador==1){
						primeraBien=true
						boton2.estaBien=true
						score+=1
					}else{
						primeraBien=false
					}

					if(orden.segundoNum==keyPressed && contador==2){	
						segundaBien=true
						boton2.estaBien=true
						score+=1
					}else{
						segundaBien=false
					}

					if(orden.tercerNum==keyPressed && contador==3){
						terceraBien=true
						boton2.estaBien=true
						score+=1
					}else{
						tercerNum=false
					}
					activo2=false;
					break;
			
				case 3:
					if(!activo3){
						return
					}
					if(orden.primerNum==keyPressed && contador==1){
						primeraBien=true
						boton3.estaBien=true
						score+=1
					}else{
						primeraBien=false
					}
					if(orden.segundoNum==keyPressed && contador==2){
						segundaBien=true
						boton3.estaBien=true
						score+=1
					}else{
						segundaBien=false
					}

					if(orden.tercerNum==keyPressed && contador==3){
						terceraBien=true
						boton3.estaBien=true
						score+=1
					}else{
						tercerNum=false
					}
					activo3=false;
					break;
			}	
		}
	}

	function terminar(){
		gameOver=true;
		setTimeout(function () {
			ctx.clearRect(0,0, canvas.width, canvas.height);
			//ver score
		actualizarScore();
		})
	}

	function pulsacionesJugador () {
		orden.leerTecla();
	}

	//Añadir listener a las teclas
	function addListener(element, type, expression, bubbling) {
        bubbling = bubbling || false;
        if (window.addEventListener) { 
            element.addEventListener(type, expression, bubbling);
        } else if (window.attachEvent) { 
            element.attachEvent('on' + type, expression);
        }
    }

    function teclas(e) {
        var key = (window.event ? e.keyCode : e.which);
        for (var inkey in keyMap) {
            if (key === keyMap[inkey]) {
                e.preventDefault();
                keyPressed[inkey] = false;
            }
        }
		//Obtenemos el valor, y se lo ponemos a la variable ketPressed
		switch (key) {
			case 49:
				keyPressed=1;
				if(activo1){
					contador++;
				}
				break;
			case 50:
				keyPressed=2;
				if(activo2){
					contador++;
				}
				break;
			case 51:
				keyPressed=3;
				if(activo3){
					contador++;
				}
				break;
        }
        

    }

    function verBienMal () {
    	// Va a imprimir palomitas o taches
    	a1=bufferctx.drawImage(img1,(boton1.posX+boton1.width/4), (boton1.posY+boton1.height/4), 51,51)
    	a2=bufferctx.drawImage(img2,(boton2.posX+boton2.width/4), (boton2.posY+boton2.height/4), 51,51)
    	a3=bufferctx.drawImage(img3,(boton3.posX+boton3.width/4), (boton3.posY+boton3.height/4), 51,51)
    	switch(contador){
    		case 0:
    			return	
    			break;
			case 1: 
    			switch(keyPressed){
    				case 1:
    					if(boton1.estaBien){
    						img1=estabienImg
    						columna1.src='img/activado.png'
       					}else{
    						img1=estaMalImg
    					}
    					break;
			    	case 2:
    					if(boton2.estaBien){
    						img2=estabienImg
    						columna2.src='img/activado.png'
    					}else{
    						img2=estaMalImg
    					}
    					break;
    				case 3:
    					if(boton3.estaBien){
    						img3=estabienImg
    						columna3.src='img/activado.png'
    					}else{
    						img3=estaMalImg
    					}
    					break;
    				}
    			break;
    		
    		case 2:	
    			switch(keyPressed){
    				case 1:
    					if(boton1.estaBien){
    						img1=estabienImg
    						columna1.src='img/activado.png'
       					}else{
    						img1=estaMalImg
    					}
    					break;
			    	case 2:
    					if(boton2.estaBien){
    						img2=estabienImg
    						columna2.src='img/activado.png'
    					}else{
    						img2=estaMalImg
    					}
    					break;
    				case 3:
    					if(boton3.estaBien){
    						img3=estabienImg
    						columna3.src='img/activado.png'
    					}else{
    						img3=estaMalImg
    					}
    					break;
    				}
    			break;
    		case 3:
    			switch(keyPressed){
    				case 1:
    					if(boton1.estaBien){
    						img1=estabienImg
    						columna1.src='img/activado.png'
       					}else{
    						img1=estaMalImg
    					}
    					break;
			    	case 2:
    					if(boton2.estaBien){
    						img2=estabienImg
    						columna2.src='img/activado.png'
    					}else{
    						img2=estaMalImg
    					}
    					break;
    				case 3:
    					if(boton3.estaBien){
    						img3=estabienImg
    						columna3.src='img/activado.png'
    					}else{
    						img3=estaMalImg
						}
    					break;
					}
				setTimeout(terminar, 2000)
    			break;
    	
		}
		
	}
	
	function terminar() {
		gameOver=true;
		ctx.clearRect(0,0, canvas.width, canvas.height);
	}
	
    function actualizarScore () {
		var incremento = Math.floor(parseInt(score))
		var score_global = document.score.score_global.value;
		score_global += incremento;
		document.score.score_global.value=incremento;
    }
	//El final 
	return {
		init: init
	}
})();

juegoMh.init()

