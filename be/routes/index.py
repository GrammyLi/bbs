import os
import uuid
from werkzeug.datastructures import FileStorage

from flask import (
    render_template,
    request,
    redirect,
    session,
    url_for,
    Blueprint,
    abort,
    send_from_directory,
    flash,
    jsonify,
    make_response,
)
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


from routes import *

from models.user import User

from models.topic import Topic

from models.reply import Reply

from utils import log

main = Blueprint('index', __name__)

from . import current_user  # 使用相对导入

def current_user(token):
    u = User.one(signature=token[:50])
    return u

@main.route("/")
def index():
    u = current_user()
    return render_template("index.html", user=u)


@main.route("/register", methods=['POST'])
def register():
    # form = request.args
    form = request.form.to_dict()
    # 用类函数来判断
    u = User.register(form)
    if u is None:
        return jsonify({'msg': '注册失败', "code": 201, "data": "null",  })
    return jsonify({'msg': '注册成功', "code": 200, "data": u.to_dict(),  })


@main.route("/login", methods=['POST'])
def login():
    form = request.get_json()
    # print("form", form)
    u = User.validate_login(form)
    # print('login user <{}>'.format(u))
    if u is None:
        return jsonify({'msg': '登录失败', "code": 201, })
    else:
        session['user_id'] = u.id
        session.permanent = True  # 设置 session 为永久
        token = create_access_token(identity=u.id)
        signature = token[:50];
        User.update(u.id,  signature=signature)
        return jsonify({'msg': '登录成功', "code": 200, "data": u.to_dict(),  "token": str(token)})


@main.route('/profile')
def profile():
    id = request.args.get('user_id', -1)
    u = User.one(id=id)
    if u is None:
        return jsonify({'msg': '', "code": 200, "data": None,  })
    else:
        return jsonify({'msg': '', "code": 200, "data": u.to_dict(),  })

