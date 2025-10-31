```markdown
# Next.js E‑Commerce Catalog — README

A colorful, animated e‑commerce catalog demo built with Next.js (App Router), Tailwind CSS and a small admin panel secured with JWT HttpOnly cookies. The project focuses on a modern, responsive UI with information-first product cards (no product images required), a hero, recommendations, and an admin dashboard for creating and editing products.

This README explains the tech stack, quick setup, environment variables, available scripts, and how to use the admin features.

---

## Tech stack

- Next.js (App Router, Server & Client components)
- React (client components where needed)
- Tailwind CSS for styling + custom CSS variables for design tokens
- PostCSS / Autoprefixer
- JWT for admin authentication (HttpOnly cookie)
- Plain Fetch API for client ↔ server communication
- Optional: Framer Motion (not required) for advanced animations
- File-based data or simple in-memory/mock storage (replace with DB as needed)

---

## Quick start (local)

1. Clone the repo
   ```bash
   git clone <your-repo-url>
   cd <repo-directory>
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with these variables:
   ```
   ADMIN_PASSWORD=your_admin_password_here
   JWT_SECRET=some_long_random_secret_for_jwt_signing
   NODE_ENV=development
   ```

   - ADMIN_PASSWORD: password used to log in on `/admin-login`
   - JWT_SECRET: secret used to sign/verify tokens (keep private)

4. Start the dev server
   ```bash
   npm run dev
   ```

5. Open the site
   - http://localhost:3000 — Home
   - http://localhost:3000/admin-login — Admin login
   - After login you will be redirected to `/admin` (admin panel)

---

## Available scripts

- `npm run dev` — Start Next.js development server
- `npm run build` — Build for production
- `npm start` — Start production server (after `build`)
- `npm run lint` — Run linter (if configured)

(See package.json for exact scripts in this project.)

---

## Styling & assets

- Global styles and design tokens live in `app/globals.css`.
- Tailwind config: `tailwind.config.cjs`.
- Decorative assets expected in `public/`, for example:
  - `public/hero-headphone.png`
  - `public/footer-banner.jpg`
  - `public/placeholder.png`

If you don't have product images, the UI is intentionally image-less for product cards.

---

## Data model (example)

Product shape (TypeScript):
```ts
type Product = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  category?: string;
  inventory: number;
  lastUpdated: string; // ISO date
}
```

Replace the project’s simple storage with a database (MongoDB, PostgreSQL, etc.) for production.

---

## Deployment

- Build for production:
  ```bash
  npm run build
  ```
- Start production:
  ```bash
  npm start
  ```
- Recommended hosting: Vercel (seamless Next.js support), Netlify, or any Node.js host. Ensure environment variables are configured in the hosting dashboard.

---

```
```