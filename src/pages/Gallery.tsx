import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSupabase } from '../contexts/SupabaseContext';
import { X, Calendar, Tag, Download } from 'lucide-react';

interface GalleryItem {
  id: string;
  filename: string;
  image: string;
  category: string;
  upload_date: string;
  description?: string;
  created_at: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const { supabase } = useSupabase();

  // Default images as fallback
  const defaultImages: GalleryItem[] = [
    {
      id: '1',
      filename: 'ai-conference-2024.jpg',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Events',
      upload_date: '2024-11-20',
      description: 'AI-Solutions presenting at the Global AI Conference 2024',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      filename: 'team-workshop.jpg',
      image: 'https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Team',
      upload_date: '2024-11-18',
      description: 'Team workshop on machine learning best practices',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      filename: 'office-space.jpg',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Office',
      upload_date: '2024-11-15',
      description: 'Our modern AI development workspace',
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      filename: 'client-meeting.jpg',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Meetings',
      upload_date: '2024-11-12',
      description: 'Strategic planning session with key clients',
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      filename: 'product-demo.jpg',
      image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Products',
      upload_date: '2024-11-10',
      description: 'Live demonstration of our latest AI platform',
      created_at: new Date().toISOString()
    },
    {
      id: '6',
      filename: 'awards-ceremony.jpg',
      image: 'https://images.pexels.com/photos/7947665/pexels-photo-7947665.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Awards',
      upload_date: '2024-11-08',
      description: 'Receiving the Innovation Excellence Award 2024',
      created_at: new Date().toISOString()
    },
    {
      id: '7',
      filename: 'data-center.jpg',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Infrastructure',
      upload_date: '2024-11-05',
      description: 'State-of-the-art AI computing infrastructure',
      created_at: new Date().toISOString()
    },
    {
      id: '8',
      filename: 'team-building.jpg',
      image: 'https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Team',
      upload_date: '2024-11-03',
      description: 'Annual team building and innovation retreat',
      created_at: new Date().toISOString()
    }
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Using default images');
        setImages(defaultImages);
      } else {
        setImages(data || defaultImages);
      }
    } catch (err) {
      console.log('Using default images');
      setImages(defaultImages);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))];
  
  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

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
            <h1 className="text-5xl font-bold mb-6">Image Gallery</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore our visual journey through events, projects, team moments, 
              and milestones that define AI-Solutions.
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

      {/* Image Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={image.image}
                    alt={image.filename}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-blue-800 text-white px-2 py-1 rounded text-xs">
                    {image.category}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 truncate">{image.filename}</h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(image.upload_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4" />
                    </div>
                  </div>
                  
                  {image.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{image.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg max-w-4xl max-h-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.filename}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-colors"
                >
                  <X className="h-6 w-6 text-gray-900" />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedImage.filename}</h3>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>{selectedImage.category}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(selectedImage.upload_date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {selectedImage.description && (
                  <p className="text-gray-700 mb-4">{selectedImage.description}</p>
                )}
                
                <div className="flex justify-end">
                  <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;