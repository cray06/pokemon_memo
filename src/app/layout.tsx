import type { Metadata } from 'next'
import './globals.css'
import React from 'react'

export const metadata: Metadata = {
    title: {
        template: '%s',
        default: 'Pokemon Card Game'
    },
    description: `A pokemon swap card game with a score displayed,
    the user have to discover hidden card and check find equal card."
  "Use has 3 attemps by default that reset each time he find a card combo`,
    icons: {
        icon: '/favicon.ico'
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='fr'>
            <body>{children}</body>
        </html>
    )
}
