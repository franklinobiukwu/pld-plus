from flask import Blueprint

auth_blueprint = Blueprint('auth', __name__)


# ROUTES FOR AUTHORISATION
@auth_blueprint.route('/auth', methods=['GET'])
def hello_auth():
    return {"message": 'Hello Auth'}

