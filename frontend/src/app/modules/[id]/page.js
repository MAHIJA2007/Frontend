'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Clock, 
  Award, 
  CheckCircle, 
  Leaf,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import axios from 'axios';

export default function ModuleDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    fetchModule();
  }, [params.id]);

  const fetchModule = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/modules/${params.id}`
      );
      setModule(response.data.data);
      
      // Check if user has completed this module
      if (user && user.completedModules) {
        setIsCompleted(user.completedModules.includes(params.id));
      }
    } catch (error) {
      console.error('Error fetching module:', error);
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
        `${process.env.NEXT_PUBLIC_API_URL}/modules/${params.id}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setIsCompleted(true);
      alert('🎉 Congratulations! Module completed! You earned ' + module.points + ' points!');
    } catch (error) {
      alert('Error completing module: ' + error.response?.data?.message);
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-xl">Loading module...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-xl text-red-600">Module not found</div>
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
          Back to Modules
        </button>

        {/* Module Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-6 w-6 text-primary-600" />
                <span className="text-sm font-medium text-primary-600 uppercase">
                  {module.category.replace('-', ' ')}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {module.title}
              </h1>
              <p className="text-gray-600 text-lg">
                {module.description}
              </p>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Completed</span>
              </div>
            )}
          </div>

          {/* Module Meta Info */}
          <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">
                <span className="font-semibold">{module.duration}</span> minutes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <span className="text-gray-700">
                <span className="font-semibold">{module.points}</span> points
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-500" />
              <span className="text-gray-700">
                <span className="font-semibold">{module.carbonImpact}</span> kg CO₂ reduction
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                module.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                module.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
              </div>
            </div>
          </div>
        </div>

        {/* Module Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Module Content</h2>
          <div className="prose max-w-none">
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {module.content}
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        {module.keyTakeaways && module.keyTakeaways.length > 0 && (
          <div className="bg-primary-50 rounded-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Takeaways</h2>
            <ul className="space-y-2">
              {module.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Complete Module Button */}
        {user && !isCompleted && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ready to complete this module?
            </h3>
            <p className="text-gray-600 mb-6">
              Mark this module as complete to earn {module.points} points and track your progress!
            </p>
            <button
              onClick={handleComplete}
              disabled={completing}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {completing ? 'Completing...' : 'Complete Module'}
            </button>
          </div>
        )}

        {!user && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Want to track your progress?
            </h3>
            <p className="text-gray-600 mb-6">
              Sign in to mark modules as complete and earn points!
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
