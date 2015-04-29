var
  React = require('react-native'),
  {
    StyleSheet,
    View,
    WebView
  } = React,
  styles,
  RepoWebView;

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
  }
});

RepoWebView = React.createClass({
  propTypes: {
    repo: React.PropTypes.object.isRequired
  },

  getDefaultProps: function () {
    return {
      repo: {}
    };
  },

  render: function () {
    return (
      <View style={styles.container}>
        <WebView
          url={this.props.repo.html_url}
        />
      </View>
    );
  }
});

module.exports = RepoWebView;

