import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useProduct } from '../hooks/useProduct';

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'];
const MAX_IMAGES = 7;

const inputCls = "bg-transparent border-0 border-b border-black/20 text-sm font-light text-[#1a1a1a] py-2 outline-none placeholder:text-[#c5bdb0] focus:border-[#1a1a1a] transition-colors duration-200 rounded-none w-full";
const labelCls = "text-[11px] font-medium tracking-[0.2em] uppercase text-[#9a9080] mb-1.5 block";

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c5bdb0]">
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const RemoveIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceAmount: '',
    priceCurrency: 'INR',
  });
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addFiles = (files) => {
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) return;
    const toAdd = Array.from(files).slice(0, remaining);
    const newImages = toAdd.map(file => ({ file, preview: URL.createObjectURL(file) }));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleFileChange = (e) => { addFiles(e.target.files); e.target.value = ''; };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  }, [images]);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const removeImage = (index) => {
    setImages(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('priceAmount', formData.priceAmount);
      data.append('priceCurrency', formData.priceCurrency);
      images.forEach(img => data.append('images', img.file));
      await handleCreateProduct(data);
      navigate('/');
    } catch (err) {
      console.error('Failed to create product', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-[#F5F1EB] text-[#1a1a1a] flex flex-col overflow-hidden font-sans">

      {/* ── Navbar: Compact ── */}
      <nav className="flex items-center justify-between px-8 py-3 border-b border-black/10 shrink-0 sticky top-0 bg-[#F5F1EB] z-10">
        <span style={{ fontFamily: "'Yeseva One', serif" }} className="text-[20px] tracking-wide text-[#1a1a1a]">
          Snitch
        </span>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[9px] tracking-[0.16em] uppercase text-[#8a8070] hover:text-[#1a1a1a] transition-colors duration-200"
        >
          <BackIcon />
          Back
        </button>
      </nav>

      {/* ── Scrollable Content Area ── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="max-w-6xl mx-auto w-full px-8 lg:px-20 py-8">
          
          {/* ── Page Header: Reduced margin ── */}
          <header className="mb-8">
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-[#9a9080] mb-1">
              Seller Dashboard
            </p>
            <h1 className="text-4xl font-semibold text-[#1a1a1a] tracking-tight">
              New Listing
            </h1>
            <div className="mt-4 h-px bg-black/10 w-full" />
          </header>

          <form onSubmit={handleSubmit} className="pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* ── LEFT — fields ── */}
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.26em] uppercase text-[#b0a898] mb-4">
                    01 — Product Info
                  </p>
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className={labelCls}>Product Title</label>
                      <input
                        type="text" name="title" value={formData.title}
                        onChange={handleChange} required
                        placeholder="e.g. Oversized Linen Shirt"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Description</label>
                      <textarea
                        name="description" value={formData.description}
                        onChange={handleChange} rows={3}
                        placeholder="Material, fit, care instructions..."
                        className="bg-transparent border-b border-black/20 text-sm font-light text-[#1a1a1a] py-2 outline-none placeholder:text-[#c5bdb0] focus:border-[#1a1a1a] transition-colors duration-200 rounded-none w-full resize-none leading-relaxed"
                      />
                      <div className="flex justify-end mt-1">
                        <span className="text-[8px] text-[#c5bdb0] tracking-wide">
                          {formData.description.length} chars
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[8px] font-medium tracking-[0.26em] uppercase text-[#b0a898] mb-4">
                    02 — Pricing
                  </p>
                  <div className="flex gap-6 items-end">
                    <div className="flex-[2]">
                      <label className={labelCls}>Amount</label>
                      <input
                        type="number" name="priceAmount" value={formData.priceAmount}
                        onChange={handleChange} required min="0" step="100"
                        placeholder="0.00"
                        className={inputCls}
                      />
                    </div>
                    <div className="flex-[1]">
                      <label className={labelCls}>Currency</label>
                      <select
                        name="priceCurrency" value={formData.priceCurrency}
                        onChange={handleChange}
                        className="bg-transparent border-0 border-b border-black/20 text-sm font-light text-[#1a1a1a] py-2 outline-none focus:border-[#1a1a1a] transition-colors duration-200 rounded-none w-full cursor-pointer appearance-none"
                      >
                        {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── RIGHT — images ── */}
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.26em] uppercase text-[#b0a898] mb-4">
                    03 — Product Images
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <label className={`${labelCls} mb-0`}>Photos</label>
                    <span className="text-[9px] tracking-[0.1em] text-[#b0a898]">
                      {images.length} / {MAX_IMAGES}
                    </span>
                  </div>

                  {images.length < MAX_IMAGES && (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`
                        border border-dashed py-10 flex flex-col items-center justify-center gap-2
                        cursor-pointer transition-all duration-200
                        ${isDragging ? 'border-[#1a1a1a] bg-black/[0.03]' : 'border-black/20 hover:border-black/40 hover:bg-black/[0.02]'}
                      `}
                    >
                      <UploadIcon />
                      <p className="text-[10px] font-light text-[#6a6458]">
                        Drop images or <span className="border-b border-black/30">browse</span>
                      </p>
                      <input
                        ref={fileInputRef} type="file" accept="image/*"
                        multiple onChange={handleFileChange} className="hidden"
                      />
                    </div>
                  )}

                  {images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      {images.map((img, index) => (
                        <div
                          key={index}
                          className={`relative overflow-hidden bg-[#ede8df] group
                            ${index === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}
                          `}
                        >
                          <img
                            src={img.preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {index === 0 && (
                            <div className="absolute bottom-2 left-2 bg-[#F5F1EB]/90 px-1.5 py-0.5">
                              <span className="text-[7px] tracking-[0.1em] uppercase text-[#1a1a1a] font-medium">Cover</span>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 w-5 h-5 bg-[#F5F1EB]/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <RemoveIcon />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* ── Footer Button ── */}
            <div className="mt-12 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-[13px] font-light text-[#9a9080]">
                Listing will be visible to buyers immediately after publishing.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-3.5 bg-[#1a1a1a] text-[#F5F1EB] text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-[#2e2e2e] transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;