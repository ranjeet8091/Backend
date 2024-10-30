const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
//Now We can use express instead of bodyParser
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/saveFormData', (req, res) => {
  const { fname, lname, age, email, phone, gender } = req.body;
  const newDetail = { fname, lname, age, email, phone, gender };
  fs.readFile('details.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    const details = JSON.parse(data);
    details.push(newDetail);
    fs.writeFile('details.json', JSON.stringify(details), err => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.redirect('/');
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
