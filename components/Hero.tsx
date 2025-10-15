import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { ArrowRight, Clock, Shield, Truck } from 'lucide-react';

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-medium leading-tight">
                Descubre el mejor comercio local en tu zona
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Conectamos a tu comunidad con los mejores comercios locales. 
                Compra online, paga seguro y recibe en tiempo real.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                variant="secondary" 
                className="group"
                onClick={() => {
                  const section = document.getElementById('local-businesses');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Explorar Comercios
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => window.dispatchEvent(new CustomEvent('openMerchantForm'))}
              >
                ¿Eres comerciante?
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-foreground/10 rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Entrega Rápida</h3>
                  <p className="text-xs text-primary-foreground/70">En tu zona</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-foreground/10 rounded-lg">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Pago Seguro</h3>
                  <p className="text-xs text-primary-foreground/70">100% protegido</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-foreground/10 rounded-lg">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Seguimiento</h3>
                  <p className="text-xs text-primary-foreground/70">Tiempo real</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1651449815993-706eaa7a936a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGJ1c2luZXNzJTIwc3RvcmVmcm9udHxlbnwxfHx8fDE3NTg1ODgwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Comercio local"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white text-foreground p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium">Abierto ahora</p>
                  <p className="text-xs text-muted-foreground">23 comercios</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white text-foreground p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-medium">Entrega gratis</p>
                  <p className="text-xs text-muted-foreground">Compras &gt;$20</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}