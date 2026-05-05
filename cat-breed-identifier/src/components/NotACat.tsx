import React from 'react';

/**
 * OopsNotACat Component
 * * @param {string} imageUrl - The URL of the cat-at-computer sketch.
 * @param {string} className - Optional extra styling for the container.
 * @param {() => void} onAction - Function for the "Get me out of here" button.
 */

interface NotACatProps {
  imageUrl?: string;
  className?: string;
  onAction?: () => void;
}

export const OopsNotACat: React.FC<NotACatProps> = ({ 
  imageUrl = "/path-to-your-cat-sketch.jpg", 
  className = "",
  onAction = () => window.history.back()
}) => {
  return (
    <div className={`relative min-h-screen w-full flex items-center justify-center bg-[#fdfdfd] p-6 ${className}`}>
      
      {/* The background image (The cat at the laptop) */}
      <div 
        className="absolute inset-0 z-0 opacity-40 md:opacity-100"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* The Interactive Content Card */}
      <div className="relative z-10 max-w-lg w-full bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl p-10 shadow-2xl text-center transform hover:-rotate-1 transition-transform">
        <h1 className="text-7xl font-black text-gray-900 mb-2">
          Ooops
        </h1>
        <p className="text-2xl font-bold text-rose-500 mb-6 uppercase tracking-widest">
          Not a Cat
        </p>
        
        <div className="space-y-4">
          <p className="text-gray-600 text-lg leading-relaxed">
            Our feline developer is currently experiencing a 
            <span className="font-mono bg-gray-100 px-2 py-1 rounded mx-1 text-sm">404_Mew_Found</span> 
            error. 
          </p>
          
          <p className="text-gray-500 italic text-sm italic">
            (Actually, it’s a human error, but the cat is taking the blame.)
          </p>
        </div>

        <div className="mt-10">
          <button
            onClick={onAction}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Subtle UI Flair */}
      <div className="absolute bottom-8 right-8 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
        System Status: Hooman Not Functioning
      </div>
    </div>
  );
};

export default OopsNotACat;