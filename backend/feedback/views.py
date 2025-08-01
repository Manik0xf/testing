from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Feedback
from .serializers import FeedbackSerializer, PublicFeedbackSerializer

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['approved', 'rating']
    search_fields = ['name', 'company', 'review']
    ordering_fields = ['created_at', 'rating']
    
    def get_permissions(self):
        if self.action in ['list', 'create']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        if self.action == 'list' and not self.request.user.is_authenticated:
            return Feedback.objects.filter(approved=True)
        return super().get_queryset()
    
    def get_serializer_class(self):
        if self.action == 'list' and not self.request.user.is_authenticated:
            return PublicFeedbackSerializer
        return super().get_serializer_class()
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def approve(self, request, pk=None):
        feedback = self.get_object()
        feedback.approved = True
        feedback.save()
        return Response({'status': 'approved'})
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def reject(self, request, pk=None):
        feedback = self.get_object()
        feedback.approved = False
        feedback.save()
        return Response({'status': 'rejected'})