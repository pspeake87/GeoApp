const React = require('react-native');

const Dispatcher = require('../Dispatcher');
const Constants = require('../Constants');

const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _monsters = {};


var MonsterStore = assign({}, EventEmitter.prototype, {

  getAll: function () {
    return _monsters;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});


MonsterStore.dispatchToken = Dispatcher.register(function (payload) {
  

  switch (payload.actionType) {
    case Constants.ActionTypes.MONSTERS_LOADED:
   
    _monsters = payload.monsters;

    MonsterStore.emitChange();

    break;


  }
});


module.exports = MonsterStore;