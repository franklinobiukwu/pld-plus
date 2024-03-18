from flask import Flask, current_app
from .app.views import api_blueprint, auth_blueprint
from .config.flask_config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

# Create an instance of the database
db = SQLAlchemy()

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
