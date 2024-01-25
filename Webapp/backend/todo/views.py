from django.shortcuts import render, redirect
from rest_framework import viewsets        
from .serializers import TodoSerializer     
from .models import Todo                    
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo
from rest_framework.decorators import api_view
from transformers import pipeline
import time
from django.http import HttpResponseNotFound
import json
from django.http import HttpResponse
from django.conf import settings
import os
import cexprtk
import re
import math
from transformers import WhisperForConditionalGeneration, WhisperFeatureExtractor, WhisperTokenizer



@csrf_exempt
def search_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            search_query = data.get('search_query')
            response_data = {"search_query": search_query}
            return JsonResponse(response_data)
        except json.JSONDecodeError as e:
            return JsonResponse({"error": "Invalid JSON data."}, status=400)
    else:
        return JsonResponse({"error": "Only POST requests are allowed."})

@csrf_exempt
def calculate_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            expression = data.get('expression')
            angleUnit = data.get('angleUnit')
            if not expression:
                response_data = {"result": ""}
                return JsonResponse(response_data)
            
            expression = expression.replace('π', '*' + str(math.pi))
            expression = expression.replace('e', '*' + str(math.e))
            expression = expression.replace('√', 'sqrt')
                
            expression = re.sub(r'sqrt(\d+)', r'sqrt(\1)', expression)
            expression = re.sub(r'tan(\d+)', r'tan(\1)', expression)
            expression = re.sub(r'log(?![\d(])', r'log(', expression)
            expression = re.sub(r'ln(\d+)', r'log(\1)', expression)
            expression = re.sub(r'sin(\d+)', r'sin(\1)', expression)
            expression = re.sub(r'cos(\d+)', r'cos(\1)', expression)
            expression = re.sub(r'sinh(\d+)', r'sinh(\1)', expression)
            expression = re.sub(r'cosh(\d+)', r'cosh(\1)', expression)
            expression = re.sub(r'tanh(\d+)', r'tanh(\1)', expression)
            expression = re.sub(r'asin(\d+)', r'asin(\1)', expression)
            expression = re.sub(r'acos(\d+)', r'acos(\1)', expression)
            expression = re.sub(r'atan(\d+)', r'atan(\1)', expression)
            expression = re.sub(r'(\b(?:sin|cos|tan)\b)(\d+(?:\.\d*)?)', r'\1(\2)', expression)
            expression = re.sub(r'([*/+-])', r' \1 ', expression)
            expression = re.sub(r'log(?![\d(])', r'log(', expression)
            expression = re.sub(r'(\b(?:sin|cos|tan|asin|acos|atan)\b)(?![\d(])', r'\1(', expression)
            expression = re.sub(r'(\d+(?:\.\d*)?)(%)(?![\d(])', r'\1/100', expression)
            expression = re.sub(r'(?<!\w)(log|ln)(?![\d(])', r'\1(', expression)
            expression = re.sub(r'log(?![\d(])', r'log10(', expression)
            expression = re.sub(r'log(\d)', r'log(\1)', expression)
            expression = re.sub(r'ln(?![\d(])', r'log(', expression)
            expression = re.sub(r'log(?![\d(])', r'log10(', expression)
            expression = re.sub(r'\)(?=\()', ')*', expression)
            expression = re.sub(r'(\b(?:sin|cos|tan|asin|acos|atan)\b)(?![\d(])', r'\1(', expression)
            expression = re.sub(r'log(\d)', r'log(\1)', expression)

            print("Expression: ")
            print(expression )
            
            if 'log(' in expression:
                expression = expression.replace('log(', 'log10(')
            if 'ln' in expression:
                expression = expression.replace('ln', 'log')

                
            print("Expression: ")
            print(expression )
            
            if expression and expression[-1] in ['+', '-', '*', '/']:
                expression += '0'

            if angleUnit == 'deg':
                expression = "rad2deg(" + str(expression) + ')'
                        
            result = cexprtk.evaluate_expression(expression, {})

            response_data = {"result": result}
            return JsonResponse(response_data)
        except json.JSONDecodeError as e:
            return JsonResponse({"error": "Invalid JSON data."}, status=400)
    else:
        return JsonResponse({"error": "Only POST requests are allowed."})


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    
@csrf_exempt 
@api_view(['POST'])
def audio_transcription_view(request):
    if request.method == 'POST':
        try:
            if 'audio' in request.FILES:
                audio_file = request.FILES['audio']
                audio_data = audio_file.read()
                try:
                    start_time = time.time()

                    fine_tuned_model_path = os.getcwd()+"/whisper-finetuned-common-voice-ja-en"
                    model = WhisperForConditionalGeneration.from_pretrained(fine_tuned_model_path)
                    tokenizer = WhisperTokenizer.from_pretrained(fine_tuned_model_path)
                    feature_extractor = WhisperFeatureExtractor.from_pretrained(fine_tuned_model_path)
                    pipe = pipeline("automatic-speech-recognition", model=model, tokenizer=tokenizer, feature_extractor=feature_extractor, chunk_length_s=30, generate_kwargs = {"language":"<|en|>","task": "transcribe"})

                    # pipe = pipeline("automatic-speech-recognition", model="openai/whisper-small", chunk_length_s=30, generate_kwargs = {"language":"<|en|>","task": "transcribe"}) # openai/whisper-base & openai/whisper-large-v2

                    transcription = pipe(audio_data)["text"]

                    end_time = time.time()
                    response_time = end_time - start_time
                    print(f"Transcription done successfully in {response_time:.2f} seconds")
                    return JsonResponse({"transcription": transcription})
                except Exception as e:
                    print(f"Error: {str(e)}")
                    return JsonResponse({"error": str(e)}, status=500)
            else:
                return JsonResponse({"error": "No audio file found in the request."}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only POST requests are allowed."})
