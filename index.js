const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

let tasks = [];
let completed = [];

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('index', { tasks: tasks, complete: completed });
});

app.post('/addtask', (req, res) => {
    let newTask = req.body.newTask;
    tasks.push(newTask);
    res.redirect('/');
});

app.post('/removetask', (req, res) => {
    let completedTask = req.body.check;
    if (typeof completedTask === 'string') {
        completed.push(completedTask);
        tasks = tasks.filter(task => task !== completedTask);
    } else if (typeof completedTask === 'object') {
        for (let i = 0; i < completedTask.length; i++) {
            completed.push(completedTask[i]);
            tasks = tasks.filter(task => task !== completedTask[i]);
        }
    }
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
