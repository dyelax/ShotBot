import json

with open('recipes.json', 'r') as f:
    drinks = json.load(f)

keys = set([])
unique_drinks = []
for drink in drinks:
    drink_id = drink['idDrink']

    if drink_id not in keys:
        unique_drinks.append(drink)
        keys.add(drink_id)

with open('recipes_unique.json', 'w') as f:
    json.dump(unique_drinks, f)