// ─── THEME ────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem("theme") || "dark";
  if (saved === "light") document.body.classList.add("light");
  updateThemeBtn();
}

function toggleTheme() {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  updateThemeBtn();
}

function updateThemeBtn() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const isLight = document.body.classList.contains("light");
  btn.textContent = isLight ? "🌙" : "☀️";
}

// ─── TOAST ────────────────────────────────────────────
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove("show"), 3000);
}

// ─── CART ─────────────────────────────────────────────
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(game) {
  const cart = getCart();
  const existing = cart.find(g => g.id === game.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
    saveCart(cart);
    showToast("🛒 Ще один примірник додано!");
  } else {
    cart.push({ ...game, quantity: 1 });
    saveCart(cart);
    showToast("🛒 Додано до кошика!");
  }
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(g => g.id !== id);
  saveCart(cart);
}

function updateCartQuantity(id, delta) {
  let cart = getCart();
  const item = cart.find(g => g.id === id);
  if (!item) return;
  item.quantity = (item.quantity || 1) + delta;
  if (item.quantity <= 0) {
    cart = cart.filter(g => g.id !== id);
    showToast("🗑️ Гру видалено з кошика");
  }
  saveCart(cart);
  if (typeof renderCart === "function") renderCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  const count = getCart().reduce((sum, g) => sum + (g.quantity || 1), 0);
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline" : "none";
}

// ─── WISHLIST ─────────────────────────────────────────
function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function saveWishlist(list) {
  localStorage.setItem("wishlist", JSON.stringify(list));
  updateWishlistBadge();
}

function addToWishlist(game) {
  const list = getWishlist();
  const exists = list.find(g => g.id === game.id);
  if (exists) {
    showToast("⚠️ Гра вже у вішлісті!");
    return;
  }
  list.push(game);
  saveWishlist(list);
  showToast("❤️ Додано до вішлісту!");
}

function removeFromWishlist(id) {
  let list = getWishlist();
  list = list.filter(g => g.id !== id);
  saveWishlist(list);
}

function updateWishlistBadge() {
  const badge = document.getElementById("wishlist-badge");
  if (!badge) return;
  const count = getWishlist().length;
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline" : "none";
}

// ─── BACK TO TOP ──────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ─── RENDER GAME CARD ─────────────────────────────────
function createGameCard(game) {
  return `
    <a class="game-card" href="game.html?id=${game.id}">
      <img src="${game.imageVer || game.image}" alt="${game.title}" loading="lazy" onerror="this.src='https://placehold.co/300x400/1c1c2e/7c3aed?text=No+Image'">
      <div class="game-card-info">
        <h3>${game.title}</h3>
        <p class="platform">${game.platform} • ${game.genre}</p>
        <div class="price-row">
          <span class="price-new">€${game.price}</span>
          <span class="price-old">€${game.originalPrice}</span>
          <span class="discount-badge">-${game.discount}%</span>
        </div>
      </div>
    </a>
  `;
}

// ─── INIT ON PAGE LOAD ────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initBackToTop();
  updateCartBadge();
  updateWishlistBadge();

  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
});