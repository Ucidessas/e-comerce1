import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ProductDetails } from './ProductDetails';
import { 
  Search, 
  TrendingUp, 
  Zap, 
  Star, 
  MapPin, 
  Clock, 
  Timer,
  Plus,
  Heart,
  Sparkles,
  Flame,
  Crown,
  Filter,
  Eye
} from 'lucide-react';
import { products, getPromotionProducts, getTrendingProducts, searchProducts, getCategories, type Product } from '../data/database';

// Convertir Product a DealItem compatible
const convertProductToDeal = (product: Product): DealItem => ({
  ...product,
  title: product.name,
  finalPrice: product.price,
  validUntil: product.type === 'promotion' ? '23:59 hoy' : undefined
});

type DealItem = Product & {
  title: string;
  finalPrice: number;
  validUntil?: string;
};

interface DealsAndTrendingProps {
  onAddToCart: (item: DealItem) => void;
}

export function DealsAndTrending({ onAddToCart }: DealsAndTrendingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'promociones' | 'trending'>('promociones');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedDeal, setSelectedDeal] = useState<DealItem | null>(null);
  const [randomizedDeals, setRandomizedDeals] = useState<DealItem[]>([]);

  const categories = getCategories();

  // Obtener datos desde la base de datos unificada
  const promotionProducts = getPromotionProducts().map(convertProductToDeal);
  const trendingProducts = getTrendingProducts().map(convertProductToDeal);
  
  const allDeals = activeTab === 'promociones' ? promotionProducts : trendingProducts;

  // Randomizar productos al cargar y cambiar filtros
  useEffect(() => {
    let filtered = selectedCategory === 'Todos' 
      ? allDeals 
      : allDeals.filter(deal => deal.category === selectedCategory);
    
    if (searchQuery.trim()) {
      const searchResults = searchProducts(searchQuery).map(convertProductToDeal);
      filtered = filtered.filter(deal => 
        searchResults.some(result => result.id === deal.id)
      );
    }
    
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setRandomizedDeals(shuffled);
  }, [activeTab, selectedCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);
  };

  const handleWhatsAppContact = (deal: DealItem) => {
    const message = `Hola ${deal.business}, vi la oferta de "${deal.title}" en LocalMarket y me gustaría obtener más información.`;
    const url = `https://wa.me/${deal.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const getBadgeForDeal = (deal: DealItem) => {
    if (deal.isFlashSale) return { label: 'OFERTA FLASH', class: 'bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse' };
    if (deal.isExclusive) return { label: 'EXCLUSIVO', class: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' };
    if (deal.isHot) return { label: 'TRENDING', class: 'bg-gradient-to-r from-green-500 to-blue-500 text-white' };
    if (deal.isNew) return { label: 'NUEVO', class: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' };
    if (deal.isOrganic) return { label: 'ORGÁNICO', class: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' };
    return null;
  };

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  🔥 Ofertas que NO te Puedes Perder
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Descubre las mejores promociones y productos en tendencia de tu zona.
                  <span className="font-semibold text-red-600"> ¡Ofertas limitadas!</span>
                </p>
              </div>

              {/* Search Bar */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Buscar ofertas..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-12 pr-4 py-3 w-full border-2 border-red-200 rounded-2xl focus:border-red-400 focus:ring-red-300 text-lg"
                  />
                  {isSearching && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSearch('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Tab Selector */}
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl p-2 shadow-lg border-2 border-gray-200">
                <div className="flex gap-2">
                  <Button
                    variant={activeTab === 'promociones' ? "default" : "outline"}
                    size="lg"
                    onClick={() => setActiveTab('promociones')}
                    className={`rounded-xl px-6 py-3 transition-all duration-300 ${
                      activeTab === 'promociones'
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                        : 'border-red-200 text-red-700 hover:bg-red-50'
                    }`}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Promociones ({promotionProducts.length})
                  </Button>
                  <Button
                    variant={activeTab === 'trending' ? "default" : "outline"}
                    size="lg"
                    onClick={() => setActiveTab('trending')}
                    className={`rounded-xl px-6 py-3 transition-all duration-300 ${
                      activeTab === 'trending'
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                        : 'border-green-200 text-green-700 hover:bg-green-50'
                    }`}
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Trending ({trendingProducts.length})
                  </Button>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'border-purple-200 text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  <Filter className="w-3 h-3 mr-1" />
                  {category}
                </Button>
              ))}
            </div>

            {/* Deals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {randomizedDeals.map((deal, index) => {
                const badge = getBadgeForDeal(deal);
                return (
                  <Card key={deal.id} className="group overflow-hidden border-2 hover:border-orange-300 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <div className="relative">
                      {/* Deal Image */}
                      <div className="h-48 overflow-hidden">
                        <ImageWithFallback
                          src={deal.image}
                          alt={deal.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      {/* Badge */}
                      {badge && (
                        <div className="absolute top-3 left-3">
                          <Badge className={`${badge.class} font-bold px-3 py-1 shadow-lg`}>
                            {deal.isFlashSale && <Timer className="w-3 h-3 mr-1" />}
                            {deal.isExclusive && <Crown className="w-3 h-3 mr-1" />}
                            {deal.isHot && <Flame className="w-3 h-3 mr-1" />}
                            {deal.isNew && <Sparkles className="w-3 h-3 mr-1" />}
                            {badge.label}
                          </Badge>
                        </div>
                      )}

                      {/* Status */}
                      <div className="absolute top-3 right-3">
                        <Badge variant={deal.isOpen ? "default" : "secondary"} className="font-medium shadow-lg">
                          {deal.isOpen ? '🟢 Abierto' : '🔴 Cerrado'}
                        </Badge>
                      </div>

                      {/* Discount Badge */}
                      {deal.discount && (
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold px-3 py-1 shadow-lg text-lg">
                            -{deal.discount}%
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6 space-y-4">
                      {/* Deal Info */}
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
                            {deal.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {deal.description}
                          </p>
                        </div>

                        {/* Business Info */}
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <ImageWithFallback
                            src={deal.businessImage}
                            alt={deal.business}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium text-gray-700">{deal.business}</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-green-600">${deal.finalPrice.toFixed(2)}</span>
                            {deal.originalPrice && (
                              <span className="text-lg text-gray-400 line-through">${deal.originalPrice.toFixed(2)}</span>
                            )}
                          </div>
                          {deal.validUntil && (
                            <Badge variant="outline" className="text-xs text-red-600 border-red-200">
                              Hasta {deal.validUntil}
                            </Badge>
                          )}
                        </div>

                        {/* Rating & Reviews */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-gray-800">{deal.rating}</span>
                            <span className="text-sm text-gray-500">({deal.reviewCount})</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {deal.category}
                          </Badge>
                        </div>

                        {/* Location & Delivery */}
                        <div className="flex justify-between text-sm bg-orange-50 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-orange-600" />
                            <span className="font-medium text-gray-700">{deal.distance}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-gray-700">{deal.deliveryTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => setSelectedDeal(deal)}
                          variant="outline"
                          className="px-4 border-2 border-blue-500 text-blue-700 hover:bg-blue-50 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => onAddToCart(deal)}
                          disabled={!deal.inStock || !deal.isOpen}
                          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          {!deal.inStock ? 'Agotado' : !deal.isOpen ? 'Cerrado' : 'Agregar'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Empty State */}
            {randomizedDeals.length === 0 && (
              <div className="text-center py-12">
                <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No se encontraron ofertas
                </h3>
                <p className="text-gray-500">
                  {searchQuery ? 'Intenta con otros términos de búsqueda' : 'Prueba cambiando la categoría o filtros'}
                </p>
              </div>
            )}

            {/* Statistics */}
            <div className="text-center bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 border-2 border-orange-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-orange-600">{promotionProducts.length}</div>
                  <div className="text-sm text-gray-600">Promociones activas</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-red-600">{trendingProducts.length}</div>
                  <div className="text-sm text-gray-600">Productos en tendencia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      {selectedDeal && (
        <ProductDetails
          product={selectedDeal}
          isOpen={!!selectedDeal}
          onClose={() => setSelectedDeal(null)}
          onAddToCart={onAddToCart}
          onWhatsApp={() => handleWhatsAppContact(selectedDeal)}
        />
      )}
    </>
  );
}