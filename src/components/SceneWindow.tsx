import React, { ReactNode, useEffect, useRef } from 'react';

interface SceneWindowProps {
  children: ReactNode;
}

const SceneWindow: React.FC<SceneWindowProps> = ({ children }) => {
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!windowRef.current) return;
      
      const rect = windowRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const deltaX = (mouseX - centerX) / (rect.width / 2);
      const deltaY = (mouseY - centerY) / (rect.height / 2);
      
      const rotateY = deltaX * 5; // Max 5 degrees
      const rotateX = -deltaY * 5; // Max 5 degrees
      
      windowRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={windowRef} 
      className="relative w-full max-w-4xl mx-auto transition-transform duration-300 ease-out"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative rounded-xl overflow-hidden backdrop-blur-md bg-gray-900/70 border border-gray-700/50 shadow-2xl">
        {/* Window title bar */}
        <div className="bg-gray-800/80 px-4 py-3 flex items-center border-b border-gray-700/50">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-gray-400 text-sm font-medium">
            leetstart.io
          </div>
          <div className="w-4"></div>
        </div>
        
        {/* Window content */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          {children}
        </div>
      </div>
      
      {/* Reflection effect */}
      <div 
        className="absolute inset-0 rounded-xl opacity-30 blur-sm"
        style={{ 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          transform: 'translateY(10px) scale(0.95) rotateX(180deg)',
          filter: 'blur(20px)',
          pointerEvents: 'none'
        }}
      ></div>
    </div>
  );
};

export default SceneWindow;