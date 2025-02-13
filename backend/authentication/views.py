from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
import json

from .models import UserResume, CompanyContact
from .utils import process_csv_file

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already exists'}, status=400)
        
        # Create user
        user = User.objects.create_user(
            username=email,  # Using email as username
            email=email,
            password=password
        )
        user.first_name = name
        user.save()
        
        return JsonResponse({'message': 'User registered successfully'})
    
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        user = authenticate(username=email, password=password)
        
        if user is not None:
            login(request, user)
            return JsonResponse({
                'message': 'Login successful',
                'user': {
                    'name': user.first_name,
                    'email': user.email
                }
            })
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
    
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def logout_user(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Logged out successfully'})
    
    return JsonResponse({'error': 'Invalid request method'}, status=400)

def check_auth(request):
    if request.user.is_authenticated:
        return JsonResponse({
            'isAuthenticated': True,
            'user': {
                'name': request.user.first_name,
                'email': request.user.email
            }
        })
    return JsonResponse({'isAuthenticated': False})


@csrf_exempt
def upload_files(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required'}, status=401)
    
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
    try:
        # Handle CSV file
        csv_file = request.FILES.get('csv_file')
        if csv_file:
            new_contacts_count = process_csv_file(csv_file)
        
        # Handle Resume
        resume_file = request.FILES.get('resume')
        if resume_file:
            # Update or create resume
            UserResume.objects.update_or_create(
                user=request.user,
                defaults={'resume': resume_file}
            )
        
        return JsonResponse({
            'message': 'Files processed successfully',
            'new_contacts_added': new_contacts_count if csv_file else 0
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def get_user_resume(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required'}, status=401)
    
    try:
        resume = UserResume.objects.get(user=request.user)
        return JsonResponse({
            'resume_url': resume.resume.url,
            'updated_at': resume.updated_at
        })
    except UserResume.DoesNotExist:
        return JsonResponse({'error': 'No resume found'}, status=404)