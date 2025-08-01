from django.contrib import admin
from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'publish_date', 'created_at']
    list_filter = ['category', 'author', 'publish_date', 'created_at']
    search_fields = ['title', 'description', 'author']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'publish_date'