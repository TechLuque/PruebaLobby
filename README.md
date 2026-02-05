# 🔐 Luque Academy - React App

Sistema de validación de acceso a salas Zoom con React, GSAP animaciones y diseño responsive.

## ✅ Características

- ⚛️ **React 19** con Hooks y React Router
- 🎨 **Responsivo** - Mobile first (480px, 768px, 1200px breakpoints)
- ✨ **Animaciones GSAP** - ScrollTrigger y timelines
- 🎯 **Control de Acceso** - localStorage integration
- 📱 **WhatsApp Integration** - Contacto directo
- 🚀 **Vite** - Build tool rápido
- 🌐 **TailwindCSS** - Utility-first CSS

## 🚀 Instalación y Desarrollo

### Requisitos
- Node.js 22.x
- npm 10.x

### Instalación
```bash
npm install
```

### Desarrollo (Hot Reload)
```bash
npm run dev
```
Abre http://localhost:5173 en tu navegador.

### Build para Producción
```bash
npm run build
```

### Preview de Build
```bash
npm run preview
```

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── Navbar.jsx          - Navegación principal
│   ├── HeroSection.jsx     - Sección hero con SVG y botones
│   └── AccessModal.jsx     - Modal de acceso denegado
├── views/
│   ├── Prueba.jsx          - Página inicial
│   └── Lobby.jsx           - Página de lobby
├── hooks/
│   └── useAccessControl.js - Hook para control de acceso
├── styles/
│   ├── HeroSection.css     - Estilos hero responsive
│   ├── Modal.css           - Estilos del modal
│   ├── Navbar.css          - Estilos navbar
│   ├── Prueba.css          - Estilos página prueba
│   └── Lobby.css           - Estilos página lobby
├── App.jsx                 - Componente raíz
├── main.jsx                - Entry point
└── index.css               - Estilos globales
```
  │       └── conf.js
  └── views/
      ├── login/
      ├── lobby/
      ├── codigo/
      ├── maquina/
      └── maestria/

.env.example               ← Plantilla
vercel.json               ← Config Vercel
package.json              ← Dependencias
```

## 📝 Notas

- Las variables de entorno se actualizan en Vercel Dashboard
- No requiere configuración local
- Todos los datos sensibles están protegidos

---

**Seguridad garantizada.** ✅
