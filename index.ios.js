/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var
  React = require('react-native'),
  {
    AppRegistry,
    StyleSheet,
    NavigatorIOS,
    Text,
    View,
  } = React,
  Main = require('./app/components/main'),
  githubNotetaker,
  styles;

githubNotetaker = React.createClass({
  render: function() {
    var
      initialRoute;

    initialRoute = {
      title: 'Github Notetaker',
      component: Main
    };

    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={initialRoute}
      />
    );
  }
});

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111'
  }
});

AppRegistry.registerComponent('githubNotetaker', () => githubNotetaker);
