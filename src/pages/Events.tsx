import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSupabase } from '../contexts/SupabaseContext';
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  event_type: 'upcoming' | 'past';
  max_attendees?: number;
  registration_link?: string;
  created_at: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const { supabase } = useSupabase();

  // Default events as fallback
  const defaultEvents: Event[] = [
    {
      id: '1',
      title: 'AI in Healthcare Summit 2025',
      description: 'Join industry leaders as we explore the latest breakthroughs in AI-powered healthcare solutions, from diagnostic tools to personalized treatment plans.',
      image: 'https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2025-02-15',
      time: '09:00 AM',
      location: 'San Francisco Convention Center',
      event_type: 'upcoming',
      max_attendees: 500,
      registration_link: '#',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Machine Learning Workshop: Hands-on Training',
      description: 'Interactive workshop covering practical machine learning implementation, from data preprocessing to model deployment in production environments.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2025-01-28',
      time: '10:00 AM',
      location: 'AI-Solutions Training Center',
      event_type: 'upcoming',
      max_attendees: 50,
      registration_link: '#',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Future of AI in Finance Webinar',
      description: 'Virtual discussion on how artificial intelligence is transforming financial services, featuring case studies and expert insights.',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2025-01-20',
      time: '02:00 PM',
      location: 'Online Event',
      event_type: 'upcoming',
      max_attendees: 1000,
      registration_link: '#',
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      title: 'AI Innovation Awards Ceremony',
      description: 'Celebrating outstanding achievements in artificial intelligence innovation and recognizing pioneers who are shaping the future of technology.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-11-10',
      time: '07:00 PM',
      location: 'Grand Hotel Ballroom',
      event_type: 'past',
      max_attendees: 300,
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      title: 'Computer Vision Masterclass',
      description: 'Comprehensive training session on computer vision applications, covering object detection, image classification, and real-world implementations.',
      image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-10-25',
      time: '09:30 AM',
      location: 'Tech Campus Auditorium',
      event_type: 'past',
      max_attendees: 150,
      created_at: new Date().toISOString()
    },
    {
      id: '6',
      title: 'AI Ethics and Governance Panel',
      description: 'Important discussion on responsible AI development, ethical considerations, and governance frameworks for artificial intelligence systems.',
      image: 'https://images.pexels.com/photos/7947665/pexels-photo-7947665.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-09-15',
      time: '03:00 PM',
      location: 'University Research Center',
      event_type: 'past',
      max_attendees: 200,
      created_at: new Date().toISOString()
    }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.log('Using default events');
        setEvents(defaultEvents);
      } else {
        setEvents(data || defaultEvents);
      }
    } catch (err) {
      console.log('Using default events');
      setEvents(defaultEvents);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => event.event_type === activeTab);

  const isEventUpcoming = (date: string) => {
    return new Date(date) > new Date();
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
            <h1 className="text-5xl font-bold mb-6">Events & Workshops</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join us for exclusive AI events, workshops, and networking opportunities. 
              Stay ahead of the curve with industry insights and hands-on learning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Event Tabs */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-800 hover:bg-blue-50'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'past'
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-800 hover:bg-blue-50'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded text-sm font-medium ${
                    event.event_type === 'upcoming' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white'
                  }`}>
                    {event.event_type === 'upcoming' ? 'Upcoming' : 'Past Event'}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-blue-800" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-blue-800" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-blue-800" />
                      <span>{event.location}</span>
                    </div>
                    
                    {event.max_attendees && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-blue-800" />
                        <span>Max {event.max_attendees} attendees</span>
                      </div>
                    )}
                  </div>

                  {event.event_type === 'upcoming' && event.registration_link ? (
                    <motion.a
                      href={event.registration_link}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Register Now</span>
                      <ExternalLink className="h-4 w-4" />
                    </motion.a>
                  ) : (
                    <div className="w-full bg-gray-100 text-gray-600 px-6 py-3 rounded-lg font-semibold text-center">
                      Event Completed
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No {activeTab} events available at the moment.
              </p>
            </div>
          )}
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
            <h2 className="text-3xl font-bold mb-4">Want to Host an Event?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Partner with us to organize AI workshops, seminars, or conferences.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              onClick={() => window.location.href = '/contact'}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Events;