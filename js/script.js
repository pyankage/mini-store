// ============================================
// SCRIPT.JS - Interaksi, Drawer, Filter Produk
// ============================================

let allProducts = [];
let currentGenre = 'semua';

// ===== EVENT HEADER =====
function bindHeaderEvents() {
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearBtn');
  const searchBtn = document.getElementById('searchBtn');
  const menuDots = document.getElementById('menuDots');

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
    });
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query.length > 0) {
        alert('🔍 Anda mencari: "' + query + '"');
      } else {
        alert('Silakan ketik kata kunci terlebih dahulu.');
        searchInput.focus();
      }
    });
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchBtn.click();
      }
    });
  }

  // Drawer
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');

  if (menuDots) {
    menuDots.addEventListener('click', () => {
      openDrawer();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeDrawer);
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  // Klik tombol kategori di drawer
  document.querySelectorAll('.drawer-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const genre = btn.dataset.genre;
      applyFilter(genre);
      closeDrawer();
    });
  });
}

function openDrawer() {
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('drawerOverlay');
  if (drawer && overlay) {
    drawer.classList.add('active');
    overlay.classList.add('active');
  }
}

function closeDrawer() {
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('drawerOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
  }
}

// ===== DATA DUMMY =====
function createDummyProducts(count) {
  const genres = ['akun', 'item', 'joki'];
  const types = ['instan', 'otomatis'];
  const products = [];
  for (let i = 1; i <= count; i++) {
    const genre = genres[Math.floor(Math.random() * genres.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const price = Math.floor(Math.random() * 1000000) + 50000;
    products.push({
      id: i,
      name: `Produk ${i}`,
      price: price,
      genre: genre,
      type: type,
      image: `https://via.placeholder.com/400x225/hsl(${i * 15},40%,30%)/ffffff?text=Produk+${i}`
    });
  }
  return products;
}

// ===== RENDER PRODUK =====
function renderProducts(products, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image" style="background-image: url('${product.image}');"></div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
        <div class="product-meta">
          <span class="badge badge-genre">${product.genre.toUpperCase()}</span>
          <span class="badge badge-type">${product.type.toUpperCase()}</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => {
      alert(`Produk dipilih:\n${product.name}\nRp ${product.price.toLocaleString('id-ID')}\nGenre: ${product.genre}\nTipe: ${product.type}`);
    });
    grid.appendChild(card);
  });
}

// ===== FILTER & RENDER =====
function applyFilter(genre) {
  currentGenre = genre;
  // Update active class pada genre-card
  document.querySelectorAll('.genre-card').forEach(card => {
    card.classList.toggle('active', card.dataset.genre === genre);
  });
  // Update active class pada drawer-cat-btn
  document.querySelectorAll('.drawer-cat-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.genre === genre);
  });

  let filtered = allProducts;
  if (genre !== 'semua') {
    filtered = allProducts.filter(p => p.genre === genre);
  }
  renderProducts(filtered, 'productGrid');
}

// ===== INISIALISASI HALAMAN UTAMA =====
function initHomePage() {
  allProducts = createDummyProducts(28);
  renderProducts(allProducts, 'productGrid');

  // Event untuk genre-card
  document.querySelectorAll('.genre-card').forEach(card => {
    card.addEventListener('click', () => {
      applyFilter(card.dataset.genre);
    });
  });
}

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  bindHeaderEvents();
  if (document.getElementById('productGrid')) {
    initHomePage();
  }
});
