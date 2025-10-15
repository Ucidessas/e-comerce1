import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DealsAndTrending } from './components/DealsAndTrendingFixed';
import { LocalBusinesses } from './components/LocalBusinesses';
import { ProductComparison } from './components/ProductComparison';
import { MerchantContactForm } from './components/MerchantContactForm';
import { Footer } from './components/Footer';
import { ShoppingCart } from './components/ShoppingCart';
import { WhatsAppButton } from './components/WhatsAppButton';
import { LocalMap } from './components/LocalMap';
import { WhatsAppCheckout } from './components/WhatsAppCheckout';
import { SearchResults } from './components/SearchResults';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  business: string;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  business: string;
}

interface ProductWithExtras extends Product {
  [key: string]: any; // Allow additional properties from ProductComparison
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMerchantFormOpen, setIsMerchantFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product: ProductWithExtras) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si el producto ya existe, incrementar cantidad
        toast.success(`${product.name} actualizado en el carrito`);
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si es nuevo, agregarlo
        toast.success(`${product.name} agregado al carrito`);
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          business: product.business,
          quantity: 1
        }];
      }
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => {
      const removedItem = prevItems.find(item => item.id === id);
      if (removedItem) {
        toast.info(`${removedItem.name} eliminado del carrito`);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutComplete = () => {
    // Limpiar carrito después del checkout exitoso
    setCartItems([]);
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
  };

  // Listen for merchant form open events
  useEffect(() => {
    const handleOpenMerchantForm = () => {
      setIsMerchantFormOpen(true);
    };

    window.addEventListener('openMerchantForm', handleOpenMerchantForm);
    
    return () => {
      window.removeEventListener('openMerchantForm', handleOpenMerchantForm);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        cartItems={totalItems}
        onCartClick={() => setIsCartOpen(true)}
        onMapClick={() => setIsMapOpen(true)}
        onSearch={setSearchQuery}
      />

      {/* Main Content */}
      <main>
        <Hero />
        <DealsAndTrending onAddToCart={addToCart} />
        <LocalBusinesses onAddToCart={addToCart} />
        <ProductComparison onAddToCart={addToCart} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Shopping Cart */}
      <ShoppingCart
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Local Map */}
      <LocalMap
        isOpen={isMapOpen}
        onOpenChange={setIsMapOpen}
      />

      {/* WhatsApp Checkout */}
      <WhatsAppCheckout
        isOpen={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
        items={cartItems}
        onOrderComplete={handleCheckoutComplete}
      />

      {/* Merchant Contact Form */}
      <MerchantContactForm
        isOpen={isMerchantFormOpen}
        onOpenChange={setIsMerchantFormOpen}
      />

      {/* Search Results */}
      {searchQuery && (
        <SearchResults
          query={searchQuery}
          onAddToCart={addToCart}
          onClose={() => setSearchQuery('')}
        />
      )}

      {/* WhatsApp Support Button */}
      <WhatsAppButton />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}