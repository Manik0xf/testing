#!/usr/bin/env python3
"""
Complete Setup Script for AI-Solutions Django Backend
Runs all necessary setup steps in the correct order
"""

import os
import sys
import subprocess
import django

def run_command(command, description):
    """Run a shell command with description"""
    print(f"\n🔧 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        if result.stdout:
            print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error in {description}")
        print(f"Error: {e.stderr}")
        return False

def complete_setup():
    """Run complete Django setup"""
    print("🚀 AI-Solutions Django Backend - Complete Setup")
    print("=" * 60)
    
    # Step 1: Install dependencies
    if not run_command("pip install -r requirements.txt", "Installing Python dependencies"):
        return False
    
    # Step 2: Create migrations
    apps = ['core', 'services', 'projects', 'articles', 'events', 'feedback', 'gallery', 'contacts']
    
    for app in apps:
        if not run_command(f"python manage.py makemigrations {app}", f"Creating migrations for {app}"):
            print(f"⚠️ Warning: Could not create migrations for {app}")
    
    # Step 3: Apply migrations
    if not run_command("python manage.py makemigrations", "Creating additional migrations"):
        print("⚠️ Warning: Could not create additional migrations")
    
    if not run_command("python manage.py migrate", "Applying database migrations"):
        return False
    
    # Step 4: Collect static files
    if not run_command("python manage.py collectstatic --noinput", "Collecting static files"):
        print("⚠️ Warning: Could not collect static files")
    
    # Step 5: Create sample data
    print("\n📊 Creating sample data...")
    try:
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ai_solutions.settings')
        django.setup()
        
        # Import and run sample data creation
        exec(open('create_sample_data.py').read())
        print("✅ Sample data created successfully")
    except Exception as e:
        print(f"⚠️ Warning: Could not create sample data: {e}")
    
    print("\n🎉 Setup completed successfully!")
    print("\n📋 Next Steps:")
    print("1. Create superuser: python manage.py createsuperuser")
    print("2. Start server: python manage.py runserver")
    print("3. Test API: python test_system.py")
    print("4. Access admin: http://127.0.0.1:8000/admin/")
    print("5. API docs: http://127.0.0.1:8000/api/")
    
    return True

if __name__ == "__main__":
    complete_setup()