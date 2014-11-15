# views.py

from app import app
from flask import render_template
from flask_user import login_required

@app.route('/')
@app.route('/index')
@login_required
def index():
    return render_template('index.html', title='Home')

@app.route('/addset')
def addset():
    return render_template('addset.html')
