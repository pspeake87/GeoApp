var Moves = require('./Moves');

module.exports = {
 items: [{
   id: 0,
   name: "Potion",
   health: 10,
   description: "Heals you for 10 points of damage"
 },
 {
   id: 1,
   name: "Entangle",
   turns: 2,
   description: "Entangles the enemy with vines, they cant move for two turns"
 },
{
   id: 2,
   name: "Mega Potion",
   health: 30,
   description: "Heals you for 30 points of damage"
 },
 {
   id: 3,
   name: "Knife",
   turns: 0,
   description: "Frees you from entangle"
 },
 {
   id: 4,
   name: "Bottle of lightning",
   move: Moves.lightning,
   description: "Attacks the enemy with lightning"
 },
 {
   id: 5,
   name: "X Speed",
   stats: 3,
   add: 1,
   description: "Increases your speed by 1 point for 1 hour"
 },
 {
   id: 6,
   name: "Full Heal",
   health: 9999,
   description: "Completely heals your character"
   
 },
 {
   id: 6,
   name: "asdfasd",
   stats: 3,
   add: 1,
   description: "Increases your speed by 1 point for 1 hour"
 },
 




 ],


}