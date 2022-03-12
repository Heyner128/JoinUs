const { Client } = require('pg');

const express = require('express');
const app = express();
const client = new Client();
(async function() {await client.connect()})();
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', "ejs");
app.use(express.static('views'));


app.get('/', async function(req, res) {
    const q = "SELECT COUNT(*) AS number_of_users FROM users;"
    try {
        const query = await client.query(q);
        res.render("home", {count: query.rows[0].number_of_users});
    } catch {
        res.send('DB query error')
    }
})

app.post('/register',async function(req, res){
    const person = [req.body.email];
    const q = "INSERT INTO users(email) VALUES($1)";
    try{
        await client.query(q, person);
        res.render("register");
    } catch (e){
        res.send(e);
    }
    
    
    

})


app.listen(PORT, function () {
    console.log("listening");
})



