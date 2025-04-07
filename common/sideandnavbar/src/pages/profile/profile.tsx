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
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getProfile } from '../../services/authAPI';
import { useAuth } from '../Signup&Login/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    picture: null,
    city: '',
    country: '',
    role: '',
    team: '',
    project: ''
  });
  
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  
  const [projects, setProjects] = useState<{ name: string; icon: string; image: string | null }[]>([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);
  const [editProjectName, setEditProjectName] = useState('');
  const [projectMenuAnchorEl, setProjectMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [activeProjectMenuIndex, setActiveProjectMenuIndex] = useState<number | null>(null);
  const [selectedProjectImage, setSelectedProjectImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();

    // Load team members and projects from localStorage
    const savedTeam = localStorage.getItem('teamMembers');
    if (savedTeam) setTeamMembers(JSON.parse(savedTeam));

    const savedProjects = localStorage.getItem('projects');
    setProjects(savedProjects ? JSON.parse(savedProjects) : [
      { name: 'E-Commerce Website', icon: 'ImageIcon', image: null },
      { name: 'Trading Platform', icon: 'MenuBookIcon', image: null },
      { name: 'Chat Application', icon: 'CardGiftcardIcon', image: null },
      { name: 'Mobile Development', icon: 'ShoppingCartIcon', image: null },
      { name: 'Web Development', icon: 'PublicIcon', image: null },
      { name: 'Portfolio', icon: 'DarkModeIcon', image: null },
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const handleEditClick = () => {
    navigate('/settings');
  };

  // Team Members Functions
  const handleAddMember = () => {
    if (newMemberName.trim()) {
      setTeamMembers([...teamMembers, newMemberName.trim()]);
      setNewMemberName('');
      setIsAdding(false);
    }
  };

  const handleEditMember = (index: number) => {
    setEditingIndex(index);
    setEditName(teamMembers[index]);
    handleCloseMenu();
  };

  const handleSaveEdit = (index: number) => {
    if (editName.trim()) {
      const updatedMembers = [...teamMembers];
      updatedMembers[index] = editName.trim();
      setTeamMembers(updatedMembers);
      setEditingIndex(null);
      setEditName('');
    }
  };

  const handleDeleteMember = (index: number) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
    handleCloseMenu();
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setMenuAnchorEl(event.currentTarget);
    setActiveMenuIndex(index);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setActiveMenuIndex(null);
  };

  // Project Functions
  const handleAddProject = () => {
    if (newProjectName.trim()) {
      const newProject = {
        name: newProjectName.trim(),
        icon: 'ImageIcon',
        image: selectedProjectImage
      };
      setProjects([...projects, newProject]);
      setNewProjectName('');
      setSelectedProjectImage(null);
      setIsAddingProject(false);
    }
  };

  const handleEditProject = (index: number) => {
    setEditingProjectIndex(index);
    setEditProjectName(projects[index].name);
    handleCloseProjectMenu();
  };

  const handleSaveProjectEdit = (index: number) => {
    if (editProjectName.trim()) {
      const updatedProjects = [...projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        name: editProjectName.trim(),
        image: selectedProjectImage || updatedProjects[index].image
      };
      setProjects(updatedProjects);
      setEditingProjectIndex(null);
      setEditProjectName('');
      setSelectedProjectImage(null);
    }
  };

  const handleDeleteProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    handleCloseProjectMenu();
  };

  const handleOpenProjectMenu = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setProjectMenuAnchorEl(event.currentTarget);
    setActiveProjectMenuIndex(index);
  };

  const handleCloseProjectMenu = () => {
    setProjectMenuAnchorEl(null);
    setActiveProjectMenuIndex(null);
  };

  const handleProjectImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedProjectImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'ImageIcon': return <ImageIcon className="h-10 w-10 text-gray-400" />;
      case 'MenuBookIcon': return <MenuBookIcon className="h-10 w-10 text-gray-400" />;
      case 'CardGiftcardIcon': return <CardGiftcardIcon className="h-10 w-10 text-gray-400" />;
      case 'ShoppingCartIcon': return <ShoppingCartIcon className="h-10 w-10 text-gray-400" />;
      case 'PublicIcon': return <PublicIcon className="h-10 w-10 text-gray-400" />;
      case 'DarkModeIcon': return <DarkModeIcon className="h-10 w-10 text-gray-400" />;
      default: return <ImageIcon className="h-10 w-10 text-gray-400" />;
    }
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

          {/* Context Menu for Edit/Delete Team Members */}
          <Menu
            id={`member-menu-${activeMenuIndex}`}
            anchorEl={menuAnchorEl}
            keepMounted
            open={Boolean(menuAnchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => handleEditMember(activeMenuIndex!)}>
              <EditIcon fontSize="small" className="mr-2 text-gray-600" />
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleDeleteMember(activeMenuIndex!)}>
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

        {/* Projects Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-gray-800">Projects</h2>
            <a href="#" className="text-purple-600 text-sm">View all</a>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {projects.length === 0 ? (
              <p className="text-gray-500 text-sm col-span-3">No projects added yet.</p>
            ) : (
              projects.map((project, index) => (
                <div 
                  key={index} 
                  className="p-4 border border-gray-100 rounded-lg relative group"
                >
                  {editingProjectIndex === index ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editProjectName}
                        onChange={(e) => setEditProjectName(e.target.value)}
                        placeholder="Project name"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        autoFocus
                      />
                      <div className="flex items-center justify-center w-full mb-3">
                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <AddPhotoAlternateIcon className="w-8 h-8 text-gray-400" />
                            <p className="text-xs text-gray-500">Add project image</p>
                          </div>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleProjectImageChange}
                          />
                        </label>
                      </div>
                      {selectedProjectImage && (
                        <div className="mb-3">
                          <img 
                            src={selectedProjectImage} 
                            alt="Preview" 
                            className="w-full h-24 object-cover rounded-lg" 
                          />
                        </div>
                      )}
                      <div className="flex justify-between">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleSaveProjectEdit(index)}
                          sx={{ flex: 1, mr: 1, backgroundColor: 'rgb(79, 70, 229)', '&:hover': { backgroundColor: 'rgb(67, 56, 202)' } }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => setEditingProjectIndex(null)}
                          sx={{ flex: 1, borderColor: 'rgb(209, 213, 219)', color: 'rgb(55, 65, 81)' }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        {project.image ? (
                          <img 
                            src={project.image} 
                            alt={project.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          getIconComponent(project.icon)
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-700">{project.name}</p>
                        <IconButton 
                          size="small" 
                          className="opacity-0 group-hover:opacity-100"
                          onClick={(e) => handleOpenProjectMenu(e, index)}
                        >
                          <MoreVertIcon fontSize="small" className="text-gray-400" />
                        </IconButton>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Context Menu for Projects */}
          <Menu
            id={`project-menu-${activeProjectMenuIndex}`}
            anchorEl={projectMenuAnchorEl}
            keepMounted
            open={Boolean(projectMenuAnchorEl)}
            onClose={handleCloseProjectMenu}
          >
            <MenuItem onClick={() => handleEditProject(activeProjectMenuIndex!)}>
              <EditIcon fontSize="small" className="mr-2 text-gray-600" />
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleDeleteProject(activeProjectMenuIndex!)}>
              <DeleteIcon fontSize="small" className="mr-2 text-gray-600" />
              Delete
            </MenuItem>
          </Menu>

          {/* Add Project */}
          <div className="mt-4">
            {isAddingProject ? (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Enter project name"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-3"
                  autoFocus
                />
                <div className="flex items-center justify-center w-full mb-3">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <AddPhotoAlternateIcon className="w-8 h-8 text-gray-400" />
                      <p className="text-xs text-gray-500">Click to upload project image</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleProjectImageChange}
                    />
                  </label>
                </div>
                {selectedProjectImage && (
                  <div className="mb-3">
                    <img 
                      src={selectedProjectImage} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded-lg" 
                    />
                  </div>
                )}
                <div className="flex justify-end">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setIsAddingProject(false);
                      setNewProjectName('');
                      setSelectedProjectImage(null);
                    }}
                    sx={{ mr: 2, borderColor: 'rgb(209, 213, 219)', color: 'rgb(55, 65, 81)' }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleAddProject}
                    sx={{ backgroundColor: 'rgb(79, 70, 229)', '&:hover': { backgroundColor: 'rgb(67, 56, 202)' } }}
                  >
                    Add Project
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => setIsAddingProject(true)}
                sx={{ backgroundColor: 'rgb(79, 70, 229)', '&:hover': { backgroundColor: 'rgb(67, 56, 202)' } }}
              >
                Add Project
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
