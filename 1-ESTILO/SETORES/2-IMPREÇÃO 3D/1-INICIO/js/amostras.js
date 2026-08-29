    // ============================================
    // CATALOGO DE PRODUTOS (substitua pelos seus)
    // ============================================
    const allProducts = [
      { id: 1,  name: "Dragão Ancião",           price: "R$ 149,90", img: "https://images.unsplash.com/photo-1577493340887-b7bfff550145?w=400&h=400&fit=crop", badge: "Mais Vendido" },
      { id: 2,  name: "Grogu (Baby Yoda)",       price: "R$ 89,90",  img: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=400&fit=crop", badge: "Novo" },
      { id: 3,  name: "Gato Geométrico",           price: "R$ 59,90",  img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop", badge: "" },
      { id: 4,  name: "Caveira Porta-Treco",       price: "R$ 49,90",  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", badge: "Promoção" },
      { id: 5,  name: "Engrenagem Helicoidal",     price: "R$ 39,90",  img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop", badge: "" },
      { id: 6,  name: "Robô Articulado",           price: "R$ 129,90", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop", badge: "Novo" },
      { id: 7,  name: "Vaso de Flor Moderno",      price: "R$ 69,90",  img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop", badge: "" },
      { id: 8,  name: "Capacete Mandaloriano",     price: "R$ 199,90", img: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=400&fit=crop", badge: "Exclusivo" },
      { id: 9,  name: "Dinossauro T-Rex",          price: "R$ 79,90",  img: "https://images.unsplash.com/photo-1569000972087-8d6c0b7c6e4a?w=400&h=400&fit=crop", badge: "" },
      { id: 10, name: "Luminária Lua",             price: "R$ 99,90",  img: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=400&h=400&fit=crop", badge: "Mais Vendido" },
      { id: 11, name: "Suporte Headset",           price: "R$ 45,90",  img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", badge: "" },
      { id: 12, name: "Organizador de Cabos",      price: "R$ 34,90",  img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", badge: "Promoção" }
    ];

    let currentProducts = [];
    let currentPage = 0;
    let itemsPerPage = 5;

    // ============================================
    // FUNÇÕES UTILITÁRIAS
    // ============================================
    function getItemsPerPage() {
      const w = window.innerWidth;
      if (w < 600)  return 1;
      if (w < 900)  return 2;
      if (w < 1100) return 3;
      if (w < 1300) return 4;
      return 5;
    }

    function shuffleArray(arr) {
      const shuffled = [...arr];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    // ============================================
    // RENDERIZAÇÃO
    // ============================================
    function renderProducts() {
      const carousel = document.getElementById('pdCarousel');
      const dotsContainer = document.getElementById('pdDots');
      itemsPerPage = getItemsPerPage();

      // Renderiza os cards
      carousel.innerHTML = currentProducts.map(p => `
        <div class="pd-card" onclick="viewProduct(${p.id})">
          ${p.badge ? `<div class="pd-badge">${p.badge}</div>` : ''}
          <img class="pd-card-img" src="${p.img}" alt="${p.name}" loading="lazy">
          <h3 class="pd-card-title">${p.name}</h3>
          <p class="pd-card-price">${p.price}</p>
          <button class="pd-card-btn">Ver Detalhes</button>
        </div>
      `).join('');

      // Renderiza os dots de paginação
      const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('button');
        dot.className = 'pd-dot' + (i === currentPage ? ' active' : '');
        dot.onclick = () => goToPage(i);
        dotsContainer.appendChild(dot);
      }

      updateCarouselPosition();
    }

    function updateCarouselPosition() {
      const carousel = document.getElementById('pdCarousel');
      const cardWidth = document.querySelector('.pd-card')?.offsetWidth || 220;
      const gap = 18;
      const offset = currentPage * itemsPerPage * (cardWidth + gap);
      carousel.style.transform = `translateX(-${offset}px)`;

      document.querySelectorAll('.pd-dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentPage);
      });
    }

    // ============================================
    // NAVEGAÇÃO
    // ============================================
    function moveCarousel(dir) {
      const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
      currentPage = (currentPage + dir + totalPages) % totalPages;
      updateCarouselPosition();
    }

    function goToPage(page) {
      currentPage = page;
      updateCarouselPosition();
    }

    // ============================================
    // EMBARALHAR PRODUTOS
    // ============================================
    function shuffleProducts() {
      currentProducts = shuffleArray(allProducts).slice(0, 8); // 8 aleatórios
      currentPage = 0;
      renderProducts();
    }

    // ============================================
    // VER DETALHES DO PRODUTO
    // ============================================
    function viewProduct(id) {
      const p = allProducts.find(x => x.id === id);
      // Aqui você redireciona para a página do produto:
      // window.location.href = `/produto/${id}`;
      alert(`🛒 Produto: ${p.name}\n💰 Preço: ${p.price}\n\n(Substitua este alert pela navegação real!)`);
    }

    // ============================================
    // EVENTOS
    // ============================================
    window.addEventListener('resize', () => {
      itemsPerPage = getItemsPerPage();
      const totalPages = Math.ceil(currentProducts.length / itemsPerPage);
      if (currentPage >= totalPages) currentPage = Math.max(0, totalPages - 1);
      renderProducts();
    });

    // Auto-rotação (pausa no hover)
    let autoRotate = setInterval(() => moveCarousel(1), 5000);
    document.querySelector('.pd-carousel-wrapper').addEventListener('mouseenter', () => clearInterval(autoRotate));
    document.querySelector('.pd-carousel-wrapper').addEventListener('mouseleave', () => {
      autoRotate = setInterval(() => moveCarousel(1), 5000);
    });

    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    shuffleProducts();