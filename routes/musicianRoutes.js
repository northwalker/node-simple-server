
(function () {
  'use strict';

  const express = require('express');
  const router = express.Router();

  let musicianList = [];
  musicianList.push({ id: 1, composer: 'Beethoven', description: '' });     // For demo, fake data.
  musicianList.push({ id: 2, composer: 'J.S. Bach', description: '' });     // For demo, fake data.
  musicianList.push({ id: 3, composer: 'Mozart', description: '' });        // For demo, fake data.
  musicianList.push({ id: 4, composer: 'Chopin', description: '' });        // For demo, fake data.
  musicianList.push({ id: 5, composer: 'Schubert', description: '' });      // For demo, fake data.
  musicianList.push({ id: 6, composer: 'Wagner', description: '' });        // For demo, fake data.
  musicianList.push({ id: 7, composer: 'Brahms', description: '' });        // For demo, fake data.
  musicianList.push({ id: 8, composer: 'Tchaikovsky', description: '' });   // For demo, fake data.

  router.route('/')
    // URL: /api/todos
    .get((req, res, next) => {
      res.status(200).send(musicianList).end();
    })
    .post((req, res, next) => {
      console.log("POST", req.body);
      if (req.body && req.body.author) {   // simple valify
        let newTodo = {
          id: musicianList.length + 1,
          author: req.body.author,
          content: req.body.content,
          created: new Date()
        };
        musicianList.push(newTodo);
        res.status(201).send(newTodo).end();
      }
      else {
        res.status(500).send({
          'message': 'Add a new todo failed...'
        }).end();
      }
    })

  router.route('/:id')
    // URL: /api/todo/:id
    .get((req, res, next) => {
      const targetId = Number(req.params.id);
      let target = undefined;
      musicianList.forEach(todoItem => {
        if (targetId == todoItem.id) {
          target = todoItem;
        }
      })
      if (target)
        res.status(200).send(target).end();
      else {
        res.status(404).send({
          'message': 'Not found, get a todo by ID failed...'
        }).end();
      }
    })
    .put((req, res, next) => {
      const targetId = Number(req.params.id);
      const index = musicianList.findIndex(value => value.id === targetId);
      if (index !== -1 && req.body) {
        if (req.body.author)
          musicianList[index].author = req.body.author
        if (req.body.content)
          musicianList[index].content = req.body.content;

        res.status(200).send(musicianList[index]).end();
      }
      else {
        res.status(404).send({
          'status': 404,
          'message': 'Not found, update a todo by ID failed...'
        });
      }
    })
    .delete((req, res, next) => {
      const targetId = Number(req.params.id);
      const index = musicianList.findIndex(value => value.id === targetId);
      if (index !== -1) {
        musicianList.splice(index, 1);
        res.status(200).send({
          'message': 'Delete a todo by ID complete!'
        }).end();
      }
      else {
        res.status(404).send({
          'message': 'Not found, delete a todo by ID failed...'
        }).end();
      }
    })

  module.exports = router;
})();
