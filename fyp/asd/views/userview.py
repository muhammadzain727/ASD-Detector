from django.shortcuts import render
from asd.serializers import UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer, UserChangePasswordSerializer, UserPasswordResetSerializer, SendPasswordResetEmailSerializer
from asd.renderers import UserRenderer
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

class UserRegistrationView(APIView):
  """
  Handle user registration requests.

  Processes POST requests with user registration data, validates the data, creates a new user, and returns a success message.
  """

  renderer_classes = [UserRenderer]
  @swagger_auto_schema(
        request_body=UserRegistrationSerializer,
        responses={201: UserRegistrationSerializer, 400: 'Bad Request'}
    )
  def post(self, request, format=None):
    try:
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({'msg':'Registration Successful'}, status=status.HTTP_201_CREATED)
    except:
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserLoginView(APIView):
  """
  Handle user login requests.

  Processes POST requests with user login data, validates the credentials, and returns an authentication token upon successful login.
  """
  @swagger_auto_schema(request_body=UserLoginSerializer)  

  def post(self, request, format=None):
    try:
      serializer = UserLoginSerializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      email = serializer.data.get('email')
      password = serializer.data.get('password')
      user = authenticate(email=email, password=password)
      if user is not None:
        token = get_tokens_for_user(user)
        return Response({'token':token, 'msg':'Login Success'}, status=status.HTTP_200_OK)
      else:
        return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)
    except:
      return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 
    
    

class UserProfileView(APIView):
  """
  Retrieve the authenticated user's profile information.

  Handles GET requests to return the profile data of the currently authenticated user.
  """
  permission_classes = [IsAuthenticated]
  
  @swagger_auto_schema(
      responses={200: UserProfileSerializer, 403: 'Forbidden'}
  )
  def get(self, request, format=None):
      user = request.user
      serializer = UserProfileSerializer(user)
      return Response(serializer.data, status=status.HTTP_200_OK)
    


class UserChangePasswordView(APIView):
  """
  Change the password of the authenticated user.

  Handles PUT requests to update the password of the currently authenticated user. Validates the new password and returns a success message upon successful update.
  """
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]

  @swagger_auto_schema(
      request_body=UserChangePasswordSerializer,
      responses={200: 'Password Changed Successfully', 403: 'Forbidden'}
  )
  def put(self, request, format=None):
      serializer = UserChangePasswordSerializer(data=request.data, context={'user': request.user})
      serializer.is_valid(raise_exception=True)
      return Response({'msg': 'Password Changed Successfully'}, status=status.HTTP_200_OK)


class SendPasswordResetEmailView(APIView):
    """
    Send a password reset link to the user's email address.

    Handles POST requests to send a password reset link based on the provided email address.
    """
    @swagger_auto_schema(request_body=SendPasswordResetEmailSerializer)
    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'msg': 'Password reset link sent'}, status=status.HTTP_200_OK)

class UserPasswordResetView(APIView):
    @swagger_auto_schema(request_body=UserPasswordResetSerializer)
    def post(self, request, uid, token, format=None):
        serializer = UserPasswordResetSerializer(data=request.data, context={'uid': uid, 'token': token})
        serializer.is_valid(raise_exception=True)
        return Response({'msg': 'Password reset successful'}, status=status.HTTP_200_OK)