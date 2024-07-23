from asd.views.userview import UserRegistrationView,UserLoginView,UserProfileView,UserChangePasswordView,SendPasswordResetEmailView,UserPasswordResetView
from asd.views.asdview import MachineLearningModelView
from asd.views.ASDChatbotView import ChatBotView
from django.urls import path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
schema_view = get_schema_view(
    openapi.Info(
        title="ASD Detection",
        default_version="v1",
        description="Your API Description",
        terms_of_service="https://your-terms-of-service-url.com",
        contact=openapi.Contact(email="contact@yourapi.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('userprofile/', UserProfileView.as_view(), name='userprofile'),
    path('change_pasword/', UserChangePasswordView.as_view(), name='change password'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
    path('asd_predict_image/', MachineLearningModelView.as_view(), name='predict-image'),
    path('chatbot/',ChatBotView.as_view(),name="Chat_Bot")
]