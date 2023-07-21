//Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3003;
const comments = require('./comments.json');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());
app.use(cors());

//Get all comments
app.get('/comments', (req, res) => {
  res.status(200).send(comments);
});

//Create a new comment
app.post('/comments', (req, res) => {
  const { body } = req;
  const newComment = {
    ...body,
    id: uuidv4(),
  };
  comments.push(newComment);
  fs.writeFileSync(
    path.join(__dirname, 'comments.json'),
    JSON.stringify(comments)
  );
  res.status(200).send(newComment);
});

//Delete a comment
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  const index = comments.findIndex((comment) => comment.id === id);
  comments.splice(index, 1);
  fs.writeFileSync(
    path.join(__dirname, 'comments.json'),
    JSON.stringify(comments)
  );
  res.status(200).send(comments);
});

//Update a comment
app.patch('/comments/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const index = comments.findIndex((comment) => comment.id === id);
  comments.splice(index, 1, body);
  fs.writeFileSync(
    path.join(__dirname, 'comments.json'),
    JSON.stringify(comments)
  );
  res.status(200).send(comments);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

