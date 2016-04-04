var Moves = require('./Moves');

module.exports = {
 items: [{
   
   name: "Potion",
   health: 10,
   description: "Heals you for 10 points of damage"
 },
 {
   
   name: "Entangle",
   turns: 2,
   description: "Entangles the enemy with vines, they cant move for two turns"
 },
{
  
   name: "Mega Potion",
   health: 30,
   description: "Heals you for 30 points of damage"
 },
 {
   
   name: "Knife",
   turns: 0,
   description: "Frees you from entangle"
 },
 {
   
   name: "Bottle of lightning",
   move: Moves.lightning,
   description: "Attacks the enemy with lightning"
 },
 {
   
   name: "X Speed",
   stats: 3,
   add: 1,
   description: "Increases your speed by 1 point for 1 hour"
 },
 {
   
   name: "Full Heal",
   health: 9999,
   description: "Completely heals your character"
   
 },
 {
   
   name: "Speed up",
   stats: 3,
   add: 1,
   description: "Increases your speed by 1 point for 1 hour"
 },
 




 ],


}