import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Store, MapPin, Phone, Mail, Clock, Users, Star, TrendingUp, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface MerchantContactFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  address: string;
  description: string;
  experience: string;
  expectedProducts: string;
}

const initialFormData: FormData = {
  businessName: '',
  contactName: '',
  email: '',
  phone: '',
  businessType: '',
  address: '',
  description: '',
  experience: '',
  expectedProducts: ''
};

const businessTypes = [
  'Panadería',
  'Verdulería / Frutería',
  'Carnicería',
  'Pescadería',
  'Lácteos',
  'Farmacia',
  'Cafetería / Restaurante',
  'Supermercado',
  'Tienda de Conveniencia',
  'Otro'
];

const benefits = [
  {
    icon: Users,
    title: 'Nuevos Clientes',
    description: 'Accede a una base de clientes locales que buscan productos frescos y de calidad'
  },
  {
    icon: TrendingUp,
    title: 'Aumenta tus Ventas',
    description: 'Incrementa tus ingresos con pedidos online sin necesidad de inversión inicial'
  },
  {
    icon: Clock,
    title: 'Gestión Simple',
    description: 'Recibe pedidos directamente por WhatsApp, sin complicaciones tecnológicas'
  },
  {
    icon: MapPin,
    title: 'Visibilidad Local',
    description: 'Aparece en el mapa de comercios y llega a más vecinos de tu zona'
  }
];

export function MerchantContactForm({ isOpen, onOpenChange }: MerchantContactFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    const requiredFields = ['businessName', 'contactName', 'email', 'phone', 'businessType', 'address'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
    
    if (missingFields.length > 0) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Por favor ingresa un email válido');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // En una implementación real, aquí se enviaría a un servidor
      console.log('Formulario enviado:', formData);
      
      setIsSubmitted(true);
      toast.success('¡Solicitud enviada con éxito! Te contactaremos pronto.');
      
      // Resetear formulario después de un delay
      setTimeout(() => {
        setFormData(initialFormData);
        setIsSubmitted(false);
        onOpenChange(false);
      }, 3000);
      
    } catch (error) {
      toast.error('Hubo un error al enviar la solicitud. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData(initialFormData);
      setIsSubmitted(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Store className="w-6 h-6 text-primary" />
            Únete a LocalMarket
          </DialogTitle>
          <DialogDescription>
            Lleva tu negocio al siguiente nivel. Conecta con más clientes y aumenta tus ventas de forma simple y efectiva.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h3 className="text-xl font-medium">¡Solicitud Enviada!</h3>
            <p className="text-center text-muted-foreground max-w-md">
              Hemos recibido tu solicitud. Nuestro equipo la revisará y te contactaremos dentro de las próximas 24-48 horas.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>Revisa tu email para más detalles</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Benefits Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  ¿Por qué elegir LocalMarket?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <benefit.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información del Negocio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">
                        Nombre del Negocio <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="businessName"
                        placeholder="Ej: Panadería San Miguel"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="businessType">
                        Tipo de Negocio <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo de negocio" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">
                      Dirección <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="address"
                      placeholder="Dirección completa del negocio"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción del Negocio</Label>
                    <Textarea
                      id="description"
                      placeholder="Cuéntanos sobre tu negocio, productos principales, historia, etc."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">
                        Nombre del Contacto <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="contactName"
                        placeholder="Tu nombre completo"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange('contactName', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Teléfono / WhatsApp <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+54 11 1234-5678"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información Adicional</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">¿Cuánto tiempo llevas con tu negocio?</Label>
                    <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="menos-1">Menos de 1 año</SelectItem>
                        <SelectItem value="1-3">1-3 años</SelectItem>
                        <SelectItem value="3-5">3-5 años</SelectItem>
                        <SelectItem value="5-10">5-10 años</SelectItem>
                        <SelectItem value="mas-10">Más de 10 años</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expectedProducts">¿Qué productos planeas vender online?</Label>
                    <Textarea
                      id="expectedProducts"
                      placeholder="Describe los productos principales que te gustaría ofrecer a través de LocalMarket"
                      value={formData.expectedProducts}
                      onChange={(e) => handleInputChange('expectedProducts', e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Important Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-blue-100 rounded">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-900">¿Qué sigue después?</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Revisaremos tu solicitud en 24-48 horas</li>
                      <li>• Te contactaremos para una breve entrevista</li>
                      <li>• Te ayudaremos a configurar tu perfil y productos</li>
                      <li>• ¡Comenzarás a recibir pedidos!</li>
                    </ul>
                    <p className="text-xs text-blue-700 mt-2">
                      <strong>Sin costos iniciales:</strong> Solo pagas una pequeña comisión por venta exitosa.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[140px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </div>
                  ) : (
                    'Enviar Solicitud'
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}