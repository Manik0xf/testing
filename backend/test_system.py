#!/usr/bin/env python3
"""
System Test Script for AI-Solutions Django Backend
Tests all API endpoints and functionality
"""

import os
import sys
import django
import requests
import json
from datetime import datetime, date

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ai_solutions.settings')
django.setup()

BASE_URL = 'http://127.0.0.1:8000/api'

def test_endpoint(method, endpoint, data=None, auth_token=None):
    """Test an API endpoint"""
    url = f"{BASE_URL}{endpoint}"
    headers = {'Content-Type': 'application/json'}
    
    if auth_token:
        headers['Authorization'] = f'Bearer {auth_token}'
    
    try:
        if method == 'GET':
            response = requests.get(url, headers=headers)
        elif method == 'POST':
            response = requests.post(url, json=data, headers=headers)
        elif method == 'PUT':
            response = requests.put(url, json=data, headers=headers)
        elif method == 'DELETE':
            response = requests.delete(url, headers=headers)
        
        print(f"✅ {method} {endpoint} - Status: {response.status_code}")
        return response
    except requests.exceptions.ConnectionError:
        print(f"❌ {method} {endpoint} - Connection Error (Server not running?)")
        return None
    except Exception as e:
        print(f"❌ {method} {endpoint} - Error: {str(e)}")
        return None

def run_tests():
    """Run comprehensive API tests"""
    print("🧪 Testing AI-Solutions Django Backend API")
    print("=" * 50)
    
    # Test public endpoints (no auth required)
    print("\n📖 Testing Public Endpoints:")
    test_endpoint('GET', '/services/')
    test_endpoint('GET', '/projects/')
    test_endpoint('GET', '/articles/')
    test_endpoint('GET', '/events/')
    test_endpoint('GET', '/feedback/')
    test_endpoint('GET', '/gallery/')
    
    # Test contact form submission
    print("\n📧 Testing Contact Form:")
    contact_data = {
        'full_name': 'Test User',
        'email': 'test@example.com',
        'phone': '+1234567890',
        'company': 'Test Company',
        'country': 'United States',
        'job_title': 'Developer',
        'job_details': 'Testing the contact form functionality'
    }
    test_endpoint('POST', '/contacts/', contact_data)
    
    # Test feedback submission
    print("\n⭐ Testing Feedback Submission:")
    feedback_data = {
        'name': 'Test Customer',
        'email': 'customer@example.com',
        'company': 'Test Corp',
        'rating': 5,
        'review': 'Excellent AI solutions and support!'
    }
    test_endpoint('POST', '/feedback/', feedback_data)
    
    print("\n✅ Public API tests completed!")
    print("\n🔐 To test admin endpoints:")
    print("1. Create a superuser: python manage.py createsuperuser")
    print("2. Get JWT token: POST /api/auth/login/ with credentials")
    print("3. Use token for authenticated requests")

if __name__ == "__main__":
    run_tests()