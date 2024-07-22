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
# TODO:  话题全部列表缓存
# cache = redis.StrictRedis()

@main.route("/all")
def index():
    board_id = int(request.args.get('board_id', -1))
    if board_id == -1:
        ms = Topic.all()
    else:
        ms = Topic.all(board_id=board_id)
    ms = sorted(ms, key=lambda m: m.created_time, reverse=True)
    ms_dict = [m.to_dict() for m in ms]  # 对每个Topic对象进行to_dict转换

    return jsonify({'msg': '话题列表获取成功', "code": 200, "data": ms_dict})


@main.route('/detail')
def detail():
    id = request.args.get('topic_id', -1)
    m = Topic.get(id)
    return jsonify({'msg': '话题获取成功', "code": 200, "data": m.to_dict()})


@main.route("/add", methods=["POST"])
def add():
    form = request.get_json()
    u = current_user()
    print("u", u)
    m = Topic.new(form, user_id=u.id)
    return jsonify({'msg': '话题获取成功', "code": 200, "data": m.to_dict()})


@main.route("/new")
def new():
    board_id = int(request.args.get('board_id', '-1'))
    bs = Board.all()
    token = new_csrf_token()
    pass

