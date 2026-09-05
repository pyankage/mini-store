// ============================================
// SCRIPT.JS - Interaksi Tampilan Atas Store
// ============================================

// Tunggu sampai halaman selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
  
  // Ambil elemen-elemen yang dibutuhkan
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearBtn');
  const searchBtn = document.getElementById('searchBtn');
  const menuDots = document.getElementById('menuDots');
  const loginBtn = document.getElementById('loginBtn');

  // ===== FUNGSI CLEAR (Bersihkan pencarian) =====
  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', function() {
      searchInput.value = '';        // Kosongkan input
      searchInput.focus();           // Fokus kembali ke input
    });
  }

  // ===== FUNGSI SEARCH (Tombol Cari) =====
  if (searchBtn && searchInput) {
    // Saat tombol "Cari" diklik
    searchBtn.addEventListener('click', function() {
      const query = searchInput.value.trim();  // Ambil nilai & hapus spasi berlebih
      
      if (query.length > 0) {
        alert('🔍 Anda mencari: "' + query + '"\n(Simulasi tampilan atas saja)');
      } else {
        alert('Silakan ketik kata kunci terlebih dahulu.');
        searchInput.focus();
      }
    });

    // Saat tekan Enter di kolom pencarian
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchBtn.click();  // Trigger klik tombol cari
      }
    });
  }

  // ===== FUNGSI MENU (Titik 3) =====
  if (menuDots) {
    menuDots.addEventListener('click', function() {
      alert('📋 Menu titik tiga di kiri atas (simulasi).\nSilakan tambahkan navigasi sesuai kebutuhan.');
    });
  }

  // ===== FUNGSI LOGIN (Tombol Masuk) =====
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      alert('👤 Tombol MASUK di kanan atas (simulasi).\nHalaman login dapat ditambahkan di sini.');
    });
  }

  // ===== BONUS: Auto-focus saat halaman dimuat =====
  // (Optional) Fokus ke kolom pencarian
  // searchInput.focus();
});
