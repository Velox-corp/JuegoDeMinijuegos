
var a = 0,b = 0,c =0;


var sleep=new Image();
var wake=new Image();
var ctx;
var canvas = document.getElementById('canvas');
 var clicks=0;
 var gameover = false;
 var img=new Image();
var asleep = true;


ctx = canvas.getContext('2d');
img.src='img/antes.png';
sleep.src='img/kirby/16.png';
wake.src='img/kirby/64.png';
window.requestAnimationFrame(main)
//a ver si se ejecuta

 function main() {
 	
 	fps = 60;
 	//img.onload=function(){
	//ctx.drawImage(img,25,15,canvas.width-25,canvas.height-15);
//}

    if(!gameover){
        window.requestAnimationFrame(main);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        rect(0,0,25,canvas.height,'white')
        rect(0,0,canvas.width,20,'white')
        text('Clicks : ' + Math.floor(clicks)+" / 100", '15px Exo', 10, 15, 'black');
    }  ;
        
}

function draw() {
    ctx.drawImage(img,25,20,canvas.width-25,canvas.height-15);

	if (gameover==true) {
		
        //ctx.drawImage(wake,25,15,canvas.width/2+55, canvas.height/2+22.5);
        
        text('Ganaste', '45px Comic Sams MS',canvas.width/2-105, canvas.height/2-22.5, 'white');
	}
    else{
		ctx.drawImage(sleep,canvas.width/4,canvas.height/4,canvas.width/2+55, canvas.height/2+22.5);
	}
}


function rect(x, y, w, h, c) {
	ctx.fillStyle = c;
	ctx.fillRect(x, y, w, h);
}

function text(txt, fnt, x, y, c) {
	ctx.fillStyle = c;
	ctx.font = fnt;
	ctx.fillText(txt, x, y);
}

canvas.onclick = function sum() {
    if  (clicks==100)
    {
        text('Ganaste', '45px Comic Sams MS',canvas.width/2-105, canvas.height/2-22.5, 'white');
        sleep.src="img/kirby/64.png";
        //alert("Ganaste");
        setTimeout(ganar, 3000)
        
    }
    else{
        gameover = false;

    clicks++;
    
    }};
function imgNumber(num ){
    var result="";
    if  (num<10)
    {
        result = ("0"+string(num));
    }
    else{
        result = string(num);
    }
    return result;
}
function ganar(){
    gameover=true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var score_global= document.score.score_global.value
    score_global+=Math.floor(1);
    document.score.score_global.value=score_global
}

