from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime
from variables import classes, rarity, card_types, minion_types, factions, schools_of_magic, sets

bcrypt = Bcrypt()

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

def_avatar = 'https://lh3.googleusercontent.com/proxy/BXdN5OxhDCocVMaxbBjBYSAd8Xy1CF-oD6UtA7y-XVcstzqmOZuDQwXPcCsyIHIlHbvEEV1fAWSPJaFPIHkM6wyUJ8J0Rxej4RwEb5YZ0ep_L_KF10YXRauj8CZIib45F6cc'

class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    name = db.Column(db.String,nullable=False)
    player_class = db.Column(db.String(3),nullable=False)
    type = db.Column(db.String(4),nullable=False)
    rarity = db.Column(db.String(4),nullable=False)
    set = db.Column(db.String(4),nullable=False)
    faction = db.Column(db.String(4))
    minion_type = db.Column(db.String(4))
    cost = db.Column(db.Integer)
    attack = db.Column(db.Integer)
    health = db.Column(db.Integer)
    armor = db.Column(db.Integer)
    durability = db.Column(db.Integer)
    school = db.Column(db.String(4))
    text = db.Column(db.String)
    flavor = db.Column(db.Text)
    artist = db.Column(db.String(100))
    img = db.Column(db.String)
    mechanics = db.Column(db.String(100))
    how_to_get = db.Column(db.String)

    def serialize(self):
        return {
            'name': self.name,
            'player_class': self.player_class,
            'type': self.type,
            'rarity': self.rarity,
            'set': self.set,
            'minion_type': self.minion_type,
            'school': self.school,
            'flavor': self.flavor,
            'artist': self.artist,
            'img': self.img,
            'mechanics': self.mechanics,
            'how_to_get': self.how_to_get
        }

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    username = db.Column(db.String(20),nullable=False,unique=True)
    password = db.Column(db.String(72),nullable=False)
    email = db.Column(db.String(30),nullable=False,unique=True)
    pref_classes = db.Column(db.String(39))
    pref_format = db.Column(db.String(14))
    avatar = db.Column(db.String,default=def_avatar)
    is_admin = db.Column(db.Boolean,default=False)

    def add_to_favorites(self,deck_id):
        '''Store other users' decks in user's favorites.'''
        new_fav = Favorite(
            user_id = self.id,
            deck_id = deck_id
        )

        db.session.add(new_fav)
        db.session.commit()

    def post_comment(self,deck_id,text):
        '''Allow user to leave comments on decks, store in db.'''
        new_comment = Comment(
            user_id = self.id,
            deck_id = deck_id,
            text = text
        )
        db.session.add(new_comment)
        db.session.commit()
    
    def post_article(self,title,text):
        '''Function to post updates on the page for admin users'''
        if self.is_admin == False:
            return

        article = Article(
            posted_by = self.id,
            title = title,
            text = text
        )

        db.session.add(article)
        db.session.commit()

    
    @classmethod
    def register_admin(cls,username,password,email):
        '''Create an admin type user.'''
        hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')

        new_user = User(
            username = username,
            password = hashed_pwd,
            email = email,
            is_admin = True
        )
        db.session.add(new_user)
        db.session.commit()

    @classmethod
    def register(cls,username,password,email):
        '''Register user, hash password and store in database.'''
        hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')

        new_user = User(
            username = username,
            password = hashed_pwd,
            email = email,
            is_admin = False
        )
        db.session.add(new_user)
        db.session.commit()

    @classmethod
    def authenticate(cls,username,password):
        '''Retrieve login request, make sure password and username match.'''

        user = cls.query.filter_by(username=username).first()

        if user:
            is_auth = bcrypt.check_password_hash(user.password, password)
            if is_auth:
                return user

        return False

class Deck(db.Model):
    __tablename__ = 'decks'

    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False)
    format = db.Column(db.String(4),nullable=False)
    name = db.Column(db.String(30),nullable=False)
    description = db.Column(db.Text)
    player_class = db.Column(db.String(3),nullable=False)
    created_at = db.Column(db.DateTime,default=datetime.utcnow())

    user = db.relationship('User',backref='decks')
    
    @classmethod
    def create_deck(cls,user_id,name,desc,player_class,cards,format):
        '''Create new deck, populate with cards. 
        Max 30 cards per deck allowed.
        A card can only appear twice in a deck.'''

        new_deck = Deck(
            user_id = user_id,
            name = name,
            player_class = player_class,
            format = format
        )

        if len(desc) != 0:
            new_deck.description = desc

        db.session.add(new_deck)
        db.session.commit()
        
        for card in cards:
            dc = DeckCard(deck_id=new_deck.id,card_id=card)
            db.session.add(dc)
            db.session.commit()

        return new_deck

        

    def show_cards(self):
        '''Show all cards from the deck.'''
        cards = []
        for card in self.cards:
            cards.append(card.card)
        return cards
    
    def favorite_count(self):
        '''Display how many times this deck has been favorited by other users.'''
        count = len(self.favorites)
        if count != 0:
            return count

    def comment_count(self):
        '''Display number of comments.'''
        return len(self.comments)
    
    def display_deck(self):
        '''Display all properties of the deck.'''
        return {
            'name': self.name,
            'player_class': self.player_class,
            'format': self.format,
            'description': self.description,
            'cost': 0,
            'created_at': self.created_at,
            'cards': self.show_cards()
        }

class Favorite(db.Model):
    __tablename__ = 'favorites'
    
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
    deck_id = db.Column(db.Integer,db.ForeignKey('decks.id'))

    user = db.relationship('User',backref='favorites')
    deck = db.relationship('Deck',backref='favorites')

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
    deck_id = db.Column(db.Integer,db.ForeignKey('decks.id'))
    text = db.Column(db.String,nullable=False)

    user = db.relationship('User',backref='comments')
    deck = db.relationship('Deck',backref='comments')

class DeckCard(db.Model):
    '''DeckCard model is used for fetching all the cards from a Deck.'''
    __tablename__ = 'deck_cards'
    
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    card_id = db.Column(db.Integer,db.ForeignKey('cards.id'))
    deck_id = db.Column(db.Integer,db.ForeignKey('decks.id'))

    deck = db.relationship('Deck',backref='cards')
    card = db.relationship('Card')

class Article(db.Model):
    '''Update model. Used for posting news about the website and the game.'''
    __tablename__ = 'news'

    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    posted_by = db.Column(db.Integer,db.ForeignKey('users.id'))
    title = db.Column(db.String(20),nullable=False,unique=True)
    text = db.Column(db.Text,nullable=False)

    user = db.relationship('User',backref='articles')




