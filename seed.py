from models import db, User, Card, Deck, Favorite, Comment, DeckCard, Article
from app import app

# Seed file will not drop the cards table when ran. This is so you 
# don't have to wait a full minute each time you wanted to reset things.


DeckCard.__table__.drop(db.session.bind)
Comment.__table__.drop(db.session.bind)
Favorite.__table__.drop(db.session.bind)
Deck.__table__.drop(db.session.bind)
User.__table__.drop(db.session.bind)
Article.__table__.drop(db.session.bind)
db.create_all()


