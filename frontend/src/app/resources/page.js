'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import { FileText, Video, FileImage, Calculator } from 'lucide-react';

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await api.get('/resources');
      setResources(response.data.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return <FileText className="h-6 w-6" />;
      case 'video': return <Video className="h-6 w-6" />;
      case 'infographic': return <FileImage className="h-6 w-6" />;
      case 'calculator': return <Calculator className="h-6 w-6" />;
      default: return <FileText className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources</h1>
            <p className="text-xl text-gray-600">Tools and guides for sustainable living</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map(resource => (
                <div key={resource._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-primary-600">{getTypeIcon(resource.type)}</div>
                    <span className="text-sm font-medium text-gray-500">{resource.type}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags?.slice(0, 3).map((tag, index) => (
                      <span key={index} className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition">
                    View Resource
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
