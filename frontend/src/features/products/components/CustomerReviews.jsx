import React, { useState } from 'react';

const CustomerReviews = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [activeStar, setActiveStar] = useState(0);

  return (
    <div className="py-12 md:py-16 text-center border-t border-gray-100">
      <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Customer Reviews</h2>
      
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1 text-[#138e76]">
            {[1, 2, 3, 4, 5].map(star => (
              <svg key={star} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-gray-500 font-medium">Be the first to write a review</p>
        </div>

        <button 
          onClick={() => setIsWriting(!isWriting)}
          className="px-6 py-2.5 bg-[#138e76] text-white font-bold text-sm hover:bg-[#107a65] transition-colors border-2 border-white ring-1 ring-[#138e76]"
        >
          {isWriting ? 'Cancel review' : 'Write a review'}
        </button>
      </div>

      {isWriting && (
        <div className="mt-10 pt-10 border-t border-gray-100 max-w-2xl mx-auto flex flex-col items-center animate-fade-in-down">
          <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-6">Write a review</h3>
          
          <div className="mb-6 flex flex-col items-center gap-3">
            <span className="text-sm text-gray-500 font-medium tracking-wide">Rating</span>
            <div className="flex gap-1.5 text-[#138e76]">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setActiveStar(star)}
                  className="hover:scale-110 transition-transform"
                >
                  <svg 
                    width="32" 
                    height="32" 
                    fill={star <= activeStar ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 mb-6 text-left">
            <label className="text-sm text-gray-500 font-medium tracking-wide flex items-center justify-center gap-1">
              Review Title <span className="text-xs text-gray-400 font-normal">(100)</span>
            </label>
            <input 
              type="text" 
              placeholder="Give your review a title" 
              className="w-full border border-[#138e76]/40 p-3 text-sm focus:outline-none focus:border-[#138e76] transition-colors"
              maxLength={100}
            />
          </div>

          <div className="w-full flex flex-col gap-2 mb-8 text-left">
            <label className="text-sm text-gray-500 font-medium tracking-wide flex items-center justify-center">
              Review content
            </label>
            <textarea 
              rows="5"
              placeholder="Start writing here..." 
              className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#138e76] transition-colors resize-y"
            ></textarea>
          </div>
          
          <button 
            onClick={() => {
              setIsWriting(false);
              setActiveStar(0);
            }}
            className="w-full md:w-auto px-10 py-3 bg-[#138e76] text-white font-bold text-sm tracking-wide hover:bg-[#107a65] transition-colors border-2 border-white ring-1 ring-[#138e76]"
          >
            Submit Review
          </button>
          
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;
