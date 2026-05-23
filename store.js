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

// ─── SLIDE-IN PANELS (Cart & Wishlist) ───────────────
function toggleCartPanel() {
  const panel = document.getElementById("cart-panel");
  const overlay = document.getElementById("panel-overlay");
  const isOpen = panel?.classList.contains("open");
  closeAllPanels();
  if (!isOpen) {
    panel?.classList.add("open");
    overlay?.classList.add("open");
    renderCartPanel();
  }
}

function toggleWishlistPanel() {
  const panel = document.getElementById("wishlist-panel");
  const overlay = document.getElementById("panel-overlay");
  const isOpen = panel?.classList.contains("open");
  closeAllPanels();
  if (!isOpen) {
    panel?.classList.add("open");
    overlay?.classList.add("open");
    renderWishlistPanel();
  }
}

function closeAllPanels() {
  document.querySelectorAll(".header-panel").forEach(p => p.classList.remove("open"));
  document.getElementById("panel-overlay")?.classList.remove("open");
  document.getElementById("mobile-nav")?.classList.remove("open");
  const mobileSearch = document.getElementById("mobile-search-bar");
  if (mobileSearch) mobileSearch.style.display = "none";
}

function renderCartPanel() {
  const cart = getCart();
  const body = document.getElementById("cart-panel-body");
  const foot = document.getElementById("cart-panel-foot");
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `<div class="panel-empty"><div class="emoji">🛒</div><p>Your cart is empty</p></div>`;
    if (foot) foot.innerHTML = "";
    return;
  }

  body.innerHTML = cart.map(g => `
    <div class="panel-item">
      <img src="${g.image}" alt="${g.title}" onerror="this.src='https://placehold.co/60x60/1c1c2e/7c3aed?text=?'" style="width:60px;height:60px;object-fit:cover;border-radius:6px;flex-shrink:0;">
      <div style="flex:1;min-width:0;">
        <div style="font-weight:600;font-size:0.9rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${g.title}</div>
        <div style="font-size:0.8rem;color:var(--text2);">${g.platform}</div>
        <div style="font-weight:700;color:var(--accent);">€${g.price}</div>
      </div>
      <button class="btn btn-outline" onclick="removeFromCart(${g.id});renderCartPanel();" style="padding:4px 8px;font-size:0.8rem;">🗑️</button>
    </div>
  `).join("");

  const total = cart.reduce((sum, g) => sum + g.price, 0).toFixed(2);
  if (foot) foot.innerHTML = `
    <div style="display:flex;justify-content:space-between;font-weight:700;margin-bottom:0.75rem;">
      <span>Total</span><span>€${total}</span>
    </div>
    <a href="cart.html" class="btn btn-primary" style="width:100%;justify-content:center;" onclick="closeAllPanels()">Go to Cart →</a>
  `;
}

function renderWishlistPanel() {
  const list = getWishlist();
  const body = document.getElementById("wishlist-panel-body");
  const foot = document.getElementById("wishlist-panel-foot");
  if (!body) return;

  if (list.length === 0) {
    body.innerHTML = `<div class="panel-empty"><div class="emoji">❤️</div><p>Your wishlist is empty</p></div>`;
    if (foot) foot.innerHTML = "";
    return;
  }

  body.innerHTML = list.map(g => `
    <div class="panel-item">
      <img src="${g.image}" alt="${g.title}" onerror="this.src='https://placehold.co/60x60/1c1c2e/7c3aed?text=?'" style="width:60px;height:60px;object-fit:cover;border-radius:6px;flex-shrink:0;">
      <div style="flex:1;min-width:0;">
        <div style="font-weight:600;font-size:0.9rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${g.title}</div>
        <div style="font-size:0.8rem;color:var(--text2);">${g.platform}</div>
        <div style="font-weight:700;color:var(--accent);">€${g.price}</div>
      </div>
      <button class="btn btn-outline" onclick="removeFromWishlist(${g.id});renderWishlistPanel();" style="padding:4px 8px;font-size:0.8rem;">🗑️</button>
    </div>
  `).join("");

  if (foot) foot.innerHTML = `
    <a href="wishlist.html" class="btn btn-outline" style="width:100%;justify-content:center;" onclick="closeAllPanels()">View Wishlist →</a>
  `;
}

// ─── MOBILE SEARCH ────────────────────────────────────
function toggleMobileSearch() {
  const bar = document.getElementById("mobile-search-bar");
  if (!bar) return;
  const isVisible = bar.style.display === "block";
  closeAllPanels();
  if (!isVisible) bar.style.display = "block";
}

function handleMobileSearch() {
  const query = document.getElementById("mobile-search-input")?.value.trim();
  if (query) window.location.href = `catalogue.html?search=${encodeURIComponent(query)}`;
}

// ─── HAMBURGER MENU ───────────────────────────────────
function initHamburger() {
  const btn = document.getElementById("hamburger-btn");
  const nav = document.getElementById("mobile-nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    const isOpen = nav.classList.contains("open");
    closeAllPanels();
    if (!isOpen) nav.classList.add("open");
  });
}

// ─── NEWSLETTER ───────────────────────────────────────
function subscribeNewsletter() {
  showToast("🎉 You're subscribed!");
}

// ─── INIT ON PAGE LOAD ────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initBackToTop();
  initHamburger();
  updateCartBadge();
  updateWishlistBadge();

  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
});