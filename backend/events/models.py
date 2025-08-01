from django.db import models
from core.models import BaseModel

class Event(BaseModel):
    EVENT_TYPES = [
        ('upcoming', 'Upcoming'),
        ('past', 'Past'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.URLField(max_length=500)
    date = models.DateField()
    time = models.CharField(max_length=20)
    location = models.CharField(max_length=300)
    event_type = models.CharField(max_length=20, choices=EVENT_TYPES, default='upcoming')
    max_attendees = models.PositiveIntegerField(blank=True, null=True)
    registration_link = models.URLField(max_length=500, blank=True, null=True)
    
    class Meta:
        ordering = ['-date']
    
    def __str__(self):
        return self.title