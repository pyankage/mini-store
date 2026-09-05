// ============================================
// SCRIPT.JS - Interaksi, Generate Produk, Filter, Pagination
// ============================================

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 28; // 28 produk per halaman

// ===== EVENT HEADER =====
function bindHeaderEvents() {
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearBtn');
  const searchBtn = document.getElementById('searchBtn');
  const menuDots = document.getElementById('menuDots');
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

  if (menuDots) {
    menuDots.addEventListener('click', () => {
      alert('☰ Menu garis tiga (simulasi).');
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      alert('👤 Tombol MASUK (simulasi).');
    });
  }

  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
      const label = this.querySelector('.card-label').textContent;
      alert('Kategori dipilih: ' + label);
    });
  });

  document.querySelectorAll('.genre-card').forEach(card => {
    card.addEventListener('click', function() {
      const label = this.querySelector('.genre-label').textContent;
      alert('Genre dipilih: ' + label);
    });
  });
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

// ===== FILTER & SORT =====
function applyFiltersAndSort() {
  const genreFilter = document.querySelector('#genreFilter .filter-btn.active');
  const typeFilter = document.querySelector('#typeFilter .filter-btn.active');
  const sortSelect = document.getElementById('sortSelect');
  const selectedGenre = genreFilter ? genreFilter.dataset.genre : 'semua';
  const selectedType = typeFilter ? typeFilter.dataset.type : 'semua';
  const sortValue = sortSelect ? sortSelect.value : 'rekomendasi';

  filteredProducts = allProducts.filter(product => {
    const matchGenre = selectedGenre === 'semua' || product.genre === selectedGenre;
    const matchType = selectedType === 'semua' || product.type === selectedType;
    return matchGenre && matchType;
  });

  switch (sortValue) {
    case 'termurah':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'termahal':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    default:
      filteredProducts.sort((a, b) => a.id - b.id);
  }

  currentPage = 1; // reset ke halaman pertama
  renderPage();
}

// ===== PAGINATION =====
function renderPage() {
  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  if (currentPage > totalPages) currentPage = totalPages;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = filteredProducts.slice(startIndex, endIndex);

  renderProducts(pageItems, 'productGrid');

  // Update tombol dan info
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageInfo = document.getElementById('pageInfo');
  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === totalPages;
  if (pageInfo) pageInfo.textContent = `Halaman ${currentPage} dari ${totalPages}`;
}

// ===== INISIALISASI HALAMAN PRODUK =====
function initProductPage() {
  allProducts = createDummyProducts(50); // 50 produk dummy
  filteredProducts = [...allProducts];
  currentPage = 1;
  renderPage();

  // Event filter genre
  document.querySelectorAll('#genreFilter .filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('#genreFilter .filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      applyFiltersAndSort();
    });
  });

  // Event filter tipe
  document.querySelectorAll('#typeFilter .filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('#typeFilter .filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      applyFiltersAndSort();
    });
  });

  // Event sorting
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', applyFiltersAndSort);
  }

  // Event pagination
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderPage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

// ===== INISIALISASI HALAMAN UTAMA =====
function initHomePage() {
  const products = createDummyProducts(28);
  renderProducts(products, 'productGrid');
}

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  bindHeaderEvents();
  if (document.getElementById('productGrid')) {
    if (document.getElementById('genreFilter')) {
      initProductPage();
    } else {
      initHomePage();
    }
  }
});
