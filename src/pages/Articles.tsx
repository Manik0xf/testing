import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSupabase } from '../contexts/SupabaseContext';
import { Calendar, User, ExternalLink, Clock } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  publish_date: string;
  read_time: string;
  category: string;
  external_link?: string;
  created_at: string;
}

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { supabase } = useSupabase();

  // Default articles as fallback
  const defaultArticles: Article[] = [
    {
      id: '1',
      title: 'The Future of AI in Healthcare: Transforming Patient Care',
      description: 'Explore how artificial intelligence is revolutionizing healthcare delivery, from diagnostic accuracy to personalized treatment plans and improved patient outcomes.',
      image: 'https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Dr. Sarah Johnson',
      publish_date: '2024-12-01',
      read_time: '8 min read',
      category: 'Healthcare',
      external_link: '#',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Machine Learning in Financial Services: Risk and Opportunity',
      description: 'Understanding how ML algorithms are reshaping the financial landscape, from fraud detection to algorithmic trading and customer experience enhancement.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Michael Chen',
      publish_date: '2024-11-28',
      read_time: '6 min read',
      category: 'Finance',
      external_link: '#',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Computer Vision Applications in Modern Manufacturing',
      description: 'Discover how computer vision is enabling quality control, predictive maintenance, and automated inspection in manufacturing environments.',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Emily Rodriguez',
      publish_date: '2024-11-25',
      read_time: '7 min read',
      category: 'Technology',
      external_link: '#',
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Natural Language Processing: Breaking Down Communication Barriers',
      description: 'How NLP technologies are enabling better human-computer interaction, from chatbots to real-time translation and sentiment analysis.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'David Park',
      publish_date: '2024-11-22',
      read_time: '5 min read',
      category: 'Technology',
      external_link: '#',
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      title: 'Ethical AI: Building Responsible Artificial Intelligence Systems',
      description: 'Examining the importance of ethical considerations in AI development, including bias prevention, transparency, and accountability.',
      image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Dr. Lisa Wang',
      publish_date: '2024-11-20',
      read_time: '9 min read',
      category: 'Ethics',
      external_link: '#',
      created_at: new Date().toISOString()
    },
    {
      id: '6',
      title: 'The Rise of Edge AI: Computing at the Source',
      description: 'Understanding edge AI deployment benefits, challenges, and real-world applications in IoT devices and autonomous systems.',
      image: 'https://images.pexels.com/photos/7947665/pexels-photo-7947665.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'James Thompson',
      publish_date: '2024-11-18',
      read_time: '6 min read',
      category: 'Technology',
      external_link: '#',
      created_at: new Date().toISOString()
    }
  ];

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Using default articles');
        setArticles(defaultArticles);
      } else {
        setArticles(data || defaultArticles);
      }
    } catch (err) {
      console.log('Using default articles');
      setArticles(defaultArticles);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(articles.map(a => a.category)))];
  
  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

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
            <h1 className="text-5xl font-bold mb-6">AI Insights & Articles</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay updated with the latest trends, insights, and developments 
              in artificial intelligence and machine learning.
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

      {/* Articles Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-blue-800 text-white px-2 py-1 rounded text-sm">
                    {article.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{article.read_time}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(article.publish_date).toLocaleDateString()}</span>
                    </div>
                    
                    {article.external_link && (
                      <a
                        href={article.external_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors flex items-center space-x-1 text-sm"
                      >
                        <span>Read More</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-blue-100 mb-8">
              Subscribe to our newsletter for the latest AI insights and industry updates.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Articles;