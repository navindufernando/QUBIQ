import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../pages/Signup&Login/AuthContext';
import { getProfile } from './../services/authAPI';

interface NavBarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavBarProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await getProfile();
        setProfilePicture(response.data.picture);
      } catch (error) {
        console.error('Failed to fetch profile picture:', error);
      }
    };

    if (user) {
      fetchProfilePicture();
    }
  }, [user]);

  const backgroundColor = 'rgba(123, 104, 238, 0.38)';

  // Dynamic user display
  const displayName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User' : 'Guest';
  const displayRole = user?.role || 'Unknown Role';

  return (
    <nav className='px-6 py-3 flex items-center' style={{ backgroundColor, borderBottom: '1px solid #E5E5E5' }}>
      {/* Left section - Hamburger menu */}
      <div className='flex-none mr-4'>
        <button className="text-gray-500" onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Middle section - Search */}
      <div className='flex-1 max-w-xl mx-auto'>
        <div className='relative flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 size-5 text-gray-400">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className='w-full pl-10 pr-4 py-2 rounded-md shadow-sm outline-none bg-white border border-gray-200'
          />
        </div>
      </div>

      {/* Right section - Action icons */}
      <div className='flex-none ml-4 flex items-center'>
        {/* Icon group */}
        <div className='flex items-center mr-8 space-x-6'>
          {/* Calendar icon */}
          <button className="text-gray-500 relative hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
          </button>

          {/* Messages icon */}
          <button className="text-gray-500 relative hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
          </button>

          {/* Notification icon with dot indicator */}
          <button className="text-gray-500 relative">
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </button>
        </div>

        {/* Separator line */}
        <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

        {/* User profile section with improved spacing */}
        <div className='flex items-center relative ml-8'>
          {/* Hide text on smaller screens */}
          <div className='text-right mr-4 hidden md:block'>
            <p className='font-medium text-sm'>{displayName}</p>
            <p className='text-xs text-gray-500 mt-0.5'>{displayRole}</p>
          </div>
          <button className='relative' onClick={toggleDropdown}>
            <img
              src={profilePicture || "/api/placeholder/48/48"}
              alt="Profile"
              className="size-10 rounded-full border-2 border-white object-cover"
              onError={(e) => (e.currentTarget.src = "/api/placeholder/48/48")}
            />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className='absolute z-10 mt-2 bg-white rounded-lg shadow w-32 top-full right-0'>
              <ul className='text-[#1A1A1A]'>
                <li
                  className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                  onClick={handleProfileClick}
                >
                  Profile
                </li>
                <li
                  className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;