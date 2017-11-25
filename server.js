const express = require('express')
const app = express()
const bodyParser = require('body-parser')



app.use(bodyParser.json())
//middleware
app.use((req, res, next) => {
	console.log(`${req.method}: ${req.url}`)
	next()
})


app.use((req, res, next) => {
	if(req.query.api_key){
		next()
	}else{
		res.status(401).send({msg: 'Not authorized'})
	}
})



app.get('/', (req, res) => {
	res.send({msg: 'Hello world'})
})

app.get('/accounts', (req, res, next)=> {
	console.log('accounts inline middleware')
	next(new Error('oopps'))
},(req, res) => {
	res.send({msg: 'accounts'})
})

//curl -d '{"key": "value"}' localhost:3000/transactions?api_key=12345 -i -H 'Content-Type: application/json'

app.post('/transactions', (req, res) => {
	console.log(req.body)
	res.send({msg: 'transactions'})
})

app.use((error, req, res, next) => {
	res.status(500).send(error)
})
app.listen(3000)