import './global.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Providers } from './providers'
import { Toaster } from '@/components/ui/toaster'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900']
})

export const metadata: Metadata = {
  title: 'Ignite Call',
  applicationName: 'Ignite Call',
  authors: [
    {
      name: 'Caio Quirino Medeiros',
      url: 'https://github.com/CaioQuirinoMedeiros'
    }
  ]
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='bg-gray-900 text-gray-100'>
      <body className={roboto.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
