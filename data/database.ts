// Base de datos unificada para LocalMarket
// Centraliza todos los productos, comercios y ofertas

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
  {
    id: 'business-1',
    name: 'Panadería San Miguel',
    category: 'Panadería',
    image: 'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1663904460424-91895028aa9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwbG9hdmVzfGVufDF8fHx8MTc1ODU4ODExN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg1ODgwNDF8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.8,
    reviewCount: 124,
    distance: '0.8 km',
    deliveryTime: '15-25 min',
    isOpen: true,
    whatsapp: '+1234567890',
    description: 'Pan fresco artesanal horneado diariamente',
    longDescription: '🍞 Panadería familiar con más de 30 años de experiencia. Ofrecemos el mejor pan artesanal de la zona, horneado cada 4 horas con ingredientes 100% naturales. ¡Ven y prueba nuestras especialidades!',
    isPromoted: true,
    address: 'Calle Principal 123',
    hours: '6:00 AM - 8:00 PM'
  },
  {
    id: 'business-2',
    name: 'Verdulería La Plaza',
    category: 'Frutas y Verduras',
    image: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1750918061368-0c4eb884a9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc1ODU2NzA4OXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1680835011462-d30471faf688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0JTIwYXBwbGVzfGVufDF8fHx8MTc1OTA3Njc3NXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.7,
    reviewCount: 89,
    distance: '1.2 km',
    deliveryTime: '20-30 min',
    isOpen: true,
    whatsapp: '+1234567891',
    description: 'Frutas y verduras frescas todos los días',
    longDescription: '🥬 Los productos más frescos directo del campo. Trabajamos con productores locales para garantizar la máxima calidad y frescura. ¡Productos orgánicos certificados disponibles!',
    isNew: true,
    address: 'Av. Central 456',
    hours: '7:00 AM - 7:00 PM'
  },
  {
    id: 'business-3',
    name: 'Café Central',
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1642647916129-3909c75c0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY2FmZXxlbnwxfHx8fDE3NTg1MzcyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1642647916129-3909c75c0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY2FmZXxlbnwxfHx8fDE3NTg1MzcyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1650100458608-824a54559caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGVzcHJlc3NvfGVufDF8fHx8MTc1ODU1NzQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.9,
    reviewCount: 156,
    distance: '0.5 km',
    deliveryTime: '10-20 min',
    isOpen: true,
    whatsapp: '+1234567892',
    description: 'El mejor café de la ciudad',
    longDescription: '☕ Tostamos nuestros granos diariamente para ofrecerte el café más fresco. Especialidades de todo el mundo preparadas por baristas expertos. ¡También ofrecemos cursos de barismo!',
    isPromoted: true,
    address: 'Plaza Central 789',
    hours: '6:30 AM - 10:00 PM'
  },
  {
    id: 'business-4',
    name: 'Carnicería El Buen Gusto',
    category: 'Carnicería',
    image: 'https://images.unsplash.com/photo-1630334337820-84afb05acf3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1lYXQlMjBidXRjaGVyfGVufDF8fHx8MTc1OTA1ODAxOXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1630334337820-84afb05acf3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1lYXQlMjBidXRjaGVyfGVufDF8fHx8MTc1OTA1ODAxOXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1642497394469-188b0f4bcae6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNoaWNrZW4lMjBtZWF0fGVufDF8fHx8MTc1OTA3Njc4N3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.8,
    reviewCount: 97,
    distance: '0.6 km',
    deliveryTime: '20-30 min',
    isOpen: true,
    whatsapp: '+1234567803',
    description: 'Carnes frescas de primera calidad',
    longDescription: '🥩 Más de 25 años ofreciendo las mejores carnes. Trabajamos con ganaderos locales para garantizar frescura y calidad. Cortes especiales bajo pedido.',
    address: 'Calle Comercio 321',
    hours: '8:00 AM - 6:00 PM'
  },
  {
    id: 'business-5',
    name: 'Lácteos La Granja',
    category: 'Lácteos',
    image: 'https://images.unsplash.com/photo-1719532520242-a809140b313d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1pbGslMjBkYWlyeXxlbnwxfHx8fDE3NTkwMzQ0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1719532520242-a809140b313d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1pbGslMjBkYWlyeXxlbnwxfHx8fDE3NTkwMzQ0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1722718461923-c69728f7640b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNoZWVzZSUyMGRhaXJ5fGVufDF8fHx8MTc1OTA3Njc4Mnww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    rating: 4.6,
    reviewCount: 74,
    distance: '1.1 km',
    deliveryTime: '15-25 min',
    isOpen: true,
    whatsapp: '+1234567801',
    description: 'Productos lácteos frescos de granja',
    longDescription: '🥛 Productos lácteos artesanales directos de nuestra granja familiar. Leche, quesos y yogures naturales sin conservantes. ¡Visita nuestra granja los fines de semana!',
    address: 'Camino Rural 159',
    hours: '6:00 AM - 6:00 PM'
  },
  {
  id: 'business-6',
    name: 'Panaderia Centeno',
    category: 'Panaderia',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnbTMrUG6x0Y_FDt-pAMEANkOSQImAwrK_hg&s',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjvF-6DzMwXwsqerd9sCmTZUSYIoY-Ovb4nA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLfaUShczi2kX8CtIZJHLb8ianzxFqXco-NQ&s'
    ],
    rating: 4.6,
    reviewCount: 74,
    distance: '2.1 km',
    deliveryTime: '20-35 min',
    isOpen: true,
    whatsapp: '+573118208928',
    description: 'Productos de Pnaderia Frescos y al gusto, Artesanales e integrales',
    longDescription: 'los mejor del Pan Castellano. ¡Visita nuestra nuestras franquicias y te daremos lo mejor de lo smejor.!',
    address: 'Camino urbano 209',
    hours: '6:00 AM - 6:00 PM'
  }
];

// Base de datos de productos unificada
export const products: Product[] = [
  // Productos de Panadería San Miguel
  {
    id: 'product-1',
    name: 'Pan Integral Artesanal',
    description: 'Pan integral hecho con harina orgánica, semillas de girasol y miel natural. Horneado fresco cada mañana con masa madre de 48 horas.',
    category: 'Panadería',
    image: 'https://images.unsplash.com/photo-1663904460424-91895028aa9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwbG9hdmVzfGVufDF8fHx8MTc1ODU4ODExN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1663904460424-91895028aa9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwbG9hdmVzfGVufDF8fHx8MTc1ODU4ODExN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 4.50,
    originalPrice: 5.00,
    business: 'Panadería San Miguel',
    businessId: 'business-1',
    businessImage: 'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 45,
    distance: '0.8 km',
    deliveryTime: '15-25 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+1234567890',
    isFlashSale: true,
    discount: 10,
    type: 'promotion',
    validUntil: '2024-01-31'
  },
  {
    id: 'product-2',
    name: 'Croissants Franceses',
    description: 'Auténticos croissants franceses con mantequilla artesanal. Masa hojaldrada perfecta, crujientes por fuera y suaves por dentro.',
    category: 'Panadería',
    image: 'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 2.50,
    business: 'Panadería San Miguel',
    businessId: 'business-1',
    businessImage: 'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 32,
    distance: '0.8 km',
    deliveryTime: '15-25 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+1234567890',
    isHot: true,
    type: 'trending'
  },

  // Productos de Verdulería La Plaza
  {
    id: 'product-3',
    name: 'Tomates Frescos (1kg)',
    description: 'Tomates maduros cosechados en el día. Perfectos para ensaladas, salsas y cocción. Cultivados sin pesticidas dañinos.',
    category: 'Frutas y Verduras',
    image: 'https://images.unsplash.com/photo-1750918061368-0c4eb884a9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc1ODU2NzA4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1750918061368-0c4eb884a9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc1ODU2NzA4OXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 5.90,
    business: 'Verdulería La Plaza',
    businessId: 'business-2',
    businessImage: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 32,
    distance: '1.2 km',
    deliveryTime: '20-30 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+1234567891',
    isOrganic: true,
    type: 'regular'
  },
  {
    id: 'product-4',
    name: 'Manzanas Rojas (1kg)',
    description: 'Manzanas rojas crujientes y dulces. Ricas en fibra y vitaminas. Perfectas para comer frescas o para postres.',
    category: 'Frutas y Verduras',
    image: 'https://images.unsplash.com/photo-1680835011462-d30471faf688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0JTIwYXBwbGVzfGVufDF8fHx8MTc1OTA3Njc3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1680835011462-d30471faf688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0JTIwYXBwbGVzfGVufDF8fHx8MTc1OTA3Njc3NXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 7.95,
    originalPrice: 8.50,
    business: 'Verdulería La Plaza',
    businessId: 'business-2',
    businessImage: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 42,
    distance: '1.2 km',
    deliveryTime: '20-30 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+1234567891',
    isExclusive: true,
    discount: 6,
    type: 'promotion'
  },

  // Productos de Café Central
  {
    id: 'product-5',
    name: 'Café Premium Molido (500g)',
    description: 'Mezcla exclusiva de granos arábica tostados artesanalmente. Notas de chocolate y caramelo con final suave y aromático.',
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1650100458608-824a54559caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGVzcHJlc3NvfGVufDF8fHx8MTc1ODU1NzQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1650100458608-824a54559caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGVzcHJlc3NvfGVufDF8fHx8MTc1ODU1NzQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1642647916129-3909c75c0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY2FmZXxlbnwxfHx8fDE3NTg1MzcyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 12.99,
    business: 'Café Central',
    businessId: 'business-3',
    businessImage: 'https://images.unsplash.com/photo-1642647916129-3909c75c0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY2FmZXxlbnwxfHx8fDE3NTg1MzcyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 78,
    distance: '0.5 km',
    deliveryTime: '10-20 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+1234567892',
    isNew: true,
    type: 'trending'
  },

  // Productos de Carnicería El Buen Gusto
  {
    id: 'product-6',
    name: 'Carne de Res Premium (1kg)',
    description: 'Corte premium de res madurada. Carne tierna y jugosa, perfecta para asados. Ganado criado en pasturas naturales.',
    category: 'Carnicería',
    image: 'https://images.unsplash.com/photo-1630334337820-84afb05acf3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1lYXQlMjBidXRjaGVyfGVufDF8fHx8MTc1OTA1ODAxOXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1630334337820-84afb05acf3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1lYXQlMjBidXRjaGVyfGVufDF8fHx8MTc1OTA1ODAxOXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 25.90,
    business: 'Carnicería El Buen Gusto',
    businessId: 'business-4',
    businessImage: 'https://images.unsplash.com/photo-1630334337820-84afb05acf3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1lYXQlMjBidXRjaGVyfGVufDF8fHx8MTc1OTA1ODAxOXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 67,
    distance: '0.6 km',
    deliveryTime: '20-30 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+1234567803',
    type: 'regular'
  },
  {
    id: 'product-7',
    name: 'Pollo Fresco (1kg)',
    description: 'Pollo fresco de granja, alimentado naturalmente. Perfecto para cualquier preparación culinaria.',
    category: 'Carnicería',
    image: 'https://images.unsplash.com/photo-1642497394469-188b0f4bcae6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNoaWNrZW4lMjBtZWF0fGVufDF8fHx8MTc1OTA3Njc4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1642497394469-188b0f4bcae6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNoaWNrZW4lMjBtZWF0fGVufDF8fHx8MTc1OTA3Njc4N3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 12.50,
    business: 'Carnicería El Buen Gusto',
    businessId: 'business-4',
    businessImage: 'https://images.unsplash.com/photo-1630334337820-84afb05acf3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1lYXQlMjBidXRjaGVyfGVufDF8fHx8MTc1OTA1ODAxOXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 78,
    distance: '0.6 km',
    deliveryTime: '20-30 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+1234567803',
    type: 'trending'
  },

  // Productos de Lácteos La Granja
  {
    id: 'product-8',
    name: 'Leche Entera (1L)',
    description: 'Leche fresca entera directo de la granja. Rica en calcio y proteínas. Procesada el mismo día del ordeño.',
    category: 'Lácteos',
    image: 'https://images.unsplash.com/photo-1719532520242-a809140b313d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1pbGslMjBkYWlyeXxlbnwxfHx8fDE3NTkwMzQ0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1719532520242-a809140b313d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1pbGslMjBkYWlyeXxlbnwxfHx8fDE3NTkwMzQ0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 3.20,
    business: 'Lácteos La Granja',
    businessId: 'business-5',
    businessImage: 'https://images.unsplash.com/photo-1719532520242-a809140b313d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1pbGslMjBkYWlyeXxlbnwxfHx8fDE3NTkwMzQ0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviewCount: 56,
    distance: '1.1 km',
    deliveryTime: '15-25 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+1234567801',
    type: 'regular'
  },
  {
    id: 'product-9',
    name: 'Queso Fresco Artesanal (500g)',
    description: 'Queso fresco artesanal elaborado con leche de vacas propias. Textura cremosa y sabor suave. Sin conservantes.',
    category: 'Lácteos',
    image: 'https://images.unsplash.com/photo-1722718461923-c69728f7640b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNoZWVzZSUyMGRhaXJ5fGVufDF8fHx8MTc1OTA3Njc4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1722718461923-c69728f7640b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNoZWVzZSUyMGRhaXJ5fGVufDF8fHx8MTc1OTA3Njc4Mnww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 8.95,
    originalPrice: 9.50,
    business: 'Lácteos La Granja',
    businessId: 'business-5',
    businessImage: 'https://images.unsplash.com/photo-1719532520242-a809140b313d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1pbGslMjBkYWlyeXxlbnwxfHx8fDE3NTkwMzQ0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 32,
    distance: '1.1 km',
    deliveryTime: '15-25 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+1234567801',
    isExclusive: true,
    discount: 6,
    type: 'promotion'
  },

  // Productos adicionales para completar la base de datos
  {
    id: 'product-10',
    name: 'Plátanos Frescos (1kg)',
    description: 'Plátanos maduros y dulces, ricos en potasio. Perfectos para batidos, postres o como snack saludable.',
    category: 'Frutas y Verduras',
    image: 'https://images.unsplash.com/photo-1757332050958-b797a022c910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJhbmFuYXN8ZW58MXx8fHwxNzU4OTkxMDY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1757332050958-b797a022c910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJhbmFuYXN8ZW58MXx8fHwxNzU4OTkxMDY1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 3.90,
    business: 'Verdulería La Plaza',
    businessId: 'business-2',
    businessImage: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.5,
    reviewCount: 23,
    distance: '1.2 km',
    deliveryTime: '20-30 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+1234567891',
    type: 'regular'
  },
  {
    id: 'product-11',
    name: 'Pasta Italiana Premium (500g)',
    description: 'Pasta artesanal italiana hecha con sémola de trigo duro. Textura perfecta y sabor auténtico.',
    category: 'Panadería',
    image: 'https://images.unsplash.com/photo-1747852628136-e612ace24a23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGl0YWxpYW58ZW58MXx8fHwxNzU5MDQwNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1747852628136-e612ace24a23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGl0YWxpYW58ZW58MXx8fHwxNzU5MDQwNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 5.80,
    originalPrice: 6.50,
    business: 'Panadería San Miguel',
    businessId: 'business-1',
    businessImage: 'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviewCount: 42,
    distance: '0.8 km',
    deliveryTime: '15-25 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+1234567890',
    isFlashSale: true,
    discount: 11,
    type: 'promotion'
  },
  {
    id: 'product-12',
    name: 'Arroz Blanco Premium (1kg)',
    description: 'Arroz blanco de grano largo, cocción perfecta. Ideal para acompañar cualquier comida.',
    category: 'Panadería',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHJpY2UlMjBncmFpbnN8ZW58MXx8fHwxNzU5MDc2NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHJpY2UlMjBncmFpbnN8ZW58MXx8fHwxNzU5MDc2NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 4.40,
    business: 'Panadería San Miguel',
    businessId: 'business-1',
    businessImage: 'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.3,
    reviewCount: 25,
    distance: '0.8 km',
    deliveryTime: '15-25 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+1234567890',
    type: 'regular'
  },

  // Productos adicionales para comparación - Pan Integral de diferentes negocios
  {
    id: 'product-13',
    name: 'Pan Integral Artesanal',
    description: 'Pan integral tradicional con semillas y cereales. Masa madre natural de 24 horas de fermentación.',
    category: 'Panadería',
    image: 'https://images.unsplash.com/photo-1663904460424-91895028aa9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwbG9hdmVzfGVufDF8fHx8MTc1ODU4ODExN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1663904460424-91895028aa9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwbG9hdmVzfGVufDF8fHx8MTc1ODU4ODExN3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 5.20,
    business: 'Café Central',
    businessId: 'business-3',
    businessImage: 'https://images.unsplash.com/photo-1642647916129-3909c75c0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY2FmZXxlbnwxfHx8fDE3NTg1MzcyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviewCount: 32,
    distance: '0.5 km',
    deliveryTime: '10-20 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+1234567892',
    type: 'regular'
  },
  {
    id: 'product-14',
    name: 'Pan Integral Artesanal',
    description: 'Pan integral orgánico con harina de trigo integral. Libre de conservantes y aditivos artificiales.',
    category: 'Panadería',
    image: 'https://images.unsplash.com/photo-1663904460424-91895028aa9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwbG9hdmVzfGVufDF8fHx8MTc1ODU4ODExN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1663904460424-91895028aa9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwbG9hdmVzfGVufDF8fHx8MTc1ODU4ODExN3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 4.80,
    business: 'Lácteos La Granja',
    businessId: 'business-5',
    businessImage: 'https://images.unsplash.com/photo-1719532520242-a809140b313d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1pbGslMjBkYWlyeXxlbnwxfHx8fDE3NTkwMzQ0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 28,
    distance: '1.1 km',
    deliveryTime: '15-25 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+1234567801',
    type: 'regular'
  },

  // Tomates de diferentes negocios
  {
    id: 'product-15',
    name: 'Tomates Frescos (1kg)',
    description: 'Tomates cultivados localmente, maduros y jugosos. Perfectos para ensaladas y salsas caseras.',
    category: 'Frutas y Verduras',
    image: 'https://images.unsplash.com/photo-1750918061368-0c4eb884a9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc1ODU2NzA4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1750918061368-0c4eb884a9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc1ODU2NzA4OXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 6.20,
    originalPrice: 6.80,
    business: 'Carnicería El Buen Gusto',
    businessId: 'business-4',
    businessImage: 'https://images.unsplash.com/photo-1630334337820-84afb05acf3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1lYXQlMjBidXRjaGVyfGVufDF8fHx8MTc1OTA1ODAxOXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.5,
    reviewCount: 24,
    distance: '0.6 km',
    deliveryTime: '20-30 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+1234567803',
    discount: 9,
    type: 'promotion'
  },

  // Leche de diferentes negocios
  {
    id: 'product-16',
    name: 'Leche Entera (1L)',
    description: 'Leche fresca pasteurizada, entera y cremosa. Ideal para toda la familia.',
    category: 'Lácteos',
    image: 'https://images.unsplash.com/photo-1719532520242-a809140b313d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1pbGslMjBkYWlyeXxlbnwxfHx8fDE3NTkwMzQ0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1719532520242-a809140b313d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1pbGslMjBkYWlyeXxlbnwxfHx8fDE3NTkwMzQ0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 3.50,
    business: 'Verdulería La Plaza',
    businessId: 'business-2',
    businessImage: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.4,
    reviewCount: 35,
    distance: '1.2 km',
    deliveryTime: '20-30 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+1234567891',
    type: 'regular'
  },
  {
    id: 'product-17',
    name: 'Leche Entera (1L)',
    description: 'Leche ultrapasteurizada de alta calidad. Larga duración y sabor natural.',
    category: 'Lácteos',
    image: 'https://images.unsplash.com/photo-1719532520242-a809140b313d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1pbGslMjBkYWlyeXxlbnwxfHx8fDE3NTkwMzQ0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1719532520242-a809140b313d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1pbGslMjBkYWlyeXxlbnwxfHx8fDE3NTkwMzQ0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 3.80,
    originalPrice: 4.00,
    business: 'Café Central',
    businessId: 'business-3',
    businessImage: 'https://images.unsplash.com/photo-1642647916129-3909c75c0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY2FmZXxlbnwxfHx8fDE3NTg1MzcyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.3,
    reviewCount: 22,
    distance: '0.5 km',
    deliveryTime: '10-20 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+1234567892',
    discount: 5,
    type: 'promotion'
  },
  {
    id: 'product-18',
    name: 'Leche Entera (1L)',
    description: 'Leche ultrapasteurizada de alta calidad. Larga duración y sabor natural. producto 2 ',
    category: 'Lácteos',
    image: 'https://images.unsplash.com/photo-1719532520242-a809140b313d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1pbGslMjBkYWlyeXxlbnwxfHx8fDE3NTkwMzQ0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1719532520242-a809140b313d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1pbGslMjBkYWlyeXxlbnwxfHx8fDE3NTkwMzQ0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    price: 2.80,
    originalPrice: 5.00,
    business: 'Carnicería El Buen Gusto',
    businessId: 'business-4',
    businessImage: 'https://images.unsplash.com/photo-1642647916129-3909c75c0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY2FmZXxlbnwxfHx8fDE3NTg1MzcyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.0,
    reviewCount: 22,
    distance: '0.5 km',
    deliveryTime: '10-20 min',
    isOpen: true,
    inStock: true,
    whatsapp: '+573118208928',
    discount: 50,
    type: 'promotion'
  }
];

// Funciones utilitarias para acceder a los datos
export const getBusinessById = (id: string): Business | undefined => {
  return businesses.find(business => business.id === id);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByBusiness = (businessId: string): Product[] => {
  return products.filter(product => product.businessId === businessId);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getPromotionProducts = (): Product[] => {
  return products.filter(product => product.type === 'promotion');
};

export const getTrendingProducts = (): Product[] => {
  return products.filter(product => product.type === 'trending');
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.business.toLowerCase().includes(lowercaseQuery)
  );
};

export const getCategories = (): string[] => {
  const categories = Array.from(new Set(products.map(product => product.category)));
  return ['Todos', ...categories];
};

// Función para generar comparaciones de productos
export const generateProductComparisons = (): ProductComparison[] => {
  const productsByName = new Map<string, Product[]>();
  
  // Agrupar productos por nombre similar
  products.forEach(product => {
    const baseName = product.name.split(' ').slice(0, 2).join(' '); // Primeras 2 palabras
    if (!productsByName.has(baseName)) {
      productsByName.set(baseName, []);
    }
    productsByName.get(baseName)!.push(product);
  });
  
  // Crear comparaciones solo para productos que existen en múltiples negocios
  const comparisons: ProductComparison[] = [];
  
  productsByName.forEach((productList, name) => {
    if (productList.length > 1) {
      const offers: ProductOffer[] = productList.map(product => ({
        id: product.id,
        business: product.business,
        businessId: product.businessId,
        businessImage: product.businessImage,
        price: product.price,
        originalPrice: product.originalPrice,
        rating: product.rating,
        reviewCount: product.reviewCount,
        distance: product.distance,
        deliveryTime: product.deliveryTime,
        isOpen: product.isOpen,
        inStock: product.inStock,
        whatsapp: product.whatsapp
      }));
      
      comparisons.push({
        name: productList[0].name,
        category: productList[0].category,
        image: productList[0].image,
        offers
      });
    }
  });
  
  return comparisons;
};