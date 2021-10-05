## set up
- install nodejs on your computer from  ``https://nodejs.org/en/download/`` 

## How to run it?

1) Install dependencies using ``npm install``
2) Create a mysql database and connection
3) import db.sql on to your phpMyAdmin   
4) then run ``npm start`` to start the project
5) To get apikey use ``get`` method to http://localhost:3000/
6) To signin use ``post`` method to http://localhost:3000/signin
7) To signup use ``post`` method to http://localhost:3000/signup
8) To create cart use ``post`` method to http://localhost:3000/createcart
9) To get user cart use ``get`` method to http://localhost:3000/getcart/:userId
10) To get all users carts use ``get`` method to http://localhost:3000/getallcarts
11) To update a cart use ``put`` method to http://localhost:3000/cartupdate/:cartId
12) To delete a cart use ``delete`` method to http://localhost:3000/cartdelete/:cartId
13) Make sure you have ``userToken`` and ``apikey`` within your body request 
14) Note: You will get your ``userToken`` after signing up or logging in

