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
        <h2>Game not found</h2>
        <a href="catalogue.html" class="btn btn-primary">← Catalogue</a>
      </div>`;
    return;
  }

  document.title = `Zelvox Gaming — ${game.title}`;

  // ── Build media gallery ──
  const mediaHTML = game.media && game.media.length ? `
    <div class="media-gallery">
      <div class="media-main" id="media-main">
        ${game.media[0].type === "video"
          ? `<video id="main-video" src="${game.media[0].src}" controls autoplay muted style="width:100%;border-radius:8px;display:block;"></video>`
          : `<img id="main-img" src="${game.media[0].src}" alt="Screenshot" style="width:100%;border-radius:8px;display:block;">`
        }
      </div>
      <div class="media-thumbs" style="display:flex;gap:8px;margin-top:8px;overflow-x:auto;padding-bottom:4px;">
        ${game.media.map((m, i) => `
          <div class="media-thumb ${i === 0 ? "active-thumb" : ""}"
               onclick="switchMedia(${game.id}, ${i})"
               style="flex-shrink:0;width:100px;height:60px;border-radius:6px;overflow:hidden;cursor:pointer;border:2px solid ${i === 0 ? "var(--accent)" : "transparent"};position:relative;">
            <img src="${m.thumb || m.src}" alt="thumb" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='https://placehold.co/100x60/1c1c2e/7c3aed?text=?'">
            ${m.type === "video" ? `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.4);font-size:1.2rem;">▶</div>` : ""}
          </div>
        `).join("")}
      </div>
    </div>
  ` : `<img src="${game.image}" alt="${game.title}" style="width:100%;border-radius:8px;" onerror="this.src='https://placehold.co/600x340/1c1c2e/7c3aed?text=No+Image'">`;

  // ── Review score colour ──
  const scoreColor = game.reviewScore >= 90 ? "#4ade80" : game.reviewScore >= 70 ? "#facc15" : "#f87171";

  // ── System requirements ──
  const buildReqTable = (rows) => rows.map(([label, val]) => `
    <tr>
      <td style="color:var(--text2);padding:4px 12px 4px 0;white-space:nowrap;font-weight:600;">${label}</td>
      <td style="padding:4px 0;">${val}</td>
    </tr>
  `).join("");

  const sysReqHTML = game.systemReqs ? `
    <div class="sysreq-section" style="margin-top:2.5rem;">
      <h2 style="margin-bottom:1rem;">⚙️ System Requirements</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
        <div>
          <h4 style="color:var(--accent);margin-bottom:0.75rem;">Minimum</h4>
          <table style="width:100%;font-size:0.88rem;border-collapse:collapse;">
            ${buildReqTable(game.systemReqs.min)}
          </table>
        </div>
        <div>
          <h4 style="color:var(--accent);margin-bottom:0.75rem;">Recommended</h4>
          <table style="width:100%;font-size:0.88rem;border-collapse:collapse;">
            ${buildReqTable(game.systemReqs.rec)}
          </table>
        </div>
      </div>
    </div>
  ` : "";

  container.innerHTML = `
    <div class="game-detail" style="display:grid;grid-template-columns:1fr 380px;gap:2rem;align-items:start;">

      <!-- LEFT: media + description + sys reqs -->
      <div>
        ${mediaHTML}
        <div style="margin-top:1.75rem;">
          <h2 style="margin-bottom:0.75rem;">📖 About this game</h2>
          <p class="game-description" style="line-height:1.7;color:var(--text2);">${game.description}</p>
        </div>
        ${sysReqHTML}
      </div>

      <!-- RIGHT: info panel -->
      <div class="game-detail-info" style="position:sticky;top:90px;">
        <h1 style="font-size:1.6rem;margin-bottom:0.75rem;">${game.title}</h1>

        <div class="game-meta" style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem;">
          <span class="meta-tag">🎮 ${game.platform}</span>
          <span class="meta-tag">🏷️ ${game.genre}</span>
          ${game.releaseDate ? `<span class="meta-tag">📅 ${game.releaseDate}</span>` : ""}
        </div>

        ${game.reviewScore ? `
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;padding:0.75rem;background:var(--card);border-radius:8px;">
          <span style="font-size:1.6rem;font-weight:800;color:${scoreColor};">${game.reviewScore}%</span>
          <div>
            <div style="font-weight:600;">${game.reviewText || "User Reviews"}</div>
            <div style="font-size:0.8rem;color:var(--text2);">${game.reviewCount ? game.reviewCount + " reviews" : ""}</div>
          </div>
        </div>` : ""}

        ${game.developer ? `
        <div style="font-size:0.85rem;color:var(--text2);margin-bottom:1rem;display:grid;grid-template-columns:auto 1fr;gap:0.25rem 0.75rem;">
          <span>Developer</span><span style="color:var(--text);">${game.developer}</span>
          ${game.publisher && game.publisher !== game.developer ? `<span>Publisher</span><span style="color:var(--text);">${game.publisher}</span>` : ""}
        </div>` : ""}

        <div class="price-section" style="margin-bottom:1rem;padding:1rem;background:var(--card);border-radius:10px;">
          <div class="price-big" style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;margin-bottom:1rem;">
            <span class="new" style="font-size:1.8rem;font-weight:800;">€${game.price}</span>
            <span class="old" style="text-decoration:line-through;color:var(--text2);">€${game.originalPrice}</span>
            <span class="disc" style="background:var(--accent);color:#fff;padding:2px 8px;border-radius:4px;font-weight:700;">-${game.discount}%</span>
          </div>
          <div class="action-btns" style="display:flex;flex-direction:column;gap:0.5rem;">
            <button class="btn btn-primary" style="justify-content:center;width:100%;padding:12px;" onclick="handleCartFromPage(${game.id})">🛒 Add to Cart</button>
            <button class="btn btn-outline" style="justify-content:center;width:100%;padding:12px;" onclick="handleWishFromPage(${game.id})">❤️ Add to Wishlist</button>
          </div>
        </div>
      </div>

    </div>
  `;

  // Store media array on window for the switcher
  window._currentGameMedia = game.media || [];

  // Similar games
  const similar = games.filter(g => g.genre === game.genre && g.id !== game.id).slice(0, 4);
  const simGrid = document.getElementById("similar-grid");
  if (simGrid) simGrid.innerHTML = similar.map(createGameCard).join("");
}

// ─── MEDIA SWITCHER ───────────────────────────────────
function switchMedia(gameId, index) {
  const media = window._currentGameMedia;
  if (!media || !media[index]) return;
  const m = media[index];
  const mainDiv = document.getElementById("media-main");
  if (!mainDiv) return;

  if (m.type === "video") {
    mainDiv.innerHTML = `<video src="${m.src}" controls autoplay muted style="width:100%;border-radius:8px;display:block;"></video>`;
  } else {
    mainDiv.innerHTML = `<img src="${m.src}" alt="Screenshot" style="width:100%;border-radius:8px;display:block;">`;
  }

  document.querySelectorAll(".media-thumb").forEach((el, i) => {
    el.style.borderColor = i === index ? "var(--accent)" : "transparent";
  });
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

  container.innerHTML = cart.map(game => `
    <div class="cart-item">
      <img src="${game.image}" alt="${game.title}" onerror="this.src='https://placehold.co/80x80/1c1c2e/7c3aed?text=?'">
      <div class="cart-item-info">
        <h3>${game.title}</h3>
        <p>${game.platform} • ${game.genre}</p>
      </div>
      <span class="cart-item-price">€${game.price}</span>
      <button class="btn btn-outline" onclick="handleRemoveFromCart(${game.id})" style="margin-left:0.5rem">🗑️</button>
    </div>
  `).join("");

  const total = cart.reduce((sum, g) => sum + g.price, 0).toFixed(2);
  const saved = cart.reduce((sum, g) => sum + (g.originalPrice - g.price), 0).toFixed(2);

  if (summary) {
    summary.innerHTML = `
      <div class="summary-box">
        <div class="summary-row"><span>Кількість ігор</span><span>${cart.length}</span></div>
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

// ─── GAME PAGE CART/WISH HELPERS ─────────────────────
// These look up the game by ID instead of passing JSON
// through onclick — avoids apostrophe/quote breaking HTML
function handleCartFromPage(id) {
  const game = games.find(g => g.id === id);
  if (game) addToCart(game);
}

function handleWishFromPage(id) {
  const game = games.find(g => g.id === id);
  if (game) addToWishlist(game);
}