'use client';

import Link from 'next/link';
import { Leaf, Mail, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-primary-400" />
              <span className="font-bold text-xl">EcoLearn</span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering sustainable living through education and community action.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Learn</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/modules" className="hover:text-primary-400">Modules</Link></li>
              <li><Link href="/projects" className="hover:text-primary-400">Projects</Link></li>
              <li><Link href="/resources" className="hover:text-primary-400">Resources</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-primary-400">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary-400">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-primary-400">Blog</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <Mail className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} EcoLearn. All rights reserved.</p>
          <p className="mt-2">Built for FEDF-PS50 - Sustainable Living Education Platform</p>
        </div>
      </div>
    </footer>
  );
}
