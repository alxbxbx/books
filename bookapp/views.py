from django.shortcuts import render
from .models import BookUser, Book
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
import json
# Create your views here.
def index(request):
	request.session['user'] = None
	return render(request, 'bookapp/index.html')

def books(request):
	books = Book.objects.all()
	if request.session['user'] == None and not request.user.is_anonymous():
		request.session['user'] = str(request.user)
	return render(request, 'bookapp/books.html', {'books': books, 'user' : request.session['user']})


def login(request):
	user = BookUser()
	try:
		user = BookUser.objects.get(username = request.POST['username'])
	except:
		return HttpResponse(status = 404)

	if request.POST['password'] == user.password:
		request.session['user'] = user.username
		return HttpResponse(status = 200)
	else:
		return HttpResponse(status = 400)

def sign_up(request):
	user = BookUser()
	try:
		user = BookUser.objects.get(username = request.POST['username'])
		if user != None:
			return HttpResponse(status = 400)
	except:
		pass
	
	user.first_name = request.POST['firstName']
	user.last_name = request.POST['lastName']
	user.username = request.POST['username']
	user.email = request.POST['email']
	user.password = request.POST['password']
	user.save()
	return HttpResponse(status = 200)

def getBook(request):
	book = Book.objects.get(pk = int(request.GET['id']))
	send_book  = {}
	send_book['id'] = book.id
	send_book['title'] = book.title
	send_book['author'] = book.author
	send_book['genre'] = book.genre
	send_book['year'] = book.year
	return JsonResponse(send_book)

def updateBook(request):
	book = Book.objects.get(pk = int(request.POST['id']))
	book.title = request.POST['title']
	book.author = request.POST['author']
	book.genre = request.POST['genre']
	book.year = request.POST['year']
	book.save()
	return HttpResponseRedirect('/books')

def addBook(request):
	book = Book()
	book.title = request.POST['title']
	book.author = request.POST['author']
	book.genre = request.POST['genre']
	book.year = request.POST['genre']
	book.save()
	return HttpResponseRedirect('/books')

def deleteBook(request):
	book = Book.objects.get(pk = int(request.POST['id']))
	book.delete()
	return HttpResponseRedirect('/books')