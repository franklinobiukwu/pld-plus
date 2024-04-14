from flask import jsonify, current_app, request, send_from_directory
from backend.app.views import api_blueprint
from flask_login import current_user
from datetime import datetime
from sqlalchemy.exc import IntegrityError
import jwt
import os
from functools import wraps
from flask_cors import cross_origin
from werkzeug.utils import secure_filename


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
        meeting_link = formData.get('meeting_link')

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
                meeting_link=meeting_link
            )

            # Add both to session and commit
            db.session.add(schedule)
            db.session.commit()
            schedule.create_pld_group()
            schedule_dict = schedule.to_dict()
            pld_group = db.session.query(PLDGroups).filter(PLDGroups.schedule_id == schedule.id).first()
            unique_id = pld_group.unique_group_id
            schedule_dict.update({'unique_group_id': unique_id})
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


@api_blueprint.route('/dashboard/schedule/update', methods=['PUT'])
@cross_origin()
@token_required
def update_schedule():
    """Updates Schedule"""
    from backend.models import Schedule
    from backend.models import PLDGroups
    db = current_app.db

    if request.method == 'PUT':
        data = request.get_json()
        topic = data.get('topic')
        cohort = data.get('cohort')
        date = data.get('date')
        current_user_id = data.get('current_user_id')
        meeting_link = data.get('meeting_link'),
        schedule_id = data.get('schedule_id')

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
            schedule.meeting_link = meeting_link

            db.session.commit()

            schedule_dict = schedule.to_dict()
            pld_group = db.session.query(PLDGroups).filter(PLDGroups.schedule_id == schedule.id).first()
            unique_id = pld_group.unique_group_id
            schedule_dict.update({'unique_group_id': unique_id})

            return jsonify({'message': 'Schedule updated successfully!', 'schedule': schedule_dict}), 200
        except Exception as e:
            db.session.rollback()
            print(f"Error updating schedule: {str(e)}")
            return jsonify({'error': 'Failed to update schedule'}), 500       

    else:
        return jsonify({'error': 'Invalid Request Method'}), 405


@api_blueprint.route('/dashboard/schedule/<int:schedule_id>', methods=['GET'])
@cross_origin()
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
        page = request.args.get('page', 1, type=int)
        per_page = 5
        try:
            schedules = Schedule.query.paginate(page=page, per_page=per_page)

            if not schedules:
                return jsonify({'error': 'No Schedules found'}), 404

            schedules_list = []
            for schedule in schedules:
                pld_group = PLDGroups.query.filter_by(schedule_id=schedule.id).first()
                unique_group_id = pld_group.unique_group_id if pld_group else None

                schedule_dict = schedule.to_dict()
                schedule_dict.update({'unique_group_id': unique_group_id})
                schedules_list.append(schedule_dict)

            return jsonify({'schedules': schedules_list,
                            'current_page': schedules.page,
                            'total_pages': schedules.pages,
                            'total_schedules': schedules.total}), 200
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
@token_required
def get_data_via_search_bar():
    """Get Schedules and PLDGroups based on search query"""
    db = current_app.db
    from backend.models import PLDGroups
    from backend.models import Schedule

    if request.method == 'POST':
        data = request.json
        search_query = data.get('search_query')

        if search_query:
            # Query to join Schedule and PLDGroups tables and filter based on search query
            query = db.session.query(Schedule, PLDGroups).join(PLDGroups, Schedule.id == PLDGroups.schedule_id).filter(
                (Schedule.id == search_query) |
                (Schedule.cohort.ilike(f'%{search_query}%')) |
                (PLDGroups.unique_group_id == search_query) |
                (Schedule.title.ilike(f'%{search_query}%'))
            )

            # Execute the query and fetch results
            results = query.all()

            # Extract schedule and PLD group data from the results
            data = []
            for schedule, pld_group in results:
                data.append({
                    "schedule": schedule.to_dict(),
                    "pld_group": pld_group.to_dict()
                })

            # Include the data in the response
            response_data = {
                "data": data
            }
            return jsonify(response_data), 200
        else:
            return jsonify({"error": "Missing search query"}), 400
    else:
        return jsonify({"error": "Method not allowed"}), 405


@api_blueprint.route('/dashboard/discover-groups', methods=['GET'])
@cross_origin()
@token_required
def get_groups():
    """Gets all Schedules in Database"""
    from backend.models import Schedule
    from backend.models import PLDGroups
    from backend.models import GroupMember
    from backend.models import User
    db = current_app.db

    if request.method == 'GET':
        page = request.args.get('page', 1, type=int)
        per_page = 5
        try:
            schedules = Schedule.query.paginate(page=page, per_page=per_page)

            if not schedules:
                return jsonify({'error': 'No Schedules found'}), 404

            schedules_list = []
            for schedule in schedules:
                pld_group = PLDGroups.query.filter_by(schedule_id=schedule.id).first()
                unique_group_id = pld_group.unique_group_id if pld_group else None

                member_count = GroupMember.query.filter_by(pld_group_id=pld_group.id).count()
                members = GroupMember.query.filter_by(pld_group_id=pld_group.id).all()
                members_array = []
                members_info_array = []
                for member in members:
                    if member.pld_group_id == pld_group.id:
                        members_array.append(member.user_id)
                    member_info = User.query.filter_by(id=member.user_id).first()
                    if member_info:
                        member_info_dict = member_info.to_dict()
                        members_info_array.append({
                            'firstname': member_info_dict['firstname'],
                            'lastname': member_info_dict['lastname'],
                            'username': member_info_dict['username'],
                            'email': member_info_dict['email'],
                            'cohort': member_info_dict['cohort'],
                            'role': member.role
                            })

                schedule_dict = schedule.to_dict()
                schedule_dict.update({
                    'unique_group_id': unique_group_id,
                    'member_count': member_count,
                    'members_id': members_array,
                    'members_details': members_info_array
                })
                schedules_list.append(schedule_dict)

            return jsonify({'schedules': schedules_list,
                            'current_page': schedules.page,
                            'total_pages': schedules.pages,
                            'total_groups': schedules.total}), 200
        except Exception as e:
            print(f"Error retrieving schedules: {str(e)}")
            return jsonify({'error': 'Failed to retrieve schedules'}), 500

    return jsonify({'error': 'Invalid Request Method'}), 405


@api_blueprint.route('/dashboard/pld-group/add', methods=['POST', 'PUT'])
@cross_origin()
@token_required
def add_member():
    """Adds someone to a pld group based on the unique id of group"""
    from backend.models import PLDGroups
    db = current_app.db

    if request.method == 'POST' or request.method == 'PUT':
        # Retrieve the PLD group
        data = request.get_json()
        pld_group_id = data.get('pld_group_id')
        current_user_id = data.get('current_user_id')

        group = PLDGroups.query.get(pld_group_id)
        if not group:
            return jsonify({'error': 'PLD group not found'}), 404

        # Call the add_member function from the PLDGroups model
        result = group.add_member(pld_group_id, current_user_id)
        if 'error' in result:
            return jsonify(result), 400

        return jsonify({
            'message': 'Member added successfully',
            'added_member': result
            }), 200

    else:
        return jsonify({'error': 'Invalid Request Method'}), 405


@api_blueprint.route('/dashboard/pld-group/delete', methods=['DELETE'])
@cross_origin()
@token_required
def delete_member():
    """Delete ones self on the group"""
    from backend.models import PLDGroups
    db = current_app.db

    if request.method == 'DELETE':
        data = request.get_json()
        pld_group_id = data.get('pld_group_id')
        current_user_id = data.get('current_user_id')
        group = PLDGroups.query.get(pld_group_id)
        if not group:
            return jsonify({'error': 'PLD group not found'}), 404

        result = group.delete_member(pld_group_id, current_user_id)
        if 'error' in result:
            return jsonify(result), 400

        return jsonify({
            'message': 'Member deleted successfully',
            'deleted_member': result
            }), 200

    else:
        return jsonify({'error': 'Invalid Request Method'}), 405


@api_blueprint.route('/dashboard/pld-group/<string:unique_group_id>', methods=['GET'])
@cross_origin()
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
@cross_origin()
@token_required
def add_socials():
    """Add or update socials for the current user."""
    from backend.models import Socials
    db = current_app.db

    if request.method == 'POST':
        data = request.get_json()

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
@cross_origin()
@token_required
def update_user():
    """Update User information."""
    from backend.models import User
    db = current_app.db

    if request.method == 'PUT':
        data = request.get_json()
        print(f"Request from frontend {data}")

        username = data.get('username')
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        cohort = data.get('cohort')
        email = data.get('email')
        current_user_id = data.get('current_user_id')

        try:
            print("This")
            user = User.query.get(current_user_id)
            print("That")

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


@api_blueprint.route('/dashboard/profile/user', methods=['GET'])
@cross_origin()
@token_required
def get_user():
    """Get information of the current user."""
    from backend.models import User
    db = current_app.db

    if request.method == 'GET':
        try:
            data = request.get_json()
            current_user_id = data.get('current_user_id')
            user = User.query.get(current_user_id)

            if not user:
                return jsonify({'error': 'User not found'}), 404

            user_dict = user.to_dict()
            return jsonify({'user': user_dict}), 200
        except Exception as e:
            print(f"Error retrieving user: {str(e)}")
            return jsonify({'error': 'Failed to retrieve user'}), 500
    else:
        return jsonify({'error': 'Invalid Request Method'}), 405


# PROFILES
@api_blueprint.route('/dashboard/profile/socials', methods=['GET'])
@cross_origin()
@token_required
def get_socials():
    """Get Socials of the current user."""
    from backend.models import Socials
    db = current_app.db

    if request.method == 'GET':
        try:
            data = request.get_json()
            current_user_id = data.get('current_user_id')
            socials = Socials.query.filter_by(user_id=current_user_id).first()

            if not socials:
                return jsonify({'error': 'Socials not found'}), 404

            socials_dict = socials.to_dict()
            return jsonify({'socials': socials_dict}), 200
        except Exception as e:
            print(f"Error retrieving socials: {str(e)}")
            return jsonify({'error': 'Failed to retrieve socials'}), 500
    else:
        return jsonify({'error': 'Invalid Request Method'}), 405




# PROFILE IMAGE
@api_blueprint.route('/dashboard/profile/img/upload', methods=['POST'])
@cross_origin()
@token_required
def upload_profile_picture():
    """Get User"""
    from backend.models import User

    db = current_app.db
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['image']
    user_id = request.form.get('user_id')

    user = User.query.get(user_id)

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)

    uploads_dir = current_app.config['UPLOAD_FOLDER']
    if not os.path.exists(uploads_dir):
        os.makedirs(uploads_dir)

    file_path = os.path.join(uploads_dir, filename)
    file.save(file_path)

    user.user_image = filename
    db.session.commit()

    user_dict = user.to_dict()
    return jsonify({'message': 'Profile picture uploaded successfully', 'user': user_dict}), 200


@api_blueprint.route('/dashboard/profile/img/<path:filename>')
@cross_origin()
@token_required
def get_profile_picture(filename):
    return send_from_directory('uploads', filename)
