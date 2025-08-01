import React from 'react';
import { Cpu, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Cpu className="h-8 w-8 text-white" />
              <span className="text-xl font-bold">AI-Solutions</span>
            </div>
            <p className="text-blue-200 mb-6 leading-relaxed">
              Leading the future with innovative AI solutions. We transform businesses through 
              cutting-edge artificial intelligence technologies and data-driven insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/services" className="text-blue-200 hover:text-white transition-colors">Services</a></li>
              <li><a href="/projects" className="text-blue-200 hover:text-white transition-colors">Projects</a></li>
              <li><a href="/articles" className="text-blue-200 hover:text-white transition-colors">Articles</a></li>
              <li><a href="/events" className="text-blue-200 hover:text-white transition-colors">Events</a></li>
              <li><a href="/feedback" className="text-blue-200 hover:text-white transition-colors">Feedback</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-300" />
                <span className="text-blue-200 text-sm">info@ai-solutions.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-300" />
                <span className="text-blue-200 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-300" />
                <span className="text-blue-200 text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p className="text-blue-200 text-sm">
            © 2025 AI-Solutions. All rights reserved. Built with cutting-edge technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;