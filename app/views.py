# views.py

from app import app
from flask import render_template, request, redirect, jsonify
from flask_user import login_required

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', title='Home')

@app.route('/addset', methods=['GET', 'POST'])
def addset():
    if request.method == 'POST':
        list = request.form.getlist('input-word')
        print list
        return redirect('/')
    return render_template('addset.html')

@app.route('/words/<word>')
def getWord(word):
    print word
    return_data = {'traditional': 'traditional!', 'pinyin': 'pinyin!', 'english': 'english!'}
    return jsonify(return_data)
