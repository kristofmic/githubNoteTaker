var
  parse = require('parse').Parse,
  Notes;

parse.initialize('1qboLoM0xhPkEEYiTvTlU6P2USHUnejt25AzOlhl',
                 'bVSrVhhJmy9nFKFOFJFTHzGHAJGrRIhYsigwlt2i');

Notes = parse.Object.extend('Notes');

module.exports = {
  createNote,
  fetchNotes
};

function createNote(userFor, text) {
  var
    note = new Notes();

  note.set('login', userFor);
  note.set('note', text);

  note.save(null, {
    success: (res) => {
      console.log('parse create note result: ', res);
    },
    error: (res, err) => {
      console.log('error: ', err);
    }
  });
}

function fetchNotes(userFor, cb) {
  var
    query = new parse.Query(Notes);

  query.equalTo('login', userFor);

  query.find({
    success: (res) => {
      cb(null, res);
    },
    error: (err) => {
      cb(err);
    }
  });
}
