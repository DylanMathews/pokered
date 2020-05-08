// Coordinates scripts
const { fetch, open_file } = require('./fetch_names')
const replace_all_pokemon = require('./replace_pokemon')
const {promisify} = require('util');
const fs = require('fs')
const write_file = promisify(fs.writeFile)

const main = async (loc) => {
	const func = process.argv[2]

	switch (func) {
		case "file": 
			replace_in_file(loc)
			break
		case "folder":
			replace_in_folder(loc)
		default:
			throw new Error(`Must specify "file" or "folder" in first arg.`)
	}
}

const replace_in_file = async (loc) => {
	const species = await fetch('../pokered/constants/pokemon_constants.asm')
	let data = await open_file(loc)
	data = replace_all_pokemon(species, data)
	await write_file(loc, data)
}

const replace_in_folder = loc => {
	// grab all files from the directory
	const files = fs.readdirSync(loc);

	for (idx in files) {
		const file = files[idx]
		replace_in_file(`${loc}/${file}`)
	}
}

main(process.argv[3])