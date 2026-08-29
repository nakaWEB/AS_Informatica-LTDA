    function toggleMenu() {
      const mobileNav = document.getElementById('mobileNav');
      const toggle = document.querySelector('.menu-toggle');
      mobileNav.classList.toggle('active');
      toggle.classList.toggle('active');
    }

    // Active link on click
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function (e) {
        if (!this.classList.contains('cta-btn')) {
          document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        }
      });
    });