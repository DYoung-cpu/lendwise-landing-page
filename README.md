# LendWise Mobile Site

Apple-inspired mobile-first website for LendWise Mortgage Corporation.

## Quick Start

1. **Serve the files locally:**
   ```bash
   cd lendwise-mobile
   python3 -m http.server 8000
   ```
   Or with Node.js:
   ```bash
   npx http-server -p 8000
   ```

2. **Open in browser:** http://localhost:8000

## Project Structure

```
lendwise-mobile/
├── index.html              # Main entry point
├── css/
│   ├── apple-base.css      # Apple-inspired design tokens
│   ├── components.css      # Reusable UI components
│   ├── sections.css        # Section-specific styles
│   └── mobile.css          # Mobile-specific overrides
├── js/
│   ├── intro-animation.js  # Three.js owl shader animation
│   ├── navigation.js       # Tab bar and smooth scroll
│   ├── scroll-effects.js   # Scroll reveal animations
│   └── main.js             # App initialization
└── assets/
    ├── videos/wisr-owl.mp4 # Owl animation video
    ├── images/             # Team photos, product images
    └── icons/              # Favicon and icons
```

## Sections

1. **Intro Animation** - 3-second owl shader with gold/green ripples
2. **Our Story** - Company history and milestones
3. **Odin AI** - AI platform showcase
4. **The Team** - Leadership and team members
5. **Achievements** - Licenses and credentials
6. **Commitment** - Values and quality standards
7. **Loan Programs** - 9 product offerings
8. **Questions?** - FAQ accordion
9. **Apply Now** - CTA to application

## Features

- Mobile-first responsive design
- Apple-style typography and spacing
- Sticky header with blur effect
- Bottom tab bar navigation (mobile)
- Scroll reveal animations
- Three.js shader intro animation
- Accessible and performant

## Browser Support

- Chrome 88+
- Firefox 84+
- Safari 14+
- Edge 88+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## License

© 2025 LendWise Mortgage Corporation. All rights reserved.
