from django.db import models
from core.models import BaseModel

class Article(BaseModel):
    title = models.CharField(max_length=300)
    description = models.TextField()
    image = models.URLField(max_length=500)
    author = models.CharField(max_length=100)
    publish_date = models.DateField()
    read_time = models.CharField(max_length=20)
    category = models.CharField(max_length=100)
    external_link = models.URLField(max_length=500, blank=True, null=True)
    
    class Meta:
        ordering = ['-publish_date']
    
    def __str__(self):
        return self.title