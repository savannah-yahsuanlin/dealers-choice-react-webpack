const { expect } = require('chai')
const { syncAndSeed }= require('../db')
const app = require('../server')



describe('Models', () =>{
	let seed
	beforeEach( async()=> {
		seed = await syncAndSeed()
	})

	describe('data layer', () => {
		it('there are 8 characters', () => {
			expect(Object.keys(seed.characters).length).to.equal(8)
		})
	})
})

