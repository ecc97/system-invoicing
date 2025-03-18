"use client";
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Button from '../atoms/Button';

export default function HeroSection() {
    const router = useRouter();
    const navigateToClick = () => {
         router.push('/login');
    }
    return (
        <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text bg-gradient-to-r from-primary to-primary/80">
                Gestiona tus facturas de forma sencilla
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Automatiza tu facturación, ahorra tiempo y mantén tus finanzas organizadas con nuestra plataforma intuitiva.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <Button onClick={navigateToClick} className="flex items-center gap-1.5 px-6 py-3 cursor-pointer bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-200 transition">
                    Empezar Ahora <ArrowRight className="w-4 h-4" />
                </Button>
                <Button className='px-6 py-3 border cursor-pointer border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition'>
                    Ver Demo
                </Button>
            </div>
        </div>
    )
}