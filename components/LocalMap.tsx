import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, Navigation, Clock, Star, ExternalLink, MessageCircle } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  distance: string;
  address: string;
  isOpen: boolean;
  whatsapp: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Panadería San Miguel',
    category: 'Panadería',
    image: 'https://images.unsplash.com/photo-1608220874995-aa3e5301c676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc1ODU4ODA0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    distance: '0.8 km',
    address: 'Av. San Miguel 123, Buenos Aires',
    isOpen: true,
    whatsapp: '+1234567890',
    coordinates: { lat: -34.6037, lng: -58.3816 }
  },
  {
    id: '2',
    name: 'Verdulería La Plaza',
    category: 'Frutas y Verduras',
    image: 'https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU4NTY5ODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    distance: '1.2 km',
    address: 'Calle de la Plaza 456, Buenos Aires',
    isOpen: true,
    whatsapp: '+1234567891',
    coordinates: { lat: -34.6118, lng: -58.3960 }
  },
  {
    id: '3',
    name: 'Café Central',
    category: 'Cafetería',
    image: 'https://images.unsplash.com/photo-1642647916129-3909c75c0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY2FmZXxlbnwxfHx8fDE3NTg1MzcyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    distance: '0.5 km',
    address: 'Plaza Central 789, Buenos Aires',
    isOpen: false,
    whatsapp: '+1234567892',
    coordinates: { lat: -34.6158, lng: -58.3731 }
  },
  {
    id: '4',
    name: 'Farmacia Salud',
    category: 'Farmacia',
    image: 'https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMG1lZGljaW5lcyUyMHBpbGxzfGVufDF8fHx8MTc1ODUwODc1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    distance: '0.9 km',
    address: 'Av. Salud 321, Buenos Aires',
    isOpen: true,
    whatsapp: '+1234567893',
    coordinates: { lat: -34.6092, lng: -58.3732 }
  },
  {
    id: '5',
    name: 'Carnicería Don Juan',
    category: 'Carnicería',
    image: 'https://images.unsplash.com/photo-1630334337820-84afb05acf3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1lYXQlMjBidXRjaGVyJTIwc2hvcHxlbnwxfHx8fDE3NTg1NzI1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.5,
    distance: '1.5 km',
    address: 'Calle de la Carne 654, Buenos Aires',
    isOpen: true,
    whatsapp: '+1234567894',
    coordinates: { lat: -34.6200, lng: -58.3900 }
  }
];

interface LocalMapProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LocalMap({ isOpen, onOpenChange }: LocalMapProps) {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  const openInGoogleMaps = (business: Business) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
    window.open(url, '_blank');
  };

  const getDirections = (business: Business) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${business.coordinates.lat},${business.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const handleWhatsAppContact = (business: Business) => {
    const message = `Hola ${business.name}, me interesa conocer más sobre sus productos. Los encontré en LocalMarket.`;
    const url = `https://wa.me/${business.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Comercios en tu zona</span>
          </DialogTitle>
          <DialogDescription>
            Encuentra los mejores comercios locales cerca de ti
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex gap-6 overflow-hidden">
          {/* Map Area */}
          <div className="flex-1 bg-accent/20 rounded-lg relative overflow-hidden">
            {/* Simulated Map */}
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="w-16 h-16 text-blue-500 mx-auto" />
                  <div className="space-y-2">
                    <h3 className="font-medium">Mapa Interactivo</h3>
                    <p className="text-sm text-muted-foreground">
                      En una implementación real, aquí se mostraría un mapa de Google Maps
                    </p>
                    <Button
                      onClick={() => window.open('https://maps.google.com/maps?q=comercios+locales+buenos+aires', '_blank')}
                      className="gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Abrir en Google Maps
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mock pins */}
              {mockBusinesses.map((business, index) => (
                <div
                  key={business.id}
                  className={`absolute w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform ${
                    selectedBusiness?.id === business.id ? 'ring-4 ring-primary/30' : ''
                  }`}
                  style={{
                    left: `${20 + (index * 15)}%`,
                    top: `${30 + (index * 10)}%`,
                  }}
                  onClick={() => setSelectedBusiness(business)}
                >
                  <MapPin className="w-4 h-4 text-primary-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* Business List */}
          <div className="w-80 flex flex-col">
            <div className="mb-4">
              <h3 className="font-medium">Comercios cercanos</h3>
              <p className="text-sm text-muted-foreground">
                {mockBusinesses.length} comercios encontrados
              </p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
              {mockBusinesses.map((business) => (
                <Card 
                  key={business.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedBusiness?.id === business.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedBusiness(business)}
                >
                  <CardContent className="p-3">
                    <div className="flex space-x-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={business.image}
                          alt={business.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-sm line-clamp-1">{business.name}</h4>
                            <p className="text-xs text-muted-foreground">{business.category}</p>
                          </div>
                          <Badge variant={business.isOpen ? "default" : "secondary"} className="text-xs">
                            {business.isOpen ? 'Abierto' : 'Cerrado'}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{business.rating}</span>
                          </div>
                          <span className="text-muted-foreground">{business.distance}</span>
                        </div>

                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {business.address}
                        </p>

                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 text-xs px-2 flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              getDirections(business);
                            }}
                          >
                            <Navigation className="w-3 h-3 mr-1" />
                            Ir
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 text-xs px-2 flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWhatsAppContact(business);
                            }}
                          >
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Chat
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}