// app/layout.tsx
import TanStackProvider from '@/app/components/TanStackProvider/TanStackProvider';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';
import './globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
};

export default RootLayout;
