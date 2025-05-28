import React, { useState } from 'react';
import { Send } from 'lucide-react';

const FooterNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      
      // Reset success state after a delay
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="footer-newsletter">
      <h3 className="text-white text-lg font-medium mb-4">Join Our Newsletter</h3>
      <p className="text-gray-400 text-sm mb-4">
        Get weekly coding tips, new problems, and community updates.
      </p>
      
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-gray-900 text-gray-300 py-2 px-4 pr-10 rounded border border-gray-800 
                    focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 
                    transition-all duration-200"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className={`absolute right-1 top-1 p-1 rounded ${
            isSuccess 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-800 text-green-400 hover:bg-gray-700 hover:text-green-300'
          } transition-colors duration-200`}
        >
          <Send size={18} className={isSubmitting ? 'animate-pulse' : ''} />
        </button>
      </form>
      
      {isSuccess && (
        <p className="text-green-400 text-xs mt-2 animate-fade-in">
          Thanks for subscribing!
        </p>
      )}
    </div>
  );
};

export default FooterNewsletter;