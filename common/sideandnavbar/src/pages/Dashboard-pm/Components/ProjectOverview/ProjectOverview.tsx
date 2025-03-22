import React from 'react'
import ProjectSummery from './ProjectSummery'
import KeyMetricsCards from './KeyMetricsCards'
import MilestoneTrackerCard from './MilestoneTrackerCard'

const ProjectOverview = () => {
  return (
    <div>
      <ProjectSummery projectId='5ce2a85b-8709-4a7c-ae43-047289314c34'/>
      <KeyMetricsCards projectId={'5ce2a85b-8709-4a7c-ae43-047289314c34'}/>
      <MilestoneTrackerCard/>
    </div>
  )
}

export default ProjectOverview
