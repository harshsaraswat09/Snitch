import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { getProductDetails } from '../service/product.api';
import Navbar from '../components/Navbar';
import { useCart } from '../../cart/hook/useCart';
import { useSelector } from 'react-redux';
import Suggestions from '../components/Suggestions';
import CustomerReviews from '../components/CustomerReviews';
import Footer from '../components/Footer';

const CloseIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const TruckIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
    <rect x="9" y="11" width="14" height="10" rx="2"/>
    <circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const RefreshIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);


/* ─── Accordion Item ────────────────────────────────────────── */
const AccordionItem = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 text-sm font-semibold uppercase tracking-widest text-gray-800 hover:text-black transition-colors"
      >
        {title}
        <span className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}><ChevronDown /></span>
      </button>
      {open && (
        <div className="pb-4 text-sm text-gray-500 leading-relaxed">{children}</div>
      )}
    </div>
  );
};

/* ─── Product Detail Page ───────────────────────────────────── */
const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [showCartPopup, setShowCartPopup] = useState(false);
  const {handleAddItems} = useCart()
  const cartItems = useSelector(state => state.cart?.items || [])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductDetails(productId);
        setProduct(data.product);
      } catch (err) {
        setError('Failed to load product.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Loading</p>
        </div>
      </div>
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500 gap-4">
        <p className="text-lg font-bold">{error || 'Product not found.'}</p>
        <Link to="/" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-0.5 hover:text-gray-500 transition-colors">← Back to shop</Link>
      </div>
    </div>
  );

  const images = product.images || [];
  const price = product.price?.amount;
  const variants = product.variants || []; // Safety fallback for variants

  return (
    <div className="min-h-screen bg-white font-sans relative">
      <Navbar />

      {/* Cart pop-up */}
      {showCartPopup && (
        <div className="fixed top-20 right-4 md:right-10 z-50 bg-white border border-gray-200 shadow-[0px_4px_24px_rgba(0,0,0,0.08)] w-[360px] p-6 animate-fade-in-down">
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-900">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Item added to your cart
            </div>
            <button onClick={() => setShowCartPopup(false)} className="text-gray-400 hover:text-black transition-colors">
              <CloseIcon />
            </button>
          </div>
          
          <div className="flex gap-4 mb-6">
            <div className="w-20 h-28 bg-gray-100 shrink-0">
              {images[selectedImg]?.url && (
                <img src={images[selectedImg].url} alt={product.title} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">URBAN NEEDS</span>
              <span className="text-sm font-black capitalize leading-snug">{product.title}</span>
              <span className="text-xs text-gray-500 mt-1">Size: {selectedSize}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <Link to="/cart" className="w-full py-3.5 border border-black text-black text-xs font-bold uppercase tracking-[0.1em] text-center hover:bg-gray-50 transition-colors">
              View cart ({cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0})
            </Link>
            <button onClick={() => setShowCartPopup(false)} className="w-full text-xs font-bold underline tracking-wide text-gray-800 hover:text-black transition-colors py-2 text-center">
              Continue shopping
            </button>
          </div>
        </div>
      )}

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">

        {/* Breadcrumb */}
        <nav className="text-[11px] text-gray-400 mb-10 font-medium tracking-[0.12em] uppercase flex items-center gap-2">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-600 capitalize">{product.title}</span>
        </nav>

        {/* ── Main 2-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-start justify-center">

          {/* ───── LEFT: Info Panel ───── */}
          <div className="flex-1 order-2 lg:order-1 max-w-xl">

            {/* Brand tag */}
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-white bg-black px-3 py-1 mb-5">
              Urban Needs
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-950 leading-[1.1] tracking-tight mb-4 capitalize">
              {product.title}
            </h1>

            {/* Price row */}
            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl font-bold text-gray-900">
                Rs.&nbsp;{Number(price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1">
                In Stock
              </span>
            </div>
            <p className="text-xs text-gray-500 tracking-wide mb-6">Tax included. <Link to="#" className="underline">Shipping</Link> calculated at checkout.</p>

            {/* Size */}
            <div className="mb-8">
              <p className="text-sm font-medium text-gray-900 mb-3">Size</p>
              <div className="flex flex-wrap gap-3">
                {['S', 'M', 'L', 'XL'].map(sizeLabel => {
                  // FIX: Added optional chaining on v.size
                  const variant = variants.find(v => v.size?.toUpperCase() === sizeLabel.toUpperCase());
                  const isOutOfStock = !variant || variant.stock === 0;
                  const isSelected = selectedSize === sizeLabel;

                  return (
                    <button
                      key={sizeLabel}
                      disabled={isOutOfStock}
                      onClick={() => setSelectedSize(sizeLabel)}
                      className={`min-w-12.5 h-11 px-4 flex justify-center items-center rounded-full text-sm font-medium border transition-colors ${
                        isOutOfStock
                          ? 'border-gray-200 text-gray-400 opacity-60 cursor-not-allowed line-through'
                          : isSelected
                          ? 'border-black bg-black text-white'
                          : 'border-gray-400 text-gray-800 hover:border-black'
                      }`}
                    >
                      {sizeLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-[15px] text-gray-600 leading-7 mb-8 border-l-2 border-black pl-4">
                {product.description}
              </p>
            )}

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {['100% Premium Cotton', 'Oversized Fit', 'Enzyme Washed', 'Drop Shoulder'].map(tag => (
                <div key={tag} className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-2.5 rounded-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                  <span className="text-xs font-medium text-gray-700">{tag}</span>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">Quantity</p>
              <div className="flex items-center border border-gray-300 w-fit">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center text-xl hover:bg-gray-100 transition-colors text-gray-700 font-light"
                >−</button>
                <span className="w-12 h-12 flex items-center justify-center text-base font-bold border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-12 h-12 flex items-center justify-center text-xl hover:bg-gray-100 transition-colors text-gray-700 font-light"
                >+</button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mb-10">
              <button
                disabled={!selectedSize}
                onClick={async () => {
                  try {
                    // FIX: Added optional chaining on v.size
                    const selectedVariant = variants.find(v => v.size?.toUpperCase() === selectedSize.toUpperCase());
                    if (!selectedVariant) return;
                    await handleAddItems({ 
                      productId: product._id,
                      variantId: selectedVariant._id,
                      quantity
                    });
                    setShowCartPopup(true);
                  } catch (err) {
                    alert('Failed to add item to cart.');
                  }
                }}
               className="w-full py-4 border-2 border-black text-black text-sm font-bold uppercase tracking-[0.15em] hover:bg-gray-50 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                Add to Cart
              </button>
              <button className="w-full py-4 bg-black text-white text-sm font-bold uppercase tracking-[0.15em] hover:bg-gray-900 active:scale-[0.99] transition-all">
                Buy it Now
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-10">
              {[
                { icon: <TruckIcon />, label: 'Free Delivery', sublabel: 'On orders above ₹999' },
                { icon: <RefreshIcon />, label: 'Easy Returns', sublabel: '7-day return policy' },
                { icon: <ShieldIcon />, label: 'Secure Pay', sublabel: '100% safe checkout' },
              ].map(({ icon, label, sublabel }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5 py-4 border border-gray-100 bg-gray-50">
                  <span className="text-gray-500">{icon}</span>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-gray-800">{label}</p>
                  <p className="text-[10px] text-gray-400 leading-tight">{sublabel}</p>
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div className="border-t border-gray-100">
              <AccordionItem title="Product Details">
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>Fabric: 100% Premium Cotton</li>
                  <li>Fit: Oversized</li>
                  <li>Wash Care: Machine wash cold, do not bleach</li>
                  <li>Country of Origin: India</li>
                </ul>
              </AccordionItem>
              <AccordionItem title="Shipping & Returns">
                Standard delivery in 4–6 business days. Express delivery available at checkout.
                Easy 7-day returns for unused items in original packaging.
              </AccordionItem>
              <AccordionItem title="Wash Care">
                <p className="mb-3 text-gray-500 leading-relaxed">
                  While washing for the first time colour bleeding might be observed especially with dark colors,
                  thus it's advised to wash them separately following appropriate wash care instructions.
                  Please use a mild detergent while washing the garment.
                </p>
                <ul className="space-y-1.5">
                  {[
                    'Machine wash cold with similar colors.',
                    'Only non-chlorine bleach when needed.',
                    'Tumble dry low.',
                    'Warm iron if needed.',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            </div>
          </div>

          {/* ───── RIGHT: Image Gallery ───── */}
          <div className="lg:w-100 xl:w-115 shrink-0 order-1 lg:order-2 flex flex-col gap-3">
            {/* Main image */}
            <div className="w-full aspect-4/5 bg-gray-100 overflow-hidden relative group">
              {images.length > 0 ? (
                <img
                  src={images[selectedImg]?.url}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs uppercase tracking-widest font-bold">
                  No Image
                </div>
              )}
              {/* Image count badge */}
              {images.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 tracking-widest uppercase backdrop-blur-sm">
                  {selectedImg + 1} / {images.length}
                </div>
              )}
              {/* Hover prev/next arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImg(i => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                    aria-label="Previous image"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedImg(i => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                    aria-label="Next image"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={img._id}
                    onClick={() => setSelectedImg(i)}
                    className={`shrink-0 w-18 h-22.5 border-2 overflow-hidden transition-all duration-200 ${
                      selectedImg === i
                        ? 'border-black opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-90 hover:border-gray-300'
                    }`}
                  >
                    <img src={img.url} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick stat strip below image */}
            <div className="border border-gray-100 bg-gray-50 px-4 py-3 flex items-center justify-between mt-1">
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-800">500+</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Sold this week</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-800">4.8 ★</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Avg. rating</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-800">Free</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Shipping</p>
              </div>
            </div>
            
            <div className="mt-8">
              <CustomerReviews />
            </div>
          </div>

        </div>
        <Suggestions category={product?.category} currentProductId={product._id} />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;