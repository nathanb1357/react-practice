const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "reactpractice",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM book_reviews";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });    
})

app.post('/api/insert', (req, res) => {
    const name = req.body.br_name;
    const review = req.body.br_review;
    const sqlInsert = "INSERT INTO book_reviews (br_name, br_review) VALUES (?,?)";
    db.query(sqlInsert, [name, review], (err, result) => {
        if (err) console.log(err);
    });
});

app.delete('/api/delete/:br_id', (req, res) => {
    const id = req.params.br_id;
    const sqlDelete = "DELETE FROM book_reviews WHERE br_id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err) console.log(err);
    })
})

app.put('/api/update', (req, res) => {
    const id = req.body.br_id;
    const review = req.body.br_review;
    const sqlUpdate = "UPDATE book_reviews SET br_review = ? WHERE br_id = ?";
    db.query(sqlUpdate, [review, id], (err, result) => {
        console.log(err);
    })
})

app.listen(3001, () => {
    console.log("Running on port 3001");
});