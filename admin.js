// ============================================
// TECHSTORE ADMIN — Interacciones del panel
// Nota: todavía SIN Firebase. Todo lo que se
// "guarda" acá vive solo en memoria (arrays JS)
// mientras probamos el diseño. Cuando conectemos
// Firestore/Storage/Auth, este archivo se actualiza
// para leer y escribir datos reales.
// ============================================

// ---------- Estado en memoria (demo) ----------
let productos = [
  {
    id: 'p1',
    title: 'Notebook 15.6" Ryzen 5 · 16GB · 512GB SSD',
    category: 'notebooks',
    priceGs: '6.490.000',
    status: 'stock',
    sku: 'SKU-0192',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=60&auto=format&fit=crop'
  },
  {
    id: 'p2',
    title: 'Teclado mecánico RGB switch rojo',
    category: 'perifericos',
    priceGs: '389.000',
    status: 'stock',
    sku: 'SKU-0231',
    img: 'https://images.unsplash.com/photo-1756388371735-cc845c578200?w=200&q=60&auto=format&fit=crop'
  },
  {
    id: 'p3',
    title: 'Placa de video 8GB GDDR6',
    category: 'componentes',
    priceGs: '3.150.000',
    status: 'ultimas',
    sku: 'SKU-0304',
    img: 'https://images.unsplash.com/photo-1515630278258-407f66498911?w=200&q=60&auto=format&fit=crop'
  }
];

let faqs = [
  { id: 'f1', question: '¿Hacen envíos al interior del país?', answer: 'Sí, coordinamos envío a todo Paraguay a través de encomiendas. El costo y el tiempo de entrega varían según la localidad.' },
  { id: 'f2', question: '¿Los productos tienen garantía?', answer: 'Todos los productos cuentan con garantía. El plazo depende del fabricante y la categoría.' }
];

let currentImages = []; // fotos cargadas para el producto en edición (data URLs)
let hasUnsavedChanges = false;
let pendingCropContext = null; // 'content' | 'hero' — a qué campo va la imagen recortada
let pendingCropFile = null;

const statusLabels = { stock: 'En stock', ultimas: 'Últimas unidades', sinstock: 'Sin stock' };
const statusClass = { stock: 'ok', ultimas: 'low', sinstock: 'out' };
const categoryLabels = {
  notebooks: 'Notebooks', perifericos: 'Periféricos', componentes: 'Componentes',
  gaming: 'Gaming', celulares: 'Celulares', accesorios: 'Accesorios'
};

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderFaqs();
  addSocialRow(); // arranca con una fila de red social vacía

  setupDropZone();
  setupCropDrag();
  trackUnsavedChanges();
});

// ============================================
// LOGIN (demo visual — todavía sin Firebase Auth)
// ============================================
function login() {
  const email = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  const errorBox = document.getElementById('login-error');

  if (!email || !pass) {
    errorBox.textContent = 'Completá correo y contraseña.';
    errorBox.classList.add('show');
    return;
  }

  // Por ahora cualquier correo/contraseña completos entran, para poder
  // probar el diseño. Esto se reemplaza por Firebase Auth real después.
  errorBox.classList.remove('show');
  document.getElementById('admin-login').style.display = 'none';
  const panel = document.getElementById('admin-panel');
  panel.classList.add('show');
  document.getElementById('welcome-message').textContent = `Conectado como ${email}`;
}

function confirmLogout() {
  if (hasUnsavedChanges) {
    openConfirmModal('Tenés cambios sin guardar. Si cerrás sesión ahora, vas a perderlos.', () => {
      doLogout();
    });
  } else {
    doLogout();
  }
}

function doLogout() {
  document.getElementById('admin-panel').classList.remove('show');
  document.getElementById('admin-login').style.display = 'flex';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  hasUnsavedChanges = false;
}

// ============================================
// DROP ZONE DE FOTOS DE PRODUCTO
// ============================================
function setupDropZone() {
  const dz = document.getElementById('drop-zone');
  ['dragover', 'dragenter'].forEach(evt =>
    dz.addEventListener(evt, (e) => { e.preventDefault(); dz.classList.add('dragover'); })
  );
  ['dragleave', 'drop'].forEach(evt =>
    dz.addEventListener(evt, (e) => { e.preventDefault(); dz.classList.remove('dragover'); })
  );
  dz.addEventListener('drop', (e) => {
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  });
}

function handleFiles(fileList) {
  Array.from(fileList).forEach(file => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      // Acá, cuando conectemos Storage, en vez de guardar el data URL
      // directo vamos a comprimir la imagen antes de subirla.
      currentImages.push(e.target.result);
      renderImagePreview();
    };
    reader.readAsDataURL(file);
  });
}

function renderImagePreview() {
  const wrap = document.getElementById('image-preview');
  wrap.innerHTML = currentImages.map((src, i) => `
    <div class="img-wrap">
      <img src="${src}" alt="Foto ${i + 1}">
      <button class="remove-img" onclick="removeImage(${i})" type="button">×</button>
    </div>
  `).join('');
}

function removeImage(index) {
  currentImages.splice(index, 1);
  renderImagePreview();
}

// ============================================
// FORMATO DE PRECIO Y VISTA PREVIA
// ============================================
function formatNumber(input) {
  const digits = input.value.replace(/\D/g, '');
  input.value = digits ? Number(digits).toLocaleString('es-PY') : '';
}

function updatePricePreview() {
  const gs = document.getElementById('prod-price-gs').value;
  const usd = document.getElementById('prod-price-usd').value;
  const box = document.getElementById('price-preview');

  if (!gs && !usd) {
    box.textContent = 'Completá los campos de arriba';
    box.style.color = '#999';
    return;
  }
  let text = '';
  if (gs) text += `Gs. ${gs}`;
  if (gs && usd) text += '  ·  ';
  if (usd) text += `USD ${usd}`;
  box.textContent = text;
  box.style.color = '#1e3a5f';
}

function formatOwnerPhone(input) {
  // Simple: solo deja números
  input.value = input.value.replace(/\D/g, '');
}

// ============================================
// PRODUCTOS
// ============================================
function saveProduct() {
  const title = document.getElementById('prod-title').value.trim();
  if (!title) {
    showToast('Escribí el nombre del producto antes de guardar.', 'error');
    return;
  }

  const editId = document.getElementById('edit-product-id').value;
  const data = {
    title,
    category: document.getElementById('prod-category').value,
    priceGs: document.getElementById('prod-price-gs').value || '0',
    status: document.getElementById('prod-status').value,
    sku: document.getElementById('prod-sku').value || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
    img: currentImages[0] || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=60&auto=format&fit=crop'
  };

  if (editId) {
    const idx = productos.findIndex(p => p.id === editId);
    if (idx > -1) productos[idx] = { ...productos[idx], ...data };
    showToast('Producto actualizado.', 'success');
  } else {
    productos.unshift({ id: 'p' + Date.now(), ...data });
    showToast('Producto guardado.', 'success');
  }

  cancelEdit();
  renderProducts();
  hasUnsavedChanges = false;
}

function saveDraftManual() {
  // Placeholder: cuando haya Firestore, esto guarda con estado "borrador"
  // en vez de publicarlo directo en el sitio.
  showToast('Borrador guardado (todavía no visible en el sitio).', 'success');
}

function cancelEdit() {
  document.getElementById('prod-title').value = '';
  document.getElementById('prod-price-gs').value = '';
  document.getElementById('prod-price-usd').value = '';
  document.getElementById('prod-sku').value = '';
  document.getElementById('prod-description').value = '';
  document.getElementById('prod-specs').value = '';
  document.getElementById('prod-supplier-name').value = '';
  document.getElementById('prod-supplier-phone').value = '';
  document.getElementById('edit-product-id').value = '';
  currentImages = [];
  renderImagePreview();
  updatePricePreview();
  hasUnsavedChanges = false;
}

function editProduct(id) {
  const p = productos.find(x => x.id === id);
  if (!p) return;
  document.getElementById('edit-product-id').value = p.id;
  document.getElementById('prod-title').value = p.title;
  document.getElementById('prod-category').value = p.category;
  document.getElementById('prod-status').value = p.status;
  document.getElementById('prod-price-gs').value = p.priceGs;
  document.getElementById('prod-sku').value = p.sku;
  currentImages = [p.img];
  renderImagePreview();
  updatePricePreview();
  document.querySelector('.admin-content').scrollIntoView({ behavior: 'smooth' });
}

function deleteProduct(id) {
  openConfirmModal('¿Seguro que querés eliminar este producto? Esta acción no se puede deshacer.', () => {
    productos = productos.filter(p => p.id !== id);
    renderProducts();
    showToast('Producto eliminado.', 'success');
  }, 'Eliminar');
}

function renderProducts() {
  const container = document.getElementById('products-container');
  if (!productos.length) {
    container.innerHTML = '<p style="color:#999; text-align:center; padding: 20px;">Todavía no hay productos cargados.</p>';
    return;
  }
  container.innerHTML = productos.map(p => `
    <div class="product-item">
      <img src="${p.img}" alt="${p.title}">
      <div class="product-item-info">
        <h3>${p.title}</h3>
        <p class="price">Gs. ${p.priceGs} <span class="status-pill ${statusClass[p.status]}">${statusLabels[p.status]}</span></p>
        <p class="meta">${categoryLabels[p.category] || p.category} · ${p.sku}</p>
      </div>
      <div class="product-item-actions">
        <button class="icon-btn edit" onclick="editProduct('${p.id}')" aria-label="Editar"><i class="fas fa-pen"></i></button>
        <button class="icon-btn delete" onclick="deleteProduct('${p.id}')" aria-label="Eliminar"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

// ============================================
// FAQ
// ============================================
function saveFaq() {
  const question = document.getElementById('faq-question-input').value.trim();
  const answer = document.getElementById('faq-answer-input').value.trim();
  if (!question || !answer) {
    showToast('Completá la pregunta y la respuesta.', 'error');
    return;
  }
  const editId = document.getElementById('edit-faq-id').value;
  if (editId) {
    const idx = faqs.findIndex(f => f.id === editId);
    if (idx > -1) faqs[idx] = { id: editId, question, answer };
    showToast('Pregunta actualizada.', 'success');
  } else {
    faqs.push({ id: 'f' + Date.now(), question, answer });
    showToast('Pregunta agregada.', 'success');
  }
  cancelFaqEdit();
  renderFaqs();
}

function cancelFaqEdit() {
  document.getElementById('faq-question-input').value = '';
  document.getElementById('faq-answer-input').value = '';
  document.getElementById('edit-faq-id').value = '';
}

function editFaq(id) {
  const f = faqs.find(x => x.id === id);
  if (!f) return;
  document.getElementById('edit-faq-id').value = f.id;
  document.getElementById('faq-question-input').value = f.question;
  document.getElementById('faq-answer-input').value = f.answer;
}

function deleteFaq(id) {
  openConfirmModal('¿Eliminar esta pregunta frecuente?', () => {
    faqs = faqs.filter(f => f.id !== id);
    renderFaqs();
    showToast('Pregunta eliminada.', 'success');
  }, 'Eliminar');
}

function renderFaqs() {
  const container = document.getElementById('faq-container');
  if (!faqs.length) {
    container.innerHTML = '<p style="color:#999; text-align:center; padding: 20px;">Todavía no hay preguntas cargadas.</p>';
    return;
  }
  container.innerHTML = faqs.map(f => `
    <div class="product-item" style="align-items: flex-start;">
      <div class="product-item-info">
        <h3>${f.question}</h3>
        <p style="color:#666; font-size: 14px; margin: 0;">${f.answer}</p>
      </div>
      <div class="product-item-actions">
        <button class="icon-btn edit" onclick="editFaq('${f.id}')" aria-label="Editar"><i class="fas fa-pen"></i></button>
        <button class="icon-btn delete" onclick="deleteFaq('${f.id}')" aria-label="Eliminar"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

// ============================================
// CONTENIDO: SOBRE NOSOTROS / CONTACTO / HERO
// (por ahora solo confirman con un toast — cuando
// conectemos Firestore esto va a persistir de verdad
// y el sitio público lo va a leer desde ahí)
// ============================================
function saveContenido() {
  showToast('Personalización de "Sobre Nosotros" guardada.', 'success');
  hasUnsavedChanges = false;
}

function saveFooterContacto() {
  showToast('Contacto y redes sociales guardados.', 'success');
  hasUnsavedChanges = false;
}

function saveHero() {
  showToast('Portada actualizada.', 'success');
  hasUnsavedChanges = false;
}

function addSocialRow() {
  const container = document.getElementById('social-rows-container');
  const row = document.createElement('div');
  row.className = 'social-row';
  row.innerHTML = `
    <select>
      <option value="instagram">Instagram</option>
      <option value="facebook">Facebook</option>
      <option value="tiktok">TikTok</option>
    </select>
    <input type="text" placeholder="https://...">
    <button type="button" class="remove-social" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
  `;
  container.appendChild(row);
}

// ============================================
// SUBIDA DE IMAGEN PARA "SOBRE NOSOTROS" / "HERO"
// → abre el modal de recorte
// ============================================
function handleContentImageSelect(fileList, context) {
  const file = fileList[0];
  if (!file) return;
  pendingCropContext = context;
  pendingCropFile = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('crop-image').src = e.target.result;
    openCropModal();
  };
  reader.readAsDataURL(file);
}

// ============================================
// MODAL DE RECORTE (cuadrícula + esquinas arrastrables)
// ============================================
let cropState = { x: 40, y: 40, w: 200, h: 150, dragging: null, startX: 0, startY: 0 };

function openCropModal() {
  document.getElementById('crop-modal').classList.add('show');
  // posición inicial del recorte, centrado
  setTimeout(() => {
    const container = document.getElementById('crop-container');
    const rect = container.getBoundingClientRect();
    cropState.w = rect.width * 0.7;
    cropState.h = rect.height * 0.7;
    cropState.x = (rect.width - cropState.w) / 2;
    cropState.y = (rect.height - cropState.h) / 2;
    applyCropRect();
  }, 20);
}

function applyCropRect() {
  const el = document.getElementById('crop-rect');
  el.style.left = cropState.x + 'px';
  el.style.top = cropState.y + 'px';
  el.style.width = cropState.w + 'px';
  el.style.height = cropState.h + 'px';
}

function setupCropDrag() {
  const container = document.getElementById('crop-container');
  const rectEl = document.getElementById('crop-rect');

  rectEl.addEventListener('pointerdown', (e) => {
    if (e.target.classList.contains('crop-handle')) {
      cropState.dragging = e.target.dataset.corner;
    } else {
      cropState.dragging = 'move';
    }
    cropState.startX = e.clientX;
    cropState.startY = e.clientY;
    rectEl.setPointerCapture(e.pointerId);
  });

  rectEl.addEventListener('pointermove', (e) => {
    if (!cropState.dragging) return;
    const dx = e.clientX - cropState.startX;
    const dy = e.clientY - cropState.startY;
    const bounds = container.getBoundingClientRect();

    if (cropState.dragging === 'move') {
      cropState.x = Math.max(0, Math.min(bounds.width - cropState.w, cropState.x + dx));
      cropState.y = Math.max(0, Math.min(bounds.height - cropState.h, cropState.y + dy));
    } else {
      // Ajuste simple de esquina (mantiene mínimo razonable)
      const corner = cropState.dragging;
      if (corner.includes('r')) cropState.w = Math.max(60, Math.min(bounds.width - cropState.x, cropState.w + dx));
      if (corner.includes('l')) {
        const newW = Math.max(60, cropState.w - dx);
        cropState.x = Math.max(0, cropState.x + (cropState.w - newW));
        cropState.w = newW;
      }
      if (corner.includes('b')) cropState.h = Math.max(60, Math.min(bounds.height - cropState.y, cropState.h + dy));
      if (corner.includes('t')) {
        const newH = Math.max(60, cropState.h - dy);
        cropState.y = Math.max(0, cropState.y + (cropState.h - newH));
        cropState.h = newH;
      }
    }
    cropState.startX = e.clientX;
    cropState.startY = e.clientY;
    applyCropRect();
  });

  rectEl.addEventListener('pointerup', () => { cropState.dragging = null; });
  rectEl.addEventListener('pointercancel', () => { cropState.dragging = null; });
}

function cancelCrop() {
  document.getElementById('crop-modal').classList.remove('show');
  pendingCropContext = null;
  pendingCropFile = null;
}

function confirmCrop() {
  // Recorte real (canvas) se suma cuando conectemos compresión + Storage.
  // Por ahora usamos la imagen completa como preview para no bloquear el diseño.
  const src = document.getElementById('crop-image').src;
  if (pendingCropContext === 'content') {
    const preview = document.getElementById('content-image-preview');
    preview.src = src;
    preview.style.display = 'block';
  } else if (pendingCropContext === 'hero') {
    const preview = document.getElementById('hero-image-preview');
    preview.src = src;
    preview.style.display = 'block';
  }
  document.getElementById('crop-modal').classList.remove('show');
  showToast('Imagen recortada. No olvides guardar los cambios.', 'success');
}

// ============================================
// MODAL DE CONFIRMACIÓN GENÉRICO
// ============================================
let confirmModalCallback = null;

function openConfirmModal(text, onConfirm, actionLabel) {
  document.getElementById('confirm-modal-text').textContent = text;
  const btn = document.getElementById('confirm-modal-action-btn');
  btn.textContent = actionLabel || 'Salir igual';
  confirmModalCallback = onConfirm;
  btn.onclick = () => {
    document.getElementById('confirm-modal').classList.remove('show');
    if (confirmModalCallback) confirmModalCallback();
  };
  document.getElementById('confirm-modal').classList.add('show');
}

function closeConfirmModal() {
  document.getElementById('confirm-modal').classList.remove('show');
  confirmModalCallback = null;
}

// ============================================
// TOASTS
// ============================================
function showToast(text, type = 'default') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas fa-check-circle"></i><span>${text}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ============================================
// DETECCIÓN DE CAMBIOS SIN GUARDAR (simple)
// ============================================
function trackUnsavedChanges() {
  document.querySelectorAll('.admin-content input, .admin-content textarea, .admin-content select').forEach(el => {
    el.addEventListener('input', () => { hasUnsavedChanges = true; });
  });
}