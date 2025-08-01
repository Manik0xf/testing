import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSupabase } from '../contexts/SupabaseContext';
import { Bot, Brain, TrendingUp, Shield, Zap, Database } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  created_at: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { supabase } = useSupabase();

  // Default services as fallback
  const defaultServices: Service[] = [
    {
      id: '1',
      name: 'AI Chatbots & Virtual Assistants',
      description: 'Intelligent conversational AI that enhances customer experience and automates support.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['24/7 Customer Support', 'Multi-language Support', 'Integration Ready', 'Analytics Dashboard'],
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Machine Learning Analytics',
      description: 'Advanced data analysis and predictive modeling to drive informed business decisions.',
      image: 'https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Predictive Analytics', 'Real-time Processing', 'Custom Models', 'Data Visualization'],
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Computer Vision Solutions',
      description: 'Image and video analysis for quality control, security, and automation applications.',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Object Detection', 'Facial Recognition', 'Quality Control', 'Real-time Analysis'],
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      name: 'Natural Language Processing',
      description: 'Text analysis, sentiment detection, and language understanding for business insights.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Sentiment Analysis', 'Text Classification', 'Language Translation', 'Content Generation'],
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      name: 'AI Process Automation',
      description: 'Streamline workflows and automate repetitive tasks with intelligent process automation.',
      image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Workflow Automation', 'Document Processing', 'Task Scheduling', 'Integration APIs'],
      created_at: new Date().toISOString()
    },
    {
      id: '6',
      name: 'AI Consulting & Strategy',
      description: 'Expert guidance on AI implementation, strategy development, and digital transformation.',
      image: 'https://images.pexels.com/photos/7947665/pexels-photo-7947665.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Strategy Development', 'Implementation Planning', 'Training & Support', 'ROI Analysis'],
      created_at: new Date().toISOString()
    }
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Using default services');
        setServices(defaultServices);
      } else {
        setServices(data || defaultServices);
      }
    } catch (err) {
      console.log('Using default services');
      setServices(defaultServices);
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (index: number) => {
    const icons = [Bot, Brain, TrendingUp, Shield, Zap, Database];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="h-8 w-8" />;
  };

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
            <h1 className="text-5xl font-bold mb-6">Our AI Services</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive artificial intelligence solutions designed to transform 
              your business operations and drive sustainable growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-blue-800 text-white p-2 rounded-lg">
                    {getServiceIcon(index)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 text-sm">Key Features:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <span className="w-2 h-2 bg-blue-800 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's discuss how our AI services can transform your business.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;