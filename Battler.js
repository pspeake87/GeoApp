'use strict';

var React = require('react-native');
var GameEngine = require('./GameEngine');
var MoveView = require('./MoveView');
var Monsters = require('./Data/Monsters');
var Moves = require('./Data/Moves');
var Items = require('./Data/Items');



var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Animated,
  Easing,

} = React;


var Battler = React.createClass({

  getInitialState() {
    return {
      fadeAnim: new Animated.Value(0),
      attackMove: new Animated.Value(0),
      eAttackMove: new Animated.Value(0),
      player: {},
      enemy: {},
      message: "",
      playerTurn: false,
      moveButtons: "",
      currentPlayer: null,
      currentDefender: {},
      moveImage: 0,
      playerAttacking: false,
      enemyAttacking: false,
      currentMove: {},
      expToGo: (Monsters.player.experienceTotal - Monsters.player.experienceGained),
    }

  },

   componentDidMount() {
      Animated.timing(       
        this.state.fadeAnim, 
        {
          toValue: 1,        
          duration: 3000,    
        },
      ).start(); 

      setTimeout(() => this.battleSequence(), 4000);
          
    },

   
  battleSequence: function() {
      var random = Math.floor(Math.random() * Monsters.enemy.length);
      // determine enemy monster monsterRandomizer(player)
      this.setState({enemy: Monsters.enemy[random]});
      this.setState({player: Monsters.player});
      this.state.enemy.currentHp = this.state.enemy.maxHp;
      //Monster stat randomizer
      this.statRandomizer();
      //hide monsters, show enemy monster with animation, 
      this.setState({message: "lv. " + this.state.enemy.level + " " +this.state.enemy.name + " has attacked"});
      //message "who should fight?"
      setTimeout(() => {this.setState({message: "Who Should Fight?"})}, 4000);
      setTimeout(() => {this.setState({moveButtons: "displayFighter" })}, 4000);
      //display buttons for option
      
      
  },

  statRandomizer: function() {
    var random = Math.floor(Math.random() * 6);
    
    
    this.state.enemy.level = this.state.player.level + random
   
    
    this.statSetter(this.state.enemy)
    
  },

  statSetter: function(character) {
    character.strength = Math.round(character.level * character.strength * 4.8)
    character.maxHp = Math.round(character.level * character.defense * 4.8) + (Math.pow(character.level, 2) * 10)
    character.elemental = Math.round(character.level * character.elemental * 4.8)
    character.speed = Math.round(character.level * character.speed * 4.8)
    character.evasion = Math.round(character.level * character.evasion * 4.8)
    character.currentHp = character.maxHp
  },

 

  displayCharButtons: function() {
    if (this.state.moveButtons == "displayFighter") {
      return <View style={styles.moveView}>
     <MoveView move={"Lv. " + this.state.player.level + " " + this.state.player.name} press={this.setPlayer} />
     <MoveView move={"Lv. " + this.state.player.monster.level + " " + this.state.player.monster.name} press={this.setMonster}/>
     </View>
    } else if (this.state.moveButtons == "displayMoves") {
      return <View style={styles.moveView}>
     <MoveView move={this.state.currentPlayer.moves[0].name} press={() => this.calcDamage(this.state.currentPlayer.moves[0], true)} />
     <MoveView move={this.state.currentPlayer.moves[1].name} press={() => this.calcDamage(this.state.currentPlayer.moves[1], true)} />
     <MoveView move={this.state.currentPlayer.moves[2].name} press={() => this.calcDamage(this.state.currentPlayer.moves[2], true)} />
     <MoveView move={this.state.currentPlayer.moves[3].name} press={() => this.calcDamage(this.state.currentPlayer.moves[3], true)} />
     </View>
   } else {

   }
  },

  setPlayer: function() {
     this.statSetter(this.state.player)
     this.setState({currentPlayer: this.state.player});
     
     this.firstMove(this.state.currentPlayer.speed, this.state.enemy.speed);
     if (this.state.playerTurn) {
       this.playerTurn();
     } else {
       this.enemyTurn();
     }
  },

  setMonster: function() {
    this.statSetter(this.state.player.monster)
     this.setState({currentPlayer: this.state.player.monster});
     this.firstMove(this.state.currentPlayer.speed, this.state.enemy.speed);
     if (this.state.playerTurn) {
       this.playerTurn();
     } else {
       this.enemyTurn();
     }

  },

  playerTurn: function() {
     this.setState({currentDefender: this.state.enemy});
     {this.setState({message: "What do you want to do?"})}
     //displayMoves()
     this.setState({moveButtons: "displayMoves"});
     
     //wait for input of move
     
  },

  calcDamage: function(move, player) {
    this.setState({currentMove: move});
    this.setState({moveButtons: ""});
    var attack = 0;
    console.log(Math.floor(Math.random() * this.state.currentPlayer.level * 5));
    //damage calculation
    if (player) {
      attack = Math.round((move.power * 1.33)) * (this.state.currentPlayer.strength) + (Math.floor(Math.random() * this.state.currentPlayer.level * 5))
    } else {
      attack = Math.round((move.power * 1.33)) * (this.state.enemy.strength) + (Math.floor(Math.random() * this.state.enemy.level * 5))    
    }

    var life = this.state.currentDefender.currentHp - Math.round(attack / 1.5);
     //determine stats of move based on attacker
     //run move attack(move, attackee)
     //make changes to stats
    var damage = this.state.currentDefender.currentHp - life;
    
    
    if (player) {
       this.playerAttack();
       setTimeout(() => this.setState({playerAttacking: false}), 1250);
       
    } else {
       this.enemyAttack();
       setTimeout(() => this.setState({enemyAttacking: false}), 1250);
      }

    this.setState({message: move.name + " is used"});
    setTimeout(() => {this.setState({message: this.state.currentDefender.name + " recieved " + damage + " damage"})}, 1500);
    this.state.currentDefender.currentHp = life;
    if (this.state.currentDefender.currentHp < 0) {
      this.state.currentDefender.currentHp = 0;
    } 

    if (this.state.currentDefender.currentHp <= 0){
      setTimeout(() => this.fightOver(), 2000);
       
    } else {

        if (this.state.currentDefender == this.state.currentPlayer) {
          setTimeout(() => this.playerTurn(), 3000);
        } else {
          setTimeout(() => this.enemyTurn(), 3000);
        } 

    }

  },


  
  enemyAttack: function() {
    Animated.sequence([
     Animated.spring(       
        this.state.eAttackMove, 
        {
          toValue: -25,
          duration: 0,    
        }),
     Animated.spring(       
        this.state.eAttackMove, 
        {
          toValue: 0,
          duration: 0,    
        })
      ]).start(); 

     setTimeout(() => this.setState({enemyAttacking: true}), 500);
  },

  enemyTurn: function() {
    this.setState({currentDefender: this.state.currentPlayer});
    this.setState({message: this.state.enemy.name + "'s turn"});
    

    this.setState({moveButtons: ""});
      // determine move
    var random = Math.random();

    
    if (random > .75) {
      setTimeout(() => this.calcDamage(this.state.enemy.moves[0], false), 2000);
    } else if (random > .50) {
      setTimeout(() => this.calcDamage(this.state.enemy.moves[1], false), 2000);
    } else if (random > .25) {
      setTimeout(() => this.calcDamage(this.state.enemy.moves[2], false), 2000);
    } else {
      setTimeout(() => this.calcDamage(this.state.enemy.moves[3], false), 2000);
    }

      // determine stats of move based on attacker
      // run move attack(move, attackee)
      // switch turns
  },


  fightOver: function() {
      this.state.player.experienceGained = 200
      
      this.setState({moveButtons: ""});
      {this.setState({message: " " + this.state.currentDefender.name + " has died"})}
      //display message of who died
      //if player loser, message: player must heal 
      // if player winner, congratulations! you defeated a "enemy"

      setTimeout(() => {this.props.navigator.push({name: 'experience'})}, 500);
      // experienceScreen()
  },

  experienceScreen: function() {
      //show experince view
      // determine experinceGained(enemy)
      // apply experince to player and monster 1:2 ratio
      // determine itemGained(enemy)
      // message "blah blah item was found" or if null "no item was dropped"
  },

  experinceGained: function() {
      //formula from monsterId
      //return experience number
  },

  itemGained: function() {
      // formula from monsterId
      // return itemId or null
  },


  firstMove: function(pSpeed, eSpeed) {
     if (pSpeed >= eSpeed) {
       this.setState({playerTurn: true});
     }  
  },

  renderEnemyAvatar: function() {
     if (this.state.enemy.avatar) {
        return <View style={styles.enemyField}>

        <View style={styles.infoFieldE}>

                      <Text style={styles.infoFieldText}>
                          Lv. {this.state.enemy.level}     {this.state.enemy.name}
                      </Text>

                      <Text style={styles.infoFieldText}>
                          Hp: {this.state.enemy.currentHp}/ {this.state.enemy.maxHp}
                      </Text>

                      <GameEngine player={this.state.enemy}/>
                    
                </View>
                <Animated.Image style={{ flex: 1,
                transform: [{translateX: this.state.eAttackMove }],
                width: 115,
                height: 115,
                top: 30,
                left: 30,

                }}
                source={this.state.enemy.avatar}
                resizeMode={'contain'}>
                {this.attackImage()}
                </Animated.Image>
                
                </View>
     } 
  },
  // Animated attack image for enemy
  enemyAttackImage: function(move) {
    if (this.state.enemyAttacking)  {
   return  <Image style={styles.enemyAttack}
       source={this.state.currentMove.animationurl}
      resizeMode={'stretch'}>
      </Image>
  } 

  },
  attackImage: function() {
  
  if (this.state.playerAttacking)  {
   return  <Image style={styles.enemyAttack}
       source={this.state.currentMove.animationurl}
      resizeMode={'stretch'}>
      </Image>
  } 

  },

  playerAttack: function() {
     Animated.sequence([
     Animated.spring(       
        this.state.attackMove, 
        {
          toValue: 25,
          duration: 0,    
        }),
     Animated.spring(       
        this.state.attackMove, 
        {
          toValue: 0,
          duration: 0,    
        })
      ]).start(); 

     setTimeout(() => this.setState({playerAttacking: true}), 500);
     

    
     

  },

  renderPlayerAvatar: function() {
      if (this.state.currentPlayer) {
        return <View style={styles.playerField}>

                <Animated.Image style={{flex: 1, 
                  transform: [{translateX: this.state.attackMove }],
                  width: 115,
                  height: 115,
                  
                  
                  right: 40,
                 
                  alignSelf: 'flex-end',
                  justifyContent: 'flex-start'}}
                  source={{uri: 'playerHead.png'}}
                  resizeMode={'contain'}>
                  {this.enemyAttackImage()}
                </Animated.Image>

                <View style={styles.infoFieldP}>

                      <Text style={styles.infoFieldText}>
                          Lv. {this.state.currentPlayer.level}     {this.state.currentPlayer.name}
                      </Text>

                      <Text style={styles.infoFieldText}>
                          Hp: {this.state.currentPlayer.currentHp}/ {this.state.currentPlayer.maxHp}
                      </Text>

                      
                      <GameEngine player={this.state.currentPlayer}/>
                      
                    
                </View>

              </View>
      }

  },


 render: function(){
    return (
        
        <View style={styles.container}>
            <Animated.View   
              style={{
                opacity: this.state.fadeAnim, flex: 1
              }}>
              {this.props.children}
            
            <View 
            style={styles.monsterView}>
           
             
              <Image
              style={styles.image}
              source={{uri: 'meteor.jpg'}}>  


                  {this.renderEnemyAvatar()}

                  {this.renderPlayerAvatar()}
                   
              </Image>

              <View style={{backgroundColor:'black', height: 10, flexDirection: 'row'}}>
                <View style={{flex: Monsters.player.experienceGained, backgroundColor: 'blue',borderWidth: 1, borderRadius: 5,}}>
                </View>
                <View style={{flex: this.state.expToGo, backgroundColor: 'gray'}}>
                </View>

              </View>
              
            </View>
            

          <View style={{flex: 1, justifyContent: "center", backgroundColor: 'black'}}>
            
            <View style={styles.chatBox}>
               <Text style={styles.buttonText}>
                  {this.state.message}
               </Text>
            </View>
            
           
              {this.displayCharButtons()}
           

             
          </View>
        </Animated.View>
      </View>
      
    );
  }  
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0)',
    
  },

  monsterView: {
    flex: 2,
    justifyContent: "center",
    
  },
  image: {
    flex: 1,
    alignSelf: "stretch",
  },

  chatBox: {
    flex: 1,
    alignItems: 'center',
    alignSelf: "center",
    justifyContent: "center",
    
    
  },

  moveView: {
    flex: 2,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  enemyField: {
    flex: 1,
    flexDirection: "row",
  },

  playerField: {
    flex: 1,
    flexDirection: "row",
    
  },

  infoFieldE: {
    
    backgroundColor: 'rgba(0,0,0,.3)',
    
    width: 200,
    height: 80,
    top: 20,
    borderRadius: 5
  },
   infoFieldP: {
    
    backgroundColor: 'rgba(0,0,0,.3)',
    width: 200,
    height: 80,
    bottom: 20,
    borderRadius: 5,
    alignSelf: 'flex-end',
    

  },
 
  enemyAttack: {
    flex: 1,
    borderRadius: 5
  },


  infoFieldText: {
    flex: 1.5,
    color: 'white',
    left: 5,
    fontSize: 20,
    fontWeight: 'bold',
    overflow: 'visible',
    backgroundColor:'rgba(0,0,0,0)',

   
  },
 
  buttonText: {
    
    color: '#f33333',
    fontFamily: 'Copperplate-Bold',
    fontSize: 20,
    backgroundColor:'rgba(0,0,0,0)',
    alignItems: "center",
    flexWrap: 'wrap'
  },
  
});

module.exports = Battler;