# AI-Solutions Full-Stack Website

A comprehensive full-stack web application for an AI-based company, featuring a modern React frontend and robust Django backend.

## 🌟 Features

### Frontend (React + TypeScript)
- **Modern UI/UX** with dark blue and white theme
- **Responsive Design** for all devices
- **Smooth Animations** using Framer Motion
- **8 Main Pages**: Home, Services, Projects, Articles, Events, Gallery, Feedback, Contact
- **Admin Dashboard** with complete content management

### Backend (Django + DRF)
- **RESTful API** with Django REST Framework
- **JWT Authentication** for admin access
- **SQLite Database** with comprehensive models
- **Email Integration** for contact forms
- **Admin Interface** with custom controls

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ and pip
- Git

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Run complete setup
python run_complete_setup.py

# Create superuser
python manage.py createsuperuser

# Start Django server
python manage.py runserver
```

## 📁 Project Structure

```
ai-solutions/
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   └── ...
├── backend/               # Django backend
│   ├── ai_solutions/      # Main Django project
│   ├── services/          # Services app
│   ├── projects/          # Projects app
│   ├── articles/          # Articles app
│   ├── events/            # Events app
│   ├── feedback/          # Feedback app
│   ├── gallery/           # Gallery app
│   ├── contacts/          # Contacts app
│   └── ...
└── README.md
```

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/services/` - List services
- `GET /api/projects/` - List projects
- `GET /api/articles/` - List articles
- `GET /api/events/` - List events
- `GET /api/feedback/` - List approved feedback
- `GET /api/gallery/` - List gallery items
- `POST /api/contacts/` - Submit contact form
- `POST /api/feedback/` - Submit feedback

### Admin Endpoints (JWT Required)
- Full CRUD operations for all content types
- `POST /api/auth/login/` - Admin login
- `POST /api/auth/refresh/` - Refresh token
- `POST /api/feedback/{id}/approve/` - Approve feedback
- `POST /api/feedback/{id}/reject/` - Reject feedback

## 🎨 Design System

### Colors
- **Primary**: Dark Blue (#1e3a8a)
- **Secondary**: White (#ffffff)
- **Accent**: Blue gradients
- **Text**: Gray scale

### Typography
- **Headings**: Bold, hierarchical sizing
- **Body**: Clean, readable fonts
- **Code**: Monospace for technical content

## 🔐 Security Features

- JWT authentication for admin access
- CSRF protection on all forms
- Input validation (frontend + backend)
- CORS configuration for API access
- Secure password handling

## 📧 Email Configuration

Configure Gmail SMTP in `backend/.env`:
```env
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@ai-solutions.com
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
python test_system.py
```

### Frontend Testing
```bash
npm run test
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway/Render)
```bash
# Configure environment variables
# Deploy backend/ folder
```

## 📊 Admin Dashboard Features

- **Dashboard Overview** with statistics
- **Content Management** for all data types
- **User Authentication** with secure login
- **Bulk Operations** for efficiency
- **Search & Filtering** capabilities
- **Email Notifications** for inquiries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Run the test scripts
- Review the setup guides
- Contact the development team

---

Built with ❤️ using React, Django, and modern web technologies.