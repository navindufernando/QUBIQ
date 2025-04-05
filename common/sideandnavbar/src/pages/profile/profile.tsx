import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import ImageIcon from '@mui/icons-material/Image';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PublicIcon from '@mui/icons-material/Public';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { profileStore } from '../settings/Settings';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(profileStore.profile);

  useEffect(() => {
    const updateProfile = () => setProfile({ ...profileStore.profile });
    updateProfile();
  }, []);

  const handleEditClick = () => {
    navigate('/settings');
  };

  return (
    <div className="flex flex-row">
      {/* Left Side - Profile Section */}
      <div className="w-1/3 bg-white rounded-lg shadow-sm mr-4">
        <div className="relative">
          <div className="absolute top-4 right-4">
            <div className="dropdown">
              <IconButton aria-label="more options" size="small">
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-8">
            <div className="w-32 h-32 mb-4 flex items-center justify-center bg-gray-100 rounded-full">
              {profile.picture ? (
                <img src={profile.picture} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <PersonIcon style={{ fontSize: 80 }} className="text-gray-400" />
              )}
            </div>
            <h2 className="text-lg font-medium mt-2">{`${profile.firstName} ${profile.lastName}`}</h2>
            <p className="text-gray-600 mb-1">{profile.city}</p>
            <p className="text-gray-600 mb-4">{profile.country}</p>
            <Button 
              variant="outlined" 
              size="small"
              onClick={handleEditClick}
              sx={{
                borderColor: 'rgb(209, 213, 219)',
                color: 'rgb(55, 65, 81)',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgb(249, 250, 251)',
                  borderColor: 'rgb(209, 213, 219)',
                }
              }}
            >
              Edit Profile
            </Button>
          </div>
        </div>

        <div>
          <div className="flex items-center py-4 px-8 border-t border-gray-100">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <PersonIcon className="h-5 w-5 text-gray-500" />
            </div>
            <span className="text-gray-700">{profile.role}</span>
          </div>

          <div className="flex items-center py-4 px-8 border-t border-gray-100">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <NotificationsIcon className="h-5 w-5 text-gray-500" />
            </div>
            <span className="text-gray-700">{profile.team}</span>
          </div>

          <div className="flex items-center py-4 px-8 border-t border-gray-100">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <PhoneIcon className="h-5 w-5 text-gray-500" />
            </div>
            <span className="text-gray-700">{profile.phone}</span>
          </div>

          <div className="flex items-center py-4 px-8 border-t border-gray-100">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <EmailIcon className="h-5 w-5 text-gray-500" />
            </div>
            <span className="text-gray-700">{profile.email}</span>
          </div>

          <div className="flex items-center py-4 px-8 border-t border-gray-100">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <CalendarTodayIcon className="h-5 w-5 text-gray-500" />
            </div>
            <span className="text-gray-700">{profile.project}</span>
          </div>
        </div>
      </div>

      {/* Right Side - UI Developer and Projects Sections */}
      <div className="w-2/3">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-4 relative">
          <div className="absolute top-4 right-4">
            <div className="dropdown">
              <IconButton aria-label="more options" size="small">
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
          
          <h1 className="text-2xl font-medium text-gray-800 mb-4">UI Developer</h1>
          
          <p className="text-gray-600 mb-6">
            Team members I have worked with.
          </p>
          
          <div className="mb-2 flex justify-between items-center">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-gray-700 font-medium">Worked with</h3>
              <a href="#" className="text-purple-600 text-sm">View all</a>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                <PeopleIcon className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-xs text-gray-600">Naveesha</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                <PeopleIcon className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-xs text-gray-600">Warsha</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                <PeopleIcon className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-xs text-gray-600">Supun</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-2">
                <PeopleIcon className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-xs text-gray-600">Tharindu</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-2">
                <PeopleIcon className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-xs text-gray-600">Lahiru</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-800">Projects</h2>
            <a href="#" className="text-purple-600 text-sm">View all</a>
          </div>
  
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border border-gray-100 rounded-lg">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <ImageIcon className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-sm text-gray-700">E-Commerce Website</p>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <MenuBookIcon className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-sm text-gray-700">Trading Platform</p>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <CardGiftcardIcon className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-sm text-gray-700">Chat Application</p>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <ShoppingCartIcon className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-sm text-gray-700">Mobile Development</p>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <PublicIcon className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-sm text-gray-700">Web Development</p>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <DarkModeIcon className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-sm text-gray-700">Portfolio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;