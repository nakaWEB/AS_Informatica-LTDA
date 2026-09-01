(function () {
  const track = document.getElementById('track');
  const progress = document.getElementById('progress');
  const counter = document.getElementById('counter');
  const slides = Array.from(track.children);
  const total = slides.length;
  let current = 0;
  let timer = null;
  let visible = getVisible();

  // Define quantos slides cabem na tela
  function getVisible() {
    const w = window.innerWidth;
    if (w < 480)  return 1;
    if (w < 768)  return 2;
    if (w < 1024) return 3;
    return 4;
  }

  // Porcentagem de deslocamento por slide
  function getSlidePercent() {
    return 100 / visible;
  }

  function createBars() {
    progress.innerHTML = '';
    const maxIndex = Math.max(0, total - visible);
    for (let i = 0; i <= maxIndex; i++) {
      const bar = document.createElement('div');
      bar.className = 'bar' + (i === current ? ' active' : '');
      bar.addEventListener('click', () => {
        current = i;
        update();
        resetTimer();
      });
      progress.appendChild(bar);
    }
  }

  function updateCounter() {
    const maxIndex = Math.max(0, total - visible);
    counter.textContent = `Slide ${current + 1} de ${maxIndex + 1}`;
  }

  function update() {
    const pct = getSlidePercent();
    track.style.transform = 'translateX(-' + (current * pct) + '%)';
    createBars();
    updateCounter();
  }

  function nextSlide() {
    const maxIndex = Math.max(0, total - visible);
    if (current < maxIndex) {
      current++;
    } else {
      current = 0;
    }
    update();
  }

  function prevSlide() {
    const maxIndex = Math.max(0, total - visible);
    if (current > 0) {
      current--;
    } else {
      current = maxIndex;
    }
    update();
  }

  function startAuto() {
    timer = setInterval(nextSlide, 5000);
  }

  function stopAuto() {
    clearInterval(timer);
  }

  function resetTimer() {
    stopAuto();
    startAuto();
  }

  // Ao redimensionar, recalcula slides visíveis
  function handleResize() {
    const newVisible = getVisible();
    if (newVisible !== visible) {
      visible = newVisible;
      const maxIndex = Math.max(0, total - visible);
      if (current > maxIndex) current = maxIndex;
      update();
    }
  }

  // Expor globalmente para os botões
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;

  // Pausar ao passar o mouse
  track.parentElement.addEventListener('mouseenter', stopAuto);
  track.parentElement.addEventListener('mouseleave', startAuto);

  // Recalcular no resize
  window.addEventListener('resize', handleResize);

  // Inicializar
  update();
  startAuto();
})();