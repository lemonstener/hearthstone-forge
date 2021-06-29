from models import db, Card
import requests
from variables import classes, rarity, card_types, minion_types, factions, schools_of_magic, sets
from app import app
# If you haven't done so yet, now is the time to create the database 
# in your terminal:   -----> createdb forge_db

db.drop_all()
db.create_all()

# We are pulling all cards from the API by set. The keys in the 'sets' object
# from 'variables.py' are named after the card sets.
keys = [key for key in sets]

# Add card to database
def add_card(card):
      new_card = Card(name=card['name'])
      new_card.type=card_types[card['type']]['code']
      if card['cardSet'] == 'Naxxramas':
        new_card.card_set = 'nax'
      elif card['cardSet'] == 'Core':
        new_card.card_set = 'c21'
      else:
        new_card.card_set=sets[card['cardSet']]['code']
      if 'multiClassGroup' in card:
        text = ''
        for c in card['classes']:
          text += classes[c]['code'] + ','
        text = text[:-1]
        new_card.player_class = text
      else:
        new_card.player_class=classes[card['playerClass']]['code']
      new_card.img=card['img']
      if 'rarity' in card:
        new_card.rarity = rarity[card['rarity']]['code']
      else:
        new_card.rarity = 'free'
      if 'faction' in card:
        new_card.faction = factions[card['faction']]['code']
      if 'race' in card:
        new_card.minion_type = minion_types[card['race']]['code']
      if 'cost' in card:
        if card['name'] == 'First Day Of School':
          new_card.cost = 1
        elif card['name'] == 'Fiendish Circle':
          new_card.cost = 4
        elif card['name'] == 'Refreshing Spring Water':
          new_card.cost = 4
        elif card['name'] == 'Hysteria':
          new_card.cost = 3
        elif card['name'] == 'Deck of Chaos':
          new_card.cost = 6
        elif card['name'] == 'Vicious Fledgling':
          new_card.cost = 3
        elif card['name'] == 'Call to Arms':
          new_card.cost = 5
        elif card['name'] == 'Shieldmaiden':
          new_card.cost = 6
        else:
         new_card.cost = card['cost']  
      if 'attack' in card:
        new_card.attack = card['attack']
      if 'health' in card:
        new_card.health = card['health']
      if 'durability' in card:
        new_card.health = card['durability']
      if 'armor' in card:
        new_card.armor = card['armor']
      if 'text' in card:
        new_card.text = card['text']
      if 'flavor' in card:
        new_card.flavor = card['flavor']
      if 'artist' in card:
        new_card.artist = card['artist']
      if 'mechanics' in card:
        text=''
        for m in card['mechanics']:
          text += m['name'] + ','
        text = text[:-1]
        new_card.mechanics = text
      if 'spellSchool' in card:
        new_card.school = schools_of_magic[card['spellSchool']]['code']
      if 'howToGet' in card:
        new_card.how_to_get = card['howToGet']
      db.session.add(new_card)
      db.session.commit()

# Get all cards by set.

for key in keys:
  current = key
  if current == 'Curse of Naxxramas':
    current = 'Naxxramas'
  if current == 'Core 2021':
    current = 'Core'
  
  url = f"https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/{current}"

  querystring = {"collectible":"1"}

  headers = {
    'x-rapidapi-key': "8bfdf70366mshf039f2f948a7794p153f88jsn5e942b8afa0b",
    'x-rapidapi-host': "omgvamp-hearthstone-v1.p.rapidapi.com"
    }

  response = requests.request("GET", url, headers=headers, params=querystring)
  json = response.json()
  for card in json:
    add_card(card)