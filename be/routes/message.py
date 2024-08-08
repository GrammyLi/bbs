import flask_mail
from flask import (
    render_template,
    request,
    redirect,
    url_for,
    Blueprint,
)

from routes import *

from models.message import Messages
from config import admin_mail

main = Blueprint('mail', __name__)

  