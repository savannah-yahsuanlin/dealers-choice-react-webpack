import React from 'react'
import axios from 'axios'

class Main extends React.Component {
	constructor() {
		super()
		this.state = {
			characters: []
		}
		this.onDelete = this.onDelete.bind(this)
	}

	onDelete(character) {
		const characters = this.state.characters.filter( _character => _character.id !== character.id);
		this.setState({ characters });
		axios.delete(`/api/characters/${character.id}`)
		.then( ()=> console.log('deleted'));
	}


	async componentDidMount() {
		try {
			const response = await axios.get('/api/characters')
			const characters = response.data
			this.setState({ characters })
		} catch (error) {
			console.log(error)
		}
	}

	render () {
		return (
			<div>
				<h1>Mario Characters</h1>
				<ul>
				{this.state.characters.map(character => {
					return (
						<div>
							<li>{character.name}</li>
							<button onClick={()=> this.onDelete(character)}>X</button>
						</div>
					)
				})}
				</ul>
			</div>
		)
	}
}


export default Main