import { useState } from 'react';
import { Search, MapPin, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HeaderProps {
  cartItems: number;
  onCartClick: () => void;
  onMapClick: () => void;
  onSearch?: (query: string) => void;
}

export function Header({ cartItems, onCartClick, onMapClick, onSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Búsqueda en tiempo real
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-primary font-medium">EcoMerce Castilla la Nueva</h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Buscar productos o comercios..."
                className="pl-10 bg-input-background"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>
          </div>

          {/* Location, Cart & Merchant - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2"
              onClick={onMapClick}
            >
              <MapPin className="w-4 h-4" />
              <span>Mi Zona</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.dispatchEvent(new CustomEvent('openMerchantForm'))}
            >
              ¿Eres comerciante?
            </Button>
            
            <Button 
              variant="ghost" 
              className="relative flex items-center space-x-2"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Carrito</span>
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Buscar productos o comercios..."
                  className="pl-10 bg-input-background"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </form>
              
              {/* Mobile Nav Links */}
              <div className="flex flex-col space-y-2">
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={onMapClick}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Mi Zona
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => window.dispatchEvent(new CustomEvent('openMerchantForm'))}
                >
                  ¿Eres comerciante?
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={onCartClick}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Carrito ({cartItems})
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}