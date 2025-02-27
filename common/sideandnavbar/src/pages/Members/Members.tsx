import React, { useState } from 'react';

// Type definitions
interface TeamMemberType {
  id: number;
  imageUrl: string;
  name: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Individual team member component
const TeamMember: React.FC<{ member: TeamMemberType }> = ({ member }) => {
  return (
    <div className="member">
      <img src={member.imageUrl} alt={member.name} />
    </div>
  );
};

// Grid of team members
const TeamMembersGrid: React.FC = () => {
  // Generate 8 placeholder members per row
  const members: TeamMemberType[] = Array.from({ length: 8 }, (_, index) => ({
    id: index,
    imageUrl: '/api/placeholder/50/50',
    name: `Team Member ${index + 1}`
  }));
  
  return (
    <div className="team-members">
      {members.map(member => (
        <TeamMember key={member.id} member={member} />
      ))}
    </div>
  );
};

// Pagination component
const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  return (
    <div className="pagination">
      <button 
        className="page-button" 
        onClick={handlePrevious} 
        disabled={currentPage === 1}
      >
        Previous
      </button>
      
      {Array.from({ length: totalPages }, (_, index) => (
        <div 
          key={index} 
          className={`page-number ${currentPage === index + 1 ? 'active-page' : ''}`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </div>
      ))}
      
      <button 
        className="page-button" 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

// Team section component
const TeamSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Mock data for team members - in a real app, this would come from an API
  const totalMembers = 39;
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };
  
  return (
    <div className="team-section">
      <div className="team-header">
        <div>
          <span className="team-title">UI Developers</span>
          <span className="team-count">({totalMembers})</span>
        </div>
        <div className="search-container">
          <div className="search-icon">🔍</div>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search members..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <a href="#" className="view-all">View all</a>
      </div>
      
      {/* Team members grid - 3 rows */}
      <TeamMembersGrid />
      <TeamMembersGrid />
      <TeamMembersGrid />
      
      {/* Pagination */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={3} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

// Hero section component
const HeroSection: React.FC = () => {
  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1>Bring your teams together & get more done.</h1>
      </div>
      <div className="hero-images">
        {/* Dashboard screenshots */}
        <img src="/api/placeholder/400/220" alt="Dashboard" className="dashboard-img img-1" />
        <img src="/api/placeholder/300/150" alt="Dashboard" className="dashboard-img img-2" />
        <img src="/api/placeholder/200/100" alt="Dashboard" className="dashboard-img img-3" />
        
        {/* Profile bubbles around the images */}
        <div className="profile-bubbles">
          <div className="profile-bubble" style={{ top: '20%', left: '0' }}>
            <img src="/api/placeholder/40/40" alt="Team member" />
          </div>
          <div className="profile-bubble" style={{ top: '10%', right: '10%' }}>
            <img src="/api/placeholder/40/40" alt="Team member" />
          </div>
          <div className="profile-bubble" style={{ top: '50%', right: '0' }}>
            <img src="/api/placeholder/40/40" alt="Team member" />
          </div>
          <div className="profile-bubble" style={{ bottom: '20%', right: '15%' }}>
            <img src="/api/placeholder/40/40" alt="Team member" />
          </div>
          <div className="profile-bubble" style={{ bottom: '10%', left: '30%' }}>
            <img src="/api/placeholder/40/40" alt="Team member" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App component
const TeamDashboard: React.FC = () => {
  return (
    <div className="content-area">
      <style>{`
        :root {
          --light-purple: #e0d6ff;
          --medium-purple: #c8b6ff;
          --dark-purple: #9f86ff;
          --text-dark: #222;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          background-color: var(--light-purple);
        }
        
        .content-area {
          padding: 20px 40px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        
        .hero-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
        }
        
        .hero-text {
          width: 50%;
        }
        
        .hero-text h1 {
          font-size: 3rem;
          color: var(--text-dark);
          margin: 0;
          line-height: 1.2;
        }
        
        .hero-images {
          position: relative;
          width: 45%;
          height: 300px;
        }
        
        .dashboard-img {
          position: absolute;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          background-color: white;
        }
        
        .img-1 {
          width: 90%;
          height: auto;
          top: 0;
          right: 0;
          z-index: 3;
        }
        
        .img-2 {
          width: 70%;
          height: auto;
          top: 30%;
          right: 10%;
          z-index: 2;
        }
        
        .img-3 {
          width: 50%;
          height: auto;
          top: 60%;
          right: 20%;
          z-index: 1;
        }
        
        .team-section {
          background-color: rgba(200, 182, 255, 0.5);
          border-radius: 20px;
          padding: 20px;
        }
        
        .team-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .team-title {
          font-size: 1.2rem;
          font-weight: 600;
        }
        
        .team-count {
          font-size: 1rem;
          color: #555;
        }
        
        .search-container {
          position: relative;
          width: 300px;
        }
        
        .search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
        }
        
        .search-input {
          width: 100%;
          padding: 10px 10px 10px 35px;
          border: none;
          border-radius: 8px;
          background-color: white;
        }
        
        .view-all {
          color: var(--text-dark);
          font-weight: 500;
          text-decoration: none;
        }
        
        .team-members {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .member {
          display: flex;
          justify-content: center;
        }
        
        .member img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
        }
        
        .page-button {
          padding: 8px 15px;
          border: none;
          background: none;
          cursor: pointer;
        }
        
        .page-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .page-number {
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          font-weight: bold;
          cursor: pointer;
        }
        
        .active-page {
          background-color: var(--dark-purple);
          color: white;
        }
        
        .profile-bubbles {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .profile-bubble {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        .profile-bubble img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      `}</style>
      <HeroSection />
      <TeamSection />
    </div>
  );
};

export default TeamDashboard;