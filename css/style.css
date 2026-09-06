let allProducts = [];
let currentGenre = 'semua';
let currentSub = null;
let currentSort = 'rekomendasi';
let currentType = 'semua';
let currentPage = 1;
const itemsPerPage = 28;

// Data dummy
function createDummyProducts(count) {
  const genres = ['akun', 'item', 'joki'];
  const subMap = {
    akun: ['mobile-legends', 'free-fire', 'pubg', 'genshin'],
    item: ['skin', 'senjata', 'item-rare'],
    joki: ['rank-push', 'leveling', 'mabar']
  };
  const types = ['instan', 'manual'];
  const products = [];
  for (let i = 1; i <= count; i++) {
    const genre = genres[Math.floor(Math.random() * genres.length)];
    const subs = subMap[genre];
    const sub = subs[Math.floor(Math.random() * subs.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const price = Math.floor(Math.random() * 1000000) + 50000;
    const rating = (Math.random() * 2 + 3).toFixed(1);
    products.push({
      id: i,
      name: `Produk ${i} (${sub})`,
      price,
      genre,
      sub,
      type,
      rating,
      image: `https://via.placeholder.com/400x225/hsl(${i * 15},40%,30%)/ffffff?text=Produk+${i}`
    });
  }
  return products;
}

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
          <span class="badge badge-sub">${product.sub.toUpperCase()}</span>
          <span class="badge badge-rating"><i class="fa-solid fa-star"></i> ${product.rating}</span>
        </div>
        <button class="btn-buy">Beli Sekarang</button>
      </div>
    `;
    card.addEventListener('click', () => {
      alert(`Produk dipilih:\n${product.name}\nHarga: Rp ${product.price.toLocaleString('id-ID')}\nRating: ${product.rating}\nGenre: ${product.genre}\nSub: ${product.sub}\nTipe: ${product.type}`);
    });
    grid.appendChild(card);
  });
}

function applyFilterAndSort() {
  let filtered = allProducts;
  if (currentGenre !== 'semua') filtered = filtered.filter(p => p.genre === currentGenre);
  if (currentSub) filtered = filtered.filter(p => p.sub === currentSub);
  if (currentType !== 'semua') filtered = filtered.filter(p => p.type === currentType);

  switch (currentSort) {
    case 'termurah': filtered.sort((a,b) => a.price - b.price); break;
    case 'termahal': filtered.sort((a,b) => b.price - a.price); break;
    default: filtered.sort((a,b) => b.rating - a.rating);
  }
  return filtered;
}

function renderHomePage() {
  const filtered = applyFilterAndSort();
  renderProducts(filtered, 'productGrid');
}

function renderProductPage() {
  const filtered = applyFilterAndSort();
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  renderProducts(filtered.slice(start, end), 'productGrid');

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageInfo = document.getElementById('pageInfo');
  const prevPageNum = document.getElementById('prevPageNum');
  const nextPageNum = document.getElementById('nextPageNum');
  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === totalPages;
  if (pageInfo) pageInfo.textContent = `Halaman ${currentPage} dari ${totalPages}`;
  if (prevPageNum) prevPageNum.textContent = Math.max(1, currentPage - 1);
  if (nextPageNum) nextPageNum.textContent = Math.min(totalPages, currentPage + 1);
}

function bindEvents() {
  // Pencarian
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const q = searchInput.value.trim();
      if (q) alert('🔍 Mencari: ' + q); else alert('Ketik kata kunci dulu');
    });
    searchInput.addEventListener('keypress', e => { if(e.key==='Enter') searchBtn.click(); });
  }

  // Navigasi kategori
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      currentGenre = link.dataset.genre;
      currentSub = null;
      if (document.getElementById('pagination')) { currentPage=1; renderProductPage(); } else renderHomePage();
    });
  });

  // Dropdown subkategori
  document.querySelectorAll('.dropdown-content a').forEach(sub => {
    sub.addEventListener('click', (e) => {
      e.preventDefault();
      const parentDropdown = sub.closest('.dropdown');
      const navLink = parentDropdown.querySelector('.nav-link');
      currentGenre = navLink.dataset.genre;
      currentSub = sub.dataset.sub;
      if (document.getElementById('pagination')) { currentPage=1; renderProductPage(); } else renderHomePage();
    });
  });

  // Sort
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      if (document.getElementById('pagination')) { currentPage=1; renderProductPage(); } else renderHomePage();
    });
  }

  // Filter tipe
  const typeFilter = document.getElementById('typeFilter');
  if (typeFilter) {
    typeFilter.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        typeFilter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentType = btn.dataset.type;
        if (document.getElementById('pagination')) { currentPage=1; renderProductPage(); } else renderHomePage();
      });
    });
  }

  // Pagination (halaman kedua)
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) { currentPage--; renderProductPage(); window.scrollTo({top:0,behavior:'smooth'}); }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const totalPages = Math.ceil(applyFilterAndSort().length / itemsPerPage);
      if (currentPage < totalPages) { currentPage++; renderProductPage(); window.scrollTo({top:0,behavior:'smooth'}); }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const isProductPage = document.getElementById('pagination') !== null;
  allProducts = createDummyProducts(isProductPage ? 50 : 28);
  if (isProductPage) { currentPage=1; renderProductPage(); } else renderHomePage();
  bindEvents();
});
