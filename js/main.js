

/*

http://pokeapi.co/docsv2

*/

// 1. Write an API call that gets all the berries and passes the response into a callback
function getAllBerries(){
	// $.ajax({
	// 	url: "https://pokeapi.co/api/v2/berry?limit=64",
	// 	success: getAllBerriesCallback,
	// });

	$.ajax({
		url: "https://pokeapi.co/api/v2/berry?limit=64",
		success: function(response){
			getAllBerriesCallback(response)
		}
	});
}

// 2. The call back should loop through the response and console.log every berry name
function getAllBerriesCallback(response){
	console.log(response.count)
	response.results.forEach(function(berry){
		console.log(berry.name);
	})
}

// 3. Write an API call that gets all the pokemon and passes the response into a callback
function getAllPokemon(){
	$.ajax({
		url: "http://pokeapi.co/api/v2/pokemon?limit=2",
		success: function(response){
			getAllPokemonCallback(response)
			//console.log(response)
		}
	});
}

getAllPokemon();

// 4. The call back should loop through the response and console.log every pokemon name
function getAllPokemonCallback(response){
	response.results.forEach(function(pokemonName){

		console.log(pokemonName.name);
		getSinglePokemon(pokemonName.name);
	});
}


// 5. Write an API call that gets all the Item and passes the response into a callback
function getAllItems(){
	$.ajax({
		url: "http://pokeapi.co/api/v2/item?limit=2",
		success: function(response){
			getAllItemsCallback(response)
		}
	});
}

// 6. The call back should loop through the response and console.log every item name
function getAllItemsCallback(response){
	response.results.forEach(function(item){
		console.log(item);
	});
}

// 7. Write an API call that gets all the Item and passes the response into a callback
function getAllLocations(){
	$.ajax({
		url: "http://pokeapi.co/api/v2/location?limit=2",
		success: function(response){
			getAllLocationsCallback(response)
		}
	});
}

// 8. The call back should loop through the response and console.log every Location name
function getAllLocationsCallback(response){
	response.results.forEach(function(pokemonLocation){
		console.log(pokemonLocation);
	});
}

// 9. Write an API call that gets a pokemon and passes the response into a callback
// make sure to pass as lowercase 'string'
function getSinglePokemon(pokemonName){
	$.ajax({
		url: 'http://pokeapi.co/api/v2/pokemon/' + pokemonName,
		success: function(response){
			getSinglePokemonCallback(response)
		}
	});
}

//getSinglePokemon('pikachu')  //call function getSinglePokemon


// 10. The call back should loop through the response and console.log the pokemon name
function getSinglePokemonCallback(response){
	var pokemonName = response.name;
	var imageUrl = pokemonImage(response);
	//var imageUrl = response.sprites.front_default;
	var abilities = pokemonAbilities(response);
	//var abilities = response.abilities.forEach(function(pokemon) {
	// console.log(pokemon.ability.name);
	// });
	//call function that puts these variables to use
	console.log(response);	
	console.log(abilities);	
	var pokemonCreator = new PokemonObject(pokemonName, imageUrl, abilities);
	allPokemon.push(pokemonCreator);
	//addPokemonToPage(pokemonName, imageUrl, abilities);
	addPokemonToPage(pokemonCreator);
}

// 11.  Write a function that accepts a pokemon Object and returns the front_default sprite url
function pokemonImage(response){
	return response.sprites.front_default;
}

// 12.  Write a function that accepts a pokemon Object and returns an array of ability names
function pokemonAbilities(response){
	var abilitiesArray = [];
	response.abilities.forEach(function(item) {
		abilitiesArray.push(item.ability.name); 
	});
	return abilitiesArray;
};

// 13.  Write a function that accepts a pokemon name, pokemon image url, and an array of abilities and adds to the page:
// - an <li> added to #pokemon-list 
// - an <h1> witht their name 
// - and <img> tag with their image url
// - a <ul> and <li> of abilities 

// function addPokemonToPage(pokemonName, imageUrl, abilities){ 
// 	console.log(pokemonName + imageUrl + abilities)
// 	var htmlAppender = $('#pokemon-list');
// 	var abilityDiv = "";

// 	abilities.forEach(function(abil){
// 		abilityDiv += "<li>" + abil + "</li>" 
// 	});

// 	var html = "<li><h1>" + pokemonName + "</h1><img src =" + imageUrl + "><ul>" + abilityDiv + "</ul></li>";
// 	htmlAppender.append(html);
// }

function addPokemonToPage(pokemonCreator){ 
	var htmlAppender = $('#pokemon-list');
	var abilityDiv = "";
	console.log(allPokemon);
	pokemonCreator.abilities.forEach(function(abil){
		abilityDiv += "<li>" + abil + "</li>" 
	});

	var html = "<li><h1>" + pokemonCreator.name + "</h1><img src =" + pokemonCreator.imageUrl + "><ul>" + abilityDiv + "</ul></li>";
	htmlAppender.append(html);
}

// 14.  When the getAllPokemonCallback is called it should now pass each pokemon into the getSinglePokemon function.  The getSinglePokemonCallback function should: 
// - call pokemonImage function 
// - call pokemonAbilities function
// - call addPokemontoPage function

// 15.  Create a Pokemon object constructor that can accept a Pokemon's name, image url, and an array of abilities

var PokemonObject = function(pokemonName, imageUrl, abilities){
	this.name = pokemonName;
	this.imageUrl = imageUrl;
	this.abilities = abilities;
}

// 16.  Create a global array of allPokemon to store pokemon in

var allPokemon = [];

// 17.  The getSinglePokemonCallback should  *** DID IT! ***
// - pass the necessary data to the Pokemon constructor
// - add it to the AllPokemon array
// - pass it to the addPokemonToPage function.

// 18.  Adjust the addPokemonToPage function to accept your Pokemon object instead of the 3 params. *** DID IT! ***

// 19.  Restructure your app as an object literal POKEMONAPP
// - with all public methods 
// -- so you can call POKEMONAPP.anymethod() 
// --  make a property POKEMONAPP.allPokemon to hold the array of pokemon

// 20.  Change the getAllPokemon method to not make an API call and just return the array of pokemon if the API has already been called.

// 21.  Restructure your app as an object with
// - with only one public method 
//	-- getAllPokemon

// 22.  Restructure your app as an object with public methods and private methods
// - (hint create an IIFE that returns an object with the public methods as closures)
// - public methods:
//	-- getAllBerries
//	-- getAllPokemon
// 	-- getAllItems
//	-- getAllLocations
// - and private methods:
//	-- getAllBerriesCallback
//  -- getAllPokemonCallback
// 	-- getAllItemsCallback
//  -- getAllLocationsCallback
//  -- getSinglePokemonCallback
//  -- pokemonImage
//  -- pokemonAbilities
//  -- addPokemonToPage

// 23.  Write an IIFE that accepts the $jquery object and window as parameters that wraps around your code to give it a private scope

// 24.  Make buttons and click events for each of the public methods

// 25.  Make form where you can enter a pokemon's name and submit the form to make an API call to show their info

