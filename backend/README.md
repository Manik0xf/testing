# AI-Solutions Django Backend

A comprehensive Django REST API backend for the AI-Solutions website with full admin controls and secure endpoints.

## 🚀 Quick Start

### 1. Setup Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Environment Configuration
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 4. Run Setup Script
```bash
python setup_django.py
```

### 5. Create Superuser
```bash
python manage.py createsuperuser
```

### 6. Start Development Server
```bash
python manage.py runserver
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login/` - Admin login (JWT)
- `POST /api/auth/refresh/` - Refresh JWT token

### Public Endpoints (No Auth Required)
- `GET /api/services/` - List all services
- `GET /api/projects/` - List all projects
- `GET /api/articles/` - List all articles
- `GET /api/events/` - List all events
- `GET /api/feedback/` - List approved feedback only
- `GET /api/gallery/` - List all gallery items
- `POST /api/contacts/` - Submit contact form
- `POST /api/feedback/` - Submit feedback

### Admin Endpoints (Auth Required)
All CRUD operations for:
- `/api/services/` - Manage services
- `/api/projects/` - Manage projects
- `/api/articles/` - Manage articles
- `/api/events/` - Manage events
- `/api/feedback/` - Manage feedback (approve/reject)
- `/api/gallery/` - Manage gallery
- `/api/contacts/` - View contact inquiries

### Special Endpoints
- `POST /api/feedback/{id}/approve/` - Approve feedback
- `POST /api/feedback/{id}/reject/` - Reject feedback

## 🔐 Admin Features

### Django Admin Panel
Access at: `http://127.0.0.1:8000/admin/`

**Features:**
- Full CRUD operations for all models
- Bulk actions (approve/reject feedback)
- Advanced filtering and search
- Date hierarchies for time-based data
- Custom admin actions

### API Authentication
- JWT-based authentication for admin users
- Session authentication for Django admin
- CORS configured for React frontend

## 📧 Email Integration

Configure Gmail SMTP in `.env`:
```env
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@ai-solutions.com
```

**Features:**
- Automatic email notifications for contact form submissions
- Admin email alerts for new inquiries
- Support for Gmail App Passwords

## 🗄️ Database Models

### Services
- Name, description, image URL
- JSON field for features list
- Timestamps

### Projects
- Name, description, image, category
- Client information, completion date
- Technologies used (JSON array)

### Articles
- Title, description, author, category
- Publish date, read time, external links
- SEO-friendly structure

### Events
- Title, description, date/time, location
- Event type (upcoming/past)
- Registration links, attendee limits

### Feedback
- Customer name, email, company
- Star rating (1-5), review text
- Admin approval system

### Gallery
- Image filename, URL, category
- Upload date, descriptions
- Categorized organization

### Contacts
- Full contact information
- Job details and requirements
- Automatic email forwarding

## 🔧 Deployment

### Local Development
```bash
python manage.py runserver
```

### Production Deployment

#### Heroku
```bash
# Install Heroku CLI and login
heroku create ai-solutions-backend
heroku config:set SECRET_KEY=your-secret-key
heroku config:set DEBUG=False
git push heroku main
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
```

#### Railway
```bash
# Install Railway CLI
railway login
railway init
railway add
railway deploy
```

#### Render
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with automatic builds

## 🛡️ Security Features

- CSRF protection on all forms
- JWT authentication for API access
- Input validation and sanitization
- CORS configuration for frontend
- Secure headers and XSS protection
- SQL injection prevention through ORM

## 📱 Frontend Integration

Update your React frontend to use Django API:

```javascript
// Update API base URL
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Authentication headers
const authHeaders = {
  'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
  'Content-Type': 'application/json',
};
```

## 🔍 Testing

```bash
# Run tests
python manage.py test

# Check code coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
```

## 📈 Monitoring & Logging

- Django's built-in logging system
- Admin action logging
- Error tracking and reporting
- Performance monitoring ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.