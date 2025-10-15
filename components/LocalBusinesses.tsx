import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { BusinessDetails } from './BusinessDetails';
import { Star, Clock, MapPin, MessageCircle, Eye, Zap, Heart, Sparkles, Crown, Gift } from 'lucide-react';
import { businesses, getProductsByBusiness, getCategories, type Business } from '../data/database';

interface LocalBusinessesProps {
  onAddToCart: (item: any) => void;
}

export function LocalBusinesses({ onAddToCart }: LocalBusinessesProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [randomizedBusinesses, setRandomizedBusinesses] = useState<Business[]>([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  
  const categories = getCategories();
  
  // Randomizar comercios al cargar y cambiar filtros
  useEffect(() => {
    let filtered = selectedCategory === 'Todos' 
      ? businesses 
      : businesses.filter(business => business.category === selectedCategory);
    
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setRandomizedBusinesses(shuffled);
  }, [selectedCategory]);

  const handleViewBusiness = (businessId: string) => {
    setSelectedBusinessId(businessId);
  };

  const handleWhatsAppContact = (business: Business) => {
    const message = `Hola ${business.name}, vi tu negocio en LocalMarket y me gustaría conocer más sobre tus productos y servicios.`;
    const url = `https://wa.me/${business.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const selectedBusiness = selectedBusinessId ? businesses.find(b => b.id === selectedBusinessId) : null;

  return (
    <>
      <section id="local-businesses" className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  🏪 Comercios Locales Cerca de Ti
                </h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Descubre negocios únicos en tu barrio. Cada comercio tiene su propia historia y productos especiales esperándote.
                  <span className="font-semibold text-blue-600"> ¡Apoya a tu comunidad local!</span>
                </p>
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
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg transform scale-105'
                      : 'border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 hover:scale-105'
                  }`}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  {category}
                </Button>
              ))}
            </div>

            {/* Business Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {randomizedBusinesses.map((business, index) => {
                const products = getProductsByBusiness(business.id);
                return (
                  <Card key={business.id} className="group overflow-hidden border-2 hover:border-blue-300 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <div className="relative">
                      {/* Business Image */}
                      <div className="h-48 overflow-hidden">
                        <ImageWithFallback
                          src={business.image}
                          alt={business.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {business.isPromoted && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold px-3 py-1 shadow-lg">
                            <Crown className="w-3 h-3 mr-1" />
                            Destacado
                          </Badge>
                        )}
                        {business.isNew && (
                          <Badge className="bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold px-3 py-1 shadow-lg">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Nuevo
                          </Badge>
                        )}
                      </div>

                      {/* Status */}
                      <div className="absolute top-3 right-3">
                        <Badge variant={business.isOpen ? "default" : "secondary"} className="font-medium shadow-lg">
                          {business.isOpen ? '🟢 Abierto' : '🔴 Cerrado'}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-4">
                      {/* Business Info */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                              {business.name}
                            </h3>
                            <Badge variant="outline" className="text-sm">
                              {business.category}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Heart className="w-5 h-5" />
                          </Button>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-2">
                          {business.description}
                        </p>

                        {/* Rating & Reviews */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-gray-800">{business.rating}</span>
                            <span className="text-sm text-gray-500">({business.reviewCount})</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {products.length} productos
                          </Badge>
                        </div>

                        {/* Location & Delivery */}
                        <div className="flex justify-between text-sm bg-blue-50 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-gray-700">{business.distance}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-gray-700">{business.deliveryTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => handleViewBusiness(business.id)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver Tienda
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleWhatsAppContact(business)}
                          className="px-4 border-2 border-green-500 text-green-700 hover:bg-green-50 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Statistics */}
            <div className="text-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 border-2 border-blue-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-blue-600">{businesses.length}</div>
                  <div className="text-sm text-gray-600">Comercios registrados</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-purple-600">
                    {businesses.filter(b => b.isOpen).length}
                  </div>
                  <div className="text-sm text-gray-600">Abiertos ahora</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Details Modal */}
      {selectedBusiness && (
        <BusinessDetails
          business={selectedBusiness}
          isOpen={!!selectedBusinessId}
          onClose={() => setSelectedBusinessId(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
}