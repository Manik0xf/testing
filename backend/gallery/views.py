from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import GalleryItem
from .serializers import GalleryItemSerializer

class GalleryItemViewSet(viewsets.ModelViewSet):
    queryset = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']
    search_fields = ['filename', 'description', 'category']
    ordering_fields = ['upload_date', 'created_at', 'filename']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]