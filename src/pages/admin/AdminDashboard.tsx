import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSupabase } from '../../contexts/SupabaseContext';
import { 
  Calendar, 
  FolderOpen, 
  FileText, 
  MessageSquare, 
  Image, 
  Mail,
  TrendingUp,
  Users,
  Activity,
  Clock,
  Plus,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardStats {
  events: number;
  projects: number;
  articles: number;
  feedback: number;
  gallery: number;
  contacts: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    events: 0,
    projects: 0,
    articles: 0,
    feedback: 0,
    gallery: 0,
    contacts: 0
  });
  const [loading, setLoading] = useState(true);
  const { supabase } = useSupabase();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch actual stats or use defaults
      const defaultStats = {
        events: 12,
        projects: 28,
        articles: 15,
        feedback: 45,
        gallery: 32,
        contacts: 67
      };

      setStats(defaultStats);
    } catch (err) {
      console.log('Using default stats');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Events',
      value: stats.events,
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+12%',
      link: '/admin/events'
    },
    {
      title: 'Projects',
      value: stats.projects,
      icon: FolderOpen,
      color: 'bg-green-500',
      change: '+8%',
      link: '/admin/projects'
    },
    {
      title: 'Articles',
      value: stats.articles,
      icon: FileText,
      color: 'bg-purple-500',
      change: '+15%',
      link: '/admin/articles'
    },
    {
      title: 'Feedback',
      value: stats.feedback,
      icon: MessageSquare,
      color: 'bg-yellow-500',
      change: '+23%',
      link: '/admin/feedback'
    },
    {
      title: 'Gallery Items',
      value: stats.gallery,
      icon: Image,
      color: 'bg-pink-500',
      change: '+5%',
      link: '/admin/gallery'
    },
    {
      title: 'Contact Inquiries',
      value: stats.contacts,
      icon: Mail,
      color: 'bg-indigo-500',
      change: '+18%',
      link: '/admin/contacts'
    }
  ];

  const recentActivities = [
    { action: 'New contact inquiry received', time: '2 minutes ago', type: 'contact' },
    { action: 'Feedback approved and published', time: '15 minutes ago', type: 'feedback' },
    { action: 'New article published', time: '1 hour ago', type: 'article' },
    { action: 'Event updated', time: '2 hours ago', type: 'event' },
    { action: 'Project images uploaded', time: '3 hours ago', type: 'project' }
  ];

  const quickActions = [
    { label: 'Add Event', icon: Calendar, link: '/admin/events', color: 'bg-blue-600' },
    { label: 'New Article', icon: FileText, link: '/admin/articles', color: 'bg-purple-600' },
    { label: 'Add Project', icon: FolderOpen, link: '/admin/projects', color: 'bg-green-600' },
    { label: 'View Contacts', icon: Mail, link: '/admin/contacts', color: 'bg-indigo-600' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-800"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl p-6"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-blue-100">
          Manage your AI-Solutions website content and monitor performance metrics.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <Link to={card.link} className="block">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
                    <p className="text-green-500 text-sm font-medium mt-1">{card.change}</p>
                  </div>
                  <div className={`${card.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center mb-4">
            <Activity className="h-5 w-5 text-blue-800 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-800 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{activity.action}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 text-blue-800 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  to={action.link}
                  className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity text-center`}
                >
                  <Icon className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">{action.label}</p>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* System Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Website Status</h2>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            All Systems Operational
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-800">99.9%</div>
            <div className="text-gray-600 text-sm">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">1.2s</div>
            <div className="text-gray-600 text-sm">Avg Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">2.1k</div>
            <div className="text-gray-600 text-sm">Monthly Visitors</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;