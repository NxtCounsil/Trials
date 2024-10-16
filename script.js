const words = ['Developement', 'Startups', 'Technology', 'Innovation'];
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
  
  changingText.style.opacity = '0';
  
  setTimeout(() => {
    changingText.innerHTML = '';

    for (let i = 0; i < targetWord.length; i++) {
      const span = document.createElement('span');
      span.textContent = randomChar();
      span.style.marginRight = '0.1em';
      changingText.appendChild(span);
    }

    changingText.style.opacity = '1';

    for (let i = 0; i < targetWord.length; i++) {
      setTimeout(() => {
        animateLetter(changingText.children[i], targetWord[i], i);
      }, i * 100);
    }

    currentIndex = (currentIndex + 1) % words.length;
  }, 500);
}

function setupSubtitleAnimation() {
  const wrapper = document.querySelector('.subtitle-wrapper');
  const content = document.querySelector('.subtitle-content');
  const subtitle = content.querySelector('.subtitle');

  const contentWidth = content.offsetWidth;
  const animationDuration = contentWidth / 100;

  wrapper.style.setProperty('--animation-duration', `${animationDuration}s`);

  subtitle.innerHTML += ' ' + subtitle.innerHTML;

  wrapper.classList.add('animate');
}

function animateInitialWord(word) {
  changingText.innerHTML = '';
  for (let i = 0; i < word.length; i++) {
    const span = document.createElement('span');
    span.textContent = randomChar();
    span.style.marginRight = '0.1em';
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
  const firstWord = words[0];
  animateInitialWord(firstWord);

  setTimeout(() => {
    currentIndex = 1;
    changeText();
    setInterval(changeText, 5000);
  }, 5000);

  setupSubtitleAnimation();
}

document.addEventListener('DOMContentLoaded', function() {
  var animation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'animation.json'
  });

  startAnimation();

  // Add scroll event listener
  const container = document.querySelector('.container'); // Adjust selector if needed
  const contentSection = document.querySelector('.content-section'); // Adjust selector if needed
  
  if (container && contentSection) {
    let isScrolling = false;
    let lastScrollTop = 0;
    
    function smoothScroll() {
      const contentSectionTop = contentSection.getBoundingClientRect().top + window.pageYOffset;
      const currentPosition = window.pageYOffset;
      
      if (currentPosition < contentSectionTop) {
        window.scrollTo(0, currentPosition + Math.ceil((contentSectionTop - currentPosition) * 0.1));
        requestAnimationFrame(smoothScroll);
      } else {
        isScrolling = false;
      }
    }

    window.addEventListener('scroll', function() {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (!isScrolling && st > lastScrollTop && st < container.offsetHeight) {
        isScrolling = true;
        requestAnimationFrame(smoothScroll);
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    });
  }
});
