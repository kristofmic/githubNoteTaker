var
  React = require('react-native'),
  {
    View,
    Text,
    Image,
    StyleSheet
  } = React,
  styles,
  Badge;

styles = StyleSheet.create({
  container: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 62.5,
    marginTop: 10,
    alignSelf: 'center'
  }
});

Badge = React.createClass({
  propTypes: {
    avatarUrl: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    handle: React.PropTypes.string.isRequired
  },

  getDefaultProps: function () {
    return {
      avatarUrl: '',
      name: '',
      handle: ''
    };
  },

  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: this.props.avatarUrl}} />
        <Text style={styles.name}>{this.props.name}</Text>
        <Text style={styles.handle}>{this.props.handle}</Text>
      </View>
    );
  }
});

module.exports = Badge;