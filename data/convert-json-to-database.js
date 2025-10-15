/**
 * Script de conversión: products-manager.json -> database.ts
 * 
 * Este script convierte el archivo JSON fácil de editar al formato TypeScript
 * utilizado por la aplicación.
 * 
 * USO:
 * node data/convert-json-to-database.js
 */

const fs = require('fs');
const path = require('path');

// Función para escapar comillas en strings
function escapeQuotes(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/'/g, "\\'");
}

// Leer el archivo JSON
console.log('📖 Leyendo products-manager.json...');
const jsonPath = path.join(__dirname, 'products-manager.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log(`✅ Encontrados ${data.comercios.length} comercios y ${data.productos.length} productos`);

// Convertir comercios
const businessesTS = data.comercios.map(comercio => {
  const images = comercio.imagenes_galeria.map(img => `      '${img}'`).join(',\n');
  
  return `  {
    id: '${comercio.id}',
    name: '${escapeQuotes(comercio.nombre)}',
    category: '${escapeQuotes(comercio.categoria)}',
    image: '${comercio.imagen_principal}',
    images: [
${images}
    ],
    rating: ${comercio.calificacion},
    reviewCount: ${comercio.cantidad_resenas},
    distance: '${comercio.distancia}',
    deliveryTime: '${comercio.tiempo_entrega}',
    isOpen: ${comercio.esta_abierto},
    whatsapp: '${comercio.whatsapp}',
    description: '${escapeQuotes(comercio.descripcion_corta)}',
    longDescription: '${escapeQuotes(comercio.descripcion_larga)}',${comercio.es_promocionado ? `
    isPromoted: true,` : ''}${comercio.es_nuevo ? `
    isNew: true,` : ''}
    address: '${escapeQuotes(comercio.direccion)}',
    hours: '${comercio.horario}'
  }`;
}).join(',\n');

// Convertir productos
const productsTS = data.productos.map(producto => {
  // Encontrar el comercio asociado
  const comercio = data.comercios.find(c => c.id === producto.id_comercio);
  if (!comercio) {
    console.warn(`⚠️ Advertencia: Producto "${producto.nombre}" (${producto.id}) tiene un id_comercio inválido: ${producto.id_comercio}`);
  }

  const images = producto.imagenes_galeria.map(img => `      '${img}'`).join(',\n');
  
  let flags = '';
  if (producto.es_oferta_flash) flags += `\n    isFlashSale: true,`;
  if (producto.es_exclusivo) flags += `\n    isExclusive: true,`;
  if (producto.es_destacado) flags += `\n    isHot: true,`;
  if (producto.es_nuevo) flags += `\n    isNew: true,`;
  if (producto.es_organico) flags += `\n    isOrganic: true,`;
  if (producto.descuento) flags += `\n    discount: ${producto.descuento},`;
  if (producto.valido_hasta) flags += `\n    validUntil: '${producto.valido_hasta}',`;

  return `  {
    id: '${producto.id}',
    name: '${escapeQuotes(producto.nombre)}',
    description: '${escapeQuotes(producto.descripcion)}',
    category: '${escapeQuotes(producto.categoria)}',
    image: '${producto.imagen_principal}',
    images: [
${images}
    ],
    price: ${producto.precio},${producto.precio_original ? `
    originalPrice: ${producto.precio_original},` : ''}
    business: '${comercio ? escapeQuotes(comercio.nombre) : 'Comercio Desconocido'}',
    businessId: '${producto.id_comercio}',
    businessImage: '${comercio ? comercio.imagen_principal : ''}',
    rating: ${producto.calificacion},
    reviewCount: ${producto.cantidad_resenas},
    distance: '${comercio ? comercio.distancia : '0 km'}',
    deliveryTime: '${comercio ? comercio.tiempo_entrega : '0 min'}',
    isOpen: ${comercio ? comercio.esta_abierto : true},
    inStock: ${producto.en_stock},
    whatsapp: '${comercio ? comercio.whatsapp : ''}',${flags}
    type: '${producto.tipo}'
  }`;
}).join(',\n');

// Generar el archivo database.ts completo
const databaseTS = `// Base de datos unificada para LocalMarket
// Centraliza todos los productos, comercios y ofertas
// 
// 🚀 GENERADO AUTOMÁTICAMENTE - No editar manualmente
// Edita /data/products-manager.json y ejecuta: node data/convert-json-to-database.js

export interface Business {
  id: string;
  name: string;
  category: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  distance: string;
  deliveryTime: string;
  isOpen: boolean;
  whatsapp: string;
  description: string;
  longDescription: string;
  isPromoted?: boolean;
  isNew?: boolean;
  address?: string;
  hours?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  images: string[];
  price: number;
  originalPrice?: number;
  business: string;
  businessId: string;
  businessImage: string;
  rating: number;
  reviewCount: number;
  distance: string;
  deliveryTime: string;
  isOpen: boolean;
  inStock: boolean;
  whatsapp: string;
  // Promotion flags
  isFlashSale?: boolean;
  isExclusive?: boolean;
  isHot?: boolean;
  isNew?: boolean;
  isOrganic?: boolean;
  discount?: number;
  validUntil?: string;
  type: 'promotion' | 'trending' | 'regular';
}

export interface ProductOffer {
  id: string;
  business: string;
  businessId: string;
  businessImage: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  distance: string;
  deliveryTime: string;
  isOpen: boolean;
  inStock: boolean;
  whatsapp: string;
}

export interface ProductComparison {
  name: string;
  category: string;
  image: string;
  offers: ProductOffer[];
}

// Base de datos de comercios
export const businesses: Business[] = [
${businessesTS}
];

// Base de datos de productos unificada
export const products: Product[] = [
${productsTS}
];

// Función helper para obtener comparaciones de productos
export function getProductComparisons(): ProductComparison[] {
  const productGroups = new Map<string, Product[]>();
  
  // Agrupar productos por nombre
  products.forEach(product => {
    const key = product.name.toLowerCase().trim();
    if (!productGroups.has(key)) {
      productGroups.set(key, []);
    }
    productGroups.get(key)!.push(product);
  });
  
  // Convertir a formato ProductComparison
  const comparisons: ProductComparison[] = [];
  
  productGroups.forEach((productList, name) => {
    if (productList.length > 1) {
      const representative = productList[0];
      comparisons.push({
        name: representative.name,
        category: representative.category,
        image: representative.image,
        offers: productList.map(p => ({
          id: p.id,
          business: p.business,
          businessId: p.businessId,
          businessImage: p.businessImage,
          price: p.price,
          originalPrice: p.originalPrice,
          rating: p.rating,
          reviewCount: p.reviewCount,
          distance: p.distance,
          deliveryTime: p.deliveryTime,
          isOpen: p.isOpen,
          inStock: p.inStock,
          whatsapp: p.whatsapp
        }))
      });
    }
  });
  
  return comparisons;
}
`;

// Escribir el archivo database.ts
const outputPath = path.join(__dirname, 'database.ts');
fs.writeFileSync(outputPath, databaseTS, 'utf8');

console.log('');
console.log('✨ ¡Conversión completada exitosamente!');
console.log('');
console.log('📊 Resumen:');
console.log(`   - ${data.comercios.length} comercios convertidos`);
console.log(`   - ${data.productos.length} productos convertidos`);
console.log(`   - Archivo generado: /data/database.ts`);
console.log('');
console.log('🎉 La aplicación está lista para usar los nuevos datos.');
console.log('💡 Recarga la página web para ver los cambios.');
console.log('');