import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Project = () => {
  const [projectName, setProjectName] = useState('');
  const [projectColor, setProjectColor] = useState('#3b82f6'); // Default blue color
  const navigate = useNavigate();

  const handleCreateProject = (e) => {
    e.preventDefault();
    
    if (!projectName.trim()) {
      alert('Please enter a project name');
      return;
    }
    
    // Get existing projects from localStorage or initialize empty array
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Create new project object
    const newProject = {
      id: Date.now().toString(),
      name: projectName,
      color: projectColor
    };
    
    // Add new project to array and save to localStorage
    const updatedProjects = [...existingProjects, newProject];
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    // Reset form
    setProjectName('');
    
    // Navigate back to home (or wherever you want to go after project creation)
    navigate('/');
  };

  const colorOptions = [
    { value: '#3b82f6', label: 'Blue' },
    { value: '#10b981', label: 'Green' },
    { value: '#ef4444', label: 'Red' },
    { value: '#f59e0b', label: 'Orange' },
    { value: '#8b5cf6', label: 'Purple' }
  ];

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Project</h1>
      
      <form onSubmit={handleCreateProject}>
        <div className="mb-4">
          <label htmlFor="projectName" className="block text-sm font-medium mb-2">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Project Color
          </label>
          <div className="flex space-x-3">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                type="button"
                className={`w-8 h-8 rounded-full border-2 ${projectColor === color.value ? 'border-gray-600' : 'border-transparent'}`}
                style={{ backgroundColor: color.value }}
                onClick={() => setProjectColor(color.value)}
                aria-label={`Select ${color.label} color`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create Project
          </button>
          <button
            type="button"
            className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default Project