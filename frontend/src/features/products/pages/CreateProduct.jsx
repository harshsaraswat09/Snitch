import React, { useState } from 'react';
import { useProducts } from "../hook/useProducts.js";
import { Link } from 'react-router'; // 1. Import Link from react-router

const CreateProduct = () => {
  const { handleCreateProduct } = useProducts();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceAmount: '',
    priceCurrency: 'INR',
    category: 'tees',
  });
  const [images, setImages] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (images.length + newFiles.length > 7) {
        alert("You can only upload a maximum of 7 images.");
        return;
      }
      
      const newImageObjects = newFiles.map(file => ({
        file: file,
        previewUrl: URL.createObjectURL(file)
      }));
      
      setImages(prev => [...prev, ...newImageObjects]);
    }
    e.target.value = null; // reset to allow same file selection
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleCreateProduct) {
      await handleCreateProduct({ ...formData, images });
    } else {
      console.log("Submitting Product:", { ...formData, images });
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      priceAmount: '',
      priceCurrency: 'INR',
      category: 'tees',
    });
    setImages([]);
    
    // Show success message
    setSuccessMsg("Product created successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="h-screen overflow-hidden bg-white text-black font-sans px-6 md:px-12 py-8 flex flex-col">
      <div className="w-full max-w-6xl mx-auto flex flex-col flex-1 min-h-0">
        
        {/* Success Message Toast */}
        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 text-sm font-medium tracking-wide flex items-center justify-center transition-all animate-bounce-in">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            {successMsg}
          </div>
        )}

        {/* 2. UPDATED Header Section with Flexbox */}
        <div className="mb-10 shrink-0 flex flex-col md:flex-row md:items-start justify-between gap-6 text-center md:text-left">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight uppercase">
              Create Product
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Add a new catalog item.
            </p>
          </div>
          
          {/* Top Right Dashboard Button */}
          <Link 
            to="/seller/dashboard" 
            className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest border border-gray-300 px-6 py-3 hover:border-black transition-colors shrink-0"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-12 lg:gap-16 flex-1 min-h-0 space-y-12 lg:space-y-0">
          
          {/* Left Column: Form Details & Actions */}
          <div className="lg:col-span-7 flex flex-col h-full overflow-y-auto pr-4 pb-4">
            
            <div className="space-y-8">
              {/* Title input */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase">
                  Product Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-gray-200 py-3 text-lg placeholder-gray-300 outline-none transition-colors focus:border-black rounded-none"
                  placeholder="e.g. Oversized Heavyweight Tee"
                />
              </div>

              {/* Description textarea */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-gray-200 py-3 text-base placeholder-gray-300 outline-none transition-colors focus:border-black resize-y min-h-30 rounded-none"
                  placeholder="Detailed product materials, fit, and care instructions..."
                />
              </div>

              {/* Pricing Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-2">
                  <label htmlFor="priceAmount" className="block text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase">
                    Price Amount
                  </label>
                  <input
                    id="priceAmount"
                    name="priceAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.priceAmount}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-gray-200 py-3 text-lg placeholder-gray-300 outline-none transition-colors focus:border-black rounded-none"
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="priceCurrency" className="block text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase">
                    Currency
                  </label>
                  <div className="relative">
                    <select
                      id="priceCurrency"
                      name="priceCurrency"
                      value={formData.priceCurrency}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-200 py-3 text-lg outline-none transition-colors focus:border-black appearance-none cursor-pointer rounded-none"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="INR">INR (₹)</option>
                    </select>
                    <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="space-y-2 lg:col-span-12">
                <label htmlFor="category" className="block text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase">
                  Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-200 py-3 text-lg outline-none transition-colors focus:border-black appearance-none cursor-pointer rounded-none capitalize"
                  >
                    <option value="tees">Tees</option>
                    <option value="pants">Pants</option>
                    <option value="hoodies">Hoodies</option>
                    <option value="jerseys">Jerseys</option>
                    <option value="polos">Polos</option>
                    <option value="tanktops">Tank Tops</option>
                  </select>
                  <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-8 lg:mt-auto">
              <button
                type="submit"
                className="w-full bg-black text-white py-5 text-sm font-bold tracking-[0.2em] uppercase hover:bg-gray-900 transition-colors shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Publish Item
              </button>
            </div>
            
          </div>

          {/* Right Column: Image Upload section */}
          <div className="lg:col-span-5 h-full overflow-y-auto pr-4 pb-4 space-y-6">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase">
                Gallery Images
              </label>
              <span className="text-xs text-gray-400 font-medium">
                {images.length} / 7
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Render selected image previews */}
              {images.map((imgObj, idx) => (
                <div key={idx} className="group relative aspect-4/5 bg-gray-100 overflow-hidden border border-gray-200">
                  <img 
                    src={imgObj.previewUrl} 
                    alt={`Preview ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Remove button overlays on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button" 
                      onClick={() => handleRemoveImage(idx)}
                      className="bg-white text-black p-2 rounded-full transform scale-90 group-hover:scale-100 transition-transform"
                      title="Remove Image"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              {/* Upload Button Box - only show if under 7 images */}
              {images.length < 7 && (
                <label className="aspect-4/5 cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-gray-50 shrink-0 hover:bg-gray-100 hover:border-black/30 transition-colors group">
                  <div className="bg-white p-3 rounded-full shadow-sm text-gray-400 group-hover:text-black transition-colors mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium tracking-wide text-gray-500 uppercase group-hover:text-black transition-colors">
                    Add Image
                  </span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    className="hidden" 
                    onChange={handleImageUpload} 
                  />
                </label>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;