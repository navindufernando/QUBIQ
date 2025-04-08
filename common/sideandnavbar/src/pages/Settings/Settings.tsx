"use client";

import { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PaletteIcon from "@mui/icons-material/Palette";
import { getProfile, updateProfile, uploadProfilePicture } from '../../services/authAPI';
import { useAuth } from '../Signup&Login/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    picture: null as string | null,
    city: "",
    country: "",
    role: "",
    team: "",
    project: ""
  });
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [theme, setTheme] = useState<string>(() => localStorage.getItem('theme') || 'system');

  const tabs = [
    { id: "profile", label: "Profile", icon: "user" },
    { id: "notifications", label: "Notifications", icon: "bell" },
    { id: "security", label: "Security & Privacy", icon: "shield" },
    { id: "appearance", label: "Appearance", icon: "eye" },
    { id: "billing", label: "Billing", icon: "credit-card" },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
        setProfilePic(response.data.picture);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (saveStatus) {
      const timer = setTimeout(() => setSaveStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');

      if (theme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.add(systemPrefersDark ? 'dark' : 'light');
      } else {
        root.classList.add(theme);
      }
      localStorage.setItem('theme', theme);
    };

    applyTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "user": return <PersonIcon className="h-5 w-5" />;
      case "bell": return <NotificationsIcon className="h-5 w-5" />;
      case "shield": return <SecurityIcon className="h-5 w-5" />;
      case "eye": return <VisibilityIcon className="h-5 w-5" />;
      case "credit-card": return <CreditCardIcon className="h-5 w-5" />;
      default: return null;
    }
  };

  const handleProfileSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedProfile = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      bio: formData.get("bio") as string,
      city: formData.get("city") as string,
      country: formData.get("country") as string,
      role: formData.get("role") as string,
      team: formData.get("team") as string,
      project: formData.get("project") as string
    };

    try {
      await updateProfile(updatedProfile);
      setProfile({ ...profile, ...updatedProfile });
      setSaveStatus("Profile saved successfully!");
      if (user) {
        const updatedUser = { ...user, firstName: updatedProfile.firstName, lastName: updatedProfile.lastName, email: updatedProfile.email };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
      setSaveStatus("Failed to save profile");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const response = await uploadProfilePicture(file);
        setProfilePic(response.data.picture);
        setProfile({ ...profile, picture: response.data.picture });
        setSaveStatus("Profile picture updated successfully!");
      } catch (error) {
        console.error('Failed to upload picture:', error);
        setSaveStatus("Failed to upload picture");
      }
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setSaveStatus("Theme updated successfully!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <form onSubmit={handleProfileSave}>
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-6">
                Personal Information
              </h2>

              {saveStatus && (
                <div className={`mb-4 p-3 rounded-md ${saveStatus.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {saveStatus}
                </div>
              )}

              <div className="flex mb-8 items-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mr-6">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <PersonIcon className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Profile Picture</h3>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="profile-pic-upload"
                  />
                  <label htmlFor="profile-pic-upload">
                    <button
                      type="button"
                      className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
                      onClick={() => document.getElementById("profile-pic-upload")?.click()}
                    >
                      Upload Picture
                    </button>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    defaultValue={profile.firstName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    defaultValue={profile.lastName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    defaultValue={profile.email}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    defaultValue={profile.phone}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    name="city"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    defaultValue={profile.city}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    name="country"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    defaultValue={profile.country}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <input
                    name="role"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    defaultValue={profile.role}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Team
                  </label>
                  <input
                    name="team"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    defaultValue={profile.team}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project
                  </label>
                  <input
                    name="project"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    defaultValue={profile.project}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
                    defaultValue={profile.bio}
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">
                    Brief description for your profile. URLs are hyperlinked.
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                  Save changes
                </button>
              </div>
            </div>
          </form>
        );
      case "notifications":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-800 mb-6">
              Notification Preferences
            </h2>

            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">
                Email Notifications
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="comments"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="comments" className="font-medium text-gray-700">
                      Comments
                    </label>
                    <p className="text-gray-500 text-sm">
                      Get notified when someone comments on your projects
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="mentions"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="mentions" className="font-medium text-gray-700">
                      Mentions
                    </label>
                    <p className="text-gray-500 text-sm">
                      Get notified when someone mentions you
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="tasks"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="tasks" className="font-medium text-gray-700">
                      Task assignments
                    </label>
                    <p className="text-gray-500 text-sm">
                      Get notified when tasks are assigned to you
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="deadlines"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="deadlines" className="font-medium text-gray-700">
                      Deadlines
                    </label>
                    <p className="text-gray-500 text-sm">
                      Get reminded about upcoming deadlines
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">
                Push Notifications
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                These are delivered via SMS to your mobile phone.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 text-indigo-600 border-gray-300"
                    defaultChecked
                  />
                  <label htmlFor="push-everything" className="ml-3 font-medium text-gray-700">
                    Everything
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label htmlFor="push-email" className="ml-3 font-medium text-gray-700">
                    Same as email
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label htmlFor="push-nothing" className="ml-3 font-medium text-gray-700">
                    No push notifications
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                Save preferences
              </button>
            </div>
          </div>
        );
      case "security":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-800 mb-6">
              Security & Privacy
            </h2>

            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">
                Change Password
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current password
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New password
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm new password
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <div className="mt-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                  Update password
                </button>
              </div>
            </div>
          </div>
        );
      case "appearance":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-800 mb-6">
              Appearance
            </h2>

            {saveStatus && (
              <div className={`mb-4 p-3 rounded-md ${saveStatus.includes('Failed namely') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {saveStatus}
              </div>
            )}

            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">Theme</h3>

              <div className="grid grid-cols-3 gap-4">
                <div
                  onClick={() => handleThemeChange('light')}
                  className={`border p-4 rounded-md cursor-pointer bg-white relative ${theme === 'light' ? 'border-indigo-600' : 'border-gray-200'}`}
                >
                  <div className="h-20 bg-white border border-gray-200 rounded-md mb-2 flex items-center justify-center text-gray-400">
                    <WbSunnyIcon className="h-6 w-6" />
                  </div>
                  <div className="font-medium text-gray-900 text-center">
                    Light
                  </div>
                  {theme === 'light' && (
                    <div className="absolute top-2 right-2">
                      <SecurityIcon className="h-5 w-5 text-indigo-600" />
                    </div>
                  )}
                </div>

                <div
                  onClick={() => handleThemeChange('dark')}
                  className={`border p-4 rounded-md cursor-pointer bg-white relative ${theme === 'dark' ? 'border-indigo-600' : 'border-gray-200'}`}
                >
                  <div className="h-20 bg-gray-800 rounded-md mb-2 flex items-center justify-center text-gray-400">
                    <DarkModeIcon className="h-6 w-6" />
                  </div>
                  <div className="font-medium text-gray-900 text-center">
                    Dark
                  </div>
                  {theme === 'dark' && (
                    <div className="absolute top-2 right-2">
                      <SecurityIcon className="h-5 w-5 text-indigo-600" />
                    </div>
                  )}
                </div>

                <div
                  onClick={() => handleThemeChange('system')}
                  className={`border p-4 rounded-md cursor-pointer bg-white relative ${theme === 'system' ? 'border-indigo-600' : 'border-gray-200'}`}
                >
                  <div className="h-20 bg-gradient-to-r from-white to-gray-800 rounded-md mb-2 flex items-center justify-center text-gray-400">
                    <PaletteIcon className="h-6 w-6" />
                  </div>
                  <div className="font-medium text-gray-900 text-center">
                    System
                  </div>
                  {theme === 'system' && (
                    <div className="absolute top-2 right-2">
                      <SecurityIcon className="h-5 w-5 text-indigo-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">Color Scheme</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="border-2 border-indigo-600 p-2 rounded-md cursor-pointer">
                  <div className="h-10 bg-indigo-600 rounded-md"></div>
                </div>
                <div className="border border-gray-200 p-2 rounded-md cursor-pointer">
                  <div className="h-10 bg-blue-600 rounded-md"></div>
                </div>
                <div className="border border-gray-200 p-2 rounded-md cursor-pointer">
                  <div className="h-10 bg-green-600 rounded-md"></div>
                </div>
                <div className="border border-gray-200 p-2 rounded-md cursor-pointer">
                  <div className="h-10 bg-purple-600 rounded-md"></div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">
                Sidebar Compact Mode
              </h3>
              <div className="flex items-center">
                <div className="form-switch inline-block align-middle">
                  <input
                    type="checkbox"
                    name="compact-mode"
                    id="compact-mode"
                    className="form-switch-checkbox"
                  />
                  <label
                    className="form-switch-label"
                    htmlFor="compact-mode"
                  ></label>
                </div>
                <label
                  htmlFor="compact-mode"
                  className="ml-2 text-sm text-gray-700"
                >
                  Enable compact sidebar mode
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                Save preferences
              </button>
            </div>
          </div>
        );
      case "billing":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-800 mb-6">
              Billing
            </h2>

            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">Payment Method</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="John Smith"
                  />
                </div>
              </div>

              <div className="mt-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                  Save Payment Method
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Embedded Global CSS */}
      <style>{`
        :root {
          --background: #f9fafb; /* Light mode background */
          --text: #1f2937; /* Light mode text */
          --card-bg: #ffffff; /* Light mode card background */
        }

        .dark {
          --background: #1f2937; /* Dark mode background */
          --text: #f9fafb; /* Dark mode text */
          --card-bg: #374151; /* Dark mode card background */
        }

        html, body {
          background-color: var(--background);
          color: var(--text);
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          height: 100%;
        }

        .bg-gray-50 {
          background-color: var(--background);
        }

        .bg-white {
          background-color: var(--card-bg);
        }

        .text-gray-800 {
          color: var(--text);
        }

        .text-gray-700 {
          color: var(--text);
        }

        .text-gray-900 {
          color: var(--text);
        }

        .text-gray-500 {
          color: #6b7280; /* Adjust for dark mode if needed */
        }

        .bg-indigo-50 {
          background-color: #eef2ff;
        }

        .text-indigo-600 {
          color: #4f46e5;
        }

        .bg-indigo-600 {
          background-color: #4f46e5;
        }

        .hover\\:bg-indigo-700:hover {
          background-color: #4338ca;
        }

        /* Ensure the app takes full height */
        #root {
          height: 100%;
        }

        /* Reset some default styles */
        * {
          box-sizing: border-box;
        }
      `}</style>

      {/* Component Markup */}
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 bg-white shadow-sm rounded-lg p-6 mr-6 mb-6 md:mb-0">
              <h1 className="text-2xl font-medium text-gray-800 mb-6">Settings</h1>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === tab.id
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {renderIcon(tab.icon)}
                    <span className="ml-3">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="md:w-3/4 bg-white shadow-sm rounded-lg p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;