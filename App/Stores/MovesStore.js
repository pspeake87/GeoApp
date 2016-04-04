const React = require('react-native');

const Dispatcher = require('../Dispatcher');
const Constants = require('../Constants');

const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _moves = {};


var MovesStore = assign({}, EventEmitter.prototype, {

  getAll: function () {
    return _moves;
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


MovesStore.dispatchToken = Dispatcher.register(function (payload) {
  

  switch (payload.actionType) {
    case Constants.ActionTypes.MOVES_LOADED:
   
    _moves = payload.moves;

    MovesStore.emitChange();

    break;


  }
});


module.exports = MovesStore;