# Quick Start Guide

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Build for Production

```bash
npm run build
npm start
```

## Pages Overview

| Route | Rendering Strategy | Description |
|-------|-------------------|-------------|
| `/` | SSG | Home page - Static Site Generation |
| `/products/[slug]` | ISR | Product details - Incremental Static Regeneration (60s) |
| `/dashboard` | SSR | Inventory dashboard - Server-Side Rendering |
| `/admin` | CSR | Admin panel - Client-Side Rendering |
| `/recommendations` | RSC | Recommendations - React Server Components |

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/[slug]` - Get single product
- `POST /api/products` - Create product (requires `x-api-key` header)
- `PUT /api/products/[id]/update` - Update product (requires `x-api-key` header)

## API Key

Default API key: `admin-secret-key-123`

Set in `.env.local`:
```
ADMIN_API_KEY=your-secure-key
```

## Testing the App

1. Visit `/` - Browse products (SSG)
2. Click a product - View details (ISR)
3. Visit `/dashboard` - See real-time stats (SSR)
4. Visit `/admin` - Add/edit products (CSR)
5. Visit `/recommendations` - See recommendations with wishlist (RSC)

## Learn More

See `README.md` for detailed documentation and `PROJECT_REPORT.md` for project analysis.





