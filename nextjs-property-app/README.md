# YourHome - Property Listings Platform

A modern, fully responsive property listing web application where users can browse, search, and explore real estate properties. Built with Next.js, React, and TypeScript for optimal performance and user experience.

## ✨ Features

- 🏠 Browse property listings with beautiful card layouts
- 🔍 Advanced search and filtering (location, category, price range)
- 📱 Fully responsive design (mobile, tablet, desktop)
- 📝 Detailed property pages with images, amenities, and location maps
- 📧 Newsletter subscription and feedback system
- ⚡ Fast page loads with automatic code splitting
- 🎨 Modern, clean UI with smooth animations

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + Global CSS
- **Icons**: Font Awesome 6.5.1
- **Fonts**: Google Fonts (League Spartan)
- **Image Optimization**: Next.js Image component

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   ├── listings/
│   │   ├── page.tsx            # All properties with filters
│   │   └── listings.module.css
│   ├── property/
│   │   └── [id]/
│   │       ├── page.tsx        # Property details page
│   │       └── property.module.css
│   └── payment/
│       ├── page.tsx            # Payment form
│       └── payment.module.css
├── components/                 # Reusable components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── PropertyCard.tsx
│   ├── FeaturedProperties.tsx
│   ├── Services.tsx
│   ├── Contact.tsx
│   ├── Newsletter.tsx
│   ├── Footer.tsx
│   └── BackToTop.tsx
├── data/
│   └── properties.ts           # Property data
├── public/
│   └── images/                 # Static assets
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>

```

2. **Install dependencies**
```bash
npm install
```



3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🌐 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, about, featured properties, services |
| `/listings` | All properties with search and filtering |
| `/property/[id]` | Individual property details with map |
| `/payment` | Payment form |

## 📱 Responsive Design

Optimized for all screen sizes:
- Mobile: 320px - 480px
- Tablet: 768px - 991px
- Desktop: 992px+

## 🚢 Deployment

### Build for Production

```bash
npm run build
```


### Other Platforms

The app can be deployed to:
- Netlify
- AWS Amplify
- Digital Ocean
- Any Node.js hosting

## 🎨 Customization

### Update Property Data

Edit `data/properties.ts` to add or modify properties:

```typescript
export const propertyList: Property[] = [
  {
    id: '1',
    propertyImage: '/images/property-1.jpg',
    propertyName: 'Property Name',
    price: '50000',
    location: 'Location',
    // ... more fields
  }
]
```

### Modify Styles

- Global styles: `app/globals.css`
- Component styles: `components/*.module.css`
- CSS variables: Defined in `app/globals.css` `:root`

### Change Colors

Update CSS variables in `app/globals.css`:

```css
:root {
  --green-pigment: hsl(290, 67%, 27%);  /* Primary color */
  --oxford-blue: hsl(224, 34%, 13%);    /* Text color */
  /* ... more variables */
}
```

## 📄 License

This project is for educational purposes.

---

**Built with Next.js, React, and TypeScript**
