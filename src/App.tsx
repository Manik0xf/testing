import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SupabaseProvider } from './contexts/SupabaseContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Articles from './pages/Articles';
import Feedback from './pages/Feedback';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './components/admin/AdminLayout';
import AdminEvents from './pages/admin/AdminEvents';
import AdminProjects from './pages/admin/AdminProjects';
import AdminArticles from './pages/admin/AdminArticles';
import AdminServices from './pages/admin/AdminServices';
import AdminFeedback from './pages/admin/AdminFeedback';
import AdminGallery from './pages/admin/AdminGallery';
import AdminContacts from './pages/admin/AdminContacts';

function App() {
  return (
    <SupabaseProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            } />
            <Route path="/services" element={
              <>
                <Navbar />
                <Services />
                <Footer />
              </>
            } />
            <Route path="/projects" element={
              <>
                <Navbar />
                <Projects />
                <Footer />
              </>
            } />
            <Route path="/articles" element={
              <>
                <Navbar />
                <Articles />
                <Footer />
              </>
            } />
            <Route path="/feedback" element={
              <>
                <Navbar />
                <Feedback />
                <Footer />
              </>
            } />
            <Route path="/gallery" element={
              <>
                <Navbar />
                <Gallery />
                <Footer />
              </>
            } />
            <Route path="/events" element={
              <>
                <Navbar />
                <Events />
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Navbar />
                <Contact />
                <Footer />
              </>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="articles" element={<AdminArticles />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="feedback" element={<AdminFeedback />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="contacts" element={<AdminContacts />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </SupabaseProvider>
  );
}

export default App;