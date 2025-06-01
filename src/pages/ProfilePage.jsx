import React, { useState } from 'react';
import ProfileAvatar from '../components/Profile/ProfileAvatar';
import ProfileForm from '../components/Profile/ProfileForm';
import StreakCalendar from '../components/Profile/StreakCalendar';
import RecentActivity from '../components/Profile/RecentActivity';
import SaveButton from '../components/Profile/SaveButton';
import ThemeToggle from '../components/Profile/ThemeToggle';
import { mockUserProfile } from '../data/mockData';

const ProfilePage = () => {
  const [profile, setProfile] = useState(mockUserProfile);

  const handleProfilePictureChange = (image) => {
    setProfile((prev) => ({
      ...prev,
      profilePicture: image
    }));
  };

  const handleNameChange = (name) => {
    setProfile((prev) => ({
      ...prev,
      name
    }));
  };

  const handleEmailChange = (email) => {
    setProfile((prev) => ({
      ...prev,
      email
    }));
  };

  const handleSaveChanges = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Profile saved:', profile);
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0B1120] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="max-w-3xl mx-auto">
          <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Profile
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Manage your account settings and coding progress
          </p>

          <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-md overflow-hidden transition-colors duration-200">
            <div className="p-6 sm:p-8">
              <ProfileAvatar
                profilePicture={profile.profilePicture}
                onImageChange={handleProfilePictureChange}
              />

              <div className="mt-6 space-y-8">
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StreakCalendar
                      currentStreak={profile.currentStreak}
                      longestStreak={profile.longestStreak}
                      streakDays={profile.streakDays}
                    />
                    <RecentActivity recentProblems={profile.recentProblems} />
                  </div>
                </div>


                <ProfileForm
                  name={profile.name}
                  email={profile.email}
                  onNameChange={handleNameChange}
                  onEmailChange={handleEmailChange}
                />


                <div className="flex justify-center mt-8">
                  <SaveButton onClick={handleSaveChanges} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
