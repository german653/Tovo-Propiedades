import type { Metadata } from 'next';
import '../index.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';import WhatsAppButton from '../components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Tovo Propiedades',
  description: 'Redefiniendo el mercado de lujo con un compromiso inquebrantable con la excelencia y la discreción.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-brand-black text-brand-cream selection:bg-brand-gold selection:text-brand-black font-sans overflow-x-hidden antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
