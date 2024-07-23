from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
import numpy as np
from PIL import Image as PILImage
from keras.models import load_model
from keras.preprocessing import image
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from asd.models import MachineLearningModel

class MachineLearningModelView(APIView):
    """
    Predict if an image is of an autistic or non-autistic person, including confidence level and accuracy.
    
    Handles POST requests with an image file, processes the image, makes a prediction using a pre-trained model, and returns the result.
    """
    
    parser_classes = (MultiPartParser, FormParser)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.model = load_model('D:\FinalYearProject\FYP\ASD_app\machinelearningpart\second_mobile_netV2.h5')

    @swagger_auto_schema(
        operation_description="Predict if an image is of an autistic or non-autistic person, including confidence level and accuracy",
        manual_parameters=[
            openapi.Parameter(
                'image', openapi.IN_FORM, type=openapi.TYPE_FILE, description='Image file', required=True
            )
        ],
        responses={200: openapi.Response('Success', openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'prediction': openapi.Schema(type=openapi.TYPE_STRING),
                'confidence': openapi.Schema(type=openapi.TYPE_NUMBER, format='float'),
                'accuracy': openapi.Schema(type=openapi.TYPE_NUMBER, format='float'),
            }
        ))}
    )
    def post(self, request, *args, **kwargs):
        # Ensure the user is authenticated
        if not request.user.is_authenticated:
            return Response({"error": "User is not authenticated"}, status=status.HTTP_403_FORBIDDEN)

        file = request.data.get('image')

        if not file:
            return Response({"error": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Load and preprocess the image
        img = PILImage.open(file)
        img = img.resize((224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        img_array = img_array / 255.0  # Normalize pixel values to [0, 1]

        # Make prediction
        predictions = self.model.predict(img_array)
        confidence = (predictions[0][0])
        predicted_class = 0 if confidence >= 0.5 else 1
        class_labels = {1: 'Autistic', 0: 'Non autistic'}
        prediction_label = class_labels[predicted_class]
        accuracy = float(confidence) if predicted_class == 0 else (1-float(confidence))

        MachineLearningModel.objects.create(
            user=request.user,
            title="Prediction Image",
            image=file
        )
        message="This model sometimes may do false assumptions and this is only for research purpose if you have any concerns regarding your child health please make an appointment with your health care specialist"
        return Response({
            "prediction": prediction_label,
            "accuracy": accuracy,
            "note": message
        }, status=status.HTTP_200_OK)
