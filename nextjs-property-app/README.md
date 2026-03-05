# YourHome - Property Listings Web App (Next.js)

A modern, fully responsive property listing web application built with Next.js, React, and TypeScript. This is a complete conversion of the original vanilla JavaScript project to a modern React/Next.js stack with enhanced mobile responsiveness and improved user experience.

## ✨ Features

- 🏠 **Property Listings** - Browse all available properties with beautiful card layouts
- 🔍 **Advanced Filtering** - Search by location, category, and price range
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop (320px - 1920px+)
- ⚡ **Fast Performance** - Next.js optimization with automatic code splitting
- 🎨 **Modern UI** - Clean design with CSS Modules and smooth animations
- 📝 **Property Details** - Detailed property pages with images, amenities, and maps
- 💳 **Payment Form** - Integrated payment processing interface
- 📧 **Feedback Form** - Newsletter subscription and user feedback
- 🔙 **Back to Top** - Smooth scroll-to-top functionality
- 🎯 **Dynamic Routing** - SEO-friendly URLs for each property

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + Global CSS
- **Icons**: Font Awesome 6.5.1
- **Fonts**: Google Fonts (League Spartan)
- **Image Optimization**: Next.js Image component
- **State Management**: React Hooks (useState, useEffect)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to the project directory:**
```bash
cd nextjs-property-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Copy images from the original project:**

   **On Mac/Linux:**
   ```bash
   chmod +x setup-images.sh
   ./setup-images.sh
   ```

   **On Windows:**
   ```bash
   setup-images.bat
   ```

   **Or manually:**
   ```bash
   # Create the images directory
   mkdir -p public/images

   # Copy images from the original project
   cp -r ../assets/images/* public/images/
   cp ../assets/css/lgg.png public/images/
   cp ../assets/css/bgg.png public/images/
   ```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
nextjs-property-app/
├── app/
│   ├── layout.tsx              # Root layout with metadata & fonts
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles & CSS variables
│   ├── listings/
│   │   ├── page.tsx            # Listings page with filtering
│   │   └── listings.module.css
│   ├── property/
│   │   └── [id]/
│   │       ├── page.tsx        # Dynamic property details
│   │       └── property.module.css
│   └── payment/
│       ├── page.tsx            # Payment form
│       └── payment.module.css
├── components/                 # Reusable React components
│   ├── Header.tsx              # Navigation header
│   ├── Header.module.css
│   ├── Hero.tsx                # Hero section
│   ├── Hero.module.css
│   ├── About.tsx               # About section
│   ├── About.module.css
│   ├── PropertyCard.tsx        # Property card component
│   ├── PropertyCard.module.css
│   ├── FeaturedProperties.tsx  # Featured properties section
│   ├── FeaturedProperties.module.css
│   ├── Services.tsx            # Services section
│   ├── Services.module.css
│   ├── Contact.tsx             # Contact section
│   ├── Contact.module.css
│   ├── Newsletter.tsx          # Feedback/Newsletter form
│   ├── Newsletter.module.css
│   ├── Footer.tsx              # Footer with links
│   ├── Footer.module.css
│   ├── BackToTop.tsx           # Scroll to top button
│   └── BackToTop.module.css
├── data/
│   └── properties.ts           # Property data with TypeScript types
├── public/
│   └── images/                 # Static images (logo, properties, etc.)
├── package.json
├── tsconfig.json
├── next.config.js
├── README.md
├── MIGRATION_GUIDE.md          # Detailed migration documentation
├── PROJECT_SUMMARY.md          # Complete project overview
└── FAVICON_SETUP.md            # Favicon configuration guide
```

## 📱 Responsive Breakpoints

The application is fully responsive with optimized layouts for:

- **Mobile**: 320px - 480px
- **Large Mobile**: 481px - 767px
- **Tablet**: 768px - 991px
- **Desktop**: 992px - 1199px
- **Large Desktop**: 1200px+

## 🎯 Key Improvements from Original

### Architecture
- **Original**: Vanilla JavaScript with manual DOM manipulation
- **New**: React components with declarative UI and hooks

### Routing
- **Original**: Multiple HTML files with relative paths
- **New**: Next.js App Router with dynamic routes and client-side navigation

### State Management
- **Original**: Direct DOM updates with querySelector
- **New**: React hooks (useState, useEffect) for reactive updates

### Styling
- **Original**: Single global CSS file with potential naming conflicts
- **New**: CSS Modules for component-scoped styles + global variables

### Data Management
- **Original**: Plain JavaScript objects
- **New**: TypeScript interfaces with full type safety

### Performance
- **Original**: No optimization
- **New**: Automatic code splitting, image optimization, lazy loading

### Mobile Experience
- **Original**: Basic responsive design
- **New**: Fully optimized mobile-first responsive design

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server (http://localhost:3000)

# Production
npm run build        # Build optimized production bundle
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint for code quality checks
```

## 🌐 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, about, featured properties, services, contact |
| `/listings` | All properties with advanced filtering options |
| `/property/[id]` | Individual property details with images, amenities, and map |
| `/payment` | Payment form for property transactions |

## 🎨 Design Features

- **Color Scheme**: Purple/magenta primary (hsl(290, 67%, 27%))
- **Typography**: League Spartan font family
- **Layout**: CSS Grid and Flexbox
- **Animations**: Smooth transitions and hover effects
- **Icons**: Font Awesome 6.5.1
- **Images**: Optimized with Next.js Image component

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deployment Platforms

**Recommended: Vercel** (Zero-config deployment for Next.js)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Other Options:**
- Netlify
- AWS Amplify
- Digital Ocean
- Any Node.js hosting platform

### Environment Variables

Create a `.env.local` file for environment-specific variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
```

## 📚 Documentation

- **MIGRATION_GUIDE.md** - Detailed explanation of the conversion process
- **PROJECT_SUMMARY.md** - Complete project overview and architecture
- **FAVICON_SETUP.md** - Instructions for favicon configuration

## 🔮 Future Enhancements

### Phase 1 (Authentication)
- [ ] User sign in/sign up pages
- [ ] JWT authentication
- [ ] Protected routes
- [ ] User profile management

### Phase 2 (Backend Integration)
- [ ] REST API or GraphQL integration
- [ ] Database (PostgreSQL/MongoDB)
- [ ] Property CRUD operations
- [ ] User favorites/saved properties

### Phase 3 (Advanced Features)
- [ ] Property comparison tool
- [ ] Advanced search with more filters
- [ ] Property recommendations
- [ ] Real-time chat with property owners
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Admin dashboard

### Phase 4 (Optimization)
- [ ] Server-side rendering (SSR) for SEO
- [ ] Static site generation (SSG) for property pages
- [ ] Progressive Web App (PWA)
- [ ] Analytics integration (Google Analytics)
- [ ] A/B testing
- [ ] Performance monitoring

## 🤝 Contributing

This is an educational project. Feel free to fork and modify for your own learning purposes.

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- Original vanilla JavaScript project
- Next.js team for the amazing framework
- Font Awesome for icons
- Google Fonts for typography

---

**Built with ❤️ using Next.js, React, and TypeScript**
