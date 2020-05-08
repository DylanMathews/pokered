// This grabs all of the pokemon names from the pokemon_constants file.
const fs = require('fs')
const {promisify} = require('util');

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

let LOC = process.argv[2]


// open the file
const open_file = async (loc) => {
	return readFile(loc, {encoding: 'utf8'})
		.then(text => text)
}

const write_file = async (loc, data) => {
	return writeFile(loc, data, 'utf8')
}

const grab_pokemon = data => {
	const re = /const ([A-Z][A-Z_0-9]+)/g
	var match
	var matches = []
	while ((match = re.exec(data)) !== null) {
		matches.push(match[1])
	}
	return matches
}

const fetch = async (location) => {
	console.log(`Checking loc ${location}`)
	const data = await open_file(location ? location : LOC)
	const matches = grab_pokemon(data)
	return matches
}

module.exports = { fetch, open_file, write_file }