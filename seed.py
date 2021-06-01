from models import db, User, Card, Deck, Favorite, Comment, DeckCard, Article
from app import app


Article.__table__.drop(db.session.bind)
DeckCard.__table__.drop(db.session.bind)
Comment.__table__.drop(db.session.bind)
Favorite.__table__.drop(db.session.bind)
Deck.__table__.drop(db.session.bind)
User.__table__.drop(db.session.bind)
db.create_all()

u1 = User.register('111','111','111')
u2 = User.register_admin('222','222','222')


