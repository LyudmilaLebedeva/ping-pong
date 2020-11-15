const fieldWidth = 1000;
const fieldHeight = 500;
const ballRadius = 10;
const racketWidth = 100;
const racketHeight = 15;
const baseBallStep = 10;

const ballElem = document.querySelector('.ball');
const mineRacketElem = document.querySelector('.racket_mine');
const enemyRacketElem = document.querySelector('.racket_enemy');
const popupElem = document.querySelector('.popup');

const ball = new Ball(ballElem, ballRadius, fieldWidth / 2, fieldHeight - racketHeight - ballRadius);
const mineRacket = new Racket(mineRacketElem, racketWidth, fieldWidth / 2);
const enemyRacket = new Racket(enemyRacketElem, racketWidth, fieldWidth / 2);

function gameReset() {
  popupElem.textContent = '';
  mineRacket.coord = fieldWidth/2;
  enemyRacket.coord = fieldWidth/2;
  ball.coordX = fieldWidth/2;
  ball.coordY = fieldHeight - racketHeight - ball.radius;
  setBallRandomStep();

  ball.update();
  enemyRacket.update();
  mineRacket.update();

  document.removeEventListener('click', gameReset);
  document.addEventListener('click', playing);
}

function gameOver(message) {
  document.removeEventListener('mousemove', mineRacketMoving);
  document.addEventListener('click', gameReset);
  popupElem.textContent = message;
}

function mineRacketMoving(event) {
  mineRacket.move(event.clientX, fieldWidth);
}

function isFrontEdge() {
  return ball.coordY < racketHeight + ballRadius;
}

function isBackEdge() {
  return ball.coordY > fieldHeight - racketHeight - ballRadius;
}

function isSideEdge() {
  return ball.coordX < ballRadius || ball.coordX > fieldWidth - ballRadius;
}

function isBallHit(racket) {
  return Math.abs(ball.coordX - racket.coord) <= racketWidth / 2;
}

function checkBallPosition() {
  if ( isBackEdge() ) {
    if (isBallHit(mineRacket)) {
      ball.stepY = - ball.stepY;
    }
    else {
      gameOver('You have lost!')
      return false;
    }
  }

  if ( isFrontEdge() ) {
    if (isBallHit(enemyRacket)) {
      ball.stepY = - ball.stepY;
    }
    else {
      gameOver('You have win!')
      return false;
    }
  }

  if ( isSideEdge() ) {
    ball.stepX = - ball.stepX;
  }

  return true;
}

function ballMoving() {
  ball.move();

  enemyRacket.move(ball.coordX, fieldWidth);

  if (!checkBallPosition()) {
    return;
  }

  ball.update();

  setTimeout(ballMoving, 20);
}


function playing() {
  document.removeEventListener('click', playing );
  document.addEventListener('mousemove', mineRacketMoving);

  ballMoving();
}

gameReset();

function setBallStepY() {
  ball.stepY = Math.sqrt(baseBallStep**2 - ball.stepX**2);
}

function setBallRandomStep() {
  ball.stepX = (2 * Math.random() - 1) * baseBallStep;
  setBallStepY(); 
}
