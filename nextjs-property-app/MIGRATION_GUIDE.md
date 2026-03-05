# Migration Guide: Vanilla JS to Next.js/React

This document explains how the original vanilla JavaScript property listing app was converted to Next.js with React and TypeScript.

## Overview of Changes

### 1. Project Structure

**Before (Vanilla JS):**
```
project/
├── src/
│   ├── app/
│   │   ├── pages/          # Multiple HTML files
│   │   ├── js/             # Page-specific JS
│   │   ├── styles/         # CSS files
│   │   └── data/           # Property data
│   └── utils/              # Utility functions
├── assets/
│   ├── js/                 # Global scripts
│   ├── css/                # Images in CSS folder
│   └── images/             # Static images
```

**After (Next.js):**
```
nextjs-property-app/
├── app/
│   ├── layout.tsx          # Root layout (replaces HTML structure)
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── listings/           # Listings route
│   ├── property/[id]/      # Dynamic property route
│   └── payment/            # Payment route
├── components/             # Reusable React components
├── data/                   # TypeScript data with types
└── public/                 # Static assets
```

### 2. Routing

**Before:**
- Multiple HTML files (home_page.html, list_page.html, etc.)
- Manual navigation with `<a href="path/to/file.html">`

**After:**
- Next.js App Router with file-based routing
- `<Link>` component for client-side navigation
- Dynamic routes with `[id]` folder structure

### 3. Component Conversion

#### Example: Header Component

**Before (HTML + Vanilla JS):**
```html
<!-- In every HTML file -->
<header class="header" data-header>
  <div class="container">
    <a href="#" class="logo">
      <img src="../../../assets/images/logo.png" width="200px">
    </a>
    <nav class="navbar container" data-navbar>
      <ul class="navbar-list">
        <li><a href="#home">Home</a></li>
        <!-- ... -->
      </ul>
    </nav>
  </div>
</header>

<script>
  // In assets/js/script.js
  const navbar = document.querySelector("[data-navbar]");
  const navToggler = document.querySelector("[data-nav-toggler]");
  
  const toggleNav = function () {
    navbar.classList.toggle("active");
  }
  
  navToggler.addEventListener("click", toggleNav);
</script>
```

**After (React Component):**
```tsx
// components/Header.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className="container">
        <Link href="/">
          <Image src="/images/logo.png" alt="Logo" />
        </Link>
        <nav className={`${styles.navbar} ${isNavOpen ? styles.active : ''}`}>
          <ul>
            <li><Link href="/">Home</Link></li>
            {/* ... */}
          </ul>
        </nav>
        <button onClick={() => setIsNavOpen(!isNavOpen)}>
          Toggle
        </button>
      </div>
    </header>
  )
}
```

### 4. State Management

**Before (DOM Manipulation):**
```javascript
// src/utils/filter.js
const location = document.getElementById('locate')

location?.addEventListener('input', (e) => {
  const isFound = propertyList?.find(data => 
    data.location == e.target.value
  )?.location;
  
  if (isFound) {
    propertyList?.map(data => {
      if (data.location !== e.target.value) 
        removeElement(data.propertyImage)
    })
  }
})
```

**After (React State):**
```tsx
// app/listings/page.tsx
'use client'

import { useState } from 'react'

export default function ListingsPage() {
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: ''
  })
  
  const [filteredProperties, setFilteredProperties] = useState(propertyList)

  const handleSearch = () => {
    let filtered = propertyList.filter(p => 
      p.location.toLowerCase().includes(filters.location.toLowerCase())
    )
    setFilteredProperties(filtered)
  }

  return (
    <input 
      value={filters.location}
      onChange={(e) => setFilters({...filters, location: e.target.value})}
    />
  )
}
```

### 5. Data Management

**Before (JavaScript):**
```javascript
// src/app/data/property.js
export const propertyList = [
  {
    propertyImage: '../../../assets/images/property-1.jpg',
    propertyName: 'CMC, Addis Ababa, ETH',
    price: '5000',
    location: 'Bole'
  }
]
```

**After (TypeScript with Types):**
```typescript
// data/properties.ts
export interface Property {
  id: string
  propertyImage: string
  propertyName: string
  price: string
  location: string
  bedrooms?: number
  bathrooms?: number
}

export const propertyList: Property[] = [
  {
    id: '1',
    propertyImage: '/images/property-1.jpg',
    propertyName: 'CMC, Addis Ababa, ETH',
    price: '50000000',
    location: 'Bole',
    bedrooms: 3,
    bathrooms: 4
  }
]
```

### 6. Styling Approach

**Before:**
- Single global CSS file (style.css)
- Class names shared across all pages
- Risk of naming conflicts

**After:**
- CSS Modules for component-scoped styles
- Global styles in globals.css
- Type-safe class names

```tsx
// Component
import styles from './Header.module.css'

<header className={styles.header}>
  <nav className={styles.navbar}>
```

### 7. Image Handling

**Before:**
```html
<img src="../../../assets/images/property-1.jpg" alt="Property">
```

**After:**
```tsx
import Image from 'next/image'

<Image 
  src="/images/property-1.jpg" 
  alt="Property"
  width={400}
  height={300}
/>
```

Benefits:
- Automatic image optimization
- Lazy loading
- Responsive images
- Better performance

### 8. Dynamic Routing

**Before:**
- No dynamic property pages
- Would need separate HTML file for each property

**After:**
```
app/property/[id]/page.tsx
```

```tsx
export default function PropertyDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const property = propertyList.find(p => p.id === params.id)
  
  return <div>{property.propertyName}</div>
}
```

### 9. Form Handling

**Before:**
```javascript
// Vanilla JS event listeners
const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const name = document.getElementById('name').value
  // ...
})
```

**After:**
```tsx
'use client'

import { useState } from 'react'

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process form
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={formData.name}
        onChange={(e) => setFormData({
          ...formData, 
          name: e.target.value
        })}
      />
    </form>
  )
}
```

## Key Benefits of Migration

### 1. **Type Safety**
- TypeScript catches errors at compile time
- Better IDE autocomplete
- Safer refactoring

### 2. **Component Reusability**
- Header, Footer used across all pages
- PropertyCard component reused in multiple places
- Easier to maintain and update

### 3. **Better Performance**
- Automatic code splitting
- Image optimization
- Server-side rendering capabilities
- Faster page loads

### 4. **Developer Experience**
- Hot module replacement (instant updates)
- Better debugging tools
- Modern development workflow

### 5. **Scalability**
- Easy to add new pages/routes
- Component-based architecture
- Clear separation of concerns

### 6. **SEO Benefits**
- Server-side rendering support
- Better meta tag management
- Improved crawlability

## Migration Checklist

- [x] Convert HTML pages to React components
- [x] Set up Next.js routing structure
- [x] Convert vanilla JS to React hooks
- [x] Migrate CSS to CSS Modules
- [x] Add TypeScript types
- [x] Implement dynamic routing
- [x] Convert forms to controlled components
- [x] Optimize images with Next.js Image
- [x] Set up proper project structure
- [ ] Copy images to public folder
- [ ] Add authentication (future)
- [ ] Connect to backend API (future)

## Next Steps

1. **Copy Assets**: Move images from original project to `public/images/`
2. **Install Dependencies**: Run `npm install`
3. **Test**: Run `npm run dev` and test all pages
4. **Deploy**: Deploy to Vercel or your preferred platform
5. **Enhance**: Add new features like authentication, backend integration

## Common Patterns

### Client vs Server Components

```tsx
// Server Component (default)
export default function Page() {
  // Can fetch data on server
  return <div>Static content</div>
}

// Client Component (needs interactivity)
'use client'

export default function InteractivePage() {
  const [state, setState] = useState()
  // Can use hooks, event handlers
  return <button onClick={() => setState()}>Click</button>
}
```

### Data Fetching

```tsx
// Server Component
async function getData() {
  const res = await fetch('https://api.example.com/properties')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data}</div>
}
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [CSS Modules](https://github.com/css-modules/css-modules)
