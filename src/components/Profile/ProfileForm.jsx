import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const ProfileForm = ({ name, email, onNameChange, onEmailChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validatePasswords = () => {
    if (newPassword && newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }

    setPasswordError('');
    return true;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Personal Information</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                         shadow-sm focus:border-green-500 dark:focus:border-[#00DFA2] focus:ring-green-500 dark:focus:ring-[#00DFA2]
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                         shadow-sm focus:border-green-500 dark:focus:border-[#00DFA2] focus:ring-green-500 dark:focus:ring-[#00DFA2]
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3"
              placeholder="you@example.com"
            />
          </div>
        </div>
      </div>

      {/* <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-5">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Current Password
            </label>
            <div className="relative mt-1">
              <input
                id="current-password"
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 
                          shadow-sm focus:border-green-500 dark:focus:border-[#00DFA2] focus:ring-green-500 dark:focus:ring-[#00DFA2]
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                validatePasswords();
              }}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                        shadow-sm focus:border-green-500 dark:focus:border-[#00DFA2] focus:ring-green-500 dark:focus:ring-[#00DFA2]
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm New Password
            </label>
            <div className="relative mt-1">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validatePasswords();
                }}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 
                          shadow-sm focus:border-green-500 dark:focus:border-[#00DFA2] focus:ring-green-500 dark:focus:ring-[#00DFA2]
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {passwordError && (
            <p className="text-sm text-red-600 dark:text-red-400">{passwordError}</p>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default ProfileForm;
