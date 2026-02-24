// Status badge configurations from HTML styles
export const STATUS_BADGES = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
  approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved' },
  rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' },
  action: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Action Required' },
  verified: { bg: 'bg-indigo-100', text: 'text-indigo-800', label: 'Verified' },
  suspended: { bg: 'bg-red-100', text: 'text-red-800', label: 'Suspended' },
  review: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Under Review' },
  awaiting: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Awaiting' },
  resubmitted: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Resubmitted' },
  open: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Open' },
  progress: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'In Progress' },
  resolved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Resolved' },
  escalated: { bg: 'bg-red-100', text: 'text-red-800', label: 'Escalated' },
  completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' }
};

// Priority styles
export const PRIORITY_STYLES = {
  high: { bg: 'bg-red-100', text: 'text-red-800' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  low: { bg: 'bg-blue-100', text: 'text-blue-800' }
};

// Chart colors
export const CHART_COLORS = {
  primary: '#6366f1',
  primaryLight: 'rgba(99, 102, 241, 0.1)',
  success: '#10b981',
  successLight: 'rgba(16, 185, 129, 0.1)',
  warning: '#f59e0b',
  danger: '#ef4444'
};

// User types
export const USER_TYPES = {
  JOBSEEKER: 'Jobseeker',
  RECRUITER: 'Recruiter',
  ADMIN: 'Admin'
};
