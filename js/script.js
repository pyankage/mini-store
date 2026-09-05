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

  // Kategori utama: klik item untuk set active
  const categoryItems = document.querySelectorAll('.category-item');
  categoryItems.forEach(item => {
    item.addEventListener('click', function() {
      categoryItems.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Subkategori (top up, item, key, dll): klik item untuk set active (opsional)
  const subcategoryItems = document.querySelectorAll('.subcategory-item');
  subcategoryItems.forEach(item => {
    item.addEventListener('click', function() {
      // Hanya contoh: bisa diisi aksi sesuai kebutuhan
      alert('🔹 Menu dipilih: ' + this.textContent);
      // (Opsional) beri efek aktif:
      // subcategoryItems.forEach(btn => btn.style.background = '#ffffff');
      // this.style.background = '#e2e8f0';
    });
  });

});
