from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'image', 'date', 'time', 
                 'location', 'event_type', 'max_attendees', 'registration_link', 'created_at']