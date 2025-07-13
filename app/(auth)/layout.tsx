import { LayoutProps } from '@/types'
import React from 'react'

const Layout = ({children}:LayoutProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen gap-4">{children}</div>
  )
}

export default Layout