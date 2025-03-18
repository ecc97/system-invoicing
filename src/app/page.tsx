import Link from 'next/link'
import HeroSection from '@/components/ui/molecules/HeroSection';
import FeatureCard from '@/components/ui/molecules/Card/FeatureCard';
import CTASection from '@/components/ui/molecules/CTASection';
import Button from '@/components/ui/atoms/Button';
import { BarChart3, FileText, Shield, Zap, CheckCircle, ArrowRight, LogIn, UserPlus2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="text-2xl md:text-3xl font-bold text-white">System Invoicing</div>
        <nav className='flex gap-2 text-lg font-semibold'>
          <Link href="/login" className="bg-sky-500 flex items-center px-4 py-2 rounded-full text-white hover:bg-sky-600">
            <span className='hidden lg:block'>Iniciar Sesión</span>
            <LogIn className="w-4 h-4 lg:hidden" />
          </Link>
          <Link href="/register" className="bg-sky-600 flex items-center px-4 py-2 rounded-full text-white hover:bg-sky-500">
            <span className='hidden lg:block'>Registrarse</span>
            <UserPlus2 className="w-4 h-4 lg:hidden" />
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col text-center">
        <section className="flexpx-4 pt-20 pb-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8">
          <HeroSection />
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20 bg-background rounded-t-3xl">
          <h2 className="text-3xl font-bold text-center mb-16">
            Todo lo que necesitas para gestionar tus facturas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FileText className="w-10 h-10 text-primary" />}
              title="Facturación Automática"
              description="Genera y envía facturas profesionales en segundos con plantillas personalizables."
            />
            <FeatureCard
              icon={<BarChart3 className="w-10 h-10 text-primary" />}
              title="Reportes Detallados"
              description="Obtén insights valiosos con análisis y reportes financieros en tiempo real."
            />
            <FeatureCard
              icon={<Shield className="w-10 h-10 text-primary" />}
              title="Seguridad Garantizada"
              description="Tus datos están protegidos con encriptación de nivel bancario."
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10 text-primary" />}
              title="Proceso Optimizado"
              description="Reduce el tiempo de gestión con automatización inteligente."
            />
            <FeatureCard
              icon={<CheckCircle className="w-10 h-10 text-primary" />}
              title="Cumplimiento Fiscal"
              description="Mantén tu negocio al día con las regulaciones fiscales vigentes."
            />
            <div className="p-6 flex items-center justify-center bg-slate-500 hover:bg-slate-600 border-2 rounded-lg">
              <Button className="flex items-center text-lg gap-2 text-black cursor-pointer">
                Y mucho más <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 bg-sky-400">
          <CTASection />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 p-4 text-center text-white">
        © {new Date().getFullYear()} System Invoicing. Todos los derechos reservados.
      </footer>
    </div>
  );
}