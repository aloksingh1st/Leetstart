import React from 'react';
import { Github, Twitter, Youtube, Linkedin, MessageSquare } from 'lucide-react';

const FooterSocial = () => {
  const socialLinks = [
    { icon: <Github size={18} />, name: "GitHub", href: "#" },
    { icon: <Twitter size={18} />, name: "Twitter", href: "#" },
    { icon: <Youtube size={18} />, name: "YouTube", href: "#" },
    { icon: <Linkedin size={18} />, name: "LinkedIn", href: "#" },
    { icon: <MessageSquare size={18} />, name: "Discord", href: "#" },
  ];

  return (
    <div className="footer-social">
      <h3 className="text-white text-lg font-medium mb-4">Community</h3>
      <ul className="space-y-2">
        {socialLinks.map((link, index) => (
          <li key={index}>
            <a 
              href={link.href} 
              className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center text-sm gap-2 group"
            >
              <span className="transform group-hover:scale-110 transition-transform duration-200">
                {link.icon}
              </span>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSocial;