# ☕ Brew & Bean Coffee House

A modern, premium, responsive Coffee House website crafted with semantic HTML5, modern CSS3, and vanilla JavaScript.

---

## 🚀 How to Deploy on Netlify

This project is pre-configured and 100% **Netlify-Ready** with `netlify.toml`, `public/_redirects`, and automated build settings.

### Option 1: Automatic Deployment via Git (Recommended)

1. Push this repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Log in to [Netlify](https://app.netlify.com/).
3. Click **"Add new site"** > **"Import an existing project"**.
4. Choose your Git provider and select the **Brew & Bean** repository.
5. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"** — your live coffee house website will be up in seconds!

---

### Option 2: Drag & Drop Deploy (Netlify Drop)

If you prefer deploying without connecting a Git repository:

1. In your local terminal, build the production bundle:
   ```bash
   npm run build
   ```
2. Go to [Netlify Drop](https://app.netlify.com/drop).
3. Drag and drop the generated `dist` folder into the Netlify Drop area.
4. Your website will instantly be live with custom subdomains and free SSL!

---

## 🛠️ Features Included

- **Sticky Glassmorphism Navigation** with active scroll-spy and responsive mobile drawer.
- **Dark Roast / Light Roast Theme Toggle** with `localStorage` persistence.
- **Artisanal Menu Filtering & Real-time Search** (Coffee, Cold Drinks, Teas, Bakery).
- **Interactive Shopping Cart** with coupon support (`BREW20` for 20% OFF), GST calculation, and animated drawer.
- **Local Storage Order History Modal** with itemized breakdown, receipt timestamps, and 1-click **Reorder**.
- **Fullscreen Masonry Gallery Lightbox** with keyboard navigation (`ESC`, `ArrowLeft`, `ArrowRight`).
- **Live Open/Closed Status Indicator** calculated in real time.
- **Customer Testimonials Carousel** with auto-play and touch/pause interactions.
- **Contact Form Validation & Feedback**.
- **SEO & Social Share Ready** with OpenGraph tags and Schema.org structured data.
