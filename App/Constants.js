function keyMirror(obj) {
  var obj2 = {};
  for (var x in obj) {
    obj2[x] = x;
  }
  return obj2;
}

module.exports = {


  Routes: keyMirror({
   
  }),

  
  ActionTypes: keyMirror({
    ITEMS_LOADED: null,
    
  }),

 
};