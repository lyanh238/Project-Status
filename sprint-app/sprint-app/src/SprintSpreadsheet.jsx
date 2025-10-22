import React, { useState, useEffect } from 'react';
import { Download, ChevronDown, ChevronRight, CheckCircle, Circle, AlertCircle, Save, Trash2, Plus, Edit3 } from 'lucide-react';

const SprintSpreadsheet = () => {
  // Load data from localStorage on component mount
  const [expandedSprints, setExpandedSprints] = useState(() => {
    const saved = localStorage.getItem('vicare-expanded-sprints');
    return saved ? JSON.parse(saved) : {
    sprint1: true,
    sprint2: false,
    sprint3: false,
    sprint4: false
    };
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('vicare-tasks');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
    // Sprint 1: Foundation & Stability (Week 1-2)
    { id: 1, sprint: 1, week: 1, day: '1', task: 'Calendar Agent Unit Testing', priority: 'MUST HAVE', status: 'pending', assignee: '', notes: 'Write and run unit tests, ensure coverage ≥ 70%' },
    { id: 2, sprint: 1, week: 1, day: '2', task: 'Calendar Agent Integration Testing', priority: 'MUST HAVE', status: 'pending', assignee: '', notes: 'Run end-to-end flow: user input → Calendar update → response' },
    { id: 3, sprint: 1, week: 1, day: '3', task: 'Error Handling Validation', priority: 'MUST HAVE', status: 'pending', assignee: '', notes: 'Create test scenarios for errors and check user-friendly messages' },
    { id: 4, sprint: 1, week: 1, day: '4', task: 'LangSmith Flow Visualization', priority: 'MUST HAVE', status: 'pending', assignee: '', notes: 'Compile state graph → render in LangSmith, highlight main flow and error branches' },
    { id: 5, sprint: 1, week: 1, day: '5', task: 'Documentation & Demo Prep', priority: 'MUST HAVE', status: 'pending', assignee: '', notes: 'Update QUICK_START.md, describe flows, create slides/graph visualizations for demo' },
    { id: 6, sprint: 1, week: 2, day: '1-2', task: 'MCP Connection Stabilization', priority: 'MUST HAVE', status: 'pending', assignee: '', notes: 'Debug Google Calendar API, implement token refresh, retry logic' },
    { id: 7, sprint: 1, week: 2, day: '3-4', task: 'Dependency Management', priority: 'MUST HAVE', status: 'pending', assignee: '', notes: 'Resolve package conflicts, create requirements-lock.txt' },
    { id: 8, sprint: 1, week: 2, day: '5', task: 'Error Handling Implementation', priority: 'MUST HAVE', status: 'pending', assignee: '', notes: 'Add try-catch blocks, user-friendly messages, graceful degradation' },
    
    // Sprint 2: Core Features Enhancement (Week 3-4)
    { id: 9, sprint: 2, week: 3, day: '1-2', task: 'Enhanced Health Consultation', priority: 'SHOULD HAVE', status: 'pending', assignee: '', notes: 'Symptom checklist, conversation memory, medication reminders' },
    { id: 10, sprint: 2, week: 3, day: '2-3', task: 'Smart Calendar Features', priority: 'SHOULD HAVE', status: 'pending', assignee: '', notes: 'Find best meeting time, recurring events, improved date parsing' },
    { id: 11, sprint: 2, week: 3, day: '4-5', task: 'Calendar Conflict Intelligence', priority: 'SHOULD HAVE', status: 'pending', assignee: '', notes: 'Enhanced conflict detection, automatic alternatives, priority resolution' },
    { id: 12, sprint: 2, week: 4, day: '1-3', task: 'Simple Note Agent', priority: 'SHOULD HAVE', status: 'pending', assignee: '', notes: 'Create note_agent.py, CRUD operations, Neon DB storage' },
    { id: 13, sprint: 2, week: 4, day: '4', task: 'Agent Integration', priority: 'SHOULD HAVE', status: 'pending', assignee: '', notes: 'Update supervisor routing, cross-agent capabilities' },
    { id: 14, sprint: 2, week: 4, day: '5', task: 'UI Integration for Notes', priority: 'SHOULD HAVE', status: 'pending', assignee: '', notes: 'Add note commands to Streamlit, viewing panel, quick buttons' },
    
    // Sprint 3: User Experience & Polish (Week 5-6)
    { id: 15, sprint: 3, week: 5, day: '1-2', task: 'Streamlit Interface Redesign', priority: 'SHOULD HAVE', status: 'pending', assignee: '', notes: 'Better design, collapsible sections, markdown rendering, notifications' },
    { id: 16, sprint: 3, week: 5, day: '3', task: 'Quick Actions & Shortcuts', priority: 'SHOULD HAVE', status: 'pending', assignee: '', notes: 'Suggestion chips, command shortcuts, example prompts' },
    { id: 17, sprint: 3, week: 5, day: '4-5', task: 'Mobile-Responsive Design', priority: 'SHOULD HAVE', status: 'pending', assignee: '', notes: 'Test on mobile, adjust layout, optimize touch interactions' },
    { id: 18, sprint: 3, week: 6, day: '1-2', task: 'Performance Optimization', priority: 'SHOULD HAVE', status: 'pending', assignee: '', notes: 'Response caching, optimize queries, reduce API calls, <2s target' },
    { id: 19, sprint: 3, week: 6, day: '3', task: 'State Management Optimization', priority: 'SHOULD HAVE', status: 'pending', assignee: '', notes: 'Conversation cleanup, memory limits, session timeout' },
    { id: 20, sprint: 3, week: 6, day: '4-5', task: 'Accessibility & i18n', priority: 'SHOULD HAVE', status: 'pending', assignee: '', notes: 'Vietnamese support, contrast ratios, ARIA labels, language switcher' },
    
    // Sprint 4: Production Readiness (Week 7-8)
    { id: 21, sprint: 4, week: 7, day: '1-2', task: 'Containerization', priority: 'MUST HAVE', status: 'pending', assignee: '', notes: 'Create Dockerfile, docker-compose.yml, test locally' },
    { id: 22, sprint: 4, week: 7, day: '2-3', task: 'Cloud Deployment', priority: 'MUST HAVE', status: 'pending', assignee: '', notes: 'Deploy to Railway/Render, configure production DB, staging environment' },
    { id: 23, sprint: 4, week: 7, day: '4-5', task: 'Security Hardening', priority: 'MUST HAVE', status: 'pending', assignee: '', notes: 'Rate limiting, input validation, secure API keys, HTTPS, auth' },
    { id: 24, sprint: 4, week: 8, day: '1-2', task: 'Monitoring Setup', priority: 'MUST HAVE', status: 'pending', assignee: '', notes: 'Structured logging, error tracking, analytics, health check, uptime monitoring' },
    { id: 25, sprint: 4, week: 8, day: '3', task: 'Final Testing', priority: 'MUST HAVE', status: 'pending', assignee: '', notes: 'E2E in production, load testing, security scan, UAT, bug fixes' },
    { id: 26, sprint: 4, week: 8, day: '4', task: 'Documentation Finalization', priority: 'MUST HAVE', status: 'pending', assignee: '', notes: 'USER_GUIDE.md, DEPLOYMENT.md, FAQ.md, VIDEO_DEMO.md, README update' },
    { id: 27, sprint: 4, week: 8, day: '5', task: 'Launch Preparation', priority: 'MUST HAVE', status: 'pending', assignee: '', notes: 'Launch checklist, announcements, feedback channel, support docs' }
  ];
  });

  // Save to localStorage whenever tasks or expandedSprints change
  useEffect(() => {
    localStorage.setItem('vicare-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('vicare-expanded-sprints', JSON.stringify(expandedSprints));
  }, [expandedSprints]);

  // Additional state for enhanced functionality
  const [showAddTask, setShowAddTask] = useState(false);
  const [addTaskSprint, setAddTaskSprint] = useState(1);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    sprint: 1,
    week: 1,
    day: '1',
    task: '',
    priority: 'SHOULD HAVE',
    status: 'pending',
    assignee: '',
    notes: ''
  });

  const toggleSprint = (sprint) => {
    setExpandedSprints(prev => ({
      ...prev,
      [sprint]: !prev[sprint]
    }));
  };

  const updateTaskStatus = (id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === id) {
          const statuses = ['pending', 'in-progress', 'completed'];
          const currentIndex = statuses.indexOf(task.status);
          const nextStatus = statuses[(currentIndex + 1) % statuses.length];
          return { ...task, status: nextStatus };
        }
        return task;
      })
    );
  };

  const updateAssignee = (id, value) => {
    setTasks(prevTasks =>
      prevTasks.map(task => task.id === id ? { ...task, assignee: value } : task)
    );
  };

  // Enhanced functionality for task management
  const addTask = (sprintId) => {
    if (newTask.task.trim()) {
      const maxId = Math.max(...tasks.map(t => t.id), 0);
      setTasks(prevTasks => [...prevTasks, { ...newTask, id: maxId + 1, sprint: sprintId }]);
      setNewTask({
        sprint: sprintId,
        week: 1,
        day: '1',
        task: '',
        priority: 'SHOULD HAVE',
        status: 'pending',
        assignee: '',
        notes: ''
      });
      setShowAddTask(false);
    }
  };

  const startAddTask = (sprintId) => {
    setAddTaskSprint(sprintId);
    setNewTask({
      sprint: sprintId,
      week: 1,
      day: '1',
      task: '',
      priority: 'SHOULD HAVE',
      status: 'pending',
      assignee: '',
      notes: ''
    });
    setShowAddTask(true);
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }
  };

  const editTask = (task) => {
    setEditingTask(task);
    setNewTask(task);
    setShowAddTask(true);
  };

  const updateTask = () => {
    if (editingTask && newTask.task.trim()) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === editingTask.id ? { ...newTask, id: editingTask.id } : task
        )
      );
      setEditingTask(null);
      setNewTask({
        sprint: 1,
        week: 1,
        day: '1',
        task: '',
        priority: 'SHOULD HAVE',
        status: 'pending',
        assignee: '',
        notes: ''
      });
      setShowAddTask(false);
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setNewTask({
      sprint: addTaskSprint,
      week: 1,
      day: '1',
      task: '',
      priority: 'SHOULD HAVE',
      status: 'pending',
      assignee: '',
      notes: ''
    });
    setShowAddTask(false);
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('vicare-tasks');
      localStorage.removeItem('vicare-expanded-sprints');
      window.location.reload();
    }
  };

  const resetToDefault = () => {
    if (window.confirm('Reset to default tasks? This will clear all your changes.')) {
      localStorage.removeItem('vicare-tasks');
      localStorage.removeItem('vicare-expanded-sprints');
      window.location.reload();
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 status-completed" />;
      case 'in-progress':
        return <AlertCircle className="w-6 h-6 status-in-progress" />;
      default:
        return <Circle className="w-6 h-6 status-pending" />;
    }
  };

  const getPriorityColor = (priority) => {
    return priority === 'MUST HAVE' ? 'priority-must-have' : 'priority-should-have';
  };

  const sprints = [
    { 
      id: 1, 
      name: 'Sprint 1: Foundation & Stability', 
      weeks: '1-2', 
      goal: 'Fix critical issues and establish solid foundation',
      weeklyGoals: [
        {
          week: 1,
          goal: 'Stabilize MCP connections and resolve dependencies',
          demo: 'Working Google Calendar integration with error handling'
        },
        {
          week: 2,
          goal: 'Complete testing suite and documentation',
          demo: 'Demo connection between Agents '
        }
      ]
    },
    { 
      id: 2, 
      name: 'Sprint 2: Core Features Enhancement', 
      weeks: '3-4', 
      goal: 'Polish existing features and add note-taking',
      weeklyGoals: [
        {
          week: 3,
          goal: 'Enhance health consultation and calendar features',
          demo: 'Advanced health consultation with smart calendar scheduling'
        },
        {
          week: 4,
          goal: 'Implement note-taking system and agent integration',
          demo: 'Complete note-taking functionality with cross-agent capabilities'
        }
      ]
    },
    { 
      id: 3, 
      name: 'Sprint 3: User Experience & Polish', 
      weeks: '5-6', 
      goal: 'Create delightful user experience',
      weeklyGoals: [
        {
          week: 5,
          goal: 'Redesign interface and add mobile responsiveness',
          demo: 'Beautiful, mobile-friendly interface with quick actions'
        },
        {
          week: 6,
          goal: 'Optimize performance and add accessibility features',
          demo: 'Fast, accessible system with Vietnamese language support'
        }
      ]
    },
    { 
      id: 4, 
      name: 'Sprint 4: Production Readiness', 
      weeks: '7-8', 
      goal: 'Deploy to production and ensure maintainability',
      weeklyGoals: [
        {
          week: 7,
          goal: 'Containerize and deploy to cloud with security',
          demo: 'Production-ready deployment with security hardening'
        },
        {
          week: 8,
          goal: 'Set up monitoring and final testing',
          demo: 'Live production system with comprehensive monitoring'
        }
      ]
    }
  ];

  const exportToCSV = () => {
    const headers = ['Sprint', 'Week', 'Days', 'Task', 'Priority', 'Status', 'Assignee', 'Notes'];
    const rows = tasks.map(task => [
      `Sprint ${task.sprint}`,
      `Week ${task.week}`,
      task.day,
      task.task,
      task.priority,
      task.status,
      task.assignee,
      task.notes
    ]);
    
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vicare-sprint-plan.csv';
    a.click();
  };

  const getSprintProgress = (sprintId) => {
    const sprintTasks = tasks.filter(t => t.sprint === sprintId);
    const completed = sprintTasks.filter(t => t.status === 'completed').length;
    return Math.round((completed / sprintTasks.length) * 100);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center">
        {/* Header */}
        <div className="card p-8 mb-8 animate-fade-in animate-slide-in-down text-center flex flex-col items-center justify-center">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-6 w-full">
            <div className="flex-1 text-center">
              <h1 className="text-4xl font-bold text-gradient mb-3">ViCare Multi-Agent System</h1>
              <p className="text-gray-600 text-lg">2-Month Sprint Plan (8 Weeks) - All data is automatically saved</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Auto-save enabled</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setShowAddTask(true)}
                className="btn-rainbow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
              <button
                onClick={exportToCSV}
                className="btn-primary flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={resetToDefault}
                className="btn-warning flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={clearAllData}
                className="btn-danger flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="stats-card">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center w-full">
              <div className="stats-card flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{tasks.length}</div>
                <div className="text-sm text-gray-600 font-medium">Total Tasks</div>
                <div className="w-full bg-purple-200 rounded-full h-2 mt-3">
                  <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
              <div className="stats-card">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{tasks.filter(t => t.status === 'completed').length}</div>
                <div className="text-sm text-gray-600 font-medium">Completed</div>
                <div className="w-full bg-emerald-200 rounded-full h-2 mt-3">
                  <div className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 h-2 rounded-full" style={{width: `${(tasks.filter(t => t.status === 'completed').length / tasks.length) * 100}%`}}></div>
                </div>
              </div>
              <div className="stats-card">
                <div className="text-3xl font-bold text-orange-600 mb-2">{tasks.filter(t => t.status === 'in-progress').length}</div>
                <div className="text-sm text-gray-600 font-medium">In Progress</div>
                <div className="w-full bg-orange-200 rounded-full h-2 mt-3">
                  <div className="bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 h-2 rounded-full" style={{width: `${(tasks.filter(t => t.status === 'in-progress').length / tasks.length) * 100}%`}}></div>
                </div>
              </div>
              <div className="stats-card">
                <div className="text-3xl font-bold text-indigo-600 mb-2">{tasks.filter(t => t.status === 'pending').length}</div>
                <div className="text-sm text-gray-600 font-medium">Pending</div>
                <div className="w-full bg-indigo-200 rounded-full h-2 mt-3">
                  <div className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 h-2 rounded-full" style={{width: `${(tasks.filter(t => t.status === 'pending').length / tasks.length) * 100}%`}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sprints */}
        {sprints.map(sprint => {
          const sprintTasks = tasks.filter(t => t.sprint === sprint.id);
          const isExpanded = expandedSprints[`sprint${sprint.id}`];
          const progress = getSprintProgress(sprint.id);

          return (
            <div key={sprint.id} className="card mb-6 overflow-hidden animate-fade-in">
              {/* Sprint Header */}
              <div
                className="sprint-header"
                onClick={() => toggleSprint(`sprint${sprint.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="transform transition-transform duration-200">
                      {isExpanded ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{sprint.name}</h2>
                      <p className="text-pink-100 text-sm font-medium">Week {sprint.weeks} • {sprint.goal}</p>
                      <div className="mt-2 space-y-1">
                        {sprint.weeklyGoals.map((weeklyGoal, index) => (
                          <div key={index} className="text-xs text-pink-200">
                            <span className="font-semibold">Week {weeklyGoal.week}:</span> {weeklyGoal.goal}
                            <br />
                            <span className="text-pink-300">Demo: {weeklyGoal.demo}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startAddTask(sprint.id);
                      }}
                      className="bg-white/20 text-white px-3 py-1 rounded-lg text-sm font-medium"
                    >
                      + Add Task
                    </button>
                  <div className="text-right">
                      <div className="text-3xl font-bold mb-1">{progress}%</div>
                      <div className="text-pink-100 text-sm font-medium">Complete</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Add/Edit Task Form */}
              {isExpanded && showAddTask && (editingTask ? editingTask.sprint === sprint.id : addTaskSprint === sprint.id) && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-blue-800">
                      {editingTask ? `Edit Task trong ${sprint.name}` : `Add Task Mới cho ${sprint.name}`}
                    </h4>
                    <button
                      onClick={cancelEdit}
                      className="text-blue-600 text-xl font-bold"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Week</label>
                      <select
                        value={newTask.week}
                        onChange={(e) => setNewTask({...newTask, week: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={1}>Week 1</option>
                        <option value={2}>Week 2</option>
                        <option value={3}>Week 3</option>
                        <option value={4}>Week 4</option>
                        <option value={5}>Week 5</option>
                        <option value={6}>Week 6</option>
                        <option value={7}>Week 7</option>
                        <option value={8}>Week 8</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Days</label>
                      <input
                        type="text"
                        value={newTask.day}
                        onChange={(e) => setNewTask({...newTask, day: e.target.value})}
                        placeholder="e.g., 1-2, 3, 4-5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="MUST HAVE">MUST HAVE</option>
                        <option value="SHOULD HAVE">SHOULD HAVE</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Task</label>
                    <input
                      type="text"
                      value={newTask.task}
                      onChange={(e) => setNewTask({...newTask, task: e.target.value})}
                      placeholder="Nhập mô tả task"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                      <input
                        type="text"
                        value={newTask.assignee}
                        onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                        placeholder="Nhập tên người thực hiện"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <input
                        type="text"
                        value={newTask.notes}
                        onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
                        placeholder="Nhập ghi chú cho task"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => editingTask ? updateTask() : addTask(sprint.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      {editingTask ? 'Update Task' : 'Add Task'}
                    </button>
                  </div>
                </div>
              )}

              {/* Weekly Goals & Demos */}
  

              {/* Sprint Tasks */}
              {isExpanded && (
                <div className="overflow-x-auto bg-white/50 backdrop-blur-sm">
                  <table className="w-full border-collapse">
                    <thead className="table-header">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Week</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Days</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Task</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Priority</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Assignee</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">Notes</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {sprintTasks.map(task => (
                        <tr key={task.id} className="table-row">
                          <td className="px-6 py-4 border-r border-gray-200">
                            <button
                              onClick={() => updateTaskStatus(task.id)}
                              className=""
                            >
                              {getStatusIcon(task.status)}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">Week {task.week}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">Day {task.day}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900 max-w-xs border-r border-gray-200">{task.task}</td>
                          <td className="px-6 py-4 border-r border-gray-200">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 border-r border-gray-200">
                            <input
                              type="text"
                              value={task.assignee}
                              onChange={(e) => updateAssignee(task.id, e.target.value)}
                              placeholder="Assign..."
                              className="input-field text-sm"
                            />
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate border-r border-gray-200" title={task.notes}>
                            {task.notes}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => editTask(task)}
                                className="p-2 text-blue-600 rounded-lg"
                                title="Edit task"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteTask(task.id)}
                                className="p-2 text-red-600 rounded-lg"
                                title="Delete task"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}


        {/* Legend */}
        <div className="legend-card mt-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Legend & Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Status Indicators</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Circle className="w-5 h-5 status-pending" />
                  <span className="text-sm font-medium text-gray-600">Pending</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 status-in-progress" />
                  <span className="text-sm font-medium text-gray-600">In Progress</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 status-completed" />
                  <span className="text-sm font-medium text-gray-600">Completed</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Priority Levels</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold priority-must-have">MUST HAVE:</span>
                  <span className="text-sm font-medium text-gray-600"> Critical for MVP</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold priority-should-have">SHOULD HAVE: </span>
                  <span className="text-sm font-medium text-gray-600">Important enhancements</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="tip-card">
            <p className="text-sm text-blue-900">
                💡 <strong>Tip:</strong> Click status icons to cycle through pending → in-progress → completed. Click sprint headers to expand/collapse. All changes are automatically saved to your browser's local storage.
              </p>
            </div>
            
            <div className="success-card">
              <p className="text-sm text-green-900">
                ✅ <strong>Data Persistence:</strong> All your changes (task status, assignees, notes, new tasks) are automatically saved to your browser's local storage. Your data will persist between sessions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintSpreadsheet;