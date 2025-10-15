import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { 
  Search, 
  TrendingUp, 
  Zap, 
  Star, 
  MapPin, 
  Clock, 
  Percent,
  Gift,
  Timer,
  Plus
} from 'lucide-react';

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  originalPrice: number;
  finalPrice: number;
  business: string;
  image: string;
  businessImage: string;
  rating: number;
  reviewCount: number;
  distance: string;
  deliveryTime: string;
  category: string;
  validUntil: string;
  isFlashSale?: boolean;
  isExclusive?: boolean;
}

interface SearchResult {
  type: 'promotion' | 'product' | 'business';
  id: string;
  name: string;
  description: string;
  image: string;
  price?: number;
  business: string;
  rating?: number;
  category: string;
  discount?: number;
}

const mockPromotions: Promotion[] = [
  {
    id: 'promo1',
    title: '🔥 ¡OFERTA FLASH! Pan Artesanal',
    description: 'Pan integral recién horneado con descuento especial por tiempo limitado',
    discount: 40,
    originalPrice: 5.00,
    finalPrice: 3.00,
    business: 'Panadería San Miguel',
    image: 'https://images.unsplash.com/photo-1663904460424-91895028aa9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwbG9hdmVzfGVufDF8fHx8MTc1ODU4ODExN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    businessImage: 'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 156,
    distance: '0.8 km',
    deliveryTime: '15-25 min',
    category: 'Panadería',
    validUntil: '23:59 hoy',
    isFlashSale: true
  },
  {
    id: 'promo2',
    title: '💎 EXCLUSIVO: Café Premium + Croissant',
    description: 'Combo especial solo para clientes LocalMarket',
    discount: 30,
    originalPrice: 8.50,
    finalPrice: 5.95,
    business: 'Café Central',
    image: 'https://images.unsplash.com/photo-1650100458608-824a54559caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGVzcHJlc3NvfGVufDF8fHx8MTc1ODU1NzQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    businessImage: 'https://images.unsplash.com/photo-1642647916129-3909c75c0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY2FmZXxlbnwxfHx8fDE3NTg1MzcyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 203,
    distance: '0.5 km',
    deliveryTime: '10-20 min',
    category: 'Cafetería',
    validUntil: 'Mañana',
    isExclusive: true
  },
  {
    id: 'promo3',
    title: '🍎 2x1 en Frutas Orgánicas',
    description: 'Lleva 2 kilos y paga solo 1. Frutas frescas y orgánicas',
    discount: 50,
    originalPrice: 12.00,
    finalPrice: 6.00,
    business: 'Verdulería La Plaza',
    image: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    businessImage: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 89,
    distance: '1.2 km',
    deliveryTime: '20-30 min',
    category: 'Frutas y Verduras',
    validUntil: '3 días',
    isFlashSale: false
  }
];

interface SearchSectionProps {
  onAddToCart: (item: any) => void;
}

export function SearchSection({ onAddToCart }: SearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [featuredPromotions, setFeaturedPromotions] = useState<Promotion[]>([]);

  // Randomizar promociones al cargar
  useEffect(() => {
    const shuffled = [...mockPromotions].sort(() => Math.random() - 0.5);
    setFeaturedPromotions(shuffled);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simular búsqueda con delay
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          type: 'promotion',
          id: 'search-promo-1',
          name: 'Oferta Especial: ' + query,
          description: 'Descuento exclusivo encontrado para tu búsqueda',
          image: 'https://images.unsplash.com/photo-1663904460424-91895028aa9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwbG9hdmVzfGVufDF8fHx8MTc1ODU4ODExN3ww&ixlib=rb-4.1.0&q=80&w=1080',
          price: 5.99,
          business: 'Varios comercios',
          rating: 4.8,
          category: 'Oferta',
          discount: 25
        },
        {
          type: 'product',
          id: 'search-product-1',
          name: query.charAt(0).toUpperCase() + query.slice(1) + ' Premium',
          description: 'Producto de alta calidad disponible en varios comercios',
          image: 'https://images.unsplash.com/photo-1650100458608-824a54559caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGVzcHJlc3NvfGVufDF8fHx8MTc1ODU1NzQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
          price: 8.50,
          business: 'Comercios locales',
          rating: 4.6,
          category: 'Producto'
        }
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 800);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Hero Search */}
          <div className="text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                🎯 ¡Encuentra las MEJORES ofertas!
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Descubre promociones exclusivas y compara precios al instante. 
                <span className="font-semibold text-red-600"> ¡Promociones primero, ahorro siempre!</span>
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="¿Qué estás buscando? ej: pan, café, frutas..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-2 border-orange-200 focus:border-orange-500 rounded-2xl shadow-lg bg-white/90 backdrop-blur-sm"
                />
                {isSearching && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-orange-500 border-t-transparent"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-all"
                onClick={() => handleSearch('ofertas')}
              >
                <Zap className="w-5 h-5 mr-2" />
                Ver TODAS las Ofertas
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-orange-500 text-orange-700 hover:bg-orange-50 rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-all"
                onClick={() => handleSearch('promociones')}
              >
                <Gift className="w-5 h-5 mr-2" />
                Promociones Exclusivas
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-green-500 text-green-700 hover:bg-green-50 rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-all"
                onClick={() => handleSearch('descuentos')}
              >
                <Percent className="w-5 h-5 mr-2" />
                Mejores Descuentos
              </Button>
            </div>
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Resultados para "{searchQuery}"
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((result) => (
                  <Card key={result.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200">
                    <CardContent className="p-0">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                        <ImageWithFallback
                          src={result.image}
                          alt={result.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {result.discount && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-red-500 text-white font-bold text-sm px-3 py-1">
                              -{result.discount}%
                            </Badge>
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <Badge variant={result.type === 'promotion' ? 'default' : 'secondary'} className="text-xs">
                            {result.type === 'promotion' ? '🔥 OFERTA' : 'Producto'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-800 line-clamp-1">{result.name}</h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{result.description}</p>
                        </div>
                        
                        {result.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{result.rating}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          {result.price && (
                            <span className="text-lg font-bold text-green-600">${result.price}</span>
                          )}
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full px-4"
                            onClick={() => onAddToCart(result)}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Agregar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Featured Promotions - Solo mostrar si no hay búsqueda */}
          {!searchQuery && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  🔥 Promociones que NO puedes perderte
                </h3>
                <p className="text-gray-600">¡Ofertas limitadas que desaparecen rápido!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPromotions.map((promo) => (
                  <Card key={promo.id} className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-red-300 transform hover:-translate-y-2">
                    <CardContent className="p-0">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                        <ImageWithFallback
                          src={promo.image}
                          alt={promo.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Badges Stack */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          <Badge className="bg-red-500 text-white font-bold text-sm px-3 py-1 shadow-lg">
                            -{promo.discount}% OFF
                          </Badge>
                          {promo.isFlashSale && (
                            <Badge className="bg-orange-500 text-white font-bold text-xs px-2 py-1 animate-pulse">
                              <Zap className="w-3 h-3 mr-1" />
                              FLASH
                            </Badge>
                          )}
                          {promo.isExclusive && (
                            <Badge className="bg-purple-500 text-white font-bold text-xs px-2 py-1">
                              <Gift className="w-3 h-3 mr-1" />
                              EXCLUSIVO
                            </Badge>
                          )}
                        </div>

                        {/* Timer */}
                        <div className="absolute top-3 right-3">
                          <Badge variant="outline" className="bg-white/90 text-red-600 border-red-200 text-xs">
                            <Timer className="w-3 h-3 mr-1" />
                            {promo.validUntil}
                          </Badge>
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <div className="p-5 space-y-4">
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg line-clamp-1">{promo.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-1">{promo.description}</p>
                        </div>
                        
                        {/* Business Info */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <ImageWithFallback
                              src={promo.businessImage}
                              alt={promo.business}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700">{promo.business}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{promo.rating}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{promo.distance}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{promo.deliveryTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="text-center py-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-center gap-3">
                            <span className="text-sm text-gray-500 line-through">${promo.originalPrice}</span>
                            <span className="text-2xl font-bold text-green-600">${promo.finalPrice}</span>
                          </div>
                          <p className="text-xs text-green-600 font-medium mt-1">
                            ¡Ahorras ${(promo.originalPrice - promo.finalPrice).toFixed(2)}!
                          </p>
                        </div>
                        
                        {/* Action Button */}
                        <Button 
                          className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-red-600 hover:from-red-600 hover:via-pink-600 hover:to-red-700 text-white font-bold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                          onClick={() => onAddToCart(promo)}
                        >
                          <Zap className="w-5 h-5 mr-2" />
                          ¡APROVECHAR AHORA!
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}