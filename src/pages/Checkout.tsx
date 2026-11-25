import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Input } from '../components/ui/Input.tsx';
import { formatPrice } from '../utils/helpers.ts';
import type { CartItem } from '../types/index.ts';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  phone?: string;
}

const INITIAL_FORM_DATA: FormData = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'US',
  phone: ''
};

export function Checkout() {
  const navigate = useNavigate();
  const { state, closeCart, clearCart, subtotal, totalItems } = useCart();
  const { items } = state;

  const [step, setStep] = useState<'shipping' | 'review' | 'confirmation'>('shipping');
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber] = useState(() => `SLN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`);

  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pearl-50 px-6">
        <div className="text-center">
          <h1 className="font-display text-4xl md:text-5xl font-medium text-sand-900 mb-4">Your Bag is Empty</h1>
          <p className="text-sand-600 mb-8">Add something architectural to begin checkout.</p>
          <button onClick={() => navigate('/collections')} className="px-6 py-3 bg-sand-900 text-pearl-50 font-medium rounded-md hover:bg-sand-950 transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const validateStep = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email required';
    }
    if (!formData.firstName.trim()) newErrors.firstName = 'First name required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name required';
    if (!formData.address.trim()) newErrors.address = 'Address required';
    if (!formData.city.trim()) newErrors.city = 'City required';
    if (!formData.state.trim()) newErrors.state = 'State/Province required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP/Postal code required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setStep('confirmation');
    clearCart();
    closeCart();
  };

  const handleContinue = () => {
    if (step === 'shipping' && validateStep()) {
      setStep('review');
    }
  };

  return (
    <div className="min-h-screen bg-pearl-50">
      {/* Progress Indicator */}
      <nav className="bg-sand-950 px-6 py-4" aria-label="Checkout progress">
        <div className="max-w-3xl mx-auto">
          <ol className="flex items-center justify-center gap-4" role="list">
            {['shipping', 'review', 'confirmation'].map((s, index) => (
              <li key={s} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all ${
                  step === s || (step === 'review' && s === 'shipping') || (step === 'confirmation' && s !== 'confirmation')
                    ? 'bg-sand-500 text-sand-950'
                    : 'bg-sand-800 text-sand-400'
                }`}>
                  {step === 'confirmation' && s !== 'confirmation' ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : index + 1}
                </div>
                <span className={`ml-2 text-sm font-medium ${step === s || (step === 'review' && s === 'shipping') || (step === 'confirmation' && s !== 'confirmation') ? 'text-pearl-50' : 'text-sand-400'}`}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </span>
                {index < 2 && (
                  <div className={`mx-4 w-16 h-0.5 rounded ${(step === 'review' || step === 'confirmation') && index === 0 ? 'bg-sand-500' : (step === 'confirmation' && index === 1 ? 'bg-sand-500' : 'bg-sand-800')}`} />
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {step === 'confirmation' ? (
          <ConfirmationView orderNumber={orderNumber} total={total} email={formData.email} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* Shipping Information */}
            <section aria-labelledby="shipping-heading" className={step === 'review' ? 'pointer-events-none opacity-50' : ''}>
              <header className="mb-8">
                <h1 id="shipping-heading" className="font-display text-3xl font-medium text-sand-900">
                  {step === 'review' ? 'Review Your Order' : 'Shipping Information'}
                </h1>
                <p className="text-sand-600 mt-2">All fields required unless marked optional.</p>
              </header>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  error={errors.email}
                  required
                  autoComplete="email"
                  disabled={step === 'review'}
                />
                <Input
                  label="Phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  error={errors.phone}
                  required
                  autoComplete="tel"
                  disabled={step === 'review'}
                />
                <Input
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  error={errors.firstName}
                  required
                  autoComplete="given-name"
                  disabled={step === 'review'}
                />
                <Input
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  error={errors.lastName}
                  required
                  autoComplete="family-name"
                  disabled={step === 'review'}
                />
              </div>

              <div className="mt-6 space-y-4">
                <Input
                  label="Address"
                  value={formData.address}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  error={errors.address}
                  required
                  autoComplete="street-address"
                  disabled={step === 'review'}
                />
                <div className="grid md:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    value={formData.city}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                    error={errors.city}
                    required
                    autoComplete="address-level2"
                    disabled={step === 'review'}
                  />
                  <Input
                    label="State / Province"
                    value={formData.state}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
                    error={errors.state}
                    required
                    autoComplete="address-level1"
                    disabled={step === 'review'}
                  />
                  <Input
                    label="ZIP / Postal Code"
                    value={formData.zipCode}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, zipCode: e.target.value }))}
                    error={errors.zipCode}
                    required
                    autoComplete="postal-code"
                    disabled={step === 'review'}
                  />
                </div>
                <Input
                  label="Country"
                  value={formData.country}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                  required
                  autoComplete="country"
                  disabled={step === 'review'}
                />
              </div>
            </section>

            {/* Order Summary */}
            <aside className="bg-sand-50 rounded-xl p-6 lg:sticky lg:top-24 space-y-6" aria-labelledby="summary-heading">
              <h2 id="summary-heading" className="font-display text-xl font-medium text-sand-900">Order Summary</h2>

              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {items.map((item: CartItem) => (
                  <div key={`${item.productId}-${item.colorId}-${item.sizeId}`} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-sand-100">
                      <img
                        src={item.color.images[0]}
                        alt={`${item.product.name} in ${item.color.name}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sand-900 truncate">{item.product.name}</p>
                      <p className="text-sm text-sand-500">{item.color.name} / {item.size.label}</p>
                      <p className="font-medium text-sand-900">{formatPrice(item.product.price)} × {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-sand-200 pt-4 space-y-3 text-sm">
                <div className="flex justify-between text-sand-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium text-sand-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sand-600">
                  <span>Shipping</span>
                  <span className="font-medium text-sand-900">{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
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

              {step === 'shipping' && (
                <Button onClick={handleContinue} className="w-full" size="lg">
                  Continue to Review
                </Button>
              )}

              {step === 'review' && (
                <Button onClick={handleSubmit} className="w-full" size="lg" loading={isSubmitting}>
                  Place Order
                </Button>
              )}

              <p className="text-center text-xs text-sand-500">
                This is a simulated checkout. No payment will be processed.
              </p>
            </aside>
          </form>
        )}
      </main>
    </div>
  );
}

function ConfirmationView({ orderNumber, total, email }: { orderNumber: string; total: number; email: string }) {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto mb-8 bg-sand-100 rounded-full flex items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4a3f36" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      </div>
      <h1 className="font-display text-4xl md:text-5xl font-medium text-sand-900 mb-4">Order Confirmed</h1>
      <p className="text-sand-600 text-lg mb-8 max-w-md mx-auto">
        Thank you for your order. A confirmation has been sent to <strong className="text-sand-900">{email}</strong>.
      </p>
      <div className="bg-sand-100 rounded-xl p-6 mb-8 inline-block text-left min-w-[300px]">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-sand-600">Order Number</span>
            <span className="font-mono font-medium text-sand-900">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sand-600">Total</span>
            <span className="font-medium text-sand-900">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sand-600">Status</span>
            <span className="font-medium text-teal-600">Confirmed (Simulated)</span>
          </div>
        </div>
      </div>
      <p className="text-sand-500 text-sm mb-8">
        This was a simulated checkout. No payment was processed and no order was placed.
      </p>
      <button
        onClick={() => window.location.href = '/'}
        className="px-8 py-3 bg-sand-900 text-pearl-50 font-medium rounded-md hover:bg-sand-950 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
}