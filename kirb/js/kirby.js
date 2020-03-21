
var a = 0,b = 0,c =0;


var sleep=new Image();
var wake=new Image();
var ctx;
var canvas = document.getElementById('kirby');
 var clicks=0;
 var gameover = false;
 var img=new Image();
var asleep = true;


ctx = canvas.getContext('2d');
img.src='img/antes.png';
sleep.src='img/kirby/16.png';
wake.src='img/kirby/64.png';
 window.onload = function() {
 	
 	
 	fps = 60;
 	//img.onload=function(){
	ctx.drawImage(img,25,15,250,125);
//}

	setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
		draw();
        
        
        
	},1000/fps);
}

function draw() {
text('Clicks : ' + Math.floor(clicks)+" / 100", '10px Exo', 10, 10, 'black');
    ctx.drawImage(img,25,15,250,125);

	if (gameover==true) {
		
        ctx.drawImage(wake,25,15,canvas.width/2+55, canvas.height/2+22.5);
        
        text('Ganaste', '45px Comic Sams MS',canvas.width/2-105, canvas.height/2-22.5, 'white');
	}
    else{
		ctx.drawImage(sleep,25,15,canvas.width/2+55, canvas.height/2+22.5);
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

        gameover=true;
        alert("Ganaste");
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

