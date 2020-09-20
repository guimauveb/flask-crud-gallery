from flask import Flask, session
from flask_session import Session
from config import Config
from flask_wtf.csrf import CSRFProtect

application = Flask(__name__)
application.config.from_object(Config)

sess = Session()
csrf = CSRFProtect(application)

sess.init_app(application)

