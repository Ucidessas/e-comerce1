import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Star, TrendingDown, MapPin, Clock, Plus, Search, Filter, Target, Zap, Crown, Trophy } from 'lucide-react';
import { generateProductComparisons, getCategories, type ProductComparison } from '../data/database';

// Interfaces y datos importados desde database.ts
import type { ProductOffer } from '../data/database';


interface ProductComparisonProps {
  onAddToCart: (offer: ProductOffer & { name: string; image: string; business: string }) => void;
}

export function ProductComparison({ onAddToCart }: ProductComparisonProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [randomizedProducts, setRandomizedProducts] = useState<ProductComparison[]>([]);
  const [visibleCount, setVisibleCount] = useState(6); // Mostrar 6 productos inicialmente
  const [isLoading, setIsLoading] = useState(false);
  
  const categories = getCategories();
  
  // Función para cargar más productos
  const loadMoreProducts = () => {
    setIsLoading(true);
    // Simular carga con delay
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 6, randomizedProducts.length));
      setIsLoading(false);
    }, 800);
  };
  
  // Randomizar productos al cargar y cambiar filtros
  useEffect(() => {
    const comparisons = generateProductComparisons();
    let filtered = selectedCategory === 'Todos' 
      ? comparisons 
      : comparisons.filter(product => product.category === selectedCategory);
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setRandomizedProducts(shuffled);
    setVisibleCount(6); // Reset a 6 productos cuando cambian los filtros
  }, [selectedCategory, searchQuery]);

  const handleWhatsAppContact = (offer: ProductOffer, productName: string) => {
    const message = `Hola ${offer.business}, me interesa el producto "${productName}" que vi en LocalMarket. ¿Podrían darme más información?`;
    const url = `https://wa.me/${offer.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const getBestPriceOffer = (offers: ProductOffer[]) => {
    return offers.reduce((best, current) => {
      if (!current.inStock || !current.isOpen) return best;
      return !best || current.price < best.price ? current : best;
    }, null as ProductOffer | null);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                💰 Compara y AHORRA al Máximo
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Encuentra el mejor precio para tus productos favoritos comparando entre diferentes comercios de tu zona.
                <span className="font-semibold text-green-600"> ¡Siempre el mejor precio garantizado!</span>
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Buscar producto para comparar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-base border-2 border-green-200 focus:border-green-500 rounded-xl shadow-lg bg-white"
                />
                <Button
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg px-4"
                >
                  <Target className="w-4 h-4 mr-1" />
                  Comparar
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
                size="lg"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-3 transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg transform scale-105'
                    : 'border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-400 hover:scale-105'
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>

          {/* Product Comparisons */}
          <div className="space-y-8">
            {randomizedProducts.slice(0, visibleCount).map((product, index) => {
              const bestOffer = getBestPriceOffer(product.offers);
              const sortedOffers = [...product.offers].sort((a, b) => {
                // Prioritize open and in-stock offers
                if (a.isOpen && a.inStock && (!b.isOpen || !b.inStock)) return -1;
                if (b.isOpen && b.inStock && (!a.isOpen || !a.inStock)) return 1;
                // Then sort by price
                return a.price - b.price;
              });

              return (
                <Card key={index} className="overflow-hidden border-2 hover:border-green-300 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-blue-50">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-40 h-40 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-2xl font-bold text-gray-800">{product.name}</CardTitle>
                          <Badge variant="secondary" className="px-3 py-1 text-sm">{product.category}</Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-orange-500" />
                            <span className="font-medium text-gray-700">{product.offers.length} comercios disponibles</span>
                          </div>
                          {bestOffer && (
                            <div className="flex items-center gap-2 text-green-600 bg-green-100 px-3 py-1 rounded-full">
                              <TrendingDown className="w-4 h-4" />
                              <span className="font-bold">Mejor precio: ${bestOffer.price}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600">
                          Compara precios y encuentra la mejor oferta para este producto en tu zona
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sortedOffers.map((offer, offerIndex) => {
                        const isBestPrice = bestOffer?.id === offer.id;
                        
                        return (
                          <Card key={offer.id} className={`relative transition-all duration-300 hover:shadow-xl ${
                            isBestPrice 
                              ? 'ring-4 ring-green-400 bg-gradient-to-br from-green-50 to-emerald-50 transform scale-105' 
                              : 'hover:border-green-200'
                          }`}>
                            <CardContent className="p-5">
                              {isBestPrice && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-4 py-2 shadow-lg">
                                    <Crown className="w-4 h-4 mr-1" />
                                    MEJOR PRECIO
                                  </Badge>
                                </div>
                              )}
                              
                              <div className="space-y-4">
                                {/* Business Info */}
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
                                    <ImageWithFallback
                                      src={offer.businessImage}
                                      alt={offer.business}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-bold text-gray-800">{offer.business}</h4>
                                    <div className="flex items-center gap-1">
                                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                      <span className="text-sm font-medium">{offer.rating}</span>
                                      <span className="text-xs text-gray-500">({offer.reviewCount})</span>
                                    </div>
                                  </div>
                                  <div className={`text-right ${!offer.isOpen ? 'opacity-50' : ''}`}>
                                    <Badge variant={offer.isOpen ? "default" : "secondary"} className="text-xs font-medium">
                                      {offer.isOpen ? '🟢 Abierto' : '🔴 Cerrado'}
                                    </Badge>
                                  </div>
                                </div>

                                {/* Price */}
                                <div className="text-center py-4 bg-gray-50 rounded-xl">
                                  <div className="flex items-center justify-center gap-3">
                                    <span className={`text-3xl font-bold ${
                                      isBestPrice ? 'text-green-600' : 'text-gray-800'
                                    } ${!offer.inStock || !offer.isOpen ? 'opacity-50' : ''}`}>
                                      ${offer.price}
                                    </span>
                                    {offer.originalPrice && offer.originalPrice > offer.price && (
                                      <span className="text-sm text-gray-500 line-through">
                                        ${offer.originalPrice}
                                      </span>
                                    )}
                                  </div>
                                  {offer.originalPrice && offer.originalPrice > offer.price && (
                                    <div className="text-sm text-green-600 font-bold mt-1">
                                      ¡Ahorras ${(offer.originalPrice - offer.price).toFixed(2)}!
                                    </div>
                                  )}
                                </div>

                                {/* Location & Delivery */}
                                <div className="flex justify-between text-sm bg-blue-50 rounded-lg p-3">
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-blue-600" />
                                    <span className="font-medium text-gray-700">{offer.distance}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-green-600" />
                                    <span className="font-medium text-gray-700">{offer.deliveryTime}</span>
                                  </div>
                                </div>

                                {/* Stock Status */}
                                {!offer.inStock && (
                                  <div className="text-center">
                                    <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 font-medium">
                                      Sin Stock
                                    </Badge>
                                  </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                  <Button
                                    size="sm"
                                    className={`flex-1 font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 ${
                                      isBestPrice 
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                                    }`}
                                    disabled={!offer.inStock || !offer.isOpen}
                                    onClick={() => onAddToCart({
                                      ...offer,
                                      name: product.name,
                                      image: product.image,
                                      business: offer.business
                                    })}
                                  >
                                    <Plus className="w-4 h-4 mr-1" />
                                    {offer.inStock && offer.isOpen ? 'Agregar' : 'No Disponible'}
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleWhatsAppContact(offer, product.name)}
                                    className="px-4 border-2 border-green-500 text-green-700 hover:bg-green-50 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                                  >
                                    Contactar
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Statistics */}
          <div className="text-center bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 border-2 border-green-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-green-600">{generateProductComparisons().length}</div>
                <div className="text-sm text-gray-600">Productos disponibles</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-blue-600">{visibleCount}</div>
                <div className="text-sm text-gray-600">Productos mostrados</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-purple-600">
                  {generateProductComparisons().reduce((acc, product) => acc + product.offers.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Comercios comparando</div>
              </div>
            </div>
          </div>

          {/* View More */}
          {visibleCount < randomizedProducts.length && (
            <div className="text-center space-y-4">
              <div className="text-gray-600">
                Mostrando {visibleCount} de {randomizedProducts.length} productos
              </div>
              <Button 
                variant="outline" 
                size="lg"
                onClick={loadMoreProducts}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 text-green-700 hover:from-green-200 hover:to-blue-200 px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    Cargando...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Ver más comparaciones
                  </>
                )}
              </Button>
            </div>
          )}

          {/* All products loaded message */}
          {visibleCount >= randomizedProducts.length && randomizedProducts.length > 6 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-3 bg-green-50 border-2 border-green-200 text-green-700 px-6 py-3 rounded-full">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">¡Has visto todos los productos disponibles!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}