from flask import (
    render_template,
    request,
    redirect,
    url_for,
    Blueprint,
    jsonify,
)

from routes import *
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

from models.board import Board
from models.topic import Topic

from . import current_user  # 使用相对导入

# import redis


main = Blueprint('topic', __name__)
# cache = redis.StrictRedis()


@main.route("/all")
def index():
    board_id = int(request.args.get('board_id', -1))
    print("board_id", board_id)
    # u = current_user()
    # if u is None:
    #     return redirect(url_for('index.index'))
    if board_id == -1:
        ms = Topic.all()
    else:
        ms = Topic.all(board_id=board_id)
    ms = sorted(ms, key=lambda m: m.created_time, reverse=True)
    ms_dict = [m.to_dict() for m in ms]  # 对每个Topic对象进行to_dict转换

    return jsonify({'msg': '话题列表获取成功', "code": 200, "data": ms_dict})
    # token = new_csrf_token()
    # bs = Board.all()
    # return jsonify({'msg': '成功', "code": 200, "data": bs.to_dict()})


# @main.route('/<int:id>')
# def detail(id):
#     m = Topic.get(id)
#     u = current_user()
#     return render_template("topic/detail.html", topic=m, u=u)

@main.route('/detail')
def detail():
    id = request.args.get('topic_id', -1)
    print("id", id)
    m = Topic.get(id)
    return jsonify({'msg': '话题获取成功', "code": 200, "data": m.to_dict()})


@main.route("/add", methods=["POST"])
# @csrf_required
def add():
    form = request.get_json()
    print("form", form)
    # print("request.headers", request.headers)
    #   # 从请求头中获取 token 字段
    # token = request.headers.get('Authorization')
    # print("token", token)
    # # form = request.form.to_dict()
    # u = current_user(token.split(' ')[1])
    u = current_user()
    print("u", u)
    m = Topic.new(form, user_id=u.id)
    return jsonify({'msg': '话题获取成功', "code": 200, "data": m.to_dict()})

    # return redirect(url_for('.detail', id=m.id))


@main.route("/new")
def new():
    # if cache.exists('token'):
    #     token = cache.get('token')
    # else:
    #     token = new_csrf_token()
    #     cache['token'] = token
    board_id = int(request.args.get('board_id', '-1'))
    bs = Board.all()
    token = new_csrf_token()
    return render_template("topic/new.html", token=token, bs=bs, bid=board_id)

