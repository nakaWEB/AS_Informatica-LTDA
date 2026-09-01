function toggleMenu() {
    const mobileNav = document.querySelector('.nav-links');
    const toggle = document.querySelector('.menu-toggle');
    mobileNav.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Fechar menu ao clicar em qualquer link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        // Atualiza link ativo
        if (!this.classList.contains('cta-btn')) {
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
        // Fecha menu mobile
        const mobileNav = document.querySelector('.nav-links');
        const toggle = document.querySelector('.menu-toggle');
        if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
});

// Fechar menu ao redimensionar para desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const mobileNav = document.querySelector('.nav-links');
        const toggle = document.querySelector('.menu-toggle');
        mobileNav.classList.remove('active');
        toggle.classList.remove('active');
    }
});