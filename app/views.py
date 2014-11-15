# views.py

from app import app
from flask import render_template

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', title='Home')

@app.route('/addset')
def addset():
    return render_template('addset.html')
