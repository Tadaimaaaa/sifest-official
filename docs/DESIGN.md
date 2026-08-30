# DESIGN DIRECTION

## Visual Concept
**Y2K / Classic Futuristic Dreamy Sky**

## Design Direction
**Nostalgic Utopia in the Sky**

## Visual Characteristics
- dreamy sky
- cloud
- glass
- chrome
- glossy
- sparkle
- bubble
- futuristic shapes
- soft gradient
- subtle glow

## Color Direction
- Primary Sky: `#4CA1FF`
- Secondary / Brand Blue: `#1856C9`
- Accent / Y2K Yellow: `#F5B716`
- Base Background: `#0A192F`
- Glass Backgrounds: 
  - Light: `rgba(255, 255, 255, 0.25)`
  - Medium: `rgba(255, 255, 255, 0.15)`
  - Strong: `rgba(255, 255, 255, 0.08)`
- Glass Border: `rgba(255, 255, 255, 0.4)`

## Typography
- **Heading**: **Fredoka** (Font ini dipilih menggantikan Outfit karena Fredoka memiliki karakter bubbly, bulat, tebal, dan sangat playful, yang secara langsung merepresentasikan estetika Y2K yang organik dan youthful sesuai source of truth).
- **Body**: **Plus Jakarta Sans** (Dipertahankan untuk readability optimal).

## Radius System
- Card: `2rem (32px)` - Membuat UI terasa organik (bubble-like)
- Pill/Button: `9999px`

## Animation
Prinsip: **Less but Better**
Prioritaskan CSS animation (float, pulse-glow) dan hindari interaksi JavaScript berat.
Sistem terbagi menjadi Micro (150ms), Standard (300ms), dan Ambient (3-10s infinite).
Mendukung penuh `prefers-reduced-motion`.
