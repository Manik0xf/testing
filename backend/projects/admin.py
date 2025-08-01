from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'client', 'completion_date', 'created_at']
    list_filter = ['category', 'completion_date', 'created_at']
    search_fields = ['name', 'description', 'client']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'completion_date'