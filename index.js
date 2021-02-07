const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname+'/date.js');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const items = ['Buy Food', 'Cook Food', 'Eat Food'];
const workItems = [];

app.get('/', (req, res) => {
    const day = date.getDate()
    const year = date.getYear()
        res.render('list', {listTitle: day, newTodo: items, yearNow: year});
});

app.get('/work', (req, res) => {
    const year = date.getYear()
    res.render('list', {listTitle: 'Work', newTodo: workItems, yearNow: year});
});

app.get('/about', (req, res) => {
    res.render('/about', {yearNow: year});
})

app.post('/', (req, res) => {
    const todo = req.body.todo;
    if(req.body.list === 'Work'){
        workItems.push(todo);
        res.redirect('/work');
    } else {
        items.push(todo);
        res.redirect('/');
    }
});



app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000');
})