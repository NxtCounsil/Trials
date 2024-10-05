let score = JSON.parse(localStorage.getItem('sample')) || {
  wins: 0,
  losses : 0,
  ties : 0
};

let result = '';
function playerMove(theMove){
  const computerMove = pickComputerMove();
  let cases = 0;

  if(theMove === computerMove){
    result = 'Tie';
    cases = 1;
  } else if(theMove === 'paper' && computerMove === 'scissors'){
    result = 'You Lose';
    cases = 2;
  } else if(theMove === 'paper' && computerMove === 'rock'){
    result = 'You Win';
    cases = 3;
  } else if(theMove === 'scissors' && computerMove === 'paper'){
    result = 'You Win';
    cases = 4;
  } else if(theMove === 'scissors' && computerMove === 'rock'){
    result = 'You Lose';
    cases = 5;
  } else if(theMove === 'rock' && computerMove === 'paper'){
    result = 'You Lose';
    cases = 6;
  } else if(theMove === 'rock' && computerMove === 'scissors'){
    result = 'You Win';
    cases = 7;
  }

  
  document.querySelector('.resultH').innerText = `${result}!`;
  const resultVisuals = document.querySelector('.compVSyou');
  let handAction;
  let handAction01;

  if(cases === 1){
    if(computerMove === 'rock'){
      handAction = 'hand-back-fist.svg';
      handAction01 = 'hand-back-fist.svg';
    } else if(computerMove === 'paper'){
      handAction = 'hand-paper.svg';
      handAction01 = 'hand-paper.svg';
    } else if(computerMove === 'scissors'){
      handAction = 'hand-scissors.svg';
      handAction01 = 'hand-scissors.svg';
    }
  } else if(cases === 2){
    handAction = 'hand-paper.svg';
    handAction01 = 'hand-scissors.svg';    
  } else if(cases === 3){
    handAction = 'hand-paper.svg';  
    handAction01 = 'hand-back-fist.svg';  
  } else if(cases === 4){
    handAction = 'hand-scissors.svg';  
    handAction01 = 'hand-paper.svg';  
  } else if(cases === 5){
    handAction = 'hand-scissors.svg';  
    handAction01 = 'hand-back-fist.svg';  
  } else if(cases === 6){
    handAction = 'hand-back-fist.svg';  
    handAction01 = 'hand-paper.svg';  
  } else if(cases === 7){
    handAction = 'hand-back-fist.svg';  
    handAction01 = 'hand-scissors.svg';  
  }

  resultVisuals.innerHTML = `
      <div class="yourMove">
      <img src="${handAction}">
      <h4>Your Move</h4>
    </div>
    <div class="compMove">
      <img src="${handAction01}">
      <h4>Bot's Move</h4>
    </div>
  `;

  if(result === 'You Win'){
    score.wins += 1;
  }else if(result === 'You Lose'){
    score.losses += 1;
  }else if(result === 'Tie'){
    score.ties += 1;
  }
  
  localStorage.setItem('sample', JSON.stringify(score));
  document.querySelector('.history').innerText = `Wins : ${score.wins}, Tie : ${score.ties}, Losses : ${score.losses}.`;
}

if(result === 'You Win'){
  score.wins += 1;
}else if(result === 'You Lose'){
  score.losses += 1;
}else if(result === 'Tie'){
  score.ties += 1;
}

localStorage.setItem('sample', JSON.stringify(score));
document.querySelector('.history').innerText = `Wins : ${score.wins}, Tie : ${score.ties}, Losses : ${score.losses}.`;


function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove;

  if(randomNumber > 0 && randomNumber < 1/3){
    computerMove = 'rock';
  } else if(randomNumber > 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  } else if(randomNumber > 2/3 && randomNumber < 1){
    computerMove = 'scissors';
  }

  return computerMove;
}

function resetScore(){
  score = {
    wins: 0,
    losses : 0,
    ties : 0
  }
  document.querySelector('.history').innerText = `Wins : ${score.wins}, Tie : ${score.ties}, Losses : ${score.losses}.`;
  localStorage.setItem('sample', JSON.stringify(score));
}