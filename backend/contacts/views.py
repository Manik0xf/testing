from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from django_filters.rest_framework import DjangoFilterBackend
from .models import Contact
from .serializers import ContactSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['country', 'company']
    search_fields = ['full_name', 'email', 'company', 'job_details']
    ordering_fields = ['created_at', 'full_name']
    
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact = serializer.save()
        
        # Send email notification to admin
        try:
            subject = f"New Contact Inquiry from {contact.full_name}"
            message = f"""
            New contact inquiry received:
            
            Name: {contact.full_name}
            Email: {contact.email}
            Phone: {contact.phone}
            Company: {contact.company}
            Country: {contact.country}
            Job Title: {contact.job_title}
            
            Details:
            {contact.job_details}
            """
            
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.EMAIL_HOST_USER],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Failed to send email: {e}")
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)