require('dotenv').config()
let massive = require('massive')
let express = require('express')
let app = express()
const { SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json())

massive(CONNECTION_STRING).then( db => {
    app.set('db', db)
    console.log('DB set!')
    console.log(db.listTables())
})
.catch((error) => console.log(`Your error is ${error}`))

app.get('/api/products', (req, res) => {
    req.app.get('db')
    .read_products()
    .then( products => res.status(200).send(products))
    .catch(err => console.log(err))
})

app.post('/api/products', (req, res) => {
     let { name, image_url, price, description } = req.body
    req.app.get('db')
    .create_product([name, image_url, price, description])
    .then(products => res.status(200).send(products))
    .catch(err => console.log(err))
})

app.delete('/api/products/:id', (req, res) => {
    let { id } = req.params
    req.app.get('db')
    .delete_product(id)
    .then(products => res.status(200).send(products))
    .catch(err => console.log(err))
})

app.get('/api/products/:id', (req, res) => {
    let { id } = req.params
    req.app.get('db')
    .read_product(id)
    .then(product => res.status(200).send(product))
    .catch(err => console.log(err))
})

app.put('/api/products/:id', (req, res) => {
    let { id } = req.params
    let { desc } = req.query
    req.app.get('db')
    .update_product([id, desc])
    .then( (product) => res.status(200).send(product))
    .catch(err => console.log(err))
})

app.listen(SERVER_PORT, () => console.log(`Your port is running on ${SERVER_PORT}`))