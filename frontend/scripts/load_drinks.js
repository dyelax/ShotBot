function getDrinksForIngredients(ingredients) {
	var drinks = [];
	for (var i = 0; i < DRINK_DB.length; i++) {
		var drink = DRINK_DB[i];
		var drink_ingredients = drink['ingredients'];

		var drinkGood = true;
		for (var j = 0; j < drink_ingredients.length; j++) {
			var ingredient = drink_ingredients[j];

			if (ingredients.indexOf(ingredient) == -1) {
				console.log(ingredient)
				drinkGood = false;
			}
		}

		if (drinkGood) {
			drinks.push(drink)
		}
	}
	
	return drinks;
}

function getDrinks(drinkNames) {
	// lowercase all drink names
	drinkNamesLower = drinkNames.map(function(str) {
		return str.toLowerCase()
	})
	
	var drinks = [];
	for (var i = 0; i < DRINK_DB.length; i++) {
		var drink = DRINK_DB[i];
		nameLower = drink['title'].toLowerCase()
		if (drinkNamesLower.indexOf(nameLower) != -1) {
			drinks.push(drink);
		}
	}
	
	return drinks;
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function generateHTML(drinks) {
	html = '';
	for (var i = 0; i < drinks.length; i++) {
		drink = drinks[i];
		
		if (i % 3 == 0) { // new row
			html += '<div class="row">';
		}
		
		html += '<div class="col-xs-4">';
		
		styleString = 'background: url(' + drink['imgFile'] + ');';
		styleString += 'background-position: center;';
		styleString += 'background-size: cover;';
		html += '<div class="drink" id="' + i + '" style="' + styleString + '">';
		
		html += '<div class="drinkText">';
		
		html += '<h3 class="drinkName">';
		html += drink['title'];
		html += '</h3>';
		
		html += '<p class="drinkDescription">';
		descriptionString = drink['ingredients'].join(', ').capitalizeFirstLetter() + '.';
		html += descriptionString;
		html += '</p></div></div></div>';
		
		if (i % 3 == 2) { // end of row
			html += '</div>';
		}
	}
	
	return html;
}

function setup(ingredients, numSlots) {
	drinks = getDrinksForIngredients(ingredients);
	
	$('#drinks').html(generateHTML(drinks));
	
	$('.drink').click(function() {
		drinkNum = parseInt($(this).attr('id'));
		drink = drinks[drinkNum];
		
		pourDrink(drink, ingredients, numSlots);
	})
}
