const express = require("express");
const app = express();
const validateUser = require("./validateuser");
const { v4: uuidv4 } = require('uuid');

app.use(express.json());


app.get('/', (req, res)=>{
  res.send(`here's api key : ${uuidv4()},  make you include it in your body for every request you make`);
});



const cart = []


app.post("/createcart", validateUser, (req, res) => {
  const { itemId, price } = req.body;
  const cartId = cart.length + 1
  const quantity = 1;
  const userId = req.user.userId;

  const itemExist = cart.some(item  => item.itemId === itemId)
  const userCartExist = cart.some(item  => item.userId === userId)

  if(itemId === "" && price == "" && cartId === "") {
    res.json({error: "no blank spaces"});

  } else if(itemExist && userCartExist) {
    res.json({error: "cart already added"});
  } else {
    cart.push({userId, cartId, itemId, price, quantity});
    res.json({success: "cart created"});
  }
  console.log(cart)
});


app.get("/getallcarts", validateUser, (req, res) => {
    res.json(cart);
});

app.get("/getcart/:userId", validateUser, (req, res) => {
   const myCart = cart.filter(item => item.userId === parseInt(req.params.userId));

   if(myCart.length <= 0) {
    res.json({message: " cart not found or is empty"});
   } else  {
    res.json(myCart);
   }
   
});


//update an order

app.put("/cartupdate/:cartId", validateUser, (req, res) => {
  const newQuantity = req.body.quantity
  if(newQuantity == "" || newQuantity == null) {
    res.json({error: "no blank spaces"});
  } else {
    const myCart = cart.some(item => item.cartId === parseInt(req.params.cartId))
    if(myCart) {
      const cartExist = cart.find(item => item.cartId === parseInt(req.params.cartId))
      if(newQuantity > 1) {
        cartExist.quantity = newQuantity;
        res.json(cart);        
      } else {
        res.json({error: "quantity cannot be below 0"});
      }
    } else {
      res.json({error: "cart not found"});
    }
  }
});




app.delete("/cartdelete/:cartId", validateUser, (req, res) => {
  const myCart = cart.some(item => item.cartId === parseInt(req.params.cartId));
  if(myCart) {
    const item = cart.find(item => item.cartId === parseInt(req.params.cartId))
    const itemIndex = cart.indexOf(item)
    cart.splice(itemIndex, 1)
    res.json({cart: cart});
  } else {
    res.json({error: "cart not found"});
  }
});



const port = 3000

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
