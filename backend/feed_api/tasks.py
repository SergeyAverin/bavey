import logging

#from bavey.celery import app
from celery import shared_task


@shared_task
def add(x, y):
    return x + y
