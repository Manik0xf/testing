from django.contrib import admin
from .models import Feedback

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ['name', 'company', 'rating', 'approved', 'created_at']
    list_filter = ['approved', 'rating', 'created_at']
    search_fields = ['name', 'company', 'review']
    readonly_fields = ['created_at', 'updated_at']
    actions = ['approve_feedback', 'reject_feedback']
    
    def approve_feedback(self, request, queryset):
        queryset.update(approved=True)
    approve_feedback.short_description = "Approve selected feedback"
    
    def reject_feedback(self, request, queryset):
        queryset.update(approved=False)
    reject_feedback.short_description = "Reject selected feedback"