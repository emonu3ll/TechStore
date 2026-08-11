// ============================================
// TECHSTORE — Script del sitio público
// Nota: todavía SIN Firebase. Los productos y
// preguntas frecuentes viven en arrays acá abajo,
// a modo de demo. Cuando conectemos Firestore,
// esta misma función renderProducts() va a recibir
// los datos reales en vez de este array fijo.
// ============================================

// ---------- Datos de demo ----------
const productos = [
  {
    id: 'p1',
    title: 'Notebook 15.6" Ryzen 5 · 16GB · 512GB SSD',
    category: 'notebooks',
    priceGs: 6490000,
    sku: 'SKU-0192',
    badge: 'nuevo',
    status: 'ok',
    description: 'Notebook ideal para trabajo y estudio, con procesador Ryzen 5, 16GB de RAM y almacenamiento SSD para máxima velocidad.',
    features: ['16GB RAM', '512GB SSD', 'Ryzen 5', 'Pantalla 15.6"'],
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700&q=75&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=700&q=75&auto=format&fit=crop'
    ]
  },
  {
    id: 'p2',
    title: 'Teclado mecánico RGB switch rojo',
    category: 'perifericos',
    priceGs: 389000,
    sku: 'SKU-0231',
    badge: '',
    status: 'ok',
    description: 'Teclado mecánico con iluminación RGB personalizable y switches rojos, ideales para gaming y escritura rápida.',
    features: ['Switch rojo', 'RGB', 'Anti-ghosting', 'Cable USB-C'],
    images: [
      'https://images.unsplash.com/photo-1756388371735-cc845c578200?w=700&q=75&auto=format&fit=crop'
    ]
  },
  {
    id: 'p3',
    title: 'Placa de video 8GB GDDR6',
    category: 'componentes',
    priceGs: 3150000,
    sku: 'SKU-0304',
    badge: 'oferta',
    status: 'low',
    description: 'Placa de video con 8GB de memoria GDDR6, perfecta para gaming en Full HD y edición de video liviana.',
    features: ['8GB GDDR6', 'Ray Tracing', 'HDMI + DP', 'Refrigeración dual'],
    images: [
      'https://images.unsplash.com/photo-1515630278258-407f66498911?w=700&q=75&auto=format&fit=crop'
    ]
  },
  {
    id: 'p4',
    title: 'Silla gamer ergonómica reclinable',
    category: 'gaming',
    priceGs: 980000,
    sku: 'SKU-0356',
    badge: '',
    status: 'ok',
    description: 'Silla ergonómica reclinable con soporte lumbar, ideal para largas sesiones de estudio, trabajo o juego.',
    features: ['Reclinable 180°', 'Soporte lumbar', 'Apoyabrazos 4D', 'Base metálica'],
    images: [
      'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=700&q=75&auto=format&fit=crop'
    ]
  },
  {
    id: 'p5',
    title: 'Smartphone 128GB · 8GB RAM',
    category: 'celulares',
    priceGs: 2890000,
    sku: 'SKU-0412',
    badge: '',
    status: 'ok',
    description: 'Smartphone con 128GB de almacenamiento y 8GB de RAM, cámara de alta resolución y batería de larga duración.',
    features: ['128GB', '8GB RAM', 'Cámara 50MP', 'Batería 5000mAh'],
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=700&q=75&auto=format&fit=crop'
    ]
  },
  {
    id: 'p6',
    title: 'Mouse inalámbrico 16000 DPI',
    category: 'perifericos',
    priceGs: 219000,
    sku: 'SKU-0468',
    badge: '',
    status: 'ok',
    description: 'Mouse inalámbrico de alta precisión, ideal para gaming y uso profesional, con batería recargable.',
    features: ['16000 DPI', 'Inalámbrico', 'Batería recargable', '6 botones'],
    images: [
      'https://images.unsplash.com/photo-1585816517178-2398c69d12c6?w=700&q=75&auto=format&fit=crop'
    ]
  },
  {
    id: 'p7',
    title: 'Cargador rápido 65W GaN',
    category: 'accesorios',
    priceGs: 145000,
    sku: 'SKU-0501',
    badge: 'nuevo',
    status: 'ok',
    description: 'Cargador rápido de 65W con tecnología GaN, compacto y compatible con notebooks, celulares y tablets.',
    features: ['65W', 'Tecnología GaN', 'USB-C', 'Compacto'],
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=700&q=75&auto=format&fit=crop'
    ]
  },
  {
    id: 'p8',
    title: 'SSD NVMe 1TB Gen4',
    category: 'componentes',
    priceGs: 610000,
    sku: 'SKU-0549',
    badge: '',
    status: 'ok',
    description: 'Disco SSD NVMe de 1TB con interfaz Gen4, velocidades de lectura y escritura muy superiores a un disco tradicional.',
    features: ['1TB', 'NVMe Gen4', 'Lectura 7000MB/s', '5 años de garantía'],
    images: [
      'https://images.unsplash.com/photo-1515630278258-407f66498911?w=700&q=75&auto=format&fit=crop'
    ]
  }
];

const faqs = [
  { question: '¿Hacen envíos al interior del país?', answer: 'Sí, coordinamos envío a todo Paraguay a través de encomiendas. El costo y el tiempo de entrega varían según la localidad.' },
  { question: '¿Los productos tienen garantía?', answer: 'Todos los productos cuentan con garantía. El plazo depende del fabricante y la categoría — se detalla en cada ficha de producto.' },
  { question: '¿Qué medios de pago aceptan?', answer: 'Efectivo, transferencia bancaria y tarjetas de crédito/débito. Consultanos por WhatsApp si necesitás otra modalidad.' },
  { question: '¿Puedo retirar en el local?', answer: 'Sí, podés coordinar el retiro en nuestro local. Te compartimos la dirección exacta por WhatsApp al confirmar la compra.' }
];

// Servicios: foto, título y descripción — 100% editable desde el admin
const servicios = [
  {
    id: 's1',
    title: 'Armado de PC a medida',
    description: 'Te asesoramos y armamos tu computadora según tu uso y presupuesto, con garantía de armado.',
    image: 'https://images.unsplash.com/photo-1515630278258-407f66498911?w=600&q=75&auto=format&fit=crop'
  },
  {
    id: 's2',
    title: 'Mantenimiento y limpieza',
    description: 'Limpieza interna, cambio de pasta térmica y optimización para que tu equipo rinda como el primer día.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=75&auto=format&fit=crop'
  },
  {
    id: 's3',
    title: 'Instalación de software',
    description: 'Instalamos sistema operativo, drivers y programas esenciales, todo listo para usar.',
    image: 'https://images.unsplash.com/photo-1756388371735-cc845c578200?w=600&q=75&auto=format&fit=crop'
  },
  {
    id: 's4',
    title: 'Soporte técnico',
    description: 'Diagnóstico y solución de fallas de hardware o software, en el local o coordinando visita.',
    image: 'https://images.unsplash.com/photo-1585816517178-2398c69d12c6?w=600&q=75&auto=format&fit=crop'
  }
];

const categoryLabels = {
  notebooks: 'Notebooks', perifericos: 'Periféricos', componentes: 'Componentes',
  gaming: 'Gaming', celulares: 'Celulares', accesorios: 'Accesorios'
};
const badgeLabels = { oferta: 'Oferta', nuevo: 'Nuevo', destacado: 'Destacado' };

const WHATSAPP_NUMBER = '595991192212';

let currentFilter = { category: 'todos', search: '', sort: '' };
let currentModalProduct = null;
let currentSlideIndex = 0;

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderServices();
  renderFaqs();
  setupFilters();
  setupModal();
  setupLightbox();
  setupScrollReveal();
  setupContactForm();
});

// ============================================
// RENDER DE PRODUCTOS
// ============================================
function formatGs(n) {
  return 'Gs. ' + n.toLocaleString('es-PY');
}

function getFilteredProducts() {
  let list = [...productos];

  if (currentFilter.category !== 'todos') {
    list = list.filter(p => p.category === currentFilter.category);
  }
  if (currentFilter.search) {
    const q = currentFilter.search.toLowerCase();
    list = list.filter(p => p.title.toLowerCase().includes(q));
  }
  if (currentFilter.sort === 'asc') list.sort((a, b) => a.priceGs - b.priceGs);
  if (currentFilter.sort === 'desc') list.sort((a, b) => b.priceGs - a.priceGs);

  return list;
}

// ============================================
// RENDER DE SERVICIOS
// ============================================
function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  if (!servicios.length) {
    grid.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:#666; padding:20px 0;">Todavía no cargamos servicios.</p>';
    return;
  }

  grid.innerHTML = servicios.map(s => `
    <div class="service-card fade-in-element visible">
      <img src="${s.image}" alt="${s.title}">
      <div class="service-info">
        <h3>${s.title}</h3>
        <p>${s.description}</p>
        <button class="btn-whatsapp" onclick="consultarServicioWhatsapp('${s.title.replace(/'/g, "\\'")}')">
          <i class="fab fa-whatsapp"></i> Consultar
        </button>
      </div>
    </div>
  `).join('');
}

function consultarServicioWhatsapp(serviceName) {
  const msg = encodeURIComponent(`Hola JAVÜ Store, quiero consultar por el servicio: ${serviceName}`);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  const list = getFilteredProducts();

  if (!list.length) {
    grid.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:#666; padding:40px 0;">No encontramos productos con ese filtro. Probá con otra búsqueda.</p>';
    return;
  }

  grid.innerHTML = list.map(p => `
    <div class="product-card fade-in-element visible" onclick="openProductModal('${p.id}')">
      <div class="product-image-wrapper">
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${badgeLabels[p.badge]}</span>` : ''}
        <img src="${p.images[0]}" alt="${p.title}">
      </div>
      <div class="product-price">${formatGs(p.priceGs)}</div>
      <div class="product-info">
        <div class="product-cat">${categoryLabels[p.category] || p.category}</div>
        <h3>${p.title}</h3>
        <span class="stock-tag ${p.status === 'ok' ? 'ok' : 'low'}">${p.status === 'ok' ? 'En stock' : 'Últimas unidades'}</span>
        <button class="btn-whatsapp" style="margin-top:14px;" onclick="event.stopPropagation(); consultarWhatsapp('${p.title.replace(/'/g, "\\'")}')">
          <i class="fab fa-whatsapp"></i> Consultar
        </button>
      </div>
    </div>
  `).join('');
}

function consultarWhatsapp(productName) {
  const msg = encodeURIComponent(`Hola JAVÜ Store, quiero consultar por: ${productName}`);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
}

// ============================================
// BUSCADOR, FILTRO POR CATEGORÍA Y ORDEN
// ============================================
function setupFilters() {
  const searchInput = document.getElementById('filter-search-input');
  const searchBtn = document.getElementById('filter-search-btn');
  const categoriaSelect = document.getElementById('filter-categoria');
  const priceSortSelect = document.getElementById('filter-price-sort');
  const quickCats = document.querySelectorAll('.quick-cat-btn');

  function applyAndScroll() {
    renderProducts();
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
  }

  searchBtn.addEventListener('click', () => {
    currentFilter.search = searchInput.value.trim();
    applyAndScroll();
  });
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      currentFilter.search = searchInput.value.trim();
      applyAndScroll();
    }
  });

  categoriaSelect.addEventListener('change', () => {
    currentFilter.category = categoriaSelect.value;
    syncQuickCategoryButtons();
    applyAndScroll();
  });

  priceSortSelect.addEventListener('change', () => {
    currentFilter.sort = priceSortSelect.value;
    renderProducts();
  });

  quickCats.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter.category = btn.dataset.cat;
      categoriaSelect.value = btn.dataset.cat;
      syncQuickCategoryButtons();
      applyAndScroll();
    });
  });

  function syncQuickCategoryButtons() {
    quickCats.forEach(b => b.classList.toggle('active', b.dataset.cat === currentFilter.category));
  }
}

// ============================================
// MODAL DE PRODUCTO (con carrusel de fotos)
// ============================================
function setupModal() {
  document.getElementById('modal-close').addEventListener('click', closeProductModal);
  document.getElementById('product-modal').addEventListener('click', (e) => {
    if (e.target.id === 'product-modal') closeProductModal();
  });
  document.getElementById('modal-image').addEventListener('click', () => {
    openLightbox(currentModalProduct.images, currentSlideIndex);
  });
}

function openProductModal(id) {
  const p = productos.find(x => x.id === id);
  if (!p) return;
  currentModalProduct = p;
  currentSlideIndex = 0;

  document.getElementById('modal-price').textContent = formatGs(p.priceGs);
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-sku').textContent = p.sku + ' · ' + categoryLabels[p.category];
  document.getElementById('modal-description').textContent = p.description;
  document.getElementById('modal-features').innerHTML = p.features.map(f =>
    `<div class="feature"><i class="fas fa-check-circle"></i> ${f}</div>`
  ).join('');
  document.getElementById('modal-whatsapp').href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola JAVÜ Store, quiero consultar por: ' + p.title)}`;

  renderSlide();
  renderDots();

  document.getElementById('product-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  document.getElementById('product-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function renderSlide() {
  document.getElementById('modal-image').src = currentModalProduct.images[currentSlideIndex];
}

function renderDots() {
  const dots = document.getElementById('slider-dots');
  if (currentModalProduct.images.length <= 1) { dots.innerHTML = ''; return; }
  dots.innerHTML = currentModalProduct.images.map((_, i) =>
    `<span class="slider-dot ${i === currentSlideIndex ? 'active' : ''}" onclick="goToSlide(${i})"></span>`
  ).join('');
}

function changeSlide(dir) {
  const total = currentModalProduct.images.length;
  currentSlideIndex = (currentSlideIndex + dir + total) % total;
  renderSlide();
  renderDots();
}

function goToSlide(i) {
  currentSlideIndex = i;
  renderSlide();
  renderDots();
}

// ============================================
// LIGHTBOX (zoom + deslizar, mobile y desktop)
// ============================================
let lightboxImages = [];
let lightboxIndex = 0;
let lightboxScale = 1;
let lightboxPos = { x: 0, y: 0 };
let dragStart = null;

function setupLightbox() {
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', () => moveLightbox(-1));
  document.getElementById('lightbox-next').addEventListener('click', () => moveLightbox(1));

  const wrapper = document.getElementById('lightbox-image-wrapper');
  const img = document.getElementById('lightbox-image');

  // Doble click / doble toque para zoom
  let lastTap = 0;
  wrapper.addEventListener('pointerdown', (e) => {
    const now = Date.now();
    if (now - lastTap < 300) {
      lightboxScale = lightboxScale > 1 ? 1 : 2.2;
      lightboxPos = { x: 0, y: 0 };
      applyLightboxTransform();
    }
    lastTap = now;

    if (lightboxScale > 1) {
      dragStart = { x: e.clientX - lightboxPos.x, y: e.clientY - lightboxPos.y };
      img.classList.add('dragging');
      img.setPointerCapture(e.pointerId);
    }
  });
  wrapper.addEventListener('pointermove', (e) => {
    if (dragStart) {
      lightboxPos.x = e.clientX - dragStart.x;
      lightboxPos.y = e.clientY - dragStart.y;
      applyLightboxTransform();
    }
  });
  wrapper.addEventListener('pointerup', () => { dragStart = null; img.classList.remove('dragging'); });

  // Pellizcar para zoom (touch)
  let pinchStartDist = null;
  wrapper.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      pinchStartDist = getTouchDist(e.touches);
    }
  });
  wrapper.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && pinchStartDist) {
      const newDist = getTouchDist(e.touches);
      const scale = Math.min(3, Math.max(1, lightboxScale * (newDist / pinchStartDist)));
      lightboxScale = scale;
      pinchStartDist = newDist;
      applyLightboxTransform();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('image-lightbox').classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') moveLightbox(-1);
    if (e.key === 'ArrowRight') moveLightbox(1);
  });
}

function getTouchDist(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

function applyLightboxTransform() {
  document.getElementById('lightbox-image').style.transform =
    `translate(${lightboxPos.x}px, ${lightboxPos.y}px) scale(${lightboxScale})`;
}

function openLightbox(images, startIndex) {
  lightboxImages = images;
  lightboxIndex = startIndex;
  lightboxScale = 1;
  lightboxPos = { x: 0, y: 0 };
  renderLightboxImage();
  document.getElementById('image-lightbox').classList.add('active');
}

function closeLightbox() {
  document.getElementById('image-lightbox').classList.remove('active');
}

function moveLightbox(dir) {
  lightboxScale = 1;
  lightboxPos = { x: 0, y: 0 };
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  renderLightboxImage();
}

function renderLightboxImage() {
  document.getElementById('lightbox-image').src = lightboxImages[lightboxIndex];
  document.getElementById('lightbox-image').style.transform = 'translate(0,0) scale(1)';
  document.getElementById('lightbox-counter').textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
  const nav = lightboxImages.length > 1;
  document.getElementById('lightbox-prev').style.display = nav ? 'flex' : 'none';
  document.getElementById('lightbox-next').style.display = nav ? 'flex' : 'none';
}

// ============================================
// FAQ — ACORDEÓN
// ============================================
function renderFaqs() {
  const list = document.getElementById('faq-list');
  list.innerHTML = faqs.map((f, i) => `
    <div class="faq-item ${i === 0 ? 'active' : ''}">
      <button class="faq-question" onclick="toggleFaq(this)">
        ${f.question}
        <i class="fas fa-chevron-down"></i>
      </button>
      <div class="faq-answer"><p>${f.answer}</p></div>
    </div>
  `).join('');
}

function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const wasActive = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
  if (!wasActive) item.classList.add('active');
}

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================
function setupScrollReveal() {
  const elements = document.querySelectorAll('.fade-in-element');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  elements.forEach(el => observer.observe(el));
}

// ============================================
// FORMULARIO DE CONTACTO → ENVÍA POR WHATSAPP
// ============================================
function setupContactForm() {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    const text = encodeURIComponent(
      `Hola JAVÜ Store, soy ${name} (tel: ${phone}). ${message}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    form.reset();
  });
}