from flask import Blueprint

api_blueprint = Blueprint('api',__name__)

#ROUTES FOR API
@api_blueprint.route('/', methods=['GET'])
def hello_api():
    return {"message": "hello from api"}