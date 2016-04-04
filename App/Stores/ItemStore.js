const React = require('react-native');

const _ = require('underscore');
const Dispatcher = require('../Dispatcher');
const Constants = require('../Constants');

const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _items = {};


var ItemStore = assign({}, EventEmitter.prototype, {

  getAll: function () {
    return _items;
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


ItemStore.dispatchToken = Dispatcher.register(function (payload) {
  

  switch (payload.actionType) {
    case Constants.ActionTypes.ITEMS_LOADED:
   
    _items = payload.items;

    ItemStore.emitChange();

    break;


  }
});


module.exports = ItemStore;