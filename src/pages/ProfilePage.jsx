import React, { useEffect, useState } from 'react';
import ProfileAvatar from '../components/Profile/ProfileAvatar';
import ProfileForm from '../components/Profile/ProfileForm';
import StreakCalendar from '../components/Profile/StreakCalendar';
import RecentActivity from '../components/Profile/RecentActivity';
import SaveButton from '../components/Profile/SaveButton';
import { mockUserProfile } from '../data/mockData';
import { axiosInstance } from '../libs/axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState(mockUserProfile);
  const [streaks, setStreaks] = useState([]);
  const [recentProblems, setRecentProblems] = useState([]);
  const [dayStreak, setDayStreak] = useState([]);
  const [getProfile, setGetProfile] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);



  useEffect(() => {
    axiosInstance('/streaks').then((res) => {
      console.log(res.data);
      setStreaks(res.data.data);
    })
  },
    []);

  useEffect(() => {
    axiosInstance('/streaks/get5Submissions').then((res) => {
      console.log(res.data);
      setRecentProblems(res.data.submissions);
    })
  }, []);



  useEffect(() => {
    axiosInstance('/streaks/getLast30DaysSubmissionDates').then((res) => {
      console.log(res.data);
      setDayStreak(res.data.data);
    })
  }, []);

  useEffect(() => {
    axiosInstance('/auth/getUserProfile').then((res) => {
      console.log(res.data);
      setGetProfile(res.data.user);
    })
  }, []);



  const handleProfileUpdate = async() => {
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }
  
    try {
      const res = await axiosInstance.patch('/auth/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Updated profile:', res.data.user);
    } catch (err) {
      console.error('Profile update failed:', err);
    }
  }





  const handleProfilePictureChange = (imageBase64, file) => {
    setProfile((prev) => ({
      ...prev,
      profilePicture: imageBase64,
    }));
    setSelectedFile(file); // for upload later
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
                profilePicture={getProfile?.image}
                onImageChange={handleProfilePictureChange}
              />

              <div className="mt-6 space-y-8">
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StreakCalendar
                      currentStreak={streaks?.currentStreak}
                      longestStreak={streaks?.longestStreak}
                      streakDays={dayStreak}
                    />
                    <RecentActivity recentProblems={recentProblems} />
                  </div>
                </div>


                <ProfileForm
                  name={getProfile?.name}
                  email={getProfile?.email}
                  onNameChange={handleNameChange}
                  onEmailChange={handleEmailChange}
                />


                <div className="flex justify-center mt-8">
                  <SaveButton onClick={handleProfileUpdate} />
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
