from django.db import models
from core.models import BaseModel

class Service(BaseModel):
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.URLField(max_length=500)
    features = models.JSONField(default=list, blank=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name