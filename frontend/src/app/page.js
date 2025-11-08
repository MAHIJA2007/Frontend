'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Hammer, FileText, TrendingUp, Award, Users } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Interactive Learning Modules',
      description: 'Comprehensive courses on renewable energy, waste reduction, and sustainable living practices.'
    },
    {
      icon: <Hammer className="h-8 w-8" />,
      title: 'DIY Project Library',
      description: 'Step-by-step tutorials for eco-friendly projects you can create at home.'
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Resource Hub',
      description: 'Curated guides, calculators, and tools to support your sustainability journey.'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Progress Tracking',
      description: 'Monitor your learning progress and environmental impact with detailed dashboards.'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Gamification & Rewards',
      description: 'Earn points, badges, and achievements as you complete modules and projects.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community Driven',
      description: 'Join a global community of learners committed to sustainable living.'
    }
  ];

  const stats = [
    { value: '6+', label: 'Learning Modules' },
    { value: '4+', label: 'DIY Projects' },
    { value: '5+', label: 'Resources' },
    { value: '100%', label: 'Free Access' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn to Live <span className="text-primary-600">Sustainably</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Discover interactive lessons, DIY projects, and practical resources to reduce your environmental impact and build a more sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/register"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition text-center"
              >
                Get Started Free
              </Link>
              <Link
                href="/modules"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 border-2 border-primary-600 transition text-center"
              >
                Explore Modules
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-600">{stat.value}</div>
                <div className="text-gray-700 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Start Your Sustainability Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides comprehensive tools and resources to help you learn, practice, and track your sustainable living goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <div className="text-primary-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to start your eco-friendly transformation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign Up & Explore</h3>
              <p className="text-gray-600">Create your free account and browse our library of modules, projects, and resources.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn & Practice</h3>
              <p className="text-gray-600">Complete interactive lessons and hands-on DIY projects at your own pace.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track & Improve</h3>
              <p className="text-gray-600">Monitor your progress, earn rewards, and see the positive impact you're making.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are taking action for a sustainable future.
          </p>
          <Link
            href="/register"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Start Learning Today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
