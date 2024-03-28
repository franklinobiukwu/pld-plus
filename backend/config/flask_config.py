#Flask configuration file
import os
from datetime import timedelta


class Config:
#SETTING SECRET KEY. ON PRODUCTION SERVER MAKE SECRET KEY A ENVIRON VARIABLE 
    # OR IN OUR OWN ENVIRONMENT 16 HASH TOKEN

    # APP CONFIGURATIONS GO HERE
    SECRET_KEY = os.environ.get('SECRET_KEY')

    # APP DATABASE CONFIG
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')

    # A configuration to enable or disable tracking modifications of objects.
    # You set it to False to disable tracking and use less memory.
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # COOKIE SESSIONS CONFIG
    SESSION_COOKIE_DURATION = timedelta(days=31)
    SESSION_COOKIE_SECURE = True

    # CORS
    CORS_HEADERS = "Content-Type"
