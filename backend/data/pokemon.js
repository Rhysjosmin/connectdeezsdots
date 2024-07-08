const Pokemon = [
  {
    type: "fire",
    id: 3,
    pokemon: "Charizard",
    url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg",
    stats: {
      hp: 120,
      attack: 84,
      defense: 78,
      speed: 100,
    },
    moves: [
      {
        name: "Flamethrower",
        damage: 90,
        type: "fire",
      },
      {
        name: "Dragon Rage",
        damage: 40,
        type: "dragon",
      },
      {
        name: "Fire Blast",
        damage: 110,
        type: "fire",
      },
      {
        name: "Solar Beam",
        damage: 120,
        type: "grass",
      },
    ],
  },
  {
    type: "water",
    pokemon: "Blastoise",
    id: 2,
    url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg",
    stats: {
      hp: 120,
      attack: 83,
      defense: 100,
      speed: 78,
    },
    moves: [
      {
        name: "Water Gun",
        damage: 40,
        type: "water",
      },
      {
        name: "Hydro Pump",
        damage: 110,
        type: "water",
      },
      {
        name: "Ice Beam",
        damage: 90,
        type: "ice",
      },
      {
        name: "Skull Bash",
        damage: 130,
        type: "normal",
      },
    ],
  },
  {
    type: "grass",
    id: 1,
    pokemon: "Venusaur",
    url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg",
    stats: {
      hp: 120,
      attack: 82,
      defense: 83,
      speed: 80,
    },
    moves: [
      {
        name: "Vine Whip",
        damage: 45,
        type: "grass",
      },
      {
        name: "Razor Leaf",
        damage: 55,
        type: "grass",
      },
      {
        name: "Solar Beam",
        damage: 120,
        type: "grass",
      },
      {
        name: "Earthquake",
        damage: 100,
        type: "ground",
      },
    ],
  },
];

module.exports = { Pokemon };
