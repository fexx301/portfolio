# Cyberpunk Portfolio

A single-page personal portfolio built with **React**, **Three.js** (via React Three Fiber), **Tailwind CSS**, and **GSAP**.

Features a full-viewport fixed 3D background with floating abstract shapes, interactive particles, scroll-driven animations, and a cyberpunk/minimal aesthetic.

## Tech Stack

- **React 19** + **Vite**
- **Three.js** / **React Three Fiber** / **@react-three/drei** / **@react-three/postprocessing**
- **Tailwind CSS v4**
- **GSAP** + **ScrollTrigger**
- **Lenis** smooth scrolling
- **Lucide React** icons

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
  components/
    Scene3D.jsx           # Full-viewport 3D background canvas
    FloatingShapes.jsx    # Abstract 3D shapes
    Particles.jsx         # Interactive particle field
    Navbar.jsx
    Hero.jsx
    About.jsx
    Projects.jsx
    Skills.jsx
    Experience.jsx
    Contact.jsx
    Footer.jsx
    SocialIcons.jsx       # Custom SVG social icons
  data/
    data.js               # Personal info, projects, skills, experience
  hooks/
    useScrollAnimation.js # GSAP ScrollTrigger animations
  App.jsx
  index.css
```

## Customization

Edit `src/data/data.js` to update your name, bio, projects, skills, and experience.

## Deployment

### GitHub Pages

1. Update `vite.config.js` with your repository name:

```js
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/your-repo-name/',
})
```

2. Build and deploy the `dist` folder to the `gh-pages` branch, or use a GitHub Action.

### Vercel / Netlify

Connect your repository and use the default Vite build settings.

## Notes

- The contact form is currently static. Connect it to a backend or service like Formspree / EmailJS to handle submissions.
- The 3D scene is optimized for desktop; mobile performance is not the primary focus.
