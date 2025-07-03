import React from 'react'

import Header from './header'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="from-background to-muted bg-gradient-to-br">
      <Header />
      <main className="container mx-auto min-h-screen px-4 py-8">
        {children}
      </main>
      <footer className="supports-[backdrop-filter]:bg-background/60 border-t py-12 backdrop-blur">
        <div className="container mx-auto px-4 text-center text-gray-400">
          Just a footer...
        </div>
      </footer>
    </div>
  )
}
