import React from 'react';

const FooterLegal = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="pt-6 mt-6 border-t border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="text-gray-500 text-xs md:order-1 text-center md:text-left">
          © {currentYear} LeetStart. All rights reserved.
          <div className="inline-block md:hidden mx-2">•</div>
          <div className="block md:hidden my-1"></div>
          <span className="text-gray-600">
            Empowering developers to master the art of coding.
          </span>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center md:justify-end text-xs text-gray-500 md:order-2">
          <a href="#" className="hover:text-green-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-green-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-green-400 transition-colors">Cookies</a>
          <a href="#" className="hover:text-green-400 transition-colors">Help Center</a>
          <a href="#" className="hover:text-green-400 transition-colors">Contact</a>
        </div>
      </div>
    </div>
  );
};

export default FooterLegal;