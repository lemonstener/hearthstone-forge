from functools import reduce
from flask.globals import session
from flask import Flask, jsonify, request, redirect, render_template
from variables import formats, classes
from models import db, connect_db, db, Card, User, Deck, Favorite, Comment, DeckCard, Article, bcrypt

curr_user = 'curr_user'
app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///forge_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'cards'

connect_db(app)


@app.route('/')
def home_page():
    return render_template('index.html')

# ------------------------------------------------------
# Login and Register routes.
# ------------------------------------------------------

def login_auth(username,password):
    '''Retrieve login request, make sure password and username match.
    Store user in session.'''

    user = User.query.filter_by(username=username).first()

    if user:
        is_auth = bcrypt.check_password_hash(user.password, password)
        if is_auth:
            session[curr_user] = user.serialize()
            return jsonify(user=user.serialize())

    return False

def register(username,password,email):
    '''Register user, hash password and store in database.
    Store user in session.'''

    hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')
    user = User.query.filter_by(username=username).first()
    if user:
        error = 'Username is already taken.'
        return jsonify(error=error)
    user = User.query.filter_by(email=email).first()
    if user:
        error = 'Email is already registered to a different user.'
        return jsonify(error=error)
    

    new_user = User(
            username = username,
            password = hashed_pwd,
            email = email,
            is_admin = False
        )
    db.session.add(new_user)
    db.session.commit()
    session[curr_user] = new_user.serialize()
    return jsonify(user=new_user.serialize())


@app.route('/login', methods=['GET','POST'])
def login_user():
    username = request.json['username']
    password = request.json['password']
    user = login_auth(username,password)
    if user:
        return user
    msg = 'Username and password do not match.'
    return jsonify(error=msg)

@app.route('/register',methods=['POST'])
def register_user():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    response = register(username,password,email)
    return response

@app.route('/logout')
def logout():
    if curr_user in session:
        del session[curr_user]
    return 'Logout successfull'


# ------------------------------------------------------
# Card routes
# ------------------------------------------------------

# Getting all viable cards for creating a deck.

@app.route('/api/cards/<format>/<player_class>')
def get_cards(format,player_class):
    '''
    Fetch all cards from that format by card set.
    Filter them by the player class specified and add netural cards from those sets.
    Return cards.
    '''

    class_code = classes[player_class.title()]['code']
    class_specific_cards = []
    neutral_cards = []

    c_cards = Card.query.filter(Card.player_class.like(f'%{class_code}%')).order_by(Card.cost).all()
    n_cards = Card.query.filter_by(player_class='neu').order_by(Card.cost).all()

    for c in c_cards:
        if c.card_set in formats[format]['sets']:
            class_specific_cards.append(c.serialize())
    for c in n_cards:
        if c.card_set in formats[format]['sets']:
            neutral_cards.append(c.serialize())
    return jsonify(c=class_specific_cards,n=neutral_cards)

# Getting all cards of a card set.

@app.route('/api/cards/<set>')
def get_set(set):
    '''Get all cards from a set.'''
    cards = [card.serialize() for card in Card.query.filter_by(card_set=set).all()]
    return jsonify(cards)

# Getting all cards by artist

@app.route('/api/cards/<artist_name>')
def get_cards_by_artist(artist_name):
    '''Get all cards created by the artist specified.'''
    cards = [card.serialize() for card in Card.query.filter_by(artist=artist_name).all()]
    return jsonify(cards)


# ------------------------------------------------------
# Deck routes
# ------------------------------------------------------

# Route for getting all decks from the database.

@app.route('/api/decks')
def get_all_decks():
    all_decks =  [deck.serialize() for deck in Deck.query.all()]
    return jsonify(all_decks=all_decks)

# Route for creating a new deck in the database.

@app.route('/api/decks',methods=['POST'])
def create_deck():
    user = User.query.get_or_404(session[curr_user]['id'])
    data = request.json
    
    deck = user.create_deck(
        title = data['title'],
        player_class = data['playerClass'],
        cards = data['cards'],
        format = formats[data['format']]['code'])
    return jsonify(deck.serialize())

# Routes for a single deck. 

@app.route('/api/decks/<int:id>', methods=['GET','PATCH','DELETE'])
def handle_deck(id):
    user = User.query.get_or_404(session[curr_user]['id'])

    if request.method == 'GET':
        '''Get information for a specific deck.'''
        deck = Deck.query.get(id)
        return jsonify(deck=deck.serialize())

    else:
        if request.method == 'PATCH':
            '''Update deck if the user is session owns it.'''
            data = request.json

            deck = user.update_deck(
            deck_id = id,
            title = data['title'],
            cards = data['cards']
        )
            return jsonify(deck.serialize())

        if request.method == 'DELETE':
            '''Delete deck if the user in session owns it.'''
            deck_id = id
            msg = user.delete_deck(deck_id)
            return msg

# Guide route.

@app.route('/api/decks/<int:id>/guide',methods=['PATCH'])
def handle_guide(id):
    if request.method == 'PATCH':
        '''Create or update a guide for a deck created by the user in session.'''
        user = User.query.get_or_404(session[curr_user]['id'])
        data = request.json

        deck = user.update_deck_guide(data['guide'],id)
        return deck.serialize()


# ------------------------------------------------------
# Favorite routes
# ------------------------------------------------------

@app.route('/api/decks/<int:id>/favorite',methods=['POST'])
def fav_unfav_deck(id):
    '''User can favorite or unfavorite a deck.'''
    user = User.query.get_or_404(session[curr_user]['id'])
    user.fav_unfav_deck(id)


# ------------------------------------------------------
# Comment routes
# ------------------------------------------------------

@app.route('/api/comments',methods=['POST'])
def create_comment():
    '''Create a comment about a deck.'''
    user = User.query.get_or_404(session[curr_user]['id'])
    data = request.json
    deck_id = data['deckId']
    text = data['text']

    return user.post_comment(deck_id,text)

@app.route('/api/comments/<int:id>',methods=['PATCH','DELETE'])
def handle_comment(id):
    user = User.query.get_or_404(session[curr_user]['id'])

    if request.method == 'PATCH':
        '''Update comment.'''
        data = request.json

        if 'text' in data:
            user.update_comment(id,data['text'])
        elif 'isFlagged' in data:
            user.flag_comment(id)
    elif request.method == 'DELETE':
        '''Users in session can delete a comment if they have the privilige.'''
        user.delete_comment(id)


# ------------------------------------------------------
# Article routes
# ------------------------------------------------------

@app.route('/api/articles',methods=['GET','POST'])
def get_articles():
    if request.method == 'GET':
        '''Get all news articles from the database.'''
        all_articles = [a.serialize() for a in Article.query.all()]
        return jsonify(articles=all_articles)
    elif request.method == 'POST':
        user = User.query.get_or_404(session[curr_user]['id'])
        data = request.json

        user.post_article(
            title = data['title'],
            text = data['text']
        )

@app.route('/api/articles/<int:id>',methods=['PATCH','DELETE'])
def handle_article(id):
    user = User.query.get_or_404(session[curr_user]['id'])
    if request.method == 'PATCH':
        '''Update article.'''
        data = request.json
        user.update_article(id,data['title'],data['text'])
    elif request.method == 'DELETE':
        '''Delete article.'''
        user.delete_article(id)


# ------------------------------------------------------
# User routes
# ------------------------------------------------------

@app.route('/api/users/<int:id>', methods=['GET','PATCH','DELETE'])
def get_user(id):
    user = User.query.get_or_404(id)
    if request.method == 'GET':
        '''Display user info, show own decks and favorites.'''
        user_info = user.serialize()
        own_decks = [{deck.id:deck.title} for deck in user.decks]
        if curr_user in session:
            '''If user in session is fetching information about his own accout.'''
            if user.id == session[curr_user]['id']:
                fav_decks = [{f.deck.id:f.deck.title} for f in user.favorites]
                return jsonify(user_info=user_info,own_decks=own_decks,fav_decks=fav_decks)
            else:
                return jsonify(user_info=user_info,own_decks=own_decks)
    elif request.method == 'PATCH':
        data = request.json
        if 'bio' in data:
            '''Update user bio.'''
            user.bio = data['bio']
            db.session.commit()
        elif 'promote' in data:
            '''Promote user to moderator if user in session is an admin.'''
            admin = User.query.get_or_404(session[curr_user]['id'])
            if admin.is_admin:
               admin.promote_user(id)  
    elif request.method == 'DELETE':
        sess_user = User.query.get_or_404(session[curr_user]['id'])
        sess_user.delete_user(id)



    

        


    
    
    




