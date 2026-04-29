import React, { useEffect } from 'react';
import { useProducts } from '../hook/useProducts';
import { useSelector } from 'react-redux';
import { Link , useNavigate} from 'react-router';

const Dashboard = () => {
    const { handleGetSellerProduct } = useProducts();
    const sellerProducts = useSelector(state => state.product.sellerProducts);

    useEffect(() => {
        handleGetSellerProduct();
    }, []);

    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-white text-black font-sans px-6 md:px-12 py-12">
            <div className="max-w-7xl mx-auto">
                
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-extrabold uppercase tracking-tight">Seller Catalog</h1>
                        <p className="text-gray-500 mt-2 text-sm">Manage and view your active product listings.</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-6 items-center">
                        <span className="text-xs font-bold tracking-[0.15em] text-gray-400 border border-gray-200 px-3 py-1 uppercase">
                            {sellerProducts?.length || 0} ITEMS
                        </span>
                        <Link to="/seller/create" className="text-xs font-bold tracking-[0.15em] uppercase text-white bg-black px-5 py-2 hover:bg-gray-900 transition-colors">
                            + ADD NEW
                        </Link>
                    </div>
                </div>

                {/* Product Grid */}
                {(!sellerProducts || sellerProducts.length === 0) ? (
                    <div className="text-center py-32 border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center">
                        <p className="text-gray-500 mb-4 tracking-wide">No products found in your catalog.</p>
                        <Link to="/seller/create" className="text-xs font-bold tracking-widest text-black border-b border-black pb-1 uppercase hover:text-gray-600 transition-colors">
                            Create your first product
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
                        {sellerProducts.map(product => (
                            <div key={product._id} className="group cursor-pointer flex flex-col">
                                {/* Image Container */}
                                <div onClick={()=>{
                        navigate(`/seller/product/${product._id}`)
                    }}  className="aspect-4/5 bg-gray-100 overflow-hidden mb-4 relative">
                                    {product.images?.[0]?.url ? (
                                        <img 
                                            src={product.images[0].url} 
                                            alt={product.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                                            No Image
                                        </div>
                                    )}
                                    {/* Hover overlay hint */}
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                
                                {/* Info */}
                                <div className="flex flex-col flex-1">
                                    <h3 className="text-sm font-extrabold uppercase tracking-wide truncate mb-1">
                                        {product.title}
                                    </h3>
                                    <p className="text-gray-500 font-medium text-sm mt-auto">
                                        {product.price?.Currency} {product.price?.amount}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Dashboard;