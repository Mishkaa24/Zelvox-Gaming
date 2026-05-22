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
  const exists = cart.find(g => g.id === game.id);
  if (exists) {
    showToast("⚠️ Game already in cart!");
    return;
  }
  cart.push(game);
  saveCart(cart);
  showToast("🛒 Added to cart!");
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(g => g.id !== id);
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem("cart");
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  const count = getCart().length;
  badge.textContent = count;
  badge.classList.toggle("visible", count > 0);
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
    showToast("⚠️ Game already in wishlist!");
    return;
  }
  list.push(game);
  saveWishlist(list);
  showToast("❤️ Added to wishlist!");
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
  badge.classList.toggle("visible", count > 0);
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
  const inCart     = getCart().some(g => g.id === game.id);
  const inWishlist = getWishlist().some(g => g.id === game.id);
  const gameJSON   = JSON.stringify(game).replace(/'/g, "&#39;");
  return `
    <div class="game-card-wrap">
      <a class="game-card" href="game.html?id=${game.id}">
        <img src="${game.imageVer || game.image}" alt="${game.title}" loading="lazy"
             onerror="this.src='https://placehold.co/300x400/1c1c2e/7c3aed?text=No+Image'">
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
      <div class="card-actions">
        <button
          class="card-wish-btn${inWishlist ? " active" : ""}"
          title="${inWishlist ? "Remove from wishlist" : "Add to wishlist"}"
          onclick='cardToggleWishlist(event, ${gameJSON}, this)'>
          ${inWishlist ? "💜" : "🤍"}
        </button>
        <button
          class="card-cart-btn${inCart ? " in-cart" : ""}"
          title="${inCart ? "Remove from cart" : "Add to cart"}"
          onclick='cardToggleCart(event, ${gameJSON}, this)'>
          ${inCart ? "✓ In Cart" : "🛒 Add"}
        </button>
      </div>
    </div>
  `;
}

function cardToggleWishlist(event, game, btn) {
  event.preventDefault();
  event.stopPropagation();
  const inList = getWishlist().some(g => g.id === game.id);
  if (inList) {
    removeFromWishlist(game.id);
    btn.classList.remove("active");
    btn.innerHTML = "🤍";
    btn.title = "Add to wishlist";
    showToast("💔 Removed from wishlist");
  } else {
    addToWishlist(game);
    btn.classList.add("active");
    btn.innerHTML = "💜";
    btn.title = "Remove from wishlist";
  }
}

function cardToggleCart(event, game, btn) {
  event.preventDefault();
  event.stopPropagation();
  const inCart = getCart().some(g => g.id === game.id);
  if (inCart) {
    removeFromCart(game.id);
    btn.classList.remove("in-cart");
    btn.innerHTML = "🛒 Add";
    btn.title = "Add to cart";
    showToast("🗑️ Removed from cart");
  } else {
    addToCart(game);
    btn.classList.add("in-cart");
    btn.innerHTML = "✓ In Cart";
    btn.title = "Remove from cart";
  }
}

// ─── GAME PAGE TOGGLE ACTIONS ─────────────────────────

function toggleWishlistGame(game) {
  const inList = getWishlist().some(g => g.id === game.id);
  const btn = document.getElementById("gd-wish-btn");

  if (inList) {
    removeFromWishlist(game.id);
    if (btn) {
      btn.classList.remove("active");
      btn.innerHTML = "🤍";
      btn.title = "Add to Wishlist";
    }
    showToast("💔 Removed from wishlist");
  } else {
    const list = getWishlist();
    list.push(game);
    saveWishlist(list);
    if (btn) {
      btn.classList.add("active");
      btn.innerHTML = "💜";
      btn.title = "Remove from Wishlist";
    }
    showToast("❤️ Added to wishlist!");
  }
}

function toggleCartGame(game) {
  const inCart = getCart().some(g => g.id === game.id);
  const btn = document.getElementById("gd-cart-btn");

  if (inCart) {
    removeFromCart(game.id);
    if (btn) {
      btn.classList.remove("in-cart");
      btn.innerHTML = "🛒 Add to Cart";
    }
    showToast("🗑️ Removed from cart");
  } else {
    const cart = getCart();
    cart.push(game);
    saveCart(cart);
    if (btn) {
      btn.classList.add("in-cart");
      btn.innerHTML = "✓ In Cart";
    }
    showToast("🛒 Added to cart!");
  }
}

// ─── CART / WISHLIST DROPDOWN PANELS ─────────────────

function toggleCartPanel() {
  const panel    = document.getElementById("cart-panel");
  const wPanel   = document.getElementById("wishlist-panel");
  const overlay  = document.getElementById("panel-overlay");
  const btn      = document.getElementById("cart-toggle-btn");
  const wBtn     = document.getElementById("wishlist-toggle-btn");
  if (!panel) return;

  const isOpen = panel.classList.contains("open");

  // Always close wishlist first
  wPanel?.classList.remove("open");
  wBtn?.classList.remove("panel-active");

  if (isOpen) {
    panel.classList.remove("open");
    overlay?.classList.remove("open");
    btn?.classList.remove("panel-active");
  } else {
    renderCartPanel();
    panel.classList.add("open");
    overlay?.classList.add("open");
    btn?.classList.add("panel-active");
  }
}

function toggleWishlistPanel() {
  const panel    = document.getElementById("wishlist-panel");
  const cPanel   = document.getElementById("cart-panel");
  const overlay  = document.getElementById("panel-overlay");
  const btn      = document.getElementById("wishlist-toggle-btn");
  const cBtn     = document.getElementById("cart-toggle-btn");
  if (!panel) return;

  const isOpen = panel.classList.contains("open");

  // Always close cart first
  cPanel?.classList.remove("open");
  cBtn?.classList.remove("panel-active");

  if (isOpen) {
    panel.classList.remove("open");
    overlay?.classList.remove("open");
    btn?.classList.remove("panel-active");
  } else {
    renderWishlistPanel();
    panel.classList.add("open");
    overlay?.classList.add("open");
    btn?.classList.add("panel-active");
  }
}

function closeAllPanels() {
  document.getElementById("cart-panel")?.classList.remove("open");
  document.getElementById("wishlist-panel")?.classList.remove("open");
  document.getElementById("panel-overlay")?.classList.remove("open");
  document.getElementById("cart-toggle-btn")?.classList.remove("panel-active");
  document.getElementById("wishlist-toggle-btn")?.classList.remove("panel-active");
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

  body.innerHTML = cart.map(game => `
    <div class="panel-item">
      <img src="${game.imageVer || game.image}" alt="${game.title}"
           onerror="this.src='https://placehold.co/52x52/1c1c2e/7c3aed?text=?'">
      <div class="panel-item-info">
        <h4>${game.title}</h4>
        <p>${game.platform}</p>
      </div>
      <span class="panel-item-price">€${game.price}</span>
      <button class="panel-item-remove" onclick="panelRemoveFromCart(${game.id})" title="Remove">✕</button>
    </div>
  `).join("");

  const total = cart.reduce((sum, g) => sum + g.price, 0).toFixed(2);
  if (foot) foot.innerHTML = `
    <div class="panel-total">
      <span>Total</span>
      <span>€${total}</span>
    </div>
    <a href="cart.html" class="btn btn-primary" style="width:100%;justify-content:center;" onclick="closeAllPanels()">View Cart →</a>
  `;
}

function panelRemoveFromCart(id) {
  removeFromCart(id);
  renderCartPanel();
  showToast("🗑️ Removed from cart");
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

  body.innerHTML = list.map(game => `
    <div class="panel-item">
      <img src="${game.imageVer || game.image}" alt="${game.title}"
           onerror="this.src='https://placehold.co/52x52/1c1c2e/7c3aed?text=?'">
      <div class="panel-item-info">
        <h4>${game.title}</h4>
        <p>${game.platform} · <strong style="color:var(--accent)">€${game.price}</strong></p>
      </div>
      <button class="btn btn-primary" style="font-size:0.72rem;padding:5px 9px;white-space:nowrap;"
              onclick='panelMoveToCart(${JSON.stringify(game).replace(/'/g, "&#39;")})'>🛒</button>
      <button class="panel-item-remove" onclick="panelRemoveFromWishlist(${game.id})" title="Remove">✕</button>
    </div>
  `).join("");

  if (foot) foot.innerHTML = `
    <a href="wishlist.html" class="btn btn-outline" style="width:100%;justify-content:center;" onclick="closeAllPanels()">View Wishlist →</a>
  `;
}

function panelRemoveFromWishlist(id) {
  removeFromWishlist(id);
  renderWishlistPanel();
  showToast("🗑️ Removed from wishlist");
}

function panelMoveToCart(game) {
  addToCart(game);
  renderWishlistPanel(); // refresh to show updated state
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