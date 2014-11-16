# This Python file uses the following encoding: utf-8

from app import app, models, db
from models import *
from flask import render_template, request, redirect, jsonify, g
from flask.ext.login import current_user
from flask_user import login_required

@app.before_request
def before_request():
    g.user = current_user

@app.route('/')
@app.route('/index')
def index():
    sets_to_return = [];
    sets = Set.query.order_by(Set.id).limit(3).all()
    return render_template('index.html', title='Home', sets=sets, user=g.user)

@app.route('/addset', methods=['GET', 'POST'])
def addset():
    if request.method == 'POST':
        if g.user.is_authenticated():
            user_id = g.user.id
        else:
            user_id = None
        list = request.form.getlist('input-word')
        set = models.Set(request.form['set-name'], user_id)
        for input in list:
            if input != "":
                word = models.Word.query.filter_by(simplified=input).first()
                if word:
                    set.words.append(word)
        db.session.add(set)
        db.session.commit()
        return redirect('/')
    return render_template('addset.html')

@app.route('/user/')
@login_required
def user():
    if request.method == 'DELETE':
        return jsonify({})
    else:
        user = g.user
        return render_template('user.html', user=user)

@app.route('/deleteset/<id>', methods=['POST'])
def deleteset(id):
    db.session.delete(Set.query.filter_by(id=id).first())
    db.session.commit()
    return jsonify({'id': id})

@app.route('/words/<word>')
def getWord(word):
    query_result = Word.query.filter_by(simplified=word).first()
    return_data = {'traditional': query_result.traditional, 'pinyin': query_result.pinyin, 'english': query_result.english}
    return jsonify(return_data)

@app.route('/set/<id>')
def set(id):
    set = Set.query.filter_by(id=id).first()
    return render_template('set.html', name=set.name, set=set.words)

@app.route('/cards/<id>')
def cards(id):
    set = Set.query.filter_by(id=id).first()
    return render_template('cards.html', name=set.name, set=set.words)
