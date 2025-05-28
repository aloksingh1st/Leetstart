import React from 'react';

const FooterLinks = ({ title, links }) => {
  return (
    <div className="footer-links">
      <h3 className="text-white text-lg font-medium mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a 
              href={link.href} 
              className="text-gray-400 hover:text-green-400 transition-colors duration-300 text-sm flex items-center group"
            >
              <span className="opacity-0 -ml-4 mr-1 group-hover:opacity-100 transition-opacity duration-300">
                {'>'}
              </span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;