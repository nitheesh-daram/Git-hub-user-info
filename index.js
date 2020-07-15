const express = require('express')
const fetch = require('node-fetch')
const body_parse = require('body-parser')
const {
    json
} = require('body-parser')

app = express()


app.set('view engine', 'ejs')

app.use(body_parse.json());
app.use(body_parse.urlencoded({
    extended: true
}));
app.get('/', (req, res) => {
    fetch('https://api.github.com/users/example-user-account')
        .then(res => res.json())
        .then(json => res.render('main', {
            json: json
        }))
})

app.post('/', (req, res) => {
    fetch('https://api.github.com/users/' + req.body.search)
        .then(res => res.json())
        .then(json => {
            //   console.log(json)
            if (!json.message) {
                return res.render('main', {
                    json: json
                })
            } else {
                return res.render('error', {
                    json: json
                })
            }
        })
})



app.listen(3000)