const express = require("express");
const app = express();
const mysql = require("mysql");
const { v4: uuidv4 } = require('uuid');

app.use(express.json());


app.get('/', (req, res)=>{
  res.send('Hello yiya');
});



//creating connection for mysql database

// add your own database connection details 
const db = mysql.createConnection({
  host            : '',
  user            : '',
  password        : '',
  database        : ''
})


//handling connection response
db.connect((error) => {
  if(error) {
    console.log(error);
  } else {
    console.log('Database Connected Successfully!');
   } 
})

//post an order
app.post("/orders", (req, res) => {
 
  const { simId, status } = req.body
  
  const customerId = uuidv4()

   const userAddress = req.body.deliveryAddress;

   const deliveryAddress = JSON.stringify(userAddress)

  db.query(
    `INSERT INTO orders (simId, customerId, status, deliveryAddress) VALUES (?,?,?,?)`,
    [simId, customerId, status, deliveryAddress],
    (err, result) => {
     if (err) {
        res.json({success: false, error: err});
     } else {
       res.status(200).json({
         success: true,
         orderId: uuidv4(),
         status: "Pending"
         });
     }
    }
  );
});


//post a sim-card
app.post("/sim-cards", (req, res) => {
 
  const name = req.body.name
  
  db.query(
    `INSERT INTO sims (name) VALUES (?)`,
    [name],
    (err, result) => {
     if (err) {
        res.json({success: false, error: err});
     } else {
       res.status(200).json({
         success: true,
         result
         });
     }
    }
  );
});


//get all sim-cards
app.get("/sim-cards", (req, res) => {
  db.query("SELECT * FROM sims", (err, result) => {
    if (err) {
       res.json({success: false, error: err});
    } else {
      res.status(200).json({
        success: true,
        data: result
        });
    }
  });
});



//get all orders

app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    
    if (err) {
      res.json({success: false, error: err});
   } else {
     res.status(200).json({
       success: true,
       data: result
       });
   }
  });
});


//update an order

app.put("/order/:id", (req, res) => {
  const status = req.body.status;
  db.query(`UPDATE orders SET status = '${status}' WHERE id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        res.json({success: false, error: err});
     } else {
       res.status(200).json({
         success: true
         });
     }
    }
  );
});




app.delete("/:id", (req, res) => {
  db.query(`SELECT * FROM orders LIMIT ${req.params.id} `, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});


