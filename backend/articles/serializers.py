from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'description', 'image', 'author', 
                 'publish_date', 'read_time', 'category', 'external_link', 'created_at']