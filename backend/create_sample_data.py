#!/usr/bin/env python3
"""
Create Sample Data for AI-Solutions
Populates the database with sample content for testing
"""

import os
import sys
import django
from datetime import datetime, date, timedelta

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ai_solutions.settings')
django.setup()

from services.models import Service
from projects.models import Project
from articles.models import Article
from events.models import Event
from feedback.models import Feedback
from gallery.models import GalleryItem
from contacts.models import Contact

def create_sample_data():
    """Create sample data for all models"""
    print("🎯 Creating sample data for AI-Solutions...")
    
    # Create Services
    print("📋 Creating Services...")
    services_data = [
        {
            'name': 'AI Chatbots & Virtual Assistants',
            'description': 'Intelligent conversational AI that enhances customer experience and automates support.',
            'image': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
            'features': ['24/7 Customer Support', 'Multi-language Support', 'Integration Ready', 'Analytics Dashboard']
        },
        {
            'name': 'Machine Learning Analytics',
            'description': 'Advanced data analysis and predictive modeling to drive informed business decisions.',
            'image': 'https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=800',
            'features': ['Predictive Analytics', 'Real-time Processing', 'Custom Models', 'Data Visualization']
        },
        {
            'name': 'Computer Vision Solutions',
            'description': 'Image and video analysis for quality control, security, and automation applications.',
            'image': 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
            'features': ['Object Detection', 'Facial Recognition', 'Quality Control', 'Real-time Analysis']
        }
    ]
    
    for service_data in services_data:
        service, created = Service.objects.get_or_create(
            name=service_data['name'],
            defaults=service_data
        )
        if created:
            print(f"✅ Created service: {service.name}")
    
    # Create Projects
    print("🚀 Creating Projects...")
    projects_data = [
        {
            'name': 'Smart Healthcare Assistant',
            'description': 'AI-powered diagnostic assistant helping doctors make faster and more accurate diagnoses.',
            'image': 'https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=800',
            'category': 'Healthcare',
            'completion_date': date(2024, 12, 15),
            'technologies': ['Python', 'TensorFlow', 'Computer Vision', 'NLP'],
            'client': 'MedTech Solutions'
        },
        {
            'name': 'Financial Fraud Detection System',
            'description': 'Real-time fraud detection system processing millions of transactions daily.',
            'image': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
            'category': 'Finance',
            'completion_date': date(2024, 11, 20),
            'technologies': ['Python', 'Apache Kafka', 'MLOps', 'Real-time Analytics'],
            'client': 'SecureBank Corp'
        }
    ]
    
    for project_data in projects_data:
        project, created = Project.objects.get_or_create(
            name=project_data['name'],
            defaults=project_data
        )
        if created:
            print(f"✅ Created project: {project.name}")
    
    # Create Articles
    print("📰 Creating Articles...")
    articles_data = [
        {
            'title': 'The Future of AI in Healthcare: Transforming Patient Care',
            'description': 'Explore how artificial intelligence is revolutionizing healthcare delivery.',
            'image': 'https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=800',
            'author': 'Dr. Sarah Johnson',
            'publish_date': date(2024, 12, 1),
            'read_time': '8 min read',
            'category': 'Healthcare',
            'external_link': 'https://example.com/healthcare-ai'
        },
        {
            'title': 'Machine Learning in Financial Services: Risk and Opportunity',
            'description': 'Understanding how ML algorithms are reshaping the financial landscape.',
            'image': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
            'author': 'Michael Chen',
            'publish_date': date(2024, 11, 28),
            'read_time': '6 min read',
            'category': 'Finance',
            'external_link': 'https://example.com/ml-finance'
        }
    ]
    
    for article_data in articles_data:
        article, created = Article.objects.get_or_create(
            title=article_data['title'],
            defaults=article_data
        )
        if created:
            print(f"✅ Created article: {article.title}")
    
    # Create Events
    print("📅 Creating Events...")
    events_data = [
        {
            'title': 'AI in Healthcare Summit 2025',
            'description': 'Join industry leaders exploring AI-powered healthcare solutions.',
            'image': 'https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=800',
            'date': date(2025, 2, 15),
            'time': '09:00 AM',
            'location': 'San Francisco Convention Center',
            'event_type': 'upcoming',
            'max_attendees': 500,
            'registration_link': 'https://example.com/register'
        },
        {
            'title': 'AI Innovation Awards Ceremony',
            'description': 'Celebrating outstanding achievements in AI innovation.',
            'image': 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
            'date': date(2024, 11, 10),
            'time': '07:00 PM',
            'location': 'Grand Hotel Ballroom',
            'event_type': 'past',
            'max_attendees': 300
        }
    ]
    
    for event_data in events_data:
        event, created = Event.objects.get_or_create(
            title=event_data['title'],
            defaults=event_data
        )
        if created:
            print(f"✅ Created event: {event.title}")
    
    # Create Feedback
    print("⭐ Creating Feedback...")
    feedback_data = [
        {
            'name': 'Sarah Johnson',
            'email': 'sarah@medtech.com',
            'company': 'MedTech Solutions',
            'rating': 5,
            'review': 'AI-Solutions transformed our diagnostic processes completely.',
            'approved': True
        },
        {
            'name': 'Michael Chen',
            'email': 'michael@securebank.com',
            'company': 'SecureBank Corp',
            'rating': 5,
            'review': 'The fraud detection system exceeded our expectations.',
            'approved': True
        }
    ]
    
    for feedback_item in feedback_data:
        feedback, created = Feedback.objects.get_or_create(
            email=feedback_item['email'],
            defaults=feedback_item
        )
        if created:
            print(f"✅ Created feedback from: {feedback.name}")
    
    # Create Gallery Items
    print("🖼️ Creating Gallery Items...")
    gallery_data = [
        {
            'filename': 'ai-conference-2024.jpg',
            'image': 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
            'category': 'Events',
            'upload_date': date(2024, 11, 20),
            'description': 'AI-Solutions presenting at Global AI Conference 2024'
        },
        {
            'filename': 'team-workshop.jpg',
            'image': 'https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=800',
            'category': 'Team',
            'upload_date': date(2024, 11, 18),
            'description': 'Team workshop on machine learning best practices'
        }
    ]
    
    for gallery_item in gallery_data:
        item, created = GalleryItem.objects.get_or_create(
            filename=gallery_item['filename'],
            defaults=gallery_item
        )
        if created:
            print(f"✅ Created gallery item: {item.filename}")
    
    # Create Contact Inquiries
    print("📧 Creating Contact Inquiries...")
    contact_data = [
        {
            'full_name': 'John Smith',
            'email': 'john@techcorp.com',
            'phone': '+1-555-0123',
            'company': 'TechCorp Inc',
            'country': 'United States',
            'job_title': 'CTO',
            'job_details': 'Looking for AI solutions to improve our customer service operations.'
        },
        {
            'full_name': 'Emma Wilson',
            'email': 'emma@innovate.com',
            'company': 'Innovate Solutions',
            'country': 'Canada',
            'job_title': 'Product Manager',
            'job_details': 'Interested in implementing machine learning for predictive analytics.'
        }
    ]
    
    for contact_item in contact_data:
        contact, created = Contact.objects.get_or_create(
            email=contact_item['email'],
            defaults=contact_item
        )
        if created:
            print(f"✅ Created contact inquiry from: {contact.full_name}")
    
    print("\n🎉 Sample data creation completed!")
    print(f"📊 Created:")
    print(f"   - {Service.objects.count()} Services")
    print(f"   - {Project.objects.count()} Projects") 
    print(f"   - {Article.objects.count()} Articles")
    print(f"   - {Event.objects.count()} Events")
    print(f"   - {Feedback.objects.count()} Feedback items")
    print(f"   - {GalleryItem.objects.count()} Gallery items")
    print(f"   - {Contact.objects.count()} Contact inquiries")

if __name__ == "__main__":
    create_sample_data()