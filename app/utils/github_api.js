const
  BASE_URL = 'https://api.github.com/users/';

var
  api;

api = {
  fetchRepos,
  fetchBio
};

module.exports = api;

function fetchBio (username) {
  var
    url;

  username = normalizeText(username);

  url = `${BASE_URL}${username}`;

  return fetch(url)
    .then(toJson);
}

function fetchRepos (username) {
  var
    url;

  username = normalizeText(username);

  url = `${BASE_URL}${username}/repos`;

  return fetch(url)
    .then(toJson);
}

function toJson (res) {
  return res.json();
}

function normalizeText (text) {
  text = text || '';

  return text.toLowerCase().trim();
}