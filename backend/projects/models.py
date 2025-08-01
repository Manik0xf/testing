from django.db import models
from core.models import BaseModel

class Project(BaseModel):
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.URLField(max_length=500)
    category = models.CharField(max_length=100)
    completion_date = models.DateField()
    technologies = models.JSONField(default=list, blank=True)
    client = models.CharField(max_length=200)
    
    class Meta:
        ordering = ['-completion_date']
    
    def __str__(self):
        return self.name