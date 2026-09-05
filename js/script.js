// ============================================
// SCRIPT.JS - Interaksi & Generate Produk + Filter
// ============================================

let allProducts = [];
let currentGenre = 'semua'; // 'semua', 'akun', 'item', 'joki'

// ===== EVENT HEADER =====
function bindHeaderEvents() {
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearBtn');
  const searchBtn = document.getElementById('searchBtn');
  const loginBtn = document.getElementById('loginBtn');

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

  if (loginBtn) {
    // loginBtn adalah <a>, tidak perlu event klik karena sudah berupa tautan
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
  // Update active class pada nav-cat-btn
  document.querySelectorAll('.nav-cat-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.genre === genre);
  });
  // Update active class pada genre-card (jika ada)
  document.querySelectorAll('.genre-card').forEach(card => {
    card.classList.toggle('active', card.dataset.genre === genre);
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

  // Event untuk nav kategori (header atas)
  document.querySelectorAll('.nav-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyFilter(btn.dataset.genre);
    });
  });

  // Event untuk genre-card (kotak besar)
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
    // Untuk halaman index (tanpa filter section)
    initHomePage();
  }
});
