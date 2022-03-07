const express = require('express')
const path = require('path')
const { syncAndSeed, models: {Characters} } = require('./db')

const app = express()

app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))


app.get('/api/characters', async(req, res, next) => {
	try {
		const characters = await Characters.findAll()
		res.send(characters)
	} catch (error) {
		next(error)
	}
})

app.get('/api/characters/:id', async(req, res, next) => {
	try {
		const characters = await Characters.findByPk(req.params.id)
		res.send(characters)
	} catch (error) {
		next(error)
	}
})

app.delete('/api/characters/:id', async(req, res, next) => {
	try {
		const character = await Characters.findByPk(req.params.id)
		await character.destroy()
		res.sendStatus(204)
	} catch (error) {
		next(error)
	}
})

module.exports = app


const setUp = async() => {
	try {
		await syncAndSeed()
		const port = process.env.Port || 3000	
		app.listen(port, () => console.log(`Listening on port ${port}`))
	} catch (error) {
		console.log(error)
	}
} 

setUp()



