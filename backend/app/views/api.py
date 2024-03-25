from flask import jsonify, current_app, request
from backend.app.views import api_blueprint
from flask_login import login_required, current_user
from datetime import datetime
from sqlalchemy.exc import IntegrityError
import jwt
import os
from functools import wraps
    

def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            parts = auth_header.split(" ")
            if len(parts) == 2:
                token = parts[1]

        if not token:
            return jsonify({'error': 'Token is missing or improperly formatted'}), 401

        try:
            secret_key = os.environ.get('SECRET_KEY')
            data = jwt.decode(token, secret_key, algorithms=['HS256'])
            request.user = data['User Object']
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

        return f(*args, **kwargs)

    return decorated_function


@api_blueprint.route('/dashboard/schedule/create', methods=['POST'])
@login_required
@token_required
def create_schedule():
    """Creates PLD Schedule"""
    from backend.models import Schedule
    from backend.models import PLDGroups
    db = current_app.db

    if request.method == 'POST':
        data = request.form
        topic = data.get('topic')
        cohort = data.get('cohort')
        date_time_str = data.get('date')

        if not topic or not cohort or not date_time_str:
            return jsonify({'error': 'Missing required fields'}), 400

        try:
            date_time = datetime.strptime(date_time_str, "%d/%m/%Y, %H:%M")
        except ValueError:
            return jsonify({'error': 'Invalid date and time format'}), 400

        try:
            # Create schedule with the obtained PLD group ID
            schedule = Schedule(
                topic=topic,
                cohort=cohort,
                date=date_time,
                user=current_user,
            )
            
            # Add both to session and commit
            db.session.add(schedule)
            db.session.commit()
            schedule.create_pld_group()
            schedule_dict = schedule.to_dict()
            pld_group = db.session.query(PLDGroups).filter(PLDGroups.schedule_id == schedule.id).first()
            unique_id = pld_group.unique_group_id
            schedule_dict.update({'Unique_group_id': unique_id})
            return jsonify({'message': 'Schedule created successfully!', 'schedule': schedule_dict}), 201
        except Exception as e:
            db.session.rollback()
            print(f"Error creating schedule: {str(e)}")
            return jsonify({'error': 'Failed to create schedule'}), 500
    else:
        return jsonify({'error': 'Invalid Request Method'}), 405
        

@api_blueprint.route('/dashboard/schedule/update/<int:schedule_id>', methods=['PUT'])
@login_required
@token_required
def update_schedule(schedule_id):
    """Updates Schedule"""
    from backend.models import Schedule
    from backend.models import PLDGroups
    db = current_app.db
    
    if request.method == 'PUT':
        data = request.form
        topic = data.get('topic')
        cohort = data.get('cohort')
        date = data.get('date')
        
        if not topic or not cohort or not date:
            return jsonify({'error': 'Missing required fields fields'}), 400
        try:
            date_time = datetime.strptime(date, "%d/%m/%Y, %H:%M")
        except ValueError:
            return jsonify({'error': 'Invalid date and time format'}), 400
        
        schedule = db.session.query(Schedule).filter(Schedule.id == schedule_id).first()
        
        if not schedule:
            return jsonify({'error': 'Schedule not found'}), 404
        
        if schedule.user != current_user:
            return jsonify({'error': 'Unauthorized access'}), 403
        
        try:
            schedule.topic = topic
            schedule.cohort = cohort
            schedule.date = date_time
            
            db.session.commit()
            
            schedule_dict = schedule.to_dict()
            pld_group = db.session.query(PLDGroups).filter(PLDGroups.schedule_id == schedule.id).first()
            unique_id = pld_group.unique_group_id
            schedule_dict.update({'Unique_group_id': unique_id})
            
            return jsonify({'message': 'Schedule updated successfully!', 'schedule': schedule_dict}), 200
        except Exception as e:
            db.session.rollback()
            print(f"Error updating schedule: {str(e)}")
            return jsonify({'error': 'Failed to update schedule'}), 500       
        
    else:
        return jsonify({'error': 'Invalid Request Method'}), 405
    
@api_blueprint.route('/dashboard/schedule/<int:schedule_id>', methods=['GET'])
@login_required
@token_required
def get_schedule(schedule_id):
    """Get Schedule based on ID"""
    from backend.models import Schedule
    from backend.models import PLDGroups
    db = current_app.db 
    
    if request.method == 'GET':
        schedule = db.session.query(Schedule).filter(Schedule.id == schedule_id).first()
        
        if not schedule:
            return jsonify({'error': 'Schedule not found'}), 404
        
        if schedule.user != current_user:
            return jsonify({'error': 'Unauthorized access'}), 403
    
        try:
            schedule_dict = schedule.to_dict()
            pld_group = db.session.query(PLDGroups).filter(PLDGroups.schedule_id == schedule.id).first()
            unique_id = pld_group.unique_group_id
            schedule_dict.update({'unique_group_id': unique_id})
            return jsonify({'schedule': schedule_dict}), 200
        except Exception as e:
                db.session.rollback()
                print(f"Error updating schedule: {str(e)}")
                return jsonify({'error': 'Failed to update schedule'}), 500 
        
    else:
        return jsonify({'error': 'Invalid Request Method'}), 405
    
@api_blueprint.route('/dashboard/schedules', methods=['GET'])
@login_required
@token_required
def get_schedules():
    """Gets all Schedules in Database"""
    from backend.models import Schedule
    from backend.models import PLDGroups
    db = current_app.db 

    if request.method == 'GET':
        try:
            schedules = Schedule.query.all()

            if not schedules:
                return jsonify({'error': 'No Schedules found'}), 404

            schedules_list = []
            for schedule in schedules:
                pld_group = PLDGroups.query.filter_by(schedule_id=schedule.id).first()
                unique_group_id = pld_group.unique_group_id if pld_group else None

                schedule_dict = schedule.to_dict()
                schedule_dict.update({'unique_group_id': unique_group_id})
                schedules_list.append(schedule_dict)

            return jsonify({'schedules': schedules_list}), 200
        except Exception as e:
            print(f"Error retrieving schedules: {str(e)}")
            return jsonify({'error': 'Failed to retrieve schedules'}), 500
    else:
        return jsonify({'error': 'Invalid Request Method'}), 405
    
@api_blueprint.route('/dashboard/schedule/delete/<int:schedule_id>', methods=['DELETE'])
@login_required
@token_required
def delete_schedule(schedule_id):
    """Deletes specified Schedule"""
    from backend.models import Schedule
    from backend.models import PLDGroups
    db = current_app.db
    
    if request.method == 'DELETE':
        schedule = db.session.query(Schedule).get(schedule_id)
        
        if not schedule:
            return jsonify({'error': "Schedule doesn't exist"}), 404
        
        if schedule.user != current_user:
            return jsonify({'error': 'Unauthorized Access'}), 403
        
        try:
            # Delete associated groups first
            pld_groups = db.session.query(PLDGroups).filter_by(schedule_id=schedule_id).all()
            for group in pld_groups:
                db.session.delete(group)
            
            # Then delete the schedule
            db.session.delete(schedule)
            db.session.commit()
            return jsonify({'message': 'Schedule deleted'}), 200
        except IntegrityError as e:
            db.session.rollback()
            return jsonify({'error': f"Error deleting schedule: {str(e)}"}), 500  
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f"Unexpected error: {str(e)}"}), 500  
    else:
        return jsonify({'error': 'Invalid Request Method'}), 405

