from flask import jsonify, current_app, request
from backend.app.views import api_blueprint
from flask_login import login_required, current_user
from datetime import datetime
from sqlalchemy.exc import IntegrityError
import jwt
import os
from functools import wraps
from flask_cors import cross_origin


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
            return jsonify({
                'error': 'Token is missing or improperly formatted'
                }), 401

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
@cross_origin()
#@login_required
@token_required
def create_schedule():
    """Creates PLD Schedule"""
    from backend.models import Schedule
    from backend.models import PLDGroups
    db = current_app.db

    if request.method == 'POST':
        formData = request.get_json()
        topic = formData.get('topic')
        cohort = formData.get('cohort')
        date_time_str = formData.get('datetime')
        user_id = formData.get('user_id')

        if not topic or not cohort or not date_time_str:
            return jsonify({'error': 'Missing required fields'}), 400

        try:
            date_time = datetime.strptime(date_time_str, "%Y-%m-%dT%H:%M")
        except ValueError:
            return jsonify({'error': 'Invalid date and time format'}), 400

        try:
            # Create schedule with the obtained PLD group ID
            schedule = Schedule(
                topic=topic,
                cohort=cohort,
                date=date_time,
                user_id=user_id,
            )

            # Add both to session and commit
            db.session.add(schedule)
            db.session.commit()
            schedule.create_pld_group()
            schedule_dict = schedule.to_dict()
            pld_group = db.session.query(PLDGroups).filter(PLDGroups.schedule_id == schedule.id).first()
            unique_id = pld_group.unique_group_id
            schedule_dict.update({'Unique_group_id': unique_id})
            return jsonify({
                'message': 'Schedule created successfully!',
                'schedule': schedule_dict
                }), 201
        except Exception as e:
            db.session.rollback()
            print(f"Error creating schedule: {str(e)}")
            return jsonify({'error': 'Failed to create schedule'}), 500
    else:
        return jsonify({'error': 'Invalid Request Method'}), 405


@api_blueprint.route('/dashboard/schedule/update/<int:schedule_id>', methods=['PUT'])
# @login_required
@token_required
def update_schedule(schedule_id):
    """Updates Schedule"""
    from backend.models import Schedule
    from backend.models import PLDGroups
    db = current_app.db

    print("In edit")
    if request.method == 'PUT':
        data = request.get_json()
        topic = data.get('topic')
        cohort = data.get('cohort')
        date = data.get('date')
        current_user_id = data.get('current_user_id')

        print("edit details", data)
        if not topic or not cohort or not date:
            return jsonify({'error': 'Missing required fields fields'}), 400
        try:
            date_time = datetime.strptime(date, "%Y-%m-%dT%H:%M")
        except ValueError:
            return jsonify({'error': 'Invalid date and time format'}), 400

        schedule = db.session.query(Schedule).filter(Schedule.id == schedule_id).first()

        if not schedule:
            return jsonify({'error': 'Schedule not found'}), 404

        if schedule.user.id != current_user_id:
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
@token_required
def get_single_schedule(schedule_id):
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
@cross_origin()
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
@cross_origin()
@token_required
def delete_schedule(schedule_id):
    """Deletes specified Schedule"""
    from backend.models import Schedule
    from backend.models import PLDGroups
    db = current_app.db

    print("About to delete", schedule_id)
    if request.method == 'DELETE':
        schedule = db.session.query(Schedule).get(schedule_id)
        formData = request.get_json()
        current_user_id = formData.get('current_user_id')

        if not schedule:
            return jsonify({'error': "Schedule doesn't exist"}), 404

        if schedule.user.id != current_user_id:
            return jsonify({'error': 'Unauthorized Access'}), 403

        try:
            pld_groups = db.session.query(PLDGroups).filter_by(schedule_id=schedule_id).all()
            for group in pld_groups:
                db.session.delete(group)

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


# GROUPS API

@api_blueprint.route('/dashboard/discover-groups/search-bar/', methods=['POST'])
@cross_origin()
@login_required
@token_required
def get_schedul_via_search_bar():
    """Get Schedule based on ID"""
    db = current_app.db
    from backend.models import PLDGroups
    from backend.models import Schedule


    if request.method == 'POST':
        data = request.form
        unique_id = data.get('unique_group_id')

        if unique_id:
            # Query PLDGroups table to get the group with the provided unique_id
            pld_group = PLDGroups.query.filter_by(unique_group_id=unique_id).first()

            if pld_group:
                # Retrieve schedule associated with the found PLD group
                schedule = Schedule.query.get(pld_group.schedule_id)

                if schedule:
                    # Convert schedule and PLD group objects to dictionaries
                    schedule_dict = schedule.to_dict()
                    pld_group_dict = pld_group.to_dict()

                    # Include schedule and PLD group data in the response
                    response_data = {
                        "schedule": schedule_dict,
                        "pld_group": pld_group_dict
                    }
                    return jsonify(response_data), 200
                else:
                    return jsonify({"error": "Schedule not found"}), 404
            else:
                return jsonify({"error": "PLD Group not found"}), 404
        else:
            return jsonify({"error": "Missing unique_group_id parameter"}), 400
    else:
        return jsonify({"error": "Method not allowed"}), 405


@api_blueprint.route('/dashboard/discover-groups', methods=['GET'])
@cross_origin()
@login_required
@token_required
def get_groups():
    """Gets all Schedules in Database"""
    from backend.models import Schedule
    from backend.models import PLDGroups
    from backend.models import GroupMember
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

                member_count = GroupMember.query.filter_by(pld_group_id=pld_group.id).count()

                schedule_dict = schedule.to_dict()
                schedule_dict.update({
                    'unique_group_id': unique_group_id,
                    'member_count': member_count})
                schedules_list.append(schedule_dict)

            return jsonify({'schedules': schedules_list}), 200
        except Exception as e:
            print(f"Error retrieving schedules: {str(e)}")
            return jsonify({'error': 'Failed to retrieve schedules'}), 500

    return jsonify({'error': 'Invalid Request Method'}), 405


@api_blueprint.route('/dashboard/pld-group/<int:pld_group_id>/add', methods=['POST', 'PUT'])
@cross_origin()
@login_required
@token_required
def add_member(pld_group_id):
    """Adds someone to a pld group based on the unique id of group"""
    from backend.models import PLDGroups
    db = current_app.db

    if request.method == 'POST' or request.method == 'PUT':
        # Retrieve the PLD group
        group = PLDGroups.query.get(pld_group_id)
        if not group:
            return jsonify({'error': 'PLD group not found'}), 404

        # Call the add_member function from the PLDGroups model
        result = group.add_member(pld_group_id, current_user.id)
        if 'error' in result:
            return jsonify(result), 400

        return jsonify({
            'message': 'Member added successfully',
            'group': result
            }), 200

    else:
        return jsonify({'error': 'Invalid Request Method'}), 405

@api_blueprint.route('/dashboard/pld-group/<int:pld_group_id>/delete', methods=['DELETE'])
@cross_origin()
@login_required
@token_required
def delete_member(pld_group_id):
    """Delete ones self on the group"""
    from backend.models import PLDGroups
    db = current_app.db

    if request.method == 'DELETE':
        group = PLDGroups.query.get(pld_group_id)
        if not group:
            return jsonify({'error': 'PLD group not found'}), 404

        result = group.delete_member(pld_group_id, current_user.id)
        if 'error' in result:
            return jsonify(result), 400

        updated_group = PLDGroups.query.get(pld_group_id)
        if not updated_group:
            return jsonify({
                'error': 'PLD group not found after deletion'
                }), 404

        group_data = updated_group.to_dict()
        return jsonify({
            'message': 'Member deleted successfully',
            'group': group_data
            }), 200

    else:
        return jsonify({'error': 'Invalid Request Method'}), 405


@api_blueprint.route('/dashboard/pld-group/<string:unique_group_id>', methods=['GET'])
@cross_origin()
@login_required
@token_required
def get_unique_pld_group(unique_group_id):
    """Gets a PLD group based on the unique group id passed to it"""
    from backend.models import Schedule, GroupMember, PLDGroups, User
    db = current_app.db

    if request.method == 'GET':
        group = PLDGroups.query.filter_by(unique_group_id=unique_group_id).first()

        if not group:
            return jsonify({'error': 'PLD group not Found'}), 404

        schedule = Schedule.query.get(group.schedule_id)

        if not schedule:
            return jsonify({'error': 'No Schedule associated with group'}), 404

        members = GroupMember.query.filter_by(pld_group_id=group.id).limit(10).all()
        members_data = []

        for member in members:
            member_dict = member.to_dict()
            user = User.query.get(member.user_id)
            if user:
                member_dict['user'] = user.to_dict()
            else:
                member_dict['user'] = None
            members_data.append(member_dict)

        group_data = group.to_dict()
        group_data['schedule'] = schedule.to_dict()
        group_data['members'] = members_data

        return jsonify(group_data), 200

    else:
        return jsonify({'error': 'Invalid request'}), 405


# PROFILE ROUTES
@api_blueprint.route('/dashboard/profile/edit-profile', methods=['POST'])
@login_required
@token_required
def add_socials():
    """Add or update socials for the current user."""
    from backend.models import Socials
    db = current_app.db

    if request.method == 'POST':
        data = request.form

        phone_number = data.get('phone_number')
        discord = data.get('discord')
        github = data.get('github')
        whatsapp = data.get('whatsapp')
        twitter = data.get('twitter')
        linkedin = data.get('linkedin')
        medium = data.get('medium')

        try:
            socials = Socials.query.filter_by(user_id=current_user.id).first()

            if socials:
                # If socials already exist for the user, update them
                socials.phone_number = phone_number
                socials.discord = discord
                socials.github = github
                socials.whatsapp = whatsapp
                socials.twitter = twitter
                socials.linkedin = linkedin
                socials.medium = medium
            else:
                # If socials don't exist, create new ones
                socials = Socials(
                    phone_number=phone_number,
                    discord=discord,
                    github=github,
                    whatsapp=whatsapp,
                    twitter=twitter,
                    linkedin=linkedin,
                    medium=medium,
                    user_id=current_user.id
                )
                db.session.add(socials)

            db.session.commit()
            socials_dict = socials.to_dict()
            return jsonify({
                'message': 'Socials updated successfully!',
                'socials': socials_dict
                }), 200

        except Exception as e:
            db.session.rollback()
            print(f"Error updating socials: {str(e)}")
            return jsonify({'error': 'Failed to update socials'}), 500

    else:
        return jsonify({'error': 'Invalid Request Method'}), 405


@api_blueprint.route('/dashboard/profile/edit-profile', methods=['PUT'])
@login_required
@token_required
def update_user():
    """Update User information."""
    from backend.models import User
    db = current_app.db

    if request.method == 'PUT':
        data = request.form

        username = data.get('username')
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        cohort = data.get('cohort')
        email = data.get('email')

        try:
            user = User.query.get(current_user.id)

            if not user:
                return jsonify({'error': 'User not found'}), 404

            user.username = username
            user.firstname = firstname
            user.lastname = lastname
            user.cohort = cohort
            user.email = email

            db.session.commit()
            user_dict = user.to_dict()
            return jsonify({
                'message': 'User updated successfully!',
                'user': user_dict
                }), 200

        except Exception as e:
            db.session.rollback()
            print(f"Error updating user: {str(e)}")
            return jsonify({'error': 'Failed to update user'}), 500

    else:
        return jsonify({'error': 'Invalid Request Method'}), 405
