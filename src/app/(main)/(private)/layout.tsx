import React from 'react'
import AuthGuard from './guard/AuthGuard'
import NavBar from '@/components/ui/molecules/NavBar'

function RootLayoutPrivate({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <NavBar />
      {children}
    </AuthGuard>
  )
}

export default RootLayoutPrivate
