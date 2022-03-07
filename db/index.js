const { Sequelize, STRING } = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/mario')

const Characters = db.define('characters', {
	name: {
		type: STRING,
		allowNull: false
	}
})

const syncAndSeed = async() => {
	await db.sync({force: true})

	await Characters.create({name: 'toad'})
	await Characters.create({name: 'mario'})
	await Characters.create({name: 'luigi'})
	await Characters.create({name: 'peach'})
	await Characters.create({name: 'daisy'})
	await Characters.create({name: 'yoshi'})
	await Characters.create({name: 'wario'})
	await Characters.create({name: 'toadette'})

	return {
		characters: ['toad', 'mario', 'luigi','peach', 'daisy', 'yoshi','wario', 'toadette'],
	}
}


module.exports = {	
	db,
	models: {
		Characters
	},
	syncAndSeed
}