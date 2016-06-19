import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App/App.js';


console.ignoredYellowBox = ['Warning: Failed propType: SceneView'];
console.ignoredYellowBox = ['Warning: ReactNative.Children is deprecated. Use React.Children from the "react" package instead.'];
console.ignoredYellowBox = ['ExceptionsManager.js:76 Warning: ReactNative.isValidElement is deprecated. Use React.isValidElement from the "react" package instead.'];

AppRegistry.registerComponent('GeoApp', () => App);
