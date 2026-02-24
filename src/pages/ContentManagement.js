import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const ContentManagement = ({ section }) => {
  // Tips View
  if (section === 'tips') {
    return (
      <div className="space-y-6 fade-in">
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Tips & Guides</h3>
            <Button icon="fa-plus">Add Tip</Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['How to write a great profile', 'Tips for video interviews', 'Negotiating your rate', 'Building your portfolio'].map((tip, i) => (
            <Card key={tip} hover className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                  <i className="fas fa-lightbulb text-2xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{tip}</h4>
                  <p className="text-sm text-gray-600 mb-3">Learn the best practices for {tip.toLowerCase()} and stand out from the crowd.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500"><i className="fas fa-eye mr-1"></i>{1200 + i * 300} views</span>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Media Library View
  if (section === 'media-library') {
    return (
      <div className="space-y-6 fade-in">
        <Card className="p-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              <Button>All Files</Button>
              <Button variant="ghost">Images</Button>
              <Button variant="ghost">Documents</Button>
            </div>
            <Button icon="fa-upload">Upload</Button>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
            <Card key={i} hover className="overflow-hidden p-0">
              <div className="aspect-square bg-gray-200 flex items-center justify-center text-gray-400">
                <i className="fas fa-image text-3xl"></i>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-600 truncate">image_{i}.jpg</p>
                <p className="text-xs text-gray-400">2.4 MB</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Announcements View
  if (section === 'announcements') {
    return (
      <div className="space-y-6 fade-in">
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Platform Announcements</h3>
            <Button icon="fa-plus">New Announcement</Button>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium mb-2 inline-block">Active</span>
                <h4 className="font-semibold text-gray-900 text-lg">New Feature: Video Interviews</h4>
                <p className="text-sm text-gray-600 mt-2">We are excited to announce the launch of our new video interview feature. Now you can conduct interviews directly through the platform.</p>
                <p className="text-xs text-gray-400 mt-3">Published: Jan 15, 2026 • Expires: Feb 15, 2026</p>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium mb-2 inline-block">Expired</span>
                <h4 className="font-semibold text-gray-900 text-lg">Holiday Schedule</h4>
                <p className="text-sm text-gray-600 mt-2">Please note our support hours during the holiday season.</p>
                <p className="text-xs text-gray-400 mt-3">Published: Dec 20, 2025 • Expired: Jan 5, 2026</p>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // FAQ Content View (default)
  return (
    <div className="space-y-6 fade-in">
      Card className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">FAQ Articles</h3>
          <Button icon="fa-plus">Add Article</Button>
        </div>
      </Card>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-200">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="p-6 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">How do I verify my account? (Article {i})</h4>
              <p className="text-sm text-gray-500 mt-1">Category: Getting Started • Last updated: 3 days ago</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="danger" size="sm">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
