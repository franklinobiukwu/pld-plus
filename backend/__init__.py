from flask import Flask, current_app
from .app.views import api_blueprint, auth_blueprint
from .config.flask_config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

# Create an instance of the database
db = SQLAlchemy()
# Initialize Login Manager
login_manager = LoginManager()
login_manager.login_view = 'login'
# Import the load_user function from your models file
from .models import load_user
def create_app():
    # Create an instance of the Flask application
    app = Flask(__name__)
    
    # Register blueprints for the API and auth routes
    app.register_blueprint(api_blueprint)
    app.register_blueprint(auth_blueprint)
    
    # Import all Flask App configurations
    app.config.from_object(Config)
    
    # Initialize Bcrypt
    Bcrypt(app=app)
    
    # Initialize Flask-Login
    login_manager.init_app(app)

    # Register the user loader function
    login_manager.user_loader(load_user)

    # Expose db to current_app
    with app.app_context():
        # Initialize the database with the app
        db.init_app(app)
        
        # Create the tables
        from backend.models import User, Socials, Schedule, PLDGroups, GroupMember
        db.create_all()
        
        # Expose db to current_app
        current_app.db = db
    
    return app

# Create the Flask app
app = create_app()
