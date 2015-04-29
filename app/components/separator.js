var
  React = require('react-native'),
  {
    StyleSheet,
    View
  } = React,
  styles,
  Separator;

styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  }
});

Separator = React.createClass({
  render: function() {
    return (
      <View style={styles.separator} />
    );
  }
});

module.exports = Separator;