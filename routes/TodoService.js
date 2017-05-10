
(function () {
  'use strict';
  const express = require('express');
  const router = express.Router();

  let todoList = [];
  todoList.push({ id: 1, author: 'Beethoven', content: '' });     // For demo, fake data.
  todoList.push({ id: 2, author: 'J.S. Bach', content: '' });     // For demo, fake data.
  todoList.push({ id: 3, author: 'Mozart', content: '' });        // For demo, fake data.
  todoList.push({ id: 4, author: 'Chopin', content: '' });        // For demo, fake data.
  todoList.push({ id: 5, author: 'Schubert', content: '' });      // For demo, fake data.
  todoList.push({ id: 6, author: 'Wagner', content: '' });        // For demo, fake data.
  todoList.push({ id: 7, author: 'Brahms', content: '' });        // For demo, fake data.
  todoList.push({ id: 8, author: 'Tchaikovsky', content: '' });   // For demo, fake data.

  router.route('/')
    // URL: /api/todos
    .get((req, res, next) => {
      res.status(200).send(todoList).end();
    })
    .post((req, res, next) => {
      console.log("POST", req.body);
      if (req.body && req.body.author) {   // simple valify
        let newTodo = {
          id: todoList.length + 1,
          author: req.body.author,
          content: req.body.content,
          created: new Date()
        };
        todoList.push(newTodo);
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
      todoList.forEach(todoItem => {
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
      const index = todoList.findIndex(value => value.id === targetId);
      if (index !== -1 && req.body) {
        if (req.body.author)
          todoList[index].author = req.body.author
        if (req.body.content)
          todoList[index].content = req.body.content;

        res.status(200).send(todoList[index]).end();
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
      const index = todoList.findIndex(value => value.id === targetId);
      if (index !== -1) {
        todoList.splice(index, 1);
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
