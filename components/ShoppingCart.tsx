import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  business: string;
  quantity: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export function ShoppingCart({ 
  isOpen, 
  onOpenChange, 
  items, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}: ShoppingCartProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 20 ? 0 : 2.50;
  const total = subtotal + deliveryFee;

  const groupedByBusiness = items.reduce((groups, item) => {
    if (!groups[item.business]) {
      groups[item.business] = [];
    }
    groups[item.business].push(item);
    return groups;
  }, {} as Record<string, CartItem[]>);

  if (items.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Tu Carrito</span>
            </SheetTitle>
            <SheetDescription>
              Revisa tus productos antes de realizar el pedido
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <ShoppingBag className="w-16 h-16 text-muted-foreground" />
            <div className="text-center space-y-2">
              <h3 className="font-medium">Tu carrito está vacío</h3>
              <p className="text-sm text-muted-foreground">
                Agrega productos de nuestros comercios locales
              </p>
            </div>
            <Button onClick={() => onOpenChange(false)}>
              Continuar comprando
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5" />
            <span>Tu Carrito</span>
            <Badge variant="secondary">{items.length}</Badge>
          </SheetTitle>
          <SheetDescription>
            Revisa tus productos antes de realizar el pedido
          </SheetDescription>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {Object.entries(groupedByBusiness).map(([business, businessItems]) => (
            <div key={business} className="space-y-3">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-sm">{business}</h4>
                <Badge variant="outline" className="text-xs">
                  {businessItems.length} productos
                </Badge>
              </div>
              
              {businessItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-accent/20 rounded-lg">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                    <p className="text-sm font-medium">${item.price}</p>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm font-medium px-2">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Separator />
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Envío</span>
              <span>
                {deliveryFee === 0 ? (
                  <span className="text-green-600">Gratis</span>
                ) : (
                  `$${deliveryFee.toFixed(2)}`
                )}
              </span>
            </div>
            
            {subtotal < 20 && (
              <p className="text-xs text-muted-foreground">
                Agrega ${(20 - subtotal).toFixed(2)} más para envío gratis
              </p>
            )}
            
            <Separator />
            
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <Button 
            className="w-full" 
            size="lg"
            onClick={onCheckout}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Finalizar por WhatsApp
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            Sin registro necesario • Pago directo con el comercio
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}