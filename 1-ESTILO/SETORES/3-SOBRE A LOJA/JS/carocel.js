    (function () {
      const track = document.getElementById('track');
      const progress = document.getElementById('progress');
      const counter = document.getElementById('counter');
      const slides = Array.from(track.children);
      const total = slides.length;
      const visible = 4;
      let current = 0;
      let timer = null;

      function createBars() {
        progress.innerHTML = '';
        for (let i = 0; i < total; i++) {
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
        counter.textContent = `Slide ${current + 1} de ${total - visible + 1}`;
      }

      function update() {
        track.style.transform = 'translateX(-' + (current * 25) + '%)';
        createBars();
        updateCounter();
      }

      function nextSlide() {
        if (current < total - visible) {
          current++;
        } else {
          current = 0;
        }
        update();
      }

      function prevSlide() {
        if (current > 0) {
          current--;
        } else {
          current = total - visible;
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

      // Expor globalmente para os botões
      window.nextSlide = nextSlide;
      window.prevSlide = prevSlide;

      // Pausar ao passar o mouse
      track.parentElement.addEventListener('mouseenter', stopAuto);
      track.parentElement.addEventListener('mouseleave', startAuto);

      // Inicializar
      update();
      startAuto();
    })();