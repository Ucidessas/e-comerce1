import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Star, Plus, Heart, Zap, Sparkles, Crown, Flame, TrendingUp } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[]; // Múltiples imágenes para galería
  business: string;
  rating: number;
  reviewCount: number;
  category: string;
  isOrganic?: boolean;
  inStock: boolean;
  isHot?: boolean;
  isNew?: boolean;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pan Artesanal Integral',
    price: 4.50,
    originalPrice: 5.00,
    image: 'https://images.unsplash.com/photo-1663904460424-91895028aa9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwbG9hdmVzfGVufDF8fHx8MTc1ODU4ODExN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1663904460424-91895028aa9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwbG9hdmVzfGVufDF8fHx8MTc1ODU4ODExN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg1ODgwNDF8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    business: 'Panadería San Miguel',
    rating: 4.8,
    reviewCount: 45,
    category: 'Panadería',
    isOrganic: true,
    inStock: true,
    isHot: true
  },
  {
    id: '2',
    name: 'Café Premium Molido',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1650100458608-824a54559caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGVzcHJlc3NvfGVufDF8fHx8MTc1ODU1NzQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1650100458608-824a54559caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGVzcHJlc3NvfGVufDF8fHx8MTc1ODU1NzQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1642647916129-3909c75c0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY2FmZXxlbnwxfHx8fDE3NTg1MzcyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    business: 'Café Central',
    rating: 4.9,
    reviewCount: 78,
    category: 'Bebidas',
    inStock: true,
    isNew: true
  },
  {
    id: '3',
    name: 'Tomates Orgánicos (1kg)',
    price: 6.75,
    image: 'https://images.unsplash.com/photo-1750918061368-0c4eb884a9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc1ODU2NzA4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1750918061368-0c4eb884a9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc1ODU2NzA4OXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    business: 'Verdulería La Plaza',
    rating: 4.7,
    reviewCount: 32,
    category: 'Frutas y Verduras',
    isOrganic: true,
    inStock: true,
    isHot: true
  },
  {
    id: '4',
    name: 'Croissants Mantequilla (6 unid)',
    price: 8.90,
    originalPrice: 10.50,
    image: 'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1663904460424-91895028aa9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwbG9hdmVzfGVufDF8fHx8MTc1ODU4ODExN3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    business: 'Panadería San Miguel',
    rating: 4.6,
    reviewCount: 56,
    category: 'Panadería',
    inStock: false
  },
  {
    id: '5',
    name: 'Fresas Frescas (500g)',
    price: 5.25,
    image: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    business: 'Verdulería La Plaza',
    rating: 4.8,
    reviewCount: 41,
    category: 'Frutas y Verduras',
    isOrganic: true,
    inStock: true,
    isNew: true
  },
  {
    id: '6',
    name: 'Cappuccino Premium',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1642647916129-3909c75c0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY2FmZXxlbnwxfHx8fDE3NTg1MzcyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1642647916129-3909c75c0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY2FmZXxlbnwxfHx8fDE3NTg1MzcyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1650100458608-824a54559caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGVzcHJlc3NvfGVufDF8fHx8MTc1ODU1NzQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    business: 'Café Central',
    rating: 4.9,
    reviewCount: 89,
    category: 'Bebidas',
    inStock: true,
    isHot: true
  },
  {
    id: '7',
    name: 'Bife de Chorizo Premium (1kg)',
    price: 18.50,
    originalPrice: 22.00,
    image: 'https://images.unsplash.com/photo-1630334337820-84afb05acf3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1lYXQlMjBidXRjaGVyJTIwc2hvcHxlbnwxfHx8fDE3NTg1NzI1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1630334337820-84afb05acf3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1lYXQlMjBidXRjaGVyJTIwc2hvcHxlbnwxfHx8fDE3NTg1NzI1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    business: 'Carnicería Don Juan',
    rating: 4.7,
    reviewCount: 63,
    category: 'Carnicería',
    inStock: true,
    isHot: true
  },
  {
    id: '8',
    name: 'Salmón Fresco (500g)',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1674066620896-04c854bada51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZpc2glMjBzZWFmb29kJTIwbWFya2V0fGVufDF8fHx8MTc1ODUzMTUwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1674066620896-04c854bada51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZpc2glMjBzZWFmb29kJTIwbWFya2V0fGVufDF8fHx8MTc1ODUzMTUwN3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    business: 'Pescadería El Mar',
    rating: 4.9,
    reviewCount: 34,
    category: 'Pescadería',
    inStock: true,
    isNew: true
  },
  {
    id: '9',
    name: 'Queso Mozzarella Artesanal (250g)',
    price: 7.80,
    image: 'https://images.unsplash.com/photo-1633179963862-72c64dc6d30d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBjaGVlc2UlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTg1OTM2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1633179963862-72c64dc6d30d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBjaGVlc2UlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTg1OTM2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    business: 'Lácteos La Granja',
    rating: 4.6,
    reviewCount: 28,
    category: 'Lácteos',
    isOrganic: true,
    inStock: true
  },
  {
    id: '10',
    name: 'Ensalada Mixta Orgánica',
    price: 4.20,
    image: 'https://images.unsplash.com/photo-1703876087121-50a1c0a00e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwdmVnZXRhYmxlcyUyMG9yZ2FuaWN8ZW58MXx8fHwxNzU4NTkzNjgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1703876087121-50a1c0a00e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwdmVnZXRhYmxlcyUyMG9yZ2FuaWN8ZW58MXx8fHwxNzU4NTkzNjgzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    business: 'Verdulería La Plaza',
    rating: 4.5,
    reviewCount: 19,
    category: 'Frutas y Verduras',
    isOrganic: true,
    inStock: true,
    isNew: true
  },
  {
    id: '11',
    name: 'Helado Artesanal Dulce de Leche (1L)',
    price: 8.50,
    originalPrice: 10.00,
    image: 'https://images.unsplash.com/photo-1739644270791-55b3a7d2e8e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMGRlc3NlcnQlMjBzaG9wfGVufDF8fHx8MTc1ODU5MzY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1739644270791-55b3a7d2e8e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMGRlc3NlcnQlMjBzaG9wfGVufDF8fHx8MTc1ODU5MzY4N3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    business: 'Heladería Dulce',
    rating: 4.8,
    reviewCount: 92,
    category: 'Postres',
    inStock: true,
    isHot: true
  },
  {
    id: '12',
    name: 'Paracetamol 500mg (20 comp)',
    price: 3.20,
    image: 'https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMG1lZGljaW5lcyUyMHBpbGxzfGVufDF8fHx8MTc1ODUwODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMG1lZGljaW5lcyUyMHBpbGxzfGVufDF8fHx8MTc1ODUwODc1MXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    business: 'Farmacia Salud',
    rating: 4.7,
    reviewCount: 15,
    category: 'Farmacia',
    inStock: true
  }
];

interface FeaturedProductsProps {
  onAddToCart: (product: Product) => void;
}

export function FeaturedProducts({ onAddToCart }: FeaturedProductsProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [randomizedProducts, setRandomizedProducts] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});

  // Randomizar productos al cargar la página
  useEffect(() => {
    const shuffled = [...mockProducts].sort(() => Math.random() - 0.5);
    setRandomizedProducts(shuffled);
  }, []);

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const handleImageHover = (productId: string, imageIndex: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: imageIndex
    }));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              🔥 Productos que ESTÁN ARRASANDO
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Los productos más populares y frescos de nuestros comercios locales. 
              <span className="font-semibold text-red-600"> ¡Descubre por qué todos hablan de ellos!</span>
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                Más Vendidos
              </Badge>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Productos Nuevos
              </Badge>
              <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 text-sm">
                <Flame className="w-4 h-4 mr-2" />
                Súper Hot
              </Badge>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {randomizedProducts.map((product) => {
              const currentImage = currentImageIndex[product.id] || 0;
              
              return (
                <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-orange-300 transform hover:-translate-y-3">
                  <CardContent className="p-0">
                    {/* Image with Gallery Effect */}
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={product.images[currentImage]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                      
                      {/* Hover zones for image navigation */}
                      {product.images.length > 1 && (
                        <div className="absolute inset-0 grid grid-cols-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          {[0, 1, 2].map((zone) => (
                            <div
                              key={zone}
                              className="cursor-pointer"
                              onMouseEnter={() => {
                                const imageIndex = Math.min(zone, product.images.length - 1);
                                handleImageHover(product.id, imageIndex);
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Image dots indicator */}
                      {product.images.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                          {product.images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentImage ? 'bg-white scale-125' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Badges Stack */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.originalPrice && (
                          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-xs px-2 py-1 shadow-lg">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </Badge>
                        )}
                        {product.isHot && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xs px-2 py-1 animate-pulse shadow-lg">
                            <Flame className="w-3 h-3 mr-1" />
                            HOT
                          </Badge>
                        )}
                        {product.isNew && (
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-xs px-2 py-1 shadow-lg">
                            <Sparkles className="w-3 h-3 mr-1" />
                            NUEVO
                          </Badge>
                        )}
                        {product.isOrganic && (
                          <Badge variant="secondary" className="text-xs px-2 py-1 bg-green-100 text-green-700 border border-green-200">
                            🌱 Orgánico
                          </Badge>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 p-1 h-8 w-8 bg-white/80 hover:bg-white rounded-full shadow-lg"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart 
                          className={`w-4 h-4 ${
                            favorites.has(product.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-500'
                          }`} 
                        />
                      </Button>

                      {/* Stock Status Overlay */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Badge variant="outline" className="bg-white text-red-600 border-red-200 font-bold">
                            Sin Stock
                          </Badge>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-3 space-y-3">
                      <div className="space-y-1">
                        <p className="text-xs text-orange-600 font-medium">{product.business}</p>
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-semibold">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviewCount})</span>
                      </div>

                      {/* Price */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-lg font-bold text-green-600">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        {product.originalPrice && (
                          <p className="text-xs text-green-600 font-medium text-center">
                            ¡Ahorras ${(product.originalPrice - product.price).toFixed(2)}!
                          </p>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <Button
                        size="sm"
                        className="w-full h-9 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                        disabled={!product.inStock}
                        onClick={() => onAddToCart(product)}
                      >
                        {product.inStock ? (
                          <>
                            <Plus className="w-4 h-4 mr-1" />
                            ¡AGREGAR!
                          </>
                        ) : (
                          'Sin Stock'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* View All Products */}
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              className="bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 text-orange-700 hover:from-orange-200 hover:to-red-200 px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Crown className="w-5 h-5 mr-2" />
              Ver TODOS los productos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}