from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
	url(r'^', include('bookapp.urls')),
    url(r'^security-check/admin', include(admin.site.urls)),
]
