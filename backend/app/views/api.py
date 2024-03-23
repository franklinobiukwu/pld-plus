from flask import jsonify, current_app, request
from backend.app.views import api_blueprint
from flask_login import login_required, current_user
from datetime import datetime


#ROUTES FOR API
@api_blueprint.route('/dashboard', methods=['GET'])
@login_required
def dashboard():
    """PLD+ Dashboard Page"""
    firstname = current_user.firstname
    lastname = current_user.lastname
    email = current_user.email
    cohort = current_user.cohort
    username = current_user.username
    
    return f"{firstname}, {lastname}, '{email}, '{cohort}', {username}"




@api_blueprint.route('/dashboard/schedule', methods=['POST'])
@login_required
def create_schedule():
    """Creates PLD Schedule"""
    from backend.models import Schedule
    from backend.models import PLDGroups
    db = current_app.db

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