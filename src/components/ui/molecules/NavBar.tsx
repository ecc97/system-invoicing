'use client'
import React from 'react';
import { FilePlus, LogOut } from 'lucide-react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Button from '../atoms/Button';
import { usePathname, useRouter } from 'next/navigation';

export default function NavBar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    router.push("/");
  }

  return (
    <nav className="bg-sky-100 shadow-md py-4 px-6 flex flex-col sm:flex-row items-center justify-between sticky top-0 w-full z-10">
      {/* Título o Logo */}
      <div className="mb-2 sm:mb-0">
        <Link href="/invoices">
          <span className="text-2xl font-bold text-neutral-950">System Invoicing</span>
        </Link>
      </div>

      {/* Menú de navegación */}
      <div className="flex items-center gap-4">
        {session && session.user && (
          <span className="text-gray-700 font-medium">
            Hola, {session.user.name}
          </span>
        )}
        <Link
          href="/invoices/new"
          className={`${pathname === '/invoices/new'? 'hidden' : 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'}`}
        >
          <span className='hidden lg:block'>Crear Factura</span>
          <FilePlus className='lg:hidden' />
        </Link>
        <Button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
        >
          <span className='hidden lg:block'>Cerrar Sesión</span>
          <LogOut className='lg:hidden' />
        </Button>
      </div>
    </nav>
  )
}
