# models.py

from app import db

class Word(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    traditional = db.Column(db.String(256))
    simplified = db.Column(db.String(256))
    pinyin = db.Column(db.String(256))
    english = db.Column(db.String(200))

class Set(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40))
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))


class WordSet(db.Model):
    word_id = db.Column(db.Integer, db.ForeignKey('Word.id'), primary_key=True)
    set_id = db.Column(db.Integer, db.ForeignKey('Set.id'), primary_key=True)
