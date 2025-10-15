# 🚀 Instrucciones de Instalación - Tailwind v3

## 📋 Requisitos Previos

Asegúrate de tener instalado:
- **Node.js** (versión 18 o superior)
- **npm** (viene con Node.js)

Verifica tu versión:
```bash
node --version   # Debe ser v18.x o superior
npm --version    # Debe ser 9.x o superior
```

---

## 🎯 Método 1: Instalación desde Cero (Recomendado)

### **Paso 1: Crea la carpeta del proyecto en tu PC**

```bash
# Windows
cd C:\Proyectos
mkdir delivery-local-v3
cd delivery-local-v3

# Mac/Linux
cd ~/Proyectos
mkdir delivery-local-v3
cd delivery-local-v3
```

---

### **Paso 2: Copia los archivos de configuración**

Copia TODOS los archivos de `/codigo-pc-2/` a tu nueva carpeta:

**Archivos que DEBES copiar:**
```
✅ tailwind.config.js
✅ postcss.config.js
✅ package.json
✅ vite.config.ts
✅ tsconfig.json
✅ tsconfig.node.json
✅ index.html
✅ src/main.tsx
✅ styles/globals.css
```

---

### **Paso 3: Copia los archivos de tu proyecto original**

Desde tu proyecto original, copia:

```
✅ /components/      (carpeta completa)
✅ /data/            (carpeta completa)
✅ App.tsx
✅ /public/          (si tienes imágenes u otros assets)
```

**Estructura final esperada:**
```
delivery-local-v3/
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── index.html
├── App.tsx                    ⬅️ Del proyecto original
├── src/
│   └── main.tsx
├── styles/
│   └── globals.css
├── components/                ⬅️ Del proyecto original
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── DealsAndTrendingFixed.tsx
│   ├── LocalBusinesses.tsx
│   ├── ProductComparison.tsx
│   ├── ... (todos los demás)
│   └── ui/
│       └── ... (componentes shadcn)
├── data/                      ⬅️ Del proyecto original
│   └── database.ts
└── public/                    ⬅️ Del proyecto original (opcional)
    └── vite.svg
```

---

### **Paso 4: Instala las dependencias**

```bash
npm install
```

**Esto instalará:**
- React y React DOM
- Tailwind CSS v3.4.1
- PostCSS y Autoprefixer
- Todas las librerías de Radix UI
- Lucide React (iconos)
- Y todas las demás dependencias

**Tiempo estimado:** 2-5 minutos dependiendo de tu conexión.

---

### **Paso 5: Ejecuta el proyecto**

```bash
npm run dev
```

**Deberías ver:**
```
  VITE v5.1.6  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Abre tu navegador en:** `http://localhost:5173/`

---

## 🎯 Método 2: Actualizar Proyecto Existente

Si ya tienes un proyecto funcionando con Tailwind v4:

### **Paso 1: Haz un respaldo**

```bash
# Windows
xcopy /E /I tu-proyecto delivery-local-backup

# Mac/Linux
cp -r tu-proyecto delivery-local-backup
```

---

### **Paso 2: Copia los nuevos archivos de configuración**

Desde `/codigo-pc-2/`, copia y **REEMPLAZA**:

```bash
✅ tailwind.config.js      (NUEVO)
✅ postcss.config.js        (NUEVO)
✅ package.json             (REEMPLAZAR)
✅ styles/globals.css       (REEMPLAZAR)
```

**NO copies:**
- `App.tsx` (usa el que ya tienes)
- `/components/` (usa los que ya tienes)
- `/data/` (usa los que ya tienes)

---

### **Paso 3: Limpia e instala dependencias**

```bash
# Elimina instalación anterior
rm -rf node_modules package-lock.json

# O en Windows:
rmdir /s /q node_modules
del package-lock.json

# Reinstala con las nuevas versiones
npm install
```

---

### **Paso 4: Verifica que funcione**

```bash
npm run dev
```

---

## ✅ Verificación de Instalación Correcta

### **Checklist de Verificación:**

1. ✅ **El servidor inicia sin errores**
   ```bash
   npm run dev
   # Debe mostrar: VITE ready in XXX ms
   ```

2. ✅ **Los estilos se aplican correctamente**
   - Abre `http://localhost:5173/`
   - Verifica que veas colores, espaciados y diseño correcto
   - No debe verse todo en blanco y negro o sin estilos

3. ✅ **Las rutas funcionan**
   - Haz clic en los botones del header
   - Verifica que el carrito se abra
   - Verifica que el mapa se abra

4. ✅ **Los componentes cargan sin errores**
   - Abre la consola del navegador (F12)
   - No debe haber errores en rojo

5. ✅ **El build funciona**
   ```bash
   npm run build
   # Debe crear carpeta /dist/ sin errores
   ```

---

## 🚨 Solución de Problemas

### **Error: "Cannot find module 'tailwindcss'"**

**Solución:**
```bash
npm install tailwindcss@3.4.1 autoprefixer postcss --save-dev
```

---

### **Error: "Module not found: Can't resolve './components/...'"**

**Causa:** No copiaste la carpeta `/components/`

**Solución:**
1. Copia la carpeta `/components/` completa de tu proyecto original
2. Asegúrate de que esté en la raíz del proyecto

---

### **Error: Los estilos no se aplican**

**Diagnóstico:**
```bash
# Verifica que estos archivos existan:
ls -la tailwind.config.js
ls -la postcss.config.js
ls -la styles/globals.css

# O en Windows:
dir tailwind.config.js
dir postcss.config.js
dir styles\globals.css
```

**Solución:**
1. Verifica que `styles/globals.css` tenga las primeras líneas:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. Verifica que `src/main.tsx` importe el CSS:
   ```tsx
   import '../styles/globals.css';
   ```

3. Reinicia el servidor:
   ```bash
   # Presiona Ctrl+C para detener
   # Luego vuelve a ejecutar:
   npm run dev
   ```

---

### **Error: "tailwind.config.js is invalid"**

**Solución:**

Verifica que `tailwind.config.js` tenga la estructura correcta:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './App.tsx',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ... configuración
    }
  },
  plugins: [require('tailwindcss-animate')],
};
```

---

### **Error: "Cannot find module 'tailwindcss-animate'"**

**Solución:**
```bash
npm install tailwindcss-animate --save-dev
```

---

## 📦 Scripts Disponibles

```bash
# Desarrollo (con hot reload)
npm run dev

# Compilar para producción
npm run build

# Vista previa del build de producción
npm run preview
```

---

## 🎨 Personalización

### **Cambiar colores del tema:**

Edita `styles/globals.css`:

```css
:root {
  --primary: 221 83% 53%;  /* Azul personalizado */
  --secondary: 210 40% 96%;  /* Gris claro */
  --accent: 12 76% 61%;      /* Naranja */
}
```

---

### **Agregar colores personalizados:**

Edita `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand': {
          DEFAULT: '#ff6b6b',
          light: '#ff8e8e',
          dark: '#ff4848',
        }
      }
    }
  }
}
```

Úsalo en tu código:
```tsx
<div className="bg-brand text-white">
  Mi color personalizado
</div>
```

---

## 🚀 Deploy a Producción

### **1. Compilar:**
```bash
npm run build
```

Esto crea la carpeta `/dist/` con tu app optimizada.

---

### **2. Deploy en Vercel (Recomendado):**

```bash
# Instala Vercel CLI
npm install -g vercel

# Deploy
vercel

# Sigue las instrucciones en pantalla
```

---

### **3. Deploy en Netlify:**

```bash
# Instala Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod

# Selecciona la carpeta dist/ cuando te lo pida
```

---

### **4. Deploy en GitHub Pages:**

1. Crea un repositorio en GitHub
2. Sube tu código
3. Ve a Settings > Pages
4. Selecciona "GitHub Actions"
5. Usa el workflow que está en `/workflows/deploy.yml`

---

## 📚 Recursos Adicionales

- **Documentación Tailwind v3:** https://v3.tailwindcss.com/docs
- **Documentación Vite:** https://vitejs.dev/
- **Documentación React:** https://react.dev/

---

## ✅ Checklist Final

Antes de considerar la instalación completa:

- [ ] `npm install` ejecutado sin errores
- [ ] `npm run dev` inicia correctamente
- [ ] Página se ve con estilos correctos
- [ ] Todas las secciones se muestran (Hero, Productos, Negocios)
- [ ] Carrito funciona
- [ ] Mapa se abre
- [ ] No hay errores en consola del navegador
- [ ] `npm run build` compila sin errores

---

**Si todos los puntos están ✅, ¡tu instalación está completa!** 🎉

¿Problemas? Revisa la sección "Solución de Problemas" arriba.
