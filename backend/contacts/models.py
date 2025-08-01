from django.db import models
from core.models import BaseModel

class Contact(BaseModel):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=200, blank=True)
    country = models.CharField(max_length=100)
    job_title = models.CharField(max_length=100, blank=True)
    job_details = models.TextField()
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.full_name} - {self.email}"