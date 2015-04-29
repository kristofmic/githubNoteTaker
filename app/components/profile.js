var
  React = require('react-native'),
  {
    StyleSheet,
    View,
    ScrollView,
    Text
  } = React,
  Badge = require('./badge'),
  Separator = require('./separator'),
  styles,
  Profile;

styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
});

Profile = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired
  },

  getDefaultProps: function () {
    return {
      user: {}
    };
  },

  renderProfileViewItem: function (key) {
    var
      user = this.props.user;

    if (!user[key]) {
      return (
        <View key={key} />
      );
    }

    return (
      <View key={key}>
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitle}> {formatTitle(key)} </Text>
          <Text style={styles.rowContent}> {user[key]} </Text>
        </View>
        <Separator />
      </View>
    );
  },

  render: function () {
    var
      user = this.props.user,
      keys = [
        'company',
        'location',
        'followers',
        'following',
        'email',
        'bio',
        'public_repos'
      ],
      profileViewItems;

    profileViewItems = keys.map(this.renderProfileViewItem);

    return (
      <ScrollView style={styles.container}>
        <Badge
          avatarUrl={user.avatar_url}
          name={user.name}
          handle={user.login}
        />
        {profileViewItems}
      </ScrollView>
    );
  }
});

module.exports = Profile;

function formatTitle (title) {
  return title.split(/_|-/).reduce((prev, curr) => {
    return `${prev}${capitalize(curr)} `;
  }, '');
}

function capitalize (text) {
  return text.charAt(0).toUpperCase().concat(text.slice(1));
}