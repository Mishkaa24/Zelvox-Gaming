// ─── DETECT WHICH PAGE WE'RE ON ───────────────────────
const page = window.location.pathname.split("/").pop() || "index.html";

document.addEventListener("DOMContentLoaded", () => {
  if (page === "index.html" || page === "") initHomePage();
  if (page === "catalogue.html") initCataloguePage();
  if (page === "game.html") initGamePage();
  if (page === "cart.html") initCartPage();
  if (page === "wishlist.html") initWishlistPage();
  if (page === "receipt.html") initReceiptPage();
});

// ─── SEARCH ───────────────────────────────────────────
function handleSearch() {
  const query = document.getElementById("search-input")?.value.trim();
  if (query) window.location.href = `catalogue.html?search=${encodeURIComponent(query)}`;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && document.getElementById("search-input") === document.activeElement) {
    handleSearch();
  }
});

// ─── HOME PAGE ────────────────────────────────────────
function initHomePage() {
  renderBanner();
  renderPopularGames();
  renderDiscountGames();
}

function renderBanner() {
  const featured = games.filter(g => g.featured);
  const banner = document.getElementById("banner");
  if (!banner || featured.length === 0) return;

  banner.innerHTML = featured.map((g, i) => `
    <div class="slide ${i === 0 ? "active" : ""}" style="background-image: url('${g.imageHor || g.image}')">
      <div class="slide-overlay">
        <div class="slide-info">
          <h2>${g.title}</h2>
          <p>${g.description}</p>
          <a href="game.html?id=${g.id}" class="btn btn-primary">Дивитись гру →</a>
        </div>
      </div>
    </div>
  `).join("") + `
    <div class="banner-dots">
      ${featured.map((_, i) => `<div class="dot ${i === 0 ? "active" : ""}" onclick="goToSlide(${i})"></div>`).join("")}
    </div>
  `;

  let current = 0;
  window._bannerInterval = setInterval(() => {
    current = (current + 1) % featured.length;
    goToSlide(current);
  }, 4000);
}

function goToSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  slides.forEach((s, i) => s.classList.toggle("active", i === index));
  dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

function renderPopularGames() {
  const grid = document.getElementById("popular-grid");
  if (!grid) return;
  const popular = games.slice(0, 6);
  grid.innerHTML = popular.map(createGameCard).join("");
}

function renderDiscountGames() {
  const grid = document.getElementById("discount-grid");
  if (!grid) return;
  const big = games.filter(g => g.discount >= 70).slice(0, 6);
  grid.innerHTML = big.map(createGameCard).join("");
}

// ─── CATALOGUE PAGE ───────────────────────────────────
function initCataloguePage() {
  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get("search") || "";
  if (searchQuery) {
    const input = document.getElementById("search-input");
    if (input) input.value = searchQuery;
  }
  applyFilters();
}

function applyFilters() {
  const platform = document.getElementById("filter-platform")?.value || "all";
  const genre = document.getElementById("filter-genre")?.value || "all";
  const sort = document.getElementById("filter-sort")?.value || "discount";
  const searchQuery = document.getElementById("search-input")?.value.toLowerCase() || "";

  let filtered = [...games];

  if (platform !== "all") filtered = filtered.filter(g => g.platform === platform);
  if (genre !== "all") filtered = filtered.filter(g => g.genre === genre);
  if (searchQuery) filtered = filtered.filter(g => g.title.toLowerCase().includes(searchQuery));

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  else if (sort === "name") filtered.sort((a, b) => a.title.localeCompare(b.title));
  else filtered.sort((a, b) => b.discount - a.discount);

  const grid = document.getElementById("catalogue-grid");
  if (!grid) return;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="emoji">😔</div>
        <h2>Ігор не знайдено</h2>
        <p>Спробуй змінити фільтри або пошуковий запит</p>
      </div>`;
  } else {
    grid.innerHTML = filtered.map(createGameCard).join("");
  }
}

// ─── GAME PAGE ────────────────────────────────────────
function initGamePage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const game = games.find(g => g.id === id);
  const container = document.getElementById("game-detail-container");

  if (!game || !container) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="emoji">❌</div>
        <h2>Гру не знайдено</h2>
        <a href="catalogue.html" class="btn btn-primary">← Каталог</a>
      </div>`;
    return;
  }

  document.title = `Zelvox Gaming — ${game.title}`;

  container.innerHTML = `
    <div class="game-detail">
      <div>
        <img src="${game.image}" alt="${game.title}" onerror="this.src='https://placehold.co/320x400/1c1c2e/7c3aed?text=No+Image'">
      </div>
      <div class="game-detail-info">
        <h1>${game.title}</h1>
        <div class="game-meta">
          <span class="meta-tag">🎮 ${game.platform}</span>
          <span class="meta-tag">🏷️ ${game.genre}</span>
        </div>
        <p class="game-description">${game.description}</p>
        <div class="price-section">
          <div class="price-big">
            <span class="new">€${game.price}</span>
            <span class="old">€${game.originalPrice}</span>
            <span class="disc">-${game.discount}%</span>
          </div>
          <div class="action-btns">
            <button class="btn btn-primary" onclick='addToCart(${JSON.stringify(game)})'>🛒 Додати до кошика</button>
            <button class="btn btn-outline" onclick='addToWishlist(${JSON.stringify(game)})'>❤️ До вішлісту</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Similar games
  const similar = games.filter(g => g.genre === game.genre && g.id !== game.id).slice(0, 4);
  const simGrid = document.getElementById("similar-grid");
  if (simGrid) simGrid.innerHTML = similar.map(createGameCard).join("");
}

// ─── CART PAGE ────────────────────────────────────────
function initCartPage() {
  renderCart();
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart-container");
  const summary = document.getElementById("cart-summary");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="emoji">🛒</div>
        <h2>Кошик порожній</h2>
        <p>Додай кілька ігор щоб почати</p>
        <a href="catalogue.html" class="btn btn-primary" style="margin-top:1rem">Перейти до каталогу</a>
      </div>`;
    if (summary) summary.innerHTML = "";
    return;
  }

  container.innerHTML = cart.map(game => {
    const qty = game.quantity || 1;
    const lineTotal = (game.price * qty).toFixed(2);
    return `
      <div class="cart-item">
        <img src="${game.imageVer || game.image}" alt="${game.title}" onerror="this.src='https://placehold.co/80x80/1c1c2e/7c3aed?text=?'">
        <div class="cart-item-info">
          <h3>${game.title}</h3>
          <p>${game.platform} • ${game.genre}</p>
          <div class="cart-item-prices">
            <span class="cart-price-old">€${game.originalPrice}</span>
            <span class="cart-price-new">€${game.price}</span>
            <span class="cart-price-discount">-${game.discount}%</span>
          </div>
        </div>
        <div class="cart-qty-controls">
          <button class="qty-btn" onclick="updateCartQuantity(${game.id}, -1)">−</button>
          <span class="qty-value">${qty}</span>
          <button class="qty-btn" onclick="updateCartQuantity(${game.id}, 1)">+</button>
        </div>
        <span class="cart-item-price">€${lineTotal}</span>
        <button class="btn btn-outline cart-remove-btn" onclick="handleRemoveFromCart(${game.id})">🗑️</button>
      </div>
    `;
  }).join("");

  const totalItems = cart.reduce((sum, g) => sum + (g.quantity || 1), 0);
  const total = cart.reduce((sum, g) => sum + g.price * (g.quantity || 1), 0).toFixed(2);
  const saved = cart.reduce((sum, g) => sum + (g.originalPrice - g.price) * (g.quantity || 1), 0).toFixed(2);

  if (summary) {
    summary.innerHTML = `
      <div class="summary-box">
        <div class="summary-row"><span>Кількість ігор</span><span>${totalItems}</span></div>
        <div class="summary-row"><span>Ти заощаджуєш</span><span style="color:var(--success)">-€${saved}</span></div>
        <div class="summary-row total"><span>Разом</span><span>€${total}</span></div>
        <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:1rem" onclick="checkout()">
          ✅ Оформити замовлення
        </button>
      </div>
    `;
  }
}
function handleRemoveFromCart(id) {
  removeFromCart(id);
  renderCart();
  showToast("🗑️ Гру видалено з кошика");
}

function checkout() {
  // Save cart to receipt storage before clearing
  const cart = getCart();
  localStorage.setItem("lastOrder", JSON.stringify(cart));
  localStorage.setItem("lastOrderId", "ZVX-" + Math.floor(1000 + Math.random() * 9000));
  clearCart();
  window.location.href = "receipt.html";
}

// ─── WISHLIST PAGE ────────────────────────────────────
function initWishlistPage() {
  renderWishlist();
}

function renderWishlist() {
  const list = getWishlist();
  const grid = document.getElementById("wishlist-grid");
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="emoji">❤️</div>
        <h2>Список бажаного порожній</h2>
        <p>Додай ігри які хочеш купити пізніше</p>
        <a href="catalogue.html" class="btn btn-primary" style="margin-top:1rem">Перейти до каталогу</a>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(game => `
    <div class="game-card" style="display:block; text-decoration:none; color:var(--text)">
      <a href="game.html?id=${game.id}" style="text-decoration:none; color:inherit">
        <img src="${game.image}" alt="${game.title}" style="width:100%; aspect-ratio:3/4; object-fit:cover;" onerror="this.src='https://placehold.co/300x400/1c1c2e/7c3aed?text=No+Image'">
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
      <div style="padding: 0 0.85rem 0.85rem; display:flex; gap:0.5rem;">
        <button class="btn btn-primary" style="flex:1; justify-content:center; font-size:0.8rem; padding:8px" onclick='addToCart(${JSON.stringify(game)})'>🛒 В кошик</button>
        <button class="btn btn-outline" style="padding:8px 10px" onclick="handleRemoveFromWishlist(${game.id})">🗑️</button>
      </div>
    </div>
  `).join("");
}

function handleRemoveFromWishlist(id) {
  removeFromWishlist(id);
  renderWishlist();
  showToast("🗑️ Гру видалено з вішлісту");
}

// ─── RECEIPT PAGE ─────────────────────────────────────
function initReceiptPage() {
  const order = JSON.parse(localStorage.getItem("lastOrder")) || [];
  const orderId = localStorage.getItem("lastOrderId") || "ZVX-0000";
  const box = document.getElementById("receipt-box");
  if (!box) return;

  if (order.length === 0) {
    box.innerHTML = `
      <div class="empty-state">
        <div class="emoji">❓</div>
        <h2>Замовлення не знайдено</h2>
        <a href="index.html" class="btn btn-primary" style="margin-top:1rem">На головну</a>
      </div>`;
    return;
  }

  const total = order.reduce((sum, g) => sum + g.price, 0).toFixed(2);

  box.innerHTML = `
    <span class="receipt-success-icon">🎮</span>
    <h1>Дякуємо за покупку!</h1>
    <p>Твоє замовлення успішно оформлено. Гарної гри!</p>
    <div class="order-id">Номер замовлення: #${orderId}</div>
    <div class="receipt-items-list">
      ${order.map(g => `
        <div class="receipt-item">
          <span>${g.title} <small style="color:var(--text2)">(${g.platform})</small></span>
          <strong>€${g.price}</strong>
        </div>
      `).join("")}
      <div class="receipt-item" style="border-top: 2px solid var(--accent); margin-top:0.5rem; padding-top:1rem;">
        <span style="font-weight:700; color:var(--text)">Разом</span>
        <strong>€${total}</strong>
      </div>
    </div>
    <a href="index.html" class="btn btn-primary" style="margin-top:1rem; justify-content:center">🏠 Повернутись до магазину</a>
  `;
}