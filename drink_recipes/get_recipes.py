import urllib2
import json

with open('recipes.json', 'r') as f:
    drinks = json.load(f)

ids = [drink['idDrink'] for drink in drinks]

recipes = []
for drink_id in ids:
    request_url = 'http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drink_id

    response = urllib2.urlopen(request_url)

    try:
        json_response = json.loads(response.read())
        recipes += json_response['drinks']
    except (ValueError, TypeError) as e:
        print 'Error for id ' + drink_id

with open('recipes_full.json', 'w') as f:
    json.dump(recipes, f)