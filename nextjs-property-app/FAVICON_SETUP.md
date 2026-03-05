# Favicon Setup Instructions

The favicon has been configured to use the YourHome logo.

## What's Already Done

The `app/layout.tsx` file has been updated with favicon configuration:

```typescript
export const metadata: Metadata = {
  title: 'YourHome - Property Listings',
  description: 'Discover your dream home hassle-free on our real estate platform',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
}
```

## What You Need to Do

1. **Copy the logo to the public folder**:
   ```bash
   # Make sure logo.png is in public/images/
   cp ../assets/images/logo.png public/images/
   ```

2. **Optional: Create optimized favicon sizes**:
   
   For better browser support, you can create multiple sizes:
   
   - `public/favicon.ico` (16x16, 32x32, 48x48)
   - `public/favicon-16x16.png`
   - `public/favicon-32x32.png`
   - `public/apple-touch-icon.png` (180x180)
   - `public/android-chrome-192x192.png`
   - `public/android-chrome-512x512.png`

   You can use online tools like:
   - https://realfavicongenerator.net/
   - https://favicon.io/

3. **If you create optimized favicons**, update `app/layout.tsx`:

   ```typescript
   export const metadata: Metadata = {
     title: 'YourHome - Property Listings',
     description: 'Discover your dream home hassle-free on our real estate platform',
     icons: {
       icon: [
         { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
         { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
       ],
       shortcut: '/favicon.ico',
       apple: '/apple-touch-icon.png',
     },
   }
   ```

## Current Setup

The current setup uses the logo.png directly as the favicon. This will work, but the logo might not be optimized for small favicon sizes (16x16, 32x32).

## Testing

After setup, test the favicon by:
1. Running `npm run dev`
2. Opening http://localhost:3000
3. Checking the browser tab for the favicon
4. Testing on mobile devices (add to home screen)

## Notes

- Next.js automatically handles favicon caching
- The favicon will appear in browser tabs, bookmarks, and when users save the site to their home screen
- For production, consider creating a simplified version of your logo for better visibility at small sizes
