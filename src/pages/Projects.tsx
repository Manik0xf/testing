import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSupabase } from '../contexts/SupabaseContext';
import { ExternalLink, Calendar, Tag } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  completion_date: string;
  technologies: string[];
  client: string;
  created_at: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { supabase } = useSupabase();

  // Default projects as fallback
  const defaultProjects: Project[] = [
    {
      id: '1',
      name: 'Smart Healthcare Assistant',
      description: 'AI-powered diagnostic assistant helping doctors make faster and more accurate diagnoses using machine learning and computer vision.',
      image: 'https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Healthcare',
      completion_date: '2024-12-15',
      technologies: ['Python', 'TensorFlow', 'Computer Vision', 'NLP'],
      client: 'MedTech Solutions',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Financial Fraud Detection System',
      description: 'Real-time fraud detection system that processes millions of transactions daily with 99.8% accuracy using advanced machine learning algorithms.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Finance',
      completion_date: '2024-11-20',
      technologies: ['Python', 'Apache Kafka', 'MLOps', 'Real-time Analytics'],
      client: 'SecureBank Corp',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Smart Manufacturing Optimizer',
      description: 'IoT-enabled predictive maintenance system that reduced equipment downtime by 40% and increased overall efficiency.',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Manufacturing',
      completion_date: '2024-10-30',
      technologies: ['IoT', 'Predictive Analytics', 'Edge Computing', 'Dashboard'],
      client: 'Industrial Dynamics',
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      name: 'E-commerce Recommendation Engine',
      description: 'Personalized product recommendation system that increased conversion rates by 35% using collaborative filtering and deep learning.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'E-commerce',
      completion_date: '2024-09-15',
      technologies: ['Recommendation Systems', 'Deep Learning', 'A/B Testing', 'Analytics'],
      client: 'ShopSmart Inc',
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      name: 'Autonomous Vehicle Navigation',
      description: 'Advanced computer vision and sensor fusion system for autonomous vehicle navigation with real-time obstacle detection.',
      image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Automotive',
      completion_date: '2024-08-22',
      technologies: ['Computer Vision', 'Sensor Fusion', 'Real-time Processing', 'Safety Systems'],
      client: 'AutoTech Innovations',
      created_at: new Date().toISOString()
    },
    {
      id: '6',
      name: 'Climate Data Analytics Platform',
      description: 'Large-scale climate data processing and visualization platform helping researchers analyze environmental patterns and trends.',
      image: 'https://images.pexels.com/photos/7947665/pexels-photo-7947665.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Environment',
      completion_date: '2024-07-10',
      technologies: ['Big Data', 'Data Visualization', 'Cloud Computing', 'Statistical Analysis'],
      client: 'Climate Research Institute',
      created_at: new Date().toISOString()
    }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Using default projects');
        setProjects(defaultProjects);
      } else {
        setProjects(data || defaultProjects);
      }
    } catch (err) {
      console.log('Using default projects');
      setProjects(defaultProjects);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore our portfolio of successful AI implementations that have 
              transformed businesses across various industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-800 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-blue-800 text-white px-2 py-1 rounded text-sm">
                    {project.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{project.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Completed: {new Date(project.completion_date).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Client: </span>{project.client}
                    </div>
                  </div>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <Tag className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Technologies:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button className="w-full bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center space-x-2">
                    <span>View Case Study</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Have a Project in Mind?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's collaborate to bring your AI vision to life.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              onClick={() => window.location.href = '/contact'}
            >
              Start Your Project
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;