import { useState } from 'react';
import { Button } from './ui/button';
import { MessageCircle, X, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function WhatsAppButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    const message = "Hola! Me gustaría obtener más información sobre LocalMarket y sus servicios.";
    const phoneNumber = "+1234567890"; // Número de soporte de la plataforma
    const url = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg border p-4 w-64 mb-2"
          >
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">¿Necesitas ayuda?</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Nuestro equipo está disponible para ayudarte con cualquier consulta sobre LocalMarket.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-6 w-6 flex-shrink-0"
                  onClick={() => setIsExpanded(false)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  size="sm"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chatear por WhatsApp
                </Button>
                
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Consultas sobre productos</p>
                  <p>• Soporte para comerciantes</p>
                  <p>• Ayuda con pagos</p>
                </div>
              </div>
              
              <div className="text-xs text-center text-muted-foreground">
                Tiempo de respuesta: ~2 min
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          size="sm"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isExpanded ? (
              <X className="w-6 h-6" />
            ) : (
              <MessageCircle className="w-6 h-6" />
            )}
          </motion.div>
        </Button>
      </motion.div>

      {/* Pulse animation when not expanded */}
      {!isExpanded && (
        <motion.div
          className="absolute inset-0 rounded-full bg-green-500"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      )}
    </div>
  );
}