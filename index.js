const express = require("express");
const app = express();
const validateUser = require("./validateuser");
const mysql = require("mysql")
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());


const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "",
  })
  
  db.connect((error) => {
    if(error) {
      console.log(error);
    } else {
      console.log('Database Connected Successfully!!!');
     }
    
  })


  const createToken = (userId, apikey) => {
    return jwt.sign({userId, apikey}, "challengesecret")
  }
  
  

app.get('/', (req, res)=>{
  res.json({ apiKey: uuidv4(), message: " make sure you include it in your body for every request you make"});
});



app.post("/createcart", validateUser, (req, res) => {
  const { itemId, price } = req.body;
  const cartId = uuidv4();
  const quantity = 1;
  const userId = req.user.userId;
  if(itemId === "" && price == "" && cartId === "") {
    res.json({error: "no blank spaces"});
  } else {
    db.query("SELECT * FROM users", (err, result) => {
      if(err) {
       res.json({error: err});
      } else {
        const user = result.some(item => item.userId === req.user.userId);
        const apikey = result.some(item => item.apikey === req.user.apikey);
       if(user && apikey) {
        const sql = `SELECT * FROM cart`
        db.query(sql, (err, result) => {
         if(err) {
          res.json({error: err});
          } else {
            db.query(
              `INSERT INTO cart (itemId, price, quantity, userId, cartId) VALUES (?,?,?,?,?)`,
              [itemId, price, quantity, userId, cartId], (err, result) => {
              if (err) {
                res.json({error: "cart already exists"});
              } else {        
                res.status(201).json({message: "cart added successfully"});
              } 
            });
           
         }
     });
    }
   }
    });
  }
});



app.get("/getallcarts", validateUser, (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
     if(err) {  
     res.json({error: err});
    } else {
      const user = result.some(item => item.userId === req.user.userId);
      const apikey = result.some(item => item.apikey === req.user.apikey);
      console.log(apikey);
      if(user && apikey) {
      db.query("SELECT * FROM cart", (error, result) => {
        if(error) {
           res.json({error: error});
           console.log(error);
        } else {       
          res.status(202).json({carts: result});
        } 
      })  
     } else {
      res.json({error: "incorrect apiKey and userId"});
     }      
   }
 });
});



app.get("/getcart", validateUser, (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if(err) {
     res.json({error: err});
    } else {
      const user = result.some(item => item.userId === req.user.userId);
      const apikey = result.some(item => item.apikey === req.user.apikey);
     if(user && apikey) {
      db.query("SELECT * FROM cart", (error, result) => {
        if(error) {
           res.json({error: error});
           console.log(error);
        } else {       
          const data = result.filter(item => item.userId === req.user.userId)
          res.status(202).json({cart: data});
        } 
      })  
     } else {
      res.json({error: "incorrect apiKey and userId"});
     }      
   }
 });
});


//update an order

app.put("/cartupdate/:cartId", validateUser, (req, res) => {
  const newQuantity = req.body.quantity
  if(newQuantity == "" || newQuantity == null) {
    res.json({error: "no blank spaces "});  
  } else { 
    if(newQuantity <= 0) {
      res.json({error: "quantity must be more than 0"});
    } else {
      const sql = `SELECT * FROM cart`
      db.query(sql, (err, result) => {
           if(err) {
            res.json({error: err});
           } else {
             const item = result.find(item => item.cartId === req.params.cartId);
             const sql = `SELECT * FROM users`
             db.query(sql, (err, result) => {
              if(err) {
               res.json({error: err});
              } else {
                const user = result.some(item => item.userId === req.user.userId);
                const apikey = result.find(item => item.apiKey === req.user.apiKey);
                if(user && apikey) {
                  if(item) { 
                    const qtySql = `UPDATE cart SET quantity = ${newQuantity} WHERE id = ${item.id}`
                    db.query(qtySql, (error, result) => {
                        if(error){
                            res.json({ error: error });
                        } else {
                            res.json({ message: "item updated successfully" });
                        }
                    })  
                   } else{
                     res.json({error: "item not found"});
                   }
                } else {
                  res.json({error: "invalid userToken"});
                }                 
              }
            });
            
           }
       });
   };
};
});


app.delete("/cartdelete/:cartId", validateUser, (req, res) => { 
  const sql = `DELETE FROM cart WHERE cartId = '${req.params.cartId}'`
  db.query(sql, (error, result) => {
      if(error) {
          res.json({error: error});
          console.log(error);
      } else {       
         res.json({cart: result});
      } 
  })
});



app.post("/signin", (req, res) => {
 const { email, password } = req.body; 
  if (email == "" && password == "") return  res.json({ error: "fill up black spaces"});
  const sql = `SELECT * FROM users`
     db.query(sql, async (err, result) => {
         if(err) {
           res.status(400).json({ error: err })
         } else {
            const user = result.find((item) => item.email === email);
            //const user = result.some((item) => item.email === email);
              console.log(user)
            if(user) {
              const verifiedUserPassword = await bcrypt.compare(password, user.password);           
              if(verifiedUserPassword) {
                const token = createToken(user.userId, user.apikey)
                   const userObj = {   
                    userId: user.userId,
                    name: user.name,
                    email: user.email,
                    apiKey: user.apikey
                  }
                 res.status(201).json({ userToken: token, user: userObj})
                 console.log(user)
              } else {
                  res.json({ error: "wrong email or password"});             
              }               
            } else {
              res.json({ error: "user doesn't exist" })
            }
         } 
    });             
});




app.post("/signup", async (req, res) => {
    const { name, email, apiKey, password } = req.body;
    if (name == "" && email == "" && password == "" && apiKey == "") return res.json({ error: "fill up black spaces"});
    const sql = `SELECT * FROM users`
    db.query(sql, async (err, result) => {
      const user = result.some((item) => item.email === email);
     if (user) {
        res.json({error: "user already exists"});
       } else { 
      const hashed_password = await bcrypt.hash(password, 10) 
      const userId = uuidv4();
      db.query(
          `INSERT INTO users (userId, apiKey, name, email, password) VALUES (?,?,?,?,?)`,
          [userId, apiKey, name, email, hashed_password], (err, result) => {
          if (err) {
             res.json({ error: err });
          } else {        
            const token = createToken(userId, apiKey)        
            res.status(201).json({ userToken: token, user: {userId, apiKey, name, email }});
            console.log(token, user = {userId, apiKey, name, email})
          } 
        });
      }
    });  
  });





const port = 3000

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
