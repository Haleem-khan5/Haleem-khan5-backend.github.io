const { query } = require('express');
const express = require('express');
const app = express();
const path = require('path');


database = [];
function comparison(a, b) {
    let flag = 0;
    const task1 = a.task_name.toUpperCase();
    const task2 = b.task_name.toUpperCase();
    if (task1 < task2) {
      flag = -1;
    } 
    else if (task1 > task2) {
      flag = 1;
    }
    return flag;
  }

app
    .route('/tasks')
    .get(function(req, res) {
        res.json(database);
    })
    
    .delete(function(req, res) {
            var index = req.body;
            if (database.length > 0) {  
                delete database[index];
                console.log(database);
                res.sendStatus(200);
            }
            else {
                res.sendStatus(400);
            }
        })
    .post(express.text(), function(req, res) {
            var task = req.body;
            var task_object = { task_name : task , completed : false}
            database.push(task_object);
            console.log(database);
            res.sendStatus(201);
        })
    .put(express.text(), function(req, res) {
        console.log("put")
        var index = req.body;
        if (database.length != 0) {
            database[index].completed = true;
            console.log(database);
            res.sendStatus(201);
        }
        else {
            res.sendStatus(400);
        }
    });
app.get("/sort",express.text(), function(req, res) {
        console.log("sorting")
        database.sort(comparison);
        res.send(database);
    });

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});