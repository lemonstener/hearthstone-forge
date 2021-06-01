from flask import Flask, jsonify
from variables import formats
from models import db, connect_db, db, Card, User, Deck, Favorite, Comment, DeckCard, Article
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///forge_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'cards'

connect_db(app)

@app.route('/api/cards')
def all_cards():
    cards = [card.serialize_card() for card in Card.query.all()]
    return jsonify(cards=cards)

# @app.route('/api/createdeck/<format>/<player_class>')
# def get_cards(format,player_class):
#     sets_to_filter = formats[format]['sets']
#     sets_to_filter.reverse()
#     cards = sets_to_filter
#     for code in sets_to_filter:
#         class_cards = [card.serialize_card() for card in Card.query.filter_by(card_set=code,player_class=player_class).all()]
#         neutral_cards = [card.serialize_card() for card in Card.query.filter_by(card_set=code,player_class='neu').all()]


    
    
    




