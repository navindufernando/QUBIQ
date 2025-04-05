"use client";

import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PaletteIcon from "@mui/icons-material/Palette";

// Simple state management using a shared store
const profileStore = {
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    picture: null,
    city: "",
    country: "",
    role: "",
    team: "",
    project: ""
  },
  setProfile: (newProfile) => {
    profileStore.profile = { ...profileStore.profile, ...newProfile };
  }
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profilePic, setProfilePic] = useState(null);

  const tabs = [
    { id: "profile", label: "Profile", icon: "user" },
    { id: "notifications", label: "Notifications", icon: "bell" },
    { id: "security", label: "Security & Privacy", icon: "shield" },
    { id: "appearance", label: "Appearance", icon: "eye" },
    { id: "billing", label: "Billing", icon: "credit-card" },
  ];

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "user":
        return <PersonIcon className="h-5 w-5" />;
      case "bell":
        return <NotificationsIcon className="h-5 w-5" />;
      case "shield":
        return <SecurityIcon className="h-5 w-5" />;
      case "eye":
        return <VisibilityIcon className="h-5 w-5" />;
      case "credit-card":
        return <CreditCardIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProfile = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      bio: formData.get("bio"),
      picture: profilePic || profileStore.profile.picture,
      city: formData.get("city"),
      country: formData.get("country"),
      role: formData.get("role"),
      team: formData.get("team"),
      project: formData.get("project")
    };
    profileStore.setProfile(updatedProfile);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
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

              <div className="flex mb-8">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mr-6">
                  {profilePic || profileStore.profile.picture ? (
                    <img src={profilePic || profileStore.profile.picture} alt="Profile" className="w-full h-full rounded-full object-cover" />
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
                    className="mt-2"
                  />
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
                    defaultValue={profileStore.profile.firstName}
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
                    defaultValue={profileStore.profile.lastName}
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
                    defaultValue={profileStore.profile.email}
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
                    defaultValue={profileStore.profile.phone}
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
                    defaultValue={profileStore.profile.city}
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
                    defaultValue={profileStore.profile.country}
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
                    defaultValue={profileStore.profile.role}
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
                    defaultValue={profileStore.profile.team}
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
                    defaultValue={profileStore.profile.project}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
                    defaultValue={profileStore.profile.bio}
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
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-700"
                    >
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
                    <label
                      htmlFor="mentions"
                      className="font-medium text-gray-700"
                    >
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
                    <label
                      htmlFor="tasks"
                      className="font-medium text-gray-700"
                    >
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
                    <label
                      htmlFor="deadlines"
                      className="font-medium text-gray-700"
                    >
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
                  <label
                    htmlFor="push-everything"
                    className="ml-3 font-medium text-gray-700"
                  >
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
                  <label
                    htmlFor="push-email"
                    className="ml-3 font-medium text-gray-700"
                  >
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
                  <label
                    htmlFor="push-nothing"
                    className="ml-3 font-medium text-gray-700"
                  >
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

            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">Theme</h3>

              <div className="grid grid-cols-3 gap-4">
                <div className="border border-gray-200 p-4 rounded-md cursor-pointer bg-white relative">
                  <div className="h-20 bg-white border border-gray-200 rounded-md mb-2 flex items-center justify-center text-gray-400">
                    <WbSunnyIcon className="h-6 w-6" />
                  </div>
                  <div className="font-medium text-gray-900 text-center">
                    Light
                  </div>
                  <div className="absolute top-2 right-2">
                    <SecurityIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>

                <div className="border border-gray-200 p-4 rounded-md cursor-pointer bg-white">
                  <div className="h-20 bg-gray-800 rounded-md mb-2 flex items-center justify-center text-gray-400">
                    <DarkModeIcon className="h-6 w-6" />
                  </div>
                  <div className="font-medium text-gray-900 text-center">
                    Dark
                  </div>
                </div>

                <div className="border border-gray-200 p-4 rounded-md cursor-pointer bg-white">
                  <div className="h-20 bg-gradient-to-r from-white to-gray-800 rounded-md mb-2 flex items-center justify-center text-gray-400">
                    <PaletteIcon className="h-6 w-6" />
                  </div>
                  <div className="font-medium text-gray-900 text-center">
                    System
                  </div>
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center px-6 py-4 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">{renderIcon(tab.icon)}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
export { profileStore };