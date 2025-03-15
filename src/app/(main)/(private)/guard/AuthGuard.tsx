"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function AuthGuard(
    { children }: { children: React.ReactNode }
) {
    const router = useRouter()
    const { data, status } = useSession()
    console.log(data, status)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])

    if (status === 'authenticated') {
        return (
            <>
                {children}
            </>
        )
    }

    if (status === 'loading') {
        return (
            <div>Cargando...</div>
        )
    }
}