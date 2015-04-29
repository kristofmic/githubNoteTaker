var
  React = require('react-native'),
  {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS,
    StyleSheet
  } = React,
  Dashboard = require('./dashboard'),
  githubApi = require('../utils/github_api'),
  styles,
  Main;

styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

Main = React.createClass({
  getInitialState: function () {
    return {
      username: '',
      isLoading: false,
      error: false
    };
  },

  handleChange: function (text) {
    this.setState({
      username: text
    });
  },

  handleSubmit: function () {
    this.setState({
      isLoading: true
    });

    githubApi.fetchBio(this.state.username)
      .then((res) => {
        if (res.message === 'Not Found') {
          return this.setState({
            error: 'User not found',
            isLoading: false
          });
        }

        // moves to a new view
        this.props.navigator.push({
          title: res.name || 'Select an Option',
          component: Dashboard,
          passProps: { userInfo: res }
        });

        this.setState({
          username: '',
          isLoading: false,
          error: false
        });
      });
  },

  showError: function() {
    return this.state.error ? <Text>{this.state.error}</Text> : null;
  },

  render: function () {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Search for a Github User</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChangeText={this.handleChange}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit}
          underlayColor="white"
        >
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          size="large"
          color="#fff"
        />
        {this.showError()}
      </View>
    );
  }
});

module.exports = Main;