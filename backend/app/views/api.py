from flask import jsonify, current_app
from sqlalchemy import text
from backend.app.views import api_blueprint



#ROUTES FOR API
@api_blueprint.route('/', methods=['GET'])
def hello_api():
    return {"message": "hello from api"}


@api_blueprint.route('/test-db-connection')
def test_db_connection():
    try:
        db = current_app.db
        # Try executing a simple query to test the database connection
        db.session.execute(text('SELECT 1'))
        return jsonify({'message': 'Database connection successful'}), 200
    except Exception as e:
        return jsonify({'error': 'Failed to connect to the database', 'details': str(e)}), 500
