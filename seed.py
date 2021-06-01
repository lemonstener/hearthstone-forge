from models import db, User, Card, Deck, Favorite, Comment, DeckCard, Article
from app import app

DeckCard.__table__.drop(db.session.bind)
Comment.__table__.drop(db.session.bind)
Favorite.__table__.drop(db.session.bind)
Deck.__table__.drop(db.session.bind)
User.__table__.drop(db.session.bind)
Article.__table__.drop(db.session.bind)
db.create_all()

u1 = User.register('111','111','111')
u2 = User.register('222','222','222')
u3 = User.register_admin('333','333','333')

dcards1 = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15]
dcards2 = [11,11,22,22,33,33,44,44,55,55,66,66,77,77,88,88,99,99,100,100,5,5,10,10,15,15,20,20,25,25]
d1 = u1.create_deck('rush','lol','pst',dcards1,'wild')
d2 = u2.create_deck('control','lmao','mag',dcards2,'stnd')
