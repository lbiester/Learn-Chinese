# This Python file uses the following encoding: utf-8

from app import app, db
from models import Set, Word
from flask import render_template, request, jsonify, abort, Response, url_for
from flask.ext.login import current_user
from flask_user import login_required
from random import shuffle
import json

@app.route('/')
@app.route('/index/')
def index():
    sets = Set.query.order_by(Set.id.desc()).limit(3).all()
    return render_template('index.html', title='Home', sets=sets)

@app.route('/addset/', methods=['GET', 'POST'])
def addset():
    if request.method == 'POST':
        if current_user.is_authenticated():
            user_id = current_user.id
        else:
            user_id = None
        list = request.json.get('data')
        title = request.json.get('title')
        if title == "":
            return json.dumps({'success': False, 'error': 'You must include a title'}), 400, {'ContentType': 'application/json'}
        set = Set(title, user_id)
        for input in list:
            if input != None:
                word = Word.query.filter_by(id=input).first()
                if word:
                    set.words.append(word)
        if len(set.words) == 0:
            return json.dumps({'success': False, 'error': 'You cannot leave all fields blank'}), 400, {'ContentType': 'application/json'}
        db.session.add(set)
        db.session.commit()
        return json.dumps({'success': True, 'url': url_for('user')}), 200, {'ContentType': 'application/json'}
    return render_template('addset.html', title="Add Set")

@app.route('/user/')
@login_required
def user():
    if request.method == 'DELETE':
        return jsonify({})
    else:
        title = current_user.username + "'s Sets"
        return render_template('user.html', user=current_user, title=title)

@app.route('/deleteset/<id>', methods=['POST'])
def deleteset(id):
    db.session.delete(Set.query.filter_by(id=id).first())
    db.session.commit()
    return jsonify({'id': id})

@app.route('/words/')
def getWord():
    if request.args:
        # take data type and data, return specified values
        word = request.args.get('data')
        parameter = request.args.get('parameter')
        returnTypes = request.args.get('returnTypes')
        query_result = Word.query.filter(getattr(Word, parameter) == word).first()
        if query_result:
            return_data = {}
            if returnTypes == 'all':
                return_data = {'traditional': query_result.traditional,
                'simplified': query_result.simplified, 'pinyin': query_result.pinyin,
                'english': query_result.english, 'id': query_result.id}
            else:
                # works better than specifying type, which we should already know
                return_data['word'] = getattr(query_result, returnTypes)
            return jsonify(return_data)
        else:
            return jsonify({'error': 'No result'})

    # do not let users visit /words/ url
    abort(404)

@app.route('/wordsMultiple/')
def getWords():
    '''
        Get a list of words matching a character/english def/pinyin
    '''
    if request.args:
        word = request.args.get('data')
        parameter = request.args.get('parameter')
        results = Word.query.filter(getattr(Word, parameter) == word).all()
        return_data = []
        if results:
            for result in results:
                return_data.append({'id': result.id, 'traditional': result.traditional,
                'simplified': result.simplified, 'pinyin': result.pinyin, 'english': result.english})
            return Response(json.dumps(return_data), mimetype='application/json')
        else:
            return jsonify({'error': 'No result'})
    abort(404)

@app.route('/set/<id>')
def set(id):
    set = Set.query.filter_by(id=id).first()
    return render_template('set.html', name=set.name, set=set.words, id=set.id, title=set.name)

@app.route('/cards/<id>')
def cards(id):
    # get get data and shuffle words
    set = Set.query.filter_by(id=id).first()
    shuffle(set.words)
    title = set.name + " Cards"
    return render_template('cards.html', name=set.name, set=set.words, title=title)
