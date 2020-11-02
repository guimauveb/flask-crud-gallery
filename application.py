import os
import json
import datetime

from flask import Flask, flash, jsonify, redirect, url_for, render_template
from flask import request, session, Markup, send_from_directory

from flask_wtf.csrf import generate_csrf

import MySQLdb

from werkzeug import secure_filename
from werkzeug.urls import url_parse

from tempfile import mkdtemp
from config import Config 
from __init__ import application


# Renders all themes previews from the database
@application.route("/", methods=["GET"])
def index():

    themes = []

    db = MySQLdb.connect(host="host",
            port=3306,
            user="user",
            passwd="passwd",
            db="photos",
            autocommit=True,
            use_unicode=True
            )
    cursor = db.cursor()

    query = """SELECT * FROM themes;"""
    cursor.execute(query)
    t = cursor.fetchall()

    query = """SELECT * FROM galleries;"""
    cursor.execute(query)
    g = cursor.fetchall()

    for i in range(len(t)):
        themes.append({})
        themes[i]["id"]         = t[i][0]
        themes[i]["name"]       = t[i][1]
        themes[i]["date"]       = t[i][2]
        themes[i]["descr"]      = t[i][3]
        themes[i]["previmg"]    = t[i][4]
        themes[i]["imgs"]       = [img for img in g if img[0] == themes[i]["id"]]

    return render_template("index.html", themes=themes)


# Uploads image to the db and returns its id 
@application.route("/addPic", methods=["POST"])
def addPic():

    db = MySQLdb.connect(host="host",
            port=3306,
            user="user",
            passwd="passwd",
            db="photos",
            autocommit=True,
            use_unicode=True
            )
    cursor = db.cursor()

    # Check if there's an actual file
    if request.files["pic"].filename != '':
        f = request.files["pic"]
        filename = secure_filename(f.filename)
        path = os.path.join(application.config['UPLOAD_FOLDER'], filename)
        f.save(path)

        # Picture is saved under the default upload_folder (static/uploads/)
        picture = os.path.join('/', application.config['UPLOAD_FOLDER'], filename)

    # Retreive theme id from the form
    theme = request.form.get("theme")
    query = """INSERT INTO galleries 
               (theme_id, img)
                VALUES(%s, %s);
            """
    cursor.execute(query, (theme, picture))

    # Retreive newly added img id
    query = """SELECT img_id FROM galleries WHERE img_id = ( SELECT MAX(img_id) FROM  galleries);"""
    cursor.execute(query)
    img = cursor.fetchone()[0]

    cursor.close()
    db.close()

    # Return img id so we can create a unique new div
    return jsonify(img)


# Delete image from the db 
@application.route("/deletePic", methods=["DELETE"])
def deletePic():

    db = MySQLdb.connect(host="host",
            port=3306,
            user="user",
            passwd="passwd",
            db="photos",
            autocommit=True,
            use_unicode=True
            )
    cursor = db.cursor()

    # We only need to retreive the img unique id and delete the entry from the db 
    img = request.json["img"]

    query = """DELETE FROM galleries 
               WHERE img_id = %s;
            """
    cursor.execute(query, (img,))

    cursor.close()
    db.close()

    # Return deleted img id to confirm deletion and remove img from the dom
    return jsonify(img)

