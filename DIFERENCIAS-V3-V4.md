# 🔄 Diferencias entre Tailwind CSS v3 y v4

Esta guía compara las diferencias específicas entre las dos versiones en tu proyecto.

---

## 📊 Tabla Comparativa Rápida

| **Característica** | **Tailwind v4 (Original)** | **Tailwind v3 (Esta carpeta)** |
|-------------------|---------------------------|--------------------------------|
| **Configuración** | `@theme inline` en CSS | `tailwind.config.js` |
| **PostCSS** | No necesita archivo | Requiere `postcss.config.js` |
| **Variables CSS** | `oklch()` | `hsl()` |
| **Plugins** | Integrados | Instalación manual |
| **Directivas CSS** | Sin `@tailwind` | `@tailwind base/components/utilities` |
| **Package.json** | `tailwindcss@^4.0.0` | `tailwindcss@^3.4.1` |

---

## 🎨 Diferencias en `styles/globals.css`

### **Tailwind v4 (Original):**

```css
/* NO usa @tailwind */

@custom-variant dark (&:is(.dark *));

:root {
  --background: #ffffff;  /* Hex directo */
  --primary: #030213;
}

@theme inline {
  /* Configuración dentro del CSS */
  --color-background: var(--background);
  --color-primary: var(--primary);
  --radius-lg: var(--radius);
}
```

---

### **Tailwind v3 (Migrado):**

```css
/* Usa directivas @tailwind */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Usa formato HSL */
  --background: 0 0% 100%;      /* HSL: blanco */
  --primary: 240 17% 6%;        /* HSL: azul oscuro */
}

.dark {
  --background: 240 10% 3.9%;   /* HSL: negro azulado */
}

/* NO usa @theme inline */
```

**Cambios clave:**
1. ✅ Se agregan las directivas `@tailwind`
2. ✅ Los colores cambian de hex/oklch a formato `hsl()`
3. ✅ Se elimina `@theme inline`
4. ✅ Se elimina `@custom-variant`

---

## 🛠️ Archivos de Configuración Nuevos

### **1. `tailwind.config.js` (NO existía en v4)**

```js
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
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... más colores
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

**Propósito:**
- Define los colores que Tailwind puede usar
- Configura el modo oscuro
- Especifica qué archivos escanear para clases CSS
- Carga plugins

---

### **2. `postcss.config.js` (NO existía en v4)**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**Propósito:**
- Le dice a Vite cómo procesar el CSS
- Integra Tailwind en el pipeline de compilación
- Agrega prefijos automáticos para compatibilidad con navegadores

---

## 📦 Diferencias en `package.json`

### **Tailwind v4:**

```json
{
  "devDependencies": {
    "tailwindcss": "^4.0.0"  // Solo esto
  }
}
```

---

### **Tailwind v3:**

```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.1",           // Versión 3
    "tailwindcss-animate": "^1.0.7",   // Plugin para animaciones
    "autoprefixer": "^10.4.18",        // Requerido
    "postcss": "^8.4.35"               // Requerido
  }
}
```

**Nuevas dependencias necesarias:**
1. ✅ `tailwindcss-animate` - Plugin para animaciones (antes integrado en v4)
2. ✅ `autoprefixer` - Prefijos CSS automáticos
3. ✅ `postcss` - Procesador CSS

---

## 🎯 ¿Cómo usar colores en ambas versiones?

### **En ambas versiones, el código React es IDÉNTICO:**

```tsx
<div className="bg-primary text-white">
  Esto funciona igual en v3 y v4
</div>

<button className="bg-blue-500 hover:bg-blue-600">
  Botón azul
</button>
```

**Conclusión:** Tu código React NO necesita cambios. Las diferencias son solo en configuración.

---

## 🔄 Formato de Colores: HSL vs OKLCH

### **Tailwind v4 (permitía ambos):**

```css
--primary: oklch(0.145 0 0);     /* Formato OKLCH */
--secondary: #030213;            /* Hex */
```

---

### **Tailwind v3 (requiere HSL):**

```css
--primary: 240 10% 3.9%;         /* Formato HSL */
```

**Conversión:**
- HSL = Hue (matiz) Saturation (saturación) Lightness (brillo)
- Ejemplo: `240 10% 3.9%` = Azul oscuro

---

## 📋 Migración de Variables

### **Conversión de colores comunes:**

| **Color** | **v4 (oklch/hex)** | **v3 (hsl)** |
|----------|-------------------|--------------|
| Blanco | `#ffffff` | `0 0% 100%` |
| Negro | `oklch(0.145 0 0)` | `240 10% 3.9%` |
| Gris claro | `#f3f3f5` | `240 4.8% 95.9%` |
| Azul oscuro | `#030213` | `240 17% 6%` |
| Rojo | `#d4183d` | `0 72% 51%` |

---

## 🚀 Ventajas y Desventajas

### **Tailwind v4:**

**✅ Ventajas:**
- Configuración más simple (todo en CSS)
- Menos archivos de configuración
- Mejor rendimiento de compilación
- Soporte nativo para `oklch()`

**❌ Desventajas:**
- Nueva y menos probada
- Menos plugins disponibles
- Documentación en desarrollo
- Algunos bugs conocidos

---

### **Tailwind v3:**

**✅ Ventajas:**
- Muy estable y probada
- Excelente documentación
- Gran ecosistema de plugins
- Comunidad más grande

**❌ Desventajas:**
- Más archivos de configuración
- Configuración en JavaScript (no CSS)
- Rendimiento ligeramente inferior a v4

---

## 🔄 ¿Cuándo usar cada versión?

### **Usa Tailwind v3 si:**

- ✅ Estás en producción
- ✅ Necesitas estabilidad máxima
- ✅ Usas muchos plugins de terceros
- ✅ Tu equipo conoce bien v3
- ✅ Necesitas documentación extensa

---

### **Usa Tailwind v4 si:**

- ✅ Estás en desarrollo experimental
- ✅ Quieres las últimas funciones
- ✅ Prefieres configuración en CSS
- ✅ No necesitas plugins complejos
- ✅ Valoras el rendimiento al máximo

---

## 📝 Checklist de Migración v4 → v3

Si estás migrando de v4 a v3:

- [ ] Crear `tailwind.config.js`
- [ ] Crear `postcss.config.js`
- [ ] Actualizar `package.json` con nuevas dependencias
- [ ] Cambiar `styles/globals.css`:
  - [ ] Agregar `@tailwind base/components/utilities`
  - [ ] Convertir colores de `oklch()` a `hsl()`
  - [ ] Eliminar `@theme inline`
  - [ ] Eliminar `@custom-variant`
- [ ] Eliminar `node_modules` y reinstalar
- [ ] Verificar que todo funcione: `npm run dev`

---

## 🎓 Recursos de Aprendizaje

### **Tailwind v3:**
- Documentación: https://v3.tailwindcss.com/docs
- Playground: https://play.tailwindcss.com/

### **Tailwind v4:**
- Documentación: https://tailwindcss.com/docs (beta)
- Blog de anuncio: https://tailwindcss.com/blog/tailwindcss-v4-alpha

---

## 💡 Conclusión

**Ambas versiones generan el MISMO resultado visual.** La diferencia está en:
1. Cómo se configura
2. Qué archivos necesitas
3. Qué dependencias instalas

Tu código React permanece **100% idéntico** en ambas versiones.

---

**¿Tienes dudas?** Consulta los archivos `README-MIGRACION-V3.md` o `INSTRUCCIONES-INSTALACION.md` en esta carpeta.
