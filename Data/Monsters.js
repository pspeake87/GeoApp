var Moves = require('./Moves');

module.exports = {
    player: {
         name: "Theon",
         level: 14,
         maxHp: 0,
         currentHp: 0,
         strength: 10,
         defense: 1,
         elemental: 1,
         speed: 1,
         evasion: 1,
         avatar: "",
         experienceGained: 200,
         experienceTotal: 1000,
         moves: [Moves.lightning, Moves.fire, Moves.tornado, Moves.lava],
         monster: {
             name: "phil's monster",
             level: 35,
             maxHp: 200,
             currentHp: 200,
             attack: 0,
             defense: 0,
             specialAtt: 0,
             specialDef: 0,
             speed: 100,
             evasion: 0,
             avatar: "",
             type: "Fire",
             moves: [Moves.lightning, Moves.fire, Moves.tornado, Moves.lava],
         }
      },

 enemy: [{
         name: "Worm",
         level: 76,
         maxHp: 0,
         currentHp: 0,
         strength: 2,
         defense: 3,
         elemental: 1,
         speed: 2,
         evasion: 1,
         avatar: {uri: 'slug1.gif'},
         type: "Water",
         experience: 400,
         itemSpawn: .50,
         moves: [Moves.lightning, Moves.fire, Moves.riptide, Moves.lava],
  },
  {
    name: "Space Slug",
         level: 13,
         maxHp: 35,
         currentHp: 112,
         strength: 3,
         defense: 2,
         elemental: 1,
         speed: 1,
         evasion: 1,
         avatar: {uri: 'slug1.gif'},
         type: "Fire",
         moves: [Moves.lightning, Moves.fire, Moves.riptide, Moves.lava],
  },
  {
    name: "Bandit",
         level: 54,
         maxHp: 27,
         currentHp: 220,
         strength: 1,
         defense: 2,
         elemental: 1,
         speed: 1,
         evasion: 1,
         avatar: {uri: 'spaceman1.gif'},
         type: "Earth",
         moves: [Moves.lightning, Moves.fire, Moves.riptide, Moves.lava],
  },
  {
    name: "Orion",
         level: 32,
         maxHp: 43,
         currentHp: 90,
         strength: 1,
         defense: 3,
         elemental: 1,
         speed: 1,
         evasion: 1,
         avatar: {uri: 'spaceman1.gif'},
         type: "Wind",
         moves: [Moves.lightning, Moves.fire, Moves.riptide, Moves.lava],
  },
  {
    name: "Slug",
         level: 25,
         maxHp: 40,
         currentHp: 150,
         strength: 2,
         defense: 1,
         elemental: 3,
         speed: 1,
         evasion: 1,
         avatar: {uri: 'slug1.gif'},
         type: "Fire",
         moves: [Moves.lightning, Moves.fire, Moves.riptide, Moves.lava],
  },
  {
    name: "Bandit",
         level: 10,
         maxHp: 50,
         currentHp: 234,
         strength: 2,
         defense: 1,
         elemental: 1,
         speed: 3,
         evasion: 1,
         avatar: {uri: 'spaceman1.gif'},
         type: "Water",
         moves: [Moves.lightning, Moves.fire, Moves.riptide, Moves.lava],
  }]
}