from django.conf.urls import url
from courses import views

urlpatterns = [
    url(r'^api/courses$', views.course_list),
    url(r'^api/courses/(?P<pk>[0-9]+)$', views.course_detail),
]
