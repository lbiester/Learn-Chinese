# models.py

from app import db
from flask_user import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False, server_default='')
    reset_password_token = db.Column(db.String(100), nullable=False, server_default='')

    email = db.Column(db.String(120), nullable=False, unique=True)
    confirmed_at = db.Column(db.DateTime())

    is_enabled = db.Column(db.Boolean(), nullable=False, server_default='0')
    first_name = db.Column(db.String(100), nullable=False, server_default='')
    last_name = db.Column(db.String(100), nullable=False, server_default='')

    def is_active(self):
        return self.is_enabled
    
    def __repr__(self):
        return '<User %r>' % (self.nickname)

class Word(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    traditional = db.Column(db.String(256))
    simplified = db.Column(db.String(256))
    pinyin = db.Column(db.String(256))
    english = db.Column(db.String(200))

class Set(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class WordSet(db.Model):
    word_id = db.Column(db.Integer, db.ForeignKey('word.id'), primary_key=True)
    set_id = db.Column(db.Integer, db.ForeignKey('set.id'), primary_key=True)
