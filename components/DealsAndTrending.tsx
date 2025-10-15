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
  Plus,
  Heart,
  Sparkles,
  Flame,
  Crown,
  Filter
} from 'lucide-react';

interface DealItem {
  id: string;
  title: string;
  description: string;
  discount?: number;
  originalPrice?: number;
  finalPrice: number;
  business: string;
  image: string;
  images: string[];
  businessImage: string;
  rating: number;
  reviewCount: number;
  distance: string;
  deliveryTime: string;
  category: string;
  validUntil?: string;
  isFlashSale?: boolean;
  isExclusive?: boolean;
  isHot?: boolean;
  isNew?: boolean;
  isOrganic?: boolean;
  inStock: boolean;
  type: 'promotion' | 'trending';
}

const mockDeals: DealItem[] = [
  {
    id: 'deal1',
    title: '🔥 OFERTA FLASH: Pan Artesanal Integral',
    description: 'Pan integral recién horneado con descuento especial por tiempo limitado',
    discount: 40,
    originalPrice: 5.00,
    finalPrice: 3.00,
    business: 'Panadería San Miguel',
    image: 'https://images.unsplash.com/photo-1663904460424-91895028aa9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwbG9hdmVzfGVufDF8fHx8MTc1ODU4ODExN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1663904460424-91895028aa9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyZWFkJTIwbG9hdmVzfGVufDF8fHx8MTc1ODU4ODExN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    businessImage: 'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 156,
    distance: '0.8 km',
    deliveryTime: '15-25 min',
    category: 'Panadería',
    validUntil: '23:59 hoy',
    isFlashSale: true,
    inStock: true,
    type: 'promotion'
  },
  {
    id: 'deal2',
    title: 'Café Premium Molido',
    description: 'El café de especialidad más vendido de la zona',
    finalPrice: 12.99,
    business: 'Café Central',
    image: 'https://images.unsplash.com/photo-1650100458608-824a54559caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGVzcHJlc3NvfGVufDF8fHx8MTc1ODU1NzQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1650100458608-824a54559caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGVzcHJlc3NvfGVufDF8fHx8MTc1ODU1NzQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1642647916129-3909c75c0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY2FmZXxlbnwxfHx8fDE3NTg1MzcyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    businessImage: 'https://images.unsplash.com/photo-1642647916129-3909c75c0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY2FmZXxlbnwxfHx8fDE3NTg1MzcyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 78,
    distance: '0.5 km',
    deliveryTime: '10-20 min',
    category: 'Bebidas',
    isHot: true,
    inStock: true,
    type: 'trending'
  },
  {
    id: 'deal3',
    title: '💎 EXCLUSIVO: Combo Café + Croissant',
    description: 'Combo especial solo para clientes LocalMarket',
    discount: 30,
    originalPrice: 8.50,
    finalPrice: 5.95,
    business: 'Café Central',
    image: 'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1650100458608-824a54559caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGVzcHJlc3NvfGVufDF8fHx8MTc1ODU1NzQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    businessImage: 'https://images.unsplash.com/photo-1642647916129-3909c75c0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY2FmZXxlbnwxfHx8fDE3NTg1MzcyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 203,
    distance: '0.5 km',
    deliveryTime: '10-20 min',
    category: 'Cafetería',
    validUntil: 'Mañana',
    isExclusive: true,
    inStock: true,
    type: 'promotion'
  },
  {
    id: 'deal4',
    title: 'Tomates Orgánicos Premium',
    description: 'Los tomates más frescos directo del campo',
    finalPrice: 6.75,
    business: 'Verdulería La Plaza',
    image: 'https://images.unsplash.com/photo-1750918061368-0c4eb884a9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc1ODU2NzA4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1750918061368-0c4eb884a9da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc1ODU2NzA4OXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    businessImage: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 32,
    distance: '1.2 km',
    deliveryTime: '20-30 min',
    category: 'Frutas y Verduras',
    isOrganic: true,
    isHot: true,
    inStock: true,
    type: 'trending'
  },
  {
    id: 'deal5',
    title: '🍎 2x1 en Frutas Orgánicas',
    description: 'Lleva 2 kilos y paga solo 1. Frutas frescas y orgánicas',
    discount: 50,
    originalPrice: 12.00,
    finalPrice: 6.00,
    business: 'Verdulería La Plaza',
    image: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    businessImage: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 89,
    distance: '1.2 km',
    deliveryTime: '20-30 min',
    category: 'Frutas y Verduras',
    validUntil: '3 días',
    isOrganic: true,
    inStock: true,
    type: 'promotion'
  },
  {
    id: 'deal6',
    title: 'Bife de Chorizo Premium',
    description: 'Corte premium que está siendo muy solicitado',
    discount: 15,
    originalPrice: 22.00,
    finalPrice: 18.70,
    business: 'Carnicería Don Juan',
    image: 'https://images.unsplash.com/photo-1630334337820-84afb05acf3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1lYXQlMjBidXRjaGVyJTIwc2hvcHxlbnwxfHx8fDE3NTg1NzI1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1630334337820-84afb05acf3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1lYXQlMjBidXRjaGVyJTIwc2hvcHxlbnwxfHx8fDE3NTg1NzI1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    businessImage: 'https://images.unsplash.com/photo-1630334337820-84afb05acf3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1lYXQlMjBidXRjaGVyJTIwc2hvcHxlbnwxfHx8fDE3NTg1NzI1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 63,
    distance: '1.5 km',
    deliveryTime: '25-35 min',
    category: 'Carnicería',
    isHot: true,
    inStock: true,
    type: 'trending'
  },
  {
    id: 'deal7',
    title: 'Helado Artesanal Dulce de Leche',
    description: 'El sabor más pedido de la heladería',
    discount: 15,
    originalPrice: 10.00,
    finalPrice: 8.50,
    business: 'Heladería Dulce',
    image: 'https://images.unsplash.com/photo-1739644270791-55b3a7d2e8e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMGRlc3NlcnQlMjBzaG9wfGVufDF8fHx8MTc1ODU5MzY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1739644270791-55b3a7d2e8e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMGRlc3NlcnQlMjBzaG9wfGVufDF8fHx8MTc1ODU5MzY4N3ww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    businessImage: 'https://images.unsplash.com/photo-1739644270791-55b3a7d2e8e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbSUyMGRlc3NlcnQlMjBzaG9wfGVufDF8fHx8MTc1ODU5MzY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 92,
    distance: '0.7 km',
    deliveryTime: '15-20 min',
    category: 'Postres',
    isHot: true,
    inStock: true,
    type: 'trending'
  },
  {
    id: 'deal8',
    title: 'Fresas Frescas Orgánicas',
    description: 'Recién llegadas de la finca, súper frescas',
    finalPrice: 5.25,
    business: 'Verdulería La Plaza',
    image: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    businessImage: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 41,
    distance: '1.2 km',
    deliveryTime: '20-30 min',
    category: 'Frutas y Verduras',
    isOrganic: true,
    isNew: true,
    inStock: true,
    type: 'trending'
  }
];

const filterOptions = ['Todos', 'Promociones', 'Trending', 'Orgánicos', 'Flash Sale'];

interface DealsAndTrendingProps {
  onAddToCart: (item: any) => void;
}

export function DealsAndTrending({ onAddToCart }: DealsAndTrendingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [randomizedDeals, setRandomizedDeals] = useState<DealItem[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Randomizar y filtrar deals
  useEffect(() => {
    let filteredDeals = [...mockDeals];

    // Aplicar filtros
    if (selectedFilter === 'Promociones') {
      filteredDeals = filteredDeals.filter(deal => deal.type === 'promotion' || deal.discount);
    } else if (selectedFilter === 'Trending') {
      filteredDeals = filteredDeals.filter(deal => deal.type === 'trending' || deal.isHot);
    } else if (selectedFilter === 'Orgánicos') {
      filteredDeals = filteredDeals.filter(deal => deal.isOrganic);
    } else if (selectedFilter === 'Flash Sale') {
      filteredDeals = filteredDeals.filter(deal => deal.isFlashSale);
    }

    // Aplicar búsqueda
    if (searchQuery) {
      filteredDeals = filteredDeals.filter(deal => 
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Randomizar y limitar
    const shuffled = filteredDeals.sort(() => Math.random() - 0.5);
    setRandomizedDeals(shuffled.slice(0, 8));
  }, [selectedFilter, searchQuery]);

  const toggleFavorite = (dealId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(dealId)) {
      newFavorites.delete(dealId);
    } else {
      newFavorites.add(dealId);
    }
    setFavorites(newFavorites);
  };

  const handleImageHover = (dealId: string, imageIndex: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [dealId]: imageIndex
    }));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(!!query);
    
    // Simular delay de búsqueda
    if (query) {
      setTimeout(() => setIsSearching(false), 500);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                🎯 Ofertas Increíbles & Productos Trending
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Descubre las mejores promociones y los productos más populares de tu zona. 
                <span className="font-semibold text-red-600"> ¡Todo en un solo lugar para ahorrar tiempo y dinero!</span>
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="¿Qué estás buscando? ej: pan, café, ofertas..."
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

            {/* Filter Badges */}
            <div className="flex flex-wrap justify-center gap-3">
              {filterOptions.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="lg"
                  onClick={() => setSelectedFilter(filter)}
                  className={`rounded-full px-6 py-3 transition-all duration-300 ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg transform scale-105'
                      : 'border-2 border-orange-500 text-orange-700 hover:bg-orange-50 hover:border-orange-600 hover:scale-105'
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {filter}
                </Button>
              ))}
            </div>

            {/* Stats Badges */}
            <div className="flex justify-center gap-4">
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                {randomizedDeals.filter(d => d.type === 'promotion').length} Ofertas Activas
              </Badge>
              <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2">
                <TrendingUp className="w-4 h-4 mr-2" />
                {randomizedDeals.filter(d => d.type === 'trending').length} Productos Hot
              </Badge>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                {randomizedDeals.filter(d => d.isOrganic).length} Orgánicos
              </Badge>
            </div>
          </div>

          {/* Deals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {randomizedDeals.map((deal) => {
              const currentImage = currentImageIndex[deal.id] || 0;
              
              return (
                <Card key={deal.id} className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-orange-300 transform hover:-translate-y-2">
                  <CardContent className="p-0">
                    {/* Image with Gallery Effect */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={deal.images[currentImage]}
                        alt={deal.title}
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                      
                      {/* Hover zones for image navigation */}
                      {deal.images.length > 1 && (
                        <div className="absolute inset-0 grid grid-cols-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          {[0, 1, 2].map((zone) => (
                            <div
                              key={zone}
                              className="cursor-pointer"
                              onMouseEnter={() => {
                                const imageIndex = Math.min(zone, deal.images.length - 1);
                                handleImageHover(deal.id, imageIndex);
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Image dots indicator */}
                      {deal.images.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                          {deal.images.map((_, index) => (
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
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {deal.discount && (
                          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-sm px-3 py-1 shadow-lg">
                            -{deal.discount}% OFF
                          </Badge>
                        )}
                        {deal.isFlashSale && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xs px-2 py-1 animate-pulse shadow-lg">
                            <Zap className="w-3 h-3 mr-1" />
                            FLASH
                          </Badge>
                        )}
                        {deal.isExclusive && (
                          <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-xs px-2 py-1 shadow-lg">
                            <Crown className="w-3 h-3 mr-1" />
                            EXCLUSIVO
                          </Badge>
                        )}
                        {deal.isHot && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xs px-2 py-1 shadow-lg">
                            <Flame className="w-3 h-3 mr-1" />
                            HOT
                          </Badge>
                        )}
                        {deal.isNew && (
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-xs px-2 py-1 shadow-lg">
                            <Sparkles className="w-3 h-3 mr-1" />
                            NUEVO
                          </Badge>
                        )}
                        {deal.isOrganic && (
                          <Badge variant="secondary" className="text-xs px-2 py-1 bg-green-100 text-green-700 border border-green-200 shadow-lg">
                            🌱 Orgánico
                          </Badge>
                        )}
                      </div>

                      {/* Timer for flash sales */}
                      {deal.validUntil && (
                        <div className="absolute top-3 right-3">
                          <Badge variant="outline" className="bg-white/90 text-red-600 border-red-200 text-xs font-bold shadow-lg">
                            <Timer className="w-3 h-3 mr-1" />
                            {deal.validUntil}
                          </Badge>
                        </div>
                      )}

                      {/* Type indicator */}
                      {!deal.validUntil && (
                        <div className="absolute top-3 right-3">
                          <Badge 
                            variant="outline" 
                            className={`text-xs font-bold shadow-lg ${
                              deal.type === 'promotion' 
                                ? 'bg-red-100 text-red-700 border-red-200' 
                                : 'bg-orange-100 text-orange-700 border-orange-200'
                            }`}
                          >
                            {deal.type === 'promotion' ? '🔥 OFERTA' : '📈 TRENDING'}
                          </Badge>
                        </div>
                      )}

                      {/* Favorite Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute bottom-3 right-3 p-2 h-9 w-9 bg-white/80 hover:bg-white shadow-lg rounded-full"
                        onClick={() => toggleFavorite(deal.id)}
                      >
                        <Heart 
                          className={`w-4 h-4 ${
                            favorites.has(deal.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-500'
                          }`} 
                        />
                      </Button>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Content */}
                    <div className="p-5 space-y-4">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg line-clamp-1">{deal.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{deal.description}</p>
                      </div>
                      
                      {/* Business Info */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <ImageWithFallback
                            src={deal.businessImage}
                            alt={deal.business}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">{deal.business}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{deal.rating}</span>
                              <span>({deal.reviewCount})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{deal.distance}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{deal.deliveryTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-center gap-3">
                          {deal.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
                          )}
                          <span className="text-2xl font-bold text-green-600">${deal.finalPrice}</span>
                        </div>
                        {deal.originalPrice && (
                          <p className="text-xs text-green-600 font-medium text-center mt-1">
                            ¡Ahorras ${(deal.originalPrice - deal.finalPrice).toFixed(2)}!
                          </p>
                        )}
                      </div>
                      
                      {/* Action Button */}
                      <Button 
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                        disabled={!deal.inStock}
                        onClick={() => onAddToCart(deal)}
                      >
                        {deal.inStock ? (
                          <>
                            <Plus className="w-5 h-5 mr-2" />
                            {deal.type === 'promotion' ? '¡APROVECHAR!' : '¡AGREGAR!'}
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

          {/* View More */}
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              className="bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 text-orange-700 hover:from-orange-200 hover:to-red-200 px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Gift className="w-5 h-5 mr-2" />
              Ver TODAS las ofertas y productos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}