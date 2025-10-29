# Next.js E-Commerce Application

A comprehensive e-commerce web application demonstrating different Next.js rendering strategies.

**Author:** Jan Adnan Farooq
**Date:** 29th October 2025

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or download the repository:
```bash
cd ttcore
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📁 Project Structure

```
.
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── products/             # Product API endpoints
│   ├── admin/                    # Admin panel (CSR)
│   ├── dashboard/                 # Inventory dashboard (SSR)
│   ├── products/[slug]/          # Product detail pages (ISR)
│   ├── recommendations/          # Recommendations (Server Components)
│   ├── components/               # React components
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page (SSG)
│   └── globals.css               # Global styles
├── lib/                          # Utility functions
│   ├── db.ts                     # Database operations
│   ├── types.ts                  # TypeScript interfaces
│   ├── utils.ts                  # Helper functions
│   └── get-stats.ts              # Statistics calculator
├── data/                         # Data storage
│   └── products.json             # Product database
└── package.json                  # Dependencies

```

## 🎯 Rendering Strategies Explained

### 1. Static Site Generation (SSG) - Home Page (`/`)

**Location:** `app/page.tsx`

**Strategy:** The home page is pre-rendered at **build time**. This means all products are fetched and the HTML is generated once when you run `npm run build`.

**Why:** 
- Fastest loading times since HTML is pre-generated
- Perfect for content that doesn't change frequently
- Excellent for SEO
- Reduces server load

**Implementation:** Next.js automatically detects static pages and pre-renders them during the build process.

---

### 2. Incremental Static Regeneration (ISR) - Product Details (`/products/[slug]`)

**Location:** `app/products/[slug]/page.tsx`

**Strategy:** Product pages are statically generated at build time, but automatically regenerate every **60 seconds** when accessed. This combines the speed of static pages with the freshness of dynamic content.

**Why:**
- Provides static performance for the first user
- Subsequent users get updated content periodically
- Perfect for pricing, inventory levels, or product details that change occasionally
- Best of both worlds: speed + freshness

**Implementation:** 
```typescript
export const revalidate = 60; // Regenerate every 60 seconds
```

---

### 3. Server-Side Rendering (SSR) - Dashboard (`/dashboard`)

**Location:** `app/dashboard/page.tsx`

**Strategy:** The dashboard fetches fresh data on **every request** to the server. This ensures you always see the latest inventory statistics.

**Why:**
- Real-time data is guaranteed
- Perfect for dashboards, analytics, or sensitive data
- Always up-to-date information
- Can be slower than static pages

**Implementation:** By default in Next.js App Router, pages without special configuration render on each request.

---

### 4. Client-Side Rendering (CSR) - Admin Panel (`/admin`)

**Location:** `app/admin/page.tsx`

**Strategy:** The admin panel is rendered entirely in the browser using React. Data is fetched after page load using `useEffect` and `fetch`.

**Why:**
- Highly interactive without page reloads
- Perfect for forms and interactive interfaces
- Fast perceived performance after initial load
- Reduces server load

**Implementation:** Uses `'use client'` directive and React hooks (`useState`, `useEffect`) for data fetching.

---

### 5. React Server Components - Recommendations (`/recommendations`)

**Location:** `app/recommendations/page.tsx`

**Strategy:** This page uses Server Components by default, fetching data on the server, while mixing in Client Components for interactivity (like the "Add to Wishlist" button).

**Why:**
- Combines server-side data fetching with client-side interactivity
- Optimal performance: data fetched on server, only interactive parts on client
- Demonstrates hybrid approach
- Modern Next.js App Router pattern

**Implementation:** 
- Server Component fetches and renders the product list
- Client Component (`AddToWishlist`) handles user interactions

---

## 🔌 API Endpoints

All API routes are located in `app/api/products/`:

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/api/products` | GET | Fetch all products | No |
| `/api/products` | POST | Create new product | Yes |
| `/api/products/[slug]` | GET | Fetch single product | No |
| `/api/products/[id]/update` | PUT | Update product | Yes |

### Authentication

Protected endpoints (POST/PUT) require an API key in the request header:

```
x-api-key: admin-secret-key-123
```

## 🗄️ Data Model

Products are stored in `data/products.json` with the following structure:

```typescript
{
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  lastUpdated: string; // ISO datetime
}
```

## 🛠️ Development Notes

### API Key Configuration

For production use, set the API key via environment variable:

1. Create `.env.local`:
```
ADMIN_API_KEY=your-secure-key-here
```

2. Update `lib/db.ts` to read from environment:
```typescript
export function validateApiKey(apiKey: string | null): boolean {
  const validKey = process.env.ADMIN_API_KEY || 'admin-secret-key-123';
  return apiKey === validKey;
}
```

### Adding New Products

Use the Admin panel at `/admin` to:
- Add new products
- Edit existing products
- Update inventory levels

### Database Options

The project currently uses `data/products.json` for simplicity. To use MongoDB:

1. Install dependencies:
```bash
npm install mongodb
```

2. Update `lib/db.ts` to connect to MongoDB
3. Replace file operations with database queries

## 📸 Pages Overview

1. **Home** (`/`) - Browse all products
2. **Product Details** (`/products/[slug]`) - View individual product
3. **Dashboard** (`/dashboard`) - Real-time inventory statistics
4. **Admin** (`/admin`) - Manage product inventory
5. **Recommendations** (`/recommendations`) - Browse recommended products

## 🔧 Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI library
- **CSS** - Styling (no external CSS framework)

## 📊 Performance Considerations

- **SSG pages**: Cached and served from CDN
- **ISR pages**: Regenerated periodically without rebuild
- **SSR pages**: Fresh data on every request
- **CSR pages**: Fast client-side updates

## 🎓 Learning Outcomes

This project demonstrates:
1. Different Next.js rendering strategies and when to use each
2. API route creation and protection
3. Data fetching patterns (server vs client)
4. React Server and Client Components
5. File-based database operations
6. Form handling and user interactions

## 📝 Future Enhancements

- Add user authentication
- Implement search functionality
- Add shopping cart
- Deploy to Vercel or similar platform
- Add unit tests for API endpoints
- Implement on-demand revalidation for ISR
- Add pagination for product lists
- Implement real-time updates using WebSockets

## 🤝 Contributing

This is an educational project. Feel free to fork and experiment!

## 📄 License

MIT License - feel free to use this project for learning purposes.

---

**Built with ❤️ using Next.js**
