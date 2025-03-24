import React from 'react'
import ProjectSummery from './ProjectSummery'
import KeyMetricsCards from './KeyMetricsCards'
import MilestoneTrackerCard from './MilestoneTrackerCard'

const ProjectOverview = () => {

  const projectMilestones = [
    {
      id: 1,
      name: "Requirements Gathering",
      description: "Collect and document all project requirements",
      deadline: "Jan 15, 2025",
      status: "completed" as const,
      owner: "Sarah Johnson"
    },
    {
      id: 2,
      name: "Design Phase Completion",
      description: "Finalize UI/UX designs and technical architecture",
      deadline: "Feb 28, 2025",
      status: "completed" as const,
      owner: "Michael Chen"
    },
    {
      id: 3,
      name: "Development Phase",
      description: "Implement core functionality and features",
      deadline: "Apr 10, 2025",
      status: "inProgress" as const,
      owner: "Alex Rodriguez"
    },
    {
      id: 4,
      name: "UAT Testing",
      description: "User acceptance testing with stakeholders",
      deadline: "May 15, 2025",
      status: "upcoming" as const,
      owner: "Jennifer Kim"
    },
    {
      id: 5,
      name: "Deployment",
      description: "Production deployment and final rollout",
      deadline: "Jun 30, 2025",
      status: "upcoming" as const,
      owner: "David Patel"
    }
  ];

  return (
    <div>
      <ProjectSummery projectId='5ce2a85b-8709-4a7c-ae43-047289314c34'/>
      <KeyMetricsCards projectId={'5ce2a85b-8709-4a7c-ae43-047289314c34'}/>
      <MilestoneTrackerCard milestones={projectMilestones}/>
    </div>
  )
}

export default ProjectOverview
