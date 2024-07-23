
from langchain_mistralai.chat_models import ChatMistralAI
import os
#from langchain_core.messages import HumanMessage, AIMessage
from langchain.chains import ConversationChain
# from DataBaseServices import fetch_data_by_user_id
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from asd.models import AsdBotModel
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from asd.serializers import AsdBotSerializer
# from DataBaseServices import fetch_data_by_user_id
from dotenv import load_dotenv
from asd.models import AsdBotModel
from langchain_core.messages import HumanMessage, AIMessage
load_dotenv()


# def get_chat_history(request):
#     user_id = request.GET.get('user_id')
#     if user_id:
#         data = fetch_data_by_user_id(user_id)
#         return JsonResponse({'data': data})
#     else:
#         return JsonResponse({'data': []})

def fetch_data_by_user_id(user_id):
    """
    Fetch the last 5 chat histories for the given user, ordered by the most recent first.
    
    Parameters:
    user_id: The unique identifier of the user.
    
    Returns:
    A list of dictionaries with 'HumanMessage' and 'AIMessage' fields.
    """
    
    try:
        # Fetch the last 5 chat histories for the given user, ordered by the most recent first
        chat_histories = AsdBotModel.objects.filter(user_id=user_id).order_by('-chat_at')[:5].values('HumanMessage', 'AIMessage')
        return chat_histories
    except Exception as error:
        print(error)
        return []

# results=fetch_data_by_user_id(1)
# print(results)

def qa_ret(UserMessage,history):

    """
    Generate an AI response to a user message related to Autism Spectrum Disorder (ASD).
    
    Parameters:
    UserMessage: The message from the user.
    history: A list of previous messages for context.

    Returns:
    A tuple containing the original UserMessage and the generated BotMessage.
    """

    history=', '.join(history)
    instructions=["1. If User ask question that is not related to Autism Spectrum Disorder (ASD) than say him sorry I can only help you regarding ASD."
                  "2. Response must be concise "
                  "3. If there is any confusion in User Message than ask him by rephrasing te question."
                  "4. Tone must be polite."]
    
    try:

        template = f"""You are an AI Assistant that answer the Autism Spectrum Disorder related every query of user based on provied history if history is not provided or the context of history is insufficient then answer user query based on your own knowledge.
        you have to strictly follow the instructions provided.
        history:{history}
        instructions: {instructions}
        UserMessage: {UserMessage}
        """
        #CUSTOM_QUESTION_PROMPT = PromptTemplate.from_template(custom_template)
        prompt = ChatPromptTemplate.from_template(template)
        # setup_and_retrieval = RunnableParallel(
        #     {"history":history,"UserMessage": RunnablePassthrough()}
        # )
        MISTRAL_API_KEY=os.environ.get("MISTRAL_API_KEY")
        llm = ChatMistralAI(api_key=MISTRAL_API_KEY,model_name="mistral-small-latest")
        output_parser = StrOutputParser()
        rag_chain = prompt | llm | output_parser
        BotMessage=rag_chain.invoke({"UserMessage":UserMessage})
        return UserMessage,BotMessage
    except Exception as ex:
        return ex




class ChatBotView(APIView):
    """
    Process user messages and return AI-generated responses related to Autism Spectrum Disorder (ASD).
    
    Handles POST requests with a user message, fetches chat history, generates a response using an AI model, and stores the interaction.
    """
    
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'UserMessage': openapi.Schema(type=openapi.TYPE_STRING)
            },
            required=['UserMessage']
        ),
        responses={
            200: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'id': openapi.Schema(type=openapi.TYPE_INTEGER),
                    'HumanMessage': openapi.Schema(type=openapi.TYPE_STRING),
                    'AIMessage': openapi.Schema(type=openapi.TYPE_STRING)
                }
            ),
            400: "Error: Bad request"
        },
        operation_summary="Process UserMessage and return HumanMessage and AIMessage"
    )
    def post(self, request, *args, **kwargs):
        print("----------------------------->")
        chat_history=fetch_data_by_user_id(request.user.id)
        chat_history=list(chat_history)
        history=[]
        for item in chat_history:
            history.append(item['HumanMessage'])
            history.append(item['AIMessage'])
        user_message = request.data.get("UserMessage")  # Assuming UserMessage is sent in the POST data

        try:
            # Call your function to generate AIMessage based on UserMessage
            user_message, bot_message = qa_ret(user_message,history)
            
            # Save UserMessage and AIMessage in the database
            asd_bot_instance = AsdBotModel.objects.create(
                user=request.user,  # Assuming you have authentication set up to get the current user
                HumanMessage=user_message,
                AIMessage=bot_message
            )
            
            # Serialize the response data to return only id, HumanMessage, and AIMessage, user_id
            serializer = AsdBotSerializer(asd_bot_instance)
            
            return Response(serializer.data)
        
        except Exception as ex:
            return Response({"error": str(ex)}, status=status.HTTP_400_BAD_REQUEST)



#eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxMzA4MTQzLCJpYXQiOjE3MTg3MTYxNDMsImp0aSI6IjM5ZjJjZDc0ZTgwOTQ3NjViZTA3NWM3ZGMyM2YwZDNkIiwidXNlcl9pZCI6MX0.q9Fkrxsje5kHKseKdmQkEsJe4KabsJPrv61a8p3UG4Y
