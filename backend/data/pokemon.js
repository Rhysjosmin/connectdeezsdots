const Pokemon = [
    {
      "type": "Fire",
      "pokemon": "Charizard",
      "url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg",
      "stats": {
        "hp": 120,
        "attack": 84,
        "defense": 78,
        "speed": 100
      },
      "moves": [
        {
          "name": "Flamethrower",
          "damage": 90,
          "type": "Fire"
        },
        {
          "name": "Dragon Rage",
          "damage": 40,
          "type": "Dragon"
        },
        {
          "name": "Fire Blast",
          "damage": 110,
          "type": "Fire"
        },
        {
          "name": "Solar Beam",
          "damage": 120,
          "type": "Grass"
        }
      ]
    },
    {
      "type": "Water",
      "pokemon": "Blastoise",
      "url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg",
      "stats": {
        "hp": 120,
        "attack": 83,
        "defense": 100,
        "speed": 78
      },
      "moves": [
        {
          "name": "Water Gun",
          "damage": 40,
          "type": "Water"
        },
        {
          "name": "Hydro Pump",
          "damage": 110,
          "type": "Water"
        },
        {
          "name": "Ice Beam",
          "damage": 90,
          "type": "Ice"
        },
        {
          "name": "Skull Bash",
          "damage": 130,
          "type": "Normal"
        }
      ]
    },
    {
      "type": "Grass",
      "pokemon": "Venusaur",
      "url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg",
      "stats": {
        "hp": 120,
        "attack": 82,
        "defense": 83,
        "speed": 80
      },
      "moves": [
        {
          "name": "Vine Whip",
          "damage": 45,
          "type": "Grass"
        },
        {
          "name": "Razor Leaf",
          "damage": 55,
          "type": "Grass"
        },
        {
          "name": "Solar Beam",
          "damage": 120,
          "type": "Grass"
        },
        {
          "name": "Earthquake",
          "damage": 100,
          "type": "Ground"
        }
      ]
    }
  ]

  module.exports = { Pokemon };