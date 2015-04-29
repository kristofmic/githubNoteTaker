var
  React = require('react-native'),
  {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableHighlight,
    ActivityIndicatorIOS
  } = React,
  Badge = require('./badge'),
  Separator = require('./separator'),
  RepoWV = require('./repo_web_view'),
  githubApi = require('../utils/github_api'),
  styles,
  Repos;

styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});

Repos = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      repos: [],
      isLoading: true
    };
  },

  componentDidMount: function () {
    githubApi.fetchRepos(this.props.user.login)
      .then((res) => {
        if (this.isMounted()) {
          console.log(res);
          this.setState({
            repos: res,
            isLoading: false
          });
        }
      })
      .catch(err => console.error('Error fetching repos!'));
  },

  goToRepo: function (repo) {
    this.props.navigator.push({
      title: repo.name,
      component: RepoWV,
      passProps: { repo }
    });
  },

  renderRepo: function (repo) {
    var
      descriptionEl;

    if (repo.description) {
      descriptionEl = (
        <Text style={styles.description}> {repo.description} </Text>
      );
    }
    return (
      <View key={repo.id}>
        <View style={styles.rowContainer}>
          <TouchableHighlight
            onPress={this.goToRepo.bind(this, repo)}
            underlayColor="transparent"
          >
            <Text style={styles.name}> {repo.name} </Text>
          </TouchableHighlight>
          <Text style={styles.stars}> Stars: {repo.stargazers_count} </Text>
          {descriptionEl}
        </View>
        <Separator />
      </View>
    );
  },

  render: function() {
    var
      user = this.props.user,
      loadingEl,
      repoViewItems;

    if (this.state.repos.length) {
      repoViewItems = this.state.repos.map(this.renderRepo);
    }
    else {
      loadingEl = (
        <ActivityIndicatorIOS
          animating="true"
          size="large"
          color="#666"
          style={{marginTop: 15}}
        />
      );
    }

    return (
      <ScrollView style={styles.container}>
        <Badge
          avatarUrl={user.avatar_url}
          name={user.name}
          handle={user.login}
        />
        {loadingEl}
        {repoViewItems}
      </ScrollView>
    );
  }
});

module.exports = Repos;