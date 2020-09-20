import os
from tempfile import mkdtemp
class Config(object):

    # Main config
    SECRET_KEY = 'SOME_SECRET_KEY'
    SECURITY_PASSWORD_SALT = 'SOME_SALT'
    TEMPLATES_AUTO_RELOAD = True
    SEND_FILE_MAX_AGE_DEFAULT = 0
    DEBUG = False
    SESSION_FILE_DIR = mkdtemp()
    SESSION_PERMANENT = False
    SESSION_TYPE = "filesystem"
    PERMANENT_SESSION_LIFETIME = 600

    # Set cookies options
    SESSION_COOKIE_SECURE = False # Set to True for production server
    REMEMBER_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'

    # File upload config
    UPLOAD_FOLDER = 'static/uploads'

    # Set geo_ip API key
    ALLOWED_EXTENSIONS = {'jpg', 'pdf', 'png', 'jpeg', 'gif', 'bmp'}


