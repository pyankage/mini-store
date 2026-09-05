// ============================================
// SCRIPT.JS - Interaksi Tampilan Atas Store
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearBtn');
  const searchBtn = document.getElementById('searchBtn');
  const menuDots = document.getElementById('menuDots');
  const loginBtn = document.getElementById('loginBtn');

  // Clear pencarian
  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', function() {
      searchInput.value = '';
      searchInput.focus();
    });
  }

  // Tombol Cari
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', function() {
      const query = searchInput.value.trim();
      if (query.length > 0) {
        alert('🔍 Anda mencari: "' + query + '"\n(Simulasi tampilan atas saja)');
      } else {
        alert('Silakan ketik kata kunci terlebih dahulu.');
        searchInput.focus();
      }
    });

    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchBtn.click();
      }
    });
  }

  // Menu garis tiga
  if (menuDots) {
    menuDots.addEventListener('click', function() {
      alert('☰ Menu garis tiga di kiri atas (simulasi).');
    });
  }

  // Tombol Masuk
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      alert('👤 Tombol MASUK di kanan atas (simulasi).');
    });
  }

  // Kartu kategori
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      const label = this.querySelector('.card-label').textContent;
      alert('Kategori dipilih: ' + label);
    });
  });

  // Kartu genre
  const genreCards = document.querySelectorAll('.genre-card');
  genreCards.forEach(card => {
    card.addEventListener('click', function() {
      const label = this.querySelector('.genre-label').textContent;
      alert('Genre dipilih: ' + label);
    });
  });

  // Kartu produk (daftar jualan)
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('click', function() {
      const name = this.querySelector('.product-name').textContent;
      const price = this.querySelector('.product-price').textContent;
      alert('Produk dipilih:\n' + name + '\n' + price);
    });
  });

});
