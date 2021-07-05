import os
from unittest import TestCase
from sqlalchemy import exc
import requests

from models import db, Card, User, Deck, Article, Comment, Favorite, DeckCard, bcrypt
from variables import classes, card_types, rarity, sets, factions, minion_types, schools_of_magic

os.environ['DATABASE_URL'] = "postgresql:///forge_test"

from app import app

# You'll need to add some cards manually to the database in order for the tests to pass.
# For these tests I added all cards from sets 'Core 2021' and 'Forged in the Barrens'.

DeckCard.__table__.drop(db.session.bind)
Comment.__table__.drop(db.session.bind)
Favorite.__table__.drop(db.session.bind)
Deck.__table__.drop(db.session.bind)
User.__table__.drop(db.session.bind)
Article.__table__.drop(db.session.bind)
db.create_all()

class UserModelTestCase(TestCase):
    """Test User model views."""

    def setUp(self):
        """Create test client, add sample data."""

        u1 = User(username='test1',email='test1',password='test1',is_admin=False)
        u2 = User(username='test2',email='test2',password='test2',is_admin=False)
        db.session.add_all([u1,u2])
        db.session.commit()
        u1.id = 1
        u2.id = 2

        u3 = User.create_admin('test3','test3','test3')

        self.client = app.test_client()

    def tearDown(self):

        db.session.rollback()

    
    def test_user_model(self):
        u1 = User.query.get(1)
        u2 = User.query.get(2)
        u3 = User.query.get(3)

        '''Deck functionality.'''
    
        cards = Card.query.all()
        test_cards = [cards[0].id,cards[0].id,cards[1].id,cards[1].id,cards[2].id,cards[2].id,
        cards[3].id,cards[3].id,cards[4].id,cards[4].id,cards[5].id,cards[5].id,cards[6].id,cards[6].id,
        cards[7].id,cards[7].id,cards[8].id,cards[8].id,cards[9].id,cards[9].id,cards[10].id,cards[10].id,
        cards[11].id,cards[11].id,cards[12].id,cards[12].id,cards[13].id,cards[13].id,
        cards[14].id,cards[14].id]
        
        '''Creating a deck.'''
        d = u1.create_deck('test','mag',test_cards,'stnd')

        self.assertEqual(d.title,'test')
        self.assertEqual(d.user_id,1)

        '''Deck to card relationship.'''
        dc1 = DeckCard.query.get(1)
        dc2 = DeckCard.query.get(3)

        self.assertEqual(dc1.deck_id,1)
        self.assertEqual(dc1.card_id,1)
        self.assertEqual(dc2.deck_id,1)
        self.assertEqual(dc2.card_id,2)

        '''Favoriting a deck.'''
        u2.fav_unfav_deck(d.id)
        f = Favorite.query.get(1)

        self.assertEqual(f.user_id,2)
        self.assertEqual(f.deck_id,1)

        '''Editing a deck.'''
        new_cards = [cards[15].id,cards[15].id,cards[1].id,cards[1].id,cards[2].id,cards[2].id,
        cards[3].id,cards[3].id,cards[4].id,cards[4].id,cards[5].id,cards[5].id,cards[6].id,cards[6].id,
        cards[7].id,cards[7].id,cards[8].id,cards[8].id,cards[9].id,cards[9].id,cards[10].id,cards[10].id,
        cards[11].id,cards[11].id,cards[12].id,cards[12].id,cards[13].id,cards[13].id,
        cards[14].id,cards[14].id]

        u1.update_deck(1,'edited',new_cards)
        
        '''New title and deck to card relationship.
        When editing a deck all cards from the deck get deleted and then repopulated.
        We removed both cards with id of 1 and replaced them with two cards with id of 16.'''
        dc = DeckCard.query.filter_by(deck_id=1).first()

        self.assertEqual(d.title,'edited')
        self.assertEqual(dc.id,31)
        self.assertEqual(dc.card_id,16)

        '''Deleing a deck.'''
        res = u1.delete_deck(1)

        self.assertEqual(res,'Delete successful')

        '''Administrator and Moderator functionality.'''
        self.assertFalse(u1.is_mod)
        self.assertFalse(u1.is_admin)
        self.assertFalse(u2.is_mod)
        self.assertFalse(u2.is_admin)
        self.assertTrue(u3.is_admin)
        self.assertTrue(u3.is_mod)
        
        '''Promoting to mod.'''
        u3.promote_user(u2.id)
        self.assertTrue(u2.is_mod)
        self.assertFalse(u2.is_admin)

        '''Admin deleting another user.'''
        u3.delete_user(u1.id)
        '''User deleting own account.'''
        u2.delete_user(u2.id)

        all_users = User.query.all()

        self.assertNotIn(u1,all_users)
        self.assertNotIn(u2,all_users)