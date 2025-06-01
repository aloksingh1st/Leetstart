import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';

const ProfileAvatar = ({ profilePicture, onImageChange }) => {
  const [hover, setHover] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onImageChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-32 h-32 mx-auto mb-6">
      <div
        className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-md"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => fileInputRef.current?.click()}
      >
        <img
          src={profilePicture || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-200 cursor-pointer ${
            hover ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Camera className="w-8 h-8 text-white" />
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="Upload profile picture"
      />
      <span className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 dark:bg-[#00DFA2] rounded-full border-2 border-white dark:border-gray-700"></span>
    </div>
  );
};

export default ProfileAvatar;
