import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
import { motion } from 'motion/react';
import { 
  Star, 
  Heart,
  Plus,
  X,
  Zap,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShoppingCart,
  Package,
  Truck,
  Shield,
  Award,
  Clock,
  MapPin,
  Info,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Camera,
  Users,
  Leaf
} from 'lucide-react';
import { type Product } from '../data/database';

interface ProductDetailsProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onWhatsApp?: () => void;
}

export function ProductDetails({ product, isOpen, onClose, onAddToCart, onWhatsApp }: ProductDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] flex flex-col p-0 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        {/* Header con gradiente dinámico */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white p-6"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/20 p-3 rounded-full backdrop-blur-sm"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <div>
                <DialogTitle className="text-2xl font-bold">
                  {product.name}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-white/20 text-white border-white/30">
                    {product.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                    <span className="font-medium">{product.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            <DialogClose>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <X className="w-5 h-5" />
              </Button>
            </DialogClose>
          </div>
        </motion.div>
        
        <div className="overflow-y-auto flex-1 min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            {/* Galería de imágenes - Columnas 1-3 */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 bg-white"
            >
              <div className="p-6 space-y-4">
                {/* Imagen principal con efectos */}
                <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 group">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={product.images[currentImageIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </motion.div>
                  
                  {/* Overlay con gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Controles de navegación mejorados */}
                  {product.images.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 backdrop-blur-sm transition-all"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 backdrop-blur-sm transition-all"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                      </motion.button>
                    </>
                  )}

                  {/* Badges dinámicos con animaciones */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.discount && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold shadow-lg animate-pulse">
                          <Zap className="w-3 h-3 mr-1" />
                          -{product.discount}%
                        </Badge>
                      </motion.div>
                    )}
                    {product.isOrganic && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg">
                          <Leaf className="w-3 h-3 mr-1" />
                          Orgánico
                        </Badge>
                      </motion.div>
                    )}
                    {product.isNew && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Nuevo
                        </Badge>
                      </motion.div>
                    )}
                    {product.isFlashSale && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg animate-bounce">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Flash Sale
                        </Badge>
                      </motion.div>
                    )}
                  </div>

                  {/* Botón favorito mejorado */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`absolute top-4 right-4 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 backdrop-blur-sm transition-all ${
                      isFavorite ? 'text-red-500' : 'text-gray-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </motion.button>

                  {/* Indicador de imagen actual */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {product.images.map((_, index) => (
                        <motion.button
                          key={index}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: currentImageIndex === index ? 1.2 : 1 }}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentImageIndex === index
                              ? 'bg-white shadow-lg'
                              : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Miniaturas mejoradas */}
                {product.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-3 transition-all shadow-md ${
                          currentImageIndex === index
                            ? 'border-purple-500 ring-2 ring-purple-200'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Panel de información - Columnas 4-5 */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-gradient-to-br from-white to-gray-50 border-l border-gray-200"
            >
              <div className="p-6 space-y-6">
                {/* Información del negocio con estilo */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border border-blue-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <ImageWithFallback
                        src={product.businessImage}
                        alt={product.business}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{product.business}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        {product.distance}
                        <Clock className="w-3 h-3 ml-1" />
                        {product.deliveryTime}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Precio con animación llamativa */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-bold text-green-600">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xl text-gray-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {product.originalPrice && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium inline-block"
                      >
                        💰 Ahorras ${(product.originalPrice - product.price).toFixed(2)}
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Rating visual mejorado */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <div>
                      <span className="font-bold text-gray-800">{product.rating}</span>
                      <div className="text-sm text-gray-600">
                        <Users className="w-3 h-3 inline mr-1" />
                        {product.reviewCount} reseñas
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Status badges dinámicos */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-2 flex-wrap"
                >
                  <Badge
                    className={`text-sm font-medium px-3 py-2 shadow-md ${
                      product.inStock
                        ? 'bg-green-100 text-green-800 border-green-200'
                        : 'bg-red-100 text-red-800 border-red-200'
                    }`}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {product.inStock ? 'Disponible' : 'Agotado'}
                  </Badge>
                  <Badge
                    className={`text-sm font-medium px-3 py-2 shadow-md ${
                      product.isOpen
                        ? 'bg-blue-100 text-blue-800 border-blue-200'
                        : 'bg-gray-100 text-gray-800 border-gray-200'
                    }`}
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {product.isOpen ? 'Abierto' : 'Cerrado'}
                  </Badge>
                </motion.div>

                {/* Tabs interactivos para descripción */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1">
                      <TabsTrigger value="overview" className="rounded-lg">
                        <Info className="w-4 h-4 mr-1" />
                        Info
                      </TabsTrigger>
                      <TabsTrigger value="features" className="rounded-lg">
                        <Award className="w-4 h-4 mr-1" />
                        Features
                      </TabsTrigger>
                      <TabsTrigger value="delivery" className="rounded-lg">
                        <Truck className="w-4 h-4 mr-1" />
                        Entrega
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-4 space-y-4">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          Descripción del Producto
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="features" className="mt-4">
                      <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          Características Premium
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            { icon: Shield, text: "Calidad garantizada", color: "text-blue-600" },
                            { icon: Leaf, text: "Producto fresco", color: "text-green-600" },
                            { icon: Zap, text: "Entrega rápida", color: "text-yellow-600" },
                            { icon: Award, text: "Mejor precio", color: "text-purple-600" }
                          ].map((feature, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + index * 0.1 }}
                              className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm"
                            >
                              <feature.icon className={`w-5 h-5 ${feature.color}`} />
                              <span className="text-gray-700 font-medium">{feature.text}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="delivery" className="mt-4">
                      <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Truck className="w-4 h-4" />
                          Información de Entrega
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <div>
                              <div className="font-medium text-gray-800">Tiempo estimado</div>
                              <div className="text-sm text-gray-600">{product.deliveryTime}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                            <MapPin className="w-5 h-5 text-green-600" />
                            <div>
                              <div className="font-medium text-gray-800">Distancia</div>
                              <div className="text-sm text-gray-600">{product.distance}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </motion.div>

                {/* Action Buttons con efectos especiales */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-3 pt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={!product.inStock || !product.isOpen}
                    className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 hover:from-violet-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="relative flex items-center justify-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      {!product.inStock ? 'Producto Agotado' : !product.isOpen ? 'Negocio Cerrado' : 'Agregar al Carrito'}
                    </div>
                  </motion.button>
                  
                  {onWhatsApp && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onWhatsApp}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-all duration-300 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <div className="relative flex items-center justify-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Consultar por WhatsApp
                      </div>
                    </motion.button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}