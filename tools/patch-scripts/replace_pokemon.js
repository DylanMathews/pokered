// This file looks for all substrings matching the gathered names and replaces with DITTO

// This could be done by a simple for loop over all names gathered.

const replace_pokemon_species = (species, data) => {
	// check the data for this species as a substring and replace
	const re = new RegExp(species, 'g')
	const new_data = data.replace(re, 'ZUBAT')
	return new_data
}

const replace_all_pokemon = (species_list, data) => {
	let new_data = data

	for (var species_idx in species_list) {
		const species = species_list[species_idx]
		new_data = replace_pokemon_species(species, new_data)

		if (species_idx == 1) {
			console.log(new_data)
		}
	}

	return new_data
}

module.exports = replace_all_pokemon