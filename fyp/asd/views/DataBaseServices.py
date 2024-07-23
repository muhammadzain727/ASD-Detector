from asd.models import AsdBotModel
def fetch_data_by_user_id(user_id):
    try:
        chat_histories = AsdBotModel.objects.filter(user_id=user_id).values('UserChat', 'BotChat', 'chat_at')
        return chat_histories
    except Exception as error:
        print(error)
        return []

results=fetch_data_by_user_id(1)
print(results)