'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  BookOpen, 
  Hammer, 
  FileText, 
  Users, 
  Plus,
  Edit,
  Trash2,
  BarChart,
  ArrowLeft
} from 'lucide-react';
import axios from 'axios';

// ===================================
// START: NEW MODULE FORM COMPONENT
// ===================================
const ModuleForm = ({ existingData, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    title: existingData?.title || '',
    description: existingData?.description || '',
    category: existingData?.category || 'renewable-energy',
    difficulty: existingData?.difficulty || 'beginner',
    duration: existingData?.duration || 0,
    content: existingData?.content || '',
    points: existingData?.points || 10,
    carbonImpact: existingData?.carbonImpact || 0,
    videoUrl: existingData?.videoUrl || '',
    thumbnail: existingData?.thumbnail || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave(formData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h3 className="text-2xl font-semibold mb-4">
        {existingData ? 'Edit Module' : 'Create New Module'}
      </h3>
      
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full text-gray-900 border-gray-300 rounded-md shadow-sm"
        />
      </div>
      
      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full text-gray-900 border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Module Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="6"
          required
          className="mt-1 block w-full text-gray-900 border-gray-300 rounded-md shadow-sm"
        />
      </div>
      
      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full text-gray-900 border-gray-300 rounded-md shadow-sm"
        >
          <option value="renewable-energy">Renewable Energy</option>
          <option value="waste-reduction">Waste Reduction</option>
          <option value="water-conservation">Water Conservation</option>
          <option value="eco-lifestyle">Eco Lifestyle</option>
          <option value="transportation">Transportation</option>
          <option value="food-sustainability">Food Sustainability</option>
        </select>
      </div>

      {/* Difficulty */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Difficulty</label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="mt-1 block w-full text-gray-900 border-gray-300 rounded-md shadow-sm"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          className="mt-1 block w-full text-gray-900 border-gray-300 rounded-md shadow-sm"
        />
      </div>
      
      {/* Points */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Points</label>
        <input
          type="number"
          name="points"
          value={formData.points}
          onChange={handleChange}
          required
          className="mt-1 block w-full text-gray-900 border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Carbon Impact */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Carbon Impact (kg)</label>
        <input
          type="number"
          name="carbonImpact"
          value={formData.carbonImpact}
          onChange={handleChange}
          required
          className="mt-1 block w-full text-gray-900 border-gray-300 rounded-md shadow-sm"
        />
      </div>
      
      {/* Video URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Video URL (Optional)</label>
        <input
          type="text"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          className="mt-1 block w-full text-gray-900 border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Thumbnail URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Thumbnail URL (Optional)</label>
        <input
          type="text"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          className="mt-1 block w-full text-gray-900 border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Module'}
        </button>
      </div>
    </form>
  );
};
// ===================================
// END: NEW MODULE FORM COMPONENT
// ===================================


export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [modules, setModules] = useState([]);
  const [projects, setProjects] = useState([]);
  const [resources, setResources] = useState([]);
  
  // ===================================
  // START: NEW STATE FOR FORM VIEW
  // ===================================
  const [formView, setFormView] = useState({
    type: null, // 'module', 'project', or 'resource'
    data: null  // null for 'create', or item data for 'edit'
  });
  // ===================================
  // END: NEW STATE FOR FORM VIEW
  // ===================================

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalModules: 0,
    totalProjects: 0,
    totalResources: 0
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [modulesRes, projectsRes, resourcesRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/modules`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/resources`)
      ]);

      setModules(modulesRes.data.data || []);
      setProjects(projectsRes.data.data || []);
      setResources(resourcesRes.data.data || []);

      setStats({
        totalUsers: 150, // This would come from an API endpoint
        totalModules: modulesRes.data.data?.length || 0,
        totalProjects: projectsRes.data.data?.length || 0,
        totalResources: resourcesRes.data.data?.length || 0
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/${type}/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
      alert('Item deleted successfully!');
    } catch (error) {
      alert('Error deleting item: ' + error.response?.data?.message);
    }
  };

  // ===================================
  // START: NEW SAVE/CREATE HANDLER
  // ===================================
  const handleSaveModule = async (formData) => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    try {
      if (formView.data) {
        // This is an EDIT (PUT request)
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/modules/${formView.data._id}`,
          formData,
          config
        );
        alert('Module updated successfully!');
      } else {
        // This is a CREATE (POST request)
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/modules`,
          formData,
          config
        );
        alert('Module created successfully!');
      }
      setFormView({ type: null, data: null }); // Close form
      fetchData(); // Refresh data
    } catch (error) {
      alert('Error saving module: ' + error.response?.data?.message);
    }
  };
  // ===================================
  // END: NEW SAVE/CREATE HANDLER
  // ===================================


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  // ===================================
  // START: NEW LOGIC TO RENDER FORMS
  // ===================================
  // If we are in a form view, render the form instead of the tabs
  if (formView.type === 'module') {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <button
            onClick={() => setFormView({ type: null, data: null })}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Admin Dashboard
          </button>
          <ModuleForm 
            existingData={formView.data}
            onCancel={() => setFormView({ type: null, data: null })}
            onSave={handleSaveModule}
          />
        </main>
        <Footer />
      </div>
    );
  }
  
  // We can add ProjectForm and ResourceForm logic here later
  // if (formView.type === 'project') { ... }
  // if (formView.type === 'resource') { ... }
  // ===================================
  // END: NEW LOGIC TO RENDER FORMS
  // ===================================


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your platform content and monitor user engagement</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Card: Total Users */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
              </div>
              <Users className="h-12 w-12 text-blue-500" />
            </div>
          </div>

          {/* Stats Card: Learning Modules */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Learning Modules</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalModules}</p>
              </div>
              <BookOpen className="h-12 w-12 text-green-500" />
            </div>
          </div>

          {/* Stats Card: DIY Projects */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">DIY Projects</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProjects}</p>
              </div>
              <Hammer className="h-12 w-12 text-orange-500" />
            </div>
          </div>

          {/* Stats Card: Resources */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Resources</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalResources}</p>
              </div>
              <FileText className="h-12 w-12 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {['overview', 'modules', 'projects', 'resources'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">Recent Activity</h3>
                    <p className="text-gray-600">User engagement and content interactions will appear here.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">Popular Content</h3>
                    <p className="text-gray-600">Most viewed modules and projects will be displayed here.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Modules Tab */}
            {activeTab === 'modules' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Manage Modules</h2>
                  {/* =================================== */}
                  {/* START: FIXED BUTTON ONCLICK */}
                  {/* =================================== */}
                  <button
                    onClick={() => setFormView({ type: 'module', data: null })}
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Module
                  </button>
                  {/* =================================== */}
                  {/* END: FIXED BUTTON ONCLICK */}
                  {/* =================================== */}
                </div>
                
                <div className="space-y-4">
                  {modules.map((module) => (
                    <div key={module._id} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{module.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{module.description}</p>
                          <div className="flex gap-4 mt-2">
                            <span className="text-sm text-gray-500">Category: {module.category}</span>
                            <span className="text-sm text-gray-500">Duration: {module.duration} min</span>
                            <span className="text-sm text-gray-500">Points: {module.points}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {/* =================================== */}
                          {/* START: FIXED BUTTON ONCLICK */}
                          {/* =================================== */}
                          <button
                            onClick={() => setFormView({ type: 'module', data: module })}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          {/* =================================== */}
                          {/* END: FIXED BUTTON ONCLICK */}
                          {/* =================================== */}
                          <button
                            onClick={() => handleDelete('modules', module._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Manage Projects</h2>
                  <button
                    onClick={() => alert('Project form not implemented yet')}
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Project
                  </button>
                </div>
                
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project._id} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{project.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                          <div className="flex gap-4 mt-2">
                            <span className="text-sm text-gray-500">Difficulty: {project.difficulty}</span>
                            <span className="text-sm text-gray-500">Time: {project.estimatedTime}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => alert('Project form not implemented yet')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete('projects', project._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Manage Resources</h2>
                  <button
                    onClick={() => alert('Resource form not implemented yet')}
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Resource
                  </button>
                </div>
                
                <div className="space-y-4">
                  {resources.map((resource) => (
                    <div key={resource._id} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{resource.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{resource.description}</p>
                          <div className="flex gap-4 mt-2">
                            <span className="text-sm text-gray-500">Type: {resource.type}</span>
                            <span className="text-sm text-gray-500">Category: {resource.category}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => alert('Resource form not implemented yet')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete('resources', resource._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}