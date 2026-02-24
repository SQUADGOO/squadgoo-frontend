import React, { useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import Dashboard from '../pages/Dashboard';
import Analytics from '../pages/Analytics';
import UserManagement from '../pages/UserManagement';
import KYCVerification from '../pages/KYCVerification';
import JobOffers from '../pages/JobOffers';
import Wallet from '../pages/Wallet';
import Disputes from '../pages/Disputes';
import Support from '../pages/Support';
import Notifications from '../pages/Notifications';
import ContentManagement from '../pages/ContentManagement';
import StaffManagement from '../pages/StaffManagement';
import Settings from '../pages/Settings';
import Security from '../pages/Security';
import Chat from '../pages/Chat';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';

// Map section IDs to components
const componentMap = {
  'dashboard-overview': Dashboard,
  'analytics': Analytics,
  'all-users': UserManagement,
  'add-user': UserManagement,
  'suspended-users': UserManagement,
  'kyc-pending': KYCVerification,
  'kyc-approved': KYCVerification,
  'kyc-rejected': KYCVerification,
  'job-offers': JobOffers,
  'marketplace-listings': JobOffers,
  'expired-flagged': JobOffers,
  'transactions': Wallet,
  'withdrawals': Wallet,
  'escrow': Wallet,
  'refunds': Wallet,
  'all-disputes': Disputes,
  'open-disputes': Disputes,
  'resolved-disputes': Disputes,
  'live-chat': Support,
  'tickets': Support,
  'callback-requests': Support,
  'faq-management': Support,
  'all-notifications': Notifications,
  'templates': Notifications,
  'send-notification': Notifications,
  'content-faq': ContentManagement,
  'tips': ContentManagement,
  'media-library': ContentManagement,
  'announcements': ContentManagement,
  'all-staff': StaffManagement,
  'add-staff': StaffManagement,
  'timesheets': StaffManagement,
  'roles-permissions': StaffManagement,
  'team-chat': Chat,
  'groups': Chat,
  'tasks': Chat,
  'fees-rates': Settings,
  'bonuses': Settings,
  'legal-compliance': Settings,
  'maintenance': Settings,
  'danger-zone': Settings,
  'activity-log': Security,
  'login-sessions': Security,
  '2fa-management': Security
};

// Page titles
const pageTitles = {
  'dashboard-overview': 'Dashboard Overview',
  'analytics': 'Analytics & Reports',
  'all-users': 'User Management',
  'add-user': 'Add New User',
  'suspended-users': 'Suspended Users',
  'kyc-pending': 'KYC Verification - Pending Reviews',
  'kyc-approved': 'KYC Verification - Approved',
  'kyc-rejected': 'KYC Verification - Rejected',
  'job-offers': 'Job Offers',
  'marketplace-listings': 'Marketplace Listings',
  'expired-flagged': 'Expired & Flagged Content',
  'transactions': 'Transactions',
  'withdrawals': 'Withdrawal Requests',
  'escrow': 'Escrow Holds',
  'refunds': 'Refund Management',
  'all-disputes': 'Dispute Center',
  'open-disputes': 'Open Disputes',
  'resolved-disputes': 'Resolved Disputes',
  'live-chat': 'Live Chat Support',
  'tickets': 'Support Tickets',
  'callback-requests': 'Callback Requests',
  'faq-management': 'FAQ Management',
  'all-notifications': 'All Notifications',
  'templates': 'Notification Templates',
  'send-notification': 'Send Notification',
  'content-faq': 'FAQ Content',
  'tips': 'Tips & Guides',
  'media-library': 'Media Library',
  'announcements': 'Announcements',
  'all-staff': 'Staff Management',
  'add-staff': 'Add New Staff',
  'timesheets': 'Timesheets & Attendance',
  'roles-permissions': 'Roles & Permissions',
  'team-chat': 'Team Chat',
  'groups': 'Group Chats',
  'tasks': 'Task Management',
  'fees-rates': 'Fees & Rates',
  'bonuses': 'Bonuses & Offers',
  'legal-compliance': 'Legal & Compliance',
  'maintenance': 'System Maintenance',
  'danger-zone': 'Danger Zone',
  'activity-log': 'Activity Log',
  'login-sessions': 'Login Sessions',
  '2fa-management': '2FA Management'
};

const MainLayout = () => {
  const [currentRole, setCurrentRole] = useState('super');
  const [currentSection, setCurrentSection] = useState('dashboard-overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  
  const CurrentComponent = componentMap[currentSection] || Dashboard;
  
  const handleNavigate = (sectionId) => {
    setCurrentSection(sectionId);
    setIsMobileMenuOpen(false);
  };
  
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      window.location.reload();
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Role Switcher - Demo Only */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-lg rounded-lg p-2 flex gap-2 border border-gray-200">
        <span className="text-xs font-semibold text-gray-500 px-2 py-1">Demo Role:</span>
        {['super', 'support', 'compliance', 'finance'].map(role => (
          <button
            key={role}
            onClick={() => setCurrentRole(role)}
            className={`px-3 py-1 rounded text-xs font-medium capitalize ${
              currentRole === role 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {role === 'super' ? 'Super Admin' : role}
          </button>
        ))}
      </div>
      
      {/* Sidebar */}
      <div className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 transition-transform duration-300`}>
        <Sidebar 
          currentRole={currentRole}
          currentSection={currentSection}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      </div>
      
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 pt-12">
        <Header 
          title={pageTitles[currentSection] || 'Dashboard'}
          onMenuToggle={() => setIsMobileMenuOpen(true)}
          onQuickAction={() => setIsQuickActionOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <CurrentComponent 
            section={currentSection}
            onNavigate={handleNavigate}
          />
        </main>
      </div>
      
      {/* Quick Action Modal */}
      <Modal 
        isOpen={isQuickActionOpen} 
        onClose={() => setIsQuickActionOpen(false)}
        title="Quick Actions"
        size="md"
      >
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="flex-col h-24"
            icon="fa-user-plus"
            onClick={() => {
              setIsQuickActionOpen(false);
              handleNavigate('add-staff');
            }}
          >
            Add Staff
          </Button>
          <Button 
            variant="outline" 
            className="flex-col h-24"
            icon="fa-check-circle"
            onClick={() => {
              setIsQuickActionOpen(false);
              handleNavigate('kyc-pending');
            }}
          >
            Review KYC
          </Button>
          <Button 
            variant="outline" 
            className="flex-col h-24"
            icon="fa-paper-plane"
            onClick={() => {
              setIsQuickActionOpen(false);
              handleNavigate('send-notification');
            }}
          >
            Send Notice
          </Button>
          <Button 
            variant="outline" 
            className="flex-col h-24"
            icon="fa-gavel"
            onClick={() => {
              setIsQuickActionOpen(false);
              handleNavigate('all-disputes');
            }}
          >
            View Disputes
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default MainLayout;
