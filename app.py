from flask import Flask, json, jsonify, request
from variables import formats, classes
from models import db, connect_db, db, Card, User, Deck, Favorite, Comment, DeckCard, Article
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///forge_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'cards'

connect_db(app)


# ------------------------------------------------------
# Card model routes
# ------------------------------------------------------

@app.route('/api/forge/<format>/<player_class>')
def get_cards(format,player_class):
    '''
    Fetch all cards from that format by card set.
    Filter them by the player class specified and add netural cards from those sets.
    Return cards.
    '''
    sets_to_get = formats[format]['sets']
    class_code = classes[player_class.title()]['code']
    class_specific_cards = []
    neutral_cards = []
    for set in sets_to_get:
        c_cards = Card.query.filter(Card.player_class.like(f'%{class_code}%'),Card.card_set==set).all()
        n_cards = Card.query.filter_by(player_class='neu',card_set=set).all()

        for c in c_cards:
            class_specific_cards.append(c.serialize_card())
        for c in n_cards:
            neutral_cards.append(c.serialize_card())
    return jsonify(c=class_specific_cards,n=neutral_cards)

# @app.route('/api/forge/<format>/<player_class>/<cards>')
# def create_deck(format,player_class,cards):


# ------------------------------------------------------
# Deck model routes
# ------------------------------------------------------

@app.route('/api/decks')
def get_decks():
    all_decks =  [deck.serialize_deck() for deck in Deck.query.all()]
    return jsonify(all_decks=all_decks)

@app.route('/api/decks/<int:id>')
def handle_deck(id):
     deck = Deck.query.get(id)
     return jsonify(deck=deck.serialize_deck())



    
        


    
    
    




