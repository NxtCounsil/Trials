const words = ['Developer', 'Entrepreneur', 'Techie', 'Innovator'];
let currentIndex = 0;
const changingText = document.getElementById('changingText');

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&';

function randomChar() {
  return characters[Math.floor(Math.random() * characters.length)];
}

function animateLetter(element, targetLetter, index) {
  let iterations = 0;
  const maxIterations = 10;

  const interval = setInterval(() => {
    if (iterations >= maxIterations) {
      clearInterval(interval);
      element.textContent = targetLetter;
      return;
    }

    element.textContent = randomChar();
    iterations++;
  }, 50);
}

function changeText() {
  const targetWord = words[currentIndex];
  changingText.style.opacity = '1';
  changingText.innerHTML = '';

  for (let i = 0; i < targetWord.length; i++) {
    const span = document.createElement('span');
    span.textContent = randomChar();
    changingText.appendChild(span);

    setTimeout(() => {
      animateLetter(span, targetWord[i], i);
    }, i * 100);
  }

  currentIndex = (currentIndex + 1) % words.length;
}

function startAnimation() {
  changeText();
  setInterval(changeText, 5000);
}

startAnimation();
