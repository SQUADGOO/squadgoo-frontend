// Navigation configuration - matches sidebarStructure from HTML
export const sidebarStructure = [
  {
    id: 'dashboard',
    icon: 'fa-home',
    title: 'Dashboard',
    submenus: [
      { id: 'dashboard-overview', title: 'Overview' },
      { id: 'analytics', title: 'Analytics' }
    ]
  },
  {
    id: 'users',
    icon: 'fa-users',
    title: 'User Management',
    badge: null,
    submenus: [
      { id: 'all-users', title: 'All Users' },
      { id: 'add-user', title: 'Add User' },
      { id: 'suspended-users', title: 'Suspended Users' }
    ]
  },
  {
    id: 'kyc',
    icon: 'fa-id-card',
    title: 'KYC/KYB Verification',
    badge: '12',
    submenus: [
      { id: 'kyc-pending', title: 'Pending Reviews' },
      { id: 'kyc-approved', title: 'Approved' },
      { id: 'kyc-rejected', title: 'Rejected' }
    ]
  },
  {
    id: 'jobs',
    icon: 'fa-briefcase',
    title: 'Job Offers & Marketplace',
    submenus: [
      { id: 'job-offers', title: 'Job Offers' },
      { id: 'marketplace-listings', title: 'Marketplace Listings' },
      { id: 'expired-flagged', title: 'Expired/Flagged' }
    ]
  },
  {
    id: 'wallet',
    icon: 'fa-wallet',
    title: 'Wallet & Payments',
    submenus: [
      { id: 'transactions', title: 'Transactions' },
      { id: 'withdrawals', title: 'Withdrawals' },
      { id: 'escrow', title: 'Escrow Holds' },
      { id: 'refunds', title: 'Refunds' }
    ]
  },
  {
    id: 'disputes',
    icon: 'fa-gavel',
    title: 'Dispute Center',
    badge: '5',
    submenus: [
      { id: 'all-disputes', title: 'All Disputes' },
      { id: 'open-disputes', title: 'Open' },
      { id: 'resolved-disputes', title: 'Resolved' }
    ]
  },
  {
    id: 'support',
    icon: 'fa-headset',
    title: 'Support',
    badge: '8',
    submenus: [
      { id: 'live-chat', title: 'Live Chat' },
      { id: 'tickets', title: 'Tickets' },
      { id: 'callback-requests', title: 'Callback Requests' },
      { id: 'faq-management', title: 'FAQ Management' }
    ]
  },
  {
    id: 'notifications',
    icon: 'fa-bell',
    title: 'Notifications & Messaging',
    submenus: [
      { id: 'all-notifications', title: 'All Notifications' },
      { id: 'templates', title: 'Templates' },
      { id: 'send-notification', title: 'Send Notification' }
    ]
  },
  {
    id: 'content',
    icon: 'fa-file-alt',
    title: 'Content Management',
    submenus: [
      { id: 'content-faq', title: 'FAQ' },
      { id: 'tips', title: 'Tips' },
      { id: 'media-library', title: 'Media Library' },
      { id: 'announcements', title: 'Announcements' }
    ]
  },
  {
    id: 'staff',
    icon: 'fa-user-shield',
    title: 'Admin Staff Management',
    submenus: [
      { id: 'all-staff', title: 'All Staff' },
      { id: 'add-staff', title: 'Add Staff' },
      { id: 'timesheets', title: 'Timesheets' },
      { id: 'roles-permissions', title: 'Roles & Permissions' }
    ]
  },
  {
    id: 'chat',
    icon: 'fa-comments',
    title: 'Internal Chat & Tasks',
    submenus: [
      { id: 'team-chat', title: 'Team Chat' },
      { id: 'groups', title: 'Groups' },
      { id: 'tasks', title: 'Tasks' }
    ]
  },
  {
    id: 'settings',
    icon: 'fa-cog',
    title: 'Settings',
    submenus: [
      { id: 'fees-rates', title: 'Fees & Rates' },
      { id: 'bonuses', title: 'Bonuses & Offers' },
      { id: 'legal-compliance', title: 'Legal & Compliance' },
      { id: 'maintenance', title: 'Maintenance' },
      { id: 'danger-zone', title: 'Danger Zone', danger: true }
    ]
  },
  {
    id: 'security',
    icon: 'fa-shield-alt',
    title: 'Security & Logs',
    submenus: [
      { id: 'activity-log', title: 'Activity Log' },
      { id: 'login-sessions', title: 'Login/Sessions' },
      { id: '2fa-management', title: '2FA Management' }
    ]
  }
];

// Route to component mapping
export const routeComponents = {
  'dashboard-overview': 'Dashboard',
  'analytics': 'Analytics',
  'all-users': 'UserManagement',
  'add-user': 'UserManagement',
  'suspended-users': 'UserManagement',
  'kyc-pending': 'KYCVerification',
  'kyc-approved': 'KYCVerification',
  'kyc-rejected': 'KYCVerification',
  'job-offers': 'JobOffers',
  'marketplace-listings': 'JobOffers',
  'expired-flagged': 'JobOffers',
  'transactions': 'Wallet',
  'withdrawals': 'Wallet',
  'escrow': 'Wallet',
  'refunds': 'Wallet',
  'all-disputes': 'Disputes',
  'open-disputes': 'Disputes',
  'resolved-disputes': 'Disputes',
  'live-chat': 'Support',
  'tickets': 'Support',
  'callback-requests': 'Support',
  'faq-management': 'Support',
  'all-notifications': 'Notifications',
  'templates': 'Notifications',
  'send-notification': 'Notifications',
  'content-faq': 'ContentManagement',
  'tips': 'ContentManagement',
  'media-library': 'ContentManagement',
  'announcements': 'ContentManagement',
  'all-staff': 'StaffManagement',
  'add-staff': 'StaffManagement',
  'timesheets': 'StaffManagement',
  'roles-permissions': 'StaffManagement',
  'team-chat': 'Chat',
  'groups': 'Chat',
  'tasks': 'Chat',
  'fees-rates': 'Settings',
  'bonuses': 'Settings',
  'legal-compliance': 'Settings',
  'maintenance': 'Settings',
  'danger-zone': 'Settings',
  'activity-log': 'Security',
  'login-sessions': 'Security',
  '2fa-management': 'Security'
};
