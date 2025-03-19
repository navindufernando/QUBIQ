import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const ProgressDashboard = () => {
  // Sample data for demonstration
  const [timelineData] = useState([
    { id: 1, task: 'Research Phase', start: '2025-01-01', end: '2025-01-15', status: 'completed' },
    { id: 2, task: 'Design Mockups', start: '2025-01-15', end: '2025-02-01', status: 'completed' },
    { id: 3, task: 'Frontend Development', start: '2025-02-01', end: '2025-03-15', status: 'inProgress' },
    { id: 4, task: 'Backend Integration', start: '2025-02-15', end: '2025-03-30', status: 'inProgress' },
    { id: 5, task: 'QA Testing', start: '2025-03-20', end: '2025-04-10', status: 'delayed' },
    { id: 6, task: 'User Acceptance', start: '2025-04-10', end: '2025-04-25', status: 'blocked' },
    { id: 7, task: 'Product Launch', start: '2025-04-25', end: '2025-05-10', status: 'notStarted' }
  ]);

  const [teamMembers] = useState([
    { id: 1, name: 'Alex Chen', tasksCompleted: 24, efficiency: 94, currentLoad: 3 },
    { id: 2, name: 'Sarah Kim', tasksCompleted: 18, efficiency: 87, currentLoad: 5 },
    { id: 3, name: 'Miguel Lopez', tasksCompleted: 21, efficiency: 91, currentLoad: 4 },
    { id: 4, name: 'Jessica Taylor', tasksCompleted: 15, efficiency: 82, currentLoad: 2 }
  ]);

  const [taskStatusData] = useState([
    { name: 'Completed', value: 42, color: '#4CAF50' },
    { name: 'In Progress', value: 31, color: '#2196F3' },
    { name: 'Delayed', value: 15, color: '#FF9800' },
    { name: 'Blocked', value: 12, color: '#F44336' }
  ]);

  const [taskTable] = useState([
    { id: 1, name: 'Create homepage wireframe', assignee: 'Alex Chen', status: 'Completed', dueDate: '2025-02-28' },
    { id: 2, name: 'Implement user authentication', assignee: 'Sarah Kim', status: 'In Progress', dueDate: '2025-03-10' },
    { id: 3, name: 'Design database schema', assignee: 'Miguel Lopez', status: 'Completed', dueDate: '2025-02-20' },
    { id: 4, name: 'Mobile responsiveness', assignee: 'Jessica Taylor', status: 'Delayed', dueDate: '2025-03-05' },
    { id: 5, name: 'API integration', assignee: 'Alex Chen', status: 'Blocked', dueDate: '2025-03-15' }
  ]);

  const [performanceData] = useState([
    { month: 'Jan', completed: 15, overdue: 3 },
    { month: 'Feb', completed: 22, overdue: 5 },
    { month: 'Mar', completed: 18, overdue: 7 }
  ]);

  const [efficiencyData] = useState([
    { week: 'Week 1', efficiency: 78 },
    { week: 'Week 2', efficiency: 82 },
    { week: 'Week 3', efficiency: 85 },
    { week: 'Week 4', efficiency: 89 },
    { week: 'Week 5', efficiency: 87 },
    { week: 'Week 6', efficiency: 91 },
    { week: 'Week 7', efficiency: 93 },
    { week: 'Week 8', efficiency: 90 },
    { week: 'Week 9', efficiency: 94 }
  ]);

  const [forecastData] = useState({
    prediction: "Based on current progress, the project is likely to be delayed by 5 days.",
    recommendations: [
      "Reassign 2 tasks from Sarah to Alex to balance workload",
      "Break down 'API Integration' task into smaller components",
      "Schedule additional QA resources for week of March 20"
    ]
  });

  // Get current date for timeline
  const today = new Date('2025-03-03').toISOString().split('T')[0];

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Project Progress Dashboard</h1>

      {/* Project Progress Timeline Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Project Progress Timeline</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Gantt Chart View</h3>
          <div className="relative h-64 overflow-x-auto">
            <div className="absolute top-0 left-0 w-full h-full">
              {timelineData.map((item, index) => {
                // Calculate position and width of timeline bar
                const startDate = new Date(item.start);
                const endDate = new Date(item.end);
                const projectStart = new Date('2025-01-01');
                const projectEnd = new Date('2025-05-10');

                const totalDays = Math.ceil((projectEnd.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24));

                const startOffset = Math.ceil((startDate.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100;
                const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100;


                // Set color based on status
                let bgColor = '';
                switch (item.status) {
                  case 'completed': bgColor = 'bg-green-500'; break;
                  case 'inProgress': bgColor = 'bg-blue-500'; break;
                  case 'delayed': bgColor = 'bg-yellow-500'; break;
                  case 'blocked': bgColor = 'bg-red-500'; break;
                  default: bgColor = 'bg-gray-300';
                }

                return (
                  <div key={item.id} className="flex items-center h-10 mb-2">
                    <div className="w-1/4 pr-4 text-sm font-medium">{item.task}</div>
                    <div className="w-3/4 h-6 bg-gray-100 rounded relative">
                      <div
                        className={`absolute h-6 rounded ${bgColor}`}
                        style={{ left: `${startOffset}%`, width: `${duration}%` }}
                      ></div>
                      {/* Today marker */}
                      {today >= item.start && today <= item.end && (
                        <div className="absolute h-6 w-1 bg-black"
                          style={{ left: `${(new Date(today).getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24) / totalDays * 100}%` }}>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex mt-4 text-sm">
            <div className="flex items-center mr-4">
              <span className="w-3 h-3 bg-green-500 rounded-full inline-block mr-1"></span>
              <span>On Track</span>
            </div>
            <div className="flex items-center mr-4">
              <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block mr-1"></span>
              <span>Delayed</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full inline-block mr-1"></span>
              <span>Blocked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Task Completion Section */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Task Completion Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Task List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {taskTable.map((task) => (
                  <tr key={task.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">{task.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">{task.assignee}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            task.status === 'Delayed' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">{task.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Performance Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Tasks Completed vs. Overdue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" name="Completed Tasks" fill="#4CAF50" />
                <Bar dataKey="overdue" name="Overdue Tasks" fill="#F44336" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Efficiency Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="efficiency" name="Efficiency %" stroke="#2196F3" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Team Efficiency Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Team Efficiency Leaderboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map(member => (
            <div key={member.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium text-lg">{member.name}</h3>
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Tasks Completed:</span>
                  <span className="font-medium">{member.tasksCompleted}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Efficiency:</span>
                  <span className={`font-medium ${member.efficiency >= 90 ? 'text-green-600' : member.efficiency >= 80 ? 'text-blue-600' : 'text-yellow-600'}`}>
                    {member.efficiency}%
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Current Workload:</span>
                  <span className="font-medium">{member.currentLoad} tasks</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${member.efficiency >= 90 ? 'bg-green-500' : member.efficiency >= 80 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                    style={{ width: `${member.efficiency}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Forecasting Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">AI Forecasting: Deadline Predictions</h2>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
          <h3 className="font-medium text-blue-800 mb-2">Prediction</h3>
          <p className="text-blue-900">{forecastData.prediction}</p>
        </div>
        <div>
          <h3 className="font-medium mb-2">Recommendations for Better Efficiency</h3>
          <ul className="list-disc pl-5 space-y-1">
            {forecastData.recommendations.map((rec, index) => (
              <li key={index} className="text-sm">{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;