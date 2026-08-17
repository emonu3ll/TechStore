// ============================================
// JAVÜ STORE ADMIN — sidebar + drawers
// Todavía SIN Firebase: todo vive en memoria
// mientras probamos el diseño.
// ============================================

// ---------- Datos de demo ----------
let productos = [
  { id: 'p1', title: 'Notebook 15.6" Ryzen 5 · 16GB · 512GB SSD', category: 'notebooks', priceGs: '6.490.000', oldPriceGs: '', status: 'stock', badge: 'nuevo', sku: 'SKU-0192', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=60&auto=format&fit=crop' },
  { id: 'p2', title: 'Teclado mecánico RGB switch rojo', category: 'perifericos', priceGs: '389.000', oldPriceGs: '', status: 'stock', badge: '', sku: 'SKU-0231', img: 'https://images.unsplash.com/photo-1756388371735-cc845c578200?w=200&q=60&auto=format&fit=crop' },
  { id: 'p3', title: 'Placa de video 8GB GDDR6', category: 'componentes', priceGs: '3.150.000', oldPriceGs: '3.690.000', status: 'ultimas', badge: 'oferta', sku: 'SKU-0304', img: 'https://images.unsplash.com/photo-1515630278258-407f66498911?w=200&q=60&auto=format&fit=crop' },
  { id: 'p4', title: 'Silla gamer ergonómica reclinable', category: 'gaming', priceGs: '980.000', oldPriceGs: '', status: 'stock', badge: '', sku: 'SKU-0356', img: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=200&q=60&auto=format&fit=crop' },
  { id: 'p5', title: 'Smartphone 128GB · 8GB RAM', category: 'celulares', priceGs: '2.890.000', oldPriceGs: '', status: 'stock', badge: 'destacado', sku: 'SKU-0412', img: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=200&q=60&auto=format&fit=crop' },
  { id: 'p6', title: 'Mouse inalámbrico 16000 DPI', category: 'perifericos', priceGs: '219.000', oldPriceGs: '', status: 'sinstock', badge: '', sku: 'SKU-0468', img: 'https://images.unsplash.com/photo-1585816517178-2398c69d12c6?w=200&q=60&auto=format&fit=crop' },
  { id: 'p7', title: 'Cargador rápido 65W GaN', category: 'accesorios', priceGs: '145.000', oldPriceGs: '', status: 'stock', badge: 'nuevo', sku: 'SKU-0501', img: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=200&q=60&auto=format&fit=crop' },
  { id: 'p8', title: 'SSD NVMe 1TB Gen4', category: 'componentes', priceGs: '610.000', oldPriceGs: '', status: 'stock', badge: '', sku: 'SKU-0549', img: 'https://images.unsplash.com/photo-1601737487795-dab272f52420?w=200&q=60&auto=format&fit=crop' }
];
let servicios = [
  { id: 's1', title: 'Armado de PC a medida', description: 'Te asesoramos y armamos tu computadora según tu uso y presupuesto.', img: 'https://images.unsplash.com/photo-1515630278258-407f66498911?w=200&q=60&auto=format&fit=crop' },
  { id: 's2', title: 'Mantenimiento y limpieza', description: 'Limpieza interna, cambio de pasta térmica y optimización.', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=60&auto=format&fit=crop' },
  { id: 's3', title: 'Instalación de software', description: 'Instalamos sistema operativo, drivers y programas esenciales.', img: 'https://images.unsplash.com/photo-1756388371735-cc845c578200?w=200&q=60&auto=format&fit=crop' },
  { id: 's4', title: 'Soporte técnico', description: 'Diagnóstico y solución de fallas, en el local o coordinando visita.', img: 'https://images.unsplash.com/photo-1585816517178-2398c69d12c6?w=200&q=60&auto=format&fit=crop' }
];
let faqs = [
  { id: 'f1', question: '¿Hacen envíos al interior del país?', answer: 'Sí, coordinamos envío a todo Paraguay a través de encomiendas.' },
  { id: 'f2', question: '¿Los productos tienen garantía?', answer: 'Todos los productos cuentan con garantía. El plazo depende del fabricante.' },
  { id: 'f3', question: '¿Qué medios de pago aceptan?', answer: 'Efectivo, transferencia bancaria y tarjetas de crédito/débito.' },
  { id: 'f4', question: '¿Puedo retirar en el local?', answer: 'Sí, coordinamos el retiro y te compartimos la dirección por WhatsApp.' }
];

const statusLabels = { stock: 'En stock', ultimas: 'Últimas unidades', sinstock: 'Sin stock' };
const categoryLabels = { notebooks: 'Notebooks', perifericos: 'Periféricos', componentes: 'Componentes', gaming: 'Gaming', celulares: 'Celulares', accesorios: 'Accesorios' };

let currentImages = [];        // fotos del producto en edición
let currentServiceImage = null;
let hasUnsavedChanges = false;

document.addEventListener('DOMContentLoaded', () => {
  initAdminNav();
  initProductsSection();
  initServicesSection();
  initFaqSection();
  initAboutSection();
  initContactSection();
  initHeroSection();
  initConfirmModal();
  initCropModal();
  trackUnsavedChanges();
});

/* ============================================
   LOGIN (misma lógica de siempre, sin cambios)
   ============================================ */
function login() {
  const email = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  const errorBox = document.getElementById('login-error');

  if (!email || !pass) {
    errorBox.textContent = 'Completá correo y contraseña.';
    errorBox.classList.add('show');
    return;
  }
  errorBox.classList.remove('show');
  document.getElementById('admin-login').style.display = 'none';
  document.getElementById('admin-panel').classList.remove('hidden');
  document.getElementById('welcome-message').textContent = `Conectado como ${email}`;
}

function confirmLogout() {
  if (hasUnsavedChanges) {
    openConfirmModal('Cerrar sesión', 'Tenés cambios sin guardar. Si cerrás sesión ahora, vas a perderlos.', doLogout, 'Salir igual');
  } else {
    doLogout();
  }
}
function doLogout() {
  document.getElementById('admin-panel').classList.add('hidden');
  document.getElementById('admin-login').style.display = 'grid';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  hasUnsavedChanges = false;
}

/* ============================================
   NAVEGACIÓN POR SIDEBAR
   ============================================ */
const SECTION_TITLES = {
  productos: 'Productos', servicios: 'Servicios', faq: 'Preguntas frecuentes',
  nosotros: 'Sobre nosotros', contacto: 'Contacto y redes', portada: 'Portada'
};
function initAdminNav() {
  document.querySelectorAll('.admin-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.section;
      document.querySelectorAll('.admin-nav-item').forEach(b => b.classList.toggle('is-active', b === btn));
      document.querySelectorAll('.admin-section').forEach(s => s.classList.toggle('is-active', s.id === 'section-' + key));
      document.getElementById('topbarTitle').textContent = SECTION_TITLES[key] || '';
      document.getElementById('admin-sidebar').classList.remove('is-open');
    });
  });
  document.getElementById('navToggle').addEventListener('click', () => {
    document.getElementById('admin-sidebar').classList.toggle('is-open');
  });
}

/* ============================================
   HELPERS COMPARTIDOS
   ============================================ */
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function setupDropzone(zoneEl, inputEl, onFiles) {
  if (!zoneEl || !inputEl) return;
  zoneEl.addEventListener('click', () => inputEl.click());
  inputEl.addEventListener('change', () => { onFiles(Array.from(inputEl.files)); inputEl.value = ''; });
  ['dragover', 'dragenter'].forEach(evt => zoneEl.addEventListener(evt, e => { e.preventDefault(); zoneEl.classList.add('is-dragover'); }));
  ['dragleave', 'dragend', 'drop'].forEach(evt => zoneEl.addEventListener(evt, () => zoneEl.classList.remove('is-dragover')));
  zoneEl.addEventListener('drop', e => {
    e.preventDefault();
    onFiles(Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/')));
  });
}
function formatNumber(input) {
  const digits = input.value.replace(/\D/g, '');
  input.value = digits ? Number(digits).toLocaleString('es-PY') : '';
}
function formatOwnerPhone(input) { input.value = input.value.replace(/\D/g, ''); }

function estimateUsd(priceGsStr) {
  const gs = Number(String(priceGsStr).replace(/\D/g, '')) || 0;
  return Math.round(gs / 7500).toLocaleString('es-PY'); // cotización referencial ~7.500 Gs./USD
}

/* ============================================
   MODAL DE CONFIRMACIÓN
   ============================================ */
let confirmCallback = null;
function initConfirmModal() {
  document.getElementById('confirmCancel').addEventListener('click', closeConfirmModal);
  document.getElementById('confirm-modal').addEventListener('click', e => { if (e.target.id === 'confirm-modal') closeConfirmModal(); });
}
function openConfirmModal(title, text, onConfirm, actionLabel) {
  document.getElementById('confirm-modal-title').textContent = title;
  document.getElementById('confirm-modal-text').textContent = text;
  const btn = document.getElementById('confirm-modal-action-btn');
  btn.textContent = actionLabel || 'Confirmar';
  confirmCallback = onConfirm;
  btn.onclick = () => { document.getElementById('confirm-modal').classList.remove('show'); if (confirmCallback) confirmCallback(); };
  document.getElementById('confirm-modal').classList.add('show');
}
function closeConfirmModal() { document.getElementById('confirm-modal').classList.remove('show'); confirmCallback = null; }

/* ============================================
   MODAL DE RECORTE (canvas real — arrastre + resize)
   ============================================ */
const cropState = { scale: 1, offsetX: 0, offsetY: 0, naturalW: 0, naturalH: 0, frame: { x: 0, y: 0, w: 0, h: 0 }, dragging: null, startPointer: { x: 0, y: 0 }, startFrame: { x: 0, y: 0, w: 0, h: 0 }, onApply: null };
const CROP_MIN = 40;

function openCropModal(src, onApply) {
  cropState.onApply = onApply;
  const img = document.getElementById('cropImg');
  img.onload = () => {
    const stage = document.getElementById('cropStage');
    const stageW = stage.clientWidth, stageH = stage.clientHeight;
    cropState.naturalW = img.naturalWidth; cropState.naturalH = img.naturalHeight;
    const scale = Math.max(stageW / cropState.naturalW, stageH / cropState.naturalH);
    const dW = cropState.naturalW * scale, dH = cropState.naturalH * scale;
    cropState.scale = scale;
    cropState.offsetX = (stageW - dW) / 2; cropState.offsetY = (stageH - dH) / 2;
    img.style.width = dW + 'px'; img.style.height = dH + 'px';
    img.style.left = cropState.offsetX + 'px'; img.style.top = cropState.offsetY + 'px';
    const size = Math.min(stageW, stageH) * 0.7;
    setFrame((stageW - size) / 2, (stageH - size) / 2, size, size);
  };
  img.src = src;
  document.getElementById('crop-modal').classList.add('show');
}
function closeCropModal() { document.getElementById('crop-modal').classList.remove('show'); cropState.onApply = null; }

function setFrame(x, y, w, h) {
  const stage = document.getElementById('cropStage');
  const stageW = stage.clientWidth, stageH = stage.clientHeight;
  w = Math.max(CROP_MIN, Math.min(w, stageW)); h = Math.max(CROP_MIN, Math.min(h, stageH));
  x = Math.max(0, Math.min(x, stageW - w)); y = Math.max(0, Math.min(y, stageH - h));
  cropState.frame = { x, y, w, h };
  const frame = document.getElementById('cropFrame');
  frame.style.left = x + 'px'; frame.style.top = y + 'px'; frame.style.width = w + 'px'; frame.style.height = h + 'px';
}
function pointerXY(e) { if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY }; return { x: e.clientX, y: e.clientY }; }

function initCropModal() {
  const frame = document.getElementById('cropFrame');
  frame.addEventListener('mousedown', e => startDrag(e, 'move'));
  frame.addEventListener('touchstart', e => startDrag(e, 'move'), { passive: true });
  document.querySelectorAll('.crop-handle').forEach(handle => {
    const corner = [...handle.classList].find(c => c !== 'crop-handle');
    handle.addEventListener('mousedown', e => { e.stopPropagation(); startDrag(e, corner); });
    handle.addEventListener('touchstart', e => { e.stopPropagation(); startDrag(e, corner); }, { passive: true });
  });
  function startDrag(e, mode) { cropState.dragging = mode; cropState.startPointer = pointerXY(e); cropState.startFrame = { ...cropState.frame }; }
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('touchmove', onDrag, { passive: false });
  document.addEventListener('mouseup', () => cropState.dragging = null);
  document.addEventListener('touchend', () => cropState.dragging = null);
  function onDrag(e) {
    if (!cropState.dragging) return;
    if (e.cancelable) e.preventDefault();
    const p = pointerXY(e), dx = p.x - cropState.startPointer.x, dy = p.y - cropState.startPointer.y, f = cropState.startFrame;
    if (cropState.dragging === 'move') setFrame(f.x + dx, f.y + dy, f.w, f.h);
    else if (cropState.dragging === 'se') setFrame(f.x, f.y, f.w + dx, f.h + dy);
    else if (cropState.dragging === 'nw') setFrame(f.x + dx, f.y + dy, f.w - dx, f.h - dy);
    else if (cropState.dragging === 'ne') setFrame(f.x, f.y + dy, f.w + dx, f.h - dy);
    else if (cropState.dragging === 'sw') setFrame(f.x + dx, f.y, f.w - dx, f.h + dy);
  }
  document.getElementById('cropCancel').addEventListener('click', closeCropModal);
  document.getElementById('cropApply').addEventListener('click', () => {
    const { x, y, w, h } = cropState.frame;
    const imgX = Math.max(0, (x - cropState.offsetX) / cropState.scale);
    const imgY = Math.max(0, (y - cropState.offsetY) / cropState.scale);
    const imgW = Math.min(cropState.naturalW - imgX, w / cropState.scale);
    const imgH = Math.min(cropState.naturalH - imgY, h / cropState.scale);
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(imgW); canvas.height = Math.round(imgH);
    canvas.getContext('2d').drawImage(document.getElementById('cropImg'), imgX, imgY, imgW, imgH, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    if (cropState.onApply) cropState.onApply(dataUrl);
    closeCropModal();
  });
}

/* ============================================
   PRODUCTOS
   ============================================ */
function initProductsSection() {
  renderProductsTable();
  document.getElementById('productSearch').addEventListener('input', renderProductsTable);
  document.getElementById('btnNewProduct').addEventListener('click', () => openProductDrawer(null));
  document.getElementById('productDrawerClose').addEventListener('click', closeProductDrawer);
  document.getElementById('productDrawerCancel').addEventListener('click', closeProductDrawer);
  document.getElementById('productDrawer').addEventListener('click', e => { if (e.target.id === 'productDrawer') closeProductDrawer(); });
  document.getElementById('productDrawerSave').addEventListener('click', saveProduct);

  setupDropzone(document.getElementById('drop-zone'), document.getElementById('file-input'), async files => {
    for (const file of files) { currentImages.push(await readFileAsDataURL(file)); }
    renderImagePreview();
  });
}

function renderProductsTable() {
  const term = document.getElementById('productSearch').value.trim().toLowerCase();
  const list = productos.filter(p => p.title.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term));
  const tbody = document.getElementById('productsTableBody');
  if (!list.length) { tbody.innerHTML = `<tr><td colspan="6" class="admin-empty">No hay productos que coincidan.</td></tr>`; return; }
  tbody.innerHTML = list.map(p => `
    <tr>
      <td><div class="row-name"><img class="row-thumb" src="${p.img}" alt=""><div><div>${p.title}</div><div class="row-sku">${p.sku}</div></div></div></td>
      <td>${categoryLabels[p.category] || p.category}</td>
<td>Gs. ${p.priceGs}${p.oldPriceGs ? `<div style="font-size:11px;color:#A9A4BE;text-decoration:line-through;">Gs. ${p.oldPriceGs}</div>` : `<div style="font-size:11px;color:var(--muted);">USD ${estimateUsd(p.priceGs)}</div>`}</td>
      <td>${statusLabels[p.status]}</td>
      <td>${p.badge ? `<span class="badge-mini ${p.badge}">${p.badge}</span>` : '—'}</td>
      <td><div class="row-actions">
        <button class="icon-btn" onclick="openProductDrawer('${p.id}')"><i class="fas fa-pen"></i></button>
        <button class="icon-btn danger" onclick="deleteProductPrompt('${p.id}')"><i class="fas fa-trash"></i></button>
      </div></td>
    </tr>`).join('');
}

function openProductDrawer(id) {
  document.getElementById('edit-product-id').value = id || '';
  document.getElementById('productDrawerTitle').textContent = id ? 'Editar producto' : 'Nuevo producto';
  if (id) {
    const p = productos.find(x => x.id === id);
    document.getElementById('prod-title').value = p.title;
    document.getElementById('prod-category').value = p.category;
    document.getElementById('prod-status').value = p.status;
    document.getElementById('prod-badge').value = p.badge;
    document.getElementById('prod-sku').value = p.sku;
    document.getElementById('prod-price-gs').value = p.priceGs;
    document.getElementById('prod-price-old').value = p.oldPriceGs || '';
    currentImages = [p.img];
  } else {
    ['prod-title','prod-sku','prod-price-gs','prod-price-old','prod-description','prod-specs','prod-supplier-name','prod-supplier-phone'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('prod-category').value = 'notebooks';
    document.getElementById('prod-status').value = 'stock';
    document.getElementById('prod-badge').value = '';
    currentImages = [];
  }
  renderImagePreview();
  updatePricePreview();
  document.getElementById('productDrawer').classList.add('is-open');
}
function closeProductDrawer() { document.getElementById('productDrawer').classList.remove('is-open'); }

function renderImagePreview() {
  const wrap = document.getElementById('image-preview');
  wrap.innerHTML = currentImages.map((src, i) => `
    <div class="photo-thumb">
      ${i === 0 ? '<span class="photo-main">Principal</span>' : ''}
      <img src="${src}" onclick="cropProductPhoto(${i})">
      <button class="photo-remove" onclick="removeImage(${i})">✕</button>
    </div>`).join('');
}
function cropProductPhoto(i) { openCropModal(currentImages[i], dataUrl => { currentImages[i] = dataUrl; renderImagePreview(); }); }
function removeImage(i) { currentImages.splice(i, 1); renderImagePreview(); }

function updatePricePreview() {
  const gs = document.getElementById('prod-price-gs').value;
  const old = document.getElementById('prod-price-old').value;
  const box = document.getElementById('price-preview');
  if (!gs) { box.textContent = 'Completá el precio arriba'; return; }
  box.innerHTML = old ? `<span style="text-decoration:line-through;opacity:0.5;font-size:0.8em;margin-right:8px;">Gs. ${old}</span>Gs. ${gs}` : `Gs. ${gs}`;
}

function saveProduct() {
  const title = document.getElementById('prod-title').value.trim();
  if (!title) { showToast('Escribí el nombre del producto.', 'error'); return; }
  const editId = document.getElementById('edit-product-id').value;
  const data = {
    title,
    category: document.getElementById('prod-category').value,
    status: document.getElementById('prod-status').value,
    badge: document.getElementById('prod-badge').value,
    sku: document.getElementById('prod-sku').value || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
    priceGs: document.getElementById('prod-price-gs').value || '0',
    oldPriceGs: document.getElementById('prod-price-old').value || '',
    img: currentImages[0] || 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=60&auto=format&fit=crop'
  };
  if (editId) {
    const idx = productos.findIndex(p => p.id === editId);
    productos[idx] = { ...productos[idx], ...data };
    showToast('Producto actualizado.', 'success');
  } else {
    productos.unshift({ id: 'p' + Date.now(), ...data });
    showToast('Producto guardado.', 'success');
  }
  renderProductsTable();
  closeProductDrawer();
  hasUnsavedChanges = false;
}

function deleteProductPrompt(id) {
  const p = productos.find(x => x.id === id);
  openConfirmModal('¿Eliminar este producto?', `Se va a eliminar "${p.title}" del catálogo.`, () => {
    productos = productos.filter(x => x.id !== id);
    renderProductsTable();
    showToast('Producto eliminado.', 'success');
  }, 'Eliminar');
}

/* ============================================
   SERVICIOS
   ============================================ */
function initServicesSection() {
  renderServicesAdminList();
  document.getElementById('btnNewService').addEventListener('click', () => openServiceDrawer(null));
  document.getElementById('serviceDrawerClose').addEventListener('click', closeServiceDrawer);
  document.getElementById('serviceDrawerCancel').addEventListener('click', closeServiceDrawer);
  document.getElementById('serviceDrawer').addEventListener('click', e => { if (e.target.id === 'serviceDrawer') closeServiceDrawer(); });
  document.getElementById('serviceDrawerSave').addEventListener('click', saveService);

  setupDropzone(document.getElementById('service-drop-zone'), document.getElementById('service-file-input'), async files => {
    if (!files.length) return;
    currentServiceImage = await readFileAsDataURL(files[0]);
    renderServiceImagePreview();
  });
}
function renderServicesAdminList() {
  const el = document.getElementById('servicesList');
  if (!servicios.length) { el.innerHTML = '<div class="admin-empty">Todavía no hay servicios cargados.</div>'; return; }
  el.innerHTML = servicios.map(s => `
    <div class="list-card">
      <div class="list-card-left"><img class="list-card-thumb" src="${s.img}" alt=""><div class="list-card-body"><h4>${s.title}</h4><p>${s.description}</p></div></div>
      <div class="row-actions">
        <button class="icon-btn" onclick="openServiceDrawer('${s.id}')"><i class="fas fa-pen"></i></button>
        <button class="icon-btn danger" onclick="deleteServicePrompt('${s.id}')"><i class="fas fa-trash"></i></button>
      </div>
    </div>`).join('');
}
function openServiceDrawer(id) {
  document.getElementById('edit-service-id').value = id || '';
  document.getElementById('serviceDrawerTitle').textContent = id ? 'Editar servicio' : 'Nuevo servicio';
  if (id) {
    const s = servicios.find(x => x.id === id);
    document.getElementById('service-title').value = s.title;
    document.getElementById('service-description').value = s.description;
    currentServiceImage = s.img;
  } else {
    document.getElementById('service-title').value = '';
    document.getElementById('service-description').value = '';
    currentServiceImage = null;
  }
  renderServiceImagePreview();
  document.getElementById('serviceDrawer').classList.add('is-open');
}
function closeServiceDrawer() { document.getElementById('serviceDrawer').classList.remove('is-open'); }
function renderServiceImagePreview() {
  const wrap = document.getElementById('service-image-preview');
  wrap.innerHTML = currentServiceImage ? `<div class="photo-thumb"><img src="${currentServiceImage}" onclick="cropServicePhoto()"><button class="photo-remove" onclick="removeServiceImage()">✕</button></div>` : '';
}
function cropServicePhoto() { openCropModal(currentServiceImage, dataUrl => { currentServiceImage = dataUrl; renderServiceImagePreview(); }); }
function removeServiceImage() { currentServiceImage = null; renderServiceImagePreview(); }

function saveService() {
  const title = document.getElementById('service-title').value.trim();
  const description = document.getElementById('service-description').value.trim();
  if (!title || !description) { showToast('Completá título y descripción.', 'error'); return; }
  const editId = document.getElementById('edit-service-id').value;
  const data = { title, description, img: currentServiceImage || 'https://images.unsplash.com/photo-1515630278258-407f66498911?w=200&q=60&auto=format&fit=crop' };
  if (editId) {
    const idx = servicios.findIndex(s => s.id === editId);
    servicios[idx] = { ...servicios[idx], ...data };
    showToast('Servicio actualizado.', 'success');
  } else {
    servicios.push({ id: 's' + Date.now(), ...data });
    showToast('Servicio guardado.', 'success');
  }
  renderServicesAdminList();
  closeServiceDrawer();
}
function deleteServicePrompt(id) {
  const s = servicios.find(x => x.id === id);
  openConfirmModal('¿Eliminar este servicio?', `Se va a eliminar "${s.title}".`, () => {
    servicios = servicios.filter(x => x.id !== id);
    renderServicesAdminList();
    showToast('Servicio eliminado.', 'success');
  }, 'Eliminar');
}

/* ============================================
   FAQ
   ============================================ */
function initFaqSection() {
  renderFaqAdminList();
  document.getElementById('btnNewFaq').addEventListener('click', () => openFaqDrawer(null));
  document.getElementById('faqDrawerClose').addEventListener('click', closeFaqDrawer);
  document.getElementById('faqDrawerCancel').addEventListener('click', closeFaqDrawer);
  document.getElementById('faqDrawer').addEventListener('click', e => { if (e.target.id === 'faqDrawer') closeFaqDrawer(); });
  document.getElementById('faqDrawerSave').addEventListener('click', saveFaq);
}
function renderFaqAdminList() {
  const el = document.getElementById('faqAdminList');
  if (!faqs.length) { el.innerHTML = '<div class="admin-empty">Todavía no hay preguntas cargadas.</div>'; return; }
  el.innerHTML = faqs.map(f => `
    <div class="list-card">
      <div class="list-card-body"><h4>${f.question}</h4><p>${f.answer}</p></div>
      <div class="row-actions">
        <button class="icon-btn" onclick="openFaqDrawer('${f.id}')"><i class="fas fa-pen"></i></button>
        <button class="icon-btn danger" onclick="deleteFaqPrompt('${f.id}')"><i class="fas fa-trash"></i></button>
      </div>
    </div>`).join('');
}
function openFaqDrawer(id) {
  document.getElementById('edit-faq-id').value = id || '';
  document.getElementById('faqDrawerTitle').textContent = id ? 'Editar pregunta' : 'Nueva pregunta';
  const f = id ? faqs.find(x => x.id === id) : null;
  document.getElementById('faq-question-input').value = f ? f.question : '';
  document.getElementById('faq-answer-input').value = f ? f.answer : '';
  document.getElementById('faqDrawer').classList.add('is-open');
}
function closeFaqDrawer() { document.getElementById('faqDrawer').classList.remove('is-open'); }
function saveFaq() {
  const question = document.getElementById('faq-question-input').value.trim();
  const answer = document.getElementById('faq-answer-input').value.trim();
  if (!question || !answer) { showToast('Completá la pregunta y la respuesta.', 'error'); return; }
  const editId = document.getElementById('edit-faq-id').value;
  if (editId) {
    const idx = faqs.findIndex(f => f.id === editId);
    faqs[idx] = { id: editId, question, answer };
    showToast('Pregunta actualizada.', 'success');
  } else {
    faqs.push({ id: 'f' + Date.now(), question, answer });
    showToast('Pregunta guardada.', 'success');
  }
  renderFaqAdminList();
  closeFaqDrawer();
}
function deleteFaqPrompt(id) {
  openConfirmModal('¿Eliminar esta pregunta?', 'Esta acción no se puede deshacer.', () => {
    faqs = faqs.filter(f => f.id !== id);
    renderFaqAdminList();
    showToast('Pregunta eliminada.', 'success');
  }, 'Eliminar');
}

/* ============================================
   SOBRE NOSOTROS / CONTACTO / PORTADA
   (formularios inline, con recorte real de imagen)
   ============================================ */
let contentImageData = null;
let heroImageData = null;

function initAboutSection() {
  setupDropzone(document.getElementById('contentDropzone'), document.getElementById('content-image-input'), async files => {
    if (!files.length) return;
    const raw = await readFileAsDataURL(files[0]);
    openCropModal(raw, dataUrl => { contentImageData = dataUrl; renderContentPhotoGrid(); });
  });
  document.getElementById('btnSaveAbout').addEventListener('click', () => {
    showToast('Sección "Sobre Nosotros" guardada.', 'success');
    hasUnsavedChanges = false;
  });
}
function renderContentPhotoGrid() {
  document.getElementById('contentPhotoGrid').innerHTML = contentImageData
    ? `<div class="photo-thumb"><img src="${contentImageData}" onclick="openCropModal(contentImageData, d => {contentImageData=d; renderContentPhotoGrid();})"><button class="photo-remove" onclick="contentImageData=null; renderContentPhotoGrid();">✕</button></div>` : '';
}

function initContactSection() {
  addSocialRow();
  document.getElementById('btnSaveContact').addEventListener('click', () => {
    showToast('Contacto y redes sociales guardados.', 'success');
    hasUnsavedChanges = false;
  });
}
function addSocialRow() {
  const container = document.getElementById('social-rows-container');
  const row = document.createElement('div');
  row.className = 'social-row';
  row.innerHTML = `
    <select><option value="instagram">Instagram</option><option value="facebook">Facebook</option><option value="tiktok">TikTok</option></select>
    <input type="text" placeholder="https://...">
    <button type="button" class="remove-social" onclick="this.parentElement.remove()"><i class="fas fa-xmark"></i></button>`;
  container.appendChild(row);
}

function initHeroSection() {
  setupDropzone(document.getElementById('heroDropzone'), document.getElementById('hero-image-input'), async files => {
    if (!files.length) return;
    const raw = await readFileAsDataURL(files[0]);
    openCropModal(raw, dataUrl => { heroImageData = dataUrl; renderHeroPhotoGrid(); });
  });
  document.getElementById('btnSaveHero').addEventListener('click', () => {
    showToast('Portada actualizada.', 'success');
    hasUnsavedChanges = false;
  });
}
function renderHeroPhotoGrid() {
  document.getElementById('heroPhotoGrid').innerHTML = heroImageData
    ? `<div class="photo-thumb"><img src="${heroImageData}" onclick="openCropModal(heroImageData, d => {heroImageData=d; renderHeroPhotoGrid();})"><button class="photo-remove" onclick="heroImageData=null; renderHeroPhotoGrid();">✕</button></div>` : '';
}

/* ============================================
   TOASTS
   ============================================ */
function showToast(text, type = 'default') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas fa-check-circle"></i><span>${text}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3200);
}

/* ============================================
   DETECCIÓN DE CAMBIOS SIN GUARDAR
   ============================================ */
function trackUnsavedChanges() {
  document.querySelectorAll('.admin-content input, .admin-content textarea, .admin-content select, .drawer-body input, .drawer-body textarea, .drawer-body select').forEach(el => {
    el.addEventListener('input', () => { hasUnsavedChanges = true; });
  });
}