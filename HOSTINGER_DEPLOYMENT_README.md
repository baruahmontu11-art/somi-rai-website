# SOMI RAI — HOSTINGER PRODUCTION DEPLOYMENT GUIDE

This guide provides step-by-step instructions for deploying the Somi Rai website on Hostinger shared hosting or cloud hosting.

---

## Quick Summary

- **Build Output Directory:** `dist/`
- **Hostinger Target Directory:** `public_html/`
- **Server Requirements:** Standard Apache / LiteSpeed shared hosting (NO Node.js, Python, Firebase, or Database required)
- **Technology:** Modern Static HTML, Tailwind CSS, and optimized JavaScript

---

## 1. How to Create the Production Build

In your local project terminal (or build terminal), run:

```bash
npm run build
```

This compiles all pages and assets into the `dist/` directory.

### Output Structure in `dist/`:
```text
dist/
├── index.html          # Public Homepage
├── contact.html        # Direct Contact Flow Entry
├── courses.html        # Master PDF Courses Page
├── social.html         # Official Social Channels Page
├── thank-you.html      # Confirmation & WhatsApp Submission Page
├── favicon.ico         # Website Icon
├── favicon.svg         # High-resolution Vector Icon
├── robots.txt          # SEO Crawling Instructions
├── sitemap.xml         # Search Engine Index (Public URLs only)
├── .htaccess           # LiteSpeed/Apache Routing, Compression & Security Rules
│
├── assets/             # Optimized CSS & JavaScript bundles
│
└── admin/
    └── index.html      # Standalone Admin Management Area
```

---

## 2. Which Folder to Upload to Hostinger

Upload the **contents of the `dist/` folder** directly into Hostinger's `public_html` directory.

> **IMPORTANT:** Upload the files and folders *inside* `dist/`, NOT the `dist` folder itself.
> For example, `public_html/index.html` should be at the root of `public_html/`, not `public_html/dist/index.html`.

---

## 3. Where & How to Upload in Hostinger File Manager

1. Log in to your **Hostinger hPanel** (https://hpanel.hostinger.com).
2. Go to **Websites** and click **Manage** next to your domain.
3. In the left navigation, open **Files** → **File Manager** (or click **Access File Manager**).
4. Double-click to open the `public_html/` folder.
5. If there is a default Hostinger `default.php` file, delete or move it.
6. Click the **Upload** button (arrow pointing up in the top toolbar).
7. Select all files and folders inside `dist/` (or upload a `.zip` of `dist/` and click **Extract**).
8. Verify that `.htaccess`, `robots.txt`, and `sitemap.xml` are present in `public_html`. (Make sure "Show Hidden Files" is enabled in Hostinger File Manager if `.htaccess` is hidden).

---

## 4. How `public_html` Works

In Hostinger shared hosting, `public_html/` is the root web directory served to visitors:

- Visiting `https://yourdomain.com/` loads `public_html/index.html`
- Visiting `https://yourdomain.com/contact.html` loads `public_html/contact.html`
- Visiting `https://yourdomain.com/courses.html` loads `public_html/courses.html`
- Visiting `https://yourdomain.com/social.html` loads `public_html/social.html`
- Visiting `https://yourdomain.com/admin/` loads `public_html/admin/index.html`

The included `.htaccess` file automatically configures:
- Clean URLs (e.g. `/contact` and `/contact.html` both work)
- Gzip compression for fast loading on mobile networks
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`)
- 1-year browser caching for scripts, styles, and images

---

## 5. How to Configure Your Domain

If you bought your domain through Hostinger:
- It is automatically linked to your `public_html/` folder.

If your domain is with another registrar (GoDaddy, Namecheap, etc.):
1. Point your domain's Name Servers to Hostinger:
   - `ns1.dns-parking.com`
   - `ns2.dns-parking.com`
   *(Check your specific hPanel Dashboard for your exact assigned nameservers)*
2. Or point the **A Record** of your domain to your Hostinger Account IP address found on the hosting dashboard.

---

## 6. How to Enable Free SSL / HTTPS

1. In Hostinger hPanel, go to **Security** → **SSL**.
2. Click **Install SSL** (Let's Encrypt Free Lifetime SSL is included with all Hostinger plans).
3. Toggle on **Force HTTPS** so all traffic is encrypted automatically.

---

## 7. How to Access the Standalone Admin Area

The Admin Area is completely unlinked from the public customer website. Customers will never see an "Admin" button or link.

To open the management panel:
- Open your browser and navigate directly to:
  `https://yourdomain.com/admin/`

### Understanding Local Storage
The management panel stores changes and customizations in the current browser's local storage. There is no cloud database or login server required in this static version. Edits made on one browser apply to that device.

---

## 8. Post-Deployment Verification Checklist

After uploading:

1. **Homepage:** Open `https://yourdomain.com/`
   - Verify that the circular logo, title "Somi Rai", and services load properly.
   - Confirm there is NO "Admin Portal" button in the header, footer, or body.
2. **Contact Flow:**
   - Click "Contact With Somi" or "Get Started".
   - Fill in Customer Details (Name, Phone, Address).
   - Click "Next", select a service (e.g. Source Transfer or Create New Payout).
   - Proceed through Payment/Free flow to the Thank You screen.
   - Click "Send Form via WhatsApp" and verify it opens WhatsApp to `+91 6381061760` with the formatted message.
3. **PDF Courses:** Click "PDF Course" in the header to view available course blueprints.
4. **Social Links:** Verify YouTube (`@williamskiratrai5507`) and Facebook page links open correctly.
5. **Mobile Responsiveness:** Open the website on your smartphone; check the hamburger drawer menu and tap buttons.
