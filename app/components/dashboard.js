var
  React = require('react-native'),
  {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight
  } = React,
  Profile = require('./profile'),
  Repos = require('./repos'),
  styles,
  Dashboard;

styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1
  }
});

Dashboard = React.createClass({
  propTypes: {
    userInfo: React.PropTypes.object.isRequired
  },

  getDefaultProps: function () {
    return {
      userInfo: {}
    };
  },

  goToProfile: function () {
    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: { user: this.props.userInfo }
    })
  },

  goToRepos: function () {
    this.props.navigator.push({
      title: 'Repos',
      component: Repos,
      passProps: { user: this.props.userInfo }
    });
  },

  goToNotes: function () {

  },

  render: function () {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: this.props.userInfo.avatar_url }}
          style={styles.image}
        />
        <TouchableHighlight
          style={[styles.button, {backgroundColor: '#48bbec'}]}
          underlayColor="#88D4F5"
          onPress={this.goToProfile}
        >
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button, {backgroundColor: '#E77AAE'}]}
          underlayColor="#E39EBF"
          onPress={this.goToRepos}
        >
          <Text style={styles.buttonText}>View Repos</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button, {backgroundColor: '#758BF4'}]}
          underlayColor="#9BAAF3"
          onPress={this.goToNotes}
        >
          <Text style={styles.buttonText}>Take Notes</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

module.exports = Dashboard;