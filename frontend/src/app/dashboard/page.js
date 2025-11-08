'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Award, BookOpen, Hammer, TrendingUp, Leaf } from 'lucide-react';
import api from '@/lib/api';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const response = await api.get('/auth/me');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Points',
      value: stats?.progress?.points || 0,
      icon: <Award className="h-8 w-8" />,
      color: 'bg-yellow-500'
    },
    {
      title: 'Modules Completed',
      value: stats?.progress?.completedModules?.length || 0,
      icon: <BookOpen className="h-8 w-8" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Projects Done',
      value: stats?.progress?.completedProjects?.length || 0,
      icon: <Hammer className="h-8 w-8" />,
      color: 'bg-purple-500'
    },
    {
      title: 'CO₂ Reduced (kg)',
      value: stats?.progress?.carbonFootprintReduction || 0,
      icon: <Leaf className="h-8 w-8" />,
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-gray-600">Here's your sustainability progress overview</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} text-white p-3 rounded-lg`}>
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Badges Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Badges</h2>
            {stats?.progress?.badges && stats.progress.badges.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.progress.badges.map((badge, index) => (
                  <div key={index} className="text-center p-4 bg-primary-50 rounded-lg">
                    <div className="text-4xl mb-2">{badge.icon || '🏆'}</div>
                    <p className="font-medium text-gray-900">{badge.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Complete modules and projects to earn badges!</p>
            )}
          </div>

          {/* Progress Chart Placeholder */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Impact</h2>
            <div className="h-64 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Keep learning to see your impact grow!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
