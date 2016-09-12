from django.conf.urls import url, patterns, include
from . import views
from django.contrib import admin


admin.autodiscover()

urlpatterns = patterns('',
	url('', include('django.contrib.auth.urls', namespace='auth')),
	url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'^$', views.index, name='index'),
    url(r'^login-user/', views.login, name='login'),
    url(r'^signup/', views.sign_up, name='sign_up'),
    url(r'^books/', views.books, name='books'),
    url(r'^get-book/', views.getBook, name='getBook'),
    url(r'^update-book/', views.updateBook, name='updateBook'),
    url(r'^add-book/', views.addBook, name='addBook'),
    url(r'^delete-book/', views.deleteBook, name='deleteBook'),
)