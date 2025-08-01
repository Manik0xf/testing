from django.contrib import admin
from .models import GalleryItem

@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ['filename', 'category', 'upload_date', 'created_at']
    list_filter = ['category', 'upload_date', 'created_at']
    search_fields = ['filename', 'description']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'upload_date'