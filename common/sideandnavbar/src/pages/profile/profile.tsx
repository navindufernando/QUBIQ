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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { profileStore } from '../settings/Settings';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('profile');
    return savedProfile ? JSON.parse(savedProfile) : profileStore.profile;
  });
  const [teamMembers, setTeamMembers] = useState(() => {
    const savedTeam = localStorage.getItem('teamMembers');
    return savedTeam ? JSON.parse(savedTeam) : [];
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editName, setEditName] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);

  useEffect(() => {
    const updateProfile = () => {
      setProfile({ ...profileStore.profile });
      localStorage.setItem('profile', JSON.stringify(profileStore.profile));
    };
    updateProfile();
  }, []);

  useEffect(() => {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
  }, [teamMembers]);

  const handleEditClick = () => {
    navigate('/settings');
  };

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      setTeamMembers([...teamMembers, newMemberName.trim()]);
      setNewMemberName('');
      setIsAdding(false);
    }
  };

  const handleEditMember = (index) => {
    setEditingIndex(index);
    setEditName(teamMembers[index]);
    handleCloseMenu();
  };

  const handleSaveEdit = (index) => {
    if (editName.trim()) {
      const updatedMembers = [...teamMembers];
      updatedMembers[index] = editName.trim();
      setTeamMembers(updatedMembers);
      setEditingIndex(null);
      setEditName('');
    }
  };

  const handleDeleteMember = (index) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
    handleCloseMenu();
  };

  const handleOpenMenu = (event, index) => {
    setMenuAnchorEl(event.currentTarget);
    setActiveMenuIndex(index);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setActiveMenuIndex(null);
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-50 p-6">
      {/* Left Side - Profile Section */}
      <div className="w-1/3 bg-white rounded-lg shadow-sm mr-4">
        <div className="relative">
          <div className="absolute top-4 right-4">
            <IconButton aria-label="more options" size="small">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </div>
          <div className="flex flex-col items-center justify-center p-8">
            <div className="w-32 h-32 mb-4 flex items-center justify-center bg-gray-100 rounded-full">
              {profile.picture ? (
                <img src={profile.picture} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <PersonIcon style={{ fontSize: 80 }} className="text-gray-400" />
              )}
            </div>
            <h2 className="text-lg font-medium mt-2">
              {profile.firstName || profile.lastName
                ? `${profile.firstName} ${profile.lastName}`.trim()
                : 'Unnamed User'}
            </h2>
            <p className="text-gray-600 mb-1">{profile.city || 'City not set'}</p>
            <p className="text-gray-600 mb-4">{profile.country || 'Country not set'}</p>
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
                },
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
            <span className="text-gray-700">{profile.role || 'Role not set'}</span>
          </div>
          <div className="flex items-center py-4 px-8 border-t border-gray-100">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <NotificationsIcon className="h-5 w-5 text-gray-500" />
            </div>
            <span className="text-gray-700">{profile.team || 'Team not set'}</span>
          </div>
          <div className="flex items-center py-4 px-8 border-t border-gray-100">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <PhoneIcon className="h-5 w-5 text-gray-500" />
            </div>
            <span className="text-gray-700">{profile.phone || 'Phone not set'}</span>
          </div>
          <div className="flex items-center py-4 px-8 border-t border-gray-100">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <EmailIcon className="h-5 w-5 text-gray-500" />
            </div>
            <span className="text-gray-700">{profile.email || 'Email not set'}</span>
          </div>
          <div className="flex items-center py-4 px-8 border-t border-gray-100">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <CalendarTodayIcon className="h-5 w-5 text-gray-500" />
            </div>
            <span className="text-gray-700">{profile.project || 'Project not set'}</span>
          </div>
        </div>
      </div>

      {/* Right Side - UI Developer and Projects Sections */}
      <div className="w-2/3">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-4 relative">
          <div className="absolute top-4 right-4">
            <IconButton aria-label="more options" size="small">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </div>

          <h1 className="text-2xl font-medium text-gray-800 mb-4">UI Developer</h1>
          <p className="text-gray-600 mb-6">Team members I have worked with.</p>
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-gray-700 font-medium">Worked with</h3>
            <a href="#" className="text-purple-600 text-sm">View all</a>
          </div>

          {/* Team Members List */}
          <div className="space-y-2">
            {teamMembers.length === 0 ? (
              <p className="text-gray-500 text-sm">No team members added yet.</p>
            ) : (
              teamMembers.map((name, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md"
                >
                  {editingIndex === index ? (
                    <div className="flex items-center w-full">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm mr-2"
                        autoFocus
                      />
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleSaveEdit(index)}
                        sx={{ minWidth: '60px', mr: 1, backgroundColor: 'rgb(79, 70, 229)', '&:hover': { backgroundColor: 'rgb(67, 56, 202)' } }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setEditingIndex(null)}
                        sx={{ minWidth: '60px', borderColor: 'rgb(209, 213, 219)', color: 'rgb(55, 65, 81)' }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full bg-${
                          ['blue', 'green', 'purple', 'red', 'yellow'][index % 5]
                        }-100 flex items-center justify-center mr-3`}>
                          <PeopleIcon className="h-6 w-6 text-blue-500" />
                        </div>
                        <span className="text-gray-700">{name}</span>
                      </div>
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleOpenMenu(e, index)}
                        aria-controls={`menu-${index}`}
                        aria-haspopup="true"
                      >
                        <MoreVertIcon fontSize="small" className="text-gray-400" />
                      </IconButton>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Context Menu for Edit/Delete */}
          <Menu
            id={`member-menu-${activeMenuIndex}`}
            anchorEl={menuAnchorEl}
            keepMounted
            open={Boolean(menuAnchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => handleEditMember(activeMenuIndex)}>
              <EditIcon fontSize="small" className="mr-2 text-gray-600" />
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleDeleteMember(activeMenuIndex)}>
              <DeleteIcon fontSize="small" className="mr-2 text-gray-600" />
              Delete
            </MenuItem>
          </Menu>

          {/* Add Team Member */}
          <div className="mt-4">
            {isAdding ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Enter team member name"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm mr-2"
                  autoFocus
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleAddMember}
                  sx={{ mr: 1, backgroundColor: 'rgb(79, 70, 229)', '&:hover': { backgroundColor: 'rgb(67, 56, 202)' } }}
                >
                  Add
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setIsAdding(false)}
                  sx={{ borderColor: 'rgb(209, 213, 219)', color: 'rgb(55, 65, 81)' }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => setIsAdding(true)}
                sx={{ backgroundColor: 'rgb(79, 70, 229)', '&:hover': { backgroundColor: 'rgb(67, 56, 202)' } }}
              >
                Add Team Member
              </Button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-800">Projects</h2>
            <a href="#" className="text-purple-600 text-sm">View all</a>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: 'E-Commerce Website', icon: <ImageIcon className="h-10 w-10 text-gray-400" /> },
              { name: 'Trading Platform', icon: <MenuBookIcon className="h-10 w-10 text-gray-400" /> },
              { name: 'Chat Application', icon: <CardGiftcardIcon className="h-10 w-10 text-gray-400" /> },
              { name: 'Mobile Development', icon: <ShoppingCartIcon className="h-10 w-10 text-gray-400" /> },
              { name: 'Web Development', icon: <PublicIcon className="h-10 w-10 text-gray-400" /> },
              { name: 'Portfolio', icon: <DarkModeIcon className="h-10 w-10 text-gray-400" /> },
            ].map((project, index) => (
              <div key={index} className="p-4 border border-gray-100 rounded-lg">
                <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                  {project.icon}
                </div>
                <p className="text-sm text-gray-700">{project.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;