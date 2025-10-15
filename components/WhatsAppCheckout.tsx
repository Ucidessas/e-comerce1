import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MessageCircle, MapPin, Clock, Shield, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  business: string;
  quantity: number;
}

interface CustomerData {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

interface WhatsAppCheckoutProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onOrderComplete: () => void;
}

export function WhatsAppCheckout({ 
  isOpen, 
  onOpenChange, 
  items, 
  onOrderComplete 
}: WhatsAppCheckoutProps) {
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'form' | 'confirmation' | 'success'>('form');

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 20 ? 0 : 2.50;
  const total = subtotal + deliveryFee;

  // Agrupar items por negocio
  const groupedByBusiness = items.reduce((groups, item) => {
    if (!groups[item.business]) {
      groups[item.business] = [];
    }
    groups[item.business].push(item);
    return groups;
  }, {} as Record<string, CartItem[]>);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerData.name || !customerData.phone || !customerData.address) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }
    setStep('confirmation');
  };

  const generateWhatsAppMessage = (business: string, businessItems: CartItem[]) => {
    const businessTotal = businessItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let message = `🛒 *NUEVO PEDIDO - LocalMarket*\n\n`;
    message += `👤 *Cliente:* ${customerData.name}\n`;
    message += `📱 *Teléfono:* ${customerData.phone}\n`;
    message += `📍 *Dirección:* ${customerData.address}\n\n`;
    
    message += `🏪 *Negocio:* ${business}\n\n`;
    message += `📋 *Productos:*\n`;
    
    businessItems.forEach(item => {
      message += `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n💰 *Total del negocio:* $${businessTotal.toFixed(2)}\n`;
    
    if (customerData.notes) {
      message += `\n📝 *Notas:* ${customerData.notes}\n`;
    }
    
    message += `\n✅ *Este pedido fue realizado a través de LocalMarket*\n`;
    message += `⏰ *Hora del pedido:* ${new Date().toLocaleString('es-AR')}`;
    
    return message;
  };

  const confirmOrder = async () => {
    setIsProcessing(true);

    try {
      // Enviar pedido a cada negocio por separado
      const businessPhones: Record<string, string> = {
        'Panadería San Miguel': '+1234567890',
        'Verdulería La Plaza': '+1234567891',
        'Café Central': '+1234567892',
        'Farmacia Salud': '+1234567893',
        'Carnicería Don Juan': '+1234567894',
        'Pescadería El Mar': '+1234567895',
        'Lácteos La Granja': '+1234567896',
        'Heladería Dulce': '+1234567897'
      };

      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Abrir WhatsApp para cada negocio
      Object.entries(groupedByBusiness).forEach(([business, businessItems]) => {
        const phoneNumber = businessPhones[business] || '+1234567890';
        const message = generateWhatsAppMessage(business, businessItems);
        const url = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
        
        // Abrir en nueva ventana con un pequeño delay entre cada una
        setTimeout(() => {
          window.open(url, '_blank');
        }, Math.random() * 1000);
      });

      setStep('success');
      toast.success('¡Pedido enviado exitosamente!');
      
      // Después de 3 segundos, cerrar y limpiar
      setTimeout(() => {
        onOrderComplete();
        onOpenChange(false);
        setStep('form');
        setCustomerData({ name: '', phone: '', address: '', notes: '' });
      }, 3000);

    } catch (error) {
      toast.error('Error al procesar el pedido');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo *</Label>
            <Input
              id="name"
              value={customerData.name}
              onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Juan Pérez"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono/WhatsApp *</Label>
            <Input
              id="phone"
              value={customerData.phone}
              onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+54 9 11 1234-5678"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Dirección de entrega *</Label>
          <Textarea
            id="address"
            value={customerData.address}
            onChange={(e) => setCustomerData(prev => ({ ...prev, address: e.target.value }))}
            placeholder="Calle Ejemplo 123, Piso 4 Dpto A, Buenos Aires"
            required
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notas adicionales (opcional)</Label>
          <Textarea
            id="notes"
            value={customerData.notes}
            onChange={(e) => setCustomerData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Ej: Sin sal, alérgico a..., portero eléctrico, etc."
            rows={2}
          />
        </div>
      </div>

      <div className="space-y-4 p-4 bg-accent/20 rounded-lg">
        <h4 className="font-medium flex items-center space-x-2">
          <MessageCircle className="w-4 h-4" />
          <span>¿Cómo funciona?</span>
        </h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Tus datos se envían directamente a cada negocio por WhatsApp</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Los comerciantes te contactarán para confirmar disponibilidad</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Coordinas el pago y entrega directamente con cada negocio</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
          Cancelar
        </Button>
        <Button type="submit" className="flex-1">
          Continuar
        </Button>
      </div>
    </form>
  );

  const renderConfirmation = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-medium">Confirma tu pedido</h4>
        
        <div className="space-y-3 p-4 bg-accent/20 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Nombre:</span>
              <p className="font-medium">{customerData.name}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Teléfono:</span>
              <p className="font-medium">{customerData.phone}</p>
            </div>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Dirección:</span>
            <p className="font-medium">{customerData.address}</p>
          </div>
          {customerData.notes && (
            <div className="text-sm">
              <span className="text-muted-foreground">Notas:</span>
              <p className="font-medium">{customerData.notes}</p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h5 className="font-medium">Se enviará a estos negocios:</h5>
          {Object.entries(groupedByBusiness).map(([business, businessItems]) => (
            <div key={business} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h6 className="font-medium text-sm">{business}</h6>
                <Badge variant="outline">
                  {businessItems.length} productos
                </Badge>
              </div>
              <div className="space-y-1">
                {businessItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setStep('form')} 
          className="flex-1"
        >
          Volver
        </Button>
        <Button 
          onClick={confirmOrder}
          disabled={isProcessing}
          className="flex-1"
        >
          {isProcessing ? 'Enviando...' : 'Confirmar Pedido'}
        </Button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6 py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">¡Pedido enviado exitosamente!</h3>
        <p className="text-muted-foreground">
          Hemos enviado tu pedido a cada negocio por WhatsApp
        </p>
      </div>

      <div className="space-y-3 text-sm text-muted-foreground">
        <p>Los comerciantes te contactarán pronto para:</p>
        <div className="space-y-1">
          <p>✅ Confirmar disponibilidad de productos</p>
          <p>✅ Coordinar método de pago</p>
          <p>✅ Programar la entrega</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Esta ventana se cerrará automáticamente en unos segundos...
      </p>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Finalizar Pedido por WhatsApp</span>
          </DialogTitle>
          <DialogDescription>
            {step === 'form' && 'Completa tus datos para enviar el pedido directamente a los comercios'}
            {step === 'confirmation' && 'Revisa y confirma tu pedido antes de enviarlo'}
            {step === 'success' && 'Tu pedido ha sido procesado exitosamente'}
          </DialogDescription>
        </DialogHeader>

        {step === 'form' && renderForm()}
        {step === 'confirmation' && renderConfirmation()}
        {step === 'success' && renderSuccess()}
      </DialogContent>
    </Dialog>
  );
}