const express = require("express");
const app = express();
const mysql = require("mysql");

app.use(express.json());


app.get('/', (req, res)=>{
  res.send('Hello yiya');
});

const db = mysql.createConnection({
  user: "",
  host: "",
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


app.post("/orders", (req, res) => {
 
  const { simId, customerId, status, deliveryAddress} = req.body
  
  const createdAt = new Date().toISOString();
  db.query(
    `INSERT INTO orders (simId, customerId, status, deliveryAddress, createdAt) VALUES (?,?,?,?,?)`,
    [simId, customerId, status, deliveryAddress, createdAt],
    (err, result) => {
     if (err) {
        res.json({success: false, error: err});
     } else {
       res.status(200).json({
         success: true,
         orderId: "1",
         status: "Pending"
         });
     }
    }
  );
});


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


app.get("/orders?page=:page=:limit", (req, res) => {
  db.query("SELECT * FROM sims", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



app.put("/order/:id", (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  db.query(`UPDATE orders SET status = ${status} WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        res.json({success: false, error: err});
     } else {
       res.status(200).json({
         success: true,
         });
     }
    }
  );
});



/*
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM sims WHERE id = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
*/

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});


