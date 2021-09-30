## set up
- install nodejs on your computer from  ``https://nodejs.org/en/download/`` 

## How to run it?

1) Install dependencies using ``npm install``   
2) then run ``npm start`` to start the project
3) To create cart use ``post`` method to http://localhost:3000/createcart
4) To get user cart use ``get`` method to http://localhost:3000/getcart/:userId
5) To get all users carts use ``get`` method to http://localhost:3000/getallcarts
6) To update a cart use ``put`` method to http://localhost:3000/cartupdate/:cartId
7) To delete a cart use ``delete`` method to http://localhost:3000/cartdelete/:cartId
8) Make sure you have ``userId`` within your body request, when making a request (userId can be any number)


## create cart response
<img src="https://github.com/alexmarufu/nodejs-api/blob/master/postman-tests/postman-respones-images/post-respose.png?raw=true">


## get user cart response
<img src="https://github.com/alexmarufu/nodejs-api/blob/master/postman-tests/postman-respones-images/get-cart-response.png?raw=true">


## get all carts response
<img src="https://github.com/alexmarufu/nodejs-api/blob/master/postman-tests/postman-respones-images/get-all-cart-response.png?raw=true">


## update cart response
<img src="https://github.com/alexmarufu/nodejs-api/blob/master/postman-tests/postman-respones-images/put-response.png?raw=true">


## delete cart response
<img src="https://github.com/alexmarufu/nodejs-api/blob/master/postman-tests/postman-respones-images/delete-response.png?raw=true">
