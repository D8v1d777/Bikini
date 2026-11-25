import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../../context/CartContext.tsx';
import { Button } from '../ui/Button.tsx';
import { formatPrice } from '../../utils/helpers.ts';
import type { Product, ColorVariant, SizeVariant } from '../../types/index.ts';

interface CartItemProps {
  item: {
    productId: string;
    colorId: string;
    sizeId: string;
    quantity: number;
    product: Product;
    color: ColorVariant;
    size: SizeVariant;
  };
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, color, size, quantity } = item;
  const colorImage = color.images[0];

  return (
    <div className="flex gap-4 p-4 bg-pearl-50 rounded-lg">
      <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-sand-100">
        {colorImage && (
          <img
            src={colorImage}
            alt={`${product.name} in ${color.name}`}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sand-900 truncate">{product.name}</h4>
        <p className="text-sm text-sand-500 mt-0.5">{color.name} / {size.label}</p>
        <p className="font-medium text-sand-900 mt-1">{formatPrice(product.price)}</p>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border border-sand-200 rounded-md">
            <button
              onClick={() => onUpdateQuantity(quantity - 1)}
              className="px-3 py-1 text-sand-600 hover:text-sand-900 hover:bg-sand-100 transition-colors"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <span className="px-3 py-1 text-sm font-medium text-sand-900 w-8 text-center">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(quantity + 1)}
              className="px-3 py-1 text-sand-600 hover:text-sand-900 hover:bg-sand-100 transition-colors"
              aria-label="Increase quantity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
          <button
            onClick={onRemove}
            className="text-sm text-sand-500 hover:text-coral-600 transition-colors font-medium"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { state, closeCart, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const { items, isOpen } = state;

  if (!isOpen) return null;

  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return createPortal(
    <Fragment>
      <div
        className="fixed inset-0 bg-abyss-950/60 backdrop-blur-sm z-40 animate-fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className="fixed right-0 top-0 h-full w-full max-w-md bg-pearl-50 z-50 flex flex-col animate-slide-in-right"
        role="dialog"
        aria-label="Shopping bag"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-6 border-b border-sand-200">
          <h2 className="font-display text-xl font-medium text-sand-900">Shopping Bag</h2>
          <button
            onClick={closeCart}
            className="p-2 text-sand-500 hover:text-sand-900 transition-colors rounded-md hover:bg-sand-100"
            aria-label="Close bag"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-sand-300 mb-4">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1 0 8" />
              </svg>
              <p className="text-sand-600 font-medium">Your bag is empty</p>
              <p className="text-sand-400 text-sm mt-1">Add something architectural to begin</p>
              <Button onClick={closeCart} variant="ghost" className="mt-6">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <CartItem
                  key={`${item.productId}-${item.colorId}-${item.sizeId}`}
                  item={item}
                  onUpdateQuantity={qty => updateQuantity(item.productId, item.colorId, item.sizeId, qty)}
                  onRemove={() => removeItem(item.productId, item.colorId, item.sizeId)}
                />
              ))}
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-sand-200 p-6 space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-sand-600">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-medium text-sand-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sand-600">
                <span>Shipping</span>
                <span className="font-medium text-sand-900">
                  {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sand-600">
                <span>Estimated Tax</span>
                <span className="font-medium text-sand-900">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium text-sand-900 pt-2 border-t border-sand-200">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Button
              onClick={() => {}}
              className="w-full"
              size="lg"
            >
              Proceed to Checkout
            </Button>

            <p className="text-center text-xs text-sand-500">
              This is a simulated checkout. No payment will be processed.
            </p>
          </div>
        )}
      </aside>
    </Fragment>,
    document.body
  );
}