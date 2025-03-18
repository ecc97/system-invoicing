"use client";
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Button from '../atoms/Button';

export default function CTASection() {
    const router = useRouter();

    const navigateToClick = () => {
        router.push('/register');
    }
    return (
        <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
                ¿Listo para optimizar tu gestión de facturas?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Únete a miles de empresas que ya han transformado su proceso de facturación.
            </p>
            <Button onClick={navigateToClick} className="flex items-center text-lg gap-2 mx-auto bg-gray-900 p-3 cursor-pointer rounded-2xl hover:bg-gray-700">
                Comenzar Gratis <ArrowRight className="w-4 h-4" />
            </Button>
        </div>
    )
}