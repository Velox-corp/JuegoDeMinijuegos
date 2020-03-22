const $pong = $('#pong');
const $playerPadel = $('#player-padel');
const $aiPadel = $('#ai-padel');
const $ball = $('#ball');

const Ar_Iz = -3 * Math.PI / 4;
const Ar_D = - Math.PI / 4;
const Ab_Iz = 3 * Math.PI / 4;
const Ab_D = Math.PI / 4;

let interval = null;
let aiPadel = null;//Automatico
let ball = null;

function start() 
{
    init();
    document.getElementById("start").disabled = true;
}   

function init () {
  aiPadel = {
    direction: 1,
    SPEED: 6,
    top: 0
  }

  ball = {
    top: 240,
    left: 460,
    angle: Ar_Iz,
    speed: 15
  }

  interval = setInterval(update, 20);
}

$pong.mousemove(function (evt) {
  if (!interval) {
    return;
  }
  const top = Math.min(
    $pong.height() - $playerPadel.height(),
    evt.pageY - $pong.offset().top
  )
  $playerPadel.css({
    top: `${top}px`
  });
});

function update() {
  updateBall();
  updateAiPadel();
}

//Angulos de movimientos del balon
function updateBall () {
  ball.top += ball.speed * Math.sin(ball.angle);
  ball.left += ball.speed * Math.cos(ball.angle);
  $ball.css({
    top: `${ball.top}px`,
    left: `${ball.left}px`
  });

  if (isBallOverlappingWithPlayerPadel()) {
    if (ball.angle === Ar_Iz) {
      ball.angle = Ar_D;
    } else {
      ball.angle = Ab_D;
    }
  }

  if (isBallOverlappingWithAiPadel()) {
    if (ball.angle === Ar_D) {
      ball.angle = Ar_Iz;
    } else {
      ball.angle = Ab_Iz;
    }
  }

  if (isBallOverlappingWithTop()) {
    if (ball.angle === Ar_D) {
      ball.angle = Ab_D;
    } else {
      ball.angle = Ab_Iz;
    }
  }

  if (isBallOverlappingWithBottom()) {
    if (ball.angle === Ab_D) {
      ball.angle = Ar_D;
    } else {
      ball.angle = Ar_Iz;
    }
  }

  const winner = getWinner();
  if (winner) {
    endGame(winner);
  }
}

function endGame(winner) {
  clearInterval(interval);
  interval = null;
  alert(`${winner}`);
  if (ball.left < 0) {
    alert(`0 PUNTOS`);
    location.href="";//AQUI ES EL ENLACE PARA REDIRECCIONAR SI PIERDE
  }
  else if (ball.left > $pong.width() - $ball.width()) {
    alert(`Obtienes 1 Punto ¡Felicidades!`);
    location.href="";//AQUI ES EL ENLACE PARA REDIRECCIONAR SI GANA
  } 
  
}

//Se superpone la pelota con el pedal del jugador
function isBallOverlappingWithPlayerPadel () {
  return $ball.overlaps('#player-padel').length > 0
}

//se superpone la bola con la raqueta automatica
function isBallOverlappingWithAiPadel () {
  return $ball.overlaps('#ai-padel').length > 0
}

//se superpone la bola con la parte superior
function isBallOverlappingWithTop () {
  return ball.top <= 0;
}

//se superpone la bola con la parte inferior
function isBallOverlappingWithBottom () {
  return ball.top >= $pong.height() - $ball.height();
}

//Actualizar
function updateAiPadel () {
  if (aiPadel.top > $pong.height() - $aiPadel.height()) {
    aiPadel.direction = -1;
  }

  if (aiPadel.top < 0) {
    aiPadel.direction = 1;
  }

  aiPadel.top += aiPadel.direction * aiPadel.SPEED;
  
  $aiPadel.css({
    top: `${aiPadel.top}px`
  });
}

function getWinner () {
  if (ball.left < 0){
    return '¡Has Perdido!';
  } else if (ball.left > $pong.width() - $ball.width()) {
    return '¡Has Ganado!';
  } else {
    return false;
  }
}