# LendWise Landing Page - Project Memory

## Project Information
- **Project Name**: Lendwise Landing Page
- **Location**: `/mnt/c/Users/dyoun/lendwise-mobile/`
- **GitHub Repo**: `lendwise-landing-page` (to be created under DYoung-cpu)
- **Owner**: David Young (DYoung-cpu)
- **Email**: dyoung9751@gmail.com

## Design System
- **Style**: Apple.com-inspired design language
- **Approach**: Mobile-first with desktop styles
- **Theme**: Light mode only

## Key Features
- Three.js WebGL shader intro animation (gold/green ripple effect)
- Owl video animation (Odin mascot)
- Apple-style navigation with backdrop blur
- Scroll reveal animations (Intersection Observer)
- Bottom tab bar navigation on mobile

## Important URLs
- **Apply Now**: `https://lendwisemtg.mymortgage-online.com/borrower-app/registration/?workFlowId=223023&action=login&dest=/loan-app/&siteId=1956469515`

## Sections
1. Our Story - Company history, mission, vision
2. Odin AI - AI platform showcase (Odin = owl mascot + AI)
3. The Team - Leadership photos and bios
4. Loan Programs - 9 programs (Conventional, Jumbo, FHA, VA, DSCR, Bank Statements, Fix and Flip, First Time Homebuyer, HELOCs)
5. Questions? - FAQ section
6. Apply Now - CTA section

## File Structure
```
/lendwise-mobile/
├── index.html              # Mobile version (main entry)
├── desktop.html            # Desktop version
├── css/
│   ├── apple-base.css      # Design tokens and base styles
│   ├── apple-desktop.css   # Desktop-specific styles
│   ├── components.css      # Reusable components
│   ├── sections.css        # Section styles
│   └── mobile.css          # Mobile overrides
├── js/
│   ├── intro-animation.js  # Three.js shader (embedded in HTML)
│   ├── navigation.js       # Tab/section navigation
│   ├── scroll-effects.js   # Scroll animations
│   └── main.js             # App initialization
└── assets/
    ├── videos/wisr-owl.mp4 # Owl animation
    └── images/team/        # Team photos
```

## Critical Code Notes
- Three.js shader is embedded directly in index.html/desktop.html (not separate JS file)
- Intro animation uses z-index layering: shader canvas behind, owl video in front
- `.intro-center` must have `z-index: 10` to appear above shader

## Other LendWise Projects (for reference)
- `lendwise-landing` (GitHub) = Lendwise Directory (to be renamed)
- `LendWiseLanding` = Just a local directory containing timeline
- `/mnt/c/Users/dyoun/OneDrive/Projects/LendwiseTimeLine/` = Original timeline project with assets

## Company Info
- **Company**: LendWise Mortgage Corporation
- **NMLS**: #2581507
- **Address**: 21800 Oxnard Street, Woodland Hills, CA 91367
