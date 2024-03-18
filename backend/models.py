from backend import db
from datetime import datetime


class User(db.Model):
    """User Table"""
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(45), unique=True, nullable=False)
    firstname = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    cohort = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    session_token = db.Column(db.String(25), nullable=True, unique=True)
    reset_token = db.Column(db.String(60), nullable=True, unique=True)
    socials = db.relationship('Socials', backref='user', lazy=True)
    schedules = db.relationship('Schedule', backref='user', lazy=True)
    pld_groups = db.relationship('PLDGroups', backref='user', lazy=True)

    def __repr__(self):
        return f"User('{self.first_name}', '{self.last_name}', '{self.cohort}', '{self.image_file}')"


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
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    pld_group_id = db.Column(db.Integer, db.ForeignKey('pld_groups.id'), nullable=False)
    
    def __repr__(self):
        return f"Schedule('{self.topic}', '{self.cohort}', '{self.date}')"


class PLDGroups(db.Model):
    """PLD Groups table"""
    id = db.Column(db.Integer, primary_key=True)
    schedule_id = db.Column(db.Integer, db.ForeignKey('schedule.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    members = db.relationship('User', secondary='group_member', backref='pld_groups_association')
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    group_string = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f"PLDGroups('{self.group_string}')"


class GroupMember(db.Model):
    """Association Table for PLDGroups and Users"""
    __tablename__ = 'group_member'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    pld_group_id = db.Column(db.Integer, db.ForeignKey('pld_groups.id'), primary_key=True)
    role = db.Column(db.String(25), nullable=True, default="Member")
