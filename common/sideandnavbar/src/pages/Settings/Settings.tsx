"use client";

import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExtensionIcon from "@mui/icons-material/Extension";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PaletteIcon from "@mui/icons-material/Palette";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import TrelloIcon from "@mui/icons-material/ViewKanban";
import GitHubIcon from "@mui/icons-material/Code";
import VideocamIcon from "@mui/icons-material/Videocam";
import EditIcon from "@mui/icons-material/Edit";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: "user" },
    { id: "notifications", label: "Notifications", icon: "bell" },
    { id: "security", label: "Security & Privacy", icon: "shield" },
    { id: "appearance", label: "Appearance", icon: "eye" },
    { id: "integrations", label: "Integrations", icon: "puzzle" },
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
      case "puzzle":
        return <ExtensionIcon className="h-5 w-5" />;
      case "credit-card":
        return <CreditCardIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-800 mb-6">
              Personal Information
            </h2>

            <div className="flex mb-8">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mr-6">
                <PersonIcon className="h-12 w-12 text-gray-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Profile Picture</h3>
                <p className="text-gray-500 mb-3 text-sm">
                  This will be displayed on your profile and in comments
                </p>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                    Upload new picture
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  defaultValue="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  defaultValue="Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  defaultValue="john.smith@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone number
                </label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  defaultValue="+94 71 831 7219"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
                  defaultValue="Project Manager with 5+ years of experience in agile development environments."
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Brief description for your profile. URLs are hyperlinked.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                Save changes
              </button>
            </div>
          </div>
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

            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">
                Two-Factor Authentication
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Add an extra layer of security to your account
              </p>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium text-gray-700">
                    Two-factor authentication is disabled
                  </p>
                  <p className="text-gray-500 text-sm">
                    Protect your account by enabling 2FA
                  </p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                  Enable
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">Sessions</h3>
              <p className="text-gray-500 text-sm mb-4">
                Manage your active sessions
              </p>

              <div className="bg-white shadow overflow-hidden rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  <li className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">
                          Chrome on Windows
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <p>192.168.1.123</p>
                          <span className="mx-2">•</span>
                          <p>Current session</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">
                        Active now
                      </span>
                    </div>
                  </li>
                  <li className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">
                          Safari on Mac
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <p>86.75.30.9</p>
                          <span className="mx-2">•</span>
                          <p>2 days ago</p>
                        </div>
                      </div>
                      <button className="text-red-600 text-sm font-medium hover:text-red-700">
                        Revoke
                      </button>
                    </div>
                  </li>
                  <li className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">
                          Mobile App on iPhone
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <p>104.214.139.88</p>
                          <span className="mx-2">•</span>
                          <p>5 days ago</p>
                        </div>
                      </div>
                      <button className="text-red-600 text-sm font-medium hover:text-red-700">
                        Revoke
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700">
                Log out all other sessions
              </button>
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
      case "integrations":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-800 mb-6">
              Integrations
            </h2>

            <div className="mb-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-md bg-blue-100 mr-4">
                    <TrelloIcon className="h-8 w-8 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Trello</h3>
                    <p className="text-gray-500 text-sm">
                      Import and sync Trello boards
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-green-700 font-medium">
                    Connected
                  </span>
                  <button className="text-red-600 text-sm font-medium hover:text-red-700">
                    Disconnect
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-md bg-purple-100 mr-4">
                    <GitHubIcon className="h-8 w-8 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">GitHub</h3>
                    <p className="text-gray-500 text-sm">
                      Link repositories and track issues
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                  Connect
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-md bg-red-100 mr-4">
                    <VideocamIcon className="h-8 w-8 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Zoom</h3>
                    <p className="text-gray-500 text-sm">
                      Schedule and join meetings
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                  Connect
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
