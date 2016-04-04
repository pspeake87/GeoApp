'use strict';

const React = require('react-native');
const GameEngine = require('./GameEngine');
const MoveView = require('./MoveView');
const Monsters = require('../Data/Monsters');
const Moves = require('../Data/Moves');
const Items = require('../Data/Items');

const Sound = require('react-native-sound');

var click = new Sound('Click.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
  } else { // loaded successfully
    debugger;
  }
});

const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Animated,
  Easing,
  ScrollView,
  Component

  } = React;


module.exports = class Battler extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
      def: "",
      playerTurns: 0,
      enemyTurns: 0,
      isCriticalHit: false,
      isCriticalMiss: false,
      expToGo: (Monsters.player.experienceTotal - Monsters.player.experienceGained),
      song: null,
    }

  }

  componentWillMount() {
    this.playSound();
  }

  componentDidMount() {

  // Fade in screen
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 3000,
      },
    ).start();



    setTimeout(() => this.battleSequence(), 4000);

  }

  playSound() {
    if (this.state.song) {
      this.state.song.stop();
      this.setState({song: null});
    } else {
      this.state.song = new Sound('fightSong.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        } else { // loaded successfully
          this.state.song.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        }
      });


    }
  }

  playClick() {
    click.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  }

  battleSequence() {
    var random = Math.floor(Math.random() * Monsters.enemy.length);
    // determine enemy monster monsterRandomizer(player)
    this.setState({enemy: Monsters.enemy[random]});
    Monsters.currentEnemy = this.state.enemy;
    this.setState({player: Monsters.player});
    this.state.enemy.currentHp = this.state.enemy.maxHp;
    //Monster stat randomizer

    //hide monsters, show enemy monster with animation,
    this.setState({message: "A " + this.state.enemy.name + " has attacked"});
    //message "who should fight?"
    // setTimeout(() => {this.setState({message: "Who Should Fight?"})}, 4000);
    setTimeout(() => {this.setPlayer()}, 4000);
    //display buttons for option


  }

  displayCharButtons() {

    if (this.state.moveButtons == "displayMoves") {
      return <View style={styles.moveView}>
        <MoveView move={"Back"} press={() => this.displayOptions("options")} />
        <MoveView move={this.state.player.moves[0].name} press={() => this.defenderTurn(this.state.player.moves[0])} />
        <MoveView move={this.state.player.moves[1].name} press={() => this.defenderTurn(this.state.player.moves[1])} />
        <MoveView move={this.state.player.moves[2].name} press={() => this.defenderTurn(this.state.player.moves[2])} />
        <MoveView move={this.state.player.moves[3].name} press={() => this.defenderTurn(this.state.player.moves[3])} />
      </View>
    } else if (this.state.moveButtons == "defender") {
      return <View style={styles.moveView}>
        <MoveView move={"Defend"} press={() => this.defending(10)} />
        <MoveView move={"Dodge"} press={() => this.defending(6)} />
        <MoveView move={"Counter Attack"} press={() => this.defending(4)} />
      </View>
    } else if (this.state.moveButtons == "displayOptions") {
      return <View style={styles.moveView}>
        <MoveView move={"Attack"} press={() => this.displayOptions("attack")} />
        <MoveView move={"Items"} press={() => this.displayOptions("items")} />
        <MoveView move={"Run"} press={() => this.runAway()} />
      </View>
    } else if (this.state.moveButtons == "displayItems") {
      return <View style={{flex: 2}}>
        <MoveView move={"Back"} press={() => this.displayOptions("options")} />
        <ScrollView style={{flex: 2}}>
          {this.state.player.items.map((v, i) => <MoveView move={this.state.player.items[i].name} key={i} press={() => this.applyItem(this.state.player.items[i], i)} />)}
        </ScrollView>
      </View>

    } else {

    }
  }

  applyItem(item, index) {
    if(item.health) {
      this.state.player.currentHp = this.state.player.currentHp + item.health
    } else if (item.turns) {

      this.state.enemyTurns = this.state.enemyTurns + item.turns;
    } else if (item.stats){
      this.defenderTurn(item.move, true);
    }

    if (item.move){
      this.defenderTurn(item.move, true);
      this.state.player.items.splice(index,1);
    } else {
      this.state.player.items.splice(index,1);
      this.setState({moveButtons: ""});
      this.enemyTurn();
    }
  }

  displayOptions(button) {

    if (button == "attack") {
      this.setState({message: ""});
      this.setState({moveButtons: "displayMoves"});
    } else if (button == "items") {
      this.setState({message: ""});
      this.setState({moveButtons: "displayItems"});
    } else {
      this.setState({message: "What do you want to do?"})
      this.setState({moveButtons: "displayOptions"});
    }

  }

  setPlayer() {
    this.setState({currentPlayer: true});
    if (this.state.player.stats[5] > this.state.enemy.stats[5]) {
      this.playerTurn();
    } else {
      this.enemyTurn();
    }
  }

  playerTurn() {
    //start of players turn
    if (this.state.playerTurns > 0) {
      this.setState({playerTurns: this.state.playerTurns - 1 });
      this.setState({message: "You are frozen"})
      setTimeout(() => {this.enemyTurn()}, 2000);
    } else {
      {this.setState({message: "What do you want to do?"})}
      //displayMoves

      this.setState({moveButtons: "displayOptions"});

      //wait for input of move
    }

  }

  checkForRoll(roll, stats) {

    var results = (Math.floor((Math.random() * roll) + 1));
    if (results == 20 && roll == 20) {
      this.setState({isCriticalHit: true});
    }
    if (results == 1 && roll == 20) {
      this.setState({isCriticalMiss: true});
    }
    if (stats) {
      return results + stats;
    } else {
      return results
    }
  }

  defenderTurn(move,) {
    // AI defender decides move and passes it to damage calculator

    var random = Math.random();


    if (random > .50) {
      this.calcDamage(move, 10);
    } else if (random > .20) {
      this.calcDamage(move, 6);
    } else {
      this.calcDamage(move, 4);
    }



  }

  defendResults(damage, defense, roll) {
    if (defense == "defend") {
      var d = this.checkForRoll(4);
      d = d + roll;
      var total = damage - d;
      if (total < 0) {
        return 0;
      } else {
        return damage;
      }

    }
    if (defense == "dodge") {
      return 0;
    }
  }

  calcDamage(move, defense) {
    //player is attacking, enemy is defending
    this.setState({currentMove: move});
    this.setState({moveButtons: ""});


    var attack = 0;

    if (defense == 10) {
      this.setState({def: "defend"});
    } else if (defense == 6) {
      this.setState({def: "dodge"});
    } else {
      this.setState({def: "counterAttack"});
    }
    //check for hit
    var hit = this.checkForRoll(20);
    var d = this.checkForRoll(defense);
    d = d + Math.floor(this.state.player.stats[1] / 2);


    this.setState({message: "" + this.state.enemy.name + " is trying to " + this.state.def });
    setTimeout(() => this.setState({message: "You must have an accuracy of " + d + " or better to ignore the " + this.state.def }), 1250);
    setTimeout(() => this.setState({message: "You attack with accuracy of " + hit  }), 3000);
    if (hit >= d) {
      if (this.state.isCriticalHit) {
        var a = this.checkForRoll(move.dmgRoll);
        var b = this.checkForRoll(move.dmgRoll);
        attack = a + b + move.bonus + Math.floor(this.state.player.stats[0] / 2);
        this.setState({isCriticalHit: false});
      } else {
        attack = this.checkForRoll(move.dmgRoll) + move.bonus + Math.floor(this.state.player.stats[0] / 2);
      }

    } else if (this.state.def == "counterAttack") {
      // counter attack

    } else {
      attack = this.defendResults(this.checkForRoll(move.dmgRoll) + move.bonus + Math.floor(this.state.player.stats[0] / 2), this.state.def, Math.floor(this.state.enemy.stats[1] / 2));
    }

    setTimeout(() => this.playerAttack(), 3000);
    setTimeout(() => this.setState({playerAttacking: false}), 4200);
    setTimeout(() => {this.setState({message: this.state.enemy.name + " recieved " + attack + " damage"})}, 5500);

    var life = this.state.enemy.currentHp - attack;


    setTimeout(() => this.checkForDeath(life, this.state.enemy), 4000);



  }

  defending(defense) {
    //player is defending, enemy is attacking
    this.setState({moveButtons: ""});

    // random AI attack selection

    var random = Math.random();
    var move = {};

    if (random > .75) {
      move = this.state.enemy.moves[0];
    } else if (random > .50) {
      move = this.state.enemy.moves[1];
    } else if (random > .25) {
      move = this.state.enemy.moves[2];
    } else {
      move = this.state.enemy.moves[3];
    }

    var attack = 0;


    if (defense == 10) {
      this.setState({def: "defend"});
    } else if (defense == 6) {
      this.setState({def: "dodge"});
    } else {
      this.setState({def: "counterAttack"});
    }


    //check for hit
    var hit = this.checkForRoll(20);
    // check defense roll
    var d = this.checkForRoll(defense);
    d = d + Math.floor(this.state.enemy.stats[1] / 2);

    setTimeout(() => this.setState({message: this.state.enemy.name + " must have an accuracy of " + d + " or better to ignore the " + this.state.def }), 1250);
    setTimeout(() => this.setState({message: this.state.enemy.name  + " attacks with accuracy of " + hit }), 3000);
    if (hit >= d) {
      if (this.state.isCriticalHit) {
        var a = this.checkForRoll(move.dmgRoll);
        var b = this.checkForRoll(move.dmgRoll);
        attack = a + b + move.bonus + this.state.enemy.stats[0];
        this.setState({isCriticalHit: false});
      } else {
        attack = this.checkForRoll(move.dmgRoll, this.state.enemy.stats[0]) + move.bonus
      }

    } else if (this.state.def == "counterAttack") {
      // counter attack

    } else {
      console.log("successfully defended");
      attack = this.defendResults(this.checkForRoll(move.dmgRoll) + move.bonus + Math.floor(this.state.enemy.stats[0] / 2), this.state.def, Math.floor(this.state.player.stats[1] / 2));
    }

    setTimeout(() => this.enemyAttack(), 3000);
    setTimeout(() => this.setState({enemyAttacking: false}), 4200);
    setTimeout(() => {this.setState({message: "You recieved " + attack + " damage"})}, 5500);
    var life = this.state.player.currentHp - attack;
    setTimeout(() => this.checkForDeath(life, this.state.player), 4000);
  }

  checkForDeath(life, defender) {
    defender.currentHp = life;
    if (defender.currentHp < 0) {
      defender.currentHp = 0;
    }

    if (defender.currentHp <= 0){
      setTimeout(() => this.fightOver(defender), 3000);

    } else {

      if (defender == this.state.player) {
        setTimeout(() => this.playerTurn(), 3000);
      } else {
        setTimeout(() => this.enemyTurn(), 3000);
      }

    }
  }

  enemyAttack() {
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
  }

  enemyTurn() {
    if (this.state.enemyTurns > 0) {
      this.setState({enemyTurns: this.state.enemyTurns - 1 });
      this.setState({message: this.state.enemy.name + " cant move"})
      setTimeout(() => {this.playerTurn()}, 2000);
    } else {
      this.setState({message: this.state.enemy.name + "'s turn"});


      setTimeout(() => this.setState({moveButtons: "defender"}), 2000);
      // determine move
    }

  }

  runAway() {
    this.setState({moveButtons: ""});
    {this.setState({message: "You ran away"})}
    setTimeout(() => {this.props.navigator.pop()}, 1500);
    this.playSound();
  }

  fightOver(defender) {


    this.setState({moveButtons: ""});
    {this.setState({message: " " + defender.name + " has died"})}
    //display message of who died
    //if player loser, message: player must heal
    // if player winner, congratulations! you defeated a "enemy"
    this.playSound();
    setTimeout(() => {this.props.navigator.push({name: 'experience', index: 3})}, 500);
    // experienceScreen
  }

  renderEnemyAvatar() {
    if (this.state.enemy.avatar) {
      return <View style={styles.enemyField}>

        <View style={styles.infoFieldE}>

          <Text style={styles.infoFieldText}>
            {this.state.enemy.name}
          </Text>

          <Text style={styles.infoFieldText}>

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
  }

  enemyAttackImage(move) {
    if (this.state.enemyAttacking)  {
      return  <Image style={styles.enemyAttack}
                     source={this.state.currentMove.animationurl}
                     resizeMode={'stretch'}>
      </Image>
    }

  }

  attackImage() {

    if (this.state.playerAttacking)  {
      return  <Image style={styles.enemyAttack}
                     source={this.state.currentMove.animationurl}
                     resizeMode={'stretch'}>
      </Image>
    }

  }

  playerAttack() {
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

  }

  messageBox() {
    if(this.state.message == "") {

    } else {
      return <View style={styles.chatBox}>
        <Text style={styles.buttonText}>
          {this.state.message}
        </Text>
      </View>
    }
  }

  renderPlayerAvatar() {
    if (this.state.currentPlayer) {
      return <View style={styles.playerField}>

        <Animated.Image style={{flex: 1,
                  transform: [{translateX: this.state.attackMove }],
                  width: 115,
                  height: 115,

                  alignSelf: 'flex-end',
                  justifyContent: 'center'}}
                        source={{uri: 'playerHead.png'}}
                        resizeMode={'stretch'}>
          {this.enemyAttackImage()}
        </Animated.Image>

        <View style={styles.infoFieldP}>

          <Text style={styles.infoFieldText}>
            {this.state.player.name}
          </Text>

          <Text style={styles.infoFieldText}>
            Hp: {this.state.player.currentHp}/ {this.state.player.maxHp}
          </Text>


          <GameEngine player={this.state.player}/>


        </View>

      </View>
    }

  }


  render(){
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
              source={{uri: 'https://illiaworld.files.wordpress.com/2011/12/forest.png'}}>
              {this.renderEnemyAvatar()}
              {this.renderPlayerAvatar()}
            </Image>

            <View style={{backgroundColor:'black', height: 10, flexDirection: 'row'}}>
              <View style={{flex: Monsters.player.experienceGained, backgroundColor: 'blue'}}>
              </View>
              <View style={{flex: this.state.expToGo, backgroundColor: 'rgba(255,0,0,0.7)'}}>
              </View>

            </View>

          </View>


          <View style={{flex: 1, justifyContent: "center", backgroundColor: 'black'}}>
            {this.messageBox()}



            {this.displayCharButtons()}



          </View>
        </Animated.View>
      </View>

    );
  }

};

const styles = StyleSheet.create({
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
    shadowColor: "black",
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
    shadowColor: "black",
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

