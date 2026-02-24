import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import ChartWidget from '../components/dashboard/ChartWidget';
import RecentActivity from '../components/dashboard/RecentActivity';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Dashboard = ({ onNavigate }) => {
  const growthChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Jobseekers',
        data: [65, 78, 90, 85, 95, 110, 125],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Recruiters',
        data: [45, 55, 60, 58, 65, 70, 75],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };
  
  const revenueChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Revenue ($)',
      data: [1200, 1900, 1500, 2200, 1800, 2400, 2100],
      backgroundColor: '#6366f1',
      borderRadius: 4
    }]
  };
  
  return (
    <div className="space-y-6 fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="2,847"
          change="12% this week"
          changeType="positive"
          icon="fa-users"
          iconBg="bg-indigo-100"
          iconColor="text-indigo-600"
        />
        <StatCard
          title="Active Jobs"
          value="156"
          change="8% this week"
          changeType="positive"
          icon="fa-briefcase"
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Wallet Balance"
          value="$124.5K"
          change="Across all users"
          changeType="positive"
          icon="fa-wallet"
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          title="Pending KYC"
          value="12"
          change="Action needed"
          changeType="negative"
          icon="fa-id-card"
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget
          title="User Growth"
          type="line"
          data={growthChartData}
        />
        <ChartWidget
          title="Revenue Overview"
          type="bar"
          data={revenueChartData}
          options={{ plugins: { legend: { display: false } } }}
        />
      </div>
      
      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        
        <Card className="p-6">
          <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              icon="fa-user-plus"
              onClick={() => onNavigate('add-staff')}
            >
              Add New Staff
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              icon="fa-check-circle"
              onClick={() => onNavigate('kyc-pending')}
            >
              Review KYC (12 pending)
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              icon="fa-paper-plane"
              onClick={() => onNavigate('send-notification')}
            >
              Send Notification
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
