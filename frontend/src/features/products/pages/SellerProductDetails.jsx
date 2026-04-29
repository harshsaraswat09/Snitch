import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { useProducts } from '../hook/useProducts';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const StockBadge = ({ n }) => {
  const cfg = n === 0 ? 'bg-red-50 text-red-600 border-red-200'
    : n <= 5 ? 'bg-amber-50 text-amber-600 border-amber-200'
    : 'bg-emerald-50 text-emerald-600 border-emerald-200';
  const label = n === 0 ? 'Out of Stock' : n <= 5 ? 'Low' : 'In Stock';
  return <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${cfg}`}>{label}</span>;
};

const SellerProductDetails = () => {
  const { productId } = useParams();
  const { handleProductById, handleAddProductVarient, handleUpdateProductCategory } = useProducts();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgIdx, setImgIdx] = useState(0);

  // Variant form
  const [size, setSize] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = () => {
    handleProductById(productId).then(p => {
      setProduct(p);
      setLoading(false);
    });
  };

  const handleAddVariant = async (e) => {
    e.preventDefault();
    if (!size || stock === '') return;
    
    setAdding(true);
    try {
      // Pass the structure expected by the API endpoint
      await handleAddProductVarient(productId, {
        size,
        stock: Number(stock),
        images: [] // Empty array as the API expects an array to loop over
      });
      // Refresh the product to get the new variant from the backend
      await fetchProduct();
      setSize('');
      setStock('');
      setCategory('');
    } catch (error) {
      console.error("Failed to add variant", error);
    } finally {
      setAdding(false);
    }
  };

  const [savingCategory, setSavingCategory] = useState(false);
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!category) return;
    setSavingCategory(true);
    try {
      await handleUpdateProductCategory(productId, category);
      await fetchProduct(); // re-fetch to get updated product from DB
      setCategory('');
    } catch (err) {
      alert('Failed to save category. Please try again.',err);
    } finally {
      setSavingCategory(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-7 h-7 border-2 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const variants = product?.variants || [];
  const totalStock = variants.reduce((s, v) => s + v.stock, 0);

  return (
    <div className="min-h-screen bg-[#f8f8f8] font-sans">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 px-6 md:px-10 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm">
          <Link to="/seller/dashboard" className="text-gray-400 hover:text-black transition-colors">← Dashboard</Link>
          <span className="text-gray-300">/</span>
          <span className="font-bold text-gray-900 capitalize truncate max-w-45">{product?.title}</span>
        </div>
        <Link to="/seller/create" className="text-xs font-bold uppercase tracking-widest px-4 py-2 bg-black text-white hover:bg-gray-900 transition-colors">
          + New Product
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-10 space-y-8">

        {/* ── Product Overview ── */}
        <div className="bg-white border border-gray-200 p-6 flex flex-col md:flex-row gap-7">
          <div className="shrink-0 flex flex-col gap-2">
            <div className="w-48 aspect-4/5 bg-gray-100 overflow-hidden">
              {product?.images?.[imgIdx]
                ? <img src={product.images[imgIdx].url} alt={product?.title} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs uppercase tracking-widest">No Image</div>
              }
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {product?.images?.map((img, i) => (
                <button key={img._id} onClick={() => setImgIdx(i)}
                  className={`w-11 h-14 border-2 overflow-hidden transition-all ${imgIdx === i ? 'border-black' : 'border-transparent opacity-50 hover:opacity-80'}`}>
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4 justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-1">Product</p>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-950 capitalize mb-2">{product?.title}</h1>
              {product?.description && <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>}
            </div>
            <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
              {[
                { label: 'Price', value: `${product?.price?.Currency || 'INR'} ${Number(product?.price?.amount || 0).toLocaleString('en-IN')}` },
                { label: 'Category', value: product?.category || 'Uncategorized' },
                { label: 'Total Stock', value: `${totalStock} units` },
                { label: 'Variants', value: variants.length },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">{s.label}</p>
                  <p className="text-lg font-extrabold text-gray-900">{s.value}</p>
                </div>
              ))}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Status</p>
                <StockBadge n={totalStock} />
              </div>
            </div>
            <Link to={`/product/${product?._id}`} target="_blank"
              className="text-xs font-bold uppercase tracking-widest border border-gray-300 px-4 py-2 hover:border-black transition-colors inline-block w-fit">
              View Public Page ↗
            </Link>
          </div>
        </div>

        {/* ── Variants ── */}
        <div className="bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-[0.18em]">Variants</h2>
              <p className="text-xs text-gray-400 mt-0.5">Available sizes and stock</p>
            </div>
            <span className="text-[11px] font-bold border border-gray-200 text-gray-500 px-2.5 py-1 uppercase tracking-wider">{variants.length} variants</span>
          </div>

          {variants.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-14 uppercase tracking-widest">No variants yet — add one below</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                  <th className="py-3 px-5 text-left">Size</th>
                  <th className="py-3 px-5 text-left">Stock</th>
                  <th className="py-3 px-5 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {variants.map(v => (
                  <tr key={v._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-5 text-sm font-extrabold uppercase tracking-widest">{v.size}</td>
                    <td className="py-4 px-5">
                      <span className="text-base font-bold tabular-nums">{v.stock}</span>
                    </td>
                    <td className="py-4 px-5"><StockBadge n={v.stock} /></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 border-t border-gray-100">
                  <td colSpan={2} className="py-3 px-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Stock</td>
                  <td className="py-3 px-5 text-sm font-extrabold">{totalStock} units</td>
                </tr>
              </tfoot>
            </table>
          )}

          {/* Add variant form */}
          <form onSubmit={handleAddVariant} className="border-t border-dashed border-gray-200 p-6 bg-gray-50">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Add the Sizes</p>
            <div className="flex flex-wrap gap-3 items-end">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Size</label>
                <select value={size} onChange={e => setSize(e.target.value)}
                  className="border border-gray-300 bg-white px-3 py-2.5 text-sm font-semibold outline-none focus:border-black appearance-none cursor-pointer min-w-32.5">
                  <option value="">Select...</option>
                  {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Stock</label>
                <input type="number" min="0" value={stock} onChange={e => setStock(e.target.value)} placeholder="0"
                  className="border border-gray-300 px-3 py-2.5 text-sm font-semibold outline-none focus:border-black w-28" />
              </div>
              <button type="submit" disabled={adding}
                className="px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors disabled:opacity-50">
                {adding ? 'Adding...' : '+ Add'}
              </button>
            </div>
          </form>

          {/* Add Category form */}
          {!product?.category && (
            <form onSubmit={handleSaveCategory} className="border-t border-dashed border-gray-200 p-6 bg-gray-50">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Add the Category</p>
              <div className="flex flex-wrap gap-3 items-end">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)}
                    className="border border-gray-300 bg-white px-3 py-2.5 text-sm font-semibold outline-none focus:border-black appearance-none cursor-pointer min-w-32.5 capitalize">
                    <option value="">Select...</option>
                    <option value="tees">Tees</option>
                    <option value="pants">Pants</option>
                    <option value="hoodies">Hoodies</option>
                    <option value="jerseys">Jerseys</option>
                    <option value="polos">Polos</option>
                    <option value="tanktops">Tank Tops</option>
                  </select>
                </div>
                <button type="submit" disabled={!category || savingCategory}
                  className="px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors disabled:opacity-50">
                  {savingCategory ? 'Saving...' : '+ Save Category'}
                </button>
              </div>
            </form>
          )}
        </div>

      </main>
    </div>
  );
};

export default SellerProductDetails;