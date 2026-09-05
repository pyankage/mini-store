// ============================================
// ADMIN.JS - Panel Admin Penjual (Simulasi localStorage)
// ============================================

// Kunci localStorage
const PRODUCTS_KEY = 'store_products';
const ADMIN_KEY = 'isAdmin';

// ===== CHECK LOGIN =====
function checkLogin() {
  if (localStorage.getItem(ADMIN_KEY) !== 'true') {
    // Redirect ke login jika belum login
    if (!window.location.pathname.includes('login.html')) {
      window.location.href = 'login.html';
    }
  }
}

// ===== LOGIN =====
function handleLogin() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Simulasi login (ganti dengan Firebase nanti)
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem(ADMIN_KEY, 'true');
        window.location.href = 'dashboard.html';
      } else {
        alert('Username atau password salah!');
      }
    });
  }
}

// ===== LOGOUT =====
function handleLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem(ADMIN_KEY);
      window.location.href = 'login.html';
    });
  }
}

// ===== AMBIL PRODUK DARI LOCALSTORAGE =====
function getProducts() {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
}

// ===== SIMPAN PRODUK KE LOCALSTORAGE =====
function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

// ===== RENDER TABEL PRODUK =====
function renderProductTable() {
  const tableBody = document.getElementById('productTableBody');
  const totalProducts = document.getElementById('totalProducts');
  const emptyMessage = document.getElementById('emptyMessage');
  if (!tableBody) return;

  const products = getProducts();

  // Update statistik
  if (totalProducts) totalProducts.textContent = products.length;
  const categories = new Set(products.map(p => p.genre));
  const totalCategories = document.getElementById('totalCategories');
  if (totalCategories) totalCategories.textContent = categories.size;

  // Cek apakah kosong
  if (emptyMessage) {
    if (products.length === 0) {
      emptyMessage.style.display = 'block';
    } else {
      emptyMessage.style.display = 'none';
    }
  }

  // Render baris tabel
  tableBody.innerHTML = '';
  products.forEach((product, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${product.image}" alt="${product.name}"></td>
      <td>${product.name}</td>
      <td>Rp ${product.price.toLocaleString('id-ID')}</td>
      <td>${product.genre.toUpperCase()}</td>
      <td>${product.type.toUpperCase()}</td>
      <td>
        <button class="btn-delete" data-index="${index}">
          <i class="fa-solid fa-trash"></i> Hapus
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Event hapus
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      const products = getProducts();
      products.splice(index, 1);
      saveProducts(products);
      renderProductTable();
    });
  });
}

// ===== TAMBAH PRODUK =====
function handleAddProduct() {
  const productForm = document.getElementById('productForm');
  if (productForm) {
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('productName').value;
      const price = parseInt(document.getElementById('productPrice').value);
      const genre = document.getElementById('productGenre').value;
      const type = document.getElementById('productType').value;
      const image = document.getElementById('productImage').value;

      if (!name || !price || !genre || !type) {
        alert('Mohon lengkapi semua field!');
        return;
      }

      const products = getProducts();
      products.push({
        id: Date.now(),
        name,
        price,
        genre,
        type,
        image: image || 'https://via.placeholder.com/400x225'
      });
      saveProducts(products);
      
      alert('Produk berhasil ditambahkan!');
      productForm.reset();
      // Redirect ke dashboard
      window.location.href = 'dashboard.html';
    });
  }
}

// ===== INISIALISASI =====
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path.includes('login.html')) {
    handleLogin();
  } else if (path.includes('dashboard.html')) {
    checkLogin();
    handleLogout();
    renderProductTable();
  } else if (path.includes('tambah-produk.html')) {
    checkLogin();
    handleLogout();
    handleAddProduct();
  }
});
