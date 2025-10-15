import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Star, Clock, MapPin, ShoppingCart, X, TrendingUp, Zap } from 'lucide-react';
import { products, businesses, type Product, type Business } from '../data/database';

interface SearchResultsProps {
  query: string;
  onAddToCart: (item: any) => void;
  onClose: () => void;
}

export function SearchResults({ query, onAddToCart, onClose }: SearchResultsProps) {
  if (!query.trim()) return null;

  const searchLower = query.toLowerCase();

  // Buscar productos
  const matchingProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchLower) ||
    product.description.toLowerCase().includes(searchLower) ||
    product.category.toLowerCase().includes(searchLower) ||
    product.business.toLowerCase().includes(searchLower)
  );

  // Buscar comercios
  const matchingBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchLower) ||
    business.category.toLowerCase().includes(searchLower) ||
    business.description.toLowerCase().includes(searchLower)
  );

  const hasResults = matchingProducts.length > 0 || matchingBusinesses.length > 0;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl">
            {/* Header */}
            <div className="border-b p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-medium">Resultados de búsqueda</h2>
                <p className="text-muted-foreground mt-1">
                  Buscando: "<span className="font-medium text-foreground">{query}</span>"
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6">
              {!hasResults ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No se encontraron resultados</h3>
                  <p className="text-muted-foreground">
                    Intenta con otros términos de búsqueda
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Comercios encontrados */}
                  {matchingBusinesses.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        Comercios ({matchingBusinesses.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {matchingBusinesses.map((business) => (
                          <Card key={business.id} className="overflow-hidden hover:shadow-lg transition-all">
                            <div className="relative h-48">
                              <ImageWithFallback
                                src={business.image}
                                alt={business.name}
                                className="w-full h-full object-cover"
                              />
                              {business.isPromoted && (
                                <Badge className="absolute top-2 right-2 bg-yellow-500">
                                  <Zap className="w-3 h-3 mr-1" />
                                  Destacado
                                </Badge>
                              )}
                              {business.isNew && (
                                <Badge className="absolute top-2 left-2 bg-green-500">
                                  Nuevo
                                </Badge>
                              )}
                            </div>
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-medium">{business.name}</h4>
                                  <p className="text-sm text-muted-foreground">{business.category}</p>
                                </div>

                                <div className="flex items-center gap-4 text-sm">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium">{business.rating}</span>
                                    <span className="text-muted-foreground">({business.reviewCount})</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    <span>{business.deliveryTime}</span>
                                  </div>
                                </div>

                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {business.description}
                                </p>

                                <Button 
                                  className="w-full"
                                  onClick={() => {
                                    onClose();
                                    setTimeout(() => {
                                      const section = document.getElementById('local-businesses');
                                      if (section) {
                                        section.scrollIntoView({ behavior: 'smooth' });
                                      }
                                    }, 100);
                                  }}
                                >
                                  Ver comercio
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Productos encontrados */}
                  {matchingProducts.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-primary" />
                        Productos ({matchingProducts.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {matchingProducts.map((product) => (
                          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all group">
                            <div className="relative h-48">
                              <ImageWithFallback
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              {product.discount && (
                                <Badge className="absolute top-2 right-2 bg-red-500">
                                  -{product.discount}%
                                </Badge>
                              )}
                              {product.isFlashSale && (
                                <Badge className="absolute top-2 left-2 bg-orange-500 animate-pulse">
                                  <Zap className="w-3 h-3 mr-1" />
                                  Flash
                                </Badge>
                              )}
                              {product.isHot && (
                                <Badge className="absolute top-2 left-2 bg-red-500">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Hot
                                </Badge>
                              )}
                            </div>
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                <div>
                                  <h4 className="font-medium line-clamp-1">{product.name}</h4>
                                  <p className="text-sm text-muted-foreground">{product.business}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-medium">
                                    ${product.price.toFixed(2)}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-sm text-muted-foreground line-through">
                                      ${product.originalPrice.toFixed(2)}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span>{product.rating}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{product.distance}</span>
                                  </div>
                                </div>

                                <Button 
                                  className="w-full"
                                  onClick={() => {
                                    onAddToCart(product);
                                    onClose();
                                  }}
                                  disabled={!product.inStock}
                                >
                                  {product.inStock ? (
                                    <>
                                      <ShoppingCart className="w-4 h-4 mr-2" />
                                      Agregar al carrito
                                    </>
                                  ) : (
                                    'Agotado'
                                  )}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
