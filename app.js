const fs = require('fs')
const path = require('path')
const express = require('express');
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'))
app.set('views', './views');

const data_dir = path.join(__dirname, "data")
const brick_data_file = path.join(data_dir, "bricks-levels.json")
const brick_data = JSON.parse(fs.readFileSync(brick_data_file, 'utf-8'))

// index page
app.get('/bricks', function(req, res) {

    let render_level;
    const { level: requested_level } = req.query

    if (!requested_level) {
        render_level = 1
    } else {
        render_level = requested_level
    }

    const {levels} = brick_data
    if (Object.keys(levels).includes(render_level.toString())) {
        res.render('bricks', {blocks: levels[requested_level.toString()]})
        return
    } else {
        console.error(`Error! Requested level ${requested_level} does not exist`)
        res.render('bricks', {blocks: JSON.stringify(levels[requested_level.toString()]) })
        return
    }
});

// Server setup to listen on IP and port
app.listen(8080, () => {
    console.log('Server is listening on 8080');
  });
