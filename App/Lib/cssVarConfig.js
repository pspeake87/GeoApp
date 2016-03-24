
'use strict';

const React = require('react-native');


const assign = require('object-assign');

const _color_lib = {

    termsAndPrivacyText: '#596975',
    termsAndPrivacyTitle: '#7C8C97',
    termsAndPrivacyBg: '#F6F6F6',
    grayBackground: '#43545F',
    lightGrayBg: '#F6F6F6',
    ltGrayText: '#99AEBB',
    inputText: '#C5E1F6',
    greenButtonColor: '#7EBC53',
    grayButtonColor: '#556A77',
    borderGray: '#657785',
    transparentBg: 'rgba(16,37,52,.854)',

    bancrPromoText: '#C6E3F7',

    blue50: '#23B4D2',
};

module.exports = assign({
   
    // http://iosfonts.com/
  flex: {
    flex: 1
  },
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
  buttons: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#f33333',
    padding: 15,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },


}, _color_lib);
