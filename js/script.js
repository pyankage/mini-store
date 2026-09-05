// ============================================
// SCRIPT.JS - Store App (Final v24)
// Mendukung halaman utama & halaman kedua
// ============================================

let allProducts = [];
let currentGenre = 'semua';
let currentSub = null;
let currentSort = 'rekomendasi';
let currentType = 'semua';
let currentPage = 1;
const itemsPerPage = 28;

// ===== DATA DUMMY =====
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
    products.push({
      id: i,
      name: `Produk ${i} (${sub})`,
      price: price,
      genre: genre,
      sub: sub,
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
          <span class="badge badge-sub">${product.sub.toUpperCase()}</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => {
      alert(`Produk dipilih:\n${product.name}\nRp ${product.price.toLocaleString('id-ID')}\nGenre: ${product.genre}\nSub: ${product.sub}\nTipe: ${product.type}`);
    });
    grid.appendChild(card);
  });
}

// ===== FILTER & SORT =====
function applyFilterAndSort() {
  let filtered = allProducts;

  // Filter genre (jika elemen drawer/genre ada)
  const hasGenreFilter = document.getElementById('drawer') || document.getElementById('genreMenu');
  if (hasGenreFilter) {
    if (currentGenre !== 'semua') {
      filtered = filtered.filter(p => p.genre === currentGenre);
    }
    if (currentSub) {
      filtered = filtered.filter(p => p.sub === currentSub);
    }
  }

  // Filter tipe
  if (document.getElementById('typeFilter')) {
    if (currentType !== 'semua') {
      filtered = filtered.filter(p => p.type === currentType);
    }
  }

  // Sort
  switch (currentSort) {
    case 'termurah':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'termahal':
      filtered.sort((a, b) => b.price - a.price);
      break;
    default:
      filtered.sort((a, b) => a.id - b.id);
  }

  return filtered;
}

// ===== RENDER HALAMAN UTAMA =====
function renderHomePage() {
  const filtered = applyFilterAndSort();
  renderProducts(filtered, 'productGrid');
}

// ===== RENDER HALAMAN KEDUA (dengan pagination) =====
function renderProductPage() {
  const filtered = applyFilterAndSort();
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filtered.slice(start, end);
  renderProducts(pageItems, 'productGrid');

  // Update elemen pagination
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

// ===== DRAWER =====
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

// ===== EVENT BINDING =====
function bindEvents() {
  // Pencarian utama
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearBtn');
  const searchBtn = document.getElementById('searchBtn');
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
  const menuDots = document.getElementById('menuDots');
  const overlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');
  if (menuDots && overlay) menuDots.addEventListener('click', openDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  // Pencarian kategori di drawer
  const drawerSearch = document.getElementById('drawerSearchInput');
  if (drawerSearch) {
    drawerSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('.drawer-cat-btn, .drawer-sub-btn').forEach(btn => {
        btn.style.display = btn.textContent.toLowerCase().includes(query) ? '' : 'none';
      });
      document.querySelectorAll('.drawer-category-group').forEach(group => {
        const visible = group.querySelectorAll('.drawer-cat-btn[style=""]').length > 0 ||
                        group.querySelectorAll('.drawer-sub-btn[style=""]').length > 0;
        group.style.display = visible ? '' : 'none';
      });
    });
  }

  // Kategori di drawer
  document.querySelectorAll('.drawer-cat-btn.main').forEach(btn => {
    btn.addEventListener('click', () => {
      currentGenre = btn.dataset.genre;
      currentSub = null;
      if (document.getElementById('pagination')) {
        currentPage = 1;
        renderProductPage();
      } else {
        renderHomePage();
      }
      closeDrawer();
    });
  });

  const semuaBtn = document.querySelector('.drawer-cat-btn[data-genre="semua"]');
  if (semuaBtn) {
    semuaBtn.addEventListener('click', () => {
      currentGenre = 'semua';
      currentSub = null;
      if (document.getElementById('pagination')) {
        currentPage = 1;
        renderProductPage();
      } else {
        renderHomePage();
      }
      closeDrawer();
    });
  }

  // Toggle subkategori
  document.querySelectorAll('.drawer-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = toggle.dataset.target;
      const subMenu = document.getElementById(targetId);
      if (subMenu) {
        const isHidden = subMenu.style.display === 'none' || subMenu.style.display === '';
        subMenu.style.display = isHidden ? 'block' : 'none';
        toggle.classList.toggle('open', isHidden);
      }
    });
  });

  // Subkategori
  document.querySelectorAll('.drawer-sub-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parentGroup = btn.closest('.drawer-category-group');
      currentGenre = parentGroup.dataset.genre;
      currentSub = btn.dataset.sub;
      if (document.getElementById('pagination')) {
        currentPage = 1;
        renderProductPage();
      } else {
        renderHomePage();
      }
      closeDrawer();
    });
  });

  // Genre-card (halaman utama)
  document.querySelectorAll('.genre-card').forEach(card => {
    card.addEventListener('click', () => {
      currentGenre = card.dataset.genre;
      currentSub = null;
      renderHomePage();
    });
  });

  // Sort select (berlaku untuk halaman utama dan kedua)
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      if (document.getElementById('pagination')) {
        currentPage = 1;
        renderProductPage();
      } else {
        renderHomePage();
      }
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
        if (document.getElementById('pagination')) {
          currentPage = 1;
          renderProductPage();
        } else {
          renderHomePage();
        }
      });
    });
  }

  // Pagination
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderProductPage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const totalItems = applyFilterAndSort().length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderProductPage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

// ===== INISIALISASI =====
document.addEventListener('DOMContentLoaded', () => {
  const isProductPage = document.getElementById('pagination') !== null;
  allProducts = createDummyProducts(isProductPage ? 50 : 28);

  if (isProductPage) {
    currentPage = 1;
    renderProductPage();
  } else {
    renderHomePage();
  }

  bindEvents();
});
