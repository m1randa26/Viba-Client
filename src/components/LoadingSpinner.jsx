import { useState, useEffect } from 'react';

export default function LoadingSpinner() {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 45) % 360);
    }, 150);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative">
        <div 
          className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
          style={{ transform: `rotate(${rotation}deg)` }}
        ></div>
      </div>
      <p className="mt-4 text-gray-700 font-medium">Cargando...</p>
    </div>
  );
}