// ============================================
// SCRIPT.JS - Interaksi & Load Header
// ============================================

// Fungsi untuk memuat header dari partial
async function loadHeader() {
  const headerElement = document.getElementById('storeHeader');
  if (!headerElement) return;

  try {
    // Tentukan path relatif ke partial berdasarkan lokasi halaman
    const path = window.location.pathname.includes('/pages/') ? '../partials/header.html' : 'partials/header.html';
    const response = await fetch(path);
    if (!response.ok) throw new Error('Gagal memuat header');
    const html = await response.text();
    headerElement.innerHTML = html;
    
    // Setelah header dimuat, panggil fungsi untuk mengikat event
    bindHeaderEvents();
  } catch (error) {
    console.error('Error:', error);
    headerElement.innerHTML = '<p style="padding:1rem;">Header gagal dimuat.</p>';
  }
}

// Fungsi untuk mengikat event pada elemen header
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
        alert('🔍 Anda mencari: "' + query + '"\n(Simulasi)');
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
    menuDots.addEventListener('click', () => alert('☰ Menu garis tiga (simulasi).'));
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', () => alert('👤 Tombol MASUK (simulasi).'));
  }

  // Kartu kategori & genre
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

// Jalankan setelah DOM siap
document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
  
  // Event untuk kartu produk (di luar header, bisa langsung bind)
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
      const name = this.querySelector('.product-name').textContent;
      const price = this.querySelector('.product-price').textContent;
      alert('Produk dipilih:\n' + name + '\n' + price);
    });
  });
});
