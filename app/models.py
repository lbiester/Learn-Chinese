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
<<<<<<< HEAD
    word_id = db.Column(db.Integer, db.ForeignKey('Word.id'), primary_key=True)
    set_id = db.Column(db.Integer, db.ForeignKey('Set.id'), primary_key=True)
=======
    word_id = db.Column(db.Integer, ForeignKey('Word.id'), primary_key=True)
    set_id = db.Column(db.Integer, ForeignKey('Set.id'), primary_key=True)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)

    def __repr__(self):
        return '<User %r>' % (self.nickname)
>>>>>>> d632157487b23eb93ba760d6817a38d9364f2ab9
