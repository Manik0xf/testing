#!/usr/bin/env python3
"""
Fix Django migrations and create database tables
Run this script to resolve the missing table errors
"""

import os
import sys
import subprocess

def run_command(command):
    """Run a shell command and return the result"""
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {command}")
        if result.stdout:
            print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error running: {command}")
        print(f"Error: {e.stderr}")
        return False

def fix_migrations():
    """Fix Django migrations and create database tables"""
    print("🔧 Fixing Django migrations and creating database tables...")
    
    # Set Django settings module
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ai_solutions.settings')
    
    # Make migrations for each app
    apps = ['core', 'services', 'projects', 'articles', 'events', 'feedback', 'gallery', 'contacts']
    
    print("\n📦 Creating migrations for all apps...")
    for app in apps:
        print(f"Creating migrations for {app}...")
        run_command(f"python manage.py makemigrations {app}")
    
    # Make migrations for any remaining changes
    print("\n📦 Creating any additional migrations...")
    run_command("python manage.py makemigrations")
    
    # Apply all migrations
    print("\n🗄️ Applying migrations to create database tables...")
    run_command("python manage.py migrate")
    
    print("\n✅ Database setup complete!")
    print("\n🔧 Next steps:")
    print("1. Create a superuser: python manage.py createsuperuser")
    print("2. Start the development server: python manage.py runserver")
    print("3. Access admin at: http://127.0.0.1:8000/admin/")

if __name__ == "__main__":
    fix_migrations()