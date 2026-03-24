# Product Management Dashboard

## Overview

A frontend assessment application built with React + TypeScript, demonstrating product management features against the DummyJSON public API.

---

## Tech Stack

- React 19 + TypeScript
- Redux Toolkit + RTK Query (state management & data fetching)
- Ant Design (UI components)
- Tailwind CSS + SCSS (styling — two approaches as required)
- Vite (build tool)

---

## Features

### Task 1 — Product List (`/products`)

- Ant Design Table with server-side pagination (skip/limit)
- Data fetched from `/products` via RTK Query
- Search via `/products/search?q=keyword` — auto-triggers after 3 characters with 400ms debounce, also fires on Enter
- Category filter dropdown — fetched from `/products/categories`, filters by category slug
- Table columns: Image, Title, Brand, Price, Rating, Stock, Category, Actions
- Actions column: Edit button (opens drawer) + View button (navigates to `/products/:id`)
- Skeleton loader (`TableSkeleton`) shown on initial load, search, filter, and page changes
- Edit drawer uses reusable `EditProductForm` component with full validation

### Task 2 — Product Details (`/products/:id`)

- Dynamic routing via React Router `/products/:id`
- Product images displayed in an Ant Design `Carousel` (autoplay + arrows)
- Displays: title, description, price (with discount), rating (star component), stock, brand, category
- Edit button opens a right-side Drawer with `EditProductForm` pre-filled with existing product data including images
- Loading state: `ProductDetailSkeleton` component matching the page layout
- Error state: Ant Design `Alert` with back navigation button

### Form Validation (`EditProductForm`)

- Title: required, no whitespace, min 3 / max 100 chars, must contain letters
- Brand: required, no whitespace, min 2 / max 50 chars
- Category: required select
- Description: required, min 20 / max 500 chars
- Price: required, valid number, $0.01–$99,999
- Stock: required, whole integer, 0–10,000
- Discount: optional, 0–90%, max 2 decimal places
- Images: file type (images only) and 5MB size limit enforced in `beforeUpload`
- `scrollToFirstError` enabled — jumps to first invalid field on submit

---

## Project Structure

```
src/
├── components/
│   ├── Layout/             # Header, Footer, MainLayout
│   ├── EditProductForm.tsx # Reusable edit form with validation
│   ├── ProductInfo.tsx     # Product detail right-panel component
│   ├── PageBreadcrumb.tsx  # Breadcrumb used across all pages
│   ├── TableSkeleton.tsx   # Skeleton for product table
│   └── ProductDetailSkeleton.tsx
├── pages/
│   ├── ProductsPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── AddProductPage.tsx
│   └── NotFoundPage.tsx
├── store/
│   ├── api/productsApi.ts  # RTK Query API slice
│   ├── slices/             # Redux slices
│   └── index.ts
├── hooks/
│   └── useProducts.ts      # Custom hooks wrapping RTK Query
├── utils/
│   └── formatters.ts       # Price, stock, category formatters
└── styles/
    ├── main.scss
    ├── _variables.scss     # CSS custom properties
    ├── _antd-overrides.scss
    ├── _components.scss
    ├── _layout.scss
    └── _utilities.scss
```

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/product-dashboard.git
cd product-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment setup

```bash
cp example.env .env
```

The `.env` file requires:

```
VITE_API_URL=https://dummyjson.com/
```

### 4. Run the development server

```bash
npm run dev
```

Open `http://localhost:5173`

---

## API Endpoints Used

| Endpoint | Usage |
|---|---|
| `GET /products` | Product list with pagination |
| `GET /products/search?q=keyword` | Search products |
| `GET /products/:id` | Product detail |
| `GET /products/categories` | Category dropdown |
| `GET /products/category/:slug` | Filter by category |

---

## Engineering Notes

- All API calls abstracted behind custom hooks — pages never call RTK Query directly
- Categories API returns `{slug, name, url}` objects — handled correctly throughout (not assumed to be strings)
- `EditProductForm` is a shared component used in both the product list page and the detail page
- No data persistence — frontend only as per spec
- Reusable skeleton components match actual page layouts for a smooth loading experience
