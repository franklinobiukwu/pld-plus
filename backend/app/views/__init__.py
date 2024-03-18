from flask import Blueprint

api_blueprint = Blueprint('api',__name__)
auth_blueprint = Blueprint('auth', __name__)

from backend.app.views.api import *
from backend.app.views.auth import *
