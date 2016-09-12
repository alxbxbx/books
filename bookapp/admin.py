from django.contrib import admin
from bookapp.models import BookUser, Book
# Register your models here.
admin.site.register(BookUser)
admin.site.register(Book)