// ============================================
// SCRIPT.JS - Interaksi, Drawer, Filter Lengkap
// ============================================

let allProducts = [];
let currentGenre = 'semua';
let currentSub = null;
let currentSort = 'rekomendasi';
let currentType = 'semua';

// ===== DATA DUMMY =====
function createDummyProducts(count) {
  const genres = ['akun', 'item', 'joki'];
  const subMap = {
    akun: ['mobile-legends', 'free-fire', 'pubg', 'genshin'],
    item: ['skin', 'senjata', 'item-rare'],
    joki: ['rank-push', 'leveling', 'mabar']
  };
  const types = ['instan', 'manual'];  // tipe sekarang instan & manual
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
function applyFilter() {
  let filtered = allProducts;

  // Filter genre
  if (currentGenre !== 'semua') {
    filtered = filtered.filter(p => p.genre === currentGenre);
  }

  // Filter subkategori
  if (currentSub) {
    filtered = filtered.filter(p => p.sub === currentSub);
  }

  // Filter tipe
  if (currentType !== 'semua') {
    filtered = filtered.filter(p => p.type === currentType);
  }

  // Sort
  switch (currentSort) {
    case 'termurah':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'termahal':
      filtered.sort((a, b) => b.price - a.price);
      break;
    default: // rekomendasi
      filtered.sort((a, b) => a.id - b.id);
  }

  renderProducts(filtered, 'productGrid');

  // Update active state untuk genre-card
  document.querySelectorAll('.genre-card').forEach(card => {
    card.classList.toggle('active', card.dataset.genre === currentGenre && !currentSub);
  });

  // Update active state untuk drawer-cat-btn
  document.querySelectorAll('.drawer-cat-btn').forEach(btn => {
    if (btn.dataset.genre) {
      btn.classList.toggle('active', btn.dataset.genre === currentGenre && !currentSub);
    }
  });

  // Update active state untuk sub-btn
  document.querySelectorAll('.drawer-sub-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.sub === currentSub);
  });

  // Update active state untuk filter tipe
  document.querySelectorAll('#typeFilter .filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === currentType);
  });
}

// ===== DRAWER =====
function openDrawer() {
  document.getElementById('drawer').classList.add('active');
  document.getElementById('drawerOverlay').classList.add('active');
}

function closeDrawer() {
  document.getElementById('drawer').classList.remove('active');
  document.getElementById('drawerOverlay').classList.remove('active');
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
  if (menuDots) menuDots.addEventListener('click', openDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  // Pencarian kategori di drawer
  const drawerSearch = document.getElementById('drawerSearchInput');
  if (drawerSearch) {
    drawerSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('.drawer-cat-btn, .drawer-sub-btn').forEach(btn => {
        const text = btn.textContent.toLowerCase();
        btn.style.display = text.includes(query) ? '' : 'none';
      });
      document.querySelectorAll('.drawer-category-group').forEach(group => {
        const visible = group.querySelectorAll('.drawer-cat-btn[style=""]').length > 0 || group.querySelectorAll('.drawer-sub-btn[style=""]').length > 0;
        group.style.display = visible ? '' : 'none';
      });
    });
  }

  // Tombol kategori utama di drawer
  document.querySelectorAll('.drawer-cat-btn.main').forEach(btn => {
    btn.addEventListener('click', () => {
      currentGenre = btn.dataset.genre;
      currentSub = null;
      applyFilter();
      closeDrawer();
    });
  });

  // Tombol Semua
  const semuaBtn = document.querySelector('.drawer-cat-btn[data-genre="semua"]');
  if (semuaBtn) {
    semuaBtn.addEventListener('click', () => {
      currentGenre = 'semua';
      currentSub = null;
      applyFilter();
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
      applyFilter();
      closeDrawer();
    });
  });

  // Genre-card di bawah pencarian
  document.querySelectorAll('.genre-card').forEach(card => {
    card.addEventListener('click', () => {
      currentGenre = card.dataset.genre;
      currentSub = null;
      applyFilter();
    });
  });

  // Sort select
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      applyFilter();
    });
  }

  // Filter tipe
  document.querySelectorAll('#typeFilter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#typeFilter .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentType = btn.dataset.type;
      applyFilter();
    });
  });
}

// ===== INISIALISASI =====
document.addEventListener('DOMContentLoaded', () => {
  allProducts = createDummyProducts(28);
  renderProducts(allProducts, 'productGrid');
  bindEvents();
});
