import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Dashboard({ user, onLogout }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedItems, setSelectedItems] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // Data states
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [kyc, setKyc] = useState([]);
  const [callbacks, setCallbacks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [staff, setStaff] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [wallet, setWallet] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dark mode toggle
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'k') {
          e.preventDefault();
          document.querySelector('.search-input')?.focus();
        }
        if (e.key === 'z') {
          e.preventDefault();
          handleUndo();
        }
        if (e.key === 'y') {
          e.preventDefault();
          handleRedo();
        }
      }
      if (e.key === '/') {
        e.preventDefault();
        alert('Help menu - shortcuts and documentation');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [undoStack, redoStack]);

  // Fetch data on mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [usersRes, jobsRes, kycRes, callbacksRes, tasksRes, staffRes, disputesRes, ticketsRes, walletRes, analyticsRes] = await Promise.all([
        axios.get(`\${API_URL}/users`),
        axios.get(`\${API_URL}/jobs`),
        axios.get(`\${API_URL}/kyc/pending`),
        axios.get(`\${API_URL}/callbacks`),
        axios.get(`\${API_URL}/tasks`),
        axios.get(`\${API_URL}/staff`),
        axios.get(`\${API_URL}/disputes`),
        axios.get(`\${API_URL}/support/tickets`),
        axios.get(`\${API_URL}/wallet/transactions`),
        axios.get(`\${API_URL}/analytics/dashboard`)
      ]);

      setUsers(usersRes.data);
      setJobs(jobsRes.data);
      setKyc(kycRes.data);
      setCallbacks(callbacksRes.data);
      setTasks(tasksRes.data);
      setStaff(staffRes.data);
      setDisputes(disputesRes.data);
      setTickets(ticketsRes.data);
      setWallet(walletRes.data);
      setAnalytics(analyticsRes.data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Undo/Redo
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastAction = undoStack[undoStack.length - 1];
      setRedoStack([...redoStack, lastAction]);
      setUndoStack(undoStack.slice(0, -1));
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const lastAction = redoStack[redoStack.length - 1];
      setUndoStack([...undoStack, lastAction]);
      setRedoStack(redoStack.slice(0, -1));
    }
  };

  // KYC Actions
  const handleKYCApprove = async (userId, notes = '') => {
    try {
      await axios.post(`\${API_URL}/kyc/approve`, { userId, notes });
      // Send notification to user
      await axios.post(`\${API_URL}/notifications/send`, {
        userId,
        type: 'kyc_approved',
        channels: ['app', 'email'],
        message: 'Your KYC verification has been approved!'
      });
      setKyc(kyc.filter(k => k.userId !== userId));
      alert('KYC Approved! User notified via app and email.');
    } catch (err) {
      setError('Failed to approve KYC');
    }
  };

  const handleKYCReject = async (userId, reason = '', notes = '') => {
    try {
      await axios.post(`\${API_URL}/kyc/reject`, { userId, reason, notes });
      // Send notification to user
      await axios.post(`\${API_URL}/notifications/send`, {
        userId,
        type: 'kyc_rejected',
        channels: ['app', 'email', 'sms'],
        message: `Your KYC verification was rejected. Reason: \${reason}`
      });
      setKyc(kyc.filter(k => k.userId !== userId));
      alert('KYC Rejected! User notified via app, email, and SMS.');
    } catch (err) {
      setError('Failed to reject KYC');
    }
  };

  const handleKYCRequestInfo = async (userId, requiredDocs = [], notes = '') => {
    try {
      await axios.post(`\${API_URL}/kyc/request-info`, { userId, requiredDocs, notes });
      // Send notification to user
      await axios.post(`\${API_URL}/notifications/send`, {
        userId,
        type: 'kyc_more_info_needed',
        channels: ['app', 'email'],
        message: `We need more information for your KYC. Please upload: \${requiredDocs.join(', ')}`
      });
      setKyc(kyc.map(k => k.userId === userId ? { ...k, status: 'more_info_needed' } : k));
      alert('Request sent! User notified to upload additional documents.');
    } catch (err) {
      setError('Failed to request info');
    }
  };

  const handleBulkKYCApprove = async () => {
    try {
      await Promise.all(selectedItems.map(userId => handleKYCApprove(userId)));
      setSelectedItems([]);
      alert(`\${selectedItems.length} KYC approvals sent!`);
    } catch (err) {
      setError('Failed to bulk approve KYC');
    }
  };

  // Callback Actions
  const handleCallbackSchedule = async (callbackId, scheduledTime, notes = '') => {
    try {
      await axios.post(`\${API_URL}/callbacks/schedule`, { callbackId, scheduledTime, notes });
      setCallbacks(callbacks.map(c => c.id === callbackId ? { ...c, status: 'scheduled', scheduledTime } : c));
      alert('Callback scheduled!');
    } catch (err) {
      setError('Failed to schedule callback');
    }
  };

  const handleCallbackAttempt = async (callbackId, result, notes = '') => {
    try {
      await axios.post(`\${API_URL}/callbacks/attempt`, { callbackId, result, notes });
      const updatedCallback = callbacks.find(c => c.id === callbackId);
      const attempts = (updatedCallback?.attempts || 0) + 1;

      if (attempts >= 3) {
        // Auto-escalate after 3 failed attempts
        await axios.post(`\${API_URL}/callbacks/escalate`, { callbackId });
        alert('Callback escalated to manager after 3 failed attempts.');
      }

      setCallbacks(callbacks.map(c => c.id === callbackId ? { ...c, attempts, lastAttempt: new Date() } : c));
    } catch (err) {
      setError('Failed to log callback attempt');
    }
  };

  // Task Actions
  const handleTaskAssign = async (taskId, assignedTo, priority = 'medium', dueDate = null, notes = '') => {
    try {
      await axios.post(`\${API_URL}/tasks/assign`, { taskId, assignedTo, priority, dueDate, notes });
      // Notify assigned staff
      await axios.post(`\${API_URL}/notifications/send`, {
        staffId: assignedTo,
        type: 'task_assigned',
        channels: ['app', 'email'],
        message: `New task assigned to you: \${notes}`
      });
      setTasks(tasks.map(t => t.id === taskId ? { ...t, assignedTo, priority, dueDate } : t));
      alert('Task assigned!');
    } catch (err) {
      setError('Failed to assign task');
    }
  };

  const handleTaskReassign = async (taskId, newAssignee, notes = '') => {
    try {
      await axios.post(`\${API_URL}/tasks/reassign`, { taskId, newAssignee, notes });
      setTasks(tasks.map(t => t.id === taskId ? { ...t, assignedTo: newAssignee } : t));
      alert('Task reassigned!');
    } catch (err) {
      setError('Failed to reassign task');
    }
  };

  // Staff Actions
  const handleStaffAdd = async (staffData) => {
    try {
      const response = await axios.post(`\${API_URL}/staff/add`, staffData);
      setStaff([...staff, response.data]);
      alert('Staff member added!');
    } catch (err) {
      setError('Failed to add staff');
    }
  };

  const handleStaffRemove = async (staffId) => {
    if (window.confirm('Are you sure you want to remove this staff member?')) {
      try {
        await axios.post(`\${API_URL}/staff/remove`, { staffId });
        setStaff(staff.filter(s => s.id !== staffId));
        alert('Staff member removed!');
      } catch (err) {
        setError('Failed to remove staff');
      }
    }
  };

  const handleStaffImpersonate = async (staffId) => {
    try {
      const response = await axios.post(`\${API_URL}/staff/impersonate`, { staffId });
      // Log in as that user
      localStorage.setItem('impersonatingUserId', staffId);
      alert(`Now impersonating \${response.data.name}. Refresh to see their view.`);
    } catch (err) {
      setError('Failed to impersonate staff');
    }
  };

  const handleClockInOut = async (staffId, action) => {
    try {
      await axios.post(`\${API_URL}/staff/clock-\${action}`, { staffId });
      setStaff(staff.map(s => s.id === staffId ? { ...s, [action === 'in' ? 'clockedIn' : 'clockedIn']: action === 'in' } : s));
      alert(`Clocked \${action}!`);
    } catch (err) {
      setError(`Failed to clock \${action}`);
    }
  };

  // Dispute Actions
  const handleDisputeReview = async (disputeId, status, resolution, notes = '') => {
    try {
      await axios.post(`\${API_URL}/disputes/review`, { disputeId, status, resolution, notes });
      // Notify involved parties
      const dispute = disputes.find(d => d.id === disputeId);
      await axios.post(`\${API_URL}/notifications/send`, {
        userIds: [dispute.jobseekerId, dispute.recruiterId],
        type: 'dispute_updated',
        channels: ['app', 'email'],
        message: `Dispute status updated: \${status}`
      });
      setDisputes(disputes.map(d => d.id === disputeId ? { ...d, status, resolution } : d));
      alert('Dispute reviewed and parties notified!');
    } catch (err) {
      setError('Failed to review dispute');
    }
  };

  // Support Ticket Actions
  const handleTicketReply = async (ticketId, reply, useTemplate = false) => {
    try {
      await axios.post(`\${API_URL}/support/reply`, { ticketId, reply, useTemplate });
      // Notify user
      const ticket = tickets.find(t => t.id === ticketId);
      await axios.post(`\${API_URL}/notifications/send`, {
        userId: ticket.userId,
        type: 'ticket_reply',
        channels: ['app', 'email'],
        message: 'Your support ticket has been updated.'
      });
      setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: 'replied' } : t));
      alert('Reply sent and user notified!');
    } catch (err) {
      setError('Failed to send reply');
    }
  };

  // Export/Import
  const handleExportData = async (dataType) => {
    try {
      const response = await axios.get(`\${API_URL}/export/\${dataType}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `\${dataType}-\${new Date().toISOString()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentElement.removeChild(link);
    } catch (err) {
      setError('Failed to export data');
    }
  };

  // Render sections
  const renderOverview = () => (
    <div className="section-overview">
      <h2>Dashboard Overview</h2>
      <div className="breadcrumb">
        <span>Home</span> / <span>Overview</span>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <i className="fas fa-users"></i>
          <div>
            <div className="metric-label">Total Users</div>
            <div className="metric-value">{analytics.totalUsers || 0}</div>
            <div className="metric-change">+{analytics.userGrowth || 0}% this month</div>
          </div>
        </div>
        <div className="metric-card">
          <i className="fas fa-briefcase"></i>
          <div>
            <div className="metric-label">Active Jobs</div>
            <div className="metric-value">{analytics.activeJobs || 0}</div>
            <div className="metric-change">{analytics.jobsThisWeek || 0} this week</div>
          </div>
        </div>
        <div className="metric-card">
          <i className="fas fa-dollar-sign"></i>
          <div>
            <div className="metric-label">Total Revenue</div>
            <div className="metric-value">${analytics.totalRevenue || 0}</div>
            <div className="metric-change">+${analytics.revenueThisMonth || 0} this month</div>
          </div>
        </div>
        <div className="metric-card">
          <i className="fas fa-user-check"></i>
          <div>
            <div className="metric-label">Verified Users</div>
            <div className="metric-value">{analytics.verifiedUsers || 0}%</div>
            <div className="metric-change">{analytics.pendingVerifications || 0} pending</div>
          </div>
        </div>
      </div>

      {/* Charts (Placeholder - use Recharts in production) */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>Revenue Trend</h3>
          <p>[Chart will display here using Recharts]</p>
        </div>
        <div className="chart-card">
          <h3>User Growth</h3>
          <p>[Chart will display here using Recharts]</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <button onClick={() => setActiveSection('compliance')}>Review KYC</button>
        <button onClick={() => setActiveSection('callbacks')}>Handle Callbacks</button>
        <button onClick={() => setActiveSection('support')}>Check Support Tickets</button>
        <button onClick={() => setActiveSection('disputes')}>Review Disputes</button>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="section-users">
      <h2>User Management</h2>
      <div className="breadcrumb">
        <span>Home</span> / <span>User Management</span>
      </div>

      {/* Search & Filter */}
      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search users (Ctrl+K)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="pending">Pending Verification</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
          <option value="status">Sort by Status</option>
        </select>
        <button onClick={() => handleExportData('users')}>
          <i className="fas fa-download"></i> Export
        </button>
      </div>

      {/* Users Table */}
      <table className="data-table">
        <thead>
          <tr>
            <th><input type="checkbox" onChange={(e) => setSelectedItems(e.target.checked ? users.map(u => u.id) : [])} /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Status</th>
            <th>Verification</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.filter(u => 
            (filterStatus === 'all' || u.status === filterStatus) &&
            (u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.includes(searchQuery))
          ).map(u => (
            <tr key={u.id}>
              <td><input type="checkbox" checked={selectedItems.includes(u.id)} onChange={(e) => setSelectedItems(e.target.checked ? [...selectedItems, u.id] : selectedItems.filter(id => id !== u.id))} /></td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.type}</td>
              <td><span className={`badge badge-\${u.status}`}>{u.status}</span></td>
              <td><span className={`badge badge-\${u.verified ? 'verified' : 'pending'}`}>{u.verified ? 'Verified' : 'Pending'}</span></td>
              <td>
                <button className="action-btn" onClick={() => alert(`View details for \${u.name}`)}>View</button>
                <button className="action-btn" onClick={() => alert(`Suspend \${u.name}`)}>Suspend</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderComplianceKYC = () => (
    <div className="section-compliance">
      <h2>Compliance & KYC</h2>
      <div className="breadcrumb">
        <span>Home</span> / <span>Compliance & KYC</span>
      </div>

      {/* Compliance Stats */}
      <div className="compliance-stats">
        <div className="stat-box">
          <div className="stat-label">Verified</div>
          <div className="stat-value">{analytics.verifiedUsers || 0}%</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Pending</div>
          <div className="stat-value">{kyc.filter(k => k.status === 'pending').length}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Rejected</div>
          <div className="stat-value">{kyc.filter(k => k.status === 'rejected').length}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Re-verification Needed</div>
          <div className="stat-value">{kyc.filter(k => k.status === 'reverification').length}</div>
        </div>
      </div>

      {/* KYC Queue */}
      <div className="kyc-queue">
        <h3>Pending Verifications</h3>
        {kyc.filter(k => k.status === 'pending').map(k => (
          <div key={k.id} className="kyc-item">
            <div className="kyc-header">
              <h4>{k.userName}</h4>
              <span className="kyc-type">{k.type}</span>
            </div>
            <div className="kyc-docs">
              <p><strong>Documents:</strong> {k.documents.join(', ')}</p>
            </div>
            <div className="kyc-actions">
              <button className="btn-approve" onClick={() => handleKYCApprove(k.userId, 'Approved')}>
                <i className="fas fa-check"></i> Approve
              </button>
              <button className="btn-reject" onClick={() => handleKYCReject(k.userId, 'Document expired', 'Please upload a new document')}>
                <i className="fas fa-times"></i> Reject
              </button>
              <button className="btn-info" onClick={() => handleKYCRequestInfo(k.userId, ['passport', 'address_proof'], 'Please upload a recent address proof')}>
                <i className="fas fa-info-circle"></i> Request Info
              </button>
              <textarea placeholder="Add notes..." className="kyc-notes"></textarea>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="bulk-actions">
          <button onClick={handleBulkKYCApprove}>Bulk Approve ({selectedItems.length})</button>
          <button onClick={() => alert('Bulk reject selected items')}>Bulk Reject ({selectedItems.length})</button>
        </div>
      )}
    </div>
  );

  const renderCallbackQueue = () => (
    <div className="section-callbacks">
      <h2>Callback Queue</h2>
      <div className="breadcrumb">
        <span>Home</span> / <span>Callback Queue</span>
      </div>

      {callbacks.map(cb => (
        <div key={cb.id} className="callback-item">
          <div className="callback-header">
            <h4>{cb.userName}</h4>
            <span className="attempt-count">Attempt {cb.attempts || 1}/3</span>
          </div>
          <p><strong>Reason:</strong> {cb.reason}</p>
          <p><strong>Last Attempt:</strong> {cb.lastAttempt || 'Never'}</p>
          <div className="callback-actions">
            <button onClick={() => handleCallbackSchedule(cb.id, new Date(Date.now() + 3600000), 'Scheduled for 1 hour from now')}>
              <i className="fas fa-calendar"></i> Schedule
            </button>
            <button onClick={() => handleCallbackAttempt(cb.id, 'no_answer', 'Left voicemail')}>
              <i className="fas fa-phone"></i> No Answer
            </button>
            <button onClick={() => handleCallbackAttempt(cb.id, 'completed', 'Issue resolved')}>
              <i className="fas fa-check"></i> Completed
            </button>
            <button onClick={() => alert('Assign to another staff member')}>
              <i className="fas fa-share"></i> Assign
            </button>
          </div>
          <textarea placeholder="Add notes..." className="callback-notes"></textarea>
        </div>
      ))}
    </div>
  );

  const renderTaskManager = () => (
    <div className="section-tasks">
      <h2>Task Manager</h2>
      <div className="breadcrumb">
        <span>Home</span> / <span>Task Manager</span>
      </div>

      {tasks.map(task => (
        <div key={task.id} className="task-item">
          <div className="task-header">
            <h4>{task.title}</h4>
            <span className={`priority priority-\${task.priority || 'medium'}`}>{task.priority || 'Medium'}</span>
          </div>
          <p>{task.description}</p>
          <p><strong>Assigned to:</strong> {task.assignedTo || 'Unassigned'}</p>
          <p><strong>Due:</strong> {task.dueDate || 'No deadline'}</p>
          <div className="task-actions">
            <button onClick={() => handleTaskAssign(task.id, 'staff_member_id', 'high', new Date(Date.now() + 86400000), 'Urgent KYC review')}>
              <i className="fas fa-user-plus"></i> Assign
            </button>
            <button onClick={() => handleTaskReassign(task.id, 'another_staff_id', 'Reassigned due to priority')}>
              <i className="fas fa-exchange-alt"></i> Reassign
            </button>
            <button onClick={() => alert('Mark task as complete')}>
              <i className="fas fa-check"></i> Complete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStaffDirectory = () => (
    <div className="section-staff">
      <h2>Staff Directory</h2>
      <div className="breadcrumb">
        <span>Home</span> / <span>Staff Directory</span>
      </div>

      <button onClick={() => alert('Add new staff member form')}>
        <i className="fas fa-user-plus"></i> Add Staff
      </button>

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
            <th>Clocked In</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.department}</td>
              <td>{s.role}</td>
              <td><span className={`badge badge-\${s.status}`}>{s.status}</span></td>
              <td>{s.clockedIn ? 'Yes' : 'No'}</td>
              <td>
                <button className="action-btn" onClick={() => handleClockInOut(s.id, 'in')}>Clock In</button>
                <button className="action-btn" onClick={() => handleClockInOut(s.id, 'out')}>Clock Out</button>
                <button className="action-btn" onClick={() => handleStaffImpersonate(s.id)}>Impersonate</button>
                <button className="action-btn" onClick={() => handleStaffRemove(s.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => handleExportData('timesheets')}>
        <i className="fas fa-download"></i> Download Timesheets
      </button>
    </div>
  );

  const renderDisputeManagement = () => (
    <div className="section-disputes">
      <h2>Dispute Management</h2>
      <div className="breadcrumb">
        <span>Home</span> / <span>Dispute Management</span>
      </div>

      {disputes.map(d => (
        <div key={d.id} className="dispute-item">
          <div className="dispute-header">
            <h4>Dispute #{d.id}</h4>
            <span className={`badge badge-\${d.status}`}>{d.status}</span>
          </div>
          <p><strong>Jobseeker:</strong> {d.jobseekerName}</p>
          <p><strong>Recruiter:</strong> {d.recruiterName}</p>
          <p><strong>Issue:</strong> {d.issue}</p>
          <div className="dispute-timeline">
            {d.events && d.events.map((event, idx) => (
              <div key={idx} className="timeline-event">
                <span>{event.date}</span> - {event.description}
              </div>
            ))}
          </div>
          <div className="dispute-actions">
            <button onClick={() => handleDisputeReview(d.id, 'resolved', 'refund', 'Refund issued to jobseeker')}>
              <i className="fas fa-check"></i> Resolve
            </button>
            <button onClick={() => alert('Escalate dispute to manager')}>
              <i className="fas fa-arrow-up"></i> Escalate
            </button>
          </div>        </div>
      ))}
    </div>
  );

  const renderSupportTickets = () => (
    <div className="section-support">
      <h2>Support Tickets</h2>
      <div className="breadcrumb">
        <span>Home</span> / <span>Support Tickets</span>
      </div>

      {tickets.map(t => (
        <div key={t.id} className="ticket-item">
          <div className="ticket-header">
            <h4>Ticket #{t.id} - {t.subject}</h4>
            <span className={`badge badge-${t.status}`}>{t.status}</span>
          </div>
          <p><strong>User:</strong> {t.userName}</p>
          <p><strong>Issue:</strong> {t.description}</p>
          <div className="ticket-actions">
            <button onClick={() => handleTicketReply(t.id, 'Thank you for contacting support. Your issue is being reviewed.', true)}>
              <i className="fas fa-reply"></i> Reply (Template)
            </button>
            <button onClick={() => alert('Escalate ticket to manager')}>
              <i className="fas fa-arrow-up"></i> Escalate
            </button>
            <button onClick={() => alert('Assign ticket to another staff')}>
              <i className="fas fa-share"></i> Assign
            </button>
          </div>
          <textarea placeholder="Add reply..." className="ticket-reply"></textarea>
        </div>
      ))}
    </div>
  );

  const renderWalletPayments = () => (
    <div className="section-wallet">
      <h2>Wallet & Payments</h2>
      <div className="breadcrumb">
        <span>Home</span> / <span>Wallet & Payments</span>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Reference</th>
          </tr>
        </thead>
        <tbody>
          {wallet.map(w => (
            <tr key={w.id}>
              <td>{w.date}</td>
              <td>{w.userName}</td>
              <td>{w.type}</td>
              <td>${w.amount}</td>
              <td><span className={`badge badge-${w.status}`}>{w.status}</span></td>
              <td>{w.reference}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleExportData('wallet')}>
        <i className="fas fa-download"></i> Export Wallet Data
      </button>
    </div>
  );

  const renderContentManager = () => (
    <div className="section-content">
      <h2>Content Management</h2>
      <div className="breadcrumb">
        <span>Home</span> / <span>Content Management</span>
      </div>
      <button onClick={() => alert('Add new FAQ/Announcement form')}>
        <i className="fas fa-plus"></i> Add FAQ/Announcement
      </button>
      <p>[Here you can manage FAQs, announcements, help content, and view usage stats.]</p>
    </div>
  );

  const renderNotificationCenter = () => (
    <div className="section-notifications">
      <h2>Notification Center</h2>
      <div className="breadcrumb">
        <span>Home</span> / <span>Notification Center</span>
      </div>
      <button onClick={() => alert('Send bulk notification')}>
        <i className="fas fa-bullhorn"></i> Send Bulk Notification
      </button>
      <p>[Here you can see all system alerts, configure notification preferences, and review delivery status.]</p>
    </div>
  );

  // Sidebar navigation
  const sidebarItems = [
    { key: 'overview', label: 'Overview', icon: 'fas fa-home' },
    { key: 'users', label: 'User Mgmt', icon: 'fas fa-users' },
    { key: 'compliance', label: 'Compliance & KYC', icon: 'fas fa-user-check' },
    { key: 'callbacks', label: 'Callback Queue', icon: 'fas fa-phone' },
    { key: 'tasks', label: 'Tasks', icon: 'fas fa-tasks' },
    { key: 'staff', label: 'Staff', icon: 'fas fa-id-badge' },
    { key: 'disputes', label: 'Disputes', icon: 'fas fa-balance-scale' },
    { key: 'support', label: 'Support', icon: 'fas fa-life-ring' },
    { key: 'wallet', label: 'Wallet', icon: 'fas fa-wallet' },
    { key: 'content', label: 'Content', icon: 'fas fa-file-alt' },
    { key: 'notifications', label: 'Notifications', icon: 'fas fa-bell' }
  ];

  // Main render
  return (
    <div className={`dashboard-root${darkMode ? ' dark' : ''}`}>
      <aside className={`sidebar${sidebarOpen ? '' : ' collapsed'}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">SQUADGOO</span>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className={`fas fa-${sidebarOpen ? 'angle-left' : 'angle-right'}`}></i>
          </button>
        </div>
        <nav>
          <ul>
            {sidebarItems.map(item => (
              <li
                key={item.key}
                className={activeSection === item.key ? 'active' : ''}
                onClick={() => setActiveSection(item.key)}
              >
                <i className={item.icon}></i> {sidebarOpen && item.label}
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button className="darkmode-toggle" onClick={() => setDarkMode(!darkMode)}>
            <i className={`fas fa-${darkMode ? 'sun' : 'moon'}`}></i> {sidebarOpen && (darkMode ? 'Light' : 'Dark')} Mode
          </button>
        </div>
      </aside>
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-title">Admin Panel</div>
          <div className="topbar-actions">
            <span className="topbar-user">{user?.firstName || user?.username || 'Admin'}</span>
            <button className="logout-btn" onClick={onLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </header>
        <main>
          {loading && <div className="loading-overlay"><span>Loading...</span></div>}
          {error && <div className="error-alert">{error}</div>}
          {activeSection === 'overview' && renderOverview()}
          {activeSection === 'users' && renderUserManagement()}
          {activeSection === 'compliance' && renderComplianceKYC()}
          {activeSection === 'callbacks' && renderCallbackQueue()}
          {activeSection === 'tasks' && renderTaskManager()}
          {activeSection === 'staff' && renderStaffDirectory()}
          {activeSection === 'disputes' && renderDisputeManagement()}
          {activeSection === 'support' && renderSupportTickets()}
          {activeSection === 'wallet' && renderWalletPayments()}
          {activeSection === 'content' && renderContentManager()}
          {activeSection === 'notifications' && renderNotificationCenter()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;


