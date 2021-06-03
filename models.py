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
    player_class = db.Column(db.String(40),nullable=False)
    type = db.Column(db.String(4),nullable=False)
    rarity = db.Column(db.String(4),nullable=False)
    card_set = db.Column(db.String(4),nullable=False)
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


    def serialize_card(self):
        return {
            'name': self.name,
            'player_class': self.player_class,
            'type': self.type,
            'rarity': self.rarity,
            'card_set': self.card_set,
            'minion_type': self.minion_type,
            'cost': self.cost,
            'attack': self.attack,
            'health': self.health,
            'armor': self.armor,
            'durability': self.durability,
            'school': self.school,
            'text': self.text,
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
    bio = db.Column(db.String)
    is_admin = db.Column(db.Boolean,default=False)
    is_mod = db.Column(db.Boolean,default=False)

    decks = db.relationship('Deck',backref='user',cascade='all,delete')
    comments = db.relationship('Comment',backref='user',cascade='all,delete')
    favorites = db.relationship('Favorite',backref='user',cascade='all,delete')


    def update_user(self,user_id,bio):
        '''Users can update their avatar and bio.
        Admins can promote users to moderators.'''

        if self.id == user_id:
            self.bio = bio
            db.session.commit()
        elif self.is_admin:
            self.promote_user(user_id)
        else:
            return
    
    def delete_user(self,user_id):
        '''Users can delete their accounts.
        Mods cannot delete other users.
        Admins can delete anybody's account.'''

        u = User.query.get(user_id)

        if self.is_admin or self.id == user_id:
            db.session.delete(u)
            db.session.commit()
        return


    def create_deck(self,title,guide,player_class,cards,format):
        '''Create new deck, populate with cards. 
        Max 30 cards per deck allowed.
        A card can only appear twice in a deck.
        Cards must be passed in a list.'''
        
        if len(cards) != 30:
            msg = 'Decks must have exactly 30 cards.'
            return msg
        else:
            for card in cards:
                # if card.rarity == 'lgnd' and cards.count(card) > 1:
                #     msg = 'Legendary cards cannot have duplicates in a deck.'
                #     return msg
                if cards.count(card) > 2:
                    msg = 'Only 2 copies of the same card are allowed in a deck.'
                    return msg 

        new_deck = Deck(
            user_id = self.id,
            title = title,
            player_class = player_class,
            format = format
        )

        if len(guide) != 0:
            new_deck.guide = guide

        db.session.add(new_deck)
        db.session.commit()
        
        for card in cards:
            dc = DeckCard(deck_id=new_deck.id,card_id=card)
            db.session.add(dc)
            db.session.commit()

        return new_deck


    def update_deck(self,deck_id,title,guide,cards):
        '''Users can update the title,guide and cards of their decks.'''

        d = Deck.query.get_or_404(deck_id)
        
        if self.id != d.user_id:
            return

        elif len(cards) != 30:
            msg = 'Decks must have exactly 30 cards.'
            return msg

        for card in cards:
            # if card.rarity == 'lgnd' and cards.count(card) > 1:
            #     msg = 'Legendary cards cannot have duplicates in a deck.'
            #     return msg
            if cards.count(card) > 2:
                msg = 'Only 2 copies of the same card are allowed in a deck.'
                return msg
    
        for card in d.cards:
            db.session.delete(card)
            db.session.commit()

        for card in cards:
            dc = DeckCard(deck_id=deck_id,card_id=card)
            db.session.add(dc)
            db.session.commit()

        d.title = title
        d.guide = guide
        db.session.commit()

    
    def delete_deck(self,deck_id):
        '''Users can delete decks they have created.'''

        d = Deck.query.get(deck_id)

        if self.id != d.user_id:
            return 
        db.session.delete(d)
        db.session.commit()


    def fav_unfav_deck(self,deck_id):
        '''Store other users' decks in user's favorites or remove from favorites.'''

        f = Favorite.query.filter_by(user_id=self.id,deck_id=deck_id).first() or False
        if f:
            db.session.delete(f)
            db.session.commit()
        else:
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


    def update_comment(self,comment_id,text,is_flagged):
        '''Users can update the text of their own comments.
        Users can flag other user comments for deletion.
        Mods cannot flag comments to ensure they don't abuse their power.
        Admins can flag comments but they don't need to as they can just delete without a flag.'''

        c = Comment.query.get(comment_id)
        if c.user_id == self.id:
            c.text = text
            db.session.commit()
        else:
            if self.is_mod == True:
                return
            else:
                c.is_flagged = is_flagged
                db.session.commit()


    def delete_comment(self,comment_id):
        '''Users can delete their own comments.
        Mods can delete flagged comments.
        Admins have full power.'''

        c = Comment.query.get(comment_id)

        if c.user_id == self.id:
            db.session.delete(c)
            db.session.commit()
        elif self.is_mod and c.is_flagged == True or self.is_admin:
            db.session.delete(c)
            db.session.commit()
        return

    
    def post_article(self,title,text):
        '''Function to post articles on the page for admin users'''

        if self.is_admin == False:
            return

        article = Article(
            posted_by = self.username,
            title = title,
            text = text
        )

        db.session.add(article)
        db.session.commit()
    
    def update_article(self,article_id,title,text):
        '''Admins can update articles.'''

        if self.is_admin:
            a = Article.query.get(article_id)
            a.title = title
            a.text = text
            db.session.commit()
        return

    def delete_article(self,article_id):
        '''Admins can delete articles.'''

        if self.is_admin:
            a = Article.query.get(article_id)
            db.session.delete(a)
            db.session.commit()
        return


    def promote_user(self,user_id):
        '''Helper function for update_user().
        Admins can promote other users to mods.'''

        if self.is_admin:
            user = User.query.get(user_id)
            user.is_mod = True
            db.session.commit()
            return
        return

    
    @classmethod
    def register_admin(cls,username,password,email):
        '''Create an admin type user.
        Administrators can delete flagged comments,
        post articles, and promote other users to moderators.
        Has more power than a moderator.'''

        hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')

        new_user = User(
            username = username,
            password = hashed_pwd,
            email = email,
            is_mod = True,
            is_admin = True
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user

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
        return new_user

    @classmethod
    def login_auth(cls,username,password):
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
    title = db.Column(db.String(30),nullable=False)
    guide = db.Column(db.Text)
    player_class = db.Column(db.String(3),nullable=False)
    created_at = db.Column(db.DateTime,default=datetime.utcnow())

    cards = db.relationship('DeckCard',backref='deck',cascade='all,delete')
    comments = db.relationship('Comment',backref='deck',cascade='all,delete')
    favorites = db.relationship('Favorite',backref='deck',cascade='all,delete')

    def show_cards(self):
        '''Show all cards from the deck.'''

        cards = []
        for dc in self.cards:
            cards.append(dc.card.serialize_card())
        return cards
    
    def favorite_count(self):
        '''Display how many times this deck has been favorited by other users.'''

        count = len(self.favorites)
        if count != 0:
            return count

    def comment_count(self):
        '''Display number of comments.'''

        return len(self.comments)
    
    def serialize_deck(self):
        '''Display all properties of the deck.'''

        return {
            'title': self.title,
            'player_class': self.player_class,
            'format': self.format,
            'guide': self.guide,
            'cost': 0,
            'created_at': self.created_at,
            'cards': self.show_cards()
        }

class Favorite(db.Model):
    __tablename__ = 'favorites'
    
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
    deck_id = db.Column(db.Integer,db.ForeignKey('decks.id'))


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
    deck_id = db.Column(db.Integer,db.ForeignKey('decks.id'))
    text = db.Column(db.String,nullable=False)
    is_flagged = db.Column(db.Boolean,default=False)


class DeckCard(db.Model):
    '''DeckCard model is used for fetching all the cards from a Deck.'''

    __tablename__ = 'deck_cards'
    
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    card_id = db.Column(db.Integer,db.ForeignKey('cards.id'))
    deck_id = db.Column(db.Integer,db.ForeignKey('decks.id'))

    card = db.relationship('Card')


class Article(db.Model):
    '''Article model. Used for posting news about the website and the game.'''

    __tablename__ = 'news'

    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    posted_by = db.Column(db.String)
    title = db.Column(db.String(20),nullable=False,unique=True)
    text = db.Column(db.Text,nullable=False)






