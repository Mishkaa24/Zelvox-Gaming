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
          <p>${g.genre}</p>
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

  // Store media for switcher
  window._gameMedia = game.media || [];

  // Determine main image/media (Horizontal image as fallback)
  const fallbackImg = game.imageHor || game.image;
  const mainMedia = window._gameMedia[0];
  
  const mediaMainHTML = mainMedia
    ? mainMedia.type === "video"
      ? `<video id="game-main-video" src="${mainMedia.src}" controls autoplay muted class="gd-cover"></video>`
      : `<img id="game-main-img" src="${mainMedia.src}" class="gd-cover" alt="${game.title}" style="cursor: zoom-in;" onclick="openLightbox(0)">`
    : `<img src="${fallbackImg}" class="gd-cover" alt="${game.title}" style="cursor: zoom-in;" onclick="openLightbox(-1)">`;

  const mediaThumbs = window._gameMedia.length > 0
    ? `<div class="screenshot-thumbs" style="margin-top: 1rem;">
        ${window._gameMedia.map((m, i) => `
          <div class="thumb-wrap ${i === 0 ? "active" : ""}" onclick="switchGameMedia(${i})" id="thumb-${i}">
            <img class="thumb" src="${m.thumb || m.src}" alt="thumb">
            ${m.type === "video" ? '<div class="thumb-play">▶</div>' : ''}
          </div>
        `).join("")}
      </div>`
    : "";

  const scoreColor = game.reviewScore >= 90 ? "#4ade80" : game.reviewScore >= 70 ? "#facc15" : "#f87171";

  const sysreqHTML = game.systemReqs ? `
    <div class="gd-sysreqs">
      <h3 class="gd-section-title">⚙️ System Requirements</h3>
      <div class="sysreq-grid">
        <div class="sysreq-col">
          <h4>Minimum</h4>
          ${game.systemReqs.min.map(([label, val]) => `
            <div class="sysreq-row">
              <span class="sysreq-key">${label}</span>
              <span class="sysreq-val">${val}</span>
            </div>
          `).join("")}
        </div>
        <div class="sysreq-col">
          <h4>Recommended</h4>
          ${game.systemReqs.rec.map(([label, val]) => `
            <div class="sysreq-row">
              <span class="sysreq-key">${label}</span>
              <span class="sysreq-val">${val}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  ` : "";

  container.innerHTML = `
    <div class="gd-wrapper">
      <div class="gd-top">
        <!-- LEFT: Media -->
        <div class="gd-img-col" style="border:none; border-radius:0;">
          <div class="screenshot-main">
            ${mediaMainHTML}
          </div>
          ${mediaThumbs}
        </div>

        <!-- RIGHT: Info Panel -->
        <div class="gd-side">
          <h1 class="gd-title">${game.title}</h1>
          
          <div class="gd-tags">
            <span class="gd-tag gd-tag-platform">🎮 ${game.platform}</span>
            <span class="gd-tag gd-tag-platform">🏷️ ${game.genre}</span>
            ${game.releaseDate ? `<span class="gd-tag gd-tag-platform">📅 ${game.releaseDate}</span>` : ""}
          </div>

          ${game.developer ? `
          <div style="font-size:0.9rem; margin-top:0.5rem;">
            <div style="color:var(--text2);">Developer: <span style="color:var(--text);font-weight:600;">${game.developer}</span></div>
            ${game.publisher && game.publisher !== game.developer ? `
              <div style="color:var(--text2);margin-top:0.25rem;">Publisher: <span style="color:var(--text);font-weight:600;">${game.publisher}</span></div>
            ` : ""}
          </div>` : ""}

          <div class="gd-price-block" style="margin-top: 1rem; padding: 1.25rem; background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius);">
            <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.25rem;flex-wrap:wrap;">
              <span class="gd-orig-price">€${game.originalPrice}</span>
              <span class="gd-disc-tag">-${game.discount}%</span>
              <span class="gd-final-price">€${game.price}</span>
            </div>
            <div class="gd-buy-actions">
              <button class="gd-wish-btn" onclick="handleWishFromPage(${game.id})" title="Add to Wishlist">❤️</button>
              <button class="gd-cart-btn" onclick="handleCartFromPage(${game.id})">🛒 Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

      <div class="gd-bottom">
        <!-- LEFT: About & Sysreq -->
        <div class="gd-about">
          <h2 class="gd-section-title">📖 About</h2>
          <p class="gd-desc">${game.description}</p>
          ${sysreqHTML}
        </div>

        <!-- RIGHT: Meta / Reviews -->
        <div class="gd-meta">
          ${game.reviewScore ? `
          <div class="gd-review-block">
            <div class="gd-review-circle" style="color:${scoreColor}; border-color:${scoreColor};">${game.reviewScore}%</div>
            <div class="gd-review-info">
              <div class="gd-review-label">User Reviews</div>
              <div class="gd-review-sentiment" style="color:${scoreColor};">${game.reviewText || "Very Positive"}</div>
              ${game.reviewCount ? `<div class="gd-review-count">Based on ${game.reviewCount} reviews</div>` : ""}
            </div>
          </div>` : ""}
        </div>
      </div>
    </div>

    <!-- Lightbox Overlay -->
    <div id="game-lightbox" class="lightbox">
      <button class="lightbox-close" onclick="closeLightbox()">✕</button>
      <button class="lightbox-arrow lightbox-left" onclick="navigateLightbox(-1)">‹</button>
      <img id="lightbox-img" src="" alt="Zoomed">
      <button class="lightbox-arrow lightbox-right" onclick="navigateLightbox(1)">›</button>
    </div>
  `;

  // Similar games
  const similar = games.filter(g => g.genre === game.genre && g.id !== game.id).slice(0, 4);
  const simGrid = document.getElementById("similar-grid");
  if (simGrid) simGrid.innerHTML = similar.map(createGameCard).join("");
}

// ─── MEDIA SWITCHER ───────────────────────────────────
function switchGameMedia(index) {
  const media = window._gameMedia;
  if (!media || !media[index]) return;
  
  const m = media[index];
  const mainDiv = document.querySelector(".screenshot-main");
  if (!mainDiv) return;

  // Update main media
  let mediaHTML;
  if (m.type === "video") {
    mediaHTML = `<video id="game-main-video" src="${m.src}" controls autoplay muted class="gd-cover"></video>`;
  } else {
    mediaHTML = `<img id="game-main-img" src="${m.src}" class="gd-cover" alt="Screenshot" style="cursor: zoom-in;" onclick="openLightbox(${index})">`;
  }
  
  mainDiv.innerHTML = mediaHTML;

  // Update active thumbnail
  document.querySelectorAll(".thumb-wrap").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });
}

// ─── LIGHTBOX ─────────────────────────────────────────
let currentLightboxIndex = 0;

function openLightbox(index) {
  const media = window._gameMedia;
  let imgSrc = "";

  if (index === -1) {
    // Fallback to the horizontal image if no media array is defined
    const params = new URLSearchParams(window.location.search);
    const game = games.find(g => g.id === parseInt(params.get("id")));
    if (game) imgSrc = game.imageHor || game.image;
    currentLightboxIndex = -1;
  } else {
    if (!media || media.length === 0) return;
    const m = media[index];
    if (!m || m.type === "video") return; // Only zoom images
    imgSrc = m.src;
    currentLightboxIndex = index;
  }

  const lb = document.getElementById("game-lightbox");
  const lbImg = document.getElementById("lightbox-img");
  
  if (lb && lbImg && imgSrc) {
    lbImg.src = imgSrc;
    lb.classList.add("open");
  }
}

function closeLightbox() {
  const lb = document.getElementById("game-lightbox");
  if (lb) lb.classList.remove("open");
}

function navigateLightbox(direction) {
  const media = window._gameMedia;
  if (!media || media.length === 0 || currentLightboxIndex === -1) return;

  let newIndex = currentLightboxIndex + direction;
  
  // Loop to find the next/prev image (skipping videos)
  while (newIndex >= 0 && newIndex < media.length) {
    if (media[newIndex].type === "image") {
      currentLightboxIndex = newIndex;
      document.getElementById("lightbox-img").src = media[currentLightboxIndex].src;
      
      // Optionally sync the main display to this image too
      switchGameMedia(currentLightboxIndex);
      return;
    }
    newIndex += direction;
  }
}

// ─── GAME PAGE CART/WISH HELPERS ─────────────────────
function handleCartFromPage(id) {
  const game = games.find(g => g.id === id);
  if (game) addToCart(game);
}

function handleWishFromPage(id) {
  const game = games.find(g => g.id === id);
  if (game) addToWishlist(game);
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