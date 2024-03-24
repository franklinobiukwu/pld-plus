from backend import db, login_manager
from datetime import datetime
from flask_login import UserMixin
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
        return f"User('{self.first_name}', '{self.last_name}', '{self.cohort}', '{self.image_file}')"
    
    def to_dict(self):
        """Takes object and makes it a dict"""
        user_dict = {}
        user_dict["id"] = self.id
        user_dict["username"] = self.username
        user_dict["cohort"] = self.cohort
        user_dict["firstname"] = self.firstname
        user_dict["lastname"] = self.lastname
        user_dict["email"] = self.email
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


class Schedule(db.Model):
    """Schedule Table"""
    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(100), nullable=False)
    cohort = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    def __repr__(self):
        return f"Schedule('{self.topic}', '{self.cohort}', '{self.date}')"
    
    def create_pld_group(self):
        pld_group = PLDGroups(user_id=self.user_id, schedule_id=self.id)
        pld_group.generate_unique_id()
        db.session.add(pld_group) 
        db.session.commit()
        db.session.flush()
        
    def to_dict(self):
        """Takes object and makes it a dict"""
        schedule_dict = {}
        schedule_dict["id"] = self.id
        schedule_dict["topic"] = self.topic
        schedule_dict["cohort"] = self.cohort
        schedule_dict["date"] = self.date
        schedule_dict["user_id"] = self.user_id
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

    def __init__(self, **kwargs):
        super(PLDGroups, self).__init__(**kwargs)
        self.generate_unique_id()

    def __repr__(self):
        return f"PLDGroups('{self.group_string}')"



class GroupMember(db.Model):
    """Association Table for PLDGroups and Users"""
    __tablename__ = 'group_member'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    pld_group_id = db.Column(db.Integer, db.ForeignKey('pld_groups.id'), primary_key=True)
    role = db.Column(db.String(25), nullable=True, default="Member")
