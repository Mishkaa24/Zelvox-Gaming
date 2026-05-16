// ─── DETECT WHICH PAGE WE'RE ON ───────────────────────
const page = window.location.pathname.split("/").pop() || "index.html";

document.addEventListener("DOMContentLoaded", () => {
  if (page === "index.html" || page === "") initHomePage();
  if (page === "catalogue.html") initCataloguePage();
  if (page === "game.html") initGamePage();
  if (page === "cart.html") initCartPage();
  if (page === "wishlist.html") initWishlistPage();
  if (page === "receipt.html") initReceiptPage();
  initSearchDropdown();
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

function initSearchDropdown() {
  const input = document.getElementById("search-input");
  const searchBar = document.querySelector(".search-bar");
  if (!input || !searchBar || document.getElementById("search-dropdown")) return;

  const dropdown = document.createElement("div");
  dropdown.id = "search-dropdown";
  dropdown.className = "search-dropdown";
  searchBar.appendChild(dropdown);

  input.addEventListener("input", () => renderSearchDropdown());
  input.addEventListener("focus", () => renderSearchDropdown());
  input.addEventListener("keydown", handleSearchDropdownKeys);

  document.addEventListener("click", (e) => {
    if (!searchBar.contains(e.target)) closeSearchDropdown();
  });
}

function renderSearchDropdown() {
  const input = document.getElementById("search-input");
  const dropdown = document.getElementById("search-dropdown");
  if (!input || !dropdown) return;

  const query = input.value.trim().toLowerCase();
  if (!query) {
    closeSearchDropdown();
    return;
  }

  const matches = games
    .filter(game =>
      game.title.toLowerCase().includes(query) ||
      game.genre.toLowerCase().includes(query) ||
      game.platform.toLowerCase().includes(query)
    )
    .slice(0, 6);

  if (matches.length === 0) {
    dropdown.innerHTML = `<div class="search-empty">No games found</div>`;
    dropdown.classList.add("open");
    return;
  }

  dropdown.innerHTML = matches.map((game, index) => `
    <a class="search-result" href="game.html?id=${game.id}" data-index="${index}">
      <img src="${game.imageVer || game.image}" alt="${escapeHTML(game.title)}" onerror="this.src='https://placehold.co/48x48/1c1c2e/7c3aed?text=?'">
      <span class="search-result-info">
        <strong>${escapeHTML(game.title)}</strong>
        <small>${escapeHTML(game.platform)} • ${escapeHTML(game.genre)}</small>
      </span>
      <span class="search-result-price">€${game.price}</span>
    </a>
  `).join("");

  dropdown.classList.add("open");
}

function handleSearchDropdownKeys(e) {
  const dropdown = document.getElementById("search-dropdown");
  if (!dropdown || !dropdown.classList.contains("open")) return;

  const results = Array.from(dropdown.querySelectorAll(".search-result"));
  if (e.key === "Escape") {
    closeSearchDropdown();
    return;
  }
  if (results.length === 0) return;

  const current = results.findIndex(item => item.classList.contains("active"));

  if (e.key === "ArrowDown") {
    e.preventDefault();
    e.stopPropagation();
    const next = current < results.length - 1 ? current + 1 : 0;
    setActiveSearchResult(results, next);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    e.stopPropagation();
    const prev = current > 0 ? current - 1 : results.length - 1;
    setActiveSearchResult(results, prev);
  } else if (e.key === "Enter" && current >= 0) {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = results[current].href;
  }
}

function setActiveSearchResult(results, index) {
  results.forEach((item, i) => item.classList.toggle("active", i === index));
}

function closeSearchDropdown() {
  const dropdown = document.getElementById("search-dropdown");
  if (!dropdown) return;
  dropdown.classList.remove("open");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}


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
          <span class="slide-discount">-${g.discount}%</span>
          <h2>${g.title}</h2>
          <div class="slide-price">
            <span class="slide-price-new">€${g.price}</span>
            <span class="slide-price-old">€${g.originalPrice}</span>
          </div>
          <a href="game.html?id=${g.id}" class="btn btn-primary">Buy Now →</a>
        </div>
      </div>
    </div>
  `).join("") + `
    <div class="banner-dots">
      ${featured.map((_, i) => `<div class="dot ${i === 0 ? "active" : ""}" onclick="goToSlide(${i}); clearInterval(window._bannerInterval);" title="Slide ${i + 1}"></div>`).join("")}
    </div>
  `;

  window._bannerCurrent = 0;
  window._bannerCount = featured.length;
  window._bannerInterval = setInterval(() => {
    window._bannerCurrent = (window._bannerCurrent + 1) % featured.length;
    goToSlide(window._bannerCurrent);
  }, 10000);
}

function moveBanner(dir) {
  const count = window._bannerCount || 1;
  window._bannerCurrent = ((window._bannerCurrent || 0) + dir + count) % count;
  goToSlide(window._bannerCurrent);
  clearInterval(window._bannerInterval);
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
        <h2>No games found</h2>
        <p>Try changing the filters or search query</p>
      </div>`;
  } else {
    grid.innerHTML = filtered.map(createGameCard).join("");
  }
}

// ─── GAME PAGE ────────────────────────────────────────
function getReviewColor(score) {
  if (score >= 90) return "#4ade80";
  if (score >= 70) return "#facc15";
  return "#f87171";
}

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

  const reviewColor = getReviewColor(game.reviewScore || 0);

  // Description
  const fullDesc = game.description || "";
  const shortDesc = fullDesc.length > 220 ? fullDesc.slice(0, 220) + "..." : fullDesc;
  const hasMore = fullDesc.length > 220;

  // Info table rows
  const infoRows = [
    game.developer   ? `<div class="info-row"><span class="info-label">Developer</span><span class="info-value">${game.developer}</span></div>` : "",
    game.publisher   ? `<div class="info-row"><span class="info-label">Publisher</span><span class="info-value">${game.publisher}</span></div>` : "",
    game.releaseDate ? `<div class="info-row"><span class="info-label">Release Date</span><span class="info-value">${game.releaseDate}</span></div>` : "",
    `<div class="info-row"><span class="info-label">Genre</span><span class="info-value">${game.genre}</span></div>`,
    `<div class="info-row"><span class="info-label">Platform</span><span class="info-value">${game.platform}</span></div>`,
    game.reviewText  ? `<div class="info-row"><span class="info-label">All Reviews</span><span class="info-value" style="color:${reviewColor}">${game.reviewText} (${game.reviewCount})</span></div>` : "",
  ].join("");

  // System requirements
  let sysreqHTML = "";
  if (game.systemReqs) {
    const r = game.systemReqs;
    sysreqHTML = `
      <div class="gd-sysreqs">
        <h3 class="gd-section-title">System Requirements</h3>
        <div class="sysreq-grid">
          <div class="sysreq-col">
            <h4>Minimum*</h4>
            ${r.min.map(([k, v]) => `
              <div class="sysreq-row">
                <span class="sysreq-key">${k}:</span>
                <span class="sysreq-val">${v}</span>
              </div>`).join("")}
          </div>
          <div class="sysreq-col">
            <h4>Recommended*</h4>
            ${r.rec.map(([k, v]) => `
              <div class="sysreq-row">
                <span class="sysreq-key">${k}:</span>
                <span class="sysreq-val">${v}</span>
              </div>`).join("")}
          </div>
        </div>
      </div>`;
  }

  // Media gallery
  const media = game.media || [];
  const firstItem = media[0];
  const firstMainHTML = firstItem
    ? firstItem.type === "video"
      ? `<video id="media-main-video" src="${firstItem.src}" controls poster="${firstItem.thumb || ""}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius);"></video>`
      : `<img src="${firstItem.src}" alt="screenshot" id="media-main-img" onclick="openLightbox(0)" style="cursor:zoom-in;width:100%;height:100%;object-fit:cover;">`
    : "";

  const galleryHTML = media.length > 0 ? `
    <div class="screenshot-gallery">
      <div class="screenshot-main" id="media-main-container" style="position:relative;">
        ${firstMainHTML}
        <button class="ss-arrow ss-arrow-left" onclick="changeMedia(-1)">&#8249;</button>
        <button class="ss-arrow ss-arrow-right" onclick="changeMedia(1)">&#8250;</button>
      </div>
      <div class="screenshot-thumbs">
        ${media.map((item, i) => `
          <div class="thumb-wrap ${i === 0 ? "active" : ""}" onclick="selectMedia(${i})">
            <img src="${item.thumb || item.src}" class="thumb" alt="media ${i + 1}">
            ${item.type === "video" ? `<div class="thumb-play">&#9654;</div>` : ""}
          </div>
        `).join("")}
      </div>
    </div>
    <div class="lightbox" id="lightbox" onclick="closeLightbox()">
      <button class="lightbox-close" onclick="closeLightbox()">✕</button>
      <button class="lightbox-arrow lightbox-left" onclick="event.stopPropagation();lightboxMove(-1)">&#8249;</button>
      <img id="lightbox-img" src="" alt="screenshot">
      <button class="lightbox-arrow lightbox-right" onclick="event.stopPropagation();lightboxMove(1)">&#8250;</button>
    </div>
  ` : "";

  container.innerHTML = `
    <div class="gd-wrapper">

      <!-- TOP ROW: cover image + info panel -->
      <div class="gd-top">

        <div class="gd-img-col">
          <img
            src="${game.imageHor || game.image}"
            alt="${game.title}"
            class="gd-cover"
            onerror="this.src='https://placehold.co/600x340/1c1c2e/7c3aed?text=No+Image'"
          >
        </div>

        <div class="gd-side">
          <h1 class="gd-title">${game.title} — ${game.platform}</h1>

          <div class="gd-tags">
            <span class="gd-tag gd-tag-platform">🎮 ${game.platform}</span>
            <span class="gd-tag gd-tag-stock">✔ In Stock</span>
            <span class="gd-tag gd-tag-digital">✔ Digital Download</span>
          </div>

          <div class="gd-price-block">
            <span class="gd-orig-price">€${game.originalPrice}</span>
            <span class="gd-disc-tag">-${game.discount}%</span>
            <span class="gd-final-price">€${game.price}</span>
          </div>

          <div class="gd-buy-actions" id="gd-buy-actions">
            ${buildWishBtn(game)}
            ${buildCartBtn(game)}
          </div>
        </div>
      </div>

      <!-- MEDIA GALLERY -->
      ${galleryHTML}

      <!-- BOTTOM ROW: about + meta sidebar -->
      <div class="gd-bottom">

        <div class="gd-about">
          <h3 class="gd-section-title">About this game</h3>
          <p class="gd-desc" id="desc-text">${shortDesc}</p>
          ${hasMore ? `<button class="read-more-btn" onclick="toggleDesc('${encodeURIComponent(fullDesc)}', '${encodeURIComponent(shortDesc)}')">Read more ▾</button>` : ""}
          ${sysreqHTML}
        </div>

        <div class="gd-meta">
          ${game.reviewScore ? `
          <div class="gd-review-block">
            <div class="gd-review-circle" style="border-color:${reviewColor}; color:${reviewColor}">
              ${game.reviewScore}
            </div>
            <div class="gd-review-info">
              <span class="gd-review-label">Based on</span>
              <span class="gd-review-count">${game.reviewCount} reviews</span>
              <span class="gd-review-sentiment" style="color:${reviewColor}">${game.reviewText}</span>
            </div>
          </div>` : ""}
          <div class="info-table">${infoRows}</div>
        </div>

      </div>
    </div>
  `;

  window._media = media;
  window._currentMedia = 0;

  // Similar games
  const similar = games.filter(g => g.genre === game.genre && g.id !== game.id).slice(0, 4);
  const simGrid = document.getElementById("similar-grid");
  if (simGrid) simGrid.innerHTML = similar.map(createGameCard).join("");
}

// ─── GAME PAGE BUTTON BUILDERS ────────────────────────
function buildWishBtn(game) {
  const active = getWishlist().some(g => g.id === game.id);
  return `<button
    id="gd-wish-btn"
    class="gd-wish-btn${active ? " active" : ""}"
    onclick='toggleWishlistGame(${JSON.stringify(game)})'
    title="${active ? "Remove from Wishlist" : "Add to Wishlist"}">
    ${active ? "💜" : "🤍"}
  </button>`;
}

function buildCartBtn(game) {
  const active = getCart().some(g => g.id === game.id);
  return `<button
    id="gd-cart-btn"
    class="gd-cart-btn${active ? " in-cart" : ""}"
    onclick='toggleCartGame(${JSON.stringify(game)})'>
    ${active ? "✓ In Cart" : "🛒 Add to Cart"}
  </button>`;
}

// ─── READ MORE TOGGLE ─────────────────────────────────
function toggleDesc(fullEnc, shortEnc) {
  const el = document.getElementById("desc-text");
  const btn = document.querySelector(".read-more-btn");
  if (!el || !btn) return;
  const full = decodeURIComponent(fullEnc);
  const short = decodeURIComponent(shortEnc);
  if (el.textContent === short) {
    el.textContent = full;
    btn.textContent = "Show less ▴";
  } else {
    el.textContent = short;
    btn.textContent = "Read more ▾";
  }
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
        <h2>Your cart is empty</h2>
        <p>Add some games to get started</p>
        <a href="catalogue.html" class="btn btn-primary" style="margin-top:1rem">Browse Catalogue</a>
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
        <div class="summary-row"><span>Games</span><span>${cart.length}</span></div>
        <div class="summary-row"><span>You save</span><span style="color:var(--success)">-€${saved}</span></div>
        <div class="summary-row total"><span>Total</span><span>€${total}</span></div>
        <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:1rem" onclick="checkout()">
          ✅ Checkout
        </button>
      </div>
    `;
  }
}

function handleRemoveFromCart(id) {
  removeFromCart(id);
  renderCart();
  showToast("🗑️ Game removed from cart");
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
        <h2>Your wishlist is empty</h2>
        <p>Add games you want to buy later</p>
        <a href="catalogue.html" class="btn btn-primary" style="margin-top:1rem">Browse Catalogue</a>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(game => `
    <div class="game-card" style="display:block; text-decoration:none; color:var(--text)">
      <a href="game.html?id=${game.id}" style="text-decoration:none; color:inherit">
        <img src="${game.imageVer || game.image}" alt="${game.title}" style="width:100%; aspect-ratio:3/4; object-fit:cover;" onerror="this.src='https://placehold.co/300x400/1c1c2e/7c3aed?text=No+Image'">
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
        <button class="btn btn-primary" style="flex:1; justify-content:center; font-size:0.8rem; padding:8px" onclick='addToCart(${JSON.stringify(game)})'>🛒 Add to Cart</button>
        <button class="btn btn-outline" style="padding:8px 10px" onclick="handleRemoveFromWishlist(${game.id})">🗑️</button>
      </div>
    </div>
  `).join("");
}

function handleRemoveFromWishlist(id) {
  removeFromWishlist(id);
  renderWishlist();
  showToast("🗑️ Game removed from wishlist");
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
        <h2>Order not found</h2>
        <a href="index.html" class="btn btn-primary" style="margin-top:1rem">Back to Home</a>
      </div>`;
    return;
  }

  const total = order.reduce((sum, g) => sum + g.price, 0).toFixed(2);

  box.innerHTML = `
    <span class="receipt-success-icon">🎮</span>
    <h1>Thank you for your purchase!</h1>
    <p>Your order has been placed successfully. Enjoy your game!</p>
    <div class="order-id">Order number: #${orderId}</div>
    <div class="receipt-items-list">
      ${order.map(g => `
        <div class="receipt-item">
          <span>${g.title} <small style="color:var(--text2)">(${g.platform})</small></span>
          <strong>€${g.price}</strong>
        </div>
      `).join("")}
      <div class="receipt-item" style="border-top: 2px solid var(--accent); margin-top:0.5rem; padding-top:1rem;">
        <span style="font-weight:700; color:var(--text)">Total</span>
        <strong>€${total}</strong>
      </div>
    </div>
    <a href="index.html" class="btn btn-primary" style="margin-top:1rem; justify-content:center">🏠 Back to Store</a>
  `;
}

// ─── NEWSLETTER ───────────────────────────────────────
function subscribeNewsletter() {
  const input = document.querySelector(".newsletter-input input");
  if (!input) return;
  const email = input.value.trim();
  if (!email || !email.includes("@")) {
    showToast("⚠️ Please enter a valid email!");
    return;
  }
  input.value = "";
  showToast("✅ Thanks! You're subscribed to deals!");
}

// ─── MEDIA GALLERY ────────────────────────────────────
function selectMedia(index) {
  window._currentMedia = index;
  const item = (window._media || [])[index];
  if (!item) return;

  const container = document.getElementById("media-main-container");
  const thumbWraps = document.querySelectorAll(".thumb-wrap");
  thumbWraps.forEach((t, i) => t.classList.toggle("active", i === index));

  const oldImg = document.getElementById("media-main-img");
  const oldVideo = document.getElementById("media-main-video");
  if (oldImg) oldImg.remove();
  if (oldVideo) { oldVideo.pause(); oldVideo.remove(); }

  if (item.type === "video") {
    const video = document.createElement("video");
    video.id = "media-main-video";
    video.src = item.src;
    video.controls = true;
    video.autoplay = true;
    video.poster = item.thumb || "";
    video.style.cssText = "width:100%;height:100%;object-fit:cover;border-radius:var(--radius);";
    container.insertBefore(video, container.firstChild);
  } else {
    const img = document.createElement("img");
    img.id = "media-main-img";
    img.src = item.src;
    img.alt = "screenshot";
    img.style.cssText = "width:100%;height:100%;object-fit:cover;cursor:zoom-in;";
    img.onclick = () => openLightbox(index);
    container.insertBefore(img, container.firstChild);
  }
}

function changeMedia(dir) {
  const count = (window._media || []).length;
  if (count === 0) return;
  window._currentMedia = ((window._currentMedia || 0) + dir + count) % count;
  selectMedia(window._currentMedia);
}

function openLightbox(index) {
  const item = (window._media || [])[index];
  if (!item || item.type === "video") return;
  window._currentMedia = index;
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  if (!lb || !img) return;
  img.src = item.src;
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  if (lb) lb.classList.remove("open");
  document.body.style.overflow = "";
}

function lightboxMove(dir) {
  const images = (window._media || []).filter(m => m.type === "image");
  if (images.length === 0) return;
  const currentItem = window._media[window._currentMedia];
  let imgIndex = images.indexOf(currentItem);
  imgIndex = (imgIndex + dir + images.length) % images.length;
  const newItem = images[imgIndex];
  window._currentMedia = window._media.indexOf(newItem);
  const img = document.getElementById("lightbox-img");
  if (img) img.src = newItem.src;
}
