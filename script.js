/**
 * Brew & Bean Coffee House — Master JavaScript Application
 * Vanilla JS implementation for interactive coffee house experience
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. Preloader Handling (Guaranteed smooth dismissal)
     ========================================================================== */
  function dismissPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        if (preloader.parentNode) {
          preloader.parentNode.removeChild(preloader);
        }
      }, 700);
    }
  }

  // Smooth dismissal once DOM is loaded with failsafe
  setTimeout(dismissPreloader, 600);
  window.addEventListener('load', dismissPreloader);
  setTimeout(dismissPreloader, 1500);

  /* ==========================================================================
     2. Theme Toggle (Dark / Light Mode)
     ========================================================================== */
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('brew_bean_theme') || 'light';
  
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('brew_bean_theme', theme);
    themeToggleBtns.forEach(btn => {
      const icon = btn.querySelector('svg');
      if (theme === 'dark') {
        btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
        btn.setAttribute('aria-label', 'Switch to light mode');
      } else {
        btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
        btn.setAttribute('aria-label', 'Switch to dark mode');
      }
    });
  }

  applyTheme(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
      showToast(current === 'dark' ? '☀️ Switched to Light Roast theme' : '🌙 Switched to Dark Espresso theme');
    });
  });

  /* ==========================================================================
     3. Navigation Active State & Smooth Scrolling
     ========================================================================== */
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          e.preventDefault();
          targetSection.scrollIntoView({ behavior: 'smooth' });
          closeMobileNav();
        }
      }
    });
  });

  /* ==========================================================================
     4. Scroll Progress & Sticky Navbar
     ========================================================================== */
  const navbar = document.querySelector('.navbar');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    updateActiveNavLink();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     5. Mobile Navigation Drawer
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileCloseBtn = document.getElementById('mobile-drawer-close');

  function openMobileNav() {
    if (hamburgerBtn) hamburgerBtn.classList.add('active');
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (hamburgerBtn) hamburgerBtn.classList.remove('active');
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileNav);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileNav);

  /* ==========================================================================
     6. Custom Desktop Cursor
     ========================================================================== */
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorRing = document.querySelector('.custom-cursor-ring');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, .gallery-item, .product-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1.6)';
        cursorRing.style.borderColor = 'var(--caramel-light)';
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.borderColor = 'var(--caramel-primary)';
      });
    });
  }

  /* ==========================================================================
     7. Toast Notification Utility
     ========================================================================== */
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'info') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--caramel-light);flex-shrink:0;">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'all 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  /* ==========================================================================
     8. Cart & Order History Management
     ========================================================================== */
  let cart = JSON.parse(localStorage.getItem('brew_bean_cart')) || [];
  let orderHistory = JSON.parse(localStorage.getItem('brew_bean_orders')) || [];
  let appliedDiscount = false;

  const cartCounterEl = document.querySelector('.cart-count');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartToggleBtns = document.querySelectorAll('.cart-toggle-btn');
  const cartCloseBtn = document.getElementById('cart-drawer-close');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartDiscountRow = document.getElementById('cart-discount-row');
  const cartDiscountEl = document.getElementById('cart-discount-val');
  const cartTaxEl = document.getElementById('cart-tax');
  const cartTotalEl = document.getElementById('cart-total');
  const promoInput = document.getElementById('cart-promo-input');
  const applyPromoBtn = document.getElementById('cart-apply-promo');
  const checkoutBtn = document.getElementById('cart-checkout-btn');

  // Orders History Elements
  const ordersToggleBtns = document.querySelectorAll('.orders-toggle-btn');
  const ordersModal = document.getElementById('orders-modal');
  const ordersModalClose = document.getElementById('orders-modal-close');
  const ordersModalBody = document.getElementById('orders-modal-body');
  const clearOrdersBtn = document.getElementById('btn-clear-orders');
  const modalOrderMoreBtn = document.getElementById('btn-modal-order-more');

  function updateOrdersBadge() {
    const count = orderHistory.length;
    const badgeEl = document.getElementById('orders-count-badge');
    const mobileBadgeEl = document.getElementById('mobile-orders-badge');
    if (badgeEl) {
      badgeEl.textContent = count;
      badgeEl.style.display = count > 0 ? 'flex' : 'none';
    }
    if (mobileBadgeEl) {
      mobileBadgeEl.textContent = count === 1 ? '1 Order' : `${count} Orders`;
    }
  }

  function renderOrdersModal() {
    if (!ordersModalBody) return;

    if (orderHistory.length === 0) {
      ordersModalBody.innerHTML = `
        <div class="orders-empty-state">
          <div class="orders-empty-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <h4 class="orders-empty-title">No Orders Yet</h4>
          <p class="orders-empty-desc">Your past coffee orders and receipts will appear here for easy tracking and 1-click reordering.</p>
          <button class="btn-primary" id="empty-state-order-btn" style="margin-top:8px;">
            Explore Menu &amp; Order ☕
          </button>
        </div>
      `;

      const emptyBtn = document.getElementById('empty-state-order-btn');
      if (emptyBtn) {
        emptyBtn.addEventListener('click', () => {
          closeOrdersModal();
          const menuSection = document.getElementById('menu');
          if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
        });
      }
      return;
    }

    ordersModalBody.innerHTML = orderHistory.map(order => {
      const dateObj = new Date(order.date);
      const dateStr = isNaN(dateObj.getTime())
        ? 'Recent Order'
        : dateObj.toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

      const itemsHtml = order.items.map(item => `
        <div class="order-item-compact">
          <div class="order-item-compact-left">
            <img src="${item.image}" alt="${item.name}" class="order-item-compact-thumb">
            <div>
              <div class="order-item-compact-name">${item.name}</div>
              <div class="order-item-compact-qty">Qty: ${item.quantity} × ₹${item.price}</div>
            </div>
          </div>
          <div class="order-item-compact-price">₹${item.price * item.quantity}</div>
        </div>
      `).join('');

      return `
        <div class="order-card" data-order-id="${order.id}">
          <div class="order-card-header">
            <div class="order-id-date">
              <span class="order-id">#${order.id}</span>
              <span class="order-date">${dateStr}</span>
            </div>
            <span class="order-status-badge">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
              ${order.status || 'Brewed & Ready ☕'}
            </span>
          </div>

          <div class="order-items-compact-list">
            ${itemsHtml}
          </div>

          <div class="order-card-footer">
            <div class="order-total-block">
              <span class="order-total-label">Total:</span>
              <span class="order-total-amount">₹${order.total}</span>
              ${order.discount ? `<span style="font-size:0.75rem; color:var(--accent-green);">(Saved ₹${order.discount})</span>` : ''}
            </div>
            <button class="btn-reorder" data-order-id="${order.id}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
              <span>Reorder All</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function openOrdersModal() {
    closeMobileNav();
    renderOrdersModal();
    if (ordersModal) {
      ordersModal.classList.add('open');
      ordersModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeOrdersModal() {
    if (ordersModal) {
      ordersModal.classList.remove('open');
      ordersModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  ordersToggleBtns.forEach(btn => btn.addEventListener('click', openOrdersModal));
  if (ordersModalClose) ordersModalClose.addEventListener('click', closeOrdersModal);
  if (ordersModal) {
    ordersModal.addEventListener('click', (e) => {
      if (e.target === ordersModal) closeOrdersModal();
    });
  }

  if (modalOrderMoreBtn) {
    modalOrderMoreBtn.addEventListener('click', () => {
      closeOrdersModal();
    });
  }

  // Clear orders history
  if (clearOrdersBtn) {
    clearOrdersBtn.addEventListener('click', () => {
      if (orderHistory.length === 0) {
        showToast('No orders to clear');
        return;
      }
      orderHistory = [];
      localStorage.removeItem('brew_bean_orders');
      updateOrdersBadge();
      renderOrdersModal();
      showToast('Order history cleared successfully');
    });
  }

  // Reorder click delegation in orders modal
  if (ordersModalBody) {
    ordersModalBody.addEventListener('click', (e) => {
      const reorderBtn = e.target.closest('.btn-reorder');
      if (reorderBtn) {
        const orderId = reorderBtn.getAttribute('data-order-id');
        const foundOrder = orderHistory.find(o => o.id === orderId);
        if (foundOrder && foundOrder.items) {
          foundOrder.items.forEach(item => {
            const existing = cart.find(c => c.id === item.id);
            if (existing) {
              existing.quantity += item.quantity;
            } else {
              cart.push({ ...item });
            }
          });
          saveCart();
          closeOrdersModal();
          openCartDrawer();
          showToast(`☕ Reordered items from #${orderId}!`);
        }
      }
    });
  }

  function saveCart() {
    localStorage.setItem('brew_bean_cart', JSON.stringify(cart));
    updateCartUI();
  }

  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCounterEl) {
      cartCounterEl.textContent = totalItems;
      cartCounterEl.classList.add('bounce');
      setTimeout(() => cartCounterEl.classList.remove('bounce'), 300);
    }

    if (!cartItemsList) return;

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <p>Your coffee cup is empty!</p>
          <p style="font-size:0.85rem; margin-top:6px;">Add some freshly brewed favorites.</p>
        </div>
      `;
    } else {
      cartItemsList.innerHTML = cart.map(item => `
        <div class="cart-item-row" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-info">
            <h5 class="cart-item-name">${item.name}</h5>
            <span class="cart-item-price">₹${item.price}</span>
          </div>
          <div class="cart-item-qty-control">
            <button class="qty-btn btn-qty-dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
            <span>${item.quantity}</span>
            <button class="qty-btn btn-qty-inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
          </div>
          <button class="btn-remove-item" data-id="${item.id}" aria-label="Remove item" style="color:var(--text-muted); margin-left:6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      `).join('');
    }

    // Calculations
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = appliedDiscount ? Math.round(subtotal * 0.20) : 0;
    const taxableAmount = subtotal - discount;
    const tax = Math.round(taxableAmount * 0.05); // 5% GST
    const total = taxableAmount + tax;

    if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal}`;
    if (cartDiscountRow) {
      if (appliedDiscount && discount > 0) {
        cartDiscountRow.style.display = 'flex';
        if (cartDiscountEl) cartDiscountEl.textContent = `-₹${discount}`;
      } else {
        cartDiscountRow.style.display = 'none';
      }
    }
    if (cartTaxEl) cartTaxEl.textContent = `₹${tax}`;
    if (cartTotalEl) cartTotalEl.textContent = `₹${total}`;
  }

  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    showToast(`☕ Added "${product.name}" to cart!`);
  }

  // Cart item events delegation
  if (cartItemsList) {
    cartItemsList.addEventListener('click', (e) => {
      const target = e.target.closest('button');
      if (!target) return;
      const id = target.getAttribute('data-id');
      if (!id) return;

      if (target.classList.contains('btn-qty-inc')) {
        const item = cart.find(i => i.id === id);
        if (item) item.quantity += 1;
        saveCart();
      } else if (target.classList.contains('btn-qty-dec')) {
        const item = cart.find(i => i.id === id);
        if (item) {
          item.quantity -= 1;
          if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
          }
        }
        saveCart();
      } else if (target.classList.contains('btn-remove-item')) {
        cart = cart.filter(i => i.id !== id);
        saveCart();
        showToast('Item removed from cart');
      }
    });
  }

  // Add to cart buttons across the page
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-add-cart');
    if (btn) {
      const card = btn.closest('[data-product-id]');
      if (card) {
        const id = card.getAttribute('data-product-id');
        const name = card.getAttribute('data-product-name');
        const price = parseInt(card.getAttribute('data-product-price'), 10);
        const image = card.getAttribute('data-product-image');
        addToCart({ id, name, price, image });
      }
    }
  });

  // Cart Open/Close
  function openCartDrawer() {
    if (cartDrawer) cartDrawer.classList.add('open');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    if (cartDrawer) cartDrawer.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  cartToggleBtns.forEach(btn => btn.addEventListener('click', openCartDrawer));
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

  // Promo code
  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'BREW20') {
        appliedDiscount = true;
        updateCartUI();
        showToast('🎉 Promo code BREW20 applied: 20% OFF!');
      } else {
        showToast('⚠️ Invalid promo code. Try BREW20');
      }
    });
  }

  // Checkout Button with Order History Recording
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your cart is empty! Add items first.');
        return;
      }

      // Calculate final summary for order receipt
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const discount = appliedDiscount ? Math.round(subtotal * 0.20) : 0;
      const taxableAmount = subtotal - discount;
      const tax = Math.round(taxableAmount * 0.05);
      const total = taxableAmount + tax;

      // Construct unique order record
      const newOrder = {
        id: 'BB-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toISOString(),
        items: JSON.parse(JSON.stringify(cart)),
        subtotal: subtotal,
        discount: discount,
        tax: tax,
        total: total,
        status: 'Brewed & Ready ☕'
      };

      orderHistory.unshift(newOrder);
      localStorage.setItem('brew_bean_orders', JSON.stringify(orderHistory));
      updateOrdersBadge();

      showToast(`🎉 Order #${newOrder.id} placed! Saved in Order History.`);
      cart = [];
      appliedDiscount = false;
      saveCart();
      setTimeout(closeCartDrawer, 600);
    });
  }

  updateCartUI();
  updateOrdersBadge();

  /* ==========================================================================
     9. Menu Category Filtering & Search
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item-card');
  const menuSearchInput = document.getElementById('menu-search');

  function filterMenu() {
    const activeBtn = document.querySelector('.filter-btn.active');
    const category = activeBtn ? activeBtn.getAttribute('data-category') : 'all';
    const searchQuery = menuSearchInput ? menuSearchInput.value.trim().toLowerCase() : '';

    menuItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      const itemTitle = item.querySelector('.menu-item-title')?.textContent.toLowerCase() || '';
      const itemDesc = item.querySelector('.menu-item-desc')?.textContent.toLowerCase() || '';

      const matchesCategory = category === 'all' || itemCategory === category;
      const matchesSearch = searchQuery === '' || itemTitle.includes(searchQuery) || itemDesc.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        item.classList.remove('hidden');
        item.style.animation = 'zoomIn 0.35s ease';
      } else {
        item.classList.add('hidden');
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterMenu();
    });
  });

  if (menuSearchInput) {
    menuSearchInput.addEventListener('input', filterMenu);
  }

  /* ==========================================================================
     10. Statistics Counter Animation
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  function runStatsCounter() {
    if (statsCounted) return;
    statsCounted = true;

    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing function outQuad
        const easeVal = 1 - (1 - progress) * (1 - progress);
        const currentCount = Math.floor(easeVal * target);

        stat.textContent = `${currentCount}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = `${target}${suffix}`;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runStatsCounter();
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(aboutSection);
  }

  /* ==========================================================================
     11. Scroll Reveal Animations (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale-in');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     12. Gallery Fullscreen Lightbox
     ========================================================================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxCloseBtn = document.getElementById('lightbox-close');
  const lightboxPrevBtn = document.getElementById('lightbox-prev');
  const lightboxNextBtn = document.getElementById('lightbox-next');

  let currentGalleryIndex = 0;
  const galleryData = Array.from(galleryItems).map(item => ({
    src: item.getAttribute('data-full-img') || item.querySelector('img').src,
    title: item.querySelector('.gallery-caption-title')?.textContent || 'Brew & Bean Specialty',
    sub: item.querySelector('.gallery-caption-sub')?.textContent || 'Gallery'
  }));

  function openLightbox(index) {
    currentGalleryIndex = index;
    updateLightboxContent();
    if (lightboxModal) {
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function updateLightboxContent() {
    if (!lightboxImg || !galleryData[currentGalleryIndex]) return;
    const data = galleryData[currentGalleryIndex];
    lightboxImg.src = data.src;
    lightboxImg.alt = data.title;
    if (lightboxTitle) lightboxTitle.textContent = `${data.title} — ${data.sub}`;
    if (lightboxCounter) lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${galleryData.length}`;
  }

  function nextLightbox() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    updateLightboxContent();
  }

  function prevLightbox() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightbox);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Keyboard Navigation for Lightbox & Modals
  window.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    }
    if (cartDrawer && cartDrawer.classList.contains('open') && e.key === 'Escape') {
      closeCartDrawer();
    }
    if (ordersModal && ordersModal.classList.contains('open') && e.key === 'Escape') {
      closeOrdersModal();
    }
  });

  /* ==========================================================================
     13. Testimonials Carousel
     ========================================================================== */
  const testimonials = [
    {
      text: "“Absolutely loved the cappuccino! The velvety microfoam and rich caramel aroma are perfection. The cozy wooden atmosphere makes it my ultimate morning workspace.”",
      name: "Aditi Sharma",
      role: "Regular Guest & Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      text: "“The caramel latte is incredible — easily the smoothest espresso extraction in the city. The baristas genuinely care about roast profile and craft.”",
      name: "Rahul Mehra",
      role: "Coffee Enthusiast",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      text: "“Beautiful café, friendly staff, and amazing specialty blends. Their warm chocolate croissant paired with a cold brew is nothing short of pure bliss!”",
      name: "Priya Deshmukh",
      role: "Food & Travel Writer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      text: "“Their single-origin V60 pour over unlocked notes of berry and jasmine I didn’t know coffee could have. A true sanctuary for authentic coffee lovers.”",
      name: "Siddharth Kapoor",
      role: "Software Architect",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    }
  ];

  let currentTestimonialIdx = 0;
  let testimonialAutoInterval = null;

  const testimonialTextEl = document.getElementById('testimonial-text');
  const testimonialAvatarEl = document.getElementById('testimonial-avatar');
  const testimonialNameEl = document.getElementById('testimonial-name');
  const testimonialRoleEl = document.getElementById('testimonial-role');
  const testimonialDotsWrap = document.getElementById('testimonial-dots');
  const testimonialPrevBtn = document.getElementById('testimonial-prev');
  const testimonialNextBtn = document.getElementById('testimonial-next');
  const testimonialSlideBox = document.querySelector('.testimonial-slide-box');

  function renderTestimonialDots() {
    if (!testimonialDotsWrap) return;
    testimonialDotsWrap.innerHTML = testimonials.map((_, idx) => `
      <button class="carousel-dot ${idx === currentTestimonialIdx ? 'active' : ''}" data-index="${idx}" aria-label="Go to testimonial ${idx + 1}"></button>
    `).join('');
  }

  function displayTestimonial(idx) {
    currentTestimonialIdx = idx;
    const item = testimonials[currentTestimonialIdx];
    if (!item) return;

    if (testimonialSlideBox) {
      testimonialSlideBox.style.opacity = '0';
      testimonialSlideBox.style.transform = 'translateY(10px)';
    }

    setTimeout(() => {
      if (testimonialTextEl) testimonialTextEl.textContent = item.text;
      if (testimonialAvatarEl) {
        testimonialAvatarEl.src = item.avatar;
        testimonialAvatarEl.alt = item.name;
      }
      if (testimonialNameEl) testimonialNameEl.textContent = item.name;
      if (testimonialRoleEl) testimonialRoleEl.textContent = item.role;
      renderTestimonialDots();

      if (testimonialSlideBox) {
        testimonialSlideBox.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        testimonialSlideBox.style.opacity = '1';
        testimonialSlideBox.style.transform = 'translateY(0)';
      }
    }, 200);
  }

  function nextTestimonial() {
    displayTestimonial((currentTestimonialIdx + 1) % testimonials.length);
  }

  function prevTestimonial() {
    displayTestimonial((currentTestimonialIdx - 1 + testimonials.length) % testimonials.length);
  }

  function startTestimonialAutoplay() {
    stopTestimonialAutoplay();
    testimonialAutoInterval = setInterval(nextTestimonial, 5500);
  }

  function stopTestimonialAutoplay() {
    if (testimonialAutoInterval) {
      clearInterval(testimonialAutoInterval);
      testimonialAutoInterval = null;
    }
  }

  if (testimonialNextBtn) testimonialNextBtn.addEventListener('click', () => { nextTestimonial(); startTestimonialAutoplay(); });
  if (testimonialPrevBtn) testimonialPrevBtn.addEventListener('click', () => { prevTestimonial(); startTestimonialAutoplay(); });

  if (testimonialDotsWrap) {
    testimonialDotsWrap.addEventListener('click', (e) => {
      const dot = e.target.closest('.carousel-dot');
      if (dot) {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        displayTestimonial(idx);
        startTestimonialAutoplay();
      }
    });
  }

  if (testimonialSlideBox) {
    testimonialSlideBox.addEventListener('mouseenter', stopTestimonialAutoplay);
    testimonialSlideBox.addEventListener('mouseleave', startTestimonialAutoplay);
  }

  renderTestimonialDots();
  displayTestimonial(0);
  startTestimonialAutoplay();

  /* ==========================================================================
     14. Special Offer Promo Code Copy & Claim
     ========================================================================== */
  const copyCodeBtn = document.getElementById('btn-copy-code');
  const claimOfferBtn = document.getElementById('btn-claim-offer');

  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('BREW20').then(() => {
        copyCodeBtn.textContent = 'Copied! 🎉';
        showToast('Voucher code BREW20 copied to clipboard!');
        setTimeout(() => {
          copyCodeBtn.textContent = 'Copy Code';
        }, 2500);
      }).catch(() => {
        showToast('Voucher code is: BREW20');
      });
    });
  }

  if (claimOfferBtn) {
    claimOfferBtn.addEventListener('click', () => {
      appliedDiscount = true;
      if (promoInput) promoInput.value = 'BREW20';
      updateCartUI();
      openCartDrawer();
      showToast('🎁 20% OFF discount voucher applied to your cart!');
    });
  }

  /* ==========================================================================
     15. Live Opening Hours Status Indicator
     ========================================================================== */
  const liveStatusPill = document.getElementById('live-status-pill');

  function updateLiveShopStatus() {
    if (!liveStatusPill) return;
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const currentHour = now.getHours() + (now.getMinutes() / 60);

    let isOpen = false;
    let closingTimeText = '';

    if (day >= 1 && day <= 5) {
      // Mon - Fri: 7:00 AM - 9:00 PM (7 - 21)
      if (currentHour >= 7 && currentHour < 21) {
        isOpen = true;
        closingTimeText = 'Closes at 9:00 PM';
      }
    } else if (day === 6) {
      // Saturday: 8:00 AM - 10:00 PM (8 - 22)
      if (currentHour >= 8 && currentHour < 22) {
        isOpen = true;
        closingTimeText = 'Closes at 10:00 PM';
      }
    } else if (day === 0) {
      // Sunday: 8:00 AM - 8:00 PM (8 - 20)
      if (currentHour >= 8 && currentHour < 20) {
        isOpen = true;
        closingTimeText = 'Closes at 8:00 PM';
      }
    }

    if (isOpen) {
      liveStatusPill.className = 'live-status-pill';
      liveStatusPill.style.color = 'var(--accent-green)';
      liveStatusPill.style.borderColor = 'rgba(62, 123, 82, 0.3)';
      liveStatusPill.style.background = 'rgba(62, 123, 82, 0.15)';
      liveStatusPill.innerHTML = `<span class="status-dot"></span> Open Now • ${closingTimeText}`;
    } else {
      liveStatusPill.className = 'live-status-pill';
      liveStatusPill.style.color = '#e07a5f';
      liveStatusPill.style.borderColor = 'rgba(224, 122, 95, 0.3)';
      liveStatusPill.style.background = 'rgba(224, 122, 95, 0.15)';
      liveStatusPill.innerHTML = `<span class="status-dot"></span> Closed for the Night • Opens Tomorrow Morning`;
    }
  }

  updateLiveShopStatus();
  setInterval(updateLiveShopStatus, 60000);

  /* ==========================================================================
     16. Contact Form Validation & Submission
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const phoneInput = document.getElementById('contact-phone');
      const msgInput = document.getElementById('contact-message');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameInput.classList.add('error');
        isValid = false;
      } else {
        nameInput.classList.remove('error');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('error');
        isValid = false;
      } else {
        emailInput.classList.remove('error');
      }

      // Validate Phone (10 digits approx)
      const phoneRegex = /^[0-9+\s-]{8,15}$/;
      if (phoneInput.value.trim() && !phoneRegex.test(phoneInput.value.trim())) {
        phoneInput.classList.add('error');
        isValid = false;
      } else {
        phoneInput.classList.remove('error');
      }

      // Validate Message
      if (!msgInput.value.trim() || msgInput.value.trim().length < 6) {
        msgInput.classList.add('error');
        isValid = false;
      } else {
        msgInput.classList.remove('error');
      }

      if (isValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>Sending... ☕</span>`;
        submitBtn.disabled = true;

        setTimeout(() => {
          showToast(`Thank you, ${nameInput.value.trim()}! We've received your message and will reply shortly.`);
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 800);
      } else {
        showToast('Please check the required fields and try again.');
      }
    });

    // Remove error class on input
    ['contact-name', 'contact-email', 'contact-phone', 'contact-message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => el.classList.remove('error'));
      }
    });
  }

  /* ==========================================================================
     17. Newsletter Subscription Form
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value.includes('@')) {
        showToast('☕ Welcome to the Brew & Bean Club! Check your inbox for 20% off.');
        input.value = '';
      } else {
        showToast('Please enter a valid email address.');
      }
    });
  }
});
