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
        flash('注册失败，用户名已注册或者用户名小于三位')
        return redirect(url_for('.index'))
    flash('注册成功')
    return redirect(url_for('.index'))


@main.route("/login", methods=['POST'])
def login():
    # form = request.form
    form = request.get_json()
    print("form", form)
    u = User.validate_login(form)
    print('login user <{}>'.format(u))
    if u is None:
        # 转到 topic.index 页面
        # flash('用户名或密码错误')
        return jsonify({'msg': '登录失败', "code": 201, })
        # return redirect(url_for('.index'))
    else:
        # session 中写入 user_id
        session['user_id'] = u.id
        # 设置 cookie 有效期为 永久
        session.permanent = True  # 设置 session 为永久
        token = create_access_token(identity=u.id)
        signature = token[:50];
        User.update(u.id,  signature=signature)
        # signature
        return jsonify({'msg': '登录成功', "code": 200, "data": u.to_dict(),  "token": str(token)})
        # response = make_response(jsonify({'msg': '登录成功', "code": 200, "data": u.to_dict(),  "token": str(token)}))
        # response.set_cookie('user_id', str(u.id), max_age=60*60*24*30)  # 设置 Cookie 有效期为 30 天
        # # u = current_user()
        # print("u", u)


@main.route("/protected", methods=['GET'])
@jwt_required()
def protected():
    user_id = get_jwt_identity()
    print("user_id", user_id)
    return jsonify({'msg': '已登录', 'user_id': user_id})

@main.route('/profile')
def profile():
    u = current_user()
    if u is None:
        return redirect(url_for('.index'))
    else:
        return render_template('profile.html', user=u)

