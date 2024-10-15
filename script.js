const words = ['Developement', 'Entrepreneurship', 'Technology', 'Innovation'];
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
  
  // Fade out
  changingText.style.opacity = '0';
  
  setTimeout(() => {
    changingText.innerHTML = '';

    for (let i = 0; i < targetWord.length; i++) {
      const span = document.createElement('span');
      span.textContent = randomChar();
      span.style.marginRight = '0.1em'; // Add this line
      changingText.appendChild(span);
    }

    // Fade in
    changingText.style.opacity = '1';

    for (let i = 0; i < targetWord.length; i++) {
      setTimeout(() => {
        animateLetter(changingText.children[i], targetWord[i], i);
      }, i * 100);
    }

    currentIndex = (currentIndex + 1) % words.length;
  }, 500); // Wait for fade out
}

function setupSubtitleAnimation() {
  const wrapper = document.querySelector('.subtitle-wrapper');
  const content = document.querySelector('.subtitle-content');
  const subtitle = content.querySelector('.subtitle');

  // Calculate the animation duration based on content width
  const contentWidth = content.offsetWidth;
  const animationDuration = contentWidth / 50; // Adjust 50 to change speed

  // Set the animation
  wrapper.style.setProperty('--animation-duration', `${animationDuration}s`);

  // Clone the subtitle text and append it to the existing subtitle
  subtitle.innerHTML += ' ' + subtitle.innerHTML;

  // Start the animation
  wrapper.classList.add('animate');
}

function animateInitialWord(word) {
  changingText.innerHTML = '';
  for (let i = 0; i < word.length; i++) {
    const span = document.createElement('span');
    span.textContent = randomChar();
    span.style.marginRight = '0.1em'; // Add this line
    changingText.appendChild(span);
  }

  changingText.style.opacity = '1';

  for (let i = 0; i < word.length; i++) {
    setTimeout(() => {
      animateLetter(changingText.children[i], word[i], i);
    }, i * 100);
  }
}

function startAnimation() {
  // Animate the first word
  const firstWord = words[0];
  animateInitialWord(firstWord);

  // Start the animation cycle with the second word
  setTimeout(() => {
    currentIndex = 1; // Start with the second word
    changeText();
    setInterval(changeText, 5000);
  }, 5000); // Wait 5 seconds before starting the cycle

  setupSubtitleAnimation();
}

startAnimation();
