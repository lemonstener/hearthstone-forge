from flask import Flask
import requests
from models import db, connect_db, db, Card, User, Deck, Favorite, Comment, DeckCard

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///forge_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'cards'

connect_db(app)





