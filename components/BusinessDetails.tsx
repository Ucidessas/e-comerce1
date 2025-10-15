import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from './ui/drawer';
import { ProductDetails } from './ProductDetails';
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Heart,
  Award,
  Truck,
  Shield,
  CheckCircle,
  Plus,
  X,
  ChevronRight,
  Zap,
  Eye
} from 'lucide-react';
import { getProductsByBusiness, type Business, type Product } from '../data/database';

interface BusinessDetailsProps {
  business: Business;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function BusinessDetails({ business, isOpen, onClose, onAddToCart }: BusinessDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Obtener productos del negocio desde la base de datos unificada
  const businessProducts = getProductsByBusiness(business.id);

  const handleWhatsAppContact = () => {
    const message = `Hola ${business.name}, vi su negocio en LocalMarket y me gustaría conocer más sobre sus productos y servicios.`;
    const url = `https://wa.me/${business.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleProductWhatsApp = (product: Product) => {
    const message = `Hola ${business.name}, me interesa el producto "${product.name}" que vi en LocalMarket. ¿Podrían darme más información?`;
    const url = `https://wa.me/${business.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="max-h-[95vh] flex flex-col">
          <DrawerHeader className="text-left border-b flex-shrink-0">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-2xl font-bold text-gray-800">
                {business.name}
              </DrawerTitle>
              <DrawerClose>
                <Button variant="ghost" size="sm">
                  <X className="w-5 h-5" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          
          <div className="overflow-y-auto flex-1 min-h-0 p-6 pb-8 space-y-8">
            {/* Business Gallery */}
            <div className="space-y-4">
              <div className="h-64 rounded-2xl overflow-hidden shadow-lg">
                <ImageWithFallback
                  src={business.images[selectedImageIndex]}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {business.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {business.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-blue-500 transform scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${business.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Business Info */}
            <div className="space-y-6">
              {/* Header Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h1 className="text-3xl font-bold text-gray-800">{business.name}</h1>
                      <Badge variant={business.isOpen ? "default" : "secondary"} className="font-medium">
                        {business.isOpen ? '🟢 Abierto' : '🔴 Cerrado'}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-base">
                      {business.category}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Heart className="w-6 h-6" />
                  </Button>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold text-gray-800">{business.rating}</span>
                    <span className="text-gray-600">({business.reviewCount} reseñas)</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    <Award className="w-3 h-3 mr-1" />
                    Verificado
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-lg leading-relaxed">
                  {business.longDescription || business.description}
                </p>
              </div>

              {/* Key Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-blue-100">
                  <CardContent className="p-4 text-center space-y-2">
                    <MapPin className="w-6 h-6 text-blue-600 mx-auto" />
                    <div className="text-sm text-gray-600">Distancia</div>
                    <div className="font-bold text-gray-800">{business.distance}</div>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-green-100">
                  <CardContent className="p-4 text-center space-y-2">
                    <Truck className="w-6 h-6 text-green-600 mx-auto" />
                    <div className="text-sm text-gray-600">Entrega</div>
                    <div className="font-bold text-gray-800">{business.deliveryTime}</div>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-purple-100">
                  <CardContent className="p-4 text-center space-y-2">
                    <Clock className="w-6 h-6 text-purple-600 mx-auto" />
                    <div className="text-sm text-gray-600">Horario</div>
                    <div className="font-bold text-gray-800">{business.hours || '6:00 AM - 8:00 PM'}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-800">Características</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Shield, label: 'Productos Frescos', color: 'text-green-600' },
                    { icon: Award, label: 'Calidad Garantizada', color: 'text-blue-600' },
                    { icon: Truck, label: 'Delivery Rápido', color: 'text-purple-600' },
                    { icon: CheckCircle, label: 'Precios Justos', color: 'text-orange-600' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                      <span className="text-gray-700 font-medium">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Actions */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-800">Contacto</h3>
                <div className="flex gap-3">
                  <Button
                    onClick={handleWhatsAppContact}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="px-6 border-2 border-blue-500 text-blue-700 hover:bg-blue-50 rounded-xl"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Ubicación
                  </Button>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  📍 {business.address || 'Dirección disponible por WhatsApp'}
                </p>
              </div>

              {/* Products Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">
                    Productos ({businessProducts.length})
                  </h3>
                  <Badge variant="secondary">
                    {businessProducts.filter(p => p.inStock).length} disponibles
                  </Badge>
                </div>
                
                {businessProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {businessProducts.map((product) => (
                      <Card key={product.id} className="group border-2 hover:border-blue-300 transition-all duration-300">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex gap-3">
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <ImageWithFallback
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            
                            <div className="flex-1 space-y-2">
                              <div className="space-y-1">
                                <h4 className="font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                  {product.name}
                                </h4>
                                <p className="text-sm text-gray-600 line-clamp-1">
                                  {product.description}
                                </p>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-bold text-green-600">
                                    ${product.price.toFixed(2)}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-sm text-gray-400 line-through">
                                      ${product.originalPrice.toFixed(2)}
                                    </span>
                                  )}
                                </div>
                                
                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedProduct(product)}
                                    className="p-2 hover:bg-blue-50 text-blue-600"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => onAddToCart(product)}
                                    disabled={!product.inStock}
                                    className="px-3 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Product badges */}
                              <div className="flex gap-1 flex-wrap">
                                {product.isOrganic && (
                                  <Badge className="text-xs bg-green-100 text-green-800">Orgánico</Badge>
                                )}
                                {product.discount && (
                                  <Badge className="text-xs bg-red-100 text-red-800">-{product.discount}%</Badge>
                                )}
                                {product.isNew && (
                                  <Badge className="text-xs bg-blue-100 text-blue-800">Nuevo</Badge>
                                )}
                                {!product.inStock && (
                                  <Badge className="text-xs bg-gray-100 text-gray-800">Agotado</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Zap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No hay productos disponibles en este momento</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
          onWhatsApp={() => handleProductWhatsApp(selectedProduct)}
        />
      )}
    </>
  );
}