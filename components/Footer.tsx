import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">LocalMarket</h3>
            <p className="text-sm text-primary-foreground/80">
              Conectamos tu comunidad con los mejores comercios locales. 
              Compra online, paga seguro y apoya el comercio de tu zona.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Buenos Aires, Argentina</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4" />
                <span>+54 11 1234-5678</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>hola@localmarket.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium">Enlaces Rápidos</h4>
            <div className="space-y-2">
              <Button variant="link" className="h-auto p-0 text-primary-foreground/80 hover:text-primary-foreground">
                Comercios
              </Button>
              <Button variant="link" className="h-auto p-0 text-primary-foreground/80 hover:text-primary-foreground">
                Productos
              </Button>
              <Button variant="link" className="h-auto p-0 text-primary-foreground/80 hover:text-primary-foreground">
                Ofertas
              </Button>
              <Button variant="link" className="h-auto p-0 text-primary-foreground/80 hover:text-primary-foreground">
                Delivery
              </Button>
            </div>
          </div>

          {/* For Businesses */}
          <div className="space-y-4">
            <h4 className="font-medium">Para Comerciantes</h4>
            <div className="space-y-2">
              <Button 
                variant="link" 
                className="h-auto p-0 text-primary-foreground/80 hover:text-primary-foreground"
                onClick={() => window.dispatchEvent(new CustomEvent('openMerchantForm'))}
              >
                ¿Eres comerciante? Únete aquí
              </Button>
              <Button variant="link" className="h-auto p-0 text-primary-foreground/80 hover:text-primary-foreground">
                Centro de ayuda
              </Button>
              <Button variant="link" className="h-auto p-0 text-primary-foreground/80 hover:text-primary-foreground">
                Tarifas y comisiones
              </Button>
              <Button variant="link" className="h-auto p-0 text-primary-foreground/80 hover:text-primary-foreground">
                Portal comerciante
              </Button>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-medium">Mantente Informado</h4>
            <p className="text-sm text-primary-foreground/80">
              Recibe ofertas exclusivas y novedades de los comercios locales
            </p>
            
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  placeholder="Tu email"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                <Button variant="secondary" size="sm">
                  Suscribirse
                </Button>
              </div>
              
              <p className="text-xs text-primary-foreground/60">
                Al suscribirte aceptas recibir comunicaciones de LocalMarket
              </p>
            </div>

            {/* Social Media */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Síguenos</p>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary-foreground/10">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary-foreground/10">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary-foreground/10">
                  <Twitter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20" />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-primary-foreground/80">
              © 2024 LocalMarket. Todos los derechos reservados.
            </p>
            
            <div className="flex space-x-4 text-sm">
              <Button variant="link" className="h-auto p-0 text-primary-foreground/60 hover:text-primary-foreground">
                Términos y Condiciones
              </Button>
              <Button variant="link" className="h-auto p-0 text-primary-foreground/60 hover:text-primary-foreground">
                Política de Privacidad
              </Button>
              <Button variant="link" className="h-auto p-0 text-primary-foreground/60 hover:text-primary-foreground">
                Cookies
              </Button>
            </div>
          </div>

          <div className="text-sm text-primary-foreground/60">
            Hecho con ❤️ para la comunidad local
          </div>
        </div>
      </div>
    </footer>
  );
}