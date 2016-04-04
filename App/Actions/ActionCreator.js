import Dispatcher from '../Dispatcher';
import Constants from '../Constants';
  
    module.exports = {
      itemsLoad(items) {
          Dispatcher.dispatch({
              actionType: Constants.ActionTypes.ITEMS_LOADED,
              items: items,
         });
    },

      monstersLoad(monsters) {
          Dispatcher.dispatch({
              actionType: Constants.ActionTypes.MONSTERS_LOADED,
              monsters: monsters,
         });
    },

      movesLoad(moves) {
          Dispatcher.dispatch({
              actionType: Constants.ActionTypes.MOVES_LOADED,
              moves: moves,
         });
    },
};
