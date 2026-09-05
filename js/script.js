document.addEventListener('DOMContentLoaded', () => {
  bindHeaderEvents();
  bindProductEvents();
});

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
      if (query.length > 0) alert('🔍 Mencari: ' + query);
      else alert('Ketik dulu kata kunci.');
    });
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') searchBtn.click();
    });
  }
  if (menuDots) menuDots.addEventListener('click', () => alert('☰ Menu (simulasi)'));
  if (loginBtn) loginBtn.addEventListener('click', () => alert('👤 Masuk (simulasi)'));

  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
      alert('Kategori: ' + this.querySelector('.card-label').textContent);
    });
  });
  document.querySelectorAll('.genre-card').forEach(card => {
    card.addEventListener('click', function() {
      alert('Genre: ' + this.querySelector('.genre-label').textContent);
    });
  });
}

function bindProductEvents() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
      const name = this.querySelector('.product-name').textContent;
      const price = this.querySelector('.product-price').textContent;
      alert('Produk:\n' + name + '\n' + price);
    });
  });
}
