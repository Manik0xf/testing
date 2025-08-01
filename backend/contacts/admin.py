from django.contrib import admin
from .models import Contact

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'company', 'country', 'created_at']
    list_filter = ['country', 'created_at']
    search_fields = ['full_name', 'email', 'company', 'job_details']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'created_at'