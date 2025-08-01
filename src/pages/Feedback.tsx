import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSupabase } from '../contexts/SupabaseContext';
import { Star, Send, User, Calendar } from 'lucide-react';

interface Feedback {
  id: string;
  name: string;
  email: string;
  company: string;
  rating: number;
  review: string;
  approved: boolean;
  created_at: string;
}

const Feedback: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    rating: 5,
    review: ''
  });
  const { supabase } = useSupabase();

  // Default feedbacks as fallback
  const defaultFeedbacks: Feedback[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@medtech.com',
      company: 'MedTech Solutions',
      rating: 5,
      review: 'AI-Solutions transformed our diagnostic processes completely. The accuracy and speed improvements have been remarkable, leading to better patient outcomes.',
      approved: true,
      created_at: '2024-11-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@securebank.com',
      company: 'SecureBank Corp',
      rating: 5,
      review: 'The fraud detection system has exceeded our expectations. We\'ve seen a significant reduction in false positives while catching more actual fraud attempts.',
      approved: true,
      created_at: '2024-11-10T14:20:00Z'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily@industrial.com',
      company: 'Industrial Dynamics',
      rating: 4,
      review: 'Excellent predictive maintenance solution. The team was professional and the implementation was smooth. Highly recommend their services.',
      approved: true,
      created_at: '2024-11-05T09:15:00Z'
    },
    {
      id: '4',
      name: 'David Park',
      email: 'david@shopsmart.com',
      company: 'ShopSmart Inc',
      rating: 5,
      review: 'The recommendation engine boosted our conversion rates significantly. The AI-Solutions team provided exceptional support throughout the project.',
      approved: true,
      created_at: '2024-10-28T16:45:00Z'
    }
  ];

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Using default feedbacks');
        setFeedbacks(defaultFeedbacks);
      } else {
        setFeedbacks(data || defaultFeedbacks);
      }
    } catch (err) {
      console.log('Using default feedbacks');
      setFeedbacks(defaultFeedbacks);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('feedback')
        .insert([{
          ...formData,
          approved: false // Requires admin approval
        }]);

      if (error) {
        console.error('Error submitting feedback:', error);
        alert('Error submitting feedback. Please try again.');
      } else {
        alert('Thank you for your feedback! It will be reviewed and published soon.');
        setFormData({
          name: '',
          email: '',
          company: '',
          rating: 5,
          review: ''
        });
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
      alert('Error submitting feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const renderStars = (rating: number, interactive: boolean = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
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
            <h1 className="text-5xl font-bold mb-6">Client Feedback</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Hear what our clients say about their experience working with AI-Solutions. 
              Your feedback helps us continuously improve our services.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Share Your Experience</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating *
                  </label>
                  {renderStars(formData.rating, true, (rating) => setFormData({...formData, rating}))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review *
                  </label>
                  <textarea
                    name="review"
                    value={formData.review}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Share your experience with our AI solutions..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Submit Feedback</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What Our Clients Say</h2>
            
            {feedbacks.map((feedback, index) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{feedback.name}</h3>
                      {feedback.company && (
                        <p className="text-sm text-gray-600">{feedback.company}</p>
                      )}
                    </div>
                  </div>
                  {renderStars(feedback.rating)}
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">"{feedback.review}"</p>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(feedback.created_at).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;