const { expect } = require('chai')
const { db, syncAndSeed} = require('../db')
const request = require('supertest')
const app = request(require('../server'))


describe('App', ()=> {
	let seed
	beforeEach( async()=> {
		seed = await syncAndSeed()
	})

	describe('name datatype', () => {
		it('name is a string', async() => {
			const moe = {name: 'MOE'}
			expect(moe.name).to.equal('MOE')
		})
	})

	describe('GET /api/characters', () => {
		it('returns 8 characters', async() => {
			const response = await app.get('/api/characters')
			expect(response.status).to.equal(200)
			expect(response._body.length).to.equal(8)
		})
	})

	describe('GET /api/characters/:id', () => {
		it('returns 1 character', async() => {
			const character = { id:1, name:'moe' }
			const response = await app.get(`/api/characters/${character.id}`)
			expect(response.status).to.equal(200)
			expect(response._body).to.be.an('object')
		})
	})
})