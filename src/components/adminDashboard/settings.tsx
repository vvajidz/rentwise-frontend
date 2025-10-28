// src/components/admin/Dashboard/Settings.tsx
export default function Settings() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Platform Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
            <input 
              type="text" 
              defaultValue="RentWise" 
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Commission Rate (%)</label>
            <input 
              type="number" 
              defaultValue="8" 
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
          <div className="pt-2">
            <button className="bg-blue-900 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-800 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Admin Management</h3>
        <div className="space-y-4">
          <button className="w-full bg-blue-900 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-800 transition-colors">
            Add New Admin
          </button>
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Current Admins</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">admin@rentwise.com</p>
                  <p className="text-xs text-gray-500">Last active: 2 hours ago</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Super Admin</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">manager@rentwise.com</p>
                  <p className="text-xs text-gray-500">Last active: 1 day ago</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}