from flask import Blueprint, jsonify, current_app, request, make_response
from backend.app.views import auth_blueprint
from flask_bcrypt import generate_password_hash, check_password_hash
from secrets import token_hex
from flask_login import login_user, logout_user, login_required
import jwt
import os


#HELPER FUNCTIONS

def generate_tokens():
    token = token_hex(16)
    return token


#ROUTES FOR AUTHORISATION
@auth_blueprint.route('/auth/register', methods=['GET','POST'], strict_slashes=False)
def register():
    """User registration"""
    db = current_app.db
    if request.method == "POST":
        from backend.models import User
        
        username=request.form['username']
        firstname=request.form['firstname']
        lastname=request.form['lastname']
        cohort=request.form['cohort']
        email=request.form['email']
        password=request.form['password']
        
        if not username or not firstname or not lastname or not cohort or not email or not password:
            return jsonify({'error': 'Missing fields'}), 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'error': 'Username already exists'}), 400
        
        
        hashed_paswrd = generate_password_hash(request.form['password']).decode('utf-8')
        
        user = User(
            username=request.form['username'],
            firstname=request.form['firstname'],
            lastname=request.form['lastname'],
            cohort=request.form['cohort'],
            email=request.form['email'],
            password=hashed_paswrd,
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        user_dict = user.to_dict()
        secret_key = os.environ.get('SECRET_KEY')
        token = jwt.encode({'User Object': user_dict}, secret_key)
        return jsonify({'message': 'User registered successfully', 'token': token, 'user' : user_dict}), 201

    return jsonify({'error': "Invalid Request"}), 400

@auth_blueprint.route('/auth/login', methods=['GET', 'POST'], strict_slashes=False)
def login():
    """User Login"""
    
    db = current_app.db
    
    if request.method == 'POST':
        from backend.models import User
        #STORE REQUEST INFORMATION
        email = request.form['email']
        password = request.form['password']
        remember_me = request.form.get('remember_me')
        
        
        if not email or not password:
            return jsonify({'error': 'missing fields'}), 400
        
        user = db.session.query(User).filter(User.email == email).first()
        
        if user:
            if check_password_hash(user.password, password):
                login_user(user, remember=remember_me)
                user_dict = user.to_dict()
                secret_key = os.environ.get('SECRET_KEY')
                token = jwt.encode({'User Object': user_dict}, secret_key)
                return jsonify({'message': 'User logged in successfully', 'token': token, 'user': user_dict}), 201
            else:
                return jsonify({'error': 'Invalid Password'}), 401
        else:
            return jsonify({'error': 'User doesnt exist'}), 401
    else:
        return jsonify({'error': 'Invalid Request'}), 405

@login_required
@auth_blueprint.route('/auth/logout', strict_slashes=False)
def logout():
    """User Log out"""
    logout_user()
    return jsonify({'message': 'Logged out'})
    

@auth_blueprint.route('/auth/forgot-password', methods=['POST'], strict_slashes=False)
def forgot_password():
    """User forgot password"""
    db = current_app.db
    
    if request.method == 'POST':
        from backend.models import User
        user_email = request.form['email']
        
        user = db.session.query(User).filter(User.email == user_email).first()
        
        if user:
            reset_token = generate_tokens()
            user.reset_token = reset_token
            db.session.commit()
            response = make_response(jsonify({'Reset Token': reset_token}), 201)
            return response
        else:
            return jsonify({'error': 'Invalid user'}), 404
    else:
        return jsonify({"error":'Invalid Request'}), 405

@auth_blueprint.route('/auth/reset-password', methods=['POST'], strict_slashes=False)
def reset_password_page():
    """Set New Password"""
    db = current_app.db
    
    if request.method == 'POST':
        from backend.models import User
        user_reset_token = request.form['reset_token']
        new_password = request.form['new_password']
        confirm_password = request.form['confirm_password']
        
        if not user_reset_token:
            return jsonify({'error': 'Reset token is required'}), 400
        
        user = db.session.query(User).filter(User.reset_token == user_reset_token).first()
        
        if user:
            if new_password != confirm_password:
                return jsonify({'error': 'Passwords do not match'}), 400

            user.password = generate_password_hash(new_password).decode('utf-8')
            
            user.reset_token = None
            
            db.session.commit()
            
            return jsonify({'message': 'Password reset successful'}), 200
        else:
            return jsonify({'error': 'Invalid reset token'}), 404
    else:
        return jsonify({'error': 'Invalid Request'}), 405
