'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Clock, 
  CheckCircle, 
  Heart,
  ArrowLeft,
  Hammer,
  ShoppingBag,
  ListChecks
} from 'lucide-react';
import axios from 'axios';

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [liking, setLiking] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const fetchProject = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${params.id}`
      );
      setProject(response.data.data);
      
      // Check if user has completed/liked this project
      if (user) {
        if (user.completedProjects) {
          setIsCompleted(user.completedProjects.includes(params.id));
        }
        if (response.data.data.likes) {
          setIsLiked(response.data.data.likes.includes(user._id));
        }
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setCompleting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${params.id}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setIsCompleted(true);
      alert('🎉 Awesome! Project completed!');
    } catch (error) {
      alert('Error completing project: ' + error.response?.data?.message);
    } finally {
      setCompleting(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setLiking(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${params.id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setIsLiked(!isLiked);
      setProject(prev => ({
        ...prev,
        likes: isLiked 
          ? prev.likes.filter(id => id !== user._id)
          : [...prev.likes, user._id]
      }));
    } catch (error) {
      console.error('Error liking project:', error);
    } finally {
      setLiking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-xl">Loading project...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-xl text-red-600">Project not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Projects
        </button>

        {/* Project Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Hammer className="h-6 w-6 text-primary-600" />
                <span className="text-sm font-medium text-primary-600 uppercase">
                  DIY Project
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {project.title}
              </h1>
              <p className="text-gray-600 text-lg">
                {project.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              {isCompleted && (
                <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full whitespace-nowrap">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Completed</span>
                </div>
              )}
              <button
                onClick={handleLike}
                disabled={liking}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                  isLiked
                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                <span className="font-medium">{project.likes?.length || 0}</span>
              </button>
            </div>
          </div>

          {/* Project Meta Info */}
          <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">
                <span className="font-semibold">{project.estimatedTime}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                project.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                project.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Category: <span className="font-semibold">{project.category}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Materials Needed */}
        {project.materials && project.materials.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-6 w-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Materials Needed</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.materials.map((material, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  {/* ▼▼▼ THIS IS FIX #1 ▼▼▼ */}
                  <span className="text-gray-700">{material.quantity} {material.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Step-by-Step Instructions */}
        {project.steps && project.steps.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <ListChecks className="h-6 w-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Step-by-Step Instructions</h2>
            </div>
            <div className="space-y-6">
              {project.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    {/* ▼▼▼ THIS IS FIX #2 (AND A BONUS FIX FOR THE 'TIP') ▼▼▼ */}
                    <p className="text-gray-700 leading-relaxed">{step.instruction}</p>
                    {step.tip && (
                      <p className="text-sm text-gray-500 mt-1 italic">Tip: {step.tip}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips and Tricks */}
        {project.tips && project.tips.length > 0 && (
          <div className="bg-yellow-50 rounded-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Tips & Tricks</h2>
            <ul className="space-y-2">
              {project.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Complete Project Button */}
        {user && !isCompleted && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Finished this project?
            </h3>
            <p className="text-gray-600 mb-6">
              Mark this project as complete to track your accomplishments!
            </p>
            <button
              onClick={handleComplete}
              disabled={completing}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {completing ? 'Completing...' : 'Mark as Complete'}
            </button>
          </div>
        )}

        {!user && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Want to track your projects?
            </h3>
            <p className="text-gray-600 mb-6">
              Sign in to save projects and track your progress!
            </p>
            <button
              onClick={() => router.push('/login')}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Sign In
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}