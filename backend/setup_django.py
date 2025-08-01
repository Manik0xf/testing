#!/usr/bin/env python3
"""
Django Backend Setup Script for AI-Solutions
Run this script to set up the Django backend with all necessary apps and migrations.
"""

import os
import sys
import subprocess
import django
from django.core.management import execute_from_command_line

def run_command(command):
    """Run a shell command and return the result"""
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {command}")
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"❌ Error running: {command}")
        print(f"Error: {e.stderr}")
        return None

def setup_django_project():
    """Set up the Django project structure"""
    print("🚀 Setting up AI-Solutions Django Backend...")
    
    # Create Django apps
    apps = ['core', 'services', 'projects', 'articles', 'events', 'feedback', 'gallery', 'contacts']
    
    for app in apps:
        if not os.path.exists(app):
            print(f"Creating {app} app...")
            run_command(f"python manage.py startapp {app}")
    
    # Run migrations
    print("\n📦 Running migrations...")
    run_command("python manage.py makemigrations")
    run_command("python manage.py migrate")
    
    # Create superuser (optional)
    print("\n👤 Creating superuser...")
    print("You can create a superuser by running: python manage.py createsuperuser")
    
    # Collect static files
    print("\n📁 Collecting static files...")
    run_command("python manage.py collectstatic --noinput")
    
    print("\n✅ Django backend setup complete!")
    print("\n🔧 Next steps:")
    print("1. Create a superuser: python manage.py createsuperuser")
    print("2. Start the development server: python manage.py runserver")
    print("3. Access admin at: http://127.0.0.1:8000/admin/")
    print("4. API endpoints available at: http://127.0.0.1:8000/api/")

if __name__ == "__main__":
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ai_solutions.settings')
    setup_django_project()