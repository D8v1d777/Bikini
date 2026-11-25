import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { CartProvider } from './context/CartContext.tsx';
import { WishlistProvider } from './context/WishlistContext.tsx';
import { Header } from './components/layout/Header.tsx';
import { Footer } from './components/layout/Footer.tsx';
import { CartDrawer } from './components/layout/CartDrawer.tsx';
import { Home } from './pages/Home.tsx';
import { CollectionsPage } from './pages/Collections.tsx';
import { ProductDetail } from './pages/ProductDetail.tsx';
import { Checkout } from './pages/Checkout.tsx';
import { About } from './pages/About.tsx';
import { Journal } from './pages/Journal.tsx';
import { Wishlist } from './pages/Wishlist.tsx';
import { NotFound } from './pages/NotFound.tsx';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <ScrollRestoration />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/collections/:collectionId" element={<CollectionsPage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <CartDrawer />
          </div>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;