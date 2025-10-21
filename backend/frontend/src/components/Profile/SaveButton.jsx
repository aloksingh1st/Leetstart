import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

const SaveButton = ({ onClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    setIsSaved(false);
    
    try {
      await onClick();
      setIsSaved(true);
      
      // Reset saved state after 2 seconds
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isLoading}
      className={`
        flex items-center justify-center px-5 py-3 rounded-lg font-medium text-white transition-all
        ${isLoading ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' : 
          isSaved ? 'bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800' : 
          'bg-[#00C16A] dark:bg-[#00DFA2] hover:bg-[#00B060] dark:hover:bg-[#00CB90]'}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-[#00DFA2]
        disabled:opacity-70
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Saving...
        </>
      ) : isSaved ? (
        <>
          <Check className="w-5 h-5 mr-2" />
          Saved!
        </>
      ) : (
        'Save Changes'
      )}
    </button>
  );
};

export default SaveButton;
