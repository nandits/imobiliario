# Tech Stack

## Summary

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | **Astro** | Best-in-class for content-heavy sites. Ships zero JS by default. Fast, simple, and perfect for static sites. |
| **Language** | **TypeScript** | Type safety for property data, form inputs, and component props. |
| **Styling** | **Tailwind CSS** | Rapidly build clean, responsive layouts. Perfect for "clean simple design." |
| **UI Components** | Custom minimal components | No heavy UI frameworks. Build only what is needed. |
| **Data** | **JSON files** | No database, no server, no cost. Edit files, commit, deploy. |
| **Images** | Filesystem (`/public`) | Fast local delivery with zero external dependencies. |
| **Forms** | Server actions (Astro) or simple fetch to JSON editor | Atomic, type-safe mutations without API routes. |
| **Authentication** | **OAuth** | Secure, standard auth. Uses a provider like Google or GitHub so the agent logs in with an existing account. |
| **Hosting** | Self-hosted (generic) | Deploy the built static assets to any standard web server or shared host. |
| **CI/CD** | Generic (Git hooks or CI pipeline) | Build on push, sync artifacts to host. |
| **Linting / Formatting** | ESLint + Prettier | Standard DX tooling. |

---

## Framework: Astro

- **Zero JS by default**: Perfect for a content-forward site. Fastest performance.
- **Island Architecture**: Hydrate only interactive parts (admin forms, mobile menu).
- **File-based routing**: Intuitive page structure.
- **Content Collections**: Type-safe access to JSON data at build time.
- **Integrations**: First-class Tailwind, Sitemap, Image optimization.

---

## Styling: Tailwind CSS

- Utility-first CSS with a single config file.
- Enforces consistency through design tokens (spacing, colors, typography).
- No need for custom CSS organization; style lives in components.
- Great for rapid prototyping and clean aesthetics.

### Design Tokens (Example)

```js
tailwind.config.mjs
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1a1a2e',
        accent: '#e94560',
        light: '#f5f5f5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
}
```

---

## Data Layer: JSON Files

### Where data lives

```
src/data/
├── properties.json   # Array of property objects
└── agent.json        # Single agent profile object
```

### Example: `properties.json`

```json
[
  {
    "id": "prop-001",
    "title": "Modern Family Home in Palermo",
    "description": "Spacious 3-bedroom house with a large garden, modern kitchen, and natural light throughout.",
    "price": "USD 450,000",
    "location": "Palermo, Buenos Aires",
    "features": ["3 Bedrooms", "2 Bathrooms", "250 m²", "Garden", "Garage"],
    "images": ["/images/properties/prop-001/1.jpg", "/images/properties/prop-001/2.jpg"],
    "status": "active",
    "slug": "modern-family-home-palermo",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z",
    "publishedAt": "2024-01-15T10:00:00.000Z"
  }
]
```

### Example: `agent.json`

```json
{
  "id": "agent-001",
  "name": "María García",
  "email": "maria@inmobiliaria.com",
  "phone": "+54 11 1234-5678",
  "whatsapp": "5491112345678",
  "avatar": "/images/agent/maria.jpg",
  "bio": "Real estate agent with 10+ years of experience in Buenos Aires.",
  "website": "https://mariagarcia.com"
}
```

### How updates work

1. Agent fills a form in `/admin`.
2. Form reads `properties.json`, appends/modifies the array.
3. Agent uploads images via a simple HTML input (stored in `/public/images/properties/`).
4. Agent saves → JSON file is written to disk.
5. Agent commits changes.
6. CI/CD detects push → rebuilds → new content is live.

---

## Image Strategy

### Local files in `/public`

```
public/images/
├── agent/
│   └── maria.jpg
└── properties/
    ├── prop-001/
    │   ├── 1.jpg
    │   ├── 2.jpg
    │   └── 3.jpg
    └── prop-002/
        ├── 1.jpg
        └── 2.jpg
```

**Pros**
- Zero configuration
- Works on any host
- Instant dev reloads

**Cons**
- Large images increase repo size
- No automatic optimization (WebP, resizing)

---

## Authentication: OAuth

Because there is only one agent, we use a lightweight OAuth flow rather than building a custom auth system.

### How it works

1. Agent visits `/admin/login`.
2. Redirected to an OAuth provider (Google, GitHub, etc.).
3. Provider authenticates and redirects back with an auth token.
4. Admin checks the token against a pre-configured allowed identity.
5. If valid, a session cookie is set and the agent gains access to `/admin`.

### Why OAuth?

- Secure and battle-tested.
- No passwords to store or manage.
- The agent uses an existing account they already trust.
- Easy to lock down to a single approved identity.

---

## SEO & Meta

Astro provides built-in SEO via `@astrojs/sitemap` and manual `<Meta />` tags:

- Open Graph tags per property
- Canonical URLs
- Sitemap generation at build time
- Structured data (JSON-LD) for real estate listings

---

## Cost

| Item | Cost |
|---|---|
| Framework | Free (Open Source) |
| Hosting | Depends on chosen self-hosted provider |
| Images | Free (local filesystem) |
| Domain | ~$10–15/yr |
| **Total** | **~$10–15/yr + hosting** |
