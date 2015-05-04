var
  React = require('react-native'),
  {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    ScrollView,
    ActivityIndicatorIOS
  } = React,
  Separator = require('./separator'),
  parseApi = require('../utils/parse_api'),
  styles,
  Notes;

styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    padding: 10
  },
  note: {
    fontSize: 19
  },
  newNote: {
    flex: 4,
    fontSize: 19,
    backgroundColor: '#ececec',
    padding: 10,
    height: 60
  },
  submitNote: {
    flex: 1,
    padding: 10,
    height: 60,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

Notes = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired
  },

  getDefaultProps: function () {
    return {
      user: {}
    };
  },

  getInitialState: function () {
    return {
      isLoading: true,
      notes: [],
      newNote: ''
    }
  },

  componentDidMount: function () {
    parseApi.fetchNotes(this.props.user.login, (err, notes) => {
      if (err) {
        return this.setState({
          isLoading: false
        });
      }

      this.setState({
        isLoading: false,
        notes
      });
    });
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return this.state.isLoading !== nextState.isLoading ||
           this.state.notes !== nextState.notes;
  },

  handleNoteChange: function (text) {
    this.setState({
      newNote: text
    });
  },

  submitNote: function () {
    var
      newNote = this.state.newNote;

    parseApi.createNote(this.props.user.login, newNote);

    this.setState({
      newNote: '',
      notes: this.state.notes.concat([
        {
          id: this.state.notes.length + 123,
          get: () => ( newNote )
        }
      ])
    });
  },

  renderNote: function (note) {
    return (
      <View key={note.id}>
        <View style={styles.rowContainer}>
          <Text style={styles.note}>{note.get('note')}</Text>
        </View>
        <Separator />
      </View>
    );
  },

  render: function () {
    var
      loadingEl,
      notesEls;

    if (this.state.isLoading) {
      loadingEl = (<ActivityIndicatorIOS style={{marginTop: 15}} animating={true} color='#666' />);
    }

    if (this.state.notes.length) {
      notesEls = this.state.notes.map(this.renderNote);
    }

    if (!this.state.notes.length && !this.state.isLoading) {
      notesEls = [this.renderNote({
        id: 00000000,
        get: () => ( 'No notes available. Start by adding one!' )
      })];
    }

    return (
      <View style={styles.container}>
        <ScrollView >
          {loadingEl}
          {notesEls}
        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.newNote}
            value={this.state.newNote}
            onChangeText={this.handleNoteChange}
          />
          <TouchableHighlight
            style={styles.submitNote}
            underlayColor="#88D4F5"
            onPress={this.submitNote}
          >
            <Text style={{color: '#FFF', fontSize: 19, alignSelf: 'center'}}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

module.exports = Notes;

