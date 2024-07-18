import time

from sqlalchemy import Column, Unicode, UnicodeText, String

from models.base_model import SQLMixin, db
from models.user import User


class Messages(SQLMixin, db.Model):
    title = Column(Unicode(50), nullable=False)
    content = Column(UnicodeText, nullable=False)
    sender_username = Column(String(50), nullable=False)
    receiver_username = Column(String(50), nullable=False)

      