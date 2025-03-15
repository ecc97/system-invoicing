import React from 'react'
import AuthGuard from './guard/AuthGuard'

function RootLayoutPrivate({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  )
}

export default RootLayoutPrivate
