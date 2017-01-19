import urllib2
import json

ingredients = []
with open('ingredients.txt', 'r') as f:
    ingredients = f.read().split('\n')

drinks = []
for ingredient in ingredients:
    ingredient_str = ingredient.replace(' ', '%20')
    request_url = 'http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredient_str

    response = urllib2.urlopen(request_url)

    try:
        json_response = json.loads(response.read())
        drinks += json_response['drinks']
    except (ValueError, TypeError) as e:
        print 'Error for ' + ingredient

with open('drinks.json', 'w') as f:
    json.dump(drinks, f)