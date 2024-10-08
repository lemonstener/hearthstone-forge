# The Forge

## NOTE
This application is currently hosted on Heroku. Due to Heroku eliminating the Free tier, you will not be able to view it. You can still view all of the code while I'm sorting this issue out.

## Table of Contents
  - [Overview](#overview)
  - [Technologies used](#technologies-used)
  - [How to use](#how-to-use)
  - [The app](#back-end)
    - [Back End](#back-end)
    - [API](#api)
    - [Front End](#front-end)
  - [Credits](#credits)
  

## Overview
Welcome to the Forge!

The Forge on Heroku --> https://hearthstone-forge.herokuapp.com/

The Forge is a simple deck building web application for the game **Hearthstone**.

It is a single page app that allows users to create decks, edit them, favorite decks
made by other users, and browse general information about the cards.

Best when viewed in Chrome and Edge.  
Safari users: Vanilla Tilt might cause a graphical glitch or two.

## Technologies used
 - Back End:
    - Python 3.7.7
    - Flask
    - Flask SQLAlchemy
    - Flask Bcrypt
 - Server Side:
    - Flask Sessions and Axios
 - Front End:
    - CSS and pure JavaScript
    - Vanilla Tilt JS for card tilt animation.



## How to use
1. Clone this repository.
2. Run **pip install -r requirements.txt** in the shell
3. Register for a RAPID API account if you do not already have one.
4. Create a new database titled **forge_db** 
5. Tweek the **populate_card_table.py** file:
    - uncomment everything from line 105 to 108
    - 'x-rapidapi-key': --> your RAPID API key in quotes + a coma at the end.
6. Run **populate_card_table.py**
7. Run the **flask run** command in the shell

### *What populate_card_table.py does*
> It is essentially a seed file that will fetch all the needed data from the Hearthstone API and create all the tables. From now on card data will be requested from our own API. There is a separate seed file called **seed.py** which you can use to specifically test user functionality that does not affect the cards table. This is done so you don't have to wait a full minute each time you want to reset users and try something different.



## Back End

### Database
(Don't mind the typo)
![Schema!](forge-schema.png 'Schema')
The database contains information about cards, users, decks and favorites which are in the current published version of the app. There is added functionality for administrators, moderators, comments and news articles all of which unfortunately I lack the time to add to the final version. It is a lot of work for a single boot camp student to do everything in just a few weeks but hopefully I'll find some time in the future and improve the app if there is interest.  
Flask SQLAlchemy model functionality not currently in use in the Front end:
 - comments - view, post, edit, delete and flag comments
 - news - view, post, edit, delete
 - users - administrators can promote other users to moderators as well as delete them
 - moderators - can delete and unflag flagged comments
  
### Password hashing
Passwords are hashed using Flask Bcrypt for extra security.

## API
The server is only used for interacting with the database and to display a plain home page. Endpoints:
 - /login --> login the user
 - /register --> register user
 - /logout --> log the user out
 - /session --> the app's way of remembering logged in users
 - /api/cards/***format*/*player class*** --> get all class cards based on format
 - /api/cards/***set code*** --> get all cards by card set
 - /api/cards/***artist name*** --> get all cards by artist (currently unused)
 - /api/decks --> get all decks from the database and create new decks
 - /api/decks/***deck id*** --> get, create, update and delete a single deck
 - /api/decks/***deck id***/guide --> create a guide for a deck
 - /api/decks/***deck id***/favorite --> favorite / unfavorite a deck
 - /api/comments --> post a comment about a deck (currently unused)
 - /api/comments/***comment id*** --> update / delete a comment (currently unused)
 - /api/articles --> get and post methods for news articles (currently unused)
 - /api/article/***arcticle id*** --> update / delete an article (currently unused)
 - /api/users/***user id*** --> get / patch / delete user (can only view user as of now)

## Front End
This is a single page application and the way it pulls that off is by working off one specific element reffered throughout as **content**. The element changes appearance based on what the user clicks on. This is achieved through lots of CSS and A LOT of plain JavaScript. I have written about 99% of the code myself. The code I did not write is:
1. Card tilt animation - used Vanilla Tilt for that
    - I originally made my own card tilt animation but it was really slowing performance down.
    - Vanilla Tilt looks much better than what I came up with
2. A shake animation for the logo taken from Animista.
3. A fade out animation taken from https://medium.com/cloud-native-the-gathering/how-to-use-css-to-fade-in-and-fade-out-html-text-and-pictures-f45c11364f08 

Everything else you see is all me.
One thing I was set on from the get go was to NOT use any frameworks in the Front End such as Bootstrap or jQuery in order to show competency with basic fundamentals (the only one in use here is Axios for API interaction). Certain elements such as buttons and forms are a little lacking visually as of right now but this is due to time constraints rather than lack of skill.
Scalability and responsiveness are achieved through liberal use of Flex Box altough it is not optimized for mobile (again, time constraints.)



## Credits
 - Thanks to omgvamp for the card information --> https://hearthstoneapi.com/
 - Thanks to micku7zu and other contributors --> https://micku7zu.github.io/vanilla-tilt.js/
 - Thanks to animista --> https://animista.net/
 - Thanks to https://medium.com/ 

