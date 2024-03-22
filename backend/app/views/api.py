from flask import jsonify, current_app
from sqlalchemy import text
from backend.app.views import api_blueprint
from flask_login import login_required



#ROUTES FOR API
@api_blueprint.route('/dashboard', methods=['GET'])
@login_required
def dashboard():
    """PLD+ Dashboard Page"""
    return {"message": "hello from api"}

