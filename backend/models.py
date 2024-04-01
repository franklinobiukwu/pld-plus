from backend import db, login_manager
from datetime import datetime
from flask_login import UserMixin, current_user
import secrets



@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    """User Table"""
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(45), unique=True, nullable=False)
    firstname = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    cohort = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    reset_token = db.Column(db.String(60), nullable=True, unique=True)
    socials = db.relationship('Socials', backref='user', lazy=True)
    schedules = db.relationship('Schedule', backref='user', lazy=True)
    pld_groups = db.relationship('PLDGroups', backref='user', lazy=True)

    def __repr__(self):
        return f"User('{self.firstname}', '{self.lastname}', '{self.cohort}')"

    def to_dict(self):
        user_dict = {
            "id": self.id,
            "username": self.username,
            "cohort": self.cohort,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email,
        }
        return user_dict


class Socials(db.Model):
    """Socials Table"""
    id = db.Column(db.Integer, primary_key=True)
    phone_number = db.Column(db.Integer, nullable=True)
    discord = db.Column(db.String(100), nullable=False)
    github = db.Column(db.String(100), nullable=True)
    whatsapp = db.Column(db.String(100), nullable=True)
    twitter = db.Column(db.String(100), nullable=True)
    linkedin = db.Column(db.String(100), nullable=True)
    medium = db.Column(db.String(100), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Socials('{self.discord}')"

    def to_dict(self):
        socials_dict = {
        'id': self.id,
        'phone_number' : self.phone_number,
        'discord' : self.discord,
        'github' : self.github,
        'whatsapp' : self.whatsapp,
        'linkedin' : self.linkedin,
        'medium' : self.medium,
        'user_id' : self.user_id
        }
        return socials_dict


class Schedule(db.Model):
    """Schedule Table"""
    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(100), nullable=False)
    cohort = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    meeting_link = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"Schedule('{self.topic}', '{self.cohort}', '{self.date}')"

    def create_pld_group(self):
        pld_group = PLDGroups(user_id=self.user_id, schedule_id=self.id)
        pld_group.generate_unique_id()
        db.session.add(pld_group)
        db.session.commit()
        db.session.flush()

        group_member = GroupMember(user_id=self.user_id, pld_group_id=pld_group.id, role="Host")
        db.session.add(group_member)
        db.session.commit()

    def to_dict(self):
        """Takes object and makes it a dict"""
        schedule_dict = {
            "id": self.id,
            "topic": self.topic,
            "cohort": self.cohort,
            "date": self.date,
            "user_id": self.user_id,
            "meeting_link": self.meeting_link
        }
        return schedule_dict


class PLDGroups(db.Model):
    """PLD Groups table"""
    id = db.Column(db.Integer, primary_key=True)
    schedule_id = db.Column(db.Integer, db.ForeignKey('schedule.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    members = db.relationship('User', secondary='group_member', backref='pld_groups_association')
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    unique_group_id = db.Column(db.String(6), unique=True, nullable=False)

    def generate_unique_id(self):
        """Generates a unique 6-character alphanumeric ID."""
        while True:
            unique_id = secrets.token_urlsafe(6)
            existing_group = PLDGroups.query.filter_by(unique_group_id=unique_id).first()
            if not existing_group:
                self.unique_group_id = unique_id
                return

    def add_member(self, pld_group_id, user_id):
        """Add a member to the Group Member"""
        from backend.models import GroupMember

        if len(self.members) >= 10:
            return {"error": "PLD Group already has the maximum of 10 members"}

        # Check if user is already a member of the group
        existing_member = GroupMember.query.filter_by(
            user_id=user_id, pld_group_id=pld_group_id
        ).first()

        if existing_member:
            return {"error": "User is already a member of this PLD Group"}

        added_member = GroupMember(
            user_id=user_id, pld_group_id=pld_group_id
        )
        db.session.add(added_member)
        db.session.commit()

        # Return updated group information
        members = GroupMember.query.filter_by(pld_group_id=pld_group_id).all()
        members_data = [member.to_dict() for member in members]

        group_data = self.to_dict()
        group_data['members'] = members_data

        # return group_data
        return added_member.to_dict()

    def delete_member(self, pld_group_id, user_id):
        """Delete a member from the Group Member"""
        from backend.models import GroupMember

        if not self.members:
            return {'error': 'No members in PLD group'}

        existing_member = GroupMember.query.filter_by(
            user_id=user_id, pld_group_id=pld_group_id
        ).first()

        if existing_member:
            db.session.delete(existing_member)
            db.session.commit()
            # Update to return message and group dictionary
            return {'message': 'Member deleted successfully', 'deleted_member': existing_member.to_dict()}
        else:
            return {'error': 'Member does not exist in group'}


    def __repr__(self):
        return f"PLDGroups('{self.group_string}')"

    def to_dict(self):
        pld_group_dict = {
            'id': self.id,
            'schedule_id': self.schedule_id,
            'date': self.date,
            'unique_group_id': self.unique_group_id,
            'members': [member.id for member in self.members]
        }
        return pld_group_dict


class GroupMember(db.Model):
    """Association Table for PLDGroups and Users"""
    __tablename__ = 'group_member'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    pld_group_id = db.Column(db.Integer, db.ForeignKey('pld_groups.id'), primary_key=True)
    role = db.Column(db.String(25), nullable=True, default="Member")
    members = db.Column(db.Integer, nullable=False, default=1)

    def to_dict(self):
        group_member_dict = {
            'members': self.members,
            'pld_group_id': self.pld_group_id,
            'role': self.role,
            'user_id': self.user_id
        }
        return group_member_dict
