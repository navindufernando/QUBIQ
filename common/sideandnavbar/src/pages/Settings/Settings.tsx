"use client"

import { useState } from "react"
import PersonIcon from '@mui/icons-material/Person'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SecurityIcon from '@mui/icons-material/Security'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ExtensionIcon from '@mui/icons-material/Extension'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import PaletteIcon from '@mui/icons-material/Palette'
import ViewComfyIcon from '@mui/icons-material/ViewComfy'
import TrelloIcon from '@mui/icons-material/ViewKanban'
import GitHubIcon from '@mui/icons-material/Code'
import VideocamIcon from '@mui/icons-material/Videocam'
import EditIcon from '@mui/icons-material/Edit'

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { id: "profile", label: "Profile", icon: "user" },
    { id: "notifications", label: "Notifications", icon: "bell" },
    { id: "security", label: "Security & Privacy", icon: "shield" },
    { id: "appearance", label: "Appearance", icon: "eye" },
    { id: "integrations", label: "Integrations", icon: "puzzle" },
    { id: "billing", label: "Billing", icon: "credit-card" },
  ]

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "user":
        return <PersonIcon className="h-5 w-5" />
      case "bell":
        return <NotificationsIcon className="h-5 w-5" />
      case "shield":
        return <SecurityIcon className="h-5 w-5" />
      case "eye":
        return <VisibilityIcon className="h-5 w-5" />
      case "puzzle":
        return <ExtensionIcon className="h-5 w-5" />
      case "credit-card":
        return <CreditCardIcon className="h-5 w-5" />
      default:
        return null
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-800 mb-6">Personal Information</h2>

            <div className="flex mb-8">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mr-6">
                <PersonIcon className="h-12 w-12 text-gray-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Profile Picture</h3>
                <p className="text-gray-500 mb-3 text-sm">This will be displayed on your profile and in comments</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" defaultValue="John" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  defaultValue="Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  defaultValue="john.smith@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  defaultValue="+94 71 831 7219"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
                  defaultValue="Project Manager with 5+ years of experience in agile development environments."
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Brief description for your profile. URLs are hyperlinked.</p>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                Save changes
              </button>
            </div>
          </div>
        )
      case "notifications":
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-800 mb-6">Notification Preferences</h2>

            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">Email Notifications</h3>

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
                    <p className="text-gray-500 text-sm">Get notified when someone comments on your projects</p>
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
                    <p className="text-gray-500 text-sm">Get notified when someone mentions you</p>
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
                    <p className="text-gray-500 text-sm">Get notified when tasks are assigned to you</p>
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
                    <p className="text-gray-500 text-sm">Get reminded about upcoming deadlines</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4">Push Notifications</h3>
              <p className="text-gray-500 text-sm mb-4">These are delivered via SMS to your mobile phone.</p>

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
        )
      
      default:
        return null
    }
  }

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
  )
}

export default Settings