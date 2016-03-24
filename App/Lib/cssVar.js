'use strict';

const invariant = require('invariant');
const CSSVarConfig = require('../Lib/cssVarConfig');

var cssVar = function(/*string*/ key) /*string*/ {
  invariant(CSSVarConfig[key], 'invalid css variable ' + key);

  return CSSVarConfig[key];
};

module.exports = cssVar;
