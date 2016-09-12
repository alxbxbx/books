from django.db import models

# Create your models here.
class BookUser(models.Model):
	first_name = models.CharField(max_length= 30)
	last_name = models.CharField(max_length= 30)
	username = models.CharField(max_length= 30)
	email = models.CharField(max_length= 50)
	password = models.CharField(max_length= 50)
	def __str__(self):
		return self.username

class Book(models.Model):
	title = models.CharField(max_length= 50)
	author = models.CharField(max_length= 50)
	genre = models.CharField(max_length= 50)
	year = models.CharField(max_length= 50)
	def __str__(self):
		return self.title