# config.py

import os
basedir = os.path.abspath(os.path.dirname(__file__))

SECRET_KEY = 'BAD-SECRET-KEY'

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')
CSRF_ENABLED = True

MAIL_USERNAME = os.getenv('MAIL_USERNAME', 'carletonrides@yahoo.com')
MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', 'thisismypassword')
MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER', '"Learn Chinese" <carletonrides@yahoo.com>')
MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.mail.yahoo.com')
MAIL_PORT = int(os.getenv('MAIL_PORT', '465'))
MAIL_USE_SSL = True
MAIL_USE_TLS = False

USER_APP_NAME = "Learn Chinese"
