import uuid
from functools import wraps

from flask import session, request, abort, jsonify

from models.user import User

# import redis
import json


# def current_user():
#     print("session", session, jsonify(session))
#     uid = session.get('user_id')
#     print("ui", uid)
#     if uid is None:
#         return None
#     u = User.one(id=uid)
#     print("u", u)
#     return u
def current_user():
    # print('validate_login', form, query)
    token = request.headers.get('Authorization').split(' ')[1]
    u = User.one(signature=token[:50])
    return u
 
# csrf_tokens = redis.StrictRedis()
csrf_tokens = "1212"


def csrf_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = request.args['token']
        u = current_user()
        # if token in csrf_tokens and csrf_tokens[token] == u.id:
        #     csrf_tokens.pop(token)
        #     return f(*args, **kwargs)
        # if csrf_tokens is (token):
        #     v = csrf_tokens.get(token)
        #     i = json.loads(v)
        #     if i == u.id:
        #         # print('before ceshi', csrf_tokens.exists(token))
        #         csrf_tokens.delete(token)
        #         # print('ceshi', csrf_tokens.exists(token))
        #         return f(*args, **kwargs)
        return f(*args, **kwargs)
        # else:
        #     abort(401)

    return wrapper


def new_csrf_token():
    u = current_user()
    token = str(uuid.uuid4())
    u.id = json.dumps(u.id)
    # csrf_tokens.set(token, u.id)
    return token
