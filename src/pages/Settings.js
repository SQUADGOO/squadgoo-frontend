import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const ToggleSwitch = ({ defaultChecked = false }) => {
  const [isActive, setIsActive] = useState(defaultChecked);
  return (
    <div 
      className={`toggle-switch ${isActive ? 'active' : ''}`}
      onClick={() => setIsActive(!isActive)}
    ></div>
  );
};

const Settings = ({ section }) => {
  // Fees & Rates View
  if (section === 'fees-rates') {
    return (
      <div className="space-y-6 fade-in">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-800 mb-6">Platform Fees & Rates</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Fee (%)</label>
                <input type="number" defaultValue="10" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
                <p className="text-xs text-gray-500 mt-1">Percentage charged on each transaction</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Fee ($)</label>
                <input type="number" defaultValue="2.50" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
                <p className="text-xs text-gray-500 mt-1">Fixed fee per withdrawal</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Escrow Release Period (days)</label>
                <input type="number" defaultValue="7" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
                <p className="text-xs text-gray-500 mt-1">Days before escrow auto-releases</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Withdrawal ($)</label>
                <input type="number" defaultValue="50" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <Button variant="outline">Reset</Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Bonuses View
  if (section === 'bonuses') {
    return (
      <div className="space-y-6 fade-in">
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Active Promotions</h3>
            <Button icon="fa-plus">Create Offer</Button>
          </div>
        </Card>

        <div className="grid gap-4">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Active</span>
                <h4 className="font-semibold text-gray-900 text-lg mt-2">Welcome Bonus</h4>
                <p className="text-sm text-gray-600 mt-1">New users get $50 credit on first job post</p>
                <div className="flex gap-4 mt-3 text-sm text-gray-500">
                  <span><i className="fas fa-calendar mr-1"></i>Valid until: Feb 28, 2026</span>
                  <span><i className="fas fa-users mr-1"></i>234 redemptions</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                <button className="text-red-600 hover:text-red-900 text-sm">Deactivate</button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">Scheduled</span>
                <h4 className="font-semibold text-gray-900 text-lg mt-2">Referral Program</h4>
                <p className="text-sm text-gray-600 mt-1">Earn $25 for each successful referral</p>
                <div className="flex gap-4 mt-3 text-sm text-gray-500">
                  <span><i className="fas fa-calendar mr-1"></i>Starts: Feb 1, 2026</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                <button className="text-red-600 hover:text-red-900 text-sm">Cancel</button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Legal & Compliance View
  if (section === 'legal-compliance') {
    return (
      <div className="space-y-6 fade-in">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-800 mb-6">Legal Documents</h3>
          <div className="space-y-4">
            {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Refund Policy', 'Dispute Resolution'].map(doc => (
              <div key={doc} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <i className="fas fa-file-contract"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{doc}</h4>
                    <p className="text-sm text-gray-500">Last updated: Jan 1, 2026</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-800 mb-6">Compliance Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">GDPR Compliance</h4>
                <p className="text-sm text-gray-500">Enable GDPR data protection features</p>
              </div>
              <ToggleSwitch defaultChecked={true} />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Data Retention Policy</h4>
                <p className="text-sm text-gray-500">Auto-delete user data after account closure</p>
              </div>
              <ToggleSwitch defaultChecked={true} />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Maintenance View
  if (section === 'maintenance') {
    return (
      <div className="space-y-6 fade-in">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <i className="fas fa-exclamation-triangle text-yellow-600 mt-1"></i>
            <div>
              <h4 className="font-semibold text-yellow-800">Maintenance Mode</h4>
              <p className="text-sm text-yellow-700">When enabled, only Super Admins can access the platform.</p>
            </div>
          </div>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-800 mb-6">System Maintenance</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Maintenance Mode</h4>
                <p className="text-sm text-gray-500">Disable public access to the platform</p>
              </div>
              <ToggleSwitch />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Message</label>
              <textarea 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" 
                rows="3"
                defaultValue="We are currently performing scheduled maintenance. Please check back later."
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Allowed IP Addresses</label>
              <input 
                type="text" 
                defaultValue="192.168.1.1, 10.0.0.1" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
              <p className="text-xs text-gray-500 mt-1">Comma-separated list of IPs that can access during maintenance</p>
            </div>
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <Button variant="outline">Cancel</Button>
              <Button>Save Settings</Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Danger Zone View (default)
  return (
    <div className="max-w-3xl mx-auto space-y-6 fade-in">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <div className="flex items-start">
          <i className="fas fa-exclamation-triangle text-red-500 mt-0.5 mr-3"></i>
          <div>
            <h3 className="text-red-800 font-semibold">Warning: Danger Zone</h3>
            <p className="text-red-700 text-sm mt-1">Actions in this section can have serious consequences. All actions are logged.</p>
          </div>
        </div>
      </div>

      <div className="danger-zone bg-white p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-red-800 mb-4">Data Management</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 border border-red-200 rounded-lg hover:bg-red-50 transition">
            <div className="flex items-center gap-3">
              <i className="fas fa-trash text-red-500"></i>
              <span className="font-medium text-gray-800">Purge Old Logs</span>
            </div>
            <i className="fas fa-chevron-right text-gray-400"></i>
          </button>
          <button className="w-full flex items-center justify-between p-3 border border-red-200 rounded-lg hover:bg-red-50 transition">
            <div className="flex items-center gap-3">
              <i className="fas fa-database text-red-500"></i>
              <span className="font-medium text-gray-800">Backup Database</span>
            </div>
            <i className="fas fa-chevron-right text-gray-400"></i>
          </button>
        </div>
      </div>

      <div className="danger-zone bg-white p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-red-800 mb-4">Critical Actions</h3>
        <div className="space-y-3">
          <button 
            onClick={() => window.confirm('Are you sure? This will reset all settings to default.')}
            className="w-full flex items-center justify-between p-3 border border-red-200 rounded-lg hover:bg-red-50 transition"
          >
            <div className="flex items-center gap-3">
              <i className="fas fa-undo text-red-500"></i>
              <span className="font-medium text-gray-800">Reset System Settings</span>
            </div>
            <i className="fas fa-chevron-right text-gray-400"></i>
          </button>
          <button 
            onClick={() => window.confirm('WARNING: This will delete all platform data. This cannot be undone.')}
            className="w-full flex items-center justify-between p-3 border border-red-200 rounded-lg hover:bg-red-50 transition"
          >
            <div className="flex items-center gap-3">
              <i className="fas fa-radiation text-red-500"></i>
              <span className="font-medium text-gray-800">Delete All Platform Data</span>
            </div>
            <i className="fas fa-chevron-right text-gray-400"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
