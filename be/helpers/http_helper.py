from http import HTTPStatus
from flask import jsonify
from helpers.errcode import ErrCode


class HTTPHelper:
    @staticmethod
    def generate_response(code=0, msg='', data=None):
        """
        Generate JSON response with specified code, message, and data.

        Args:
            code (int): Response code. Default is 0 for normal, other values indicate errors.
            msg (str): Response message. Default is an empty string for normal response, error message otherwise.
            data (dict): Response data. Default is None.

        Returns:
            dict: JSON response with code, message, and data.
        """
        response = {
            'code': code,
            'msg': ErrCode.get_error_message(code),
            'data': data if data is not None else {}
        }

        if msg != "":
            response['msg'] += (',' + msg)

        return jsonify(response), HTTPStatus.OK
