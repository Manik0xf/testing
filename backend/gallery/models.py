from django.db import models
from core.models import BaseModel

class GalleryItem(BaseModel):
    filename = models.CharField(max_length=200)
    image = models.URLField(max_length=500)
    category = models.CharField(max_length=100)
    upload_date = models.DateField()
    description = models.TextField(blank=True)
    
    class Meta:
        ordering = ['-upload_date']
    
    def __str__(self):
        return self.filename