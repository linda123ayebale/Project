from django.shortcuts import render
from django.http import JsonResponse
import openai
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

from dotenv import load_dotenv
import os

def configure():
    load_dotenv()

openai_api_key ='os.getenv()'
openai_api_key=configure()

#Function that sends a request to openai api with our message
# and then get a response from api
def ask_openai(message):
    response=openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
       messages=[
                {"role": "system","content": "You are a helpful assistant to the Makerere University Community. Your name is LAKY"},
                {"role": "user", "content": message},
       ],
       
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.7,
        
    )
   
    answer= response['choices'][0]['message']['content']
    return(answer)
@login_required(login_url='accounts:login')
def chatapp(request):
    if request.method == 'POST':
        message = request.POST.get('message')
        response =ask_openai(message)
        return JsonResponse({'message': message,'response': response})
    return render(request, 'chatbot/chat.html')


@login_required(login_url='accounts:login')
def landPage(request):
    
    return render(request, 'chatbot/index.html')

