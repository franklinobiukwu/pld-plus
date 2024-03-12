from flask import Flask
from .views.api import api_blueprint
from .views.auth import auth_blueprint
import os

def create_app():
    
    #CREATED INSTANCE OF APP
    app = Flask(__name__)
    
    #REGISTERED BLUEPRINTS FOR THE API AND AUTH ROUTES
    app.register_blueprint(api_blueprint)
    app.register_blueprint(auth_blueprint)
    
    #SETTING SECRET KEY. ON PRODUCTION SERVER MAKE SECRET KEY A ENVIRON VARIABLE 
    # OR IN OUR OWN ENVIRONMENT 16 HASH TOKEN
    
    #APP CONFIGURATIONS GO HERE
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
    
    return app