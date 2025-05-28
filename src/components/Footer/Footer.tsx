import React from 'react';
import FooterLinks from './FooterLinks';
import FooterNewsletter from './FooterNewsletter';
import FooterSocial from './FooterSocial';
import FooterLegal from './FooterLegal';
import { CodeSquare as CodeBracketSquare } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-16 overflow-hidden bg-gradient-to-b from-gray-950 to-black border-t border-gray-800">
      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${3 + Math.random() * 3}s infinite`,
              opacity: 0.3 + Math.random() * 0.5
            }}
          />
        ))}
      </div>
      
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-70 blur-sm"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Logo and tagline */}
        <div className="flex flex-col items-center md:items-start mb-10">
          <div className="flex items-center gap-2 mb-3">
            <CodeBracketSquare className="w-8 h-8 text-green-400" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 text-transparent bg-clip-text">
              LeetStart
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-md text-center md:text-left">
            Enter the forest of logic. Every leaf is a pattern. Every tree, a constraint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
          <FooterLinks 
            title="Platform" 
            links={[
              { label: "Problems", href: "/problems" },
              { label: "Learn", href: "/learn" },
              { label: "Compete", href: "/compete" },
              { label: "Jobs", href: "/jobs" }
            ]} 
          />
          
          <FooterLinks 
            title="Resources" 
            links={[
              { label: "Algorithm Library", href: "/resources/algorithms" },
              { label: "Data Structures", href: "/resources/data-structures" },
              { label: "Interview Prep", href: "/resources/interview-prep" },
              { label: "Problem Sets", href: "/resources/problem-sets" }
            ]} 
          />
          
          <FooterSocial />
          
          <FooterNewsletter />
        </div>

        <FooterLegal />
      </div>
    </footer>
  );
};

export default Footer;